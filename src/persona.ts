/** 古今名人气质映像（娱乐化类比，非史实心理诊断） */

export type PersonaMatch = {
  /** 主展示名（中文） */
  name: string
  /** 时代 / 身份一行 */
  tagline: string
  /** 印鉴单字（无肖像时用） */
  sealChar: string
  /** 与气质相应的天赋关键词 */
  talents: string[]
  /** 一句映像 */
  mirrorLine: string
}

const FALLBACK: PersonaMatch = {
  name: "司马迁",
  tagline: "西汉 · 史家",
  sealChar: "迁",
  talents: ["博观约取", "以笔立心", "穿越表象求真"],
  mirrorLine: "在纷繁叙事里，你仍能为自己立一根内在的轴。",
}

const MAP: Record<string, PersonaMatch> = {
  INTJ: {
    name: "诸葛亮",
    tagline: "三国 · 政治家·军事家",
    sealChar: "亮",
    talents: ["远略布局", "体系建构", "静水深流的影响"],
    mirrorLine: "你习惯先看终局，再把人心与事势一点点摆到该在的位置。",
  },
  INTP: {
    name: "庄子",
    tagline: "战国 · 哲人",
    sealChar: "周",
    talents: ["拆解成见", "寓言取象", "守拙观化"],
    mirrorLine: "世界对你像可反复试错的模型，真理常藏在悖论与比喻之间。",
  },
  ENTJ: {
    name: "嬴政",
    tagline: "秦 · 政治家",
    sealChar: "政",
    talents: ["目标驱动", "建制整合", "决断推进"],
    mirrorLine: "你把混沌压成秩序，以事功衡量进展，也承担相应的孤独重量。",
  },
  ENTP: {
    name: "苏轼",
    tagline: "北宋 · 文学家",
    sealChar: "轼",
    talents: ["多域贯通", "机锋应变", "以文化人"],
    mirrorLine: "你以辩才与幽默开路，在限制里仍能翻出新局。",
  },
  INFJ: {
    name: "王阳明",
    tagline: "明 · 思想家",
    sealChar: "仁",
    talents: ["心学自觉", "润物引导", "知行合一的感召"],
    mirrorLine: "你常在别人开口前，已感到局势里「应当」的那口气。",
  },
  INFP: {
    name: "陶渊明",
    tagline: "东晋 · 诗人",
    sealChar: "潜",
    talents: ["守志归真", "感时写景", "内在尺度清晰"],
    mirrorLine: "你宁愿小径独往，也不愿把灵魂典当给不认同的喧嚣。",
  },
  ENFJ: {
    name: "孔子",
    tagline: "春秋 · 教育家",
    sealChar: "孔",
    talents: ["分层施教", "仁义示范", "凝聚群体"],
    mirrorLine: "你以价值为旗，让人在关系里愿意变得更好一点。",
  },
  ENFP: {
    name: "李白",
    tagline: "唐 · 诗人",
    sealChar: "白",
    talents: ["即兴挥洒", "意象跳跃", "感染鼓舞"],
    mirrorLine: "你一来，空气里就有了故事与可能性的酒味。",
  },
  ISTJ: {
    name: "曾国藩",
    tagline: "清 · 政治家",
    sealChar: "藩",
    talents: ["日课克己", "务实闭环", "值得信赖"],
    mirrorLine: "你相信笨功夫与常课，时间站在你这一边。",
  },
  ISFJ: {
    name: "李时珍",
    tagline: "明 · 医药学家",
    sealChar: "珍",
    talents: ["细密考证", "照护具体的人", "耐力深耕"],
    mirrorLine: "细节与善意在你手里，会变成别人摸得着的安全感。",
  },
  ESTJ: {
    name: "包拯",
    tagline: "北宋 · 名臣",
    sealChar: "拯",
    talents: ["明刑弼教", "效率执行", "树立规矩"],
    mirrorLine: "你以法度与结果服人，讨厌空转与含糊。",
  },
  ESFJ: {
    name: "宋庆龄",
    tagline: "近现代 · 社会活动家",
    sealChar: "龄",
    talents: ["关怀调度", "场面圆融", "价值感召"],
    mirrorLine: "你记得场面，也记得谁今天需要被多看见一眼。",
  },
  ISTP: {
    name: "李冰",
    tagline: "战国 · 水利家",
    sealChar: "冰",
    talents: ["实地巧作", "简练出手", "危机处变"],
    mirrorLine: "你话不多，但关键处一刀下去，问题就泄了气。",
  },
  ISFP: {
    name: "王维",
    tagline: "唐 · 诗人·画家",
    sealChar: "维",
    talents: ["声色意境", "当下审美", "温柔自守"],
    mirrorLine: "你把情绪译成可居的景，留白也是你的语言。",
  },
  ESTP: {
    name: "辛弃疾",
    tagline: "南宋 · 词人·将领",
    sealChar: "疾",
    talents: ["胆气破局", "快打快收", "现场掌控"],
    mirrorLine: "你信任身体与直觉，战场与酒桌都能成为你的节奏。",
  },
  ESFP: {
    name: "杨丽萍",
    tagline: "当代 · 舞蹈家",
    sealChar: "雀",
    talents: ["身体叙事", "气氛点亮", "在场感染力"],
    mirrorLine: "你让「此刻」值得被记住，美与热闹都是你的道场。",
  },
}

export function getPersonaMatch(mbti: string): PersonaMatch {
  return MAP[mbti] ?? FALLBACK
}
