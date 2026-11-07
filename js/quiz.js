/**
 * 三合一自適應評量出題引擎 (Adaptive Quiz Engine)
 * 1. 概念選擇題 (Choice): 注音辨識，從同級中抽取干擾項
 * 2. 聽覺感知辨識 (Listening): 語音發音聽辨注音符號
 * 3. 拼組實作題 (Assembly): 拼音積木拼組出目標字符
 */

class QuizEngine {
  constructor(storage, allItems, audio) {
    this.storage = storage;
    this.allItems = allItems;
    this.audio = audio;

    this.currentSession = null;
    this.currentIndex = 0;
    this.onProgressCallback = null;
    this.onFinishCallback = null;
  }

  // 從陣列隨機洗牌
  shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // 從同級題目中抽選干擾項 (排除自己)
  getDistractors(targetItem, count = 3) {
    const pool = this.allItems.filter(item => item.level === targetItem.level && item.id !== targetItem.id);
    let shuffled = this.shuffle(pool);
    if (shuffled.length < count) {
      // 若同級不足，放寬至所有題目
      const extra = this.allItems.filter(item => item.id !== targetItem.id && !shuffled.some(s => s.id === item.id));
      shuffled = shuffled.concat(this.shuffle(extra));
    }
    return shuffled.slice(0, count);
  }

  // 提取純中文詞彙 (過濾括號注音與斜線，避免測驗時劇透答案)
  getCleanWord(meaning) {
    if (!meaning) return "";
    return meaning
      .replace(/\s*[\(（].*?[\)）]/g, "")
      .replace(/[\/／]+/g, " ")
      .trim();
  }

  // 為單一目標單元生成三合一題組
  generateUnitQuestions(item) {
    const questions = [];
    const distractors = this.getDistractors(item, 3);
    const cleanWord = this.getCleanWord(item.meaning);

    // 1. 題型一: 概念辨識選擇題 (只顯示純中文詞彙，不顯示括號注音)
    const choiceOptions = this.shuffle([
      { text: `${item.icon} ${cleanWord}`, isCorrect: true, key: item.key },
      ...distractors.map(d => ({ text: `${d.icon} ${this.getCleanWord(d.meaning)}`, isCorrect: false, key: d.key }))
    ]);
    questions.push({
      type: "choice",
      typeName: "概念辨識",
      title: `請問「${item.key}」是哪一個的注音？`,
      targetItem: item,
      displaySubject: item.key,
      hint: item.metadata?.hint || "",
      options: choiceOptions
    });

    // 2. 題型二: 聽覺感知辨識題 (發音聽辨)
    const listeningOptions = this.shuffle([
      { text: item.key, isCorrect: true, meaning: cleanWord, icon: item.icon },
      ...distractors.map(d => ({ text: d.key, isCorrect: false, meaning: this.getCleanWord(d.meaning), icon: d.icon }))
    ]);
    questions.push({
      type: "listening",
      typeName: "聽覺辨識",
      title: "聽一聽語音，請選出聽到的注音符號：",
      targetItem: item,
      displaySubject: "🔊",
      hint: "點擊小喇叭可以重複播放發音喔！",
      options: listeningOptions
    });

    // 3. 題型三: 拼音積木拼組題 (只顯示目標詞彙，不顯示拼音答案)
    const parts = item.metadata?.parts || [item.key];
    // 挑選 2 個干擾積木
    const candidateParts = ["ㄅ", "ㄆ", "ㄇ", "ㄉ", "ㄊ", "ㄚ", "ㄛ", "ㄧ", "ㄨ", "ˊ", "ˇ", "ˋ"];
    const fakeParts = this.shuffle(candidateParts.filter(p => !parts.includes(p))).slice(0, 2);
    const assemblyBlocks = this.shuffle([...parts, ...fakeParts]);

    questions.push({
      type: "assembly",
      typeName: "積木拼組",
      title: `請拼出「${cleanWord}」的注音：`,
      targetItem: item,
      displaySubject: `${item.icon} ${cleanWord}`,
      hint: item.metadata?.hint || "點選下方注音積木完成拼組！",
      requiredParts: parts,
      blocks: assemblyBlocks
    });

    return questions;
  }

  // 為易錯字生成專屬聽寫加強題組 (ㄥ、ㄣ、ㄤ、ㄡ、ㄜ、ㄝ、ㄟ、ㄛ)
  generateDictationQuestions(mode = "symbols") {
    const config = (typeof getConfusionConfig === "function") ? getConfusionConfig() : null;
    if (!config) return [];

    const questions = [];

    if (mode === "symbols") {
      // 模式 A: 8 大易錯音符號極限聽辨特訓 (每音 2 題，共 16 題)
      config.symbols.forEach(sym => {
        const item = this.allItems.find(it => it.id === sym.id) || { id: sym.id, key: sym.key, meaning: sym.soundWord, icon: sym.icon };
        const cleanWord = this.getCleanWord(item.meaning);

        // 1. 聽音選符號 (選項均為易混淆音)
        const opts = this.shuffle([
          { text: sym.key, isCorrect: true, meaning: cleanWord, icon: sym.icon },
          ...sym.distractors.map(dKey => {
            const dItem = this.allItems.find(it => it.key === dKey) || { key: dKey, icon: "👂" };
            return { text: dKey, isCorrect: false, meaning: "", icon: dItem.icon || "👂" };
          })
        ]);

        questions.push({
          type: "listening",
          typeName: "易錯音聽辨",
          title: `🎧 聽音聽寫：請聽語音，選出聽到的易錯注音符號（${sym.name}）：`,
          targetItem: item,
          displaySubject: "🔊",
          hint: sym.tip || "仔細分辨舌頭、唇形與共鳴位置喔！",
          options: opts
        });

        // 2. 聽音拼寫積木 (候選積木嚴格放入易混淆音)
        const blocks = this.shuffle([sym.key, ...sym.distractors]);
        questions.push({
          type: "assembly",
          typeName: "易錯音聽寫拼裝",
          title: `🎧 聽音拼寫：請聽語音，點選積木拼出「${sym.key}」：`,
          targetItem: item,
          displaySubject: `🔊 聽音拼寫【${sym.key}】`,
          hint: sym.tip,
          requiredParts: [sym.key],
          blocks: blocks
        });
      });
    } else if (mode === "pairs") {
      // 模式 C: 易錯生字詞彙聽選練習 (涵蓋 13 大生活實戰精練題 + 6 大經典對比群組)
      const pairGroups = (typeof getConfusionPairGroups === "function") ? getConfusionPairGroups() : [];
      const selectedPairs = [];

      // 優先抽取高頻生活實戰 13 大精選題目 (至少精選 4~6 題)
      const essentialGroup = pairGroups.find(g => g.id === "essential_13_advanced");
      if (essentialGroup && essentialGroup.pairs) {
        const shuffledEssential = this.shuffle([...essentialGroup.pairs]);
        shuffledEssential.slice(0, 6).forEach(p => {
          selectedPairs.push({ ...p, groupId: essentialGroup.id, groupName: essentialGroup.name, groupTip: essentialGroup.tip });
        });
      }

      // 其他各大群組均衡挑選涵蓋不同聲調的題目 (每組 1~2 題，總題數約 14~16 題)
      pairGroups.filter(g => g.id !== "essential_13_advanced").forEach(group => {
        const tonesCovered = new Set();
        const shuffledGroupPairs = this.shuffle([...group.pairs]);
        const maxPerGroup = 2;

        shuffledGroupPairs.forEach(p => {
          if (!tonesCovered.has(p.tone) && selectedPairs.filter(sp => sp.groupId === group.id).length < maxPerGroup) {
            tonesCovered.add(p.tone);
            selectedPairs.push({ ...p, groupId: group.id, groupName: group.name, groupTip: group.tip });
          }
        });
      });

      // 構建生字詞彙聽選題目
      selectedPairs.forEach(pair => {
        const toneNameMap = { 1: "一聲", 2: "二聲", 3: "三聲", 4: "四聲", 0: "輕聲" };
        const toneStr = toneNameMap[pair.tone] || "";

        // 輔助查詢各選項的代表漢字 (確保每個選項不限於正確答案，皆有代表字)
        const getOptChar = (zKey) => {
          if (typeof audioManager !== "undefined" && typeof audioManager.lookupZhuyinChar === "function") {
            const found = audioManager.lookupZhuyinChar(zKey);
            if (found) return found;
            const syllables = String(zKey).trim().split(/\s+/).filter(Boolean);
            if (syllables.length > 1) {
              const chars = syllables.map(s => audioManager.lookupZhuyinChar(s)).filter(Boolean);
              if (chars.length === syllables.length) return chars.join("");
            }
          }
          return "";
        };

        // 構建純注音選項（標準注音聽選題：包含每個選項，不限於正確答案，皆能發音完整生字）
        const optList = [
          { text: pair.zhuyin, isCorrect: true, key: pair.zhuyin, char: pair.char, meaning: pair.word, word: pair.word },
          { text: pair.confusedZhuyin, isCorrect: false, key: pair.confusedZhuyin, char: getOptChar(pair.confusedZhuyin) }
        ];

        // 從 distractors 補充至 3~4 個純注音選項
        const extraDistractors = (pair.distractors || [])
          .filter(d => d !== pair.zhuyin && d !== pair.confusedZhuyin)
          .slice(0, 2);

        extraDistractors.forEach(d => {
          optList.push({ text: d, isCorrect: false, key: d, char: getOptChar(d) });
        });

        const promptText = pair.sentence || pair.word;
        const targetItem = {
          id: pair.id,
          key: pair.zhuyin,
          char: pair.char,
          meaning: pair.word,
          word: pair.word,
          sentence: pair.sentence,
          directWord: promptText, // 關鍵：生字聽選題幹直接朗讀生活造詞/造句（如「深山裡有一個神祕的洞穴」、「田裡拔蘿蔔」）
          icon: pair.icon
        };

        const displayZhuyin = pair.wordZhuyin || pair.zhuyin;
        const sentenceOrWordZhuyin = pair.sentenceZhuyin || displayZhuyin;

        // 挖空替換邏輯：將語境句子或詞彙中的目標注音精準替換為 "____"
        const maskZhuyin = (sourceText, target) => {
          if (!sourceText || !target) return "____";
          const trimmedTarget = String(target).trim();
          if (sourceText.includes(trimmedTarget)) {
            return sourceText.replace(trimmedTarget, "____");
          }
          // 容錯正則：處理前後空白或多音節
          const escaped = trimmedTarget.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&").replace(/\s+/g, "\\s*");
          const re = new RegExp(escaped, "g");
          if (re.test(sourceText)) {
            return sourceText.replace(re, "____");
          }
          return sourceText + " ____";
        };

        const maskedSubject = pair.sentenceZhuyin
          ? maskZhuyin(pair.sentenceZhuyin, pair.zhuyin)
          : maskZhuyin(displayZhuyin, pair.zhuyin);

        // 1. 題目標題不顯示注音 (防止洩漏答案)
        const titleText = "🎧 請聽語音，選出空格「____」中正確的注音：";

        questions.push({
          type: "listening",
          typeName: `生字聽選 [${toneStr}]`,
          title: titleText,
          targetItem: targetItem,
          directWord: promptText, // 載入時語音朗讀完整生活語境句子或詞彙
          displaySubject: `${pair.icon} ${maskedSubject}`,
          hint: `${pair.groupTip}（聲調：${toneStr}）`,
          options: this.shuffle(optList)
        });
      });
    } else {
      // 模式 B: 易錯詞彙聽寫大挑戰 (從代表詞彙中篩選題目，共 12 題)
      const candidateUnits = config.wordUnitIds
        .map(id => this.allItems.find(it => it.id === id))
        .filter(Boolean);

      const shuffledUnits = this.shuffle(candidateUnits).slice(0, 6);

      shuffledUnits.forEach(item => {
        const cleanWord = this.getCleanWord(item.meaning);
        const parts = item.metadata?.parts || [item.key];

        // 題型 1: 聽詞辨音選擇題
        const distractors = this.getDistractors(item, 3);
        const choiceOptions = this.shuffle([
          { text: `${item.icon} ${cleanWord}`, isCorrect: true, key: item.key },
          ...distractors.map(d => ({ text: `${d.icon} ${this.getCleanWord(d.meaning)}`, isCorrect: false, key: d.key }))
        ]);

        questions.push({
          type: "listening",
          typeName: "詞彙辨音聽寫",
          title: `🎧 詞彙聽寫：請聽語音，選出正確的詞彙：`,
          targetItem: item,
          displaySubject: "🔊",
          hint: "注意聽前後鼻音 (ㄣ/ㄥ/ㄤ) 或單複韻母 (ㄡ/ㄜ/ㄝ/ㄟ/ㄛ) 的發音差異！",
          options: choiceOptions
        });

        // 題型 2: 詞彙積木聽寫 (候選積木中特別注入 ㄥ、ㄣ、ㄤ、ㄡ、ㄜ、ㄝ、ㄟ、ㄛ 易混淆積木)
        const confusionParts = ["ㄥ", "ㄣ", "ㄤ", "ㄡ", "ㄜ", "ㄝ", "ㄟ", "ㄛ"].filter(p => !parts.includes(p));
        const fakeBlocks = this.shuffle(confusionParts).slice(0, 2);
        const blocks = this.shuffle([...parts, ...fakeBlocks]);

        questions.push({
          type: "assembly",
          typeName: "詞彙拼音聽寫",
          title: `🎧 聽音拼寫：請聽語音，拼出「${cleanWord}」的注音：`,
          targetItem: item,
          displaySubject: `${item.icon} ${cleanWord}`,
          hint: "請小心分辨容易寫錯的注音積木喔！",
          requiredParts: parts,
          blocks: blocks
        });
      });
    }

    return this.shuffle(questions);
  }

  // 啟動易錯字聽寫加強會話
  startDictationSession(mode = "symbols", onProgress, onFinish) {
    this.onProgressCallback = onProgress;
    this.onFinishCallback = onFinish;

    const allQuestions = this.generateDictationQuestions(mode);
    const assignedUnits = allQuestions.map(q => q.targetItem);

    this.currentSession = {
      round: 1,
      mode: mode,
      isDictation: true,
      assignedUnits: assignedUnits,
      questions: allQuestions,
      total: allQuestions.length,
      unitStatus: {}
    };
    this.currentIndex = 0;

    assignedUnits.forEach(u => {
      if (!this.currentSession.unitStatus[u.id]) {
        this.currentSession.unitStatus[u.id] = { total: 1, correctCount: 0, completed: false };
      }
    });

    this.notifyProgress();
  }

  // 建立目標單元的學習會話 (支援自選單元群與輪次)
  startDailySession(assignedUnits, roundNumber = 1, onProgress, onFinish) {
    this.onProgressCallback = onProgress;
    this.onFinishCallback = onFinish;

    const allQuestions = [];
    assignedUnits.forEach(unit => {
      const qGroup = this.generateUnitQuestions(unit);
      allQuestions.push(...qGroup);
    });

    this.currentSession = {
      round: roundNumber,
      isDictation: false,
      assignedUnits: assignedUnits,
      questions: allQuestions,
      total: allQuestions.length,
      unitStatus: {} // 記錄各單元 3 題作答狀態
    };
    this.currentIndex = 0;

    assignedUnits.forEach(u => {
      this.currentSession.unitStatus[u.id] = { total: 3, correctCount: 0, completed: false };
    });

    this.notifyProgress();
  }

  // 取得當前題目
  getCurrentQuestion() {
    if (!this.currentSession || this.currentIndex >= this.currentSession.questions.length) {
      return null;
    }
    return this.currentSession.questions[this.currentIndex];
  }

  // 提交作答
  submitAnswer(isCorrect, callback) {
    const q = this.getCurrentQuestion();
    if (!q) return;

    const targetId = q.targetItem.id;
    // 紀錄作答歷程至儲存層
    this.storage.recordAnswer(targetId, isCorrect);

    // 音效反饋
    if (isCorrect) {
      this.audio.playCorrect();
    } else {
      this.audio.playWrong();
    }

    // 追蹤單元完成狀況
    const uStat = this.currentSession.unitStatus[targetId];
    if (uStat) {
      if (isCorrect) uStat.correctCount++;
      // 當該單元題目全部作答完畢 (3 題)
      const answeredInUnit = this.currentSession.questions
        .slice(0, this.currentIndex + 1)
        .filter(item => item.targetItem.id === targetId).length;

      // 核心過關門檻：3 題中答對 >= 2 題才算通關該單元！未達標則不給通關
      if (answeredInUnit === 3) {
        if (uStat.correctCount >= 2 && !uStat.completed) {
          uStat.completed = true;
          this.storage.markWordCompleted(targetId);
        }
      }
    }

    if (callback) callback(isCorrect);

    // 短暫延遲切換至下一題
    setTimeout(() => {
      this.currentIndex++;
      if (this.currentIndex < this.currentSession.questions.length) {
        this.notifyProgress();
      } else {
        if (this.onFinishCallback) {
          this.onFinishCallback(this.currentSession);
        }
      }
    }, 1200);
  }

  notifyProgress() {
    if (this.onProgressCallback) {
      this.onProgressCallback({
        current: this.currentIndex + 1,
        total: this.currentSession.questions.length,
        question: this.getCurrentQuestion()
      });
    }
  }
}

// 實例化出題引擎物件
const quizEngine = new QuizEngine(storageManager, ZHUYIN_ITEMS, audioManager);
