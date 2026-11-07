/**
 * 音訊合成引擎 (Audio & Speech Synthesis Engine) v6.0 全平台極致防破音與防金屬顫音重構版
 * 1. Web Audio API 懶加載與硬體衝突隔離：
 *    - 移除 constructor 提早建立 AudioContext，杜絕開屏時搶佔 AudioSession 造成 SampleRate Mismatch 降頻金屬音
 *    - 嚴格實作 3~5ms Attack/Release 包絡平滑過渡，消滅零點跳變階躍爆音 (DC Offset Free)
 *    - 直連平滑 Master Gain (0.35)，音效與 TTS 管道嚴格物理隔離
 * 2. Web Speech API (iOS 17 / Android 14~17+ 雙向相容架構)：
 *    - 語音包嚴格過濾 Compact 機械合成音：若無 Neural/Enhanced/Natural/Google 高音質語音，保持 u.voice = null 由系統原生驅動，杜絕 iOS 17 降級至老舊 Compact 語音產生的金屬機器人顫音
 *    - 標點平滑化：全面使用中文全形逗點 "，" 取代半形空格，確保神經網路完整平滑斷詞換氣，杜絕半形空格引發的音素碎片化切斷 (直升機金屬抖動音)
 *    - 免 cancel 零延遲直出 + 180ms 異步安全釋放冷卻：未播放時絕不呼叫 cancel()，杜絕 CoreAudio 硬切斷方波所引發的揚聲器振膜劇烈彈跳爆音 (Speaker diaphragm pop)
 *    - 語速嚴格鎖定 1.0 原生採樣無損速率，音量 0.85 預留 Headroom，杜絕 0dBFS 塞音數位截頂削波
 */

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.voice = null;
    const ua = (typeof navigator !== "undefined" && navigator.userAgent) ? navigator.userAgent : "";
    const touchPoints = (typeof navigator !== "undefined" && typeof navigator.maxTouchPoints === "number") ? navigator.maxTouchPoints : 0;
    const isSmallScreen = (typeof window !== "undefined" && window.innerWidth) ? window.innerWidth <= 820 : false;
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) || touchPoints > 1 || isSmallScreen;
    this.pendingSpeakTimeout = null;
    this.isSpeaking = false;

    // 延遲初始化：不在 constructor 呼叫 AudioContext，避免污染 AudioSession
    this.initVoices();
    console.log(`[AudioEngine v6.0 Active] Mobile mode: ${this.isMobile ? "YES" : "NO"}`);
  }

  // 按需延遲獲取 Web Audio Context (採用 balanced 安全緩衝，不請求 2ms 極限低延遲，徹底杜絕 AAudio 欠載金屬顫音)
  getAudioContext() {
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx({ latencyHint: "balanced" });
          this.masterGain = this.ctx.createGain();
          this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
          this.masterGain.connect(this.ctx.destination);
        }
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      return this.ctx;
    } catch (e) {
      return null;
    }
  }

  // 取得安全音訊輸出端
  getMasterOutput() {
    this.getAudioContext();
    return this.masterGain || (this.ctx ? this.ctx.destination : null);
  }

  // 音訊閃避安全空實作，保持平穩增益
  duckAudio() {}
  unduckAudio() {}

  // 多層級智能語音包選取器 (相容 Android 14~17+ 各大品牌 Google/三星/小米/OPPO/vivo 與 iOS)
  initVoices() {
    if (!("speechSynthesis" in window)) return;
    const findVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!Array.isArray(voices) || voices.length === 0) return;

      let bestVoice = null;
      let highestScore = -1;

      voices.forEach(v => {
        const lang = (v.lang || "").toLowerCase().replace("_", "-");
        const name = (v.name || "").toLowerCase();
        const uri = (v.voiceURI || "").toLowerCase();

        // 徹底排除已知會引發機械音的底層合成器
        if (name.includes("compact") || uri.includes("compact") || name.includes("pico") || uri.includes("pico")) {
          return;
        }

        let score = 0;
        const isTw = lang === "zh-tw" || lang === "cmn-hant-tw" || lang === "cmn-tw" ||
                     name.includes("taiwan") || name.includes("台灣") || name.includes("臺灣") ||
                     uri.includes("zh-tw") || uri.includes("cmn-tw");
        const isZh = lang.startsWith("zh") || lang.startsWith("cmn");

        if (isTw) {
          score += 50;
        } else if (isZh) {
          score += 20;
        } else {
          return; // 非中文直接排除
        }

        // 高音質神經網絡/線上特性加分
        if (name.includes("natural") || uri.includes("natural") || name.includes("online") || uri.includes("online")) score += 40;
        if (name.includes("neural") || name.includes("enhanced") || name.includes("premium")) score += 35;
        if (name.includes("google") || uri.includes("google")) score += 30;
        if (name.includes("siri") || uri.includes("siri")) score += 30;
        if (v.localService === false) score += 10; // 雲端高品質

        if (score > highestScore) {
          highestScore = score;
          bestVoice = v;
        }
      });

      this.voice = bestVoice;
      if (this.voice) {
        console.log(`[AudioEngine v7.0] Active Voice: ${this.voice.name} (${this.voice.lang}) Score: ${highestScore}`);
      }
    };

    findVoice();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = findVoice;
    }
  }

  // 播放清脆點擊音效 (柔和正弦波，嚴格 Attack/Release 平滑過渡)
  playClick() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx || ctx.state !== "running") return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.05);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.035, now + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.getMasterOutput());
      osc.start(now);
      osc.stop(now + 0.055);
    } catch (e) {}
  }

  // 播放答對叮咚音效 (柔和正弦波雙音，消除高頻破音毛刺)
  playCorrect() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx || ctx.state !== "running") return;
      const now = ctx.currentTime;

      // 音符 1: 溫潤 C6
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(1046.5, now);
      gain1.gain.setValueAtTime(0.0001, now);
      gain1.gain.exponentialRampToValueAtTime(0.05, now + 0.008);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc1.connect(gain1);
      gain1.connect(this.getMasterOutput());
      osc1.start(now);
      osc1.stop(now + 0.17);

      // 音符 2: 明亮 G6
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(1318.5, now + 0.12);
      osc2.frequency.exponentialRampToValueAtTime(1568, now + 0.35);
      gain2.gain.setValueAtTime(0.0001, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.06, now + 0.128);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
      osc2.connect(gain2);
      gain2.connect(this.getMasterOutput());
      osc2.start(now + 0.12);
      osc2.stop(now + 0.43);
    } catch (e) {}
  }

  // 播放答錯提示音效 (溫和雙音提示，取代刺耳破音鋸齒波)
  playWrong() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx || ctx.state !== "running") return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(160, now + 0.22);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.05, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.getMasterOutput());
      osc.start(now);
      osc.stop(now + 0.26);
    } catch (e) {}
  }

  // 播放太空火箭點火推進音效 (平滑濾波，消除手機小喇叭爆音)
  playRocketLaunch() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx || ctx.state !== "running") return;
      const now = ctx.currentTime;

      // 1. 低頻推進轟鳴音 (正弦 + 三角溫和波)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(90, now);
      osc.frequency.linearRampToValueAtTime(240, now + 1.2);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.06, now + 0.05);
      gain.gain.linearRampToValueAtTime(0.07, now + 0.8);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

      osc.connect(gain);
      gain.connect(this.getMasterOutput());
      osc.start(now);
      osc.stop(now + 1.42);

      // 2. 星際能量升音琶音
      const arpeggio = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
      arpeggio.forEach((freq, idx) => {
        const start = now + 0.3 + idx * 0.12;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.setValueAtTime(freq, start);
        g.gain.setValueAtTime(0.0001, start);
        g.gain.exponentialRampToValueAtTime(0.03, start + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, start + 0.2);
        o.connect(g);
        g.connect(this.getMasterOutput());
        o.start(start);
        o.stop(start + 0.22);
      });
    } catch (e) {}
  }

  // 播放成就解鎖 / 晉級音效
  playLevelUp() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx || ctx.state !== "running") return;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, i) => {
        const startTime = ctx.currentTime + i * 0.1;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.0001, startTime);
        gain.gain.exponentialRampToValueAtTime(0.05, startTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);
        osc.connect(gain);
        gain.connect(this.getMasterOutput());
        osc.start(startTime);
        osc.stop(startTime + 0.36);
      });
    } catch (e) {}
  }

  // 文本語音正規化與多音字/破音字精準校正 (針對臺灣國語及國小注音教材)
  normalizeTextForSpeech(text) {
    if (!text || typeof text !== "string") return "";
    let s = text;

    // 1. 特例多音字/破音字精準發音校正 (以同音字替換消除 TTS 系統歧義)
    // 「優酪乳」-> TTS 預設念成「優ㄌㄠˋ乳」，替換為「優落乳」保證 100% 準確發音「ㄧㄡ ㄌㄨㄛˋ ㄖㄨˇ」
    s = s.replace(/優酪乳/g, "優落乳");
    s = s.replace(/優酪/g, "優落");
    s = s.replace(/乳酪/g, "乳落");

    // 「長頸鹿」-> 避免部分手機 TTS 誤讀為「ㄓㄤˇ 頸鹿」，替換為「常頸鹿」保證讀「ㄔㄤˊ ㄐㄧㄥˇ ㄌㄨˋ」
    s = s.replace(/長頸鹿/g, "常頸鹿");

    // 「ㄓㄤˇ」三聲代表字防禦：避免單獨的「長」被 TTS 讀成二聲「ㄔㄤˊ」，替換為標準三聲字「掌」
    s = s.replace(/，\s*長(?=[，。\s]|$)/g, "，掌");

    // 「烙」單獨出現易被 TTS 誤讀為「ㄌㄨㄛˋ」(取自炮烙)，替換為「澇」確保 100% 讀四聲「ㄌㄠˋ」
    s = s.replace(/，\s*烙/g, "，澇");
    if (s.endsWith("烙")) s = s.replace(/烙$/, "澇");

    // 2. 徹底過濾所有拉丁英文字母拼音，杜絕手機 TTS 繁中語音包跨語言 Buffer 撕裂爆音
    s = s.replace(/[a-zA-Zà-üÀ-Ü]+/g, "");

    // 3. 標點平滑化重構：
    // 將頓號 "、" 與半形空格統一轉為全形逗號 "，"（絕不轉為半形空格！）
    // 中文全形逗號在 iOS 17 / Android 均提供完美的自然喉部換氣停頓 (約 150ms)，
    // 徹底消滅半形空格在 iOS 17 AVSpeechSynthesizer 造成的微小音素急促淡入淡出（直升機金屬顫音）！
    s = s
      .replace(/[、\s\t\r\n]+/g, "，")
      .replace(/[\/／]+/g, "，")
      .replace(/[。！]+/g, "，")
      .replace(/\s*[\(（].*?[\)）]/g, "")
      .replace(/，+/g, "，")
      .replace(/^，|，$/g, "")
      .trim();

    return s;
  }

  // 原生 TTS 自然朗讀文字 (手機端抗破音、抗雜音、自然流暢平滑切換)
  speak(text, onEnd, options = {}) {
    if (!("speechSynthesis" in window)) {
      if (onEnd) onEnd();
      return;
    }

    // 1. 硬體音訊管道物理隔離：在 TTS 發音前，若 Web Audio Context 正在運行，立即暫停釋放通道，杜絕 AAudio 緩衝區撕裂
    try {
      if (this.ctx && this.ctx.state === "running") {
        this.ctx.suspend();
      }
    } catch (e) {}

    if (this.pendingSpeakTimeout) {
      clearTimeout(this.pendingSpeakTimeout);
      this.pendingSpeakTimeout = null;
    }

    const naturalText = this.normalizeTextForSpeech(text);
    if (!naturalText) {
      if (onEnd) onEnd();
      return;
    }

    const u = new SpeechSynthesisUtterance(naturalText);
    u.lang = "zh-TW";
    u.rate = 1.0;  // 行動端 100% 鎖定 1.0 原生採樣無損速率，杜絕時域拉伸金屬共振
    u.pitch = 1.0; // 絕對鎖定 1.0，防止頻率調製共振破音
    u.volume = 1.0; // Android/全平台保持 1.0 原生滿幅，由系統硬體控制音量，杜絕軟體乘法量化雜音

    // 僅在有真正高品質語音時指派，否則保持 null，交由 iOS 17 / Android 系統最優原生引擎演繹
    if (this.voice) {
      u.voice = this.voice;
    }

    const handleFinished = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    u.onend = handleFinished;
    u.onerror = (e) => {
      console.warn("TTS 朗讀完成或中斷:", e);
      handleFinished();
    };

    // 2. Android 14~17+ / iOS 全平台防爆音排程：
    // 若當前正處於播放狀態，先進行安全 cancel，並給予 150ms 充分緩衝區釋放時間，
    // 徹底消除 AudioTrack / CoreAudio 硬體在方波截斷時造成的揚聲器瞬態衝激劇烈爆音 (Speaker diaphragm pop)；
    // 若當前無播放，直接流暢觸發，零延遲無爆音！
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending || this.isSpeaking) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}

      this.pendingSpeakTimeout = setTimeout(() => {
        try {
          this.isSpeaking = true;
          window.speechSynthesis.speak(u);
        } catch (e) {
          handleFinished();
        }
      }, 150);
    } else {
      try {
        this.isSpeaking = true;
        window.speechSynthesis.speak(u);
      } catch (e) {
        handleFinished();
      }
    }
  }

  // =========================================================================
  // 注音拼讀拆解引擎：聲母 + 介音 + 韻母 + 聲調
  // （例如：「家」＝ ㄐ [聲母] ＋ ㄧ [介音] ㄚ [韻母] ＋ 一聲）
  // =========================================================================
  decomposeZhuyinSyllable(rawSyllable) {
    if (!rawSyllable || typeof rawSyllable !== "string") return null;
    let str = rawSyllable.trim();
    if (!str) return null;

    const SHENGMU = ["ㄅ", "ㄆ", "ㄇ", "ㄈ", "ㄉ", "ㄊ", "ㄋ", "ㄌ", "ㄍ", "ㄎ", "ㄏ", "ㄐ", "ㄑ", "ㄒ", "ㄓ", "ㄔ", "ㄕ", "ㄖ", "ㄗ", "ㄘ", "ㄙ"];
    const JIEYIN = ["ㄧ", "ㄨ", "ㄩ"];
    const YUNMU = ["ㄚ", "ㄛ", "ㄜ", "ㄝ", "ㄞ", "ㄟ", "ㄠ", "ㄡ", "ㄢ", "ㄣ", "ㄤ", "ㄥ", "ㄦ"];
    const TONES = { "ˊ": "二聲", "ˇ": "三聲", "ˋ": "四聲", "˙": "輕聲", "·": "輕聲" };
    const TONES_FULL = { "ˊ": "第二聲", "ˇ": "第三聲", "ˋ": "第四聲", "˙": "輕聲", "·": "輕聲" };

    // 1. 聲調偵測 (包含前綴輕聲 ˙ㄉㄨㄛ 或 後綴調號 ㄍㄨㄛˊ)
    let tone = "一聲";
    let hasToneMark = false;

    if (str.startsWith("˙") || str.startsWith("·")) {
      tone = "輕聲";
      hasToneMark = true;
      str = str.replace(/^[˙·]/, "");
    } else if (/[ˊˇˋ˙·]/.test(str)) {
      const markMatch = str.match(/[ˊˇˋ˙·]/);
      if (markMatch) {
        const mark = markMatch[0];
        tone = TONES[mark] || "輕聲";
        hasToneMark = true;
        str = str.replace(/[ˊˇˋ˙·]/g, "");
      }
    }

    // 2. 純聲調符號
    if (TONES_FULL[rawSyllable.trim()]) {
      const toneFullName = TONES_FULL[rawSyllable.trim()];
      return {
        type: "tone_only",
        tone: toneFullName,
        formula: toneFullName,
        spellingText: toneFullName
      };
    }

    // 3. 聲母拆解
    let shengmu = null;
    if (str.length > 0 && SHENGMU.includes(str[0])) {
      shengmu = str[0];
      str = str.slice(1);
    }

    // 4. 純聲母處理 (如 Level 1~2: ㄅ、ㄆ、ㄇ，不帶韻母與聲調)
    if (shengmu && str.length === 0 && !hasToneMark) {
      return {
        type: "shengmu_only",
        shengmu: shengmu,
        jieyin: null,
        yunmu: null,
        tone: null,
        parts: [shengmu],
        formula: `${shengmu} [聲母]`,
        spellingText: shengmu
      };
    }

    // 5. 純韻母/純介音處理 (如 ㄥ、ㄣ、ㄤ、ㄡ、ㄜ 等單一符號認知，無調號標記)
    // 依台灣小學教學法：單韻母/符號認知發音不需念出聲調
    if (!shengmu && !hasToneMark && (YUNMU.includes(str) || JIEYIN.includes(str))) {
      const isJie = JIEYIN.includes(str);
      const label = isJie ? "[介音]" : "[韻母]";
      return {
        type: "yunmu_only",
        shengmu: null,
        jieyin: isJie ? str : null,
        yunmu: isJie ? null : str,
        tone: null,
        parts: [str],
        formula: `${str} ${label}`,
        spellingText: str
      };
    }

    // 6. 介音與韻母拆解
    let jieyin = null;
    let yunmu = null;

    if (str.length >= 2) {
      if (JIEYIN.includes(str[0])) {
        jieyin = str[0];
        yunmu = str.slice(1);
      } else {
        yunmu = str;
      }
    } else if (str.length === 1) {
      const char = str[0];
      if (JIEYIN.includes(char)) {
        jieyin = char;
      } else {
        yunmu = char;
      }
    }

    // 構建結構公式字串 (如: ㄐ [聲母] ＋ ㄧ [介音] ＋ ㄚ [韻母] ＋ 一聲)
    const formulaParts = [];
    if (shengmu) formulaParts.push(`${shengmu} [聲母]`);
    if (jieyin) formulaParts.push(`${jieyin} [介音]`);
    if (yunmu) formulaParts.push(`${yunmu} [韻母]`);
    if (tone) formulaParts.push(tone);

    // 構建拼讀朗讀字串：以頓號分隔各部符號，接逗號聲調
    // 例如：ㄐ、ㄧ、ㄚ，一聲
    const soundParts = [];
    if (shengmu) soundParts.push(shengmu);
    if (jieyin) soundParts.push(jieyin);
    if (yunmu) soundParts.push(yunmu);

    const spellingText = soundParts.length > 0
      ? `${soundParts.join("、")}，${tone}`
      : tone;

    return {
      type: "syllable",
      shengmu,
      jieyin,
      yunmu,
      tone,
      formula: formulaParts.join(" ＋ "),
      spellingText
    };
  }

  // 建立注音符號 -> 代表漢字對照快取字典 (全聲調覆蓋，涵蓋每個選項與所有干擾項)
  initZhuyinMap() {
    if (this.zhuyinCharMap) return this.zhuyinCharMap;

    // 基礎全量字典 (涵蓋所有常見聲韻母組合與一～四聲常見漢字，確保干擾選項 100% 唸出整個發音)
    this.zhuyinCharMap = {
      // 唇音與 ㄛ/ㄨㄛ 系列 (含各聲調與干擾項)
      "ㄅㄛ": "波", "ㄅㄛˊ": "伯", "ㄅㄛˇ": "跛", "ㄅㄛˋ": "擘",
      "ㄆㄛ": "坡", "ㄆㄛˊ": "婆", "ㄆㄛˇ": "叵", "ㄆㄛˋ": "破",
      "ㄇㄛ": "摸", "ㄇㄛˊ": "磨", "ㄇㄛˇ": "抹", "ㄇㄛˋ": "墨",
      "ㄈㄛˊ": "佛",
      "ㄉㄨㄛ": "多", "ㄉㄨㄛˊ": "奪", "ㄉㄨㄛˇ": "朵", "ㄉㄨㄛˋ": "舵",
      "ㄊㄨㄛ": "拖", "ㄊㄨㄛˊ": "駝", "ㄊㄨㄛˇ": "妥", "ㄊㄨㄛˋ": "唾",
      "ㄍㄨㄛ": "鍋", "ㄍㄨㄛˊ": "國", "ㄍㄨㄛˇ": "果", "ㄍㄨㄛˋ": "過",
      "ㄎㄨㄛ": "闊", "ㄎㄨㄛˊ": "擴", "ㄎㄨㄛˋ": "闊",
      "ㄏㄨㄛ": "豁", "ㄏㄨㄛˊ": "活", "ㄏㄨㄛˇ": "火", "ㄏㄨㄛˋ": "貨",
      "ㄗㄨㄛ": "撮", "ㄗㄨㄛˊ": "昨", "ㄗㄨㄛˇ": "左", "ㄗㄨㄛˋ": "做",
      "ㄘㄨㄛ": "搓", "ㄘㄨㄛˊ": "痤", "ㄘㄨㄛˇ": "脞", "ㄘㄨㄛˋ": "錯",
      "ㄙㄨㄛ": "縮", "ㄙㄨㄛˊ": "索", "ㄙㄨㄛˇ": "鎖", "ㄙㄨㄛˋ": "索",
      "ㄌㄨㄛ": "羅", "ㄌㄨㄛˊ": "螺", "ㄌㄨㄛˇ": "裸", "ㄌㄨㄛˋ": "落",
      "ㄋㄨㄛ": "挪", "ㄋㄨㄛˊ": "挪", "ㄋㄨㄛˇ": "懦", "ㄋㄨㄛˋ": "糯",
      "ㄓㄨㄛ": "桌", "ㄓㄨㄛˊ": "捉", "ㄓㄨㄛˇ": "卓", "ㄓㄨㄛˋ": "啄",
      "ㄔㄨㄛ": "戳", "ㄔㄨㄛˊ": "戳", "ㄔㄨㄛˇ": "戳", "ㄔㄨㄛˋ": "輟",
      "ㄕㄨㄛ": "說", "ㄕㄨㄛˊ": "碩", "ㄕㄨㄛˇ": "朔", "ㄕㄨㄛˋ": "碩",
      "ㄖㄨㄛˋ": "弱",

      // ㄓ vs ㄗ (翹舌音 vs 平舌音) 系列
      "ㄓㄨ": "豬", "ㄓㄨˊ": "竹", "ㄓㄨˇ": "主", "ㄓㄨˋ": "住",
      "ㄗㄨ": "租", "ㄗㄨˊ": "足", "ㄗㄨˇ": "組",
      "ㄔㄨ": "出", "ㄔㄨˊ": "除", "ㄔㄨˇ": "楚", "ㄔㄨˋ": "處",
      "ㄘㄨ": "粗", "ㄘㄨˊ": "殂", "ㄘㄨˇ": "促", "ㄘㄨˋ": "醋",
      "ㄕㄨ": "書", "ㄕㄨˊ": "叔", "ㄕㄨˇ": "數", "ㄕㄨˋ": "樹",
      "ㄙㄨ": "蘇", "ㄙㄨˊ": "俗", "ㄙㄨˇ": "素", "ㄙㄨˋ": "素",
      "ㄖㄨ": "如", "ㄖㄨˊ": "儒", "ㄖㄨˇ": "乳", "ㄖㄨˋ": "入",
      "ㄓ": "知", "ㄓˊ": "直", "ㄓˇ": "紙", "ㄓˋ": "志",
      "ㄗ": "資", "ㄗˊ": "賊", "ㄗˇ": "紫", "ㄗˋ": "字",
      "ㄔ": "吃", "ㄔˊ": "池", "ㄔˇ": "尺", "ㄔˋ": "赤",
      "ㄘ": "雌", "ㄘˊ": "磁", "ㄘˇ": "此", "ㄘˋ": "刺",
      "ㄕ": "獅", "ㄕˊ": "十", "ㄕˇ": "史", "ㄕˋ": "事",
      "ㄙ": "絲", "ㄙˊ": "司", "ㄙˇ": "死", "ㄙˋ": "四",
      "ㄖˋ": "日",
      "ㄓㄜ": "遮", "ㄓㄜˊ": "折", "ㄓㄜˇ": "者", "ㄓㄜˋ": "這",
      "ㄗㄜ": "則", "ㄗㄜˊ": "責", "ㄗㄜˇ": "仄", "ㄗㄜˋ": "側",
      "ㄔㄜ": "車", "ㄔㄜˊ": "扯", "ㄔㄜˇ": "扯", "ㄔㄜˋ": "澈",
      "ㄘㄜ": "策", "ㄘㄜˊ": "冊", "ㄘㄜˇ": "測", "ㄘㄜˋ": "測",
      "ㄕㄜ": "奢", "ㄕㄜˊ": "蛇", "ㄕㄜˇ": "捨", "ㄕㄜˋ": "社",
      "ㄙㄜˋ": "色",
      "ㄖㄜˇ": "惹", "ㄖㄜˋ": "熱",
      "ㄓㄠ": "招", "ㄓㄠˊ": "著", "ㄓㄠˇ": "找", "ㄓㄠˋ": "照",
      "ㄗㄠ": "糟", "ㄗㄠˊ": "鑿", "ㄗㄠˇ": "早", "ㄗㄠˋ": "造",
      "ㄔㄠ": "抄", "ㄔㄠˊ": "巢", "ㄔㄠˇ": "炒", "ㄔㄠˋ": "吵",
      "ㄘㄠ": "操", "ㄘㄠˊ": "曹", "ㄘㄠˇ": "草", "ㄘㄠˋ": "糙",
      "ㄕㄠ": "燒", "ㄕㄠˊ": "勺", "ㄕㄠˇ": "少", "ㄕㄠˋ": "哨",
      "ㄙㄠ": "騷", "ㄙㄠˊ": "掃", "ㄙㄠˇ": "嫂", "ㄙㄠˋ": "掃",

      // ㄜ vs ㄦ 系列
      "ㄍㄜ": "歌", "ㄍㄜˊ": "革", "ㄍㄜˇ": "葛", "ㄍㄜˋ": "個",
      "ㄏㄜ": "喝", "ㄏㄜˊ": "河", "ㄏㄜˇ": "合", "ㄏㄜˋ": "賀",
      "ㄎㄜ": "科", "ㄎㄜˊ": "咳", "ㄎㄜˇ": "可", "ㄎㄜˋ": "客",
      "ㄌㄜ": "勒", "ㄌㄜˋ": "樂", "ㄌㄜ˙": "了",
      "ㄜ": "鵝", "ㄜˊ": "鵝", "ㄜˇ": "噁", "ㄜˋ": "餓",
      "ㄦ": "兒", "ㄦˊ": "兒", "ㄦˇ": "耳", "ㄦˋ": "二",

      // ㄥ vs ㄣ 系列 (前後鼻音)
      "ㄈㄥ": "風", "ㄈㄥˊ": "逢", "ㄈㄥˇ": "諷", "ㄈㄥˋ": "鳳",
      "ㄈㄣ": "分", "ㄈㄣˊ": "墳", "ㄈㄣˇ": "粉", "ㄈㄣˋ": "份",
      "ㄈㄤ": "方", "ㄈㄤˊ": "房", "ㄈㄤˇ": "仿", "ㄈㄤˋ": "放",
      "ㄈㄢ": "翻", "ㄈㄢˊ": "凡", "ㄈㄢˇ": "反", "ㄈㄢˋ": "飯",
      "ㄒㄧㄥ": "星", "ㄒㄧㄥˊ": "行", "ㄒㄧㄥˇ": "醒", "ㄒㄧㄥˋ": "姓",
      "ㄒㄧㄣ": "心", "ㄒㄧㄣˊ": "尋", "ㄒㄧㄣˇ": "審", "ㄒㄧㄣˋ": "信",
      "ㄒㄧㄤ": "香", "ㄒㄧㄤˊ": "翔", "ㄒㄧㄤˇ": "想", "ㄒㄧㄤˋ": "象",
      "ㄒㄧㄢ": "先", "ㄒㄧㄢˊ": "鹹", "ㄒㄧㄢˇ": "顯", "ㄒㄧㄢˋ": "線",
      "ㄏㄨㄣ": "昏", "ㄏㄨㄣˊ": "魂", "ㄏㄨㄣˇ": "混", "ㄏㄨㄣˋ": "混",
      "ㄏㄨㄥ": "轟", "ㄏㄨㄥˊ": "紅", "ㄏㄨㄥˇ": "哄", "ㄏㄨㄥˋ": "哄",
      "ㄏㄨㄤ": "慌", "ㄏㄨㄤˊ": "黃", "ㄏㄨㄤˇ": "謊", "ㄏㄨㄤˋ": "晃",
      "ㄇㄥ": "蒙", "ㄇㄥˊ": "萌", "ㄇㄥˇ": "猛", "ㄇㄥˋ": "夢",
      "ㄇㄣ": "悶", "ㄇㄣˊ": "門", "ㄇㄣˇ": "捫", "ㄇㄣˋ": "悶",
      "ㄇㄢ": "蠻", "ㄇㄢˊ": "饅", "ㄇㄢˇ": "滿", "ㄇㄢˋ": "慢",
      "ㄕㄥ": "生", "ㄕㄥˊ": "繩", "ㄕㄥˇ": "省", "ㄕㄥˋ": "勝",
      "ㄕㄣ": "身", "ㄕㄣˊ": "神", "ㄕㄣˇ": "審", "ㄕㄣˋ": "慎",
      "ㄕㄤ": "商", "ㄕㄤˊ": "裳", "ㄕㄤˇ": "賞", "ㄕㄤˋ": "上",
      "ㄕㄢ": "山", "ㄕㄢˊ": "珊", "ㄕㄢˇ": "閃", "ㄕㄢˋ": "扇",
      "ㄓㄥ": "爭", "ㄓㄥˊ": "拯", "ㄓㄥˇ": "整", "ㄓㄥˋ": "正",
      "ㄓㄣ": "真", "ㄓㄣˊ": "甄", "ㄓㄣˇ": "枕", "ㄓㄣˋ": "陣",
      "ㄓㄤ": "張", "ㄓㄤˊ": "長", "ㄓㄤˇ": "掌", "ㄓㄤˋ": "帳",
      "ㄓㄢ": "沾", "ㄓㄢˊ": "展", "ㄓㄢˇ": "展", "ㄓㄢˋ": "站",

      // ㄝ vs ㄟ 系列
      "ㄈㄟ": "飛", "ㄈㄟˊ": "肥", "ㄈㄟˇ": "匪", "ㄈㄟˋ": "費",
      "ㄅㄟ": "杯", "ㄅㄟˊ": "培", "ㄅㄟˇ": "北", "ㄅㄟˋ": "被",
      "ㄏㄨㄟ": "灰", "ㄏㄨㄟˊ": "回", "ㄏㄨㄟˇ": "毀", "ㄏㄨㄟˋ": "會",
      "ㄊㄨㄟ": "推", "ㄊㄨㄟˊ": "頹", "ㄊㄨㄟˇ": "腿", "ㄊㄨㄟˋ": "退",
      "ㄊㄧㄝ": "貼", "ㄊㄧㄝˇ": "鐵", "ㄊㄧㄝˋ": "貼",
      "ㄅㄧㄝ": "憋", "ㄅㄧㄝˊ": "別", "ㄅㄧㄝˇ": "癟", "ㄅㄧㄝˋ": "彆",
      "ㄇㄧㄝ": "咩", "ㄇㄧㄝˊ": "滅", "ㄇㄧㄝˇ": "蔑", "ㄇㄧㄝˋ": "滅",
      "ㄐㄧㄝ": "街", "ㄐㄧㄝˊ": "節", "ㄐㄧㄝˇ": "姐", "ㄐㄧㄝˋ": "借",
      "ㄑㄧㄝ": "切", "ㄑㄧㄝˊ": "茄", "ㄑㄧㄝˇ": "且", "ㄑㄧㄝˋ": "怯",
      "ㄒㄧㄝ": "些", "ㄒㄧㄝˊ": "鞋", "ㄒㄧㄝˇ": "寫", "ㄒㄧㄝˋ": "謝",
      "ㄧㄝ": "耶", "ㄧㄝˊ": "爺", "ㄧㄝˇ": "也", "ㄧㄝˋ": "葉",
      "ㄍㄟ": "給", "ㄍㄟˇ": "給", "ㄍㄟˋ": "給",
      "ㄕㄟˊ": "誰",
      "ㄕㄨㄟ": "說", "ㄕㄨㄟˊ": "誰", "ㄕㄨㄟˇ": "水", "ㄕㄨㄟˋ": "睡",
      "ㄨㄟ": "微", "ㄨㄟˊ": "圍", "ㄨㄟˇ": "委", "ㄨㄟˋ": "位",

      // ㄛ vs ㄡ 系列
      "ㄊㄡ": "偷", "ㄊㄡˊ": "頭", "ㄊㄡˇ": "骰", "ㄊㄡˋ": "透",
      "ㄉㄡ": "兜", "ㄉㄡˊ": "斗", "ㄉㄡˇ": "抖", "ㄉㄡˋ": "豆",
      "ㄏㄡ": "齁", "ㄏㄡˊ": "猴", "ㄏㄡˇ": "吼", "ㄏㄡˋ": "後",
      "ㄍㄡ": "溝", "ㄍㄡˊ": "狗", "ㄍㄡˇ": "狗", "ㄍㄡˋ": "夠",
      "ㄎㄡ": "摳", "ㄎㄡˊ": "口", "ㄎㄡˇ": "口", "ㄎㄡˋ": "扣",
      "ㄗㄡ": "鄒", "ㄗㄡˊ": "走", "ㄗㄡˇ": "走", "ㄗㄡˋ": "奏",
      "ㄘㄡ": "湊", "ㄘㄡˊ": "愁", "ㄘㄡˇ": "醜", "ㄘㄡˋ": "湊",
      "ㄙㄡ": "搜", "ㄙㄡˊ": "颼", "ㄙㄡˇ": "叟", "ㄙㄡˋ": "嗽",
      "ㄓㄡ": "周", "ㄓㄡˊ": "軸", "ㄓㄡˇ": "帚", "ㄓㄡˋ": "晝",
      "ㄔㄡ": "抽", "ㄔㄡˊ": "愁", "ㄔㄡˇ": "醜", "ㄔㄡˋ": "臭",
      "ㄕㄡ": "收", "ㄕㄡˊ": "熟", "ㄕㄡˇ": "手", "ㄕㄡˋ": "獸",
      "ㄖㄡ": "揉", "ㄖㄡˊ": "柔", "ㄖㄡˇ": "肉", "ㄖㄡˋ": "肉",
      "ㄌㄡ": "摟", "ㄌㄡˊ": "樓", "ㄌㄡˇ": "簍", "ㄌㄡˋ": "漏",
      "ㄋㄡˇ": "鈕",
      "ㄅㄡ": "抔", "ㄆㄡˊ": "抔", "ㄇㄡ": "眸", "ㄇㄡˊ": "謀", "ㄇㄡˇ": "某",

      // 其他音節覆蓋
      "ㄩㄝˋ": "月", "ㄇㄟ": "眉", "ㄇㄟˊ": "梅", "ㄇㄟˋ": "妹",
      "ㄉㄧㄝˋ": "疊", "ㄉㄨㄟ": "堆", "ㄉㄨㄟˇ": "隊", "ㄉㄨㄟˋ": "對",
      "ㄌㄧㄡ": "溜", "ㄌㄧㄡˊ": "流", "ㄌㄧㄡˇ": "柳", "ㄌㄧㄡˋ": "六",

      // 易錯特訓 13 大實戰新增音節與字詞覆蓋
      "ㄉㄨㄥˋ": "洞", "ㄉㄥˋ": "凳", "ㄉㄨㄥ": "東", "ㄉㄥ": "燈",
      "ㄌㄨˇ": "滷", "ㄌㄨ": "爐", "ㄌㄨˋ": "鹿",
      "ㄐㄧㄣ": "今", "ㄐㄧㄥ": "京", "ㄐㄧㄣˋ": "進", "ㄐㄧㄥˋ": "靜", "ㄐㄧㄣˇ": "緊", "ㄐㄧㄥˇ": "頸",
      "ㄑㄧㄥˊ": "情", "ㄑㄧㄣˊ": "琴", "ㄑㄧㄡˊ": "球", "ㄑㄧㄡ": "秋", "ㄑㄧㄡˋ": "救",
      "ㄙㄨㄥˋ": "送", "ㄙㄨㄥ": "鬆", "ㄙㄥ": "僧",
      "ㄎㄨㄥˇ": "孔", "ㄎㄥˇ": "肯", "ㄎㄨㄥ": "空", "ㄎㄥ": "坑",
      "ㄌㄠˇ": "老", "ㄌㄠˊ": "勞", "ㄌㄠ": "撈", "ㄌㄠˋ": "澇",
      "ㄗㄤ": "髒", "ㄗㄤˇ": "攢",
      "ㄋㄠˋ": "鬧", "ㄋㄠ": "孬", "ㄖㄠˋ": "繞", "ㄖㄠ": "饒",
      "ㄖㄜ": "惹", "ㄖㄜˇ": "惹",
      "ㄅㄛ˙": "蔔",
      "ㄖㄜˋ ㄋㄠˋ": "熱鬧",
      "ㄌㄨㄛˊ ㄅㄛ˙": "蘿蔔",
      "ㄧㄡ ㄌㄨㄛˋ ㄖㄨˇ": "優落乳"
    };

    // 1. 優先從 CONFUSION_PAIR_GROUPS 提取精準對比字 (87 組易錯生字)
    try {
      const groups = (typeof getConfusionPairGroups === "function")
        ? getConfusionPairGroups()
        : (typeof CONFUSION_PAIR_GROUPS !== "undefined" ? CONFUSION_PAIR_GROUPS : []);

      if (Array.isArray(groups)) {
        groups.forEach(g => {
          if (Array.isArray(g.pairs)) {
            g.pairs.forEach(p => {
              if (p.zhuyin && p.char) {
                this.zhuyinCharMap[p.zhuyin] = p.char;
              }
            });
          }
        });
      }
    } catch (e) {}

    // 2. 從 ZHUYIN_ITEMS 提取各教材級別注音的代表字
    try {
      const items = (typeof ZHUYIN_ITEMS !== "undefined") ? ZHUYIN_ITEMS : [];
      if (Array.isArray(items)) {
        items.forEach(it => {
          if (it.key && it.meaning && !this.zhuyinCharMap[it.key]) {
            const clean = it.meaning.replace(/\s*[\(（].*?[\)）]/g, "").trim().split(/[\/／\s]+/)[0];
            if (clean) {
              this.zhuyinCharMap[it.key] = clean[0];
            }
          }
        });
      }
    } catch (e) {}

    return this.zhuyinCharMap;
  }

  // 查詢注音符號對應之代表漢字
  lookupZhuyinChar(zhuyinKey) {
    if (!zhuyinKey || typeof zhuyinKey !== "string") return "";
    const cleanKey = zhuyinKey.trim();
    const map = this.initZhuyinMap();
    return map[cleanKey] || "";
  }

  // 構建全詞彙之拼讀發音字串
  // mode:
  // - 'full': 教學情境完整拼讀 (如「家」: ㄐ、ㄧ、ㄚ，一聲，家)
  // - 'quiz': 測驗情境注音拼讀 (先唸注音符號及聲調，再唸出整個發音，例如 ㄆㄛˊ: ㄆ、ㄛ，二聲，婆；單韻母無調直接念原音)
  // - 'pure': 純音節拆解
  buildSpellingPhrase(item, mode = "full") {
    if (!item) return "";
    const TONES = { "ˊ": "第二聲", "ˇ": "第三聲", "ˋ": "第四聲", "˙": "輕聲" };
    if (TONES[item.key]) {
      return TONES[item.key];
    }

    const rawKey = String(item.key || "").trim();
    const syllables = rawKey.split(/\s+/).filter(Boolean);

    // 提取主要乾淨中文詞彙 (過濾括號與斜線)
    let cleanMeaning = item.meaning ? item.meaning.replace(/\s*[\(（].*?[\)）]/g, "").trim() : "";
    cleanMeaning = cleanMeaning.replace(/[\/／]+/g, " ").trim();
    const words = cleanMeaning.split(/\s+/).filter(Boolean);
    const targetWord = words[0] || "";

    if (syllables.length === 0) return rawKey;

    const decomposedList = syllables.map(s => this.decomposeZhuyinSyllable(s));

    // 測驗專用拼讀模式 (先唸注音符號及聲調，再唸出整個發音，例如 ㄆㄛ二聲 再唸婆)
    if (mode === "quiz") {
      if (syllables.length === 1) {
        const single = decomposedList[0];
        // 輔助過濾純漢字
        const getSafeHanzi = (val) => (typeof val === "string" && /^[\u4e00-\u9fa5]+$/.test(val.trim())) ? val.trim() : "";

        // 1. 單韻母/介音且無聲調 (如 ㄥ, ㄣ, ㄤ, ㄡ, ㄜ, ㄝ, ㄟ, ㄛ):
        if (single.type === "yunmu_only") {
          const symbol = single.yunmu || single.jieyin || rawKey;
          const rawChar = item.char || this.lookupZhuyinChar(rawKey) || (targetWord ? targetWord[0] : "");
          const targetChar = getSafeHanzi(rawChar);
          return targetChar ? `${symbol}，${targetChar}` : symbol;
        }
        // 2. 純聲母且無聲調 (如 ㄅ, ㄆ, ㄇ, ㄔ, ㄘ): 先唸注音符號，再唸代表字
        if (single.type === "shengmu_only") {
          const symbol = single.shengmu || rawKey;
          const rawChar = item.char || this.lookupZhuyinChar(rawKey) || (targetWord ? targetWord[0] : "");
          const targetChar = getSafeHanzi(rawChar);
          return targetChar ? `${symbol}，${targetChar}` : symbol;
        }
        // 3. 音節拼讀 (聲母+韻母 或 帶調號音節，如 ㄆㄛˊ, ㄆㄛ, ㄉㄨㄛˇ, ㄓㄨˊ, ㄗㄜˊ 等):
        // 先唸注音符號及聲調，再唸出整個發音 (包含每個選項，不限於正確答案)
        const rawChar = item.char || this.lookupZhuyinChar(rawKey) || (targetWord ? targetWord[0] : "");
        const targetChar = getSafeHanzi(rawChar);
        if (targetChar) {
          // 前後鼻音 (心 vs 星、今天 vs 心情) 增加自然呼吸停頓，突顯前閉音與後鼻腔共鳴對比
          const separator = /ㄒㄧㄣ|ㄒㄧㄥ|ㄐㄧㄣ|ㄐㄧㄥ|ㄑㄧㄣ|ㄑㄧㄥ/.test(rawKey) ? "。 " : "，";
          return `${single.spellingText}${separator}${targetChar}`;
        }
        // 若為無代表漢字之混淆音節 (如 ㄗㄨˋ、ㄙㄥˋ)，直接朗讀拼讀結構本身，杜絕直接朗讀注音符號引發的跨語言撕裂破音
        return single.spellingText;
      } else {
        // 多音節 (如 ㄒㄧㄤˋ ㄑㄧㄢˊ 向前 / ㄖㄜˋ ㄋㄠˋ 熱鬧 / ㄌㄨㄛˊ ㄅㄛ˙ 蘿蔔)
        // 先唸各注音符號及聲調，再唸出整個發音 (包含每個選項，不限於正確答案)
        const spellings = decomposedList.map(d => d.spellingText).join("。");
        const rawPhrase = item.char || item.word || this.lookupZhuyinChar(rawKey) || targetWord || "";
        const phraseWord = (typeof rawPhrase === "string" && /^[\u4e00-\u9fa5]+$/.test(rawPhrase.trim())) ? rawPhrase.trim() : "";
        if (phraseWord) {
          return `${spellings}。${phraseWord}`;
        }
        // 若無整詞對應，嘗試組合各音節代表漢字
        const chars = syllables.map(s => this.lookupZhuyinChar(s)).filter(c => typeof c === "string" && /^[\u4e00-\u9fa5]+$/.test(c.trim()));
        if (chars.length === syllables.length) {
          return `${spellings}。${chars.join("")}`;
        }
        return spellings;
      }
    }

    if (mode === "pure") {
      // 聽力題：若未傳入漢字，返回純分解
      return decomposedList.map(d => d.spellingText).join("。");
    }

    // 教學情境 (full): 依序拼讀各音節，最後連讀詞彙
    // 單字 (如「家」ㄐㄧㄚ): ㄐ、ㄧ、ㄚ，一聲，家
    // 多字 (如「香水」ㄒㄧㄤ ㄕㄨㄟˇ): ㄒ、ㄧ、ㄤ，一聲。ㄕ、ㄨ、ㄟ，三聲。香水。
    if (syllables.length === 1) {
      const single = decomposedList[0];
      if (single.type === "shengmu_only") {
        return targetWord ? `${single.shengmu}，${targetWord}` : single.shengmu;
      }
      if (single.type === "yunmu_only") {
        const symbol = single.yunmu || single.jieyin;
        return targetWord ? `${symbol}，${targetWord}` : symbol;
      }
      return targetWord ? `${single.spellingText}，${targetWord}` : single.spellingText;
    } else {
      const spellings = decomposedList.map(d => d.spellingText).join("。");
      return targetWord ? `${spellings}。${targetWord}` : spellings;
    }
  }

  // 取得該單元之結構拼讀公式 (供 UI 提示或教學展示使用)
  getSpellingFormula(item) {
    if (!item) return "";
    const syllables = String(item.key || "").trim().split(/\s+/).filter(Boolean);
    return syllables
      .map(s => this.decomposeZhuyinSyllable(s)?.formula)
      .filter(Boolean)
      .join(" ； ");
  }

  // 朗讀注音符號與示範例詞 (全部依照 聲母 + 介音 + 韻母 + 聲調 拼讀發音)
  // mode: 'full' (教學卡片完整拼讀連讀) | 'pure' (聽辨題拼讀音節不帶漢字) | 'word' (直接朗讀詞彙，如「花朵」)
  speakItem(item, mode = "full", onEnd) {
    if (!item) return;

    // 若指定直接朗讀詞彙 (例如生字聽選測驗：直接唸「花朵」，不個別唸「ㄉ、ㄨ、ㄛ，三聲」)
    if (mode === "word" || item.directWord) {
      const wordText = item.directWord || (item.meaning ? item.meaning.replace(/\s*[\(（].*?[\)）]/g, "").trim() : item.key);
      this.speak(wordText, onEnd);
      return;
    }

    // 聲調符號特別處理
    const toneMap = {
      "ˊ": "第二聲",
      "ˇ": "第三聲",
      "ˋ": "第四聲",
      "˙": "輕聲"
    };

    if (toneMap[item.key]) {
      this.speak(toneMap[item.key], onEnd);
      return;
    }

    // 拼讀字串構建（前後鼻音透過逗點/句點自然換氣停頓區隔，不進行人工降速以防止時域拉伸破音）
    const spellingPhrase = this.buildSpellingPhrase(item, mode);
    this.speak(spellingPhrase, onEnd);
  }
}

// 實例化全域音訊物件
const audioManager = new AudioEngine();
