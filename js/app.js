/**
 * 主應用程式控制器 (Main Application Controller - Space Explorer Edition)
 * 負責模組編排、視圖路由、測驗互動事件與星際探索遊戲化串接
 */

class AppController {
  constructor() {
    this.currentTab = "home";
    this.currentQuizRound = 1; // 記錄當日練習輪次
    this.selectedAssemblyParts = [];
    this.initElements();
    this.bindEvents();
    this.initApp();
  }

  // 取得 DOM 節點引用
  initElements() {
    // 導覽元素
    this.tabBtns = document.querySelectorAll(".nav-tab-btn");
    this.viewSections = document.querySelectorAll(".view-section");
    this.levelSelector = document.getElementById("levelSelector");
    this.navPlanets = document.getElementById("navPlanets");
    this.navEnergy = document.getElementById("navEnergy");

    // 首頁與補做元素
    this.todayUnitsGrid = document.getElementById("todayUnitsGrid");
    this.dailyProgressBar = document.getElementById("dailyProgressBar");
    this.dailyProgressText = document.getElementById("dailyProgressText");
    this.startStudyBtn = document.getElementById("startStudyBtn");
    this.curriculumLevelTag = document.getElementById("curriculumLevelTag");
    this.catchUpDatePicker = document.getElementById("catchUpDatePicker");
    this.returnTodayBtn = document.getElementById("returnTodayBtn");
    this.catchUpStatusNotice = document.getElementById("catchUpStatusNotice");
    this.dailyUnitsCardTitle = document.getElementById("dailyUnitsCardTitle");
    this.progressBoxTitle = document.getElementById("progressBoxTitle");
    this.pendingCatchUpContainer = document.getElementById("pendingCatchUpContainer");
    this.pendingCatchUpChips = document.getElementById("pendingCatchUpChips");

    // 明日目標預覽元素
    this.tomorrowPreviewCard = document.getElementById("tomorrowPreviewCard");
    this.tomorrowPreviewHeader = document.getElementById("tomorrowPreviewHeader");
    this.tomorrowToggleBtn = document.getElementById("tomorrowToggleBtn");
    this.tomorrowUnitsContainer = document.getElementById("tomorrowUnitsContainer");
    this.tomorrowUnitsGrid = document.getElementById("tomorrowUnitsGrid");
    this.tomorrowDateBadge = document.getElementById("tomorrowDateBadge");
    this.speakAllTomorrowBtn = document.getElementById("speakAllTomorrowBtn");
    this.quickTomorrowBtn = document.getElementById("quickTomorrowBtn");
    this.isTomorrowExpanded = false;

    // 各課專項測驗元素
    this.goToLessonsBtn = document.getElementById("goToLessonsBtn");
    this.lessonsGrid = document.getElementById("lessonsGrid");
    this.gradeFilterBar = document.getElementById("gradeFilterBar");
    this.gradeFilterTabs = document.getElementById("gradeFilterTabs");
    this.lessonsViewTitleText = document.getElementById("lessonsViewTitleText");
    this.lessonsViewDescText = document.getElementById("lessonsViewDescText");
    this.selectedGradeId = "grade1";
    this.currentQuizType = "daily"; // "daily" | "lesson" | "dictation"
    this.currentLessonId = null;
    this.currentLessonMode = "all";

    // 易錯聽寫特訓元素 (ㄥ、ㄣ、ㄤ、ㄡ、ㄜ)
    this.goToDictationBtn = document.getElementById("goToDictationBtn");
    this.confusionSymbolsGrid = document.getElementById("confusionSymbolsGrid");
    this.dictationWordsGrid = document.getElementById("dictationWordsGrid");
    this.startDictationSymbolsBtn = document.getElementById("startDictationSymbolsBtn");
    this.startDictationWordsBtn = document.getElementById("startDictationWordsBtn");
    this.startDictationPairsBtn = document.getElementById("startDictationPairsBtn");
    this.dictationSymbolsStat = document.getElementById("dictationSymbolsStat");
    this.dictationWordsStat = document.getElementById("dictationWordsStat");
    this.dictationPairsStat = document.getElementById("dictationPairsStat");
    this.dictationPairsGrid = document.getElementById("dictationPairsGrid");
    this.currentDictationMode = "symbols";

    // 測驗元素
    this.quizTypeBadge = document.getElementById("quizTypeBadge");
    this.quizProgressText = document.getElementById("quizProgressText");
    this.quizSubject = document.getElementById("quizSubject");
    this.quizTitle = document.getElementById("quizTitle");
    this.quizHint = document.getElementById("quizHint");
    this.quizOptionsContainer = document.getElementById("quizOptionsContainer");
    this.assemblyContainer = document.getElementById("assemblyContainer");
    this.assemblySlots = document.getElementById("assemblySlots");
    this.assemblyBlocks = document.getElementById("assemblyBlocks");
    this.assemblyResetBtn = document.getElementById("assemblyResetBtn");
    this.assemblySubmitBtn = document.getElementById("assemblySubmitBtn");
    this.speakCurrentBtn = document.getElementById("speakCurrentBtn");
    this.exitQuizBtn = document.getElementById("exitQuizBtn");

    // 太空火箭探險元素
    this.spaceContainer = document.getElementById("spaceContainer");
    this.rocketShip = document.getElementById("rocketShip");
    this.spaceStageName = document.getElementById("spaceStageName");
    this.spaceStageDesc = document.getElementById("spaceStageDesc");
    this.launchActionBtn = document.getElementById("launchActionBtn");
    this.launchBtnIcon = document.getElementById("launchBtnIcon");
    this.launchBtnText = document.getElementById("launchBtnText");
    this.spacePlanets = document.getElementById("spacePlanets");
    this.spaceEnergy = document.getElementById("spaceEnergy");
    this.spaceGalaxies = document.getElementById("spaceGalaxies");
    this.spaceFuelProgress = document.getElementById("spaceFuelProgress");
    this.spaceFuelTip = document.getElementById("spaceFuelTip");
    this.spacePlanetsSub = document.getElementById("spacePlanetsSub");
    this.spaceGalaxiesSub = document.getElementById("spaceGalaxiesSub");
    this.spaceDiscoverySection = document.getElementById("spaceDiscoverySection");
    this.spaceDiscoveryCard = document.getElementById("spaceDiscoveryCard");

    // 字典與報告元素
    this.libraryGrid = document.getElementById("libraryGrid");
    this.filterBtns = document.querySelectorAll(".filter-btn");
    this.historyList = document.getElementById("historyList");
    this.weakWordsList = document.getElementById("weakWordsList");
    this.exportBackupBtn = document.getElementById("exportBackupBtn");
    this.importBackupInput = document.getElementById("importBackupInput");
    this.resetAllBtn = document.getElementById("resetAllBtn");
  }

  // 綁定全域事件
  bindEvents() {
    // 頁籤導覽
    this.tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        audioManager.playClick();
        this.switchTab(btn.dataset.tab);
      });
    });

    // 難度等級切換
    this.levelSelector.addEventListener("change", (e) => {
      audioManager.playClick();
      storageManager.setGrade(e.target.value);
      this.refreshAll();
    });

    // 歷史補做日期選擇
    if (this.catchUpDatePicker) {
      this.catchUpDatePicker.addEventListener("change", (e) => {
        const val = e.target.value;
        if (!val) return;
        const todayKey = storageManager.getTodayKey();
        if (val > todayKey) {
          alert("⚠️ 無法選擇未來的日期！請選擇今日或過去的日期進行補做。");
          this.catchUpDatePicker.value = storageManager.getActiveDateKey();
          return;
        }
        audioManager.playClick();
        storageManager.setActiveDateKey(val === todayKey ? null : val);
        this.currentQuizRound = 1;
        this.refreshAll();
      });
    }

    // 返回今日按鈕
    if (this.returnTodayBtn) {
      this.returnTodayBtn.addEventListener("click", () => {
        audioManager.playClick();
        storageManager.setActiveDateKey(null);
        this.currentQuizRound = 1;
        this.refreshAll();
      });
    }

    // 明日目標預覽展開/收合
    if (this.tomorrowToggleBtn && this.tomorrowPreviewHeader) {
      const toggleAction = () => {
        audioManager.playClick();
        this.isTomorrowExpanded = !this.isTomorrowExpanded;
        this.updateTomorrowPreviewVisibility();
      };
      this.tomorrowToggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleAction();
      });
      this.tomorrowPreviewHeader.addEventListener("click", toggleAction);
    }

    // 快捷跳轉明日預覽按鈕
    if (this.quickTomorrowBtn) {
      this.quickTomorrowBtn.addEventListener("click", () => {
        audioManager.playClick();
        this.isTomorrowExpanded = true;
        this.updateTomorrowPreviewVisibility();
        if (this.tomorrowPreviewCard) {
          this.tomorrowPreviewCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      });
    }

    // 一鍵連續朗讀明日單元
    if (this.speakAllTomorrowBtn) {
      this.speakAllTomorrowBtn.addEventListener("click", () => {
        const tomorrowAssigned = dailyScheduler.getTomorrowAssignedItems();
        if (!tomorrowAssigned || tomorrowAssigned.length === 0) return;
        let idx = 0;
        const speakNext = () => {
          if (idx < tomorrowAssigned.length) {
            audioManager.speakItem(tomorrowAssigned[idx], "full", () => {
              idx++;
              setTimeout(speakNext, 350);
            });
          }
        };
        speakNext();
      });
    }

    // 前往各課測驗專區按鈕
    if (this.goToLessonsBtn) {
      this.goToLessonsBtn.addEventListener("click", () => {
        audioManager.playClick();
        this.switchTab("lessons");
      });
    }

    // 前往易錯聽寫專區按鈕
    if (this.goToDictationBtn) {
      this.goToDictationBtn.addEventListener("click", () => {
        audioManager.playClick();
        this.switchTab("dictation");
      });
    }

    // 啟動符號聽辨特訓按鈕 (不調用 playClick 避免與即將開啟的題目語音發生音軌衝突)
    if (this.startDictationSymbolsBtn) {
      this.startDictationSymbolsBtn.addEventListener("click", () => {
        this.startDictationQuiz("symbols");
      });
    }

    // 啟動詞彙聽寫挑戰按鈕 (不調用 playClick 避免與即將開啟的題目語音發生音軌衝突)
    if (this.startDictationWordsBtn) {
      this.startDictationWordsBtn.addEventListener("click", () => {
        this.startDictationQuiz("words");
      });
    }

    // 啟動生字聽選精練按鈕 (ㄆㄛ/ㄆㄨㄛ、ㄓ/ㄗ、ㄜ/ㄦ、各聲調)
    if (this.startDictationPairsBtn) {
      this.startDictationPairsBtn.addEventListener("click", () => {
        this.startDictationQuiz("pairs");
      });
    }

    // 首頁「開始今日挑戰」 (不調用 playClick 避免與即將開啟的題目語音發生音軌衝突)
    this.startStudyBtn.addEventListener("click", () => {
      this.startQuiz();
    });

    // 測驗退出 (若在各課測驗或聽寫特訓中退出則回到對應頁面)
    this.exitQuizBtn.addEventListener("click", () => {
      audioManager.playClick();
      if (this.currentQuizType === "lesson") {
        this.currentQuizType = "daily";
        this.currentLessonId = null;
        this.switchTab("lessons");
      } else if (this.currentQuizType === "dictation") {
        this.currentQuizType = "daily";
        this.switchTab("dictation");
      } else {
        this.switchTab("home");
      }
    });

    // 測驗當前題目朗讀 (支援重聽按鈕與點擊主體小喇叭)
    const playCurrentQuestionSound = () => {
      const q = quizEngine.getCurrentQuestion();
      if (q) {
        if (q.directWord || q.targetItem?.directWord) {
          audioManager.speak(q.directWord || q.targetItem.directWord);
        } else {
          audioManager.speakItem(q.targetItem, "quiz");
        }
      }
    };
    this.speakCurrentBtn.addEventListener("click", playCurrentQuestionSound);
    if (this.quizSubject) {
      this.quizSubject.style.cursor = "pointer";
      this.quizSubject.title = "點擊重播題目語音";
      this.quizSubject.addEventListener("click", playCurrentQuestionSound);
    }

    // 拼組重置
    this.assemblyResetBtn.addEventListener("click", () => {
      audioManager.playClick();
      this.resetAssemblySlots();
    });

    // 拼組確認送出
    this.assemblySubmitBtn.addEventListener("click", () => {
      this.submitAssemblyAnswer();
    });

    // 太空火箭發射動作
    this.launchActionBtn.addEventListener("click", () => {
      this.handleLaunchAction();
    });

    // 字典分類過濾
    this.filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        audioManager.playClick();
        this.filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.renderLibrary(btn.dataset.filter);
      });
    });

    // 備份管理
    this.exportBackupBtn.addEventListener("click", () => {
      audioManager.playClick();
      storageManager.exportBackup();
    });

    this.importBackupInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        storageManager.importBackup(file, (success, msg) => {
          alert(msg);
          if (success) {
            this.refreshAll();
          }
        });
      }
    });

    this.resetAllBtn.addEventListener("click", () => {
      audioManager.playClick();
      const expectedPwd = storageManager.data.adminPassword || "123";
      const inputPwd = prompt("⚠️ 警告：重置將會清除所有學習歷程與太空探索成果！\n請輸入管理密碼（預設密碼：123）：");
      if (inputPwd === null) return;
      if (inputPwd.trim() !== expectedPwd) {
        audioManager.playWrong();
        alert("❌ 密碼輸入錯誤！無法重置系統。");
        return;
      }
      storageManager.resetAll();
      this.refreshAll();
      alert("✅ 已成功重置所有進度！");
    });
  }

  // 初始化應用狀態
  initApp() {
    this.levelSelector.value = storageManager.data.student.grade || 1;
    if (this.catchUpDatePicker) {
      this.catchUpDatePicker.max = storageManager.getTodayKey();
      this.catchUpDatePicker.value = storageManager.getActiveDateKey();
    }
    this.refreshAll();
  }

  // 切換檢視視圖
  switchTab(tabName) {
    this.currentTab = tabName;
    this.tabBtns.forEach(btn => {
      const isActive = btn.dataset.tab === tabName;
      btn.classList.toggle("active", isActive);
      if (isActive && typeof btn.scrollIntoView === "function") {
        btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    });
    this.viewSections.forEach(section => {
      section.classList.toggle("active", section.id === `${tabName}View`);
    });

    if (tabName === "home") this.renderHome();
    if (tabName === "lessons") this.renderLessons();
    if (tabName === "dictation") this.renderDictation();
    if (tabName === "space") this.renderSpace();
    if (tabName === "library") this.renderLibrary("all");
    if (tabName === "report") this.renderReport();
  }

  // 刷新所有模組
  refreshAll() {
    this.updateNavChips();
    this.renderHome();
    this.renderLessons();
    this.renderDictation();
    this.renderSpace();
    this.renderLibrary("all");
    this.renderReport();
  }

  // 更新頂部宇宙探索晶片
  updateNavChips() {
    const space = storageManager.data.space;
    this.navPlanets.textContent = `🪐 ${space.planets || 0}`;
    this.navEnergy.textContent = `⚡ ${space.energy || 0}`;
  }

  // =========================================================================
  // 1. 首頁渲染 (HomeView)
  // =========================================================================
  renderHome() {
    const isCatchUp = storageManager.isCatchUpMode();
    const activeDate = storageManager.getActiveDateKey();

    if (this.catchUpDatePicker) {
      this.catchUpDatePicker.value = activeDate;
    }

    if (this.returnTodayBtn && this.catchUpStatusNotice) {
      this.returnTodayBtn.style.display = isCatchUp ? "inline-block" : "none";
      this.catchUpStatusNotice.style.display = isCatchUp ? "inline-block" : "none";
    }

    // 渲染近期待補做清單 (已完成的不需補做，只顯示當天未施作或未完成)
    if (this.pendingCatchUpChips) {
      this.pendingCatchUpChips.innerHTML = "";
      const pendingDates = storageManager.getPendingCatchUpDates(7);
      if (pendingDates.length === 0) {
        this.pendingCatchUpChips.innerHTML = `<span style="font-size: 12px; color: var(--success); font-weight: 700;">近期每日皆已按時完成，無須補做！🌟</span>`;
      } else {
        pendingDates.forEach(item => {
          const btn = document.createElement("button");
          btn.className = "catchup-quick-chip";
          if (activeDate === item.date) {
            btn.classList.add("active");
          }
          const label = item.status === "unperformed" ? "未施作" : `未完成 ${item.record.completedWords}/5`;
          const dateShort = item.date.slice(5).replace(/^0/, "").replace(/-0?/, "/");
          btn.innerHTML = `<span>📅 ${dateShort} <strong>${label}</strong></span> <span>⚡ 點此補做</span>`;
          btn.addEventListener("click", () => {
            audioManager.playClick();
            storageManager.setActiveDateKey(item.date);
            this.currentQuizRound = 1;
            this.refreshAll();
          });
          this.pendingCatchUpChips.appendChild(btn);
        });
      }
    }

    // 依據當前選中日期的施作狀態更新標題與通知
    const isTargetDateCompleted = storageManager.isDateCompleted(activeDate);
    const targetDateStatus = storageManager.getDateStatus(activeDate);

    if (this.catchUpStatusNotice && isCatchUp) {
      if (isTargetDateCompleted) {
        this.catchUpStatusNotice.style.background = "var(--success-light)";
        this.catchUpStatusNotice.style.borderColor = "#A7F3D0";
        this.catchUpStatusNotice.style.color = "#065F46";
        this.catchUpStatusNotice.textContent = `✅ 此日（${activeDate}）已於當日完成學習，不需補做！`;
      } else if (targetDateStatus === "unperformed") {
        this.catchUpStatusNotice.style.background = "#FEF3C7";
        this.catchUpStatusNotice.style.borderColor = "#FDE68A";
        this.catchUpStatusNotice.style.color = "#B45309";
        this.catchUpStatusNotice.innerHTML = `⏳ <strong>${activeDate} 當天未施作（可補做）</strong>：完成 5 個單元可補充 <strong>+10 ⚡ 航行能源</strong>！`;
      } else {
        this.catchUpStatusNotice.style.background = "#FEF3C7";
        this.catchUpStatusNotice.style.borderColor = "#FDE68A";
        this.catchUpStatusNotice.style.color = "#B45309";
        this.catchUpStatusNotice.innerHTML = `⏳ <strong>${activeDate} 尚未全部完成（可補做）</strong>：完成 5 個單元可補充 <strong>+10 ⚡ 航行能源</strong>！`;
      }
    }

    if (this.dailyUnitsCardTitle) {
      this.dailyUnitsCardTitle.textContent = isCatchUp
        ? `⏳ ${activeDate} 補做目標單元 (冪等排程 5 項目)`
        : `📅 今日推薦目標單元 (冪等排程 5 項目)`;
    }

    if (this.progressBoxTitle) {
      this.progressBoxTitle.textContent = isCatchUp
        ? `${activeDate} 補做能源充能進度`
        : `今日火箭能源充能進度`;
    }

    if (this.homeBannerDesc) {
      this.homeBannerDesc.textContent = isCatchUp
        ? (isTargetDateCompleted
            ? `${activeDate} 已完成通關！您可以進行自由溫故知新複習。`
            : `目前正處於 ${activeDate} 歷史補做模式（該日未施作/未完成）！完成此日 5 個單元補做，將為探險號額外補充 +10 ⚡ 太空能源！`)
        : `今日已為探險號準備好 5 個注音單元！每天完成學習注入能源，解鎖每日專屬點火升空特權！`;
    }

    const currentGrade = Number(storageManager.data.student.grade) || 1;
    const config = LEVEL_CONFIG[currentGrade] || { name: `Level ${currentGrade}` };
    this.curriculumLevelTag.textContent = `難度 ${currentGrade}: ${config.name}`;

    // 取得當前作用中日期排定的 5 個單元與通關狀態
    const todayAssigned = dailyScheduler.getTodayAssignedItems(activeDate);
    const todayHist = storageManager.getTodayHistory(activeDate);
    const pendingUnits = storageManager.getTodayPendingUnits(todayAssigned, activeDate);

    // 渲染進度條
    const completed = Math.min(5, Number(todayHist.completedWords) || 0);
    const pct = Math.round((completed / 5) * 100);
    this.dailyProgressBar.style.width = `${pct}%`;
    this.dailyProgressText.textContent = `${completed} / 5 單元完成 (${pct}%)`;

    // 動態調整「開始挑戰」按鈕文案
    const modeName = isCatchUp ? "補做" : "今日";
    if (isTargetDateCompleted || pendingUnits.length === 0) {
      this.startStudyBtn.textContent = `🌟 ${isCatchUp ? activeDate : '今日'}單元已全數通關 (點此溫故知新)`;
    } else if (pendingUnits.length < todayAssigned.length) {
      this.startStudyBtn.textContent = `🎯 繼續${modeName}錯題練習 (尚餘 ${pendingUnits.length} 個單元)`;
    } else {
      this.startStudyBtn.textContent = isCatchUp ? `⚡ 補做 ${activeDate} (+10 ⚡ 能源)` : `🚀 開始今日挑戰`;
    }

    // 渲染 5 個單元晶片
    this.todayUnitsGrid.innerHTML = "";
    todayAssigned.forEach(item => {
      const isPassed = storageManager.isUnitPassedToday(item.id, activeDate);
      const status = dailyScheduler.getItemStatus(item.id);
      const statusLabelMap = {
        new: "新單元 ✨",
        wrong: "重點加強 ⚠️",
        review: "溫故知新 🔄",
        mastered: "已掌握 🏆"
      };

      const formula = audioManager.getSpellingFormula(item);
      const chip = document.createElement("div");
      chip.className = "unit-chip";
      chip.title = formula ? `${item.meaning} (${item.key})\n拼讀結構：${formula}` : item.key;
      const statusBadge = isPassed
        ? `<span class="unit-chip-status status-mastered">${isCatchUp ? '補做通關' : '今日通關'} ✅</span>`
        : `<span class="unit-chip-status status-${status}">${statusLabelMap[status] || status}</span>`;

      chip.innerHTML = `
        <button class="unit-chip-speak" title="朗讀發音">🔊</button>
        <div class="unit-chip-icon">${item.icon}</div>
        <div class="unit-chip-key">${item.key}</div>
        <div class="unit-chip-meaning">${item.meaning}</div>
        ${statusBadge}
      `;

      // 點擊卡片發音 (自然發音無長停頓)
      chip.addEventListener("click", () => {
        audioManager.speakItem(item, "full");
      });

      // 點擊喇叭發音
      const speakBtn = chip.querySelector(".unit-chip-speak");
      speakBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        audioManager.speakItem(item, "full");
      });

      this.todayUnitsGrid.appendChild(chip);
    });

    // 渲染明日目標單元預覽
    this.renderTomorrowPreview();
  }

  // 更新明日預覽面板展開/收合狀態
  updateTomorrowPreviewVisibility() {
    if (!this.tomorrowUnitsContainer || !this.tomorrowToggleBtn) return;
    if (this.isTomorrowExpanded) {
      this.tomorrowUnitsContainer.style.display = "block";
      this.tomorrowToggleBtn.textContent = "收合預覽 ▴";
    } else {
      this.tomorrowUnitsContainer.style.display = "none";
      this.tomorrowToggleBtn.textContent = "展開預覽 ▾";
    }
  }

  // 渲染明日 5 個目標單元預覽晶片
  renderTomorrowPreview() {
    if (!this.tomorrowUnitsGrid) return;
    const tomorrowKey = storageManager.getTomorrowKey();
    if (this.tomorrowDateBadge) {
      this.tomorrowDateBadge.textContent = `${tomorrowKey} 搶先看`;
    }

    const tomorrowAssigned = dailyScheduler.getTomorrowAssignedItems();
    this.tomorrowUnitsGrid.innerHTML = "";

    tomorrowAssigned.forEach(item => {
      const formula = audioManager.getSpellingFormula(item);
      const chip = document.createElement("div");
      chip.className = "unit-chip";
      chip.style.borderColor = "#C7D2FE";
      chip.style.background = "#FFFFFF";
      chip.title = formula ? `${item.meaning} (${item.key})\n拼讀結構：${formula}` : item.key;

      chip.innerHTML = `
        <button class="unit-chip-speak" title="試聽發音">🔊</button>
        <div class="unit-chip-icon">${item.icon}</div>
        <div class="unit-chip-key">${item.key}</div>
        <div class="unit-chip-meaning">${item.meaning}</div>
        <span class="unit-chip-status" style="color: #4338CA; background: #EEF2FF; font-weight: 800;">明日目標 🔮</span>
      `;

      // 點擊卡片發音試聽
      chip.addEventListener("click", () => {
        audioManager.speakItem(item, "full");
      });

      // 點擊喇叭發音
      const speakBtn = chip.querySelector(".unit-chip-speak");
      speakBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        audioManager.speakItem(item, "full");
      });

      this.tomorrowUnitsGrid.appendChild(chip);
    });

    this.updateTomorrowPreviewVisibility();
  }

  // =========================================================================
  // 1.5 國小各課專項測驗渲染與年級動態感知 (LessonsView)
  // =========================================================================
  // 動態年級切換選擇器 (遵循「有增加才顯示」原則：只有具備課程資料的年級才會浮現)
  renderGradeSelector() {
    if (!this.gradeFilterBar || !this.gradeFilterTabs) return;
    const activeGrades = (typeof getActiveGrades === "function")
      ? getActiveGrades()
      : [{ id: "grade1", name: "一年級", icon: "🎒", lessons: (typeof GRADE1_LESSONS !== "undefined" ? GRADE1_LESSONS : []) }];

    // 關鍵原則：若只有 1 個年級有資料（如目前只有一年級），面板隱藏切換條；有 2~6 年級加入時才自動顯示
    if (activeGrades.length <= 1) {
      this.gradeFilterBar.style.display = "none";
    } else {
      this.gradeFilterBar.style.display = "flex";
      this.gradeFilterTabs.innerHTML = "";
      activeGrades.forEach(g => {
        const btn = document.createElement("button");
        btn.className = `grade-tab-btn ${g.id === this.selectedGradeId ? "active" : ""}`;
        btn.dataset.grade = g.id;
        btn.innerHTML = `${g.icon} ${g.name} (${g.lessons?.length || 0} 課)`;
        btn.addEventListener("click", () => {
          audioManager.playClick();
          this.selectedGradeId = g.id;
          this.renderLessons();
        });
        this.gradeFilterTabs.appendChild(btn);
      });
    }
  }

  renderLessons() {
    if (!this.lessonsGrid) return;

    // 先動態更新年級切換列 (有增加才顯示)
    this.renderGradeSelector();

    const currentGrade = (typeof getGradeConfig === "function")
      ? getGradeConfig(this.selectedGradeId)
      : null;
    const lessons = (typeof getLessonsByGrade === "function")
      ? getLessonsByGrade(this.selectedGradeId)
      : (typeof GRADE1_LESSONS !== "undefined" ? GRADE1_LESSONS : []);

    // 動態更新橫幅標題與說明文字
    if (this.lessonsViewTitleText && currentGrade) {
      this.lessonsViewTitleText.textContent = `${currentGrade.name} 各課單獨測驗專區`;
    }
    if (this.lessonsViewDescText && currentGrade?.description) {
      this.lessonsViewDescText.innerHTML = `${currentGrade.description}！自由選擇課次單獨測驗，<strong>做完一樣可領取 +10 ⚡ 太空能源</strong>！`;
    }

    this.lessonsGrid.innerHTML = "";

    if (!lessons || lessons.length === 0) {
      this.lessonsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #94A3B8;">
          <div style="font-size: 40px; margin-bottom: 8px;">⏳</div>
          <p style="font-size: 15px; font-weight: 700;">該年級教材內容籌備中，敬請期待！</p>
        </div>
      `;
      return;
    }

    lessons.forEach(lesson => {
      const items = lesson.itemIds
        .map(id => ZHUYIN_ITEMS.find(w => w.id === id))
        .filter(Boolean);

      // 計算已通關掌握數
      const masteredCount = items.filter(it => {
        return storageManager.isUnitPassedToday(it.id) ||
               (storageManager.data.words[it.id]?.correct >= 2);
      }).length;

      const completionCount = storageManager.getLessonCompletionCount(lesson.id);

      const card = document.createElement("div");
      card.className = "lesson-card";

      // 產生單元詞彙預覽標籤 (點擊可試聽發音)
      const wordsTagsHtml = items.map(it => {
        const cleanName = it.meaning ? it.meaning.split(" ")[0].replace(/[\/／]+/g, " ") : it.key;
        const isMastered = storageManager.isUnitPassedToday(it.id) || (storageManager.data.words[it.id]?.correct >= 2);
        const formula = audioManager.getSpellingFormula(it);
        const tip = formula ? `${it.icon} ${cleanName} (${it.key})\n拼讀：${formula}` : `${it.icon} ${cleanName} (${it.key})`;
        return `<span class="lesson-word-chip ${isMastered ? 'mastered' : ''}" data-id="${it.id}" title="${tip}">${it.icon} ${cleanName}</span>`;
      }).join("");

      // 依單元數量決定按鈕配置
      let actionButtonsHtml = "";
      if (items.length > 5) {
        actionButtonsHtml = `
          <button class="btn-lesson-secondary quick-btn" data-lesson="${lesson.id}">⚡ 5單元精練 (+10⚡)</button>
          <button class="btn-lesson-primary full-btn" data-lesson="${lesson.id}">🌟 全課挑戰 (${items.length}單元, +10⚡)</button>
        `;
      } else {
        actionButtonsHtml = `
          <button class="btn-lesson-primary full-btn" data-lesson="${lesson.id}">🚀 開始測驗 (共${items.length}單元, +10⚡)</button>
        `;
      }

      card.innerHTML = `
        <div>
          <div class="lesson-card-header">
            <div class="lesson-icon-title">
              <div class="lesson-icon">${lesson.icon}</div>
              <div>
                <h3 class="lesson-title-text">${lesson.name}</h3>
                <span class="lesson-publisher-tag">${lesson.publisher}</span>
              </div>
            </div>
            ${completionCount > 0 ? `<span style="font-size: 11px; font-weight: 800; color: #10B981; background: #D1FAE5; padding: 2px 8px; border-radius: 10px;">通關 ${completionCount} 次 ✅</span>` : ''}
          </div>

          <div style="margin-top: 12px;">
            <p class="lesson-desc-text"><strong>涵蓋生字詞彙（點擊可試聽）：</strong></p>
            <div class="lesson-words-container">
              ${wordsTagsHtml}
            </div>
          </div>
        </div>

        <div class="lesson-card-footer">
          <div class="lesson-stat-pill">
            <span>掌握進度：<strong>${masteredCount} / ${items.length}</strong> 單元</span>
          </div>
          <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            ${actionButtonsHtml}
          </div>
        </div>
      `;

      // 綁定單詞試聽
      card.querySelectorAll(".lesson-word-chip").forEach(chip => {
        chip.addEventListener("click", (e) => {
          e.stopPropagation();
          const targetId = Number(chip.dataset.id);
          const item = ZHUYIN_ITEMS.find(w => w.id === targetId);
          if (item) {
            audioManager.speakItem(item, "full");
          }
        });
      });

      // 綁定測驗按鈕 (不調用 playClick 避免與即將開啟的題目語音發生音軌衝突)
      const quickBtn = card.querySelector(".quick-btn");
      if (quickBtn) {
        quickBtn.addEventListener("click", () => {
          this.startLessonQuiz(lesson.id, "quick");
        });
      }

      const fullBtn = card.querySelector(".full-btn");
      if (fullBtn) {
        fullBtn.addEventListener("click", () => {
          this.startLessonQuiz(lesson.id, "all");
        });
      }

      this.lessonsGrid.appendChild(card);
    });
  }

  // 啟動各課單獨測驗 (支援多年級動態課次)
  startLessonQuiz(lessonId, mode = "all") {
    const lessons = (typeof getLessonsByGrade === "function")
      ? getLessonsByGrade(this.selectedGradeId)
      : (typeof GRADE1_LESSONS !== "undefined" ? GRADE1_LESSONS : []);
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return;

    const allLessonItems = lesson.itemIds
      .map(id => ZHUYIN_ITEMS.find(w => w.id === id))
      .filter(Boolean);

    let targetUnits = allLessonItems;
    if (mode === "quick" && allLessonItems.length > 5) {
      // 5 題快速精練：隨機取 5 個
      const shuffled = [...allLessonItems].sort(() => 0.5 - Math.random());
      targetUnits = shuffled.slice(0, 5);
    }

    this.currentQuizType = "lesson";
    this.currentLessonId = lessonId;
    this.currentLessonMode = mode;
    this.currentQuizRound = 1;

    this.switchTab("learn");

    quizEngine.startDailySession(
      targetUnits,
      1,
      (progress) => {
        this.renderQuestion(progress);
        const q = progress.question;
        const qType = q ? q.typeName : "課文測驗";
        this.quizTypeBadge.textContent = `【${lesson.name}】${qType}`;
      },
      (session) => {
        this.onQuizFinished(session);
      }
    );
  }

  // =========================================================================
  // 1.6 易錯字複習與聽寫加強渲染 (DictationView: ㄥ、ㄣ、ㄤ、ㄡ、ㄜ)
  // =========================================================================
  renderDictation() {
    if (!this.confusionSymbolsGrid || typeof getConfusionConfig !== "function") return;

    const config = getConfusionConfig();
    if (!config) return;

    // 1. 渲染 5 大易錯音對比精講卡片
    this.confusionSymbolsGrid.innerHTML = "";
    config.symbols.forEach(sym => {
      const item = ZHUYIN_ITEMS.find(it => it.id === sym.id) || { id: sym.id, key: sym.key, meaning: sym.soundWord, icon: sym.icon };
      const card = document.createElement("div");
      card.className = "confusion-symbol-card";
      card.title = "點擊試聽發音";

      card.innerHTML = `
        <div class="confusion-card-top">
          <div class="confusion-symbol-key">${sym.key}</div>
          <div style="font-size: 24px;">${sym.icon}</div>
        </div>
        <div class="confusion-symbol-name">${sym.name}</div>
        <div class="confusion-symbol-tip">${sym.tip}</div>
        <div class="confusion-distractors-tag">
          ⚠️ 易混淆對比：${sym.distractors.join("、")}
        </div>
      `;

      card.addEventListener("click", () => {
        audioManager.speakItem(item, "pure");
      });

      this.confusionSymbolsGrid.appendChild(card);
    });

    // 2. 更新通關次數統計
    if (this.dictationSymbolsStat) {
      const symCount = storageManager.getDictationCompletionCount("symbols");
      this.dictationSymbolsStat.textContent = `已通關 ${symCount} 次 ✅`;
    }
    if (this.dictationWordsStat) {
      const wordCount = storageManager.getDictationCompletionCount("words");
      this.dictationWordsStat.textContent = `已通關 ${wordCount} 次 ✅`;
    }
    if (this.dictationPairsStat) {
      const pairCount = storageManager.getDictationCompletionCount("pairs");
      this.dictationPairsStat.textContent = `已通關 ${pairCount} 次 ✅`;
    }

    // 3. 渲染涵蓋詞彙晶片庫
    if (this.dictationWordsGrid) {
      this.dictationWordsGrid.innerHTML = "";
      const wordUnits = config.wordUnitIds
        .map(id => ZHUYIN_ITEMS.find(it => it.id === id))
        .filter(Boolean);

      wordUnits.forEach(unit => {
        const cleanName = unit.meaning ? unit.meaning.split(" ")[0].replace(/[\/／]+/g, " ") : unit.key;
        const formula = audioManager.getSpellingFormula(unit);
        const chip = document.createElement("button");
        chip.className = "dictation-word-chip";
        chip.title = formula ? `${cleanName} (${unit.key})\n拼讀：${formula}` : `${cleanName} (${unit.key})`;
        chip.innerHTML = `<span>${unit.icon}</span> <span>${cleanName}</span> <span style="color: #BE185D; font-size: 11px;">(${unit.key})</span>`;

        chip.addEventListener("click", (e) => {
          e.stopPropagation();
          audioManager.speakItem(unit, "full");
        });

        this.dictationWordsGrid.appendChild(chip);
      });
    }

    // 4. 渲染易混生字對比庫 (ㄆㄛ/ㄆㄨㄛ、ㄓ/ㄗ、ㄜ/ㄦ、各聲調)
    if (this.dictationPairsGrid && typeof getConfusionPairGroups === "function") {
      this.dictationPairsGrid.innerHTML = "";
      const pairGroups = getConfusionPairGroups();
      const toneMap = { 1: "一聲", 2: "二聲", 3: "三聲", 4: "四聲", 0: "輕聲" };

      pairGroups.forEach(group => {
        group.pairs.forEach(pair => {
          const chip = document.createElement("button");
          chip.className = "dictation-word-chip";
          chip.style.borderColor = "#DDD6FE";
          chip.style.background = "#F5F3FF";
          const formula = audioManager.getSpellingFormula({ key: pair.zhuyin });
          // 易錯字生字對比庫 全部以注音顯示 (注音符號加粗 + 詞彙注音，方便低年級直觀認讀)
          const displayZhuyin = pair.wordZhuyin || pair.zhuyin;
          chip.title = `【${group.name}】${displayZhuyin} (${pair.word})\n目標注音：${pair.zhuyin} (${toneMap[pair.tone] || ''})\n易混淆：${pair.confusedZhuyin}\n拼讀：${formula || pair.zhuyin}`;
          chip.innerHTML = `<span>${pair.icon}</span> <strong style="color: #5B21B6; font-size: 15px;">${pair.zhuyin}</strong> <span style="color: #7C3AED; font-size: 12px; font-weight: 800;">${displayZhuyin}</span>`;

          chip.addEventListener("click", (e) => {
            e.stopPropagation();
            audioManager.speak(pair.sentence || pair.word);
          });

          this.dictationPairsGrid.appendChild(chip);
        });
      });
    }
  }

  // 啟動易錯字聽寫加強特訓
  startDictationQuiz(mode = "symbols") {
    this.currentQuizType = "dictation";
    this.currentLessonId = null;
    this.currentDictationMode = mode;
    this.currentQuizRound = 1;

    this.switchTab("learn");

    quizEngine.startDictationSession(
      mode,
      (progress) => {
        this.renderQuestion(progress);
        const q = progress.question;
        const qType = q ? q.typeName : "聽寫特訓";
        const modeTitle = mode === "symbols"
          ? "8大音極限聽辨"
          : (mode === "pairs" ? "生字聽選精練" : "易錯詞彙聽寫");
        this.quizTypeBadge.textContent = `【${modeTitle}】${qType}`;
      },
      (session) => {
        this.onQuizFinished(session);
      }
    );
  }

  // =========================================================================
  // 2. 學習閉環與測驗 (LearnView)
  // =========================================================================
  // 啟動測驗 (依據當前日期通關狀態自動篩選未熟單元，第二輪絕不重複已答對單元)
  startQuiz(forceAll = false) {
    this.currentQuizType = "daily";
    this.currentLessonId = null;
    const activeDate = storageManager.getActiveDateKey();
    const todayAssigned = dailyScheduler.getTodayAssignedItems(activeDate);
    const pendingUnits = storageManager.getTodayPendingUnits(todayAssigned, activeDate);

    let targetUnits = [];
    if (forceAll || pendingUnits.length === 0) {
      // 若強制複習或 5 個單元皆已通過
      if (!forceAll && pendingUnits.length === 0) {
        const isCatchUp = storageManager.isCatchUpMode();
        if (!confirm(`${isCatchUp ? activeDate : '今日'} 5 個單元已全數通關精熟！🌟\n是否進行全單元溫故知新複習？`)) {
          this.switchTab(isCatchUp ? "home" : "space");
          return;
        }
      }
      targetUnits = todayAssigned;
      this.currentQuizRound = 1;
    } else {
      // 核心要求：若有未通過/答錯單元，第二輪(及後續)只針對答錯單元出題，不再重複已答對單元！
      targetUnits = pendingUnits;
      if (pendingUnits.length === todayAssigned.length) {
        this.currentQuizRound = 1;
      }
    }

    this.switchTab("learn");

    quizEngine.startDailySession(
      targetUnits,
      this.currentQuizRound,
      (progress) => {
        this.renderQuestion(progress);
      },
      (session) => {
        this.onQuizFinished(session);
      }
    );
  }

  renderQuestion(progress) {
    const q = progress.question;
    if (!q) return;

    const roundText = quizEngine.currentSession?.round > 1 ? ` (第 ${quizEngine.currentSession.round} 輪錯題精練)` : "";
    this.quizTypeBadge.textContent = `${q.typeName}${roundText}`;
    this.quizProgressText.textContent = `第 ${progress.current} / ${progress.total} 題`;
    this.quizTitle.textContent = q.title;
    this.quizHint.textContent = q.hint;

    // 清空舊選項
    this.quizOptionsContainer.innerHTML = "";
    this.quizOptionsContainer.style.display = "grid";
    this.assemblyContainer.style.display = "none";

    if (q.type === "choice") {
      this.quizSubject.textContent = q.displaySubject;
      q.options.forEach(opt => {
        const btn = this.createOptionCard(opt, false);
        this.quizOptionsContainer.appendChild(btn);
      });
    } else if (q.type === "listening") {
      this.quizSubject.textContent = q.displaySubject || "🔊";
      // 題目載入時朗讀：生字聽選直接朗讀生活詞彙 (如「花朵」)，其他聽辨題朗讀目標注音 (先唸注音及聲調，再唸整個發音)
      // 預留 320ms 給介面轉場與前次音效釋放，杜絕手機揚聲器底層通道混音衝突
      setTimeout(() => {
        if (q.directWord || q.targetItem?.directWord) {
          audioManager.speak(q.directWord || q.targetItem.directWord);
        } else {
          audioManager.speakItem(q.targetItem, "quiz");
        }
      }, 320);

      q.options.forEach(opt => {
        const btn = this.createOptionCard(opt, true);
        this.quizOptionsContainer.appendChild(btn);
      });
    } else if (q.type === "assembly") {
      this.quizSubject.textContent = q.displaySubject;
      this.quizOptionsContainer.style.display = "none";
      this.assemblyContainer.style.display = "block";
      this.setupAssemblyQuestion(q);
    }
  }

  // 建立「認注音符號」與「聽力」題型之選項單元（將試聽按鈕移到框外，徹底避免誤按答案）
  createOptionCard(opt, isListeningMode = false) {
    const unit = document.createElement("div");
    unit.className = "option-unit";

    // 1. 卡片框本體 (專注於作答點擊，框內不含任何其他按鈕)
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";

    const symbolText = document.createElement("div");
    symbolText.className = "option-symbol-text";
    symbolText.textContent = opt.text;

    // 若包含漢字或長度較長，採用詞彙顯示規格；若為純注音/拼音，採用大字號顯著規格
    const isWord = /[\u4e00-\u9fa5]/.test(opt.text) || opt.text.length > 5;
    if (isWord) {
      symbolText.classList.add("word-mode");
    } else {
      symbolText.classList.add("symbol-mode");
    }
    btn.appendChild(symbolText);

    // 卡片框點擊：正常作答判定與回饋
    btn.addEventListener("click", () => {
      this.handleOptionClick(btn, opt.isCorrect);
    });
    unit.appendChild(btn);

    // 2. 框外獨立試聽按鈕 (位於選項框外正下方，物理隔離，絕不誤按答案)
    const audioBtn = document.createElement("button");
    audioBtn.type = "button";
    audioBtn.className = "option-audio-btn-outside";
    audioBtn.setAttribute("aria-label", "試聽發音");
    audioBtn.innerHTML = '<span class="pill-icon">🔊</span><span class="pill-text">試聽</span>';

    audioBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (e.preventDefault) e.preventDefault();

      // 視覺微反饋
      audioBtn.classList.add("playing");
      setTimeout(() => audioBtn.classList.remove("playing"), 500);

      // 觸發該注音符號的標準測驗拼讀發音 (先唸注音符號及聲調，再唸出整個發音，例如 ㄆㄛ二聲 再唸婆)
      const targetZhuyin = opt.key || opt.text;
      audioManager.speakItem({
        key: targetZhuyin,
        char: opt.char,
        meaning: opt.meaning || opt.word,
        word: opt.word
      }, "quiz");
    });
    unit.appendChild(audioBtn);

    return unit;
  }

  handleOptionClick(btnEl, isCorrect) {
    const allBtns = this.quizOptionsContainer.querySelectorAll(".option-btn, .option-audio-btn-outside");
    allBtns.forEach(b => (b.style.pointerEvents = "none"));

    if (isCorrect) {
      btnEl.classList.add("correct");
    } else {
      btnEl.classList.add("wrong");
    }

    quizEngine.submitAnswer(isCorrect, () => {
      this.updateNavChips();
    });
  }

  setupAssemblyQuestion(q) {
    this.selectedAssemblyParts = [];
    this.currentAssemblyQuestion = q;
    this.assemblySlots.innerHTML = "";
    this.assemblyBlocks.innerHTML = "";

    q.requiredParts.forEach(() => {
      const slot = document.createElement("div");
      slot.className = "assembly-slot";
      slot.textContent = "_";
      this.assemblySlots.appendChild(slot);
    });

    q.blocks.forEach((blockChar) => {
      const btn = document.createElement("button");
      btn.className = "assembly-block-btn";
      btn.textContent = blockChar;
      btn.addEventListener("click", () => {
        audioManager.playClick();
        this.pickAssemblyBlock(btn, blockChar);
      });
      this.assemblyBlocks.appendChild(btn);
    });
  }

  pickAssemblyBlock(blockBtn, char) {
    const req = this.currentAssemblyQuestion.requiredParts;
    if (this.selectedAssemblyParts.length >= req.length) return;

    this.selectedAssemblyParts.push(char);
    blockBtn.classList.add("used");

    const slots = this.assemblySlots.querySelectorAll(".assembly-slot");
    const idx = this.selectedAssemblyParts.length - 1;
    if (slots[idx]) {
      slots[idx].textContent = char;
      slots[idx].classList.add("filled");
    }
  }

  resetAssemblySlots() {
    this.selectedAssemblyParts = [];
    const slots = this.assemblySlots.querySelectorAll(".assembly-slot");
    slots.forEach(s => {
      s.textContent = "_";
      s.classList.remove("filled");
    });
    const blockBtns = this.assemblyBlocks.querySelectorAll(".assembly-block-btn");
    blockBtns.forEach(b => b.classList.remove("used"));
  }

  submitAssemblyAnswer() {
    const q = this.currentAssemblyQuestion;
    if (!q) return;

    if (this.selectedAssemblyParts.length < q.requiredParts.length) {
      alert("請填滿所有的注音拼音積木喔！");
      return;
    }

    const isCorrect = JSON.stringify(this.selectedAssemblyParts) === JSON.stringify(q.requiredParts);
    quizEngine.submitAnswer(isCorrect, () => {
      this.updateNavChips();
    });
  }

  onQuizFinished(session) {
    // 情況 0: 各課專項測驗完成結算 (做完領取 +10 能源獎勵)
    if (this.currentQuizType === "lesson") {
      const currentLessons = (typeof getLessonsByGrade === "function")
        ? getLessonsByGrade(this.selectedGradeId)
        : (typeof GRADE1_LESSONS !== "undefined" ? GRADE1_LESSONS : []);
      const lesson = currentLessons.find(l => l.id === this.currentLessonId);
      const lessonName = lesson ? lesson.name : "課文測驗";
      const rewardEnergy = 10;
      storageManager.awardLessonEnergy(this.currentLessonId, rewardEnergy);
      const totalEnergy = storageManager.data.space?.energy || 0;

      audioManager.playLevelUp();
      alert(`🎉 太棒了！您已成功完成【${lessonName}】專項測驗！\n` +
            `⚡ 順利領取 +${rewardEnergy} 點太空航行能源！\n` +
            `當前太空能源總量：${totalEnergy} ⚡\n` +
            `可前往「星際探險」發射火箭探索未知星球！🚀✨`);

      this.currentQuizType = "daily";
      this.currentLessonId = null;
      this.currentLessonMode = null;
      this.currentQuizRound = 1;

      this.refreshAll();
      this.switchTab("lessons");
      return;
    }

    // 情況 0.5: 易錯字複習・聽寫加強專項完成結算 (做完領取 +10 能源獎勵)
    if (this.currentQuizType === "dictation") {
      const modeNameMap = {
        symbols: "8大音符號極限聽辨",
        words: "易錯詞彙聽寫大挑戰",
        pairs: "生字詞彙聽選精練 (全聲調)"
      };
      const modeName = modeNameMap[this.currentDictationMode] || "易錯聽寫特訓";
      const rewardEnergy = 10;
      storageManager.awardDictationEnergy(this.currentDictationMode, rewardEnergy);
      const totalEnergy = storageManager.data.space?.energy || 0;

      audioManager.playLevelUp();
      alert(`🎉 太棒了！您已成功完成【${modeName}】特訓！\n` +
            `⚡ 順利領取 +${rewardEnergy} 點太空航行能源！\n` +
            `當前太空能源總量：${totalEnergy} ⚡\n` +
            `低年級易錯生字（ㄛ/ㄨㄛ、ㄓ/ㄗ、ㄜ/ㄦ、ㄝ/ㄟ、ㄛ/ㄡ、ㄥ/ㄣ）各聲調聽辨實力大躍進，可前往星際探險發射火箭！🚀✨`);

      this.currentQuizType = "daily";
      this.currentDictationMode = "symbols";
      this.currentQuizRound = 1;

      this.refreshAll();
      this.switchTab("dictation");
      return;
    }

    const activeDate = storageManager.getActiveDateKey();
    const isCatchUp = storageManager.isCatchUpMode();
    const todayAssigned = dailyScheduler.getTodayAssignedItems(activeDate);
    const stillPending = storageManager.getTodayPendingUnits(todayAssigned, activeDate);
    const passedCount = 5 - stillPending.length;

    this.refreshAll();

    // 情況 1: 5 個單元已全數通關！
    if (stillPending.length === 0) {
      audioManager.playLevelUp();
      if (isCatchUp) {
        const rewarded = storageManager.claimCatchUpEnergyReward(activeDate);
        if (rewarded) {
          alert(`🎉 太棒了！已成功完成 ${activeDate} 的歷史單元補做！\n⚡ 順利獲得 +10 點太空航行能源！\n當前太空能源：${storageManager.data.space.energy} ⚡\n探險號燃料充足，只要有能源即可隨時探索星球！🚀✨`);
        } else {
          alert(`🎉 太棒了！${activeDate} 的 5 個歷史單元已全數精熟通關！✨\n當前太空能源：${storageManager.data.space.energy} ⚡`);
        }
      } else {
        const rewarded = storageManager.claimDailyCompletionReward(activeDate);
        if (rewarded) {
          alert(`🎉 太棒了！今日 5 個注音單元已全數通關精熟！\n⚡ 獲得每日通關大禮包 +10 點太空能源！\n當前太空能源：${storageManager.data.space.energy} ⚡\n🚀 探險號燃料充盈，可隨時前往星際探險點火升空！✨`);
        } else {
          alert(`🎉 太棒了！今日 5 個注音單元已全數通關精熟！\n🚀 太空探險號能量充盈，可隨時前往星際探險點火升空！✨`);
        }
      }
      this.currentQuizRound = 1;
      this.refreshAll();
      this.switchTab("space"); // 補做或今日通關後均無縫引導至星際探險！
      return;
    }

    // 情況 2: 本輪結束後，尚有答錯/未過關的單元
    audioManager.playCorrect();
    const pendingNames = stillPending.map(u => u.key).join("、");
    const nextRound = (session.round || 1) + 1;

    const msg = `第 ${session.round || 1} 輪挑戰結束！\n` +
      `您已成功掌握 ${passedCount} / 5 個單元 🌟\n` +
      `尚有 ${stillPending.length} 個單元（${pendingNames}）需要再加強！\n\n` +
      `🎯 進入第 ${nextRound} 輪【錯題精準練習】！\n` +
      `已答對通過的單元不會再重複出現，集中火力攻克未熟單元！`;

    alert(msg);
    this.currentQuizRound = nextRound;
    // 直接無縫開啟第二輪錯題練習 (只出答錯單元)
    this.startQuiz();
  }

  // =========================================================================
  // 3. 星際火箭探險 (SpaceView - 能源即動力，只要有能源就能探索，不限次數)
  // =========================================================================
  renderSpace() {
    const state = spaceController.getLaunchState();
    const stage = spaceController.getExplorationStage();
    const space = storageManager.data.space;
    const currentEnergy = Number(space.energy) || 0;

    // 階段與描述
    this.spaceStageName.textContent = `階段 ${stage.stage}: ${stage.name}`;
    this.spaceStageDesc.textContent = stage.desc;

    // 特大成就計數板數值 (🪐 發現行星及🌌 穿越星系 板塊加大)
    this.spacePlanets.textContent = space.planets || 0;
    this.spaceEnergy.textContent = currentEnergy;
    this.spaceGalaxies.textContent = space.galaxies || 0;

    // 推進燃料儀表槽更新
    if (this.spaceFuelProgress) {
      const fuelPct = Math.min(100, Math.round((currentEnergy / 10) * 100));
      this.spaceFuelProgress.style.width = `${fuelPct}%`;
    }

    if (this.spaceFuelTip) {
      if (currentEnergy >= 10) {
        const canLaunchTimes = Math.floor(currentEnergy / 10);
        this.spaceFuelTip.innerHTML = `🔥 推進燃料充足！目前儲備可支援 <strong>${canLaunchTimes}</strong> 次星際升空探索！次數不限，隨時出發！`;
      } else {
        const remaining = 10 - currentEnergy;
        this.spaceFuelTip.textContent = `每次消耗 10 ⚡ 升空探索，還差 ${remaining} ⚡ 即可出發！學習注音、歷史補做、聽寫加強皆可補充能量！`;
      }
    }

    // 次級成就進度提示更新
    if (this.spacePlanetsSub) {
      const nextGalaxyGoal = (Math.floor((space.planets || 0) / 5) + 1) * 5;
      const needPlanets = Math.max(1, nextGalaxyGoal - (space.planets || 0));
      this.spacePlanetsSub.textContent = `再探測 ${needPlanets} 顆行星，將觸發超空間躍遷穿越新星系！`;
    }

    if (this.spaceGalaxiesSub) {
      this.spaceGalaxiesSub.textContent = `累計穿越 ${space.galaxies || 0} 個星系，已開啟浩瀚深空探索航道！`;
    }

    // 狀態機配置 (只要 energy >= 10 即可隨時升空，不限次數)
    this.launchActionBtn.className = "launch-action-btn";

    if (state === "READY") {
      this.launchActionBtn.classList.add("launch-btn-ready");
      this.launchBtnIcon.textContent = "🚀";
      this.launchBtnText.textContent = `點火升空！探索新星球 (消耗 10 ⚡，現有 ${currentEnergy} ⚡)`;
    } else {
      this.launchActionBtn.classList.add("launch-btn-locked");
      this.launchBtnIcon.textContent = "🔒";
      const remaining = Math.max(0, 10 - currentEnergy);
      this.launchBtnText.textContent = `能源充能中 (現有 ${currentEnergy}/10 ⚡，還差 ${remaining} ⚡)`;
    }

    // 渲染最新星際探險發現成果 (每一次點火升空都有豐富變化)
    const discovery = space.lastDiscovery;
    if (this.spaceDiscoverySection && this.spaceDiscoveryCard) {
      this.spaceDiscoverySection.style.display = "block";
      if (discovery) {
        this.spaceDiscoveryCard.className = `space-discovery-card ${discovery.isGalaxyJump ? "discovery-galaxy" : "discovery-planet"}`;
        this.spaceDiscoveryCard.innerHTML = `
          <div class="discovery-header">
            <span class="discovery-type-tag">
              ${discovery.isGalaxyJump ? "🌌 星系大躍遷成功！" : "🪐 星際探險重大發現！"}
            </span>
            <span class="discovery-badge" style="background: ${discovery.color}25; color: ${discovery.color}; border: 1.5px solid ${discovery.color}77;">
              ${discovery.badge || "未知天體"}
            </span>
          </div>
          <div class="discovery-body">
            <div class="discovery-icon" style="filter: drop-shadow(0 0 16px ${discovery.color}88);">${discovery.icon || "🪐"}</div>
            <div class="discovery-info">
              <h4 class="discovery-name" style="color: ${discovery.color};">${discovery.name}</h4>
              <p class="discovery-desc">${discovery.desc || "成功探測到一顆散發著微光的未知星體！"}</p>
              <div class="discovery-rewards">
                <span class="reward-pill">-10 ⚡ 推進燃料</span>
                <span class="reward-pill">+1 🪐 累計探測 ${discovery.planets || space.planets} 顆行星</span>
                ${discovery.isGalaxyJump ? `<span class="reward-pill reward-galaxy">+1 🌌 累計躍遷 ${discovery.galaxies || space.galaxies} 個星系</span>` : ""}
              </div>
            </div>
          </div>
        `;
      } else {
        this.spaceDiscoveryCard.className = "space-discovery-card discovery-placeholder";
        this.spaceDiscoveryCard.innerHTML = `
          <div class="discovery-body" style="justify-content: center; text-align: center; padding: 4px 0;">
            <div class="discovery-icon" style="font-size: 26px;">🛰️</div>
            <div class="discovery-info">
              <h4 class="discovery-name" style="font-size: 13px; color: #94A3B8; margin-bottom: 2px;">深空探測雷達待命中</h4>
              <p class="discovery-desc" style="font-size: 11px; margin-bottom: 0;">點火升空立即探測獨特天體或跨越新星系，開啟專屬星際日誌！</p>
            </div>
          </div>
        `;
      }
    }
  }

  handleLaunchAction() {
    const state = spaceController.getLaunchState();
    const currentEnergy = Number(storageManager.data.space?.energy) || 0;

    if (state === "LOCKED") {
      audioManager.playWrong();
      const remaining = Math.max(0, 10 - currentEnergy);
      alert(`🔒 火箭能源不足！探索一次需要 10 ⚡ 太空燃料，您目前有 ${currentEnergy} ⚡ (還差 ${remaining} ⚡)。\n\n💡 快速累積能源途徑：\n1. 補做過去未施作的歷史單元 (+10 ⚡)\n2. 進行各課專項測驗 (+10 ⚡)\n3. 進行易錯字聽寫加強 (+10 ⚡)\n4. 完成今日 5 個注音單元 (+10 ⚡)\n5. 作答答對題目 (每題 +1 ⚡)`);
      return;
    }

    if (state === "READY") {
      this.launchBtnText.textContent = "🔥 火箭發動機點火推進中...";
      spaceController.triggerLaunch(this.spaceContainer, (discovery) => {
        this.updateNavChips();
        this.renderSpace();
      });
    }
  }

  // =========================================================================
  // 4. 注音寶庫檢索 (LibraryView)
  // =========================================================================
  renderLibrary(filter) {
    let items = ZHUYIN_ITEMS;
    if (filter !== "all") {
      const levelNum = Number(filter);
      items = ZHUYIN_ITEMS.filter(item => item.level === levelNum);
    }

    this.libraryGrid.innerHTML = "";
    items.forEach(item => {
      const formula = audioManager.getSpellingFormula(item);
      const card = document.createElement("div");
      card.className = "lib-card";
      card.title = formula ? `${item.meaning} (${item.key})\n拼讀結構：${formula}` : item.key;
      card.innerHTML = `
        <div style="font-size: 24px;">${item.icon}</div>
        <div class="lib-card-key">${item.key}</div>
        <div class="lib-card-meaning">${item.meaning}</div>
        <div style="font-size: 10px; color: #94A3B8; margin-top: 4px;">Level ${item.level}</div>
      `;

      card.addEventListener("click", () => {
        audioManager.speakItem(item, "full");
      });

      this.libraryGrid.appendChild(card);
    });
  }

  // =========================================================================
  // 5. 學習報告與弱項診斷 (ReportView)
  // =========================================================================
  renderReport() {
    const calendarDays = storageManager.getRecentCalendarDays(7);
    const words = storageManager.data.words || {};

    this.historyList.innerHTML = "";
    calendarDays.forEach(day => {
      const h = day.record;
      const rate = h.questions > 0 ? Math.round((h.correct / h.questions) * 100) : 0;
      const isCatchUpRewarded = storageManager.data.catchUpRewardedDates?.includes(day.date);

      let statusBadge = "";
      let actionHtml = "";

      if (day.isToday) {
        if (day.isCompleted) {
          statusBadge = `<span style="font-size: 12px; color: var(--success); font-weight: 700;">今日已通關 🚀</span>`;
        } else {
          statusBadge = `<span style="font-size: 12px; color: var(--primary); font-weight: 700;">進行中 (${h.completedWords || 0}/5)</span>`;
        }
      } else if (day.isCompleted) {
        // 已完成的不需補做
        actionHtml = `<span style="font-size: 12px; color: var(--success); font-weight: 700;">✅ 已完成 (不需補做)${isCatchUpRewarded ? ' (+10⚡)' : ''}</span>`;
      } else if (day.status === "unperformed") {
        // 當天未施作 -> 顯示可補做
        actionHtml = `
          <span style="font-size: 12px; color: #DC2626; font-weight: 700;">未施作</span>
          <button class="history-catchup-btn" data-date="${day.date}">⚡ 可補做領能源</button>
        `;
      } else {
        // 當天未完成 (做了一部分但未滿 5 單元) -> 顯示可補做
        actionHtml = `
          <span style="font-size: 12px; color: #D97706; font-weight: 700;">未完成 (${h.completedWords || 0}/5)</span>
          <button class="history-catchup-btn" data-date="${day.date}">⚡ 繼續補做領能源</button>
        `;
      }

      const li = document.createElement("li");
      li.className = "history-item";
      li.innerHTML = `
        <div>
          <strong>📅 ${day.date}${day.isToday ? ' (今日)' : ''}</strong>
          <span style="margin-left: 10px; font-size: 12px; color: #64748B;">
            ${day.status === 'unperformed' ? '當天未施作' : `完成 ${h.completedWords || 0}/5 單元 (${h.questions || 0}題)`}
          </span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          ${h.questions > 0 ? `<span style="font-weight: 800; color: ${rate >= 80 ? 'var(--success)' : 'var(--accent)'};">${rate}% 答對</span>` : ''}
          ${statusBadge}
          ${actionHtml}
        </div>
      `;

      const catchupBtn = li.querySelector(".history-catchup-btn");
      if (catchupBtn) {
        catchupBtn.addEventListener("click", () => {
          audioManager.playClick();
          storageManager.setActiveDateKey(day.date);
          this.currentQuizRound = 1;
          this.refreshAll();
          this.switchTab("home");
        });
      }

      this.historyList.appendChild(li);
    });

    // 弱項診斷
    const weakUnits = Object.entries(words)
      .map(([idStr, stat]) => {
        const item = ZHUYIN_ITEMS.find(w => w.id === Number(idStr));
        return { item, stat };
      })
      .filter(w => w.item && w.stat.wrong > 0)
      .sort((a, b) => (b.stat.wrong / (b.stat.attempts || 1)) - (a.stat.wrong / (a.stat.attempts || 1)))
      .slice(0, 5);

    this.weakWordsList.innerHTML = "";
    if (weakUnits.length === 0) {
      this.weakWordsList.innerHTML = `<p style="color: var(--success); font-weight: 700;">目前沒有明顯弱項，表現非常優秀！🌟</p>`;
    } else {
      weakUnits.forEach(({ item, stat }) => {
        const div = document.createElement("div");
        div.style.padding = "8px 0";
        div.style.borderBottom = "1px dashed #E2E8F0";
        div.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span style="font-size: 18px; font-weight: 900; color: var(--danger); margin-right: 6px;">${item.key}</span>
              <span>${item.meaning}</span>
            </div>
            <span style="font-size: 12px; color: var(--danger); font-weight: 700;">答錯 ${stat.wrong} 次 / 共 ${stat.attempts} 次</span>
          </div>
        `;
        this.weakWordsList.appendChild(div);
      });
    }
  }
}

// 啟動應用
document.addEventListener("DOMContentLoaded", () => {
  window.app = new AppController();
});
