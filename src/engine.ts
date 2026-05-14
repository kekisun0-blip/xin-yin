import type { SoulAxis } from "./questions"

const AXIS_ORDER: SoulAxis[] = ["EI", "SN", "TF", "JP"]

/** 每题 0 = 首字母，1 = 次字母；得分约 ∈ [-5,5] */
export function answersToAxisCounts(answers: (0 | 1)[]): Record<SoulAxis, number> {
  const counts: Record<SoulAxis, number> = { EI: 0, SN: 0, TF: 0, JP: 0 }
  for (let i = 0; i < answers.length; i++) {
    const axis = AXIS_ORDER[i % 4]
    const delta = answers[i] === 0 ? 1 : -1
    counts[axis] += delta
  }
  return counts
}

/** 每题 0 = 首字母，1 = 次字母 */
export function answersToMbti(answers: (0 | 1)[]): string {
  const counts = answersToAxisCounts(answers)
  const e = counts.EI >= 0 ? "E" : "I"
  const s = counts.SN >= 0 ? "S" : "N"
  const t = counts.TF >= 0 ? "T" : "F"
  const j = counts.JP >= 0 ? "J" : "P"
  return `${e}${s}${t}${j}`
}

export type RadarAxis = { key: string; label: string; value: number }

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n))
}

/** 由四轴得分生成五维雷达（0–100），文案为新中式心理维度，非 MBTI 字面 */
export function axisCountsToRadar(counts: Record<SoulAxis, number>): RadarAxis[] {
  const c = counts
  const n = (v: number) => clamp(Math.round(54 + v * 7.2), 22, 96)
  // 第五维：玄览通变 —— 直觉与随势，偏 N、P、略偏 I
  const xuan = clamp(
    Math.round(52 - c.SN * 5.5 - c.JP * 3.2 - c.EI * 1.2),
    22,
    96,
  )
  return [
    { key: "wai", label: "外曜入世", value: n(c.EI) },
    { key: "ge", label: "格物笃实", value: n(c.SN) },
    { key: "yi", label: "义理明断", value: n(c.TF) },
    { key: "li", label: "礼序持恒", value: n(c.JP) },
    { key: "xuan", label: "玄览通变", value: xuan },
  ]
}

export type MetaphorPack = {
  /** 心理气质类比，非排盘 */
  baziLine: string
  ziweiLine: string
  astroLine: string
  ru: string
  shi: string
  dao: string
  gist: string
  tips: string[]
}

const MBTI_METAPHORS: Record<string, MetaphorPack> = {}

function fill(
  key: string,
  pack: Omit<MetaphorPack, "tips"> & { tips: string[] },
) {
  MBTI_METAPHORS[key] = pack
}

/* 精选 16 型各一段：短、可扫读；避免绝对化断言 */
fill("INTJ", {
  baziLine: "日主气质偏「金水」意象：喜清、贵结构，厌冗余。",
  ziweiLine: "身宫若类比官禄：以远见与系统立身，不喜被打散节奏。",
  astroLine: "星盘元素上偏土风：骨架先行，情绪后置。",
  ru: "儒：重「格物」之序，以礼自制，以学正心。",
  shi: "释：观缘起，少执相；在执念起处练习松手。",
  dao: "道：守静笃，致虚极；以简驭繁。",
  gist: "你是建筑师型心智：先看见终局，再反推路径。",
  tips: ["给别人的指令留半步解释，可降低摩擦。", "每周留半日「无目标散步」，防过度紧绷。"],
})

fill("INTP", {
  baziLine: "偏「水木」意象：生发好奇，流动思辨。",
  ziweiLine: "类比迁移与福德：在思想漫游里得滋养。",
  astroLine: "风元素偏重：概念与可能性先于行动。",
  ru: "儒：以学养德，但忌「知而不行」之弊。",
  shi: "释：问「这是事实还是解释？」可减戏论。",
  dao: "道：知止不殆，偶尔落地一件小事即修行。",
  gist: "你是解谜者：世界像可拆的机关，你享受原理胜过掌声。",
  tips: ["结论前用一句话说清假设。", "找一个「截止时间朋友」帮你收口。"],
})

fill("ENTJ", {
  baziLine: "偏「金火」意象：决断、推进、喜见功。",
  ziweiLine: "类比官禄与将星：以事功与组织见长。",
  astroLine: "火土张力：目标感强，需防灼伤自己与团队。",
  ru: "儒：外王气质——欲明明德于天下，先正其序。",
  shi: "释：权力亦是缘，练习「成就他人」的喜心。",
  dao: "道：知雄守雌，刚极时退一步即是长进。",
  gist: "你是统帅型：把混乱变成路线图，是你的天赋与负担。",
  tips: ["会前一分钟问「谁还需要被听见」。", "把「控制」改写为「对齐」。"],
})

fill("ENTP", {
  baziLine: "偏「木火」意象：机锋、善变、喜新厌旧式聪明。",
  ziweiLine: "类比兄弟朋友宫：在交锋与玩笑里长智。",
  astroLine: "风火：点子快，落地需伙伴。",
  ru: "儒：好辩近于礼，记得「辞让」亦是德。",
  shi: "释：看住「我要赢辩论」的那念。",
  dao: "道：上善若水，柔能克刚。",
  gist: "你是点火者：一个反问就能换一桌人的脑回路。",
  tips: ["重要场合先复述对方观点再反驳。", "选一件小事做满闭环，养「信」。"],
})

fill("INFJ", {
  baziLine: "偏「水木」而藏：外静内涌，重象征与使命。",
  ziweiLine: "类比福德与玄空：在意无形之「是否对」。",
  astroLine: "水象与直觉：读空气先于读字面。",
  ru: "儒：仁以为己任，不亦重乎；忌过度背负。",
  shi: "释：慈悲需智慧，边界亦是慈。",
  dao: "道：和其光，同其尘；不必时时透明。",
  gist: "你是摆渡人：常在别人开口前，已感到浪的方向。",
  tips: ["每周说一次「这次我帮不了」。", "把直觉写成三行字，再决定是否行动。"],
})

fill("INFP", {
  baziLine: "偏「木」柔象：向光生长，厌硬折。",
  ziweiLine: "类比子女与福德：内在小孩与价值感相连。",
  astroLine: "水火：理想高，情绪潮汐需命名。",
  ru: "儒：诗教传统——温柔敦厚而不愚。",
  shi: "释：不伤害并非不拒绝，拒绝亦是护生。",
  dao: "道：朴虽小，天下莫能臣；守住本真。",
  gist: "你是译者：把心里说不清的灰，译成可被善待的语言。",
  tips: ["用「我需要」替代「你应该懂」。", "小步对外展示作品，胜过完美内耗。"],
})

fill("ENFJ", {
  baziLine: "偏「木火」象：外施仁爱，喜见人和。",
  ziweiLine: "类比夫妻与交友：在关系场里发光。",
  astroLine: "火风水：感染力强，需补水式独处。",
  ru: "儒：己欲立而立人；先正己再化人。",
  shi: "释：度众生先度心中「必须被需要」的我。",
  dao: "道：功成身退，天之道；留白是高级的领导。",
  gist: "你是举灯者：你稳定，一群人就敢往暗处再走一步。",
  tips: ["问「你真正想要什么」比给答案更治愈。", "拒绝时不必道歉三次。"],
})

fill("ENFP", {
  baziLine: "偏「火木」象：喜跃迁、厌沉闷。",
  ziweiLine: "类比迁移：心总在下一站更亮。",
  astroLine: "风火：故事感强，细节易漂。",
  ru: "儒：乐而不淫，狂而有节。",
  shi: "释：看住「新鲜即意义」的瘾，深耕亦是喜。",
  dao: "道：知足不辱，知止不殆。",
  gist: "你是种春风的人：话题因你而活，房间因你而轻。",
  tips: ["一年只立一个「主项目」。", "兴奋时说「我三天后回复你」。"],
})

fill("ISTJ", {
  baziLine: "偏「土金」象：重信、重实、可托付。",
  ziweiLine: "类比田宅与官禄：根基与职守一体。",
  astroLine: "土象：慢热可靠，变局时需预告。",
  ru: "儒：敬事而信，节用而爱人。",
  shi: "释：戒慎恐惧是护，不是缚；松紧有度。",
  dao: "道：治大国若烹小鲜，大事亦忌频翻。",
  gist: "你是承重墙：不说漂亮话，但关键时刻你在。",
  tips: ["变动前先写「影响三点」再沟通。", "允许自己偶尔不按表走半天。"],
})

fill("ISFJ", {
  baziLine: "偏「土水」象：润下而承载，记恩亦记细节。",
  ziweiLine: "类比父母与福德：护短与护场。",
  astroLine: "水土：记忆与照顾，易藏委屈。",
  ru: "儒：老吾老以及人之老，推恩有序。",
  shi: "释：不把自己燃尽也叫布施。",
  dao: "道：上善若水，水善利万物而不争。",
  gist: "你是暖席：别人落座前，你已把冷热想了一遍。",
  tips: ["直接要帮助，你值得被回护。", "每周一次「只服务自己」的时段。"],
})

fill("ESTJ", {
  baziLine: "偏「金土」象：条贯、法度、结果导向。",
  ziweiLine: "类比官禄与奴仆：成事靠系统与执行。",
  astroLine: "土火：推进快，注意柔化语气。",
  ru: "儒：正名，名正言顺；秩序即仁政之一端。",
  shi: "释：法无定法，有时「例外」才是更大的善。",
  dao: "道：治人事天，莫若以啬。",
  gist: "你是节拍器：团队乱时，你的表就是最稳的鼓。",
  tips: ["表扬具体行为，批评也对事不对人。", "留 10% 规则外空间给创新。"],
})

fill("ESFJ", {
  baziLine: "偏「土火」象：外圆内方，重场面与人和。",
  ziweiLine: "类比交友与夫妻：在「我们」里找坐标。",
  astroLine: "火土：社交充电也耗电，需独处回补。",
  ru: "儒：礼之用，和为贵；和亦有界。",
  shi: "释：照顾众生从照顾呼吸开始。",
  dao: "道：为而不争，争的是心安不是输赢。",
  gist: "你是黏合剂：你记得生日，也记得谁今天脸色不对。",
  tips: ["被忽略时直接点名需求。", "把「应该」换成「我选择」。"],
})

fill("ISTP", {
  baziLine: "偏「金水」象：冷利、好拆解、动手即知。",
  ziweiLine: "类比疾厄与官禄：危机与手艺常伴。",
  astroLine: "土风：冷静观察者，突发时反而醒。",
  ru: "儒：工欲善其事，必先利其器。",
  shi: "释：在机锋里看见无常，少与人缠斗口业。",
  dao: "道：庖丁解牛，以无厚入有间。",
  gist: "你是瑞士军刀：平时沉默，关键时刻一刀到位。",
  tips: ["重要关系里多说半句动机。", "把「懒得解释」与「尊重」分开。"],
})

fill("ISFP", {
  baziLine: "偏「木土」象：审美与当下，慢而真。",
  ziweiLine: "类比子女与田宅：小天地里自洽。",
  astroLine: "水土：感受细腻，表达宜找媒介（艺、物、字）。",
  ru: "儒：游于艺，艺以载道。",
  shi: "释：温柔不是软弱，是选择。",
  dao: "道：见素抱朴，少私寡欲。",
  gist: "你是留白：话不多，但在场本身就是一种态度。",
  tips: ["冲突时先离开现场再回话。", "用一件作品替你说「不」。"],
})

fill("ESTP", {
  baziLine: "偏「火金」象：当下、锋锐、喜实战。",
  ziweiLine: "类比兄弟与迁移：在动中得机。",
  astroLine: "火土风：机会嗅觉灵，忌短视。",
  ru: "儒：敏于事而慎于言——对你，后半句是功课。",
  shi: "释：快刀斩乱麻前，问一句「十年后怎么看」。",
  dao: "道：动善时，知止而后有定。",
  gist: "你是闪电：等你想清，局已经换了一桌。",
  tips: ["大钱与承诺睡一晚再签。", "把冒险预算写进日历。"],
})

fill("ESFP", {
  baziLine: "偏「火土」象：外放、乐群、活在气氛里。",
  ziweiLine: "类比子女与交友：舞台与掌声滋养你。",
  astroLine: "火水：热情高，低潮时需身体级休息。",
  ru: "儒：诗可以兴，可以观，可以群。",
  shi: "释：狂欢见空，空里见慈。",
  dao: "道：知足之足，常足矣。",
  gist: "你是节气：你一来，场子就有了「今天值得过」的理由。",
  tips: ["独处不是惩罚，是充电。", "重要决定避开最嗨的那一小时。"],
})

export function getMetaphors(mbti: string): MetaphorPack {
  return (
    MBTI_METAPHORS[mbti] ?? {
      baziLine: "日主气质混合：五行流转，重在「当下这一运」如何自处。",
      ziweiLine: "身宫随运而显：人事互为镜像，守中即可。",
      astroLine: "四元素俱在：你是完整的人，不必贴单一标签。",
      ru: "儒：每日「三省」，问心无愧即君子。",
      shi: "释：诸行无常，你亦在流动中成长。",
      dao: "道：致虚守静，万物并作，吾以观复。",
      gist: "你的气质独特：以上通用句可作起点，详解锁后细读。",
      tips: ["把测试结果当地图，不当判决书。", "选一条最小行动，试一周再调整。"],
    }
  )
}

export const UNLOCK_STORAGE_KEY = "xin_yin_ce_unlock_v1"
export const UNLOCK_PRICE_CNY = 5

export function isUnlocked(): boolean {
  try {
    const raw = localStorage.getItem(UNLOCK_STORAGE_KEY)
    if (!raw) return false
    const j = JSON.parse(raw) as { ok?: boolean; paidAt?: number }
    return j.ok === true && typeof j.paidAt === "number"
  } catch {
    return false
  }
}

export function setUnlockedDemo(): void {
  localStorage.setItem(
    UNLOCK_STORAGE_KEY,
    JSON.stringify({ ok: true, paidAt: Date.now(), channel: "demo" }),
  )
}
