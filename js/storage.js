/**
 * 本地持久化資料管理 (Local Storage Agent - Space Explorer Edition v1.4)
 * 遵循 Zero-Backend、防禦性強轉與資料備份匯出/匯入機制
 */

const STORAGE_KEY = "zhuyin_learning_storage_v14";
const LAUNCH_ENERGY_COST = 10; // 每次太空探險火箭升空消耗能源 (只要有能源就能探索，不限一天一次)

class StorageManager {
  constructor() {
    this.data = this.loadData();
    this.activeDateKey = null; // 當前操作的日期 (null 表示真實今日；有值表示歷史補做日期)
  }

  // 取得真實今日日期字串 YYYY-MM-DD
  getTodayKey() {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // 取得明日日期字串 YYYY-MM-DD
  getTomorrowKey() {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // 取得當前作用中日期 (支援歷史補做日期切換)
  getActiveDateKey() {
    return this.activeDateKey || this.getTodayKey();
  }

  // 設定當前操作日期 (傳入 YYYY-MM-DD 切換至歷史補做；傳入 null 或今日字串切回今日)
  setActiveDateKey(dateStr) {
    if (typeof dateStr === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      this.activeDateKey = dateStr;
    } else {
      this.activeDateKey = null;
    }
  }

  // 是否處於歷史補做模式
  isCatchUpMode() {
    return Boolean(this.activeDateKey && this.activeDateKey !== this.getTodayKey());
  }

  // 預設資料結構
  getDefaultData() {
    return {
      version: "1.4",
      adminPassword: "123", // 預設管理與重置密碼
      student: {
        name: "小注音探險家",
        grade: 1
      },
      dailyGoal: 5,
      dailySchedule: {},
      words: {},
      history: [],
      dailyPassedUnits: {}, // 紀錄每日已成功通關的單元 ID 清單: { "YYYY-MM-DD": [id1, id2...] }
      catchUpRewardedDates: [], // 紀錄已領取過歷史補做能源補給的日期清單
      dailyCompletionRewardedDates: [], // 紀錄已領取今日 5 單元通關大禮包的日期清單
      lessonRewards: {},        // 紀錄一年級各課專項測驗完成領取能源次數: { "lesson0": 1, ... }
      dictationRewards: { symbols: 0, words: 0, pairs: 0 }, // 紀錄易錯字聽寫加強完成領取能源次數
      space: {
        planets: 0,        // 探索行星數
        energy: 0,         // 累積太空能量
        galaxies: 0,       // 穿越星系數
        lastLaunchDate: null, // 最後一次火箭點火發射日期
        lastDiscovery: null,  // 最近一次探險發現成果物件
        recentLogs: []        // 最近星際日誌記錄清單
      }
    };
  }

  // 載入資料並進行深層防禦性驗證與向後遷移
  loadData() {
    try {
      let raw = localStorage.getItem(STORAGE_KEY);
      let isMigratedFromLegacy = false;

      // 若新版無資料，嘗試從舊版本 (v12, v13) 遷移
      if (!raw) {
        raw = localStorage.getItem("zhuyin_learning_storage_v13") || localStorage.getItem("zhuyin_learning_storage_v12");
        if (raw) {
          isMigratedFromLegacy = true;
        }
      }

      if (!raw) return this.getDefaultData();
      const parsed = JSON.parse(raw);

      const safe = this.getDefaultData();

      // 管理密碼
      safe.adminPassword = typeof parsed.adminPassword === "string" ? parsed.adminPassword : "123";

      // 學生資料
      if (parsed.student && typeof parsed.student === "object") {
        safe.student.name = typeof parsed.student.name === "string" ? parsed.student.name : "小注音探險家";
        const grade = Number(parsed.student.grade);
        safe.student.grade = (grade >= 1 && grade <= 6) ? grade : 1;
      }

      safe.dailyGoal = Number(parsed.dailyGoal) || 5;

      if (parsed.dailySchedule && typeof parsed.dailySchedule === "object") {
        safe.dailySchedule = parsed.dailySchedule;
      }

      if (parsed.words && typeof parsed.words === "object") {
        safe.words = {};
        for (const [key, val] of Object.entries(parsed.words)) {
          const id = Number(key);
          if (!isNaN(id) && val && typeof val === "object") {
            safe.words[id] = {
              attempts: Number(val.attempts) || 0,
              correct: Number(val.correct) || 0,
              wrong: Number(val.wrong) || 0,
              lastSeen: typeof val.lastSeen === "string" ? val.lastSeen : ""
            };
          }
        }
      }

      if (Array.isArray(parsed.history)) {
        safe.history = parsed.history.map(h => ({
          date: typeof h.date === "string" ? h.date : "",
          questions: Number(h.questions) || 0,
          correct: Number(h.correct) || 0,
          completedWords: Number(h.completedWords) || 0,
          completed: Boolean(h.completed)
        }));
      }

      // 每日通關單元記錄
      safe.dailyPassedUnits = {};
      if (parsed.dailyPassedUnits && typeof parsed.dailyPassedUnits === "object") {
        for (const [dKey, arr] of Object.entries(parsed.dailyPassedUnits)) {
          if (Array.isArray(arr)) {
            safe.dailyPassedUnits[dKey] = arr.map(Number).filter(n => !isNaN(n));
          }
        }
      }

      // 歷史補做能源獎勵領取清單
      safe.catchUpRewardedDates = Array.isArray(parsed.catchUpRewardedDates) ? parsed.catchUpRewardedDates : [];

      // 今日通關能源大禮包領取清單
      safe.dailyCompletionRewardedDates = Array.isArray(parsed.dailyCompletionRewardedDates) ? parsed.dailyCompletionRewardedDates : [];

      // 一年級各課專項測驗完成領取能源紀錄
      if (parsed.lessonRewards && typeof parsed.lessonRewards === "object") {
        safe.lessonRewards = parsed.lessonRewards;
      }

      // 易錯字聽寫加強完成領取能源紀錄 (支援 symbols, words, pairs)
      if (parsed.dictationRewards && typeof parsed.dictationRewards === "object") {
        safe.dictationRewards = {
          symbols: Number(parsed.dictationRewards.symbols) || 0,
          words: Number(parsed.dictationRewards.words) || 0,
          pairs: Number(parsed.dictationRewards.pairs) || 0
        };
      }

      // 星際太空數值
      const spaceSrc = parsed.space || {};
      safe.space = {
        planets: Number(spaceSrc.planets !== undefined ? spaceSrc.planets : (parsed.garden?.flowers || 0)),
        energy: Number(spaceSrc.energy !== undefined ? spaceSrc.energy : (parsed.garden?.leaves || 0)),
        galaxies: Number(spaceSrc.galaxies !== undefined ? spaceSrc.galaxies : (parsed.garden?.fruits || 0)),
        // 關鍵防禦：若是從舊版遷移，或者未點擊發射，絕不使用舊版花園澆水日期污染！
        lastLaunchDate: (!isMigratedFromLegacy && typeof spaceSrc.lastLaunchDate === "string") 
          ? spaceSrc.lastLaunchDate 
          : null,
        lastDiscovery: (spaceSrc.lastDiscovery && typeof spaceSrc.lastDiscovery === "object")
          ? spaceSrc.lastDiscovery
          : null,
        recentLogs: Array.isArray(spaceSrc.recentLogs) ? spaceSrc.recentLogs.slice(0, 10) : []
      };

      return safe;
    } catch (e) {
      console.error("LocalStorage 讀取失敗，還原至預設值:", e);
      return this.getDefaultData();
    }
  }

  // 儲存至 LocalStorage
  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error("LocalStorage 寫入失敗:", e);
    }
  }

  // 更新當前學習難度
  setGrade(grade) {
    const g = Number(grade);
    if (g >= 1 && g <= 6) {
      this.data.student.grade = g;
      this.save();
    }
  }

  // 取得作用中日期 (或指定日期) 的歷史進度紀錄
  getTodayHistory(customDateKey) {
    const targetDate = customDateKey || this.getActiveDateKey();
    let record = this.data.history.find(h => h.date === targetDate);
    if (!record) {
      record = {
        date: targetDate,
        questions: 0,
        correct: 0,
        completedWords: 0,
        completed: false
      };
      this.data.history.push(record);
      this.save();
    }
    return record;
  }

  // 紀錄作答歷程 (自動關聯當前作用中日期/補做日期，並即時增加太空能源)
  recordAnswer(wordId, isCorrect) {
    const targetDate = this.getActiveDateKey();
    const id = Number(wordId);

    if (!this.data.words[id]) {
      this.data.words[id] = { attempts: 0, correct: 0, wrong: 0, lastSeen: targetDate };
    }
    const w = this.data.words[id];
    w.attempts = (Number(w.attempts) || 0) + 1;
    if (isCorrect) {
      w.correct = (Number(w.correct) || 0) + 1;
    } else {
      w.wrong = (Number(w.wrong) || 0) + 1;
    }
    w.lastSeen = targetDate;

    const todayHist = this.getTodayHistory(targetDate);
    todayHist.questions = (Number(todayHist.questions) || 0) + 1;
    if (isCorrect) {
      todayHist.correct = (Number(todayHist.correct) || 0) + 1;
      // 答對獲得 1 點太空能源
      this.data.space.energy = (Number(this.data.space.energy) || 0) + 1;
    }

    this.save();
  }

  // 檢查某單元在指定日期 (預設當前作用中日期) 是否已成功通關
  isUnitPassedToday(wordId, customDateKey) {
    const targetDate = customDateKey || this.getActiveDateKey();
    const passedList = this.data.dailyPassedUnits?.[targetDate];
    return Array.isArray(passedList) && passedList.includes(Number(wordId));
  }

  // 取得指定日期已通關的單元 ID 清單
  getTodayPassedIds(customDateKey) {
    const targetDate = customDateKey || this.getActiveDateKey();
    const passedList = this.data.dailyPassedUnits?.[targetDate];
    return Array.isArray(passedList) ? passedList : [];
  }

  // 取得指定日期排定 5 單元中，尚未通關的單元列表
  getTodayPendingUnits(allTodayAssigned, customDateKey) {
    if (!Array.isArray(allTodayAssigned)) return [];
    return allTodayAssigned.filter(item => !this.isUnitPassedToday(item.id, customDateKey));
  }

  // 標記某單元在當前作用中日期 (或補做日期) 通關
  markWordCompleted(wordId, customDateKey) {
    const targetDate = customDateKey || this.getActiveDateKey();
    const id = Number(wordId);

    if (!this.data.dailyPassedUnits) {
      this.data.dailyPassedUnits = {};
    }
    if (!Array.isArray(this.data.dailyPassedUnits[targetDate])) {
      this.data.dailyPassedUnits[targetDate] = [];
    }
    if (!this.data.dailyPassedUnits[targetDate].includes(id)) {
      this.data.dailyPassedUnits[targetDate].push(id);
    }

    const todayHist = this.getTodayHistory(targetDate);
    todayHist.completedWords = Math.min(5, this.data.dailyPassedUnits[targetDate].length);
    if (todayHist.completedWords >= 5) {
      todayHist.completed = true;
    }
    this.save();
  }

  // 領取歷史補做完成之能源補給 (+10 ⚡ 太空能源，防重複領取)
  claimCatchUpEnergyReward(dateKey) {
    if (!dateKey || dateKey === this.getTodayKey()) return false;
    if (!this.data.catchUpRewardedDates) {
      this.data.catchUpRewardedDates = [];
    }
    if (this.data.catchUpRewardedDates.includes(dateKey)) {
      return false; // 該歷史日期已領取過能源獎勵
    }

    // 發放補做能源補給 +10 點
    this.data.catchUpRewardedDates.push(dateKey);
    this.data.space.energy = (Number(this.data.space.energy) || 0) + 10;
    this.save();
    return true;
  }

  // 領取一年級各課單獨測驗完成之太空能源獎勵 (+10 ⚡)
  awardLessonEnergy(lessonId, rewardEnergy = 10) {
    if (!lessonId) return 0;
    if (!this.data.lessonRewards) {
      this.data.lessonRewards = {};
    }
    this.data.lessonRewards[lessonId] = (Number(this.data.lessonRewards[lessonId]) || 0) + 1;
    this.data.space.energy = (Number(this.data.space.energy) || 0) + rewardEnergy;
    this.save();
    return rewardEnergy;
  }

  // 取得某課完成測驗的次數
  getLessonCompletionCount(lessonId) {
    return Number(this.data.lessonRewards?.[lessonId]) || 0;
  }

  // 領取易錯字聽寫加強特訓完成之太空能源獎勵 (+10 ⚡)
  awardDictationEnergy(mode = "symbols", rewardEnergy = 10) {
    if (!this.data.dictationRewards) {
      this.data.dictationRewards = { symbols: 0, words: 0, pairs: 0 };
    }
    const key = (mode === "words" || mode === "pairs") ? mode : "symbols";
    this.data.dictationRewards[key] = (Number(this.data.dictationRewards[key]) || 0) + 1;
    this.data.space.energy = (Number(this.data.space.energy) || 0) + rewardEnergy;
    this.save();
    return rewardEnergy;
  }

  // 取得易錯字聽寫加強特訓完成次數
  getDictationCompletionCount(mode = "symbols") {
    const key = (mode === "words" || mode === "pairs") ? mode : "symbols";
    return Number(this.data.dictationRewards?.[key]) || 0;
  }

  // 檢查特定日期是否已完成學習（通關 5 個單元，已完成的不需補做）
  isDateCompleted(dateKey) {
    if (!dateKey) return false;
    const passedList = this.data.dailyPassedUnits?.[dateKey];
    if (Array.isArray(passedList) && passedList.length >= 5) {
      return true;
    }
    const record = this.data.history?.find(h => h.date === dateKey);
    if (record && (record.completed || (Number(record.completedWords) || 0) >= 5)) {
      return true;
    }
    return false;
  }

  // 取得特定日期的施作狀態：'completed' (已完成) | 'partial' (未完成) | 'unperformed' (當天完全未施作)
  getDateStatus(dateKey) {
    if (this.isDateCompleted(dateKey)) return "completed";
    const record = this.data.history?.find(h => h.date === dateKey);
    const passedList = this.data.dailyPassedUnits?.[dateKey];
    const completedWords = Math.max(
      Array.isArray(passedList) ? passedList.length : 0,
      record ? (Number(record.completedWords) || 0) : 0
    );
    const questions = record ? (Number(record.questions) || 0) : 0;
    if (questions === 0 && completedWords === 0) {
      return "unperformed"; // 當天未施作
    }
    return "partial"; // 當天有做但未滿 5 單元
  }

  // 取得近 N 日的自然日曆歷程清單 (包含未施作的空白日期，供補做判定)
  getRecentCalendarDays(daysBack = 7) {
    const list = [];
    const today = new Date();
    for (let i = 0; i < daysBack; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const dateKey = `${year}-${month}-${day}`;

      const status = this.getDateStatus(dateKey);
      const isCompleted = status === "completed";
      const isToday = dateKey === this.getTodayKey();
      const record = this.data.history?.find(h => h.date === dateKey) || {
        date: dateKey,
        questions: 0,
        correct: 0,
        completedWords: this.data.dailyPassedUnits?.[dateKey]?.length || 0,
        completed: isCompleted
      };

      list.push({
        date: dateKey,
        isToday,
        status, // 'completed' | 'partial' | 'unperformed'
        isCompleted,
        canCatchUp: !isToday && !isCompleted, // 當天未施作或未完成之過去日期才可補做；已完成的不需補做
        record
      });
    }
    return list;
  }

  // 取得近 N 日內所有未施作/未完成、可供補做的歷史日期清單
  getPendingCatchUpDates(daysBack = 7) {
    return this.getRecentCalendarDays(daysBack).filter(item => item.canCatchUp);
  }

  // 領取今日 5 單元全數通關大禮包 (+10 ⚡ 太空能源，每日限領一次防重複)
  claimDailyCompletionReward(dateKey) {
    const targetDate = dateKey || this.getTodayKey();
    if (!this.data.dailyCompletionRewardedDates) {
      this.data.dailyCompletionRewardedDates = [];
    }
    if (this.data.dailyCompletionRewardedDates.includes(targetDate)) {
      return false; // 今日已領取過大禮包
    }

    this.data.dailyCompletionRewardedDates.push(targetDate);
    this.data.space.energy = (Number(this.data.space.energy) || 0) + 10;
    this.save();
    return true;
  }

  // 檢查是否滿足火箭升空探索條件 (核心規則：只要有能源 >= 10 ⚡ 就能探索，不限制一天一次！)
  canLaunch() {
    const energy = Number(this.data.space?.energy) || 0;
    return energy >= LAUNCH_ENERGY_COST;
  }

  // 向下相容
  canLaunchToday() {
    return this.canLaunch();
  }

  canWaterToday() {
    return this.canLaunch();
  }

  // 執行太空火箭升空探索 (只要有能源就能探索，消耗 10 ⚡，隨機探測新行星或躍遷新星系，不限制一天一次)
  executeLaunch() {
    if (!this.canLaunch()) return false;
    const today = this.getTodayKey();

    // 扣除發射消耗燃料 (10 ⚡ 太空能源)
    this.data.space.energy = Math.max(0, (Number(this.data.space.energy) || 0) - LAUNCH_ENERGY_COST);
    
    // 成功探測到 1 顆新行星
    const prevPlanets = Number(this.data.space.planets) || 0;
    const newPlanets = prevPlanets + 1;
    this.data.space.planets = newPlanets;

    // 每探索 5 顆行星，跨越 1 個新星系
    const prevGalaxies = Number(this.data.space.galaxies) || 0;
    const newGalaxies = Math.floor(newPlanets / 5);
    const isGalaxyJump = newGalaxies > prevGalaxies;
    this.data.space.galaxies = newGalaxies;
    this.data.space.lastLaunchDate = today;

    // 隨機星際探險發現成果生成 (每一次點火升空都有豐富變化與驚喜)
    const planetsList = (typeof getCosmicPlanets === "function") ? getCosmicPlanets() : [];
    const galaxiesList = (typeof getCosmicGalaxies === "function") ? getCosmicGalaxies() : [];

    let discovery;
    if (isGalaxyJump && galaxiesList.length > 0) {
      const gIdx = (newGalaxies - 1) % galaxiesList.length;
      const gItem = galaxiesList[gIdx];
      discovery = {
        type: "galaxy",
        isGalaxyJump: true,
        name: gItem.name,
        icon: gItem.icon,
        badge: gItem.badge,
        color: gItem.color || "#C084FC",
        desc: gItem.desc,
        planets: newPlanets,
        galaxies: newGalaxies,
        timestamp: Date.now()
      };
    } else if (planetsList.length > 0) {
      const pIdx = (newPlanets - 1) % planetsList.length;
      const pItem = planetsList[pIdx];
      discovery = {
        type: "planet",
        isGalaxyJump: false,
        name: pItem.name,
        icon: pItem.icon,
        badge: pItem.badge,
        color: pItem.color || "#FDE047",
        desc: pItem.desc,
        planets: newPlanets,
        galaxies: newGalaxies,
        timestamp: Date.now()
      };
    } else {
      discovery = {
        type: "planet",
        isGalaxyJump: false,
        name: `神秘第 ${newPlanets} 號行星`,
        icon: "🪐✨",
        badge: "未知天體",
        color: "#FDE047",
        desc: "成功探測到一顆散發著微光的未知星體！",
        planets: newPlanets,
        galaxies: newGalaxies,
        timestamp: Date.now()
      };
    }

    this.data.space.lastDiscovery = discovery;
    if (!Array.isArray(this.data.space.recentLogs)) {
      this.data.space.recentLogs = [];
    }
    this.data.space.recentLogs.unshift(discovery);
    if (this.data.space.recentLogs.length > 8) {
      this.data.space.recentLogs = this.data.space.recentLogs.slice(0, 8);
    }

    this.save();
    return discovery;
  }

  // 向下相容
  executeDailyLaunch() {
    return this.executeLaunch();
  }

  executeDailyWatering() {
    return this.executeLaunch();
  }

  // 匯出 JSON 備份檔案
  exportBackup() {
    const jsonStr = JSON.stringify(this.data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `注音學習進度備份_${this.getTodayKey()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // 匯入 JSON 備份檔案
  importBackup(file, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (imported && (imported.student || imported.words)) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(imported));
          this.data = this.loadData();
          if (callback) callback(true, "匯入成功！");
        } else {
          if (callback) callback(false, "檔案格式不符");
        }
      } catch (err) {
        if (callback) callback(false, "JSON 解析失敗: " + err.message);
      }
    };
    reader.readAsText(file);
  }

  // 清除並重置所有進度
  resetAll() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("zhuyin_learning_storage_v13");
    localStorage.removeItem("zhuyin_learning_storage_v12");
    this.data = this.getDefaultData();
    this.save();
  }
}

// 實例化全域儲存物件
const storageManager = new StorageManager();
