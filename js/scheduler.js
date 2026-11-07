/**
 * 每日冪等排程調度器 (Daily Idempotent Scheduler Agent)
 * 嚴格遵循 README.md 第五節演算法規範
 * 保證同日同一難度刷新頁面題目始終一致；換日或換難度重新計算並寫入快取。
 */

class DailyScheduler {
  constructor(storage, allItems) {
    this.storage = storage;
    this.allItems = allItems;
  }

  // 取得指定日期的 5 個單元 (若快取命中直接返回；未命中則分流排程，支援排除指定 ID)
  getAssignedItemsForDate(targetDateKey, excludeIds = []) {
    const data = this.storage.data;
    const currentLevel = Number(data.student.grade) || 1;
    const levelItems = this.allItems.filter(item => item.level === currentLevel);

    // 1. 檢查快取 (Cache Hit)
    if (data.dailySchedule && data.dailySchedule[targetDateKey]) {
      const cachedIds = data.dailySchedule[targetDateKey];
      if (Array.isArray(cachedIds) && cachedIds.length === 5) {
        const cached = cachedIds.map(id => this.allItems.find(w => w.id === id)).filter(Boolean);
        // 確保快取的題目皆吻合當前等級
        if (cached.length === 5 && cached.every(w => w.level === currentLevel)) {
          return cached;
        }
      }
    }

    // 2. 狀態分流 (Status Partitioning)
    const getStatus = (id) => {
      const r = data.words[id];
      if (!r || !r.attempts) return "new";
      if (r.wrong > r.correct / 2) return "wrong";
      if (r.correct >= 4 && r.wrong <= 1) return "mastered";
      return "review";
    };

    // 排序候選池：若有排除清單 (如明日預覽優先排除今日已選之題目)，尚未排定之題目排在最前面
    const pool = [...levelItems].sort((a, b) => {
      const aExcluded = excludeIds.includes(a.id) ? 1 : 0;
      const bExcluded = excludeIds.includes(b.id) ? 1 : 0;
      return aExcluded - bExcluded;
    });

    const fresh = pool.filter(w => getStatus(w.id) === "new");
    const wrong = pool.filter(w => getStatus(w.id) === "wrong");
    const review = pool.filter(w => getStatus(w.id) === "review");
    const mastered = pool.filter(w => getStatus(w.id) === "mastered");

    let selected = [];

    // 優先挑選 5 個新單元
    if (fresh.length >= 5) {
      selected = fresh.slice(0, 5);
    } else {
      selected = [...fresh];
      // 依序由錯題補足
      if (selected.length < 5) {
        selected.push(...wrong.slice(0, 5 - selected.length));
      }
      // 仍不足由待複習補足
      if (selected.length < 5) {
        selected.push(...review.slice(0, 5 - selected.length));
      }
      // 仍不足由已掌握補足
      if (selected.length < 5) {
        selected.push(...mastered.slice(0, 5 - selected.length));
      }
    }

    // 若該等級題量本身小於 5 (或邊界狀況)，循環補足
    if (selected.length < 5 && levelItems.length > 0) {
      for (let i = 0; selected.length < 5 && i < levelItems.length; i++) {
        if (!selected.some(w => w.id === levelItems[i].id)) {
          selected.push(levelItems[i]);
        }
      }
      let idx = 0;
      while (selected.length < 5 && levelItems.length > 0) {
        selected.push(levelItems[idx % levelItems.length]);
        idx++;
      }
    }

    // 3. 寫入快取並持久化
    if (!data.dailySchedule) data.dailySchedule = {};
    data.dailySchedule[targetDateKey] = selected.map(w => w.id);
    this.storage.save();

    return selected;
  }

  // 取得今日分配的 5 個單元 (若快取命中直接返回，未命中則分流排程，支援歷史補做日期)
  getTodayAssignedItems(customDateKey) {
    const todayKey = customDateKey || this.storage.getActiveDateKey();
    return this.getAssignedItemsForDate(todayKey);
  }

  // 取得明日預覽分配的 5 個單元 (優先排除今日已排定之單元，展示明天下一步探索目標)
  getTomorrowAssignedItems() {
    const tomorrowKey = this.storage.getTomorrowKey();
    const todayKey = this.storage.getTodayKey();
    const todayItems = this.getTodayAssignedItems(todayKey);
    const todayIds = todayItems.map(w => w.id);
    return this.getAssignedItemsForDate(tomorrowKey, todayIds);
  }

  // 取得該符號在學習庫中的狀態 ('new' | 'wrong' | 'review' | 'mastered')
  getItemStatus(itemId) {
    const r = this.storage.data.words[itemId];
    if (!r || !r.attempts) return "new";
    if (r.wrong > r.correct / 2) return "wrong";
    if (r.correct >= 4 && r.wrong <= 1) return "mastered";
    return "review";
  }

  // 檢查當前等級是否已全部掌握
  isLevelFullyMastered(level) {
    const levelItems = this.allItems.filter(item => item.level === level);
    if (levelItems.length === 0) return false;
    return levelItems.every(item => this.getItemStatus(item.id) === "mastered");
  }
}

// 實例化全域調度器物件
const dailyScheduler = new DailyScheduler(storageManager, ZHUYIN_ITEMS);
