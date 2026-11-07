/**
 * ㄅㄆㄇ 注音符號知識庫資料集 (Curriculum Knowledge Base)
 * 符合 UniversalKnowledgeItem 介面標準規範
 * 階梯等級 Level 1 ~ Level 6
 */

const ZHUYIN_ITEMS = [
  // ==========================================
  // Level 1: 基礎聲母 (唇音、舌尖中音 - 8 個)
  // ==========================================
  {
    id: 1,
    key: "ㄅ",
    meaning: "包子 (ㄅㄠ ˙ㄗ)",
    category: "唇音聲母",
    icon: "🥟",
    level: 1,
    metadata: {
      phonetic: "b",
      example: "包子熱騰騰，好吃的包子 ㄅ",
      hint: "肚子圓圓像包子 ㄅ",
      parts: ["ㄅ"]
    }
  },
  {
    id: 2,
    key: "ㄆ",
    meaning: "葡萄 (ㄆㄨˊ ˙ㄊㄠ)",
    category: "唇音聲母",
    icon: "🍇",
    level: 1,
    metadata: {
      phonetic: "p",
      example: "紫色的葡萄酸又甜 ㄆ",
      hint: "右手端著一串葡萄 ㄆ",
      parts: ["ㄆ"]
    }
  },
  {
    id: 3,
    key: "ㄇ",
    meaning: "帽子 (ㄇㄠˋ ˙ㄗ)",
    category: "唇音聲母",
    icon: "🧢",
    level: 1,
    metadata: {
      phonetic: "m",
      example: "出門戴頂帽子遮太陽 ㄇ",
      hint: "像頂方方正正的小帽子 ㄇ",
      parts: ["ㄇ"]
    }
  },
  {
    id: 4,
    key: "ㄈ",
    meaning: "飛機 (ㄈㄟ ㄐㄧ)",
    category: "唇齒音聲母",
    icon: "✈️",
    level: 1,
    metadata: {
      phonetic: "f",
      example: "白色的飛機在天空飛 ㄈ",
      hint: "一拐杖立在地上 ㄈ",
      parts: ["ㄈ"]
    }
  },
  {
    id: 5,
    key: "ㄉ",
    meaning: "刀子 (ㄉㄠ ˙ㄗ)",
    category: "舌尖音聲母",
    icon: "🗡️",
    level: 1,
    metadata: {
      phonetic: "d",
      example: "切水果的刀子要小心 ㄉ",
      hint: "一把彎彎的短刀 ㄉ",
      parts: ["ㄉ"]
    }
  },
  {
    id: 6,
    key: "ㄊ",
    meaning: "雨傘/天 (ㄊㄧㄢ)",
    category: "舌尖音聲母",
    icon: "☂️",
    level: 1,
    metadata: {
      phonetic: "t",
      example: "下雨天撐開雨傘 ㄊ",
      hint: "倒過來的傘柄 ㄊ",
      parts: ["ㄊ"]
    }
  },
  {
    id: 7,
    key: "ㄋ",
    meaning: "牛奶 (ㄋㄧㄡˊ ㄋㄞˇ)",
    category: "舌尖鼻音聲母",
    icon: "🥛",
    level: 1,
    metadata: {
      phonetic: "n",
      example: "每天一杯營養好牛奶 ㄋ",
      hint: "像一條彎曲的絲帶 ㄋ",
      parts: ["ㄋ"]
    }
  },
  {
    id: 8,
    key: "ㄌ",
    meaning: "鈴鐺 (ㄌㄧㄥˊ ㄉㄤ)",
    category: "舌尖邊音聲母",
    icon: "🔔",
    level: 1,
    metadata: {
      phonetic: "l",
      example: "叮叮噹噹響鈴鐺 ㄌ",
      hint: "搖一搖響叮噹 ㄌ",
      parts: ["ㄌ"]
    }
  },

  // ==========================================
  // Level 2: 進階聲母 (舌根、舌面、翹舌、平舌 - 13 個)
  // ==========================================
  {
    id: 9,
    key: "ㄍ",
    meaning: "鴿子 (ㄍㄜ ˙ㄗ)",
    category: "舌根音聲母",
    icon: "🕊️",
    level: 2,
    metadata: {
      phonetic: "g",
      example: "和平可愛的小白鴿 ㄍ",
      hint: "九隻小鳥排隊走 ㄍ",
      parts: ["ㄍ"]
    }
  },
  {
    id: 10,
    key: "ㄎ",
    meaning: "恐龍 (ㄎㄨㄥˇ ㄌㄨㄥˊ)",
    category: "舌根音聲母",
    icon: "🦖",
    level: 2,
    metadata: {
      phonetic: "k",
      example: "巨大威風的恐龍 ㄎ",
      hint: "張大嘴巴打瞌睡 ㄎ",
      parts: ["ㄎ"]
    }
  },
  {
    id: 11,
    key: "ㄏ",
    meaning: "猴子 (ㄏㄡˊ ˙ㄗ)",
    category: "舌根音聲母",
    icon: "🐒",
    level: 2,
    metadata: {
      phonetic: "h",
      example: "調皮愛吃香蕉的猴子 ㄏ",
      hint: "一橫一撇開口笑 ㄏ",
      parts: ["ㄏ"]
    }
  },
  {
    id: 12,
    key: "ㄐ",
    meaning: "小雞 (ㄐㄧ)",
    category: "舌面音聲母",
    icon: "🐥",
    level: 2,
    metadata: {
      phonetic: "j",
      example: "黃色可愛毛茸茸的小雞 ㄐ",
      hint: "一根小木棒立著 ㄐ",
      parts: ["ㄐ"]
    }
  },
  {
    id: 13,
    key: "ㄑ",
    meaning: "氣球 (ㄑㄧˋ ㄑㄧㄡˊ)",
    category: "舌面音聲母",
    icon: "🎈",
    level: 2,
    metadata: {
      phonetic: "q",
      example: "五顏六色的氣球飛高高 ㄑ",
      hint: "像是打氣筒打氣 ㄑ",
      parts: ["ㄑ"]
    }
  },
  {
    id: 14,
    key: "ㄒ",
    meaning: "西瓜 (ㄒㄧ ㄍㄨㄚ)",
    category: "舌面音聲母",
    icon: "🍉",
    level: 2,
    metadata: {
      phonetic: "x",
      example: "夏天最解渴的大西瓜 ㄒ",
      hint: "一個打叉的大西瓜 ㄒ",
      parts: ["ㄒ"]
    }
  },
  {
    id: 15,
    key: "ㄓ",
    meaning: "蜘蛛 (ㄓ ㄓㄨ)",
    category: "翹舌音聲母",
    icon: "🕷️",
    level: 2,
    metadata: {
      phonetic: "zh",
      example: "結網捕捉昆蟲的蜘蛛 ㄓ",
      hint: "像織布機在織網 ㄓ",
      parts: ["ㄓ"]
    }
  },
  {
    id: 16,
    key: "ㄔ",
    meaning: "尺 (ㄔˇ)",
    category: "翹舌音聲母",
    icon: "📏",
    level: 2,
    metadata: {
      phonetic: "ch",
      example: "拿尺量長度畫直線 ㄔ",
      hint: "站立量身高的直尺 ㄔ",
      parts: ["ㄔ"]
    }
  },
  {
    id: 17,
    key: "ㄕ",
    meaning: "獅子 (ㄕ ˙ㄗ)",
    category: "翹舌音聲母",
    icon: "🦁",
    level: 2,
    metadata: {
      phonetic: "sh",
      example: "森林草原大獅子 ㄕ",
      hint: "一根旗桿飄旗幟 ㄕ",
      parts: ["ㄕ"]
    }
  },
  {
    id: 18,
    key: "ㄖ",
    meaning: "太陽/日 (ㄖˋ)",
    category: "翹舌音聲母",
    icon: "☀️",
    level: 2,
    metadata: {
      phonetic: "r",
      example: "紅紅的日頭照大地 ㄖ",
      hint: "方方正正太陽日 ㄖ",
      parts: ["ㄖ"]
    }
  },
  {
    id: 19,
    key: "ㄗ",
    meaning: "粽子 (ㄗㄨㄥˋ ˙ㄗ)",
    category: "平舌音聲母",
    icon: "🍙",
    level: 2,
    metadata: {
      phonetic: "z",
      example: "端午節吃香噴噴的粽子 ㄗ",
      hint: "尖尖三角像包粽 ㄗ",
      parts: ["ㄗ"]
    }
  },
  {
    id: 20,
    key: "ㄘ",
    meaning: "刺蝟 (ㄘˋ ㄨㄟˋ)",
    category: "平舌音聲母",
    icon: "🦔",
    level: 2,
    metadata: {
      phonetic: "c",
      example: "背上長滿尖刺的刺蝟 ㄘ",
      hint: "七顆尖尖的小刺 ㄘ",
      parts: ["ㄘ"]
    }
  },
  {
    id: 21,
    key: "ㄙ",
    meaning: "絲瓜 (ㄙ ㄍㄨㄚ)",
    category: "平舌音聲母",
    icon: "🥒",
    level: 2,
    metadata: {
      phonetic: "s",
      example: "翠綠又甜美的絲瓜 ㄙ",
      hint: "細長捲曲的絲線 ㄙ",
      parts: ["ㄙ"]
    }
  },

  // ==========================================
  // Level 3: 單韻母與介音 (7 個)
  // ==========================================
  {
    id: 22,
    key: "ㄚ",
    meaning: "鴨子 (ㄧㄚ ˙ㄗ)",
    category: "單韻母",
    icon: "🦆",
    level: 3,
    metadata: {
      phonetic: "a",
      example: "游來游去的小白鴨 ㄚ",
      hint: "樹枝分叉像個ㄚ",
      parts: ["ㄚ"]
    }
  },
  {
    id: 23,
    key: "ㄛ",
    meaning: "公雞叫/鍋子 (ㄍㄨㄛ)",
    category: "單韻母",
    icon: "🐓",
    level: 3,
    metadata: {
      phonetic: "o",
      example: "大公雞喔喔啼 ㄛ",
      hint: "圓圓的嘴巴發出ㄛ",
      parts: ["ㄛ"]
    }
  },
  {
    id: 24,
    key: "ㄜ",
    meaning: "天鵝 (ㄜˊ)",
    category: "單韻母",
    icon: "🦢",
    level: 3,
    metadata: {
      phonetic: "e",
      example: "美麗白天鵝游水 ㄜ",
      hint: "像天鵝彎曲著脖子 ㄜ",
      parts: ["ㄜ"]
    }
  },
  {
    id: 25,
    key: "ㄝ",
    meaning: "樹葉 (ㄧㄝˋ)",
    category: "單韻母",
    icon: "🍃",
    level: 3,
    metadata: {
      phonetic: "eh",
      example: "秋天落下的綠樹葉 ㄝ",
      hint: "彎彎捲起一片葉 ㄝ",
      parts: ["ㄝ"]
    }
  },
  {
    id: 26,
    key: "ㄧ",
    meaning: "衣服 (ㄧ ˙ㄈㄨ)",
    category: "介音/韻母",
    icon: "👕",
    level: 3,
    metadata: {
      phonetic: "i",
      example: "穿上乾淨漂亮的新衣服 ㄧ",
      hint: "一條直線就是 ㄧ",
      parts: ["ㄧ"]
    }
  },
  {
    id: 27,
    key: "ㄨ",
    meaning: "烏龜 (ㄨ ㄍㄨㄟ)",
    category: "介音/韻母",
    icon: "🐢",
    level: 3,
    metadata: {
      phonetic: "u",
      example: "慢吞吞爬行的小烏龜 ㄨ",
      hint: "房屋樑木架成 ㄨ",
      parts: ["ㄨ"]
    }
  },
  {
    id: 28,
    key: "ㄩ",
    meaning: "金魚 (ㄩˊ)",
    category: "介音/韻母",
    icon: "🐠",
    level: 3,
    metadata: {
      phonetic: "yu",
      example: "魚兒水裡游得真歡樂 ㄩ",
      hint: "像個盛水的小魚缸 ㄩ",
      parts: ["ㄩ"]
    }
  },

  // ==========================================
  // Level 4: 複韻母與鼻韻母 (9 個)
  // ==========================================
  {
    id: 29,
    key: "ㄞ",
    meaning: "白菜 (ㄅㄞˊ ㄘㄞˋ)",
    category: "複韻母",
    icon: "🥬",
    level: 4,
    metadata: {
      phonetic: "ai",
      example: "新鮮好吃的翠玉白菜 ㄞ",
      hint: "高高矮矮並排站 ㄞ",
      parts: ["ㄞ"]
    }
  },
  {
    id: 30,
    key: "ㄟ",
    meaning: "杯子 (ㄅㄟ ˙ㄗ)",
    category: "複韻母",
    icon: "🥛",
    level: 4,
    metadata: {
      phonetic: "ei",
      example: "喝水要用小杯子 ㄟ",
      hint: "一條小滑梯滑下去 ㄟ",
      parts: ["ㄟ"]
    }
  },
  {
    id: 31,
    key: "ㄠ",
    meaning: "小貓 (ㄇㄠ)",
    category: "複韻母",
    icon: "🐱",
    level: 4,
    metadata: {
      phonetic: "ao",
      example: "喵喵叫的愛玩小貓 ㄠ",
      hint: "一條彎曲的線條 ㄠ",
      parts: ["ㄠ"]
    }
  },
  {
    id: 32,
    key: "ㄡ",
    meaning: "海鷗 (ㄡ)",
    category: "複韻母",
    icon: "🕊️",
    level: 4,
    metadata: {
      phonetic: "ou",
      example: "海面上展翅飛翔的海鷗 ㄡ",
      hint: "像個橫躺的月牙 ㄡ",
      parts: ["ㄡ"]
    }
  },
  {
    id: 33,
    key: "ㄢ",
    meaning: "雨傘 (ㄙㄢˇ)",
    category: "前鼻韻母",
    icon: "☂️",
    level: 4,
    metadata: {
      phonetic: "an",
      example: "下雨天保護我們的雨傘 ㄢ",
      hint: "安安心心靠著牆 ㄢ",
      parts: ["ㄢ"]
    }
  },
  {
    id: 34,
    key: "ㄣ",
    meaning: "時鐘 (ㄓㄨㄥ/ㄣ)",
    category: "前鼻韻母",
    icon: "⏰",
    level: 4,
    metadata: {
      phonetic: "en",
      example: "滴答滴答走動的時鐘 ㄣ",
      hint: "門檻上方有橫條 ㄣ",
      parts: ["ㄣ"]
    }
  },
  {
    id: 35,
    key: "ㄤ",
    meaning: "太陽 (ㄧㄤˊ)",
    category: "後鼻韻母",
    icon: "☀️",
    level: 4,
    metadata: {
      phonetic: "ang",
      example: "陽光溫暖的紅太陽 ㄤ",
      hint: "像一把小長柄鏟 ㄤ",
      parts: ["ㄤ"]
    }
  },
  {
    id: 36,
    key: "ㄥ",
    meaning: "風箏 (ㄈㄥ)",
    category: "後鼻韻母",
    icon: "🪁",
    level: 4,
    metadata: {
      phonetic: "eng",
      example: "春天廣場上放風箏 ㄥ",
      hint: "一個轉角向右走 ㄥ",
      parts: ["ㄥ"]
    }
  },
  {
    id: 37,
    key: "ㄦ",
    meaning: "耳朵 (ㄦˇ ˙ㄉㄨㄛ)",
    category: "捲舌韻母",
    icon: "👂",
    level: 4,
    metadata: {
      phonetic: "er",
      example: "專心聽聲音的小耳朵 ㄦ",
      hint: "小兔子長長雙耳 ㄦ",
      parts: ["ㄦ"]
    }
  },

  // ==========================================
  // Level 5: 四聲調與高頻二拼 (10 個)
  // ==========================================
  {
    id: 38,
    key: "ˊ",
    meaning: "第二聲 (揚聲 / 上升)",
    category: "聲調符號",
    icon: "↗️",
    level: 5,
    metadata: {
      phonetic: "2nd tone",
      example: "小車上坡 ˊ (如: 羊 ㄧㄤˊ)",
      hint: "從左往右上揚的一撇 ˊ",
      parts: ["ˊ"]
    }
  },
  {
    id: 39,
    key: "ˇ",
    meaning: "第三聲 (轉折聲 / 下上)",
    category: "聲調符號",
    icon: "〰️",
    level: 5,
    metadata: {
      phonetic: "3rd tone",
      example: "下坡又上坡 ˇ (如: 馬 ㄇㄚˇ)",
      hint: "打個勾勾轉個彎 ˇ",
      parts: ["ˇ"]
    }
  },
  {
    id: 40,
    key: "ˋ",
    meaning: "第四聲 (降聲 / 下降)",
    category: "聲調符號",
    icon: "↘️",
    level: 5,
    metadata: {
      phonetic: "4th tone",
      example: "小車滑下坡 ˋ (如: 兔 ㄊㄨˋ)",
      hint: "從左往右下墜的一捺 ˋ",
      parts: ["ˋ"]
    }
  },
  {
    id: 41,
    key: "˙",
    meaning: "輕聲 (短輕點)",
    category: "聲調符號",
    icon: "⚪",
    level: 5,
    metadata: {
      phonetic: "neutral tone",
      example: "輕輕一顆小露珠 ˙ (如: 媽媽 ㄇㄚ ˙ㄇㄚ)",
      hint: "頭頂一顆小圓點 ˙",
      parts: ["˙"]
    }
  },
  {
    id: 42,
    key: "ㄅㄚ",
    meaning: "八 (數字 8)",
    category: "基礎二拼",
    icon: "8️⃣",
    level: 5,
    metadata: {
      phonetic: "ba",
      example: "數字一二三四五六七八",
      hint: "ㄅ + ㄚ = ㄅㄚ (八)",
      parts: ["ㄅ", "ㄚ"]
    }
  },
  {
    id: 43,
    key: "ㄇㄚˇ",
    meaning: "馬 (小奔馬)",
    category: "基礎二拼",
    icon: "🐎",
    level: 5,
    metadata: {
      phonetic: "ma3",
      example: "奔馳在草原上的駿馬",
      hint: "ㄇ + ㄚ + ˇ = ㄇㄚˇ (馬)",
      parts: ["ㄇ", "ㄚ", "ˇ"]
    }
  },
  {
    id: 44,
    key: "ㄉㄧˋ",
    meaning: "弟弟 / 大地 (ㄉㄧˋ)",
    category: "基礎二拼",
    icon: "👦",
    level: 5,
    metadata: {
      phonetic: "di4",
      example: "活潑可愛的小弟弟",
      hint: "ㄉ + ㄧ + ˋ = ㄉㄧˋ (弟)",
      parts: ["ㄉ", "ㄧ", "ˋ"]
    }
  },
  {
    id: 45,
    key: "ㄋㄧˇ",
    meaning: "你 (你好)",
    category: "基礎二拼",
    icon: "🤝",
    level: 5,
    metadata: {
      phonetic: "ni3",
      example: "很高興認識你！",
      hint: "ㄋ + ㄧ + ˇ = ㄋㄧˇ (你)",
      parts: ["ㄋ", "ㄧ", "ˇ"]
    }
  },
  {
    id: 46,
    key: "ㄊㄨˋ",
    meaning: "兔子 (ㄊㄨˋ ˙ㄗ)",
    category: "基礎二拼",
    icon: "🐰",
    level: 5,
    metadata: {
      phonetic: "tu4",
      example: "白兔蹦蹦跳跳愛吃紅蘿蔔",
      hint: "ㄊ + ㄨ + ˋ = ㄊㄨˋ (兔)",
      parts: ["ㄊ", "ㄨ", "ˋ"]
    }
  },
  {
    id: 47,
    key: "ㄌㄨˋ",
    meaning: "鹿 (小鹿)",
    category: "基礎二拼",
    icon: "🦌",
    level: 5,
    metadata: {
      phonetic: "lu4",
      example: "森林裡有長角的梅花鹿",
      hint: "ㄌ + ㄨ + ˋ = ㄌㄨˋ (鹿)",
      parts: ["ㄌ", "ㄨ", "ˋ"]
    }
  },

  // ==========================================
  // Level 6: 結合韻與三拼字詞 (10 個)
  // ==========================================
  {
    id: 48,
    key: "ㄐㄧㄚ",
    meaning: "家 (溫暖的家)",
    category: "三拼字詞",
    icon: "🏠",
    level: 6,
    metadata: {
      phonetic: "jia",
      example: "下課最喜歡回到溫暖的家",
      hint: "ㄐ + ㄧ + ㄚ = ㄐㄧㄚ (家)",
      parts: ["ㄐ", "ㄧ", "ㄚ"]
    }
  },
  {
    id: 49,
    key: "ㄏㄨㄚ",
    meaning: "花朵 (ㄏㄨㄚ)",
    category: "三拼字詞",
    icon: "🌸",
    level: 6,
    metadata: {
      phonetic: "hua",
      example: "春天花園開出美麗的花朵",
      hint: "ㄏ + ㄨ + ㄚ = ㄏㄨㄚ (花)",
      parts: ["ㄏ", "ㄨ", "ㄚ"]
    }
  },
  {
    id: 50,
    key: "ㄒㄧㄤ",
    meaning: "香水/香蕉 (ㄒㄧㄤ)",
    category: "三拼字詞",
    icon: "🍌",
    level: 6,
    metadata: {
      phonetic: "xiang",
      example: "香噴噴的烤麵包真香",
      hint: "ㄒ + ㄧ + ㄤ = ㄒㄧㄤ (香)",
      parts: ["ㄒ", "ㄧ", "ㄤ"]
    }
  },
  {
    id: 51,
    key: "ㄍㄨㄛˊ",
    meaning: "國家 (ㄍㄨㄛˊ)",
    category: "三拼字詞",
    icon: "🇹🇼",
    level: 6,
    metadata: {
      phonetic: "guo2",
      example: "我們熱愛的寶島國家",
      hint: "ㄍ + ㄨ + ㄛ + ˊ = ㄍㄨㄛˊ (國)",
      parts: ["ㄍ", "ㄨ", "ㄛ", "ˊ"]
    }
  },
  {
    id: 52,
    key: "ㄒㄧㄠˇ",
    meaning: "鳥/小 (ㄒㄧㄠˇ)",
    category: "三拼字詞",
    icon: "🐣",
    level: 6,
    metadata: {
      phonetic: "xiao3",
      example: "樹上有小小的鳥窩",
      hint: "ㄒ + ㄧ + ㄠ + ˇ = ㄒㄧㄠˇ (小)",
      parts: ["ㄒ", "ㄧ", "ㄠ", "ˇ"]
    }
  },
  {
    id: 53,
    key: "ㄌㄧㄤˋ",
    meaning: "亮晶晶 (ㄌㄧㄤˋ)",
    category: "三拼字詞",
    icon: "✨",
    level: 6,
    metadata: {
      phonetic: "liang4",
      example: "夜空中的星星亮晶晶",
      hint: "ㄌ + ㄧ + ㄤ + ˋ = ㄌㄧㄤˋ (亮)",
      parts: ["ㄌ", "ㄧ", "ㄤ", "ˋ"]
    }
  },
  {
    id: 54,
    key: "ㄧㄢ",
    meaning: "炊煙/煙 (ㄧㄢ)",
    category: "結合韻",
    icon: "💨",
    level: 6,
    metadata: {
      phonetic: "yan",
      example: "裊裊上升的炊煙",
      hint: "ㄧ + ㄢ = ㄧㄢ (煙)",
      parts: ["ㄧ", "ㄢ"]
    }
  },
  {
    id: 55,
    key: "ㄨㄤˊ",
    meaning: "大王 (ㄨㄤˊ)",
    category: "結合韻",
    icon: "👑",
    level: 6,
    metadata: {
      phonetic: "wang2",
      example: "戴著金皇冠的國王",
      hint: "ㄨ + ㄤ + ˊ = ㄨㄤˊ (王)",
      parts: ["ㄨ", "ㄤ", "ˊ"]
    }
  },
  {
    id: 56,
    key: "ㄩㄝˋ",
    meaning: "月亮 (ㄩㄝˋ)",
    category: "結合韻",
    icon: "🌙",
    level: 6,
    metadata: {
      phonetic: "yue4",
      example: "中秋夜明亮圓圓的月亮",
      hint: "ㄩ + ㄝ + ˋ = ㄩㄝˋ (月)",
      parts: ["ㄩ", "ㄝ", "ˋ"]
    }
  },
  {
    id: 57,
    key: "ㄑㄧㄤˊ",
    meaning: "牆壁 (ㄑㄧㄤˊ)",
    category: "三拼字詞",
    icon: "🧱",
    level: 6,
    metadata: {
      phonetic: "qiang2",
      example: "磚塊砌成的堅固牆壁",
      hint: "ㄑ + ㄧ + ㄤ + ˊ = ㄑㄧㄤˊ (牆)",
      parts: ["ㄑ", "ㄧ", "ㄤ", "ˊ"]
    }
  },
  {
    id: 58,
    key: "ㄖˋ",
    meaning: "日 (太陽 ㄖˋ)",
    category: "首課：魔法文字",
    icon: "☀️",
    level: 6,
    metadata: {
      phonetic: "ri4",
      example: "紅日當空照大地",
      hint: "太陽又叫作日 ㄖˋ",
      parts: ["ㄖ", "ˋ"]
    }
  },
  {
    id: 59,
    key: "ㄩㄝˋ",
    meaning: "月 (月亮 ㄩㄝˋ)",
    category: "首課：魔法文字",
    icon: "🌙",
    level: 6,
    metadata: {
      phonetic: "yue4",
      example: "彎彎月亮掛夜空",
      hint: "月牙圓又缺 ㄩㄝˋ",
      parts: ["ㄩ", "ㄝ", "ˋ"]
    }
  },
  {
    id: 60,
    key: "ㄕㄢ",
    meaning: "山 (高山 ㄕㄢ)",
    category: "首課：魔法文字",
    icon: "⛰️",
    level: 6,
    metadata: {
      phonetic: "shan1",
      example: "綠綠高山聳入雲霄",
      hint: "高高的青山 ㄕㄢ",
      parts: ["ㄕ", "ㄢ"]
    }
  },
  {
    id: 61,
    key: "ㄇㄨˋ",
    meaning: "木 (樹木 ㄇㄨˋ)",
    category: "首課：魔法文字",
    icon: "🪵",
    level: 6,
    metadata: {
      phonetic: "mu4",
      example: "森林裡有許多珍貴的樹木",
      hint: "草木青青樹木 ㄇㄨˋ",
      parts: ["ㄇ", "ㄨ", "ˋ"]
    }
  },
  {
    id: 62,
    key: "ㄕㄨㄟˇ",
    meaning: "水 (雨水 ㄕㄨㄟˇ)",
    category: "首課：魔法文字",
    icon: "💧",
    level: 6,
    metadata: {
      phonetic: "shui3",
      example: "水是生命最重要的泉源",
      hint: "清澈的泉水 ㄕㄨㄟˇ",
      parts: ["ㄕ", "ㄨ", "ㄟ", "ˇ"]
    }
  },
  {
    id: 63,
    key: "ㄖㄣˊ",
    meaning: "人 (大家 ㄖㄣˊ)",
    category: "首課：魔法文字",
    icon: "🚶",
    level: 6,
    metadata: {
      phonetic: "ren2",
      example: "每個人都要熱心助人",
      hint: "一撇一捺就是人 ㄖㄣˊ",
      parts: ["ㄖ", "ㄣ", "ˊ"]
    }
  },
  {
    id: 64,
    key: "ㄕㄡˇ",
    meaning: "手 (雙手 ㄕㄡˇ)",
    category: "首課：魔法文字",
    icon: "🖐️",
    level: 6,
    metadata: {
      phonetic: "shou3",
      example: "勤勞的小手做家事",
      hint: "伸出溫暖的雙手 ㄕㄡˇ",
      parts: ["ㄕ", "ㄡ", "ˇ"]
    }
  },
  {
    id: 65,
    key: "ㄇㄣˊ",
    meaning: "門 (大門 ㄇㄣˊ)",
    category: "首課：魔法文字",
    icon: "🚪",
    level: 6,
    metadata: {
      phonetic: "men2",
      example: "放學回到家打開大門",
      hint: "方方正正一扇門 ㄇㄣˊ",
      parts: ["ㄇ", "ㄣ", "ˊ"]
    }
  },
  {
    id: 66,
    key: "ㄒㄧㄤˋ ㄑㄧㄢˊ",
    meaning: "向前 (向前走)",
    category: "第一課：小船/一起走",
    icon: "➡️",
    level: 6,
    metadata: {
      phonetic: "xiang4 qian2",
      example: "小朋友排隊向前走",
      hint: "勇敢大步向前邁進",
      parts: ["ㄒㄧㄤˋ", "ㄑㄧㄢˊ"]
    }
  },
  {
    id: 67,
    key: "ㄐㄧㄚ ㄧㄡˊ",
    meaning: "加油 (運動加油)",
    category: "第一課：小船",
    icon: "⛽",
    level: 6,
    metadata: {
      phonetic: "jia1 you2",
      example: "運動會上大家齊聲喊加油",
      hint: "為同學們加油打氣",
      parts: ["ㄐㄧㄚ", "ㄧㄡˊ"]
    }
  },
  {
    id: 68,
    key: "ㄆㄞ ㄕㄡˇ",
    meaning: "拍手 (拍拍手)",
    category: "第一課：拍拍手",
    icon: "👏",
    level: 6,
    metadata: {
      phonetic: "pai1 shou3",
      example: "聽到精彩演講大家拍手",
      hint: "高興的時候拍拍手",
      parts: ["ㄆㄞ", "ㄕㄡˇ"]
    }
  },
  {
    id: 69,
    key: "ㄧ ㄑㄧˇ",
    meaning: "一起 (一起玩)",
    category: "第一課：一起走",
    icon: "🤝",
    level: 6,
    metadata: {
      phonetic: "yi1 qi3",
      example: "大家一起同心協力",
      hint: "我們一起去上學",
      parts: ["ㄧ", "ㄑㄧˇ"]
    }
  },
  {
    id: 70,
    key: "ㄓㄤ ㄎㄞ",
    meaning: "張開 (張開手)",
    category: "第二課：印手印",
    icon: "👐",
    level: 6,
    metadata: {
      phonetic: "zhang1 kai1",
      example: "小鳥張開翅膀高飛",
      hint: "張開雙手擁抱大家",
      parts: ["ㄓㄤ", "ㄎㄞ"]
    }
  },
  {
    id: 71,
    key: "ㄓㄠ ㄕㄡˇ",
    meaning: "招手 (揮招手)",
    category: "第二課：印手印",
    icon: "👋",
    level: 6,
    metadata: {
      phonetic: "zhao1 shou3",
      example: "在校門口向老師招手微笑",
      hint: "熱情招手說再見",
      parts: ["ㄓㄠ", "ㄕㄡˇ"]
    }
  },
  {
    id: 72,
    key: "ㄔㄜ ˙ㄗ",
    meaning: "車子 (玩具車)",
    category: "第二課：印手印",
    icon: "🚗",
    level: 6,
    metadata: {
      phonetic: "che1 zi5",
      example: "馬路上有好多行駛的車子",
      hint: "路上跑的四輪車子",
      parts: ["ㄔㄜ", "˙ㄗ"]
    }
  },
  {
    id: 73,
    key: "ㄉㄧˋ ㄕㄤˋ",
    meaning: "地上 (草地上)",
    category: "第二課：印手印",
    icon: "🌱",
    level: 6,
    metadata: {
      phonetic: "di4 shang4",
      example: "地上開滿了黃色小花",
      hint: "乾淨的地板與地上",
      parts: ["ㄉㄧˋ", "ㄕㄤˋ"]
    }
  },
  {
    id: 74,
    key: "ㄒㄧㄠˋ ㄌㄧㄢˇ",
    meaning: "笑臉 (開懷笑)",
    category: "第二課：印手印",
    icon: "😊",
    level: 6,
    metadata: {
      phonetic: "xiao4 lian3",
      example: "老師臉上帶著和藹的笑臉",
      hint: "燦爛開心的笑臉",
      parts: ["ㄒㄧㄠˋ", "ㄌㄧㄢˇ"]
    }
  },
  {
    id: 75,
    key: "ㄨㄛˇ ˙ㄇㄣ",
    meaning: "我們 (我們大家)",
    category: "第二課：大風吹",
    icon: "👥",
    level: 6,
    metadata: {
      phonetic: "wo3 men5",
      example: "我們都是一年級好同學",
      hint: "友愛團結的我們",
      parts: ["ㄨㄛˇ", "˙ㄇㄣ"]
    }
  },
  {
    id: 76,
    key: "ㄅㄨˋ ㄊㄧㄥˊ",
    meaning: "不停 (動不停)",
    category: "第二課：大風吹",
    icon: "⏳",
    level: 6,
    metadata: {
      phonetic: "bu4 ting2",
      example: "小溪流動個不停",
      hint: "時鐘滴答走不停",
      parts: ["ㄅㄨˋ", "ㄊㄧㄥˊ"]
    }
  },
  {
    id: 77,
    key: "ㄆㄠˋ ㄆㄠˋ",
    meaning: "泡泡 (彩色泡泡)",
    category: "第三課：吹泡泡",
    icon: "🫧",
    level: 6,
    metadata: {
      phonetic: "pao4 pao4",
      example: "陽光下吹出一串串彩色泡泡",
      hint: "圓圓透明的泡泡",
      parts: ["ㄆㄠˋ", "ㄆㄠˋ"]
    }
  },
  {
    id: 78,
    key: "ㄉㄚˋ ㄐㄧㄚ",
    meaning: "大家 (全體大家)",
    category: "第三課：吹泡泡",
    icon: "👨‍👩‍👧‍👦",
    level: 6,
    metadata: {
      phonetic: "da4 jia1",
      example: "下課了大家一起做操",
      hint: "全班同學大家一起來",
      parts: ["ㄉㄚˋ", "ㄐㄧㄚ"]
    }
  },
  {
    id: 79,
    key: "ㄏㄠˇ ㄉㄨㄛ",
    meaning: "好多 (很多很多)",
    category: "第三課：吹泡泡",
    icon: "🔢",
    level: 6,
    metadata: {
      phonetic: "hao3 duo1",
      example: "花園裡有好多蜜蜂蝴蝶",
      hint: "數不完的真多好多",
      parts: ["ㄏㄠˇ", "ㄉㄨㄛ"]
    }
  },
  {
    id: 80,
    key: "ㄏㄠˇ ㄒㄧㄤˋ",
    meaning: "好像 (好像棉花糖)",
    category: "第三課：吹泡泡",
    icon: "🪞",
    level: 6,
    metadata: {
      phonetic: "hao3 xiang4",
      example: "天上的白雲好像軟軟的棉花",
      hint: "神態模樣真好像",
      parts: ["ㄏㄠˇ", "ㄒㄧㄤˋ"]
    }
  },
  {
    id: 81,
    key: "ㄑㄧㄡ ㄑㄧㄢ",
    meaning: "秋千 (盪秋千)",
    category: "第三課：秋千",
    icon: "🎠",
    level: 6,
    metadata: {
      phonetic: "qiu1 qian1",
      example: "小朋友最愛在操場盪秋千",
      hint: "飛高高坐秋千",
      parts: ["ㄑㄧㄡ", "ㄑㄧㄢ"]
    }
  },
  {
    id: 82,
    key: "ㄍㄠ ㄕㄢ",
    meaning: "高山 (雄偉高山)",
    category: "第三課：秋千",
    icon: "⛰️",
    level: 6,
    metadata: {
      phonetic: "gao1 shan1",
      example: "玉山是臺灣最高的高山",
      hint: "聳入雲霄的高山",
      parts: ["ㄍㄠ", "ㄕㄢ"]
    }
  },
  {
    id: 83,
    key: "ㄉㄚˋ ㄏㄞˇ",
    meaning: "大海 (遼闊大海)",
    category: "第三課：秋千",
    icon: "🌊",
    level: 6,
    metadata: {
      phonetic: "da4 hai3",
      example: "藍藍的大海望不到邊際",
      hint: "波濤滾滾的大海",
      parts: ["ㄉㄚˋ", "ㄏㄞˇ"]
    }
  },
  {
    id: 84,
    key: "ㄏㄠˇ ㄆㄥˊ ㄧㄡˇ",
    meaning: "好朋友 (親密朋友)",
    category: "第三課：秋千",
    icon: "👭",
    level: 6,
    metadata: {
      phonetic: "hao3 peng2 you3",
      example: "我和小英是一輩子的好朋友",
      hint: "互相幫助的好朋友",
      parts: ["ㄏㄠˇ", "ㄆㄥˊ", "ㄧㄡˇ"]
    }
  },
  {
    id: 85,
    key: "ㄏㄨㄛˇ ㄔㄜ",
    meaning: "火車 (鐵道火車)",
    category: "第三課：火車過山洞",
    icon: "🚂",
    level: 6,
    metadata: {
      phonetic: "huo3 che1",
      example: "火車沿著鐵軌飛快奔馳",
      hint: "鳴笛前進的火車",
      parts: ["ㄏㄨㄛˇ", "ㄔㄜ"]
    }
  },
  {
    id: 86,
    key: "ㄕㄢ ㄉㄨㄥˋ",
    meaning: "山洞 (穿過山洞)",
    category: "第三課：火車過山洞",
    icon: "🕳️",
    level: 6,
    metadata: {
      phonetic: "shan1 dong4",
      example: "火車嘟嘟穿過深邃的山洞",
      hint: "黑黑長長的山洞",
      parts: ["ㄕㄢ", "ㄉㄨㄥˋ"]
    }
  },
  {
    id: 87,
    key: "ㄅㄚˋ ˙ㄅㄚ",
    meaning: "爸爸 (親愛爸爸)",
    category: "第四課：你好",
    icon: "👨",
    level: 6,
    metadata: {
      phonetic: "ba4 ba5",
      example: "爸爸牽著我的手一起散步",
      hint: "一家之主好爸爸",
      parts: ["ㄅㄚˋ", "˙ㄅㄚ"]
    }
  },
  {
    id: 88,
    key: "ㄆㄥˊ ㄧㄡˇ",
    meaning: "朋友 (知心朋友)",
    category: "第四課：你好",
    icon: "🧑‍🤝‍🧑",
    level: 6,
    metadata: {
      phonetic: "peng2 you3",
      example: "有困難時朋友會給予溫暖",
      hint: "友善溫暖的好朋友",
      parts: ["ㄆㄥˊ", "ㄧㄡˇ"]
    }
  },
  {
    id: 89,
    key: "ㄑㄧㄥ ㄨㄚ",
    meaning: "青蛙 (荷葉青蛙)",
    category: "第四課：大個子，小個子",
    icon: "🐸",
    level: 6,
    metadata: {
      phonetic: "qing1 wa1",
      example: "稻田裡傳來陣陣青蛙鳴叫",
      hint: "池塘游泳綠青蛙",
      parts: ["ㄑㄧㄥ", "ㄨㄚ"]
    }
  },
  {
    id: 90,
    key: "ㄎㄞ ㄒㄧㄣ",
    meaning: "開心 (非常開心)",
    category: "第四課：大個子，小個子",
    icon: "😄",
    level: 6,
    metadata: {
      phonetic: "kai1 xin1",
      example: "今天拿到滿分好開心",
      hint: "臉帶笑容真開心",
      parts: ["ㄎㄞ", "ㄒㄧㄣ"]
    }
  },
  {
    id: 91,
    key: "ㄑㄧㄥˇ ㄨㄣˋ",
    meaning: "請問 (禮貌請問)",
    category: "第四課：請問",
    icon: "🙋",
    level: 6,
    metadata: {
      phonetic: "qing3 wen4",
      example: "請問圖書館要往哪邊走？",
      hint: "禮貌詢問說請問",
      parts: ["ㄑㄧㄥˇ", "ㄨㄣˋ"]
    }
  },
  {
    id: 92,
    key: "ㄒㄧㄠˇ ㄘㄠˇ",
    meaning: "小草 (青綠小草)",
    category: "第四課：請問",
    icon: "🌿",
    level: 6,
    metadata: {
      phonetic: "xiao3 cao3",
      example: "路旁生長著堅韌的青綠小草",
      hint: "綠油油的嫩小草",
      parts: ["ㄒㄧㄠˇ", "ㄘㄠˇ"]
    }
  },
  {
    id: 93,
    key: "ㄒㄧㄥ ˙ㄒㄧㄥ",
    meaning: "星星 (夜空星星)",
    category: "第四課：請問",
    icon: "⭐",
    level: 6,
    metadata: {
      phonetic: "xing1 xing5",
      example: "夜空中眨著明亮的星星",
      hint: "天上一閃一閃小星星",
      parts: ["ㄒㄧㄥ", "˙ㄒㄧㄥ"]
    }
  },
  {
    id: 94,
    key: "ㄉㄨㄛ ㄕㄠˇ",
    meaning: "多少 (數量多少)",
    category: "第四課：請問",
    icon: "❓",
    level: 6,
    metadata: {
      phonetic: "duo1 shao3",
      example: "不知道這裡有多少隻小鳥？",
      hint: "計算數量有多少",
      parts: ["ㄉㄨㄛ", "ㄕㄠˇ"]
    }
  },
  {
    id: 95,
    key: "ㄊㄞˋ ㄧㄤˊ",
    meaning: "太陽 (溫暖太陽)",
    category: "第四課：請問",
    icon: "☀️",
    level: 6,
    metadata: {
      phonetic: "tai4 yang2",
      example: "早晨溫暖的太陽升起來了",
      hint: "紅通通的太陽",
      parts: ["ㄊㄞˋ", "ㄧㄤˊ"]
    }
  },
  {
    id: 96,
    key: "ㄕㄨㄟˇ ㄓㄨ",
    meaning: "水珠 (晶瑩水珠)",
    category: "第四課：請問",
    icon: "💧",
    level: 6,
    metadata: {
      phonetic: "shui3 zhu1",
      example: "玫瑰花瓣上掛著晶瑩小水珠",
      hint: "露水成圓小水珠",
      parts: ["ㄕㄨㄟˇ", "ㄓㄨ"]
    }
  },
  {
    id: 97,
    key: "ㄨㄞˋ ㄒㄧㄥ ㄖㄣˊ",
    meaning: "外星人 (太空訪客)",
    category: "第五課：外星人",
    icon: "👽",
    level: 6,
    metadata: {
      phonetic: "wai4 xing1 ren2",
      example: "科幻電影裡常有外星人出現",
      hint: "乘坐幽浮的外星人",
      parts: ["ㄨㄞˋ", "ㄒㄧㄥ", "ㄖㄣˊ"]
    }
  },
  {
    id: 98,
    key: "ㄒㄧㄥ ㄑㄧㄡˊ",
    meaning: "星球 (美麗星球)",
    category: "第五課：外星人",
    icon: "🪐",
    level: 6,
    metadata: {
      phonetic: "xing1 qiu2",
      example: "地球是我們共同生活的星球",
      hint: "宇宙旋轉的星球",
      parts: ["ㄒㄧㄥ", "ㄑㄧㄡˊ"]
    }
  },
  {
    id: 99,
    key: "ㄓㄜˋ ㄌㄧˇ",
    meaning: "這裡 (就在這裡)",
    category: "第五課：外星人",
    icon: "📍",
    level: 6,
    metadata: {
      phonetic: "zhe4 li3",
      example: "這裡風景秀麗適合野餐",
      hint: "就在眼前這地方這裡",
      parts: ["ㄓㄜˋ", "ㄌㄧˇ"]
    }
  },
  {
    id: 100,
    key: "ㄕㄣˊ ˙ㄇㄜ",
    meaning: "什麼 (是什麼呢)",
    category: "第五課：外星人",
    icon: "❔",
    level: 6,
    metadata: {
      phonetic: "shen2 me5",
      example: "口袋裡藏著什麼好東西？",
      hint: "好奇提問是什麼",
      parts: ["ㄕㄣˊ", "˙ㄇㄜ"]
    }
  },
  {
    id: 101,
    key: "ㄏㄜˊ ㄌㄧㄡˊ",
    meaning: "河流 (潺潺河流)",
    category: "第五課：外星人",
    icon: "🏞️",
    level: 6,
    metadata: {
      phonetic: "he2 liu2",
      example: "長長的河流孕育了兩岸城鎮",
      hint: "清清潺潺的河流",
      parts: ["ㄏㄜˊ", "ㄌㄧㄡˊ"]
    }
  },
  {
    id: 102,
    key: "ㄇㄣˊ ㄨㄞˋ",
    meaning: "門外 (站在門外)",
    category: "第五課：比一比",
    icon: "🚪",
    level: 6,
    metadata: {
      phonetic: "men2 wai4",
      example: "郵差叔叔站在大門外送信",
      hint: "走出房門在門外",
      parts: ["ㄇㄣˊ", "ㄨㄞˋ"]
    }
  },
  {
    id: 103,
    key: "ㄅㄨˋ ㄊㄨㄥˊ",
    meaning: "不同 (各有不同)",
    category: "第五課：比一比",
    icon: "🔄",
    level: 6,
    metadata: {
      phonetic: "bu4 tong2",
      example: "每樣水果的滋味各有不同",
      hint: "外表特色皆不同",
      parts: ["ㄅㄨˋ", "ㄊㄨㄥˊ"]
    }
  },
  {
    id: 104,
    key: "ㄗㄠˇ ㄕㄤˋ",
    meaning: "早上 (清晨早上)",
    category: "第五課：比一比",
    icon: "🌅",
    level: 6,
    metadata: {
      phonetic: "zao3 shang4",
      example: "早上公雞喔喔叫醒大家",
      hint: "清早起步美好早上",
      parts: ["ㄗㄠˇ", "ㄕㄤˋ"]
    }
  },
  {
    id: 105,
    key: "ㄨㄢˇ ㄕㄤˋ",
    meaning: "晚上 (夜空晚上)",
    category: "第五課：比一比",
    icon: "🌙",
    level: 6,
    metadata: {
      phonetic: "wan3 shang4",
      example: "晚上仰望星空聽故事",
      hint: "明月當空是晚上",
      parts: ["ㄨㄢˇ", "ㄕㄤˋ"]
    }
  },
  {
    id: 106,
    key: "ㄨㄤˊ ㄗˇ",
    meaning: "王子 (勇敢王子)",
    category: "第五課：比一比",
    icon: "👑",
    level: 6,
    metadata: {
      phonetic: "wang2 zi3",
      example: "傳奇故事裡的智勇小王子",
      hint: "皇宮城堡小王子",
      parts: ["ㄨㄤˊ", "ㄗˇ"]
    }
  },
  {
    id: 107,
    key: "ㄓㄨˇ ㄖㄣˊ",
    meaning: "主人 (忠誠主人)",
    category: "第五課：比一比",
    icon: "🐕",
    level: 6,
    metadata: {
      phonetic: "zhu3 ren2",
      example: "小貓親暱地靠在主人身邊",
      hint: "照顧寵物的好主人",
      parts: ["ㄓㄨˇ", "ㄖㄣˊ"]
    }
  },
  {
    id: 108,
    key: "ㄏㄨㄚˊ ㄊㄧ",
    meaning: "滑梯 (溜溜滑梯)",
    category: "第五課：七彩滑梯",
    icon: "🛝",
    level: 6,
    metadata: {
      phonetic: "hua2 ti1",
      example: "小朋友排隊開心地溜滑梯",
      hint: "公園遊樂場滑梯",
      parts: ["ㄏㄨㄚˊ", "ㄊㄧ"]
    }
  },
  {
    id: 109,
    key: "ㄊㄧㄢ ㄕㄤˋ",
    meaning: "天上 (藍藍天上)",
    category: "第五課：七彩滑梯",
    icon: "☁️",
    level: 6,
    metadata: {
      phonetic: "tian1 shang4",
      example: "天上飄著朵朵白色羽毛雲",
      hint: "飛鳥展翅在天上",
      parts: ["ㄊㄧㄢ", "ㄕㄤˋ"]
    }
  },
  {
    id: 110,
    key: "ㄇㄧㄢˊ ㄏㄨㄚ ㄊㄤˊ",
    meaning: "棉花糖 (甜軟糖果)",
    category: "第五課：七彩滑梯",
    icon: "🍭",
    level: 6,
    metadata: {
      phonetic: "mian2 hua1 tang2",
      example: "夜市裡買了一大支甜甜棉花糖",
      hint: "軟棉蓬鬆棉花糖",
      parts: ["ㄇㄧㄢˊ", "ㄏㄨㄚ", "ㄊㄤˊ"]
    }
  },
  {
    id: 111,
    key: "ㄐㄧㄣ ㄩˊ",
    meaning: "金魚 (悠游金魚)",
    category: "第六課：小金魚",
    icon: "🐠",
    level: 6,
    metadata: {
      phonetic: "jin1 yu2",
      example: "魚缸裡游來游去的小金魚",
      hint: "紅色大尾巴小金魚",
      parts: ["ㄐㄧㄣ", "ㄩˊ"]
    }
  },
  {
    id: 112,
    key: "ㄩˊ ㄍㄤ",
    meaning: "魚缸 (透明魚缸)",
    category: "第六課：小金魚",
    icon: "🫧",
    level: 6,
    metadata: {
      phonetic: "yu2 gang1",
      example: "媽媽把魚缸洗得亮晶晶",
      hint: "養魚觀賞透明魚缸",
      parts: ["ㄩˊ", "ㄍㄤ"]
    }
  },
  {
    id: 113,
    key: "ㄑㄧㄠˇ ㄑㄧㄠˇ ㄏㄨㄚˋ",
    meaning: "悄悄話 (秘密密語)",
    category: "第六課：小金魚",
    icon: "🤫",
    level: 6,
    metadata: {
      phonetic: "qiao3 qiao3 hua4",
      example: "兩個好友靠在耳邊說悄悄話",
      hint: "輕聲細語悄悄話",
      parts: ["ㄑㄧㄠˇ", "ㄑㄧㄠˇ", "ㄏㄨㄚˋ"]
    }
  },
  {
    id: 114,
    key: "ㄨㄟˇ ˙ㄅㄚ",
    meaning: "尾巴 (毛茸尾巴)",
    category: "第六課：小金魚",
    icon: "🦊",
    level: 6,
    metadata: {
      phonetic: "wei3 ba5",
      example: "小狗開心地搖著蓬鬆尾巴",
      hint: "動物身後長尾巴",
      parts: ["ㄨㄟˇ", "˙ㄅㄚ"]
    }
  },
  {
    id: 115,
    key: "ㄏㄨㄥˊ ㄏㄨㄚ",
    meaning: "紅花 (盛開紅花)",
    category: "第六課：小金魚/小路",
    icon: "🌺",
    level: 6,
    metadata: {
      phonetic: "hong2 hua1",
      example: "春天枝頭盛開了嬌豔的紅花",
      hint: "萬綠叢中一點紅花",
      parts: ["ㄏㄨㄥˊ", "ㄏㄨㄚ"]
    }
  },
  {
    id: 116,
    key: "ㄒㄧㄠˇ ㄌㄨˋ",
    meaning: "小路 (蜿蜒小路)",
    category: "第六課：小路",
    icon: "🛣️",
    level: 6,
    metadata: {
      phonetic: "xiao3 lu4",
      example: "順著林間小路漫步真舒服",
      hint: "鄉間幽靜的林蔭小路",
      parts: ["ㄒㄧㄠˇ", "ㄌㄨˋ"]
    }
  },
  {
    id: 117,
    key: "ㄅㄞˊ ㄏㄨㄚ",
    meaning: "白花 (純潔白花)",
    category: "第六課：小路",
    icon: "🌼",
    level: 6,
    metadata: {
      phonetic: "bai2 hua1",
      example: "草叢裡點綴著星星般的白花",
      hint: "素雅潔淨的小白花",
      parts: ["ㄅㄞˊ", "ㄏㄨㄚ"]
    }
  },
  {
    id: 118,
    key: "ㄊㄧㄢ ㄎㄨㄥ",
    meaning: "天空 (廣闊天空)",
    category: "第六課：秋千",
    icon: "🌌",
    level: 6,
    metadata: {
      phonetic: "tian1 kong1",
      example: "飛機飛翔在高高的蔚藍天空",
      hint: "遼闊蔚藍的大天空",
      parts: ["ㄊㄧㄢ", "ㄎㄨㄥ"]
    }
  },
  {
    id: 119,
    key: "ㄨㄟˋ ㄕㄣˊ ˙ㄇㄜ",
    meaning: "為什麼 (探究原因)",
    category: "第七課：紅紅的春",
    icon: "🤔",
    level: 6,
    metadata: {
      phonetic: "wei4 shen2 me5",
      example: "我們常好奇地探索為什麼",
      hint: "探索大自然問為什麼",
      parts: ["ㄨㄟˋ", "ㄕㄣˊ", "˙ㄇㄜ"]
    }
  },
  {
    id: 120,
    key: "ㄔㄨㄣ ㄊㄧㄢ",
    meaning: "春天 (萬物復甦)",
    category: "第七課：紅紅的春",
    icon: "🌸",
    level: 6,
    metadata: {
      phonetic: "chun1 tian1",
      example: "春天到了草木開始發芽長綠",
      hint: "百花盛開的溫暖春天",
      parts: ["ㄔㄨㄣ", "ㄊㄧㄢ"]
    }
  },
  {
    id: 121,
    key: "ㄐㄧㄚ ㄌㄧˇ",
    meaning: "家裡 (溫馨家裡)",
    category: "第七課：紅紅的春",
    icon: "🏡",
    level: 6,
    metadata: {
      phonetic: "jia1 li3",
      example: "放學回家家裡好溫暖",
      hint: "家人同住溫暖家裡",
      parts: ["ㄐㄧㄚ", "ㄌㄧˇ"]
    }
  },
  {
    id: 122,
    key: "ㄈㄤˊ ˙ㄗ",
    meaning: "房子 (漂亮房子)",
    category: "第七課：紅紅的春",
    icon: "🏠",
    level: 6,
    metadata: {
      phonetic: "fang2 zi5",
      example: "村莊裡建起了磚瓦新房子",
      hint: "遮風避雨好房子",
      parts: ["ㄈㄤˊ", "˙ㄗ"]
    }
  },
  {
    id: 123,
    key: "ㄒㄧㄥˋ ㄈㄨˊ",
    meaning: "幸福 (平安幸福)",
    category: "第七課：紅紅的春",
    icon: "💖",
    level: 6,
    metadata: {
      phonetic: "xing4 fu2",
      example: "全家平安在一起就是最大的幸福",
      hint: "美滿歡樂真幸福",
      parts: ["ㄒㄧㄥˋ", "ㄈㄨˊ"]
    }
  },
  {
    id: 124,
    key: "ㄏㄨㄟˊ ㄧㄣ",
    meaning: "回音 (空谷回音)",
    category: "第七課：回音",
    icon: "📢",
    level: 6,
    metadata: {
      phonetic: "hui2 yin1",
      example: "在空曠的山谷大喊會有回音",
      hint: "山壁反彈的回音",
      parts: ["ㄏㄨㄟˊ", "ㄧㄣ"]
    }
  },
  {
    id: 125,
    key: "ㄕㄢ ㄍㄨˇ",
    meaning: "山谷 (幽靜山谷)",
    category: "第七課：回音",
    icon: "🏔️",
    level: 6,
    metadata: {
      phonetic: "shan1 gu3",
      example: "清晨山谷裡瀰漫著淡淡霧氣",
      hint: "兩座青山夾著山谷",
      parts: ["ㄕㄢ", "ㄍㄨˇ"]
    }
  },
  {
    id: 126,
    key: "ㄏㄚ ㄏㄚ ㄉㄚˋ ㄒㄧㄠˋ",
    meaning: "哈哈大笑 (開懷大笑)",
    category: "第七課：回音",
    icon: "😆",
    level: 6,
    metadata: {
      phonetic: "ha1 ha1 da4 xiao4",
      example: "聽了有趣的笑話大家哈哈大笑",
      hint: "笑逐顏開哈哈大笑",
      parts: ["ㄏㄚ", "ㄏㄚ", "ㄉㄚˋ", "ㄒㄧㄠˋ"]
    }
  }
];

// 難度分級名稱映射
const LEVEL_CONFIG = {
  1: { name: "基礎聲母 (8符號)", desc: "唇音與舌尖音 (ㄅ~ㄌ)", total: 8 },
  2: { name: "進階聲母 (13符號)", desc: "舌根、翹舌、平舌音 (ㄍ~ㄙ)", total: 13 },
  3: { name: "單韻母與介音 (7符號)", desc: "核心單韻母與介音 (ㄚ~ㄩ)", total: 7 },
  4: { name: "複韻母與鼻韻母 (9符號)", desc: "複韻母與前後鼻韻 (ㄞ~ㄦ)", total: 9 },
  5: { name: "四聲調與基礎二拼", desc: "聲調符號與生活常用二拼", total: 10 },
  6: { name: "115-1各課字詞與結合韻", desc: "各版本首課至第七課精選字詞與三拼 (共79單元)", total: 79 }
};

// 一年級 115-1 各課專項測驗課程清單
const GRADE1_LESSONS = [
  {
    id: "lesson0",
    name: "首課：魔法文字",
    publisher: "南一版 預備課",
    desc: "日、月、山、木、水、人、手、門",
    icon: "🪄",
    itemIds: [58, 59, 60, 61, 62, 63, 64, 65]
  },
  {
    id: "lesson1",
    name: "第一課：小船 / 拍拍手 / 一起走",
    publisher: "南一・康軒・翰林",
    desc: "向前、加油、拍手、一起",
    icon: "⛵",
    itemIds: [66, 67, 68, 69]
  },
  {
    id: "lesson2",
    name: "第二課：印手印 / 這是誰的 / 大風吹",
    publisher: "南一・康軒・翰林",
    desc: "張開、招手、車子、地上、笑臉、我們、不停",
    icon: "🖐️",
    itemIds: [70, 71, 72, 73, 74, 75, 76]
  },
  {
    id: "lesson3",
    name: "第三課：吹泡泡 / 秋千 / 火車過山洞",
    publisher: "南一・康軒・翰林",
    desc: "泡泡、大家、好多、好像、秋千、高山、大海、好朋友、火車、山洞",
    icon: "🫧",
    itemIds: [77, 78, 79, 80, 81, 82, 83, 84, 85, 86]
  },
  {
    id: "lesson4",
    name: "第四課：你好 / 大個子小個子 / 請問",
    publisher: "南一・康軒・翰林",
    desc: "爸爸、朋友、青蛙、開心、請問、小草、星星、多少、太陽、水珠",
    icon: "🐸",
    itemIds: [87, 88, 89, 90, 91, 92, 93, 94, 95, 96]
  },
  {
    id: "lesson5",
    name: "第五課：外星人 / 比一比 / 七彩滑梯",
    publisher: "南一・康軒・翰林",
    desc: "外星人、星球、這裡、什麼、河流、門外、不同、早上、晚上、王子、主人、滑梯、天上、棉花糖",
    icon: "👽",
    itemIds: [97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110]
  },
  {
    id: "lesson6",
    name: "第六課：小金魚 / 小路 / 秋千",
    publisher: "南一・康軒・翰林",
    desc: "金魚、魚缸、悄悄話、尾巴、紅花、小路、白花、天空",
    icon: "🐠",
    itemIds: [111, 112, 113, 114, 115, 116, 117, 118]
  },
  {
    id: "lesson7",
    name: "第七課：紅紅的春 / 回音",
    publisher: "南一・翰林",
    desc: "為什麼、春天、家裡、房子、幸福、回音、山谷、哈哈大笑",
    icon: "🌸",
    itemIds: [119, 120, 121, 122, 123, 124, 125, 126]
  },
  {
    id: "lesson_pinyin",
    name: "三拼字詞與結合韻特訓",
    publisher: "三拼結合韻專項",
    desc: "家、花朵、香水/香蕉、國家、小鳥、亮晶晶、炊煙、大王、月亮、牆壁",
    icon: "🧩",
    itemIds: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57]
  }
];

// =========================================================================
// 國小 1~6 年級全域課程註冊表 (Curriculum Registry Pattern)
// 規範：面板遵循「有增加才顯示」原則，只有 lessons 包含資料的年級才會動態呈現在面板中
// =========================================================================
const CURRICULUM_REGISTRY = {
  grade1: {
    id: "grade1",
    name: "一年級",
    badge: "🌱 低年級",
    icon: "🎒",
    description: "注音符號進階拼音與國字啟蒙生詞 (115-1 跨版本)",
    lessons: GRADE1_LESSONS
  },
  grade2: {
    id: "grade2",
    name: "二年級",
    badge: "🌿 低年級",
    icon: "✏️",
    description: "部首認讀、基礎短語與生字詞拼音練習",
    lessons: [] // 未來擴充，目前為空則不顯示於面板
  },
  grade3: {
    id: "grade3",
    name: "三年級",
    badge: "🌳 中年級",
    icon: "📚",
    description: "成語發音辨識、多音字精練",
    lessons: [] // 未來擴充，目前為空則不顯示於面板
  },
  grade4: {
    id: "grade4",
    name: "四年級",
    badge: "🍃 中年級",
    icon: "📖",
    description: "修辭辨析、形近字與多音字進階",
    lessons: [] // 未來擴充，目前為空則不顯示於面板
  },
  grade5: {
    id: "grade5",
    name: "五年級",
    badge: "🍂 高年級",
    icon: "🎓",
    description: "文言字詞音讀、語境詞意精練",
    lessons: [] // 未來擴充，目前為空則不顯示於面板
  },
  grade6: {
    id: "grade6",
    name: "六年級",
    badge: "🍁 高年級",
    icon: "🏆",
    description: "升國中全方位字音字形總複習",
    lessons: [] // 未來擴充，目前為空則不顯示於面板
  }
};

// 取得所有有收錄課程的有效年級列表 (有增加才顯示核心函式)
function getActiveGrades() {
  if (typeof CURRICULUM_REGISTRY === "undefined") return [];
  return Object.values(CURRICULUM_REGISTRY).filter(
    grade => Array.isArray(grade.lessons) && grade.lessons.length > 0
  );
}

// 依據年級 ID 取得該年級課次清單
function getLessonsByGrade(gradeId) {
  if (!CURRICULUM_REGISTRY?.[gradeId]) return [];
  return CURRICULUM_REGISTRY[gradeId].lessons || [];
}

// 依據年級 ID 取得年級設定
function getGradeConfig(gradeId) {
  return CURRICULUM_REGISTRY?.[gradeId] || null;
}

// =========================================================================
// 易錯字複習與聽寫加強專項 (ㄥ、ㄣ、ㄤ、ㄡ、ㄜ)
// 針對學童高頻混淆音：前後鼻音 (ㄣ vs ㄥ vs ㄤ) 與易混淆韻母 (ㄡ vs ㄜ)
// =========================================================================
const CONFUSION_CONFIG = {
  id: "confusion_mastery",
  name: "易錯字複習・聽寫加強 (ㄥ、ㄣ、ㄤ、ㄡ、ㄜ、ㄝ、ㄟ、ㄛ)",
  badge: "🎧 聽寫特訓",
  desc: "專門針對低年級最容易混淆的 8 大關鍵音進行高強度聽力辨析與積木聽寫特訓！",
  symbols: [
    { key: "ㄥ", name: "後鼻韻母 ㄥ (eng)", id: 36, distractors: ["ㄣ", "ㄤ", "ㄜ"], tip: "舌根往後縮，氣流振動鼻腔後部發出嗡嗡聲", icon: "🪁", soundWord: "風箏" },
    { key: "ㄣ", name: "前鼻韻母 ㄣ (en)", id: 34, distractors: ["ㄥ", "ㄢ", "ㄜ"], tip: "舌尖頂住上門牙齦，氣流由鼻孔前端出", icon: "⏰", soundWord: "時鐘" },
    { key: "ㄤ", name: "後鼻韻母 ㄤ (ang)", id: 35, distractors: ["ㄥ", "ㄢ", "ㄚ"], tip: "嘴巴張大，舌根向後抬起發出響亮鼻音", icon: "☀️", soundWord: "太陽" },
    { key: "ㄡ", name: "複韻母 ㄡ (ou)", id: 32, distractors: ["ㄛ", "ㄜ", "ㄨ"], tip: "由 o 滑向 u，圓唇微收，有動態過渡", icon: "🕊️", soundWord: "海鷗" },
    { key: "ㄜ", name: "單韻母 ㄜ (e)", id: 24, distractors: ["ㄡ", "ㄛ", "ㄚ"], tip: "嘴角向兩側微咧，舌面後部抬起，不圓唇", icon: "🦢", soundWord: "天鵝" },
    { key: "ㄝ", name: "單韻母 ㄝ (ê)", id: 25, distractors: ["ㄟ", "ㄞ", "ㄜ"], tip: "舌位偏前，嘴角向兩側微咧扁平，發音清脆唇形不變", icon: "🍃", soundWord: "樹葉" },
    { key: "ㄟ", name: "複韻母 ㄟ (ei)", id: 30, distractors: ["ㄝ", "ㄞ", "ㄜ"], tip: "由 e 滑向 i，嘴角逐漸拉平收窄，有滑音過渡", icon: "🥛", soundWord: "杯子" },
    { key: "ㄛ", name: "單韻母 ㄛ (o)", id: 23, distractors: ["ㄡ", "ㄨㄛ", "ㄜ"], tip: "雙唇攏圓成圓孔狀，唇形保持圓形不動", icon: "🐓", soundWord: "公雞" }
  ],
  wordUnitIds: [
    36,  // ㄥ (風箏)
    118, // 天空 (ㄊㄧㄢ ㄎㄨㄥ) - ㄥ
    115, // 紅花 (ㄏㄨㄥˊ ㄏㄨㄚ) - ㄥ
    94,  // 星星 (ㄒㄧㄥ ˙ㄒㄧㄥ) - ㄥ
    34,  // ㄣ (時鐘)
    45,  // 森林 (ㄙㄣ ㄌㄧㄣˊ) - ㄣ
    102, // 門外 (ㄇㄣˊ ㄨㄞˋ) - ㄣ
    120, // 春天 (ㄔㄨㄣ ㄊㄧㄢ) - ㄣ
    111, // 金魚 (ㄐㄧㄣ ㄩˊ) - ㄣ
    35,  // ㄤ (太陽)
    50,  // 香水/香蕉 (ㄒㄧㄤ ㄕㄨㄟˇ) - ㄤ
    70,  // 張開 (ㄓㄤ ㄎㄞ) - ㄤ
    82,  // 高山 (ㄍㄠ ㄕㄢ) - ㄤ
    32,  // ㄡ (海鷗)
    64,  // 手 (ㄕㄡˇ) - ㄡ
    67,  // 加油 (ㄐㄧㄚ ㄧㄡˊ) - ㄡ
    84,  // 好朋友 (ㄏㄠˇ ㄆㄥˊ ㄧㄡˇ) - ㄡ & ㄥ
    24,  // ㄜ (天鵝)
    72,  // 車子 (ㄔㄜ ˙ㄗ) - ㄜ
    101, // 河流 (ㄏㄜˊ ㄌㄧㄡˊ) - ㄜ & ㄡ
    100, // 什麼 (ㄕㄣˊ ˙ㄇㄜ) - ㄣ & ㄜ
    25,  // ㄝ (樹葉)
    56,  // 月亮 (ㄩㄝˋ) - ㄝ
    30,  // ㄟ (杯子)
    62,  // 水 (雨水 ㄕㄨㄟˇ) - ㄟ
    114, // 尾巴 (ㄨㄟˇ ˙ㄅㄚ) - ㄟ
    124, // 回音 (ㄏㄨㄟˊ ㄧㄣ) - ㄟ
    23,  // ㄛ (公雞叫 ㄍㄨㄛ) - ㄛ
    85   // 火車 (ㄏㄨㄛˇ ㄔㄜ) - ㄛ
  ]
};

function getConfusionConfig() {
  return CONFUSION_CONFIG;
}

// =========================================================================
// 易錯字生字詞彙聽選對比題庫 (嚴格依據教育部國語審定音校訂，涵蓋一～四聲各聲調)
// 包含：ㄆㄛ vs ㄆㄨㄛ (ㄛ vs ㄨㄛ)、ㄓ vs ㄗ (翹舌 vs 平舌)、ㄜ vs ㄦ (單韻母 vs 捲舌)、ㄥ vs ㄣ (後鼻 vs 前鼻)
// =========================================================================
const CONFUSION_PAIR_GROUPS = [
  {
    id: "o_vs_uo",
    name: "ㄛ vs ㄨㄛ (例如 ㄆㄛ / ㄆㄨㄛ)",
    desc: "雙唇音 (ㄅ/ㄆ/ㄇ/ㄈ) 直接拼 ㄛ，中間絕不加 ㄨ；與 ㄉ/ㄊ/ㄍ/ㄏ 接 ㄨㄛ 的區辨",
    tip: "💡 口訣：雙唇音 ㄅ、ㄆ、ㄇ 直接拼 ㄛ，中間不可以加 ㄨ 喔！",
    pairs: [
      // 一聲
      { id: "p_o_1", tone: 1, word: "山坡", char: "坡", zhuyin: "ㄆㄛ", confusedZhuyin: "ㄆㄨㄛ", distractors: ["ㄆㄨㄛ", "ㄅㄛ", "ㄆㄛˊ"], icon: "⛰️" },
      { id: "b_o_1", tone: 1, word: "波浪", char: "波", zhuyin: "ㄅㄛ", confusedZhuyin: "ㄅㄨㄛ", distractors: ["ㄅㄨㄛ", "ㄆㄛ", "ㄅㄛˊ"], icon: "🌊" },
      { id: "d_uo_1", tone: 1, word: "許多", char: "多", zhuyin: "ㄉㄨㄛ", confusedZhuyin: "ㄉㄛ", distractors: ["ㄉㄛ", "ㄊㄨㄛ", "ㄉㄨㄛˊ"], icon: "🔢" },
      { id: "m_o_1", tone: 1, word: "撫摸", char: "摸", zhuyin: "ㄇㄛ", confusedZhuyin: "ㄇㄨㄛ", distractors: ["ㄇㄨㄛ", "ㄇㄛˊ", "ㄅㄛ"], icon: "✋" },
      // 二聲
      { id: "p_o_2", tone: 2, word: "老婆婆", char: "婆", zhuyin: "ㄆㄛˊ", confusedZhuyin: "ㄆㄨㄛˊ", distractors: ["ㄆㄨㄛˊ", "ㄅㄛˊ", "ㄆㄛ"], icon: "👵" },
      { id: "b_o_2", tone: 2, word: "伯伯", char: "伯", zhuyin: "ㄅㄛˊ", confusedZhuyin: "ㄅㄨㄛˊ", distractors: ["ㄅㄨㄛˊ", "ㄆㄛˊ", "ㄅㄛ"], icon: "👨" },
      { id: "g_uo_2", tone: 2, word: "國家", char: "國", zhuyin: "ㄍㄨㄛˊ", confusedZhuyin: "ㄍㄛˊ", distractors: ["ㄍㄛˊ", "ㄎㄨㄛˊ", "ㄍㄨㄛ"], icon: "🇹🇼" },
      // 三聲
      { id: "d_uo_3", tone: 3, word: "花朵", char: "朵", zhuyin: "ㄉㄨㄛˇ", confusedZhuyin: "ㄉㄛˇ", distractors: ["ㄉㄛˇ", "ㄊㄨㄛˇ", "ㄉㄨㄛ"], icon: "🌸" },
      { id: "h_uo_3", tone: 3, word: "大火", char: "火", zhuyin: "ㄏㄨㄛˇ", confusedZhuyin: "ㄏㄛˇ", distractors: ["ㄏㄛˇ", "ㄏㄨㄛ", "ㄏㄨㄛˋ"], icon: "🔥" },
      { id: "g_uo_3", tone: 3, word: "水果", char: "果", zhuyin: "ㄍㄨㄛˇ", confusedZhuyin: "ㄍㄛˇ", distractors: ["ㄍㄛˇ", "ㄍㄨㄛ", "ㄍㄨㄛˋ"], icon: "🍎" },
      { id: "b_o_3", tone: 3, word: "跛腳", char: "跛", zhuyin: "ㄅㄛˇ", confusedZhuyin: "ㄅㄨㄛˇ", distractors: ["ㄅㄨㄛˇ", "ㄆㄛˇ", "ㄅㄛ"], icon: "🦵" },
      // 四聲
      { id: "p_o_4", tone: 4, word: "打破", char: "破", zhuyin: "ㄆㄛˋ", confusedZhuyin: "ㄆㄨㄛˋ", distractors: ["ㄆㄨㄛˋ", "ㄅㄛˋ", "ㄆㄛ"], icon: "💥" },
      { id: "c_uo_4", tone: 4, word: "做錯", char: "錯", zhuyin: "ㄘㄨㄛˋ", confusedZhuyin: "ㄘㄛˋ", distractors: ["ㄘㄛˋ", "ㄗㄨㄛˋ", "ㄘㄨㄛ"], icon: "❌" },
      { id: "l_uo_4", tone: 4, word: "落葉", char: "落", zhuyin: "ㄌㄨㄛˋ", confusedZhuyin: "ㄌㄛˋ", distractors: ["ㄌㄛˋ", "ㄌㄨㄛ", "ㄌㄨㄛˇ"], icon: "🍂" },
      { id: "g_uo_4", tone: 4, word: "過橋", char: "過", zhuyin: "ㄍㄨㄛˋ", confusedZhuyin: "ㄍㄛˋ", distractors: ["ㄍㄛˋ", "ㄍㄨㄛ", "ㄍㄨㄛˊ"], icon: "🌉" }
    ]
  },
  {
    id: "zhi_vs_zi",
    name: "ㄓ vs ㄗ (翹舌音 vs 平舌音)",
    desc: "舌尖捲起的翹舌音 (ㄓ/ㄔ/ㄕ) 與舌尖平貼的平舌音 (ㄗ/ㄘ/ㄙ) 核心聽辨",
    tip: "💡 口訣：ㄓ 舌尖要向上捲起，ㄗ 舌尖平平頂住牙齒後方！",
    pairs: [
      // 一聲
      { id: "zh_u_1", tone: 1, word: "小豬", char: "豬", zhuyin: "ㄓㄨ", confusedZhuyin: "ㄗㄨ", distractors: ["ㄗㄨ", "ㄔㄨ", "ㄓㄨˊ"], icon: "🐷" },
      { id: "z_u_1", tone: 1, word: "出租", char: "租", zhuyin: "ㄗㄨ", confusedZhuyin: "ㄓㄨ", distractors: ["ㄓㄨ", "ㄗㄨˊ", "ㄗㄨˋ"], icon: "🚗" },
      { id: "zh_1", tone: 1, word: "知道", char: "知", zhuyin: "ㄓ", confusedZhuyin: "ㄗ", distractors: ["ㄗ", "ㄓˊ", "ㄓˇ"], icon: "💡" },
      { id: "z_1", tone: 1, word: "資源", char: "資", zhuyin: "ㄗ", confusedZhuyin: "ㄓ", distractors: ["ㄓ", "ㄗˊ", "ㄗˇ"], icon: "💎" },
      // 二聲 (標準教育部審定音：竹 ㄓㄨˊ vs 足 ㄗㄨˊ；直 ㄓˊ；折 ㄓㄜˊ vs 責 ㄗㄜˊ)
      { id: "zh_u_2", tone: 2, word: "竹子", char: "竹", zhuyin: "ㄓㄨˊ", confusedZhuyin: "ㄗㄨˊ", distractors: ["ㄗㄨˊ", "ㄓㄨ", "ㄓㄨˋ"], icon: "🎍" },
      { id: "z_u_2", tone: 2, word: "足球", char: "足", zhuyin: "ㄗㄨˊ", confusedZhuyin: "ㄓㄨˊ", distractors: ["ㄓㄨˊ", "ㄗㄨ", "ㄗㄨˋ"], icon: "⚽" },
      { id: "zh_2", tone: 2, word: "直線", char: "直", zhuyin: "ㄓˊ", confusedZhuyin: "ㄗˊ", distractors: ["ㄗˊ", "ㄓ", "ㄓˇ"], icon: "📏" },
      { id: "zh_e_2", tone: 2, word: "折紙", char: "折", zhuyin: "ㄓㄜˊ", confusedZhuyin: "ㄗㄜˊ", distractors: ["ㄗㄜˊ", "ㄓㄜ", "ㄓㄜˋ"], icon: "📜" },
      { id: "z_e_2", tone: 2, word: "負責", char: "責", zhuyin: "ㄗㄜˊ", confusedZhuyin: "ㄓㄜˊ", distractors: ["ㄓㄜˊ", "ㄗㄜ", "ㄗㄜˋ"], icon: "💼" },
      // 三聲
      { id: "zh_3", tone: 3, word: "白紙", char: "紙", zhuyin: "ㄓˇ", confusedZhuyin: "ㄗˇ", distractors: ["ㄗˇ", "ㄓ", "ㄓˋ"], icon: "📄" },
      { id: "z_3", tone: 3, word: "紫色", char: "紫", zhuyin: "ㄗˇ", confusedZhuyin: "ㄓˇ", distractors: ["ㄓˇ", "ㄗ", "ㄗˋ"], icon: "🟣" },
      { id: "zh_u_3", tone: 3, word: "主人", char: "主", zhuyin: "ㄓㄨˇ", confusedZhuyin: "ㄗㄨˇ", distractors: ["ㄗㄨˇ", "ㄓㄨ", "ㄓㄨˋ"], icon: "👑" },
      { id: "z_u_3", tone: 3, word: "分組", char: "組", zhuyin: "ㄗㄨˇ", confusedZhuyin: "ㄓㄨˇ", distractors: ["ㄓㄨˇ", "ㄗㄨ", "ㄗㄨˋ"], icon: "👥" },
      // 四聲
      { id: "zh_ao_4", tone: 4, word: "拍照", char: "照", zhuyin: "ㄓㄠˋ", confusedZhuyin: "ㄗㄠˋ", distractors: ["ㄗㄠˋ", "ㄓㄠ", "ㄓㄠˇ"], icon: "📷" },
      { id: "z_ao_4", tone: 4, word: "製造", char: "造", zhuyin: "ㄗㄠˋ", confusedZhuyin: "ㄓㄠˋ", distractors: ["ㄓㄠˋ", "ㄗㄠ", "ㄗㄠˇ"], icon: "🏗️" },
      { id: "zh_u_4", tone: 4, word: "住家", char: "住", zhuyin: "ㄓㄨˋ", confusedZhuyin: "ㄗㄨˋ", distractors: ["ㄗㄨˋ", "ㄓㄨ", "ㄓㄨˇ"], icon: "🏠" },
      { id: "z_4", tone: 4, word: "生字", char: "字", zhuyin: "ㄗˋ", confusedZhuyin: "ㄓˋ", distractors: ["ㄓˋ", "ㄗ", "ㄗˇ"], icon: "🔤" }
    ]
  },
  {
    id: "e_vs_er",
    name: "ㄜ vs ㄦ (單韻母 vs 捲舌韻母)",
    desc: "不圓唇單韻母 ㄜ 與獨特捲舌韻母 ㄦ 之音質差異與各聲調聽辨",
    tip: "💡 口訣：ㄦ 是捲舌音，發音時舌尖要向後捲起；ㄜ 嘴巴微咧不捲舌！",
    pairs: [
      // 一聲 (標準生活詞：唱歌/哥哥/喝水，單韻母 ㄜ)
      { id: "g_e_1", tone: 1, word: "唱歌", char: "歌", zhuyin: "ㄍㄜ", confusedZhuyin: "ㄍㄦ", distractors: ["ㄍㄦ", "ㄍㄜˊ", "ㄍㄜˋ"], icon: "🎤" },
      { id: "h_e_1", tone: 1, word: "喝水", char: "喝", zhuyin: "ㄏㄜ", confusedZhuyin: "ㄏㄦ", distractors: ["ㄏㄦ", "ㄏㄜˊ", "ㄏㄜˋ"], icon: "🥛" },
      { id: "g_e_1_b", tone: 1, word: "哥哥", char: "哥", zhuyin: "ㄍㄜ", confusedZhuyin: "ㄍㄦ", distractors: ["ㄍㄦ", "ㄍㄜˊ", "ㄍㄜ"], icon: "👦" },
      // 二聲 (天鵝 ㄜˊ vs 兒童/兒子 ㄦˊ；樓閣 ㄍㄜˊ)
      { id: "e_2", tone: 2, word: "天鵝", char: "鵝", zhuyin: "ㄜˊ", confusedZhuyin: "ㄦˊ", distractors: ["ㄦˊ", "ㄜ", "ㄜˋ"], icon: "🦢" },
      { id: "er_2", tone: 2, word: "兒童", char: "兒", zhuyin: "ㄦˊ", confusedZhuyin: "ㄜˊ", distractors: ["ㄜˊ", "ㄦ", "ㄦˇ"], icon: "👶" },
      { id: "er_2_b", tone: 2, word: "兒子", char: "兒", zhuyin: "ㄦˊ", confusedZhuyin: "ㄜˊ", distractors: ["ㄜˊ", "ㄦ", "ㄦˋ"], icon: "👦" },
      { id: "g_e_2", tone: 2, word: "樓閣", char: "閣", zhuyin: "ㄍㄜˊ", confusedZhuyin: "ㄍㄦˊ", distractors: ["ㄍㄦˊ", "ㄍㄜ", "ㄍㄜˋ"], icon: "🏛️" },
      // 三聲 (耳朵 ㄦˇ vs 口渴 ㄎㄜˇ)
      { id: "er_3", tone: 3, word: "耳朵", char: "耳", zhuyin: "ㄦˇ", confusedZhuyin: "ㄜˇ", distractors: ["ㄜˇ", "ㄦ", "ㄦˊ"], icon: "👂" },
      { id: "k_e_3", tone: 3, word: "口渴", char: "渴", zhuyin: "ㄎㄜˇ", confusedZhuyin: "ㄎㄦˇ", distractors: ["ㄎㄦˇ", "ㄎㄜ", "ㄎㄜˋ"], icon: "🥤" },
      // 四聲 (肚子餓 ㄜˋ vs 數字二 ㄦˋ；快樂 ㄌㄜˋ；上課 ㄎㄜˋ)
      { id: "e_4", tone: 4, word: "肚子餓", char: "餓", zhuyin: "ㄜˋ", confusedZhuyin: "ㄦˋ", distractors: ["ㄦˋ", "ㄜ", "ㄜˊ"], icon: "🤤" },
      { id: "er_4", tone: 4, word: "數字二", char: "二", zhuyin: "ㄦˋ", confusedZhuyin: "ㄜˋ", distractors: ["ㄜˋ", "ㄦ", "ㄦˊ"], icon: "✌️" },
      { id: "l_e_4", tone: 4, word: "快樂", char: "樂", zhuyin: "ㄌㄜˋ", confusedZhuyin: "ㄌㄦˋ", distractors: ["ㄌㄦˋ", "ㄌㄜ", "ㄩㄝˋ"], icon: "🎵" },
      { id: "k_e_4", tone: 4, word: "上課", char: "課", zhuyin: "ㄎㄜˋ", confusedZhuyin: "ㄎㄦˋ", distractors: ["ㄎㄦˋ", "ㄎㄜ", "ㄎㄜˋ"], icon: "📚" }
    ]
  },
  {
    id: "eng_vs_en",
    name: "ㄥ vs ㄣ (後鼻音 vs 前鼻音)",
    desc: "後鼻音 ㄥ (鼻腔後縮共鳴) 與前鼻音 ㄣ (舌尖頂上門牙齦) 各聲調聽辨",
    tip: "💡 口訣：ㄥ 舌根後縮像大鐘嗡嗡響，ㄣ 舌尖頂上門牙齦鼻前出氣！",
    pairs: [
      // 一聲
      { id: "f_eng_1", tone: 1, word: "微風", char: "風", zhuyin: "ㄈㄥ", confusedZhuyin: "ㄈㄣ", distractors: ["ㄈㄣ", "ㄈㄥˊ", "ㄈㄤ"], icon: "💨" },
      { id: "f_en_1", tone: 1, word: "分開", char: "分", zhuyin: "ㄈㄣ", confusedZhuyin: "ㄈㄥ", distractors: ["ㄈㄥ", "ㄈㄣˊ", "ㄈㄢ"], icon: "✂️" },
      { id: "x_ing_1", tone: 1, word: "天上的星", char: "星", zhuyin: "ㄒㄧㄥ", confusedZhuyin: "ㄒㄧㄣ", distractors: ["ㄒㄧㄣ", "ㄒㄧㄥˊ", "ㄒㄧㄤ"], icon: "⭐" },
      { id: "x_in_1", tone: 1, word: "愛心", char: "心", zhuyin: "ㄒㄧㄣ", confusedZhuyin: "ㄒㄧㄥ", distractors: ["ㄒㄧㄥ", "ㄒㄧㄣˊ", "ㄒㄧㄢ"], icon: "❤️" },
      // 二聲
      { id: "h_ong_2", tone: 2, word: "紅花", char: "紅", zhuyin: "ㄏㄨㄥˊ", confusedZhuyin: "ㄏㄨㄣˊ", distractors: ["ㄏㄨㄣˊ", "ㄏㄨㄥ", "ㄏㄨㄤˊ"], icon: "🌺" },
      { id: "m_en_2", tone: 2, word: "大門", char: "門", zhuyin: "ㄇㄣˊ", confusedZhuyin: "ㄇㄥˊ", distractors: ["ㄇㄥˊ", "ㄇㄣ", "ㄇㄢˊ"], icon: "🚪" },
      // 三聲
      { id: "sh_eng_3", tone: 3, word: "省錢", char: "省", zhuyin: "ㄕㄥˇ", confusedZhuyin: "ㄕㄣˇ", distractors: ["ㄕㄣˇ", "ㄕㄥ", "ㄕㄤˇ"], icon: "💰" },
      { id: "sh_en_3", tone: 3, word: "嬸嬸", char: "嬸", zhuyin: "ㄕㄣˇ", confusedZhuyin: "ㄕㄥˇ", distractors: ["ㄕㄥˇ", "ㄕㄣ", "ㄕㄢˇ"], icon: "👵" },
      // 四聲
      { id: "zh_eng_4", tone: 4, word: "正確", char: "正", zhuyin: "ㄓㄥˋ", confusedZhuyin: "ㄓㄣˋ", distractors: ["ㄓㄣˋ", "ㄓㄥ", "ㄓㄤˋ"], icon: "🟩" },
      { id: "zh_en_4", tone: 4, word: "一陣風", char: "陣", zhuyin: "ㄓㄣˋ", confusedZhuyin: "ㄓㄥˋ", distractors: ["ㄓㄥˋ", "ㄓㄣ", "ㄓㄢˋ"], icon: "🍃" }
    ]
  },
  {
    id: "ie_vs_ei",
    name: "ㄝ vs ㄟ (單韻母/結合韻 vs 複韻母)",
    desc: "單韻母 ㄝ 扁唇不動；複韻母 ㄟ 由 e 滑向 i 拉平收窄。涵蓋 ㄧㄝ vs ㄟ、ㄒㄧㄝ vs ㄕㄟ 核心聽辨",
    tip: "💡 口訣：ㄝ 嘴巴微咧唇形保持扁平，ㄟ 有滑音最後要收成 ㄧ 的嘴型！",
    pairs: [
      // 一聲 (飛機 ㄈㄟ / 水杯 ㄅㄟ / 灰色 ㄏㄨㄟ / 貼紙 ㄊㄧㄝ)
      { id: "f_ei_1", tone: 1, word: "飛機", char: "飛", zhuyin: "ㄈㄟ", confusedZhuyin: "ㄈㄧㄝ", distractors: ["ㄈㄧㄝ", "ㄈㄟˊ", "ㄈㄟˋ"], icon: "✈️" },
      { id: "b_ei_1", tone: 1, word: "水杯", char: "杯", zhuyin: "ㄅㄟ", confusedZhuyin: "ㄅㄧㄝ", distractors: ["ㄅㄧㄝ", "ㄅㄟˊ", "ㄅㄟˋ"], icon: "🥛" },
      { id: "h_ui_1", tone: 1, word: "灰色", char: "灰", zhuyin: "ㄏㄨㄟ", confusedZhuyin: "ㄏㄨㄝ", distractors: ["ㄏㄨㄝ", "ㄏㄨㄟˊ", "ㄏㄨㄟˋ"], icon: "🐘" },
      { id: "t_ie_1", tone: 1, word: "貼紙", char: "貼", zhuyin: "ㄊㄧㄝ", confusedZhuyin: "ㄊㄨㄟ", distractors: ["ㄊㄨㄟ", "ㄊㄧㄝˇ", "ㄊㄧㄝˋ"], icon: "🏷️" },
      // 二聲 (爺爺 ㄧㄝˊ / 涼鞋 ㄒㄧㄝˊ / 梅花 ㄇㄟˊ / 誰的 ㄕㄟˊ)
      { id: "y_e_2", tone: 2, word: "爺爺", char: "爺", zhuyin: "ㄧㄝˊ", confusedZhuyin: "ㄨㄟˊ", distractors: ["ㄨㄟˊ", "ㄧㄝ", "ㄧㄝˋ"], icon: "👴" },
      { id: "x_ie_2", tone: 2, word: "涼鞋", char: "鞋", zhuyin: "ㄒㄧㄝˊ", confusedZhuyin: "ㄕㄟˊ", distractors: ["ㄕㄟˊ", "ㄒㄧㄝ", "ㄒㄧㄝˇ"], icon: "👟" },
      { id: "m_ei_2", tone: 2, word: "梅花", char: "梅", zhuyin: "ㄇㄟˊ", confusedZhuyin: "ㄇㄧㄝˊ", distractors: ["ㄇㄧㄝˊ", "ㄇㄟ", "ㄇㄟˋ"], icon: "🌸" },
      { id: "sh_ei_2", tone: 2, word: "誰的", char: "誰", zhuyin: "ㄕㄟˊ", confusedZhuyin: "ㄒㄧㄝˊ", distractors: ["ㄒㄧㄝˊ", "ㄕㄟ", "ㄕㄨㄟˇ"], icon: "❓" },
      // 三聲 (姊姊 ㄐㄧㄝˇ / 送給 ㄍㄟˇ / 喝水 ㄕㄨㄟˇ / 寫字 ㄒㄧㄝˇ)
      { id: "j_ie_3", tone: 3, word: "姊姊", char: "姊", zhuyin: "ㄐㄧㄝˇ", confusedZhuyin: "ㄍㄟˇ", distractors: ["ㄍㄟˇ", "ㄐㄧㄝ", "ㄐㄧㄝˋ"], icon: "👧" },
      { id: "g_ei_3", tone: 3, word: "送給", char: "給", zhuyin: "ㄍㄟˇ", confusedZhuyin: "ㄐㄧㄝˇ", distractors: ["ㄐㄧㄝˇ", "ㄍㄟ", "ㄍㄟˋ"], icon: "🎁" },
      { id: "sh_ui_3", tone: 3, word: "喝水", char: "水", zhuyin: "ㄕㄨㄟˇ", confusedZhuyin: "ㄒㄧㄝˇ", distractors: ["ㄒㄧㄝˇ", "ㄕㄨㄟ", "ㄕㄨㄟˋ"], icon: "💧" },
      { id: "x_ie_3", tone: 3, word: "寫字", char: "寫", zhuyin: "ㄒㄧㄝˇ", confusedZhuyin: "ㄕㄨㄟˇ", distractors: ["ㄕㄨㄟˇ", "ㄒㄧㄝ", "ㄒㄧㄝˋ"], icon: "✍️" },
      // 四聲 (樹葉 ㄧㄝˋ / 謝謝 ㄒㄧㄝˋ / 妹妹 ㄇㄟˋ / 對不起 ㄉㄨㄟˋ)
      { id: "y_e_4", tone: 4, word: "樹葉", char: "葉", zhuyin: "ㄧㄝˋ", confusedZhuyin: "ㄨㄟˋ", distractors: ["ㄨㄟˋ", "ㄧㄝ", "ㄧㄝˊ"], icon: "🍃" },
      { id: "x_ie_4", tone: 4, word: "謝謝", char: "謝", zhuyin: "ㄒㄧㄝˋ", confusedZhuyin: "ㄕㄨㄟˋ", distractors: ["ㄕㄨㄟˋ", "ㄒㄧㄝ", "ㄒㄧㄝˇ"], icon: "🙏" },
      { id: "m_ei_4", tone: 4, word: "妹妹", char: "妹", zhuyin: "ㄇㄟˋ", confusedZhuyin: "ㄇㄧㄝˋ", distractors: ["ㄇㄧㄝˋ", "ㄇㄟ", "ㄇㄟˊ"], icon: "👧" },
      { id: "d_ui_4", tone: 4, word: "對不起", char: "對", zhuyin: "ㄉㄨㄟˋ", confusedZhuyin: "ㄉㄧㄝˋ", distractors: ["ㄉㄧㄝˋ", "ㄉㄨㄟ", "ㄉㄨㄟˇ"], icon: "🤝" }
    ]
  },
  {
    id: "o_vs_ou",
    name: "ㄛ vs ㄡ (單韻母 vs 複韻母)",
    desc: "單韻母 ㄛ 圓唇口型不變；複韻母 ㄡ 由圓唇 o 滑向收口 u。包含單音節與結合韻經典聽辨",
    tip: "💡 口訣：ㄛ 發音時嘴巴保持圓形不動；ㄡ 由圓唇滑向收小圓唇 ㄨ！",
    pairs: [
      // 一聲 (波浪 ㄅㄛ / 撫摸 ㄇㄛ / 偷偷 ㄊㄡ / 小舟 ㄓㄡ)
      { id: "b_o_1_ou", tone: 1, word: "波浪", char: "波", zhuyin: "ㄅㄛ", confusedZhuyin: "ㄅㄡ", distractors: ["ㄅㄡ", "ㄅㄛˊ", "ㄅㄛˋ"], icon: "🌊" },
      { id: "m_o_1_ou", tone: 1, word: "撫摸", char: "摸", zhuyin: "ㄇㄛ", confusedZhuyin: "ㄇㄡ", distractors: ["ㄇㄡ", "ㄇㄛˊ", "ㄅㄛ"], icon: "✋" },
      { id: "t_ou_1", tone: 1, word: "偷偷", char: "偷", zhuyin: "ㄊㄡ", confusedZhuyin: "ㄊㄨㄛ", distractors: ["ㄊㄨㄛ", "ㄊㄡˊ", "ㄊㄡˋ"], icon: "🤫" },
      { id: "zh_ou_1", tone: 1, word: "小舟", char: "舟", zhuyin: "ㄓㄡ", confusedZhuyin: "ㄓㄨㄛ", distractors: ["ㄓㄨㄛ", "ㄓㄡˊ", "ㄓㄡˋ"], icon: "🛶" },
      // 二聲 (老婆婆 ㄆㄛˊ / 小猴子 ㄏㄡˊ / 頭髮 ㄊㄡˊ / 河流 ㄌㄧㄡˊ)
      { id: "p_o_2_ou", tone: 2, word: "老婆婆", char: "婆", zhuyin: "ㄆㄛˊ", confusedZhuyin: "ㄆㄡˊ", distractors: ["ㄆㄡˊ", "ㄆㄛ", "ㄆㄛˋ"], icon: "👵" },
      { id: "h_ou_2", tone: 2, word: "小猴子", char: "猴", zhuyin: "ㄏㄡˊ", confusedZhuyin: "ㄏㄨㄛˊ", distractors: ["ㄏㄨㄛˊ", "ㄏㄡ", "ㄏㄡˋ"], icon: "🐒" },
      { id: "t_ou_2", tone: 2, word: "頭髮", char: "頭", zhuyin: "ㄊㄡˊ", confusedZhuyin: "ㄊㄨㄛˊ", distractors: ["ㄊㄨㄛˊ", "ㄊㄡ", "ㄊㄡˋ"], icon: "👦" },
      { id: "l_iu_2", tone: 2, word: "河流", char: "流", zhuyin: "ㄌㄧㄡˊ", confusedZhuyin: "ㄌㄨㄛˊ", distractors: ["ㄌㄨㄛˊ", "ㄌㄧㄡ", "ㄌㄧㄡˋ"], icon: "🏞️" },
      // 三聲 (拍手 ㄕㄡˇ / 小狗 ㄍㄡˇ / 水果 ㄍㄨㄛˇ / 走路 ㄗㄡˇ)
      { id: "sh_ou_3", tone: 3, word: "拍手", char: "手", zhuyin: "ㄕㄡˇ", confusedZhuyin: "ㄕㄨㄛˇ", distractors: ["ㄕㄨㄛˇ", "ㄕㄡ", "ㄕㄡˋ"], icon: "👏" },
      { id: "g_ou_3", tone: 3, word: "小狗", char: "狗", zhuyin: "ㄍㄡˇ", confusedZhuyin: "ㄍㄨㄛˇ", distractors: ["ㄍㄨㄛˇ", "ㄍㄡ", "ㄍㄡˋ"], icon: "🐶" },
      { id: "g_uo_3_ou", tone: 3, word: "水果", char: "果", zhuyin: "ㄍㄨㄛˇ", confusedZhuyin: "ㄍㄡˇ", distractors: ["ㄍㄡˇ", "ㄍㄨㄛ", "ㄍㄨㄛˋ"], icon: "🍎" },
      { id: "z_ou_3", tone: 3, word: "走路", char: "走", zhuyin: "ㄗㄡˇ", confusedZhuyin: "ㄗㄨㄛˇ", distractors: ["ㄗㄨㄛˇ", "ㄗㄡ", "ㄗㄡˋ"], icon: "🚶" },
      // 四聲 (牛肉 ㄖㄡˋ / 後面 ㄏㄡˋ / 紅豆 ㄉㄡˋ / 做錯 ㄘㄨㄛˋ)
      { id: "r_ou_4", tone: 4, word: "牛肉", char: "肉", zhuyin: "ㄖㄡˋ", confusedZhuyin: "ㄖㄨㄛˋ", distractors: ["ㄖㄨㄛˋ", "ㄖㄡ", "ㄖㄡˇ"], icon: "🥩" },
      { id: "h_ou_4", tone: 4, word: "後面", char: "後", zhuyin: "ㄏㄡˋ", confusedZhuyin: "ㄏㄨㄛˋ", distractors: ["ㄏㄨㄛˋ", "ㄏㄡ", "ㄏㄡˊ"], icon: "🔙" },
      { id: "d_ou_4", tone: 4, word: "紅豆", char: "豆", zhuyin: "ㄉㄡˋ", confusedZhuyin: "ㄉㄨㄛˋ", distractors: ["ㄉㄨㄛˋ", "ㄉㄡ", "ㄉㄡˇ"], icon: "🫘" },
      { id: "c_uo_4_ou", tone: 4, word: "做錯", char: "錯", zhuyin: "ㄘㄨㄛˋ", confusedZhuyin: "ㄘㄡˋ", distractors: ["ㄘㄡˋ", "ㄘㄨㄛ", "ㄘㄨㄛˇ"], icon: "❌" }
    ]
  },
  {
    id: "essential_13_advanced",
    name: "生活句型與高頻易錯 13 大實戰精練",
    desc: "專門針對 13 大高頻生活造詞與句型進行聽選精辨 (包含 洞穴、優酪乳/滷肉飯、心情好嗎、長頸鹿、熱鬧、拔蘿蔔等)",
    tip: "💡 仔細聆聽生活造詞的完整語音，分辨前後鼻音、捲舌與輕聲差異！",
    pairs: [
      // 1. 洞穴: ㄉㄨㄥˋ vs ㄉㄥˋ
      { id: "dong_vs_deng", tone: 4, word: "洞穴", wordZhuyin: "ㄉㄨㄥˋ ㄒㄩㄝˋ", char: "洞", sentence: "深山裡有一個神祕的洞穴", sentenceZhuyin: "ㄕㄣ ㄕㄢ ㄌㄧˇ ㄧㄡˇ ㄧ ㄍㄜ˙ ㄕㄣˊ ㄇㄧˋ ㄉㄜ˙ ㄉㄨㄥˋ ㄒㄩㄝˋ", zhuyin: "ㄉㄨㄥˋ", confusedZhuyin: "ㄉㄥˋ", distractors: ["ㄉㄥˋ", "ㄉㄨㄥ", "ㄉㄥ"], icon: "🕳️" },
      // 2A. 優酪乳: ㄖㄨˇ vs ㄌㄨˇ
      { id: "ru_yogurt", tone: 3, word: "優酪乳", wordZhuyin: "ㄧㄡ ㄌㄨㄛˋ ㄖㄨˇ", char: "乳", sentence: "早餐喝了一瓶酸甜的優酪乳", sentenceZhuyin: "ㄗㄠˇ ㄘㄢ ㄏㄜ ㄌㄜ˙ ㄧ ㄆㄧㄥˊ ㄙㄨㄢ ㄊㄧㄢˊ ㄉㄜ˙ ㄧㄡ ㄌㄨㄛˋ ㄖㄨˇ", zhuyin: "ㄖㄨˇ", confusedZhuyin: "ㄌㄨˇ", distractors: ["ㄌㄨˇ", "ㄖㄨ", "ㄌㄨ"], icon: "🥛" },
      // 2B. 滷肉飯: ㄌㄨˇ vs ㄖㄨˇ
      { id: "lu_porkrice", tone: 3, word: "滷肉飯", wordZhuyin: "ㄌㄨˇ ㄖㄡˋ ㄈㄢˋ", char: "滷", sentence: "夜市裡有一碗香噴噴的滷肉飯", sentenceZhuyin: "ㄧㄝˋ ㄕˋ ㄌㄧˇ ㄧㄡˇ ㄧ ㄨㄢˇ ㄒㄧㄤ ㄆㄣ ㄆㄣ ㄉㄜ˙ ㄌㄨˇ ㄖㄡˋ ㄈㄢˋ", zhuyin: "ㄌㄨˇ", confusedZhuyin: "ㄖㄨˇ", distractors: ["ㄖㄨˇ", "ㄌㄨˋ", "ㄖㄨˋ"], icon: "🍚" },
      // 3A. 今天: ㄐㄧㄣ vs ㄐㄧㄥ
      { id: "jin_today", tone: 1, word: "今天", wordZhuyin: "ㄐㄧㄣ ㄊㄧㄢ", char: "今", sentence: "你今天的心情好嗎", sentenceZhuyin: "ㄋㄧˇ ㄐㄧㄣ ㄊㄧㄢ ㄉㄜ˙ ㄒㄧㄣ ㄑㄧㄥˊ ㄏㄠˇ ˙ㄇㄚ", zhuyin: "ㄐㄧㄣ", confusedZhuyin: "ㄐㄧㄥ", distractors: ["ㄐㄧㄥ", "ㄐㄧㄣˋ", "ㄐㄧㄥˋ"], icon: "📅" },
      // 3B. 心情: ㄑㄧㄥˊ vs ㄑㄧㄣˊ
      { id: "qing_mood", tone: 2, word: "心情", wordZhuyin: "ㄒㄧㄣ ㄑㄧㄥˊ", char: "情", sentence: "你今天的心情好嗎", sentenceZhuyin: "ㄋㄧˇ ㄐㄧㄣ ㄊㄧㄢ ㄉㄜ˙ ㄒㄧㄣ ㄑㄧㄥˊ ㄏㄠˇ ˙ㄇㄚ", zhuyin: "ㄑㄧㄥˊ", confusedZhuyin: "ㄑㄧㄣˊ", distractors: ["ㄑㄧㄣˊ", "ㄒㄧㄣ", "ㄒㄧㄥ"], icon: "😊" },
      // 4. 送禮物: ㄙㄨㄥˋ vs ㄙㄥˋ
      { id: "song_gift", tone: 4, word: "送禮物", wordZhuyin: "ㄙㄨㄥˋ ㄌㄧˇ ㄨˋ", char: "送", sentence: "生日時開心地送禮物給朋友", sentenceZhuyin: "ㄕㄥ ㄖˋ ㄕˊ ㄎㄞ ㄒㄧㄣ ㄉㄜ˙ ㄙㄨㄥˋ ㄌㄧˇ ㄨˋ ㄍㄟˇ ㄆㄥˊ ㄧㄡˇ", zhuyin: "ㄙㄨㄥˋ", confusedZhuyin: "ㄙㄥˋ", distractors: ["ㄙㄥˋ", "ㄙㄨㄥ", "ㄙㄥ"], icon: "🎁" },
      // 5. 孔雀: ㄎㄨㄥˇ vs ㄎㄥˇ
      { id: "kong_peacock", tone: 3, word: "孔雀", wordZhuyin: "ㄎㄨㄥˇ ㄑㄩㄝˋ", char: "孔", sentence: "動物園裡有開屏的美麗孔雀", sentenceZhuyin: "ㄉㄨㄥˋ ㄨˋ ㄩㄢˊ ㄌㄧˇ ㄧㄡˇ ㄎㄞ ㄆㄧㄥˊ ㄉㄜ˙ ㄇㄟˇ ㄌㄧˋ ㄎㄨㄥˇ ㄑㄩㄝˋ", zhuyin: "ㄎㄨㄥˇ", confusedZhuyin: "ㄎㄥˇ", distractors: ["ㄎㄥˇ", "ㄎㄨㄥ", "ㄎㄥ"], icon: "🦚" },
      // 6. 長頸鹿: ㄐㄧㄥˇ vs ㄐㄧㄣˇ
      { id: "jing_giraffe", tone: 3, word: "長頸鹿", wordZhuyin: "ㄔㄤˊ ㄐㄧㄥˇ ㄌㄨˋ", char: "頸", sentence: "草原上站著高大的長頸鹿", sentenceZhuyin: "ㄘㄠˇ ㄩㄢˊ ㄕㄤˋ ㄓㄢˋ ㄓㄜ˙ ㄍㄠ ㄉㄚˋ ㄉㄜ˙ ㄔㄤˊ ㄐㄧㄥˇ ㄌㄨˋ", zhuyin: "ㄐㄧㄥˇ", confusedZhuyin: "ㄐㄧㄣˇ", distractors: ["ㄐㄧㄣˇ", "ㄐㄧㄥ", "ㄐㄧㄣ"], icon: "🦒" },
      // 7. 蛋糕很好吃: ㄔ vs ㄘ
      { id: "chi_cake", tone: 1, word: "好吃", wordZhuyin: "ㄏㄠˇ ㄔ", char: "吃", sentence: "草莓蛋糕很好吃", sentenceZhuyin: "ㄘㄠˇ ㄇㄟˊ ㄉㄢˋ ㄍㄠ ㄏㄣˇ ㄏㄠˇ ㄔ", zhuyin: "ㄔ", confusedZhuyin: "ㄘ", distractors: ["ㄘ", "ㄔˊ", "ㄘˊ"], icon: "🍰" },
      // 8. 天氣好炎熱: ㄖㄜˋ vs ㄌㄜˋ
      { id: "re_hot", tone: 4, word: "炎熱", wordZhuyin: "ㄧㄢˊ ㄖㄜˋ", char: "熱", sentence: "夏天的大太陽天氣好炎熱", sentenceZhuyin: "ㄒㄧㄚˋ ㄊㄧㄢ ㄉㄜ˙ ㄉㄚˋ ㄊㄞˋ ㄧㄤˊ ㄊㄧㄢ ㄑㄧˋ ㄏㄠˇ ㄧㄢˊ ㄖㄜˋ", zhuyin: "ㄖㄜˋ", confusedZhuyin: "ㄌㄜˋ", distractors: ["ㄌㄜˋ", "ㄖㄜˇ", "ㄌㄜ"], icon: "☀️" },
      // 9. 氣球: ㄑㄧㄡˊ vs ㄑㄧㄛˊ
      { id: "qiu_balloon", tone: 2, word: "氣球", wordZhuyin: "ㄑㄧˋ ㄑㄧㄡˊ", char: "球", sentence: "天空中飄著彩色的氣球", sentenceZhuyin: "ㄊㄧㄢ ㄎㄨㄥ ㄓㄨㄥ ㄆㄧㄠ ㄓㄜ˙ ㄘㄞˇ ㄙㄜˋ ㄉㄜ˙ ㄑㄧˋ ㄑㄧㄡˊ", zhuyin: "ㄑㄧㄡˊ", confusedZhuyin: "ㄑㄧㄛˊ", distractors: ["ㄑㄧㄛˊ", "ㄑㄧㄡ", "ㄑㄧㄡˋ"], icon: "🎈" },
      // 10. 五隻小老鼠: ㄌㄠˇ vs ㄌㄠˊ
      { id: "lao_mouse", tone: 3, word: "老鼠", wordZhuyin: "ㄌㄠˇ ㄕㄨˇ", char: "老", sentence: "地洞裡住著五隻小老鼠", sentenceZhuyin: "ㄉㄧˋ ㄉㄨㄥˋ ㄌㄧˇ ㄓㄨˋ ㄓㄜ˙ ㄨˇ ㄓ ㄒㄧㄠˇ ㄌㄠˇ ㄕㄨˇ", zhuyin: "ㄌㄠˇ", confusedZhuyin: "ㄌㄠˊ", distractors: ["ㄌㄠˊ", "ㄌㄠ", "ㄌㄠˋ"], icon: "🐭" },
      // 11. 這張圖畫紙: ㄓㄤ vs ㄗㄤ
      { id: "zhang_paper", tone: 1, word: "圖畫紙", wordZhuyin: "ㄓㄜˋ ㄓㄤ ㄊㄨˊ ㄏㄨㄚˋ ㄓˇ", char: "張", sentence: "桌上擺著這張圖畫紙", sentenceZhuyin: "ㄓㄨㄛ ㄕㄤˋ ㄅㄞˇ ㄓㄜ˙ ㄓㄜˋ ㄓㄤ ㄊㄨˊ ㄏㄨㄚˋ ㄓˇ", zhuyin: "ㄓㄤ", confusedZhuyin: "ㄗㄤ", distractors: ["ㄗㄤ", "ㄓㄤˇ", "ㄗㄤˇ"], icon: "📄" },
      // 12. 今天夜市好熱鬧: ㄖㄜˋ ㄋㄠˋ vs ㄌㄜˋ ㄖㄠˋ、ㄌㄜˋ ㄋㄠˋ、ㄖㄜˋ ㄖㄠˋ
      { id: "renao_market", tone: 4, word: "熱鬧", wordZhuyin: "ㄖㄜˋ ㄋㄠˋ", char: "熱鬧", sentence: "今天夜市好熱鬧", sentenceZhuyin: "ㄐㄧㄣ ㄊㄧㄢ ㄧㄝˋ ㄕˋ ㄏㄠˇ ㄖㄜˋ ㄋㄠˋ", zhuyin: "ㄖㄜˋ ㄋㄠˋ", confusedZhuyin: "ㄌㄜˋ ㄋㄠˋ", distractors: ["ㄌㄜˋ ㄖㄠˋ", "ㄌㄜˋ ㄋㄠˋ", "ㄖㄜˋ ㄖㄠˋ"], icon: "🏮" },
      // 13. 田裡拔蘿蔔: ㄌㄨㄛˊ ㄅㄛ˙ vs ㄌㄨㄛˊ ㄅㄛˊ、ㄌㄨㄛˊ ㄅㄛˋ、ㄌㄨㄛˊ ㄅㄛ˙
      { id: "luobo_field", tone: 0, word: "蘿蔔", wordZhuyin: "ㄌㄨㄛˊ ㄅㄛ˙", char: "蘿蔔", sentence: "田裡拔蘿蔔", sentenceZhuyin: "ㄊㄧㄢˊ ㄌㄧˇ ㄅㄚˊ ㄌㄨㄛˊ ㄅㄛ˙", zhuyin: "ㄌㄨㄛˊ ㄅㄛ˙", confusedZhuyin: "ㄌㄨㄛˊ ㄅㄛˊ", distractors: ["ㄌㄨㄛˊ ㄅㄛˊ", "ㄌㄨㄛˊ ㄅㄛˋ", "ㄌㄨㄛˊ ㄅㄛ"], icon: "🥕" }
    ]
  }
];

// 常用易錯字詞之注音映射表 (供全聲調易錯生字複習全面以注音顯示)
const COMMON_WORD_ZHUYIN_MAP = {
  "山坡": "ㄕㄢ ㄆㄛ", "波浪": "ㄅㄛ ㄌㄤˋ", "許多": "ㄒㄩˇ ㄉㄨㄛ", "撫摸": "ㄈㄨˇ ㄇㄛ",
  "老婆婆": "ㄌㄠˇ ㄆㄛˊ ㄆㄛ˙", "伯伯": "ㄅㄛˊ ㄅㄛ˙", "國家": "ㄍㄨㄛˊ ㄐㄧㄚ",
  "花朵": "ㄏㄨㄚ ㄉㄨㄛˇ", "大火": "ㄉㄚˋ ㄏㄨㄛˇ", "水果": "ㄕㄨㄟˇ ㄍㄨㄛˇ", "跛腳": "ㄅㄛˇ ㄐㄧㄠˇ",
  "打破": "ㄉㄚˇ ㄆㄛˋ", "做錯": "ㄗㄨㄛˋ ㄘㄨㄛˋ", "落葉": "ㄌㄨㄛˋ ㄧㄝˋ", "過橋": "ㄍㄨㄛˋ ㄑㄧㄠˊ",
  "小豬": "ㄒㄧㄠˇ ㄓㄨ", "出租": "ㄔㄨ ㄗㄨ", "知道": "ㄓ ㄉㄠˋ", "資源": "ㄗ ㄩㄢˊ",
  "竹子": "ㄓㄨˊ ˙ㄗ", "足球": "ㄗㄨˊ ㄑㄧㄡˊ", "直線": "ㄓˊ ㄒㄧㄢˋ", "折紙": "ㄓㄜˊ ㄓˇ", "負責": "ㄈㄨˋ ㄗㄜˊ",
  "白紙": "ㄅㄞˊ ㄓˇ", "紫色": "ㄗˇ ㄙㄜˋ", "主人": "ㄓㄨˇ ㄖㄣˊ", "分組": "ㄈㄣ ㄗㄨˇ",
  "拍照": "ㄆㄞ ㄓㄠˋ", "製造": "ㄓˋ ㄗㄠˋ", "住家": "ㄓㄨˋ ㄐㄧㄚ", "生字": "ㄕㄥ ㄗˋ",
  "唱歌": "ㄔㄤˋ ㄍㄜ", "喝水": "ㄏㄜ ㄕㄨㄟˇ", "哥哥": "ㄍㄜ ˙ㄍㄜ",
  "天鵝": "ㄊㄧㄢ ㄜˊ", "兒童": "ㄦˊ ㄊㄨㄥˊ", "兒子": "ㄦˊ ˙ㄗ", "樓閣": "ㄌㄡˊ ㄍㄜˊ",
  "耳朵": "ㄦˇ ˙ㄉㄨㄛ", "口渴": "ㄎㄡˇ ㄎㄜˇ",
  "肚子餓": "ㄉㄨˋ ˙ㄗ ㄜˋ", "數字二": "ㄕㄨˋ ㄗˋ ㄦˋ", "快樂": "ㄎㄨㄞˋ ㄌㄜˋ", "上課": "ㄕㄤˋ ㄎㄜˋ",
  "微風": "ㄨㄟˊ ㄈㄥ", "分開": "ㄈㄣ ㄎㄞ", "天上的星": "ㄒㄧㄥ ˙ㄒㄧㄥ", "愛心": "ㄞˋ ㄒㄧㄣ",
  "紅花": "ㄏㄨㄥˊ ㄏㄨㄚ", "大門": "ㄉㄚˋ ㄇㄣˊ", "省錢": "ㄕㄥˇ ㄑㄧㄢˊ", "嬸嬸": "ㄕㄣˇ ˙ㄕㄣ",
  "正確": "ㄓㄥˋ ㄑㄩㄝˋ", "一陣風": "ㄧ ㄓㄣˋ ㄈㄥ",
  "飛機": "ㄈㄟ ㄐㄧ", "水杯": "ㄕㄨㄟˇ ㄅㄟ", "灰色": "ㄏㄨㄟ ㄙㄜˋ", "貼紙": "ㄊㄧㄝ ㄓˇ",
  "爺爺": "ㄧㄝˊ ˙ㄧㄝ", "涼鞋": "ㄌㄧㄤˊ ㄒㄧㄝˊ", "梅花": "ㄇㄟˊ ㄏㄨㄚ", "誰的": "ㄕㄟˊ ㄉㄜ˙",
  "姊姊": "ㄐㄧㄝˇ ˙ㄐㄧㄝ", "送給": "ㄙㄨㄥˋ ㄍㄟˇ", "寫字": "ㄒㄧㄝˇ ㄗˋ",
  "樹葉": "ㄕㄨˋ ㄧㄝˋ", "謝謝": "ㄒㄧㄝˋ ˙ㄒㄧㄝ", "妹妹": "ㄇㄟˋ ˙ㄇㄟ", "對不起": "ㄉㄨㄟˋ ㄅㄨˋ ㄑㄧˇ",
  "偷偷": "ㄊㄡ ㄊㄡ", "小舟": "ㄒㄧㄠˇ ㄓㄡ", "小猴子": "ㄒㄧㄠˇ ㄏㄡˊ ˙ㄗ", "頭髮": "ㄊㄡˊ ㄈㄚˇ", "河流": "ㄏㄜˊ ㄌㄧㄡˊ",
  "拍手": "ㄆㄞ ㄕㄡˇ", "小狗": "ㄒㄧㄠˇ ㄍㄡˇ", "走路": "ㄗㄡˇ ㄌㄨˋ",
  "牛肉": "ㄋㄧㄡˊ ㄖㄡˋ", "後面": "ㄏㄡˋ ㄇㄧㄢˋ", "紅豆": "ㄏㄨㄥˊ ㄉㄡˋ",
  "洞穴": "ㄉㄨㄥˋ ㄒㄩㄝˋ", "優酪乳": "ㄧㄡ ㄌㄨㄛˋ ㄖㄨˇ", "滷肉飯": "ㄌㄨˇ ㄖㄡˋ ㄈㄢˋ",
  "今天": "ㄐㄧㄣ ㄊㄧㄢ", "心情": "ㄒㄧㄣ ㄑㄧㄥˊ", "送禮物": "ㄙㄨㄥˋ ㄌㄧˇ ㄨˋ", "孔雀": "ㄎㄨㄥˇ ㄑㄩㄝˋ",
  "長頸鹿": "ㄔㄤˊ ㄐㄧㄥˇ ㄌㄨˋ", "好吃": "ㄏㄠˇ ㄔ", "草莓蛋糕很好吃": "ㄏㄠˇ ㄔ", "炎熱": "ㄧㄢˊ ㄖㄜˋ",
  "氣球": "ㄑㄧˋ ㄑㄧㄡˊ", "老鼠": "ㄌㄠˇ ㄕㄨˇ", "圖畫紙": "ㄊㄨˊ ㄏㄨㄚˋ ㄓˇ",
  "熱鬧": "ㄖㄜˋ ㄋㄠˋ", "蘿蔔": "ㄌㄨㄛˊ ㄅㄛ˙"
};

function getConfusionPairGroups() {
  CONFUSION_PAIR_GROUPS.forEach(g => {
    if (Array.isArray(g.pairs)) {
      g.pairs.forEach(p => {
        if (!p.wordZhuyin && COMMON_WORD_ZHUYIN_MAP[p.word]) {
          p.wordZhuyin = COMMON_WORD_ZHUYIN_MAP[p.word];
        }
      });
    }
  });
  return CONFUSION_PAIR_GROUPS;
}

// ============================================================================
// 星際火箭探險：宇宙天體與星系庫 (Cosmic Planetary & Galaxy Catalog)
// 確保每一次點火升空探索都有豐富變化 (發現特色行星或穿越壯麗星系)
// ============================================================================
const COSMIC_PLANETS = [
  { name: "水晶冰晶星", icon: "🪐💎", badge: "冰晶系", color: "#38BDF8", desc: "表面覆蓋千年純淨冰晶，在恆星照耀下折射出七彩霓光！" },
  { name: "翡翠音律星", icon: "🪐🎵", badge: "音律系", color: "#34D399", desc: "青翠茂盛的神秘行星，微風吹過宛如悅耳注音歌聲在迴盪！" },
  { name: "熾熱熔岩星", icon: "🪐🔥", badge: "能量系", color: "#F87171", desc: "核心流淌金色岩漿，蘊藏著源源不絕的強大星際熱能！" },
  { name: "彩虹星環星", icon: "🪐🌈", badge: "幻彩系", color: "#FB7185", desc: "環繞著七彩同心星環，每道光芒都蘊含宇宙的智慧！" },
  { name: "黃金閃耀星", icon: "🪐✨", badge: "光輝系", color: "#FBBF24", desc: "閃耀著燦爛純金光芒，為整片暗黑宇宙帶來溫暖光明！" },
  { name: "深藍蔚藍星", icon: "🪐🌊", badge: "海洋系", color: "#60A5FA", desc: "整顆星球是溫暖清澈的海洋，生活著友善的星際海豚！" },
  { name: "粉櫻星雲星", icon: "🪐🌸", badge: "星塵系", color: "#F472B6", desc: "漂浮在粉紅星雲之中的夢幻星球，星塵如花瓣般飄逸浪漫！" },
  { name: "雷霆電磁星", icon: "🪐⚡", badge: "等離子", color: "#A78BFA", desc: "高空躍動著藍白色離子電漿，展現大自然震撼的生命力！" },
  { name: "棉花糖氣態星", icon: "🪐🍭", badge: "氣態系", color: "#F43F5E", desc: "由柔和粉彩雲霧構成的巨型行星，蓬鬆夢幻！" },
  { name: "遠古神殿星", icon: "🪐🏛️", badge: "文明系", color: "#E879F9", desc: "遍布億萬年前星際先驅的神殿，記載著古老語文與智慧！" },
  { name: "超光速驛站星", icon: "🪐🛸", badge: "科技系", color: "#2DD4BF", desc: "各星系旅人匯聚的宇宙補給站，充滿熱鬧的星際友誼！" },
  { name: "紫晶靈感星", icon: "🪐🔮", badge: "靈感系", color: "#C084FC", desc: "散發著靜謐的紫羅蘭幽光，源源不絕湧現學習智慧！" },
  { name: "反重力奇樹星", icon: "🪐🌳", badge: "奇幻系", color: "#4ADE80", desc: "生長著漂浮在空中的神木巨樹，果實如小星星般發光！" },
  { name: "純鑽星核星", icon: "🪐👑", badge: "晶體系", color: "#FDE047", desc: "經受千億度高溫淬鍊的高密度鑽石行星，堅固璀璨！" },
  { name: "極光緞帶星", icon: "🪐🌌", badge: "極光系", color: "#22D3EE", desc: "赤道上空飄舞著絢爛的翠綠與洋紅極光緞帶，如夢似幻！" },
  { name: "雙子恆星伴星", icon: "🪐☀️", badge: "天體系", color: "#F59E0B", desc: "由兩顆金色太陽共同照耀，享有永不落幕的光明！" },
  { name: "星際微光星", icon: "🪐🧚", badge: "精靈系", color: "#A5B4FC", desc: "居住著友善的星塵微光小精靈，指引宇宙探險家前進！" },
  { name: "磁力守護星", icon: "🪐🛡️", badge: "磁場系", color: "#38BDF8", desc: "擁有強大的全息能量護盾，守護著這片星域的和平！" },
  { name: "赤紅寶石星", icon: "🪐💎", badge: "寶石系", color: "#EF4444", desc: "地貌由火紅寶石結晶堆疊而成，折射出璀璨壯麗光斑！" },
  { name: "晨曦和平星", icon: "🪐🕊️", badge: "生態系", color: "#86EFAC", desc: "全宇宙最寧靜的生態綠洲，象徵學童探索注音的美好初心！" }
];

const COSMIC_GALAXIES = [
  { name: "獵戶座旋臂星系", icon: "🌌🌟", badge: "旋臂星系", color: "#818CF8", desc: "穿透千萬光年星雲迷霧，成功開闢獵戶座全新文明航道！" },
  { name: "仙女座幻彩星雲", icon: "🌌🔮", badge: "巨型星系", color: "#C084FC", desc: "超空間曲速躍遷！抵達千億顆恆星交相輝映的仙女座大星系！" },
  { name: "銀河璀璨核心", icon: "🌌💫", badge: "銀河核心", color: "#FBBF24", desc: "艦隊突破重力透鏡，抵達銀河系最神聖明亮的超光速核心！" },
  { name: "雙子超新星系", icon: "🌌✨", badge: "聯星系統", color: "#38BDF8", desc: "雙子恆星優雅公轉，綻放出照亮整個宇宙象限的璀璨光環！" },
  { name: "鳳凰座星際長城", icon: "🌌🦅", badge: "宇宙巨構", color: "#FB923C", desc: "跨越億萬光年維度！橫越全宇宙最宏偉的星際長城！" },
  { name: "天鵝座迷霧星域", icon: "🌌🦢", badge: "深空星域", color: "#2DD4BF", desc: "在絢麗的藍白星雲深處，點亮全宇宙最美麗的注音星圖！" },
  { name: "飛馬座超空間星門", icon: "🌌🚀", badge: "曲速航道", color: "#F43F5E", desc: "曲速星門成功激活！火箭艦隊實現劃時代的星系大跨越！" },
  { name: "彩虹星辰長廊", icon: "🌌🌈", badge: "光譜長廊", color: "#EC4899", desc: "由百萬顆不同光譜恆星排列而成的壯麗宇宙奇觀！" },
  { name: "造父變星律動旋渦", icon: "🌌🌀", badge: "律動星系", color: "#A855F7", desc: "如同宇宙心跳般有節奏閃耀的旋渦星系，星際能量澎湃！" },
  { name: "千星注音大聯盟", icon: "🌌🪐", badge: "文明聯盟", color: "#10B981", desc: "掌握所有注音智慧的星球共同組成的宇宙終極和平聯盟！" }
];

function getCosmicPlanets() {
  return COSMIC_PLANETS;
}

function getCosmicGalaxies() {
  return COSMIC_GALAXIES;
}
