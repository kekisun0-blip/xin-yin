import type { MetaphorPack } from "./engine"
import type { SoulAxis } from "./questions"

export type KeirseyQuad = "nt" | "nf" | "sj" | "sp"

/** 凯尔西气质四分（心理模型，非临床分型） */
export function keirseyQuad(mbti: string): KeirseyQuad {
  if (mbti.length !== 4) return "nt"
  const s = mbti[1] === "S"
  const j = mbti[3] === "J"
  const t = mbti[2] === "T"
  if (s && j) return "sj"
  if (s && !j) return "sp"
  if (!s && t) return "nt"
  return "nf"
}

export type TensionRow = {
  key: string
  title: string
  poleA: string
  poleB: string
  /** 0–100，越大越靠近 poleB */
  towardB: number
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n))
}

/** 四轴张力条：由答题累计分映射到双极滑杆 */
export function axisCountsToTension(counts: Record<SoulAxis, number>): TensionRow[] {
  const t = (v: number) => clamp(Math.round(50 + v * 8), 6, 94)
  return [
    {
      key: "ei",
      title: "能量与场域",
      poleA: "内照守神",
      poleB: "外烁入世",
      towardB: t(counts.EI),
    },
    {
      key: "sn",
      title: "认知取径",
      poleA: "格物循实",
      poleB: "悬象通意",
      towardB: t(counts.SN),
    },
    {
      key: "tf",
      title: "裁断依据",
      poleA: "人情体察",
      poleB: "义理裁断",
      towardB: t(counts.TF),
    },
    {
      key: "jp",
      title: "时序态度",
      poleA: "顺势通变",
      poleB: "礼序持常",
      towardB: t(counts.JP),
    },
  ]
}

type QuadCopy = {
  label: string
  blurb: string
  ruMore: string
  shiMore: string
  daoMore: string
  baziMore: string
  ziweiMore: string
  astroMore: string
  flow: string
  shadow: string
  growth: string[]
  relations: { role: string; tip: string }[]
}

const QUAD_COPY: Record<KeirseyQuad, QuadCopy> = {
  nt: {
    label: "理性探求 · 气质底色",
    blurb:
      "你习惯以结构与因果理解世界：先问「是否成立」，再问「是否值得」。在团队中常扮演「把模糊变清晰」的人，但也要留心把温度算进方程里。",
    ruMore:
      "在儒家的脉络里，你近于「博学于文」一路：重学、重辨、重条贯。进阶功课是「约之以礼」——把锋利收进可协作的边界，让共识跟得上你的推理速度。",
    shiMore:
      "从佛学视角，你易起「法执」：把模型当真、把批判当护生。可练习「随观」：看见念头如何贴标签，再在呼吸间隙松半寸，让直觉与数据轮流坐庄。",
    daoMore:
      "道家会提醒你「知止不殆」：系统之美在于留白。刻意安排「无产出时段」，让混沌自己重组，往往比再加一层控制更省力。",
    baziMore:
      "若以五行作心理隐喻：偏金水者喜清、喜透、厌浊。你的「用神」常在「润下」——深流、冷澈、一击即中；忌的是火炎土燥式的长期空转与多头拉扯。",
    ziweiMore:
      "若以斗数宫位作观照：官禄、迁移、福德常联动——事业野心与内在安顿要同时记账。身强时宜借「化禄」思路：把赢面分一点给身边人，运才转得动。",
    astroMore:
      "若以四元素作情绪天气：土风型宜补水象仪式——浸泡、音乐、身体接触；火过旺时，用「月相」式节奏：新月定意图，满月做复盘，朔望之间留余地。",
    flow:
      "你的心流常出现在：问题被正确命名之后、白板被擦干净之前。给自己「单线程深度块」与「短促交付点」交替的节奏，最能养住专注力。",
    shadow:
      "压力下的暗面：易把亲近者当论证对象、把情绪当噪声过滤。当身体先于语言疲惫时，往往不是事情太难，而是「被理解」的账户透支了。",
    growth: [
      "每周一次：把结论写成「三句话给外行版」。",
      "重要关系里先复述对方论点，再补你的补丁。",
      "用身体指标（睡眠、肩颈）当早期预警，别等崩盘才休息。",
    ],
    relations: [
      { role: "对上（师长/甲方）", tip: "给方案带「风险与取舍」一页，比只给最优解更被信任。" },
      { role: "对下（伙伴/子女）", tip: "把「为什么」拆成可跟上的台阶，表扬具体行为而非抽象聪明。" },
      { role: "平辈/伴侣", tip: "约定「情绪先接住十分钟，再进入解决模式」。" },
    ],
  },
  nf: {
    label: "理想调和 · 气质底色",
    blurb:
      "你以意义与感受为罗盘：先问「对不对得起心」，再问「做不做得成」。擅长点燃他人，也要练习把火焰收进灯罩，免得自己先燃尽。",
    ruMore:
      "儒家会说你近「仁」与「诗教」：温柔敦厚。深读一层：仁不是无限退让，而是「推己及人」有边界——把你的标准说清楚，别人才知道如何不伤你。",
    shiMore:
      "佛学提醒你「慈悲必伴智慧」：悲悯若缺了清明，易成黏着。可修「自他交换」的轻量版：吸气承接对方苦处，呼气把自己的资源匀一点出去，但不透支。",
    daoMore:
      "道家给你「柔弱胜刚强」的实践：以退为进不是怂，是水绕石。把「说不」练成一种护生，比硬扛更符合你的本性。",
    baziMore:
      "五行隐喻里偏木火者易「生发太过」：创意与情绪同涨同落。宜借一点金气：截断、收束、可度量的里程碑，让才华落地为作品而非灰烬。",
    ziweiMore:
      "斗数意象里福德、夫妻、交友常牵动你的自我价值感。练习「身宫归位」：先把自己当贵人，再等人来对齐，可减少在关系里的隐性讨赏。",
    astroMore:
      "元素天气偏水火时：灵感高、起伏也大。用「土的日常」锚定——固定起床、固定散步、固定书写三行日记，比追更多灵感更能稳住你。",
    flow:
      "心流常在：被真正理解的时刻、故事线扣上的瞬间、帮助他人看见自己的那一瞥。把这类时刻记下来，是你对抗虚无的私人经文。",
    shadow:
      "暗面：过度解读、把沉默当拒绝、把理想当鞭子。当胃与睡眠报警时，往往是「意义感」在逼你超载。",
    growth: [
      "把「我在乎」写成可执行的三条边界，贴在工作区。",
      "每周留半日不做「有意义的事」，练习存在本身即足够。",
      "找一个敢说真话的「镜子朋友」，定期对照你的自我叙事。",
    ],
    relations: [
      { role: "对上", tip: "先对齐价值与画面，再谈方法与资源，顺序反了你会内伤。" },
      { role: "对下", tip: "示范脆弱比示范完美更能带人；但脆弱要有容器（时间/场合）。" },
      { role: "平辈/伴侣", tip: "用「我需要」替代「你应该懂」，冲突量会明显下降。" },
    ],
  },
  sj: {
    label: "秩序守护 · 气质底色",
    blurb:
      "你以可靠与清晰安身：先问「承诺是什么」，再问「心情好不好」。团队里常是「定海神针」，也要允许自己偶尔不按表走，防僵化。",
    ruMore:
      "儒家「敬事而信」与你天然合拍。深读：信不仅是对人，也是对己——说到做不到时，优先修小诺而非堆大诺，信用账户才滚得动。",
    shiMore:
      "佛学里「戒」不是绳子，是护栏。你可练习「戒急躁」：在回复前三次呼吸，看见「我必须马上解决」背后的恐惧。",
    daoMore:
      "道家讲「治大国若烹小鲜」：少翻动。对你而言，少翻动的是节奏与承诺；可翻动的是方法与工具——别把自己和流程绑死。",
    baziMore:
      "五行偏土金者重信、重实。忌「土重金埋」：过度控制导致生机不起。适时借木气疏土：新尝试小步、低成本试错，让系统透气。",
    ziweiMore:
      "斗数里田宅、官禄、奴仆常显：你通过职守与场域获得安全感。提醒：福德宫也要灌溉——没有内在奖励，外在秩序会变成空壳。",
    astroMore:
      "土象基调里若缺风：易把「已知」当全世界。每月一次「信息采风日」：接触陌生领域的人与书，防认知隧道。",
    flow:
      "心流在：清单被勾完、现场井井有条、别人因你而安心的眼神里。把大项目拆成「可见进度」的颗粒，你会越走越轻。",
    shadow:
      "暗面：把不确定当威胁、把人情当变量想消掉。身体紧绷、反复检查，常是控制感在代偿不安。",
    growth: [
      "给计划留 10%「空白格」专供意外与灵感。",
      "练习「足够好」标准：先交付再迭代。",
      "每周一次向信任的人说一句「这次我需要帮助」。",
    ],
    relations: [
      { role: "对上", tip: "用「事实—影响—请求」三段式沟通，比纯情绪或纯细节更高效。" },
      { role: "对下", tip: "明确授权边界与检查点，减少微观管理，信任会回流。" },
      { role: "平辈/伴侣", tip: "把期待写成可见的协议，比让对方猜更温柔。" },
    ],
  },
  sp: {
    label: "当下技艺 · 气质底色",
    blurb:
      "你以体感与机会为导航：先问「现在能不能做」，再问「以后怎样」。临场反应快，也要防短跑变马拉松时的油耗。",
    ruMore:
      "儒家「敏于事」与你相合；「慎于言」是你升级点：关键场合先慢半拍，把冲劲换成准度，影响力反而更大。",
    shiMore:
      "佛学讲「无常」不是消极，是提醒你：高峰会退潮。练习在高潮处记一笔「此刻因缘」，低潮时拿出来，可减落差带来的自我攻击。",
    daoMore:
      "道家「动善时」：你懂借势。再进一层：懂得「时」也包括别人的节奏——等一拍，常常换来更大的空间。",
    baziMore:
      "五行偏火金者锐而疾。忌「火多水干」：热情耗尽后只剩燥气。以水养：睡眠、独处、冷水脸与长呼吸引回润。",
    ziweiMore:
      "斗数里迁移、兄弟、疾厄常动：你在一动一静之间换能量。注意疾厄信号——身体往往比情绪先告状。",
    astroMore:
      "火土风混合：宜补一点水象疗愈——泡澡、雨声、慢音乐，让神经系统从「猎手模式」下来。",
    flow:
      "心流在：手感对了、反馈即时、风险可控的游戏场。把生活切成若干「可收口的关卡」，你会持续上瘾于进步本身。",
    shadow:
      "暗面：承诺冲动、厌倦routine、用刺激盖空虚。当易怒与失眠同来时，多半是节奏失速而非能力不够。",
    growth: [
      "大额与长期承诺强制「隔夜再签」。",
      "为每个季度设一个「慢项目」练耐力。",
      "用运动替代报复性熬夜，把肾上腺素卸干净再谈决定。",
    ],
    relations: [
      { role: "对上", tip: "用结果说话，但补一页「风险与对策」，显得既快又稳。" },
      { role: "对下", tip: "给清晰底线与即时反馈，他们才跟得上你的变奏。" },
      { role: "平辈/伴侣", tip: "大事前先做「最坏可接受」对齐，减少事后翻旧账。" },
    ],
  },
}

export type PremiumBundle = QuadCopy & {
  ruLong: string
  shiLong: string
  daoLong: string
  baziLong: string
  ziweiLong: string
  astroLong: string
  tension: TensionRow[]
  radarEcho: { label: string; value: number; hint: string }[]
}

/** 付费完整包：四象底色 + 四轴张力 + 雷达解读句 + 原文深读叠化 */
export function buildPremiumBundle(
  mbti: string,
  meta: MetaphorPack,
  counts: Record<SoulAxis, number>,
  radar: { label: string; value: number }[],
): PremiumBundle {
  const q = keirseyQuad(mbti)
  const base = QUAD_COPY[q]
  const hints: Record<string, string> = {
    外曜入世: "偏高时：善破冰与串联；注意留独处回补。",
    格物笃实: "偏高时：落地与复盘强；注意别忽略隐喻与士气。",
    义理明断: "偏高时：标准清晰；注意先确认对方情绪账户。",
    礼序持恒: "偏高时：节奏稳；允许计划外养分进入。",
    玄览通变: "偏高时：适应力强；用记录防注意力碎片化。",
  }
  return {
    ...base,
    ruLong: `${meta.ru} ${base.ruMore}`,
    shiLong: `${meta.shi} ${base.shiMore}`,
    daoLong: `${meta.dao} ${base.daoMore}`,
    baziLong: `${meta.baziLine} ${base.baziMore}`,
    ziweiLong: `${meta.ziweiLine} ${base.ziweiMore}`,
    astroLong: `${meta.astroLine} ${base.astroMore}`,
    tension: axisCountsToTension(counts),
    radarEcho: radar.map((r) => ({
      label: r.label,
      value: r.value,
      hint: hints[r.label] ?? "此维适中时：守中即可，向两极微调皆有益。",
    })),
  }
}
