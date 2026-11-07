/**
 * 星際火箭探險控制器 (Space Explorer & Gamification Controller)
 * 遵循 README.md 第六節「三態權限狀態機」與「1.8s 動畫編排時序」
 * 純 CSS Keyframe GPU 加速粒子，DOM 粒子自動銷毀防止記憶體洩漏
 */

class SpaceExplorerController {
  constructor(storage, audio) {
    this.storage = storage;
    this.audio = audio;
    this.isLaunching = false;
  }

  // 取得當前火箭點火發射狀態 ('LOCKED' | 'READY')
  // 核心規則：只要有能源 (>= 10 ⚡) 就能探索，不限制一天一次！補做或做各課測驗領取能源後均可立即探索！
  getLaunchState() {
    if (this.isLaunching) {
      return "LAUNCHING";
    }
    return this.storage.canLaunch() ? "READY" : "LOCKED";
  }

  // 向下相容
  getWateringState() {
    return this.getLaunchState();
  }

  // 取得太空探索所處星系階段
  getExplorationStage() {
    const planets = Number(this.storage.data.space.planets) || 0;
    if (planets >= 30) {
      return { stage: 4, name: "璀璨仙女座星系核心", icon: "🌌✨", desc: "傳奇注音星際艦隊，解鎖宇宙終極奧秘！" };
    }
    if (planets >= 15) {
      return { stage: 3, name: "火星紅色前哨基地", icon: "🪐", desc: "火箭突破小行星帶，建立深空探險站！" };
    }
    if (planets >= 5) {
      return { stage: 2, name: "月球環繞軌道站", icon: "🌕", desc: "火箭成功進入環月軌道，探索未知宇宙！" };
    }
    return { stage: 1, name: "地球太空發射總部", icon: "🌍", desc: "累積太空能源充能，火箭就能隨時點火升空探索！" };
  }

  // 向下相容
  getGrowthStage() {
    return this.getExplorationStage();
  }

  // 觸發太空火箭點火升空動畫 (2.2s Multi-stage Cinematic Timeline)
  triggerLaunch(spaceContainer, onComplete) {
    if (this.isLaunching) return;
    if (!this.storage.canLaunch()) return;

    this.isLaunching = true;

    // 0.0s: 點火啟動，播放火箭低頻推進與能量音效
    this.audio.playRocketLaunch();

    const rocketEl = spaceContainer.querySelector(".rocket-ship");
    const launchPadEl = spaceContainer.querySelector(".launch-pad-ring");
    const flameArea = spaceContainer.querySelector(".rocket-flames-container");
    const sceneEl = spaceContainer.querySelector(".space-scene");
    const warpStarsEl = spaceContainer.querySelector("#spaceWarpStars") || sceneEl;

    // 0.05s: 火箭引擎就緒，發射環點亮高能旋轉光芒，發射高能衝擊波
    if (launchPadEl) {
      launchPadEl.classList.add("pad-ignited");
    }

    if (sceneEl) {
      const shockwave = document.createElement("div");
      shockwave.className = "launch-shockwave";
      sceneEl.appendChild(shockwave);
      setTimeout(() => { if (shockwave.parentNode) shockwave.remove(); }, 900);
    }

    // 0.1s: 火箭強烈預燃震顫 (rocket-rumble)
    if (rocketEl) {
      rocketEl.classList.remove("rocket-blastoff", "rocket-glide-in");
      rocketEl.classList.add("rocket-rumble");
    }

    // 0.15s ~ 0.85s: 連續噴射 12 顆高密度星火推進粒子
    if (flameArea) {
      for (let i = 0; i < 12; i++) {
        setTimeout(() => {
          const flame = document.createElement("div");
          flame.className = "rocket-flame-particle";
          // 隨機微量水平位移 (-22px ~ +22px)
          const offset = (Math.random() - 0.5) * 44;
          flame.style.left = `calc(50% + ${offset}px)`;
          if (Math.random() > 0.5) {
            flame.style.background = "linear-gradient(180deg, #67E8F9 0%, #3B82F6 100%)"; // 離子等離子尾焰
          }
          flameArea.appendChild(flame);

          // 動畫結束時立即自 DOM 銷毀
          setTimeout(() => {
            if (flame.parentNode) {
              flame.remove();
            }
          }, 700);
        }, i * 60);
      }
    }

    // 0.25s ~ 1.1s: 超空間躍遷光速星流 (warp speed streams)
    if (warpStarsEl) {
      for (let i = 0; i < 18; i++) {
        setTimeout(() => {
          const stream = document.createElement("div");
          stream.className = "warp-speed-stream";
          stream.style.left = `${Math.random() * 92 + 4}%`;
          stream.style.animationDuration = `${0.35 + Math.random() * 0.25}s`;
          warpStarsEl.appendChild(stream);
          setTimeout(() => {
            if (stream.parentNode) stream.remove();
          }, 650);
        }, i * 45);
      }
    }

    // 0.55s: 火箭劇烈噴氣爆發，火箭高速升空衝出頂部！
    setTimeout(() => {
      if (rocketEl) {
        rocketEl.classList.remove("rocket-rumble");
        rocketEl.classList.add("rocket-blastoff");
      }
    }, 550);

    // 1.35s: 數值結算與隨機探險成果生成 (消耗 10 ⚡，探測獨特行星或躍遷星系)
    let latestDiscovery = null;
    setTimeout(() => {
      latestDiscovery = this.storage.executeLaunch();
      this.audio.playLevelUp();

      // 向上浮動飄起太空探險成就膠囊
      const rewardCapsule = document.createElement("div");
      rewardCapsule.className = "float-reward-capsule";
      if (latestDiscovery && latestDiscovery.isGalaxyJump) {
        rewardCapsule.innerHTML = `<span style="color: #FDE047;">-10 ⚡ 推進能源</span> <span style="color: #E879F9;">+1 🌌 躍遷【${latestDiscovery.name}】</span>`;
      } else if (latestDiscovery) {
        rewardCapsule.innerHTML = `<span style="color: #FDE047;">-10 ⚡ 推進能源</span> <span style="color: #86EFAC;">+1 🪐 發現【${latestDiscovery.name}】</span>`;
      } else {
        rewardCapsule.innerHTML = `<span>-10 ⚡ 推進能源</span> <span>+1 🪐 新發現星球</span>`;
      }
      spaceContainer.appendChild(rewardCapsule);

      setTimeout(() => {
        if (rewardCapsule.parentNode) {
          rewardCapsule.remove();
        }
      }, 1500);
    }, 1350);

    // 1.7s: 火箭重回軌道巡航姿態平穩入港 (rocket-glide-in)
    setTimeout(() => {
      if (launchPadEl) launchPadEl.classList.remove("pad-ignited");
      if (rocketEl) {
        rocketEl.classList.remove("rocket-blastoff");
        rocketEl.classList.add("rocket-glide-in");
      }
    }, 1700);

    // 2.2s: 動畫復原，解鎖狀態，回傳探險成果
    setTimeout(() => {
      if (rocketEl) rocketEl.classList.remove("rocket-glide-in");
      this.isLaunching = false;
      if (onComplete) onComplete(latestDiscovery);
    }, 2200);
  }

  // 向下相容
  triggerWatering(container, onComplete) {
    this.triggerLaunch(container, onComplete);
  }
}

// 實例化全域星際探險控制器物件
const spaceController = new SpaceExplorerController(storageManager, audioManager);
const gardenController = spaceController; // 向下相容別名
