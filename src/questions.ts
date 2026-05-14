/**
 * 20 题，按题号循环四轴：EI → SN → TF → JP（各 5 题）
 * 选 A 计向首字母（E/S/T/J），选 B 计向次字母
 */

export type SoulAxis = "EI" | "SN" | "TF" | "JP"

export type SoulQuestion = {
  id: number
  axis: SoulAxis
  /** 儒释道 / 命理为叙事意象，非宗教或迷信断言 */
  tag: string
  prompt: string
  optionA: string
  optionB: string
}

export const SOUL_QUESTIONS: SoulQuestion[] = [
  {
    id: 1,
    axis: "EI",
    tag: "儒 · 入世",
    prompt: "面对一场需要表态的公共讨论，你更倾向？",
    optionA: "先发声、参与交锋，在互动里把问题推向前",
    optionB: "先听完、写下来，在独处时把条理梳清再说",
  },
  {
    id: 2,
    axis: "SN",
    tag: "格物",
    prompt: "学习一样新事物时，什么让你更安心？",
    optionA: "步骤、范例、可复现的细节与手感",
    optionB: "意象、整体结构、它与其他事物的隐喻关系",
  },
  {
    id: 3,
    axis: "TF",
    tag: "义理",
    prompt: "朋友请你评理，双方都有委屈，你更先问？",
    optionA: "事实边界与责任归属：谁承诺了什么",
    optionB: "情绪与处境：谁先受伤、需要什么被看见",
  },
  {
    id: 4,
    axis: "JP",
    tag: "礼 · 序",
    prompt: "出门远行前，你更习惯？",
    optionA: "清单、时间点、预案列好才踏实",
    optionB: "大方向定了，细节路上再随缘调整",
  },
  {
    id: 5,
    axis: "EI",
    tag: "道 · 守中",
    prompt: "周末真正放松时，你更常？",
    optionA: "见人、走动、聊天或一起做事",
    optionB: "独处、阅读、散步或只做一件慢事",
  },
  {
    id: 6,
    axis: "SN",
    tag: "观象",
    prompt: "读一首诗或看一幅画，你更容易？",
    optionA: "注意字句、技法、具体物象",
    optionB: "被气韵带走，联想到自己的人生画面",
  },
  {
    id: 7,
    axis: "TF",
    tag: "慈悲",
    prompt: "团队决策会伤害少数人利益时，你更难受的是？",
    optionA: "规则被破坏：先例一开，后患难收",
    optionB: "具体的人被落下：想为他们争取缓冲",
  },
  {
    id: 8,
    axis: "JP",
    tag: "无为",
    prompt: "工作被打断时，你更自然？",
    optionA: "尽快回到原计划轨道",
    optionB: "顺势看看新插曲里有没有养分",
  },
  {
    id: 9,
    axis: "EI",
    tag: "紫薇 · 迁移",
    prompt: "陌生城市里待三天，你更想？",
    optionA: "多打卡、多交流，让地方与自己发生关系",
    optionB: "少而深，一两处待久一点，向内沉淀",
  },
  {
    id: 10,
    axis: "SN",
    tag: "星盘 · 土象感",
    prompt: "别人讲一个很玄的概念，你会？",
    optionA: "请对方举具体例子或操作定义",
    optionB: "先感受其比喻是否在经验里说得通",
  },
  {
    id: 11,
    axis: "TF",
    tag: "仁",
    prompt: "指出别人的错误时，你更在意？",
    optionA: "清晰、准确，避免误会更重要",
    optionB: "体面、温度，让对方还能改得下去",
  },
  {
    id: 12,
    axis: "JP",
    tag: "随缘",
    prompt: "截止日期前一周，你通常？",
    optionA: "按阶段切好，每天推进一点",
    optionB: "心里有底，常在灵感来时集中爆发",
  },
  {
    id: 13,
    axis: "EI",
    tag: "释 · 众缘",
    prompt: "情绪低落时，更有效的解药往往是？",
    optionA: "找信任的人说出来，被听见",
    optionB: "自己静坐、书写或与自然相处",
  },
  {
    id: 14,
    axis: "SN",
    tag: "取象",
    prompt: "回忆童年，你更常想起？",
    optionA: "具体场景、气味、某句话、某个物件",
    optionB: "一种氛围、一种长期的心情色调",
  },
  {
    id: 15,
    axis: "TF",
    tag: "理",
    prompt: "做慈善或助人时，你更认同？",
    optionA: "效率与透明：钱与力要到该到的地方",
    optionB: "在场与陪伴：有时被看见比方案重要",
  },
  {
    id: 16,
    axis: "JP",
    tag: "立纲",
    prompt: "家里收纳，你更接受？",
    optionA: "每类东西有固定位置",
    optionB: "大致分区即可，找得到就行",
  },
  {
    id: 17,
    axis: "EI",
    tag: "阳动 / 阴静",
    prompt: "开会脑暴时，你更常？",
    optionA: "边说边想，话赶话里冒出点子",
    optionB: "先听全，末尾几句往往才是你真正的刀",
  },
  {
    id: 18,
    axis: "SN",
    tag: "八字 · 取格（意象）",
    prompt: "描述自己时，你更顺口？",
    optionA: "职业、技能、做过的事",
    optionB: "想成为的人、在乎的价值与故事",
  },
  {
    id: 19,
    axis: "TF",
    tag: "礼 / 情",
    prompt: "亲密的人迟到很久，你更先？",
    optionA: "问清原因与是否可补救",
    optionB: "先确认对方是否平安、累了没有",
  },
  {
    id: 20,
    axis: "JP",
    tag: "身宫 · 福德（意象）",
    prompt: "对「计划赶不上变化」，你心里更贴近？",
    optionA: "所以要计划得更弹性、更密",
    optionB: "所以要心更松，留白给无常",
  },
]
