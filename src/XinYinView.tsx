import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react"
import { SOUL_QUESTIONS } from "./questions"
import {
  UNLOCK_PRICE_CNY,
  answersToAxisCounts,
  answersToMbti,
  axisCountsToRadar,
  getMetaphors,
  isUnlocked,
  setUnlockedDemo,
} from "./engine"
import { PersonaRadar } from "./PersonaRadar"
import { getPersonaMatch } from "./persona"
import { buildPremiumBundle } from "./premiumBundle"
import { PremiumInsightPanel } from "./PremiumInsightPanel"

type Phase = "intro" | "quiz" | "result"

/** 心印测主界面 */
export function XinYinView() {
  const [phase, setPhase] = useState<Phase>("intro")
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<(0 | 1)[]>([])
  const [unlocked, setUnlocked] = useState(() => isUnlocked())
  const [payOpen, setPayOpen] = useState(false)
  const resultAnchorRef = useRef<HTMLElement | null>(null)

  const q = SOUL_QUESTIONS[idx]
  const total = SOUL_QUESTIONS.length

  const mbti = useMemo(() => {
    if (answers.length !== total) return ""
    return answersToMbti(answers)
  }, [answers, total])

  const meta = useMemo(() => (mbti ? getMetaphors(mbti) : null), [mbti])

  const axisCounts = useMemo(
    () => (answers.length === total ? answersToAxisCounts(answers) : null),
    [answers, total],
  )

  const radarAxes = useMemo(
    () => (axisCounts ? axisCountsToRadar(axisCounts) : []),
    [axisCounts],
  )

  const persona = useMemo(() => (mbti ? getPersonaMatch(mbti) : null), [mbti])

  const premium = useMemo(() => {
    if (!mbti || !meta || !axisCounts || radarAxes.length === 0) return null
    return buildPremiumBundle(mbti, meta, axisCounts, radarAxes)
  }, [mbti, meta, axisCounts, radarAxes])

  useLayoutEffect(() => {
    if (phase !== "result") return
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    resultAnchorRef.current?.scrollIntoView({ block: "start", inline: "nearest" })
  }, [phase])

  const pick = useCallback(
    (choice: 0 | 1) => {
      const next = [...answers, choice]
      setAnswers(next)
      if (idx + 1 >= total) {
        setPhase("result")
      } else {
        setIdx(idx + 1)
      }
    },
    [answers, idx, total],
  )

  const restart = () => {
    setPhase("intro")
    setIdx(0)
    setAnswers([])
    setPayOpen(false)
  }

  const handleMockPay = () => {
    setUnlockedDemo()
    setUnlocked(true)
    setPayOpen(false)
  }

  const uiBuildTag = "乙巳0212 · 名人雷达"

  return (
    <div className="relative mx-auto flex min-h-dvh max-w-lg flex-col px-5 py-10 pb-24">
      {phase === "intro" && (
        <section className="st-animate-in flex flex-1 flex-col justify-center">
          <p className="mb-3 text-center text-[11px] tracking-[0.35em] text-[#b8860b]/90">
            心印四象
          </p>
          <h1 className="st-title mb-4 text-center text-4xl text-[#f4f0e6] md:text-5xl">
            性格洞察
          </h1>
          <p className="mb-6 text-center text-sm leading-relaxed text-[#e8e2d4]/85">
            二十问，融儒释道之问心，并借八字、紫微斗数与星盘作
            <strong className="text-[#f4f0e6]">心理意象</strong>
            （非算命排盘）。结果以
            <strong className="text-[#c45c48]"> 五维雷达、天赋与一位古今名人映像 </strong>
            呈现，不立洋字标签。
          </p>
          <div className="st-border-ornate mb-8 rounded-2xl bg-[#161411]/85 p-5 text-xs leading-relaxed text-[#e8e2d4]/75">
            <p className="mb-2 font-medium text-[#b8860b]">说明</p>
            <ul className="list-inside list-disc space-y-1.5 marker:text-[#3d6b5f]">
              <li>题目测的是当下自我认知，非宿命。</li>
              <li>命理段落为文化隐喻与气质类比，不可替代专业咨询。</li>
              <li>完整解读需支付 {UNLOCK_PRICE_CNY} 元解锁（正式环境请接入微信/支付宝验签）。</li>
            </ul>
          </div>
          <button
            type="button"
            onClick={() => setPhase("quiz")}
            className="mx-auto w-full max-w-xs rounded-xl border border-[#c45c48]/45 bg-[#c45c48]/15 py-3.5 text-sm font-semibold tracking-[0.2em] text-[#f4f0e6] shadow-[0_0_24px_var(--st-cinnabar-dim)] transition hover:bg-[#c45c48]/28"
          >
            开始问心
          </button>
        </section>
      )}

      {phase === "quiz" && q && (
        <section className="st-animate-in flex flex-1 flex-col">
          <div className="mb-8 flex items-center justify-between text-[11px] text-[#e8e2d4]/45">
            <span>
              第 {idx + 1} / {total} 问
            </span>
            <span className="rounded-full border border-[#3d6b5f]/35 bg-[#3d6b5f]/10 px-2.5 py-0.5 text-[#a8c4b8]">
              {q.tag}
            </span>
          </div>
          <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-[#1a1814]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#3d6b5f] to-[#c45c48] transition-all duration-500"
              style={{ width: `${((idx + 1) / total) * 100}%` }}
            />
          </div>
          <h2 className="mb-10 text-lg font-medium leading-relaxed text-[#f4f0e6] md:text-xl">
            {q.prompt}
          </h2>
          <div className="mt-auto flex flex-col gap-4">
            <button
              type="button"
              onClick={() => pick(0)}
              className="st-border-ornate group rounded-2xl border border-[#f4f0e6]/12 bg-[#1a1814]/6 px-5 py-4 text-left text-sm leading-relaxed text-[#e8e2d4] transition hover:border-[#3d6b5f]/55 hover:bg-[#3d6b5f]/12"
            >
              <span className="mb-1 block text-[10px] tracking-widest text-[#b8860b]/80">
                甲
              </span>
              {q.optionA}
            </button>
            <button
              type="button"
              onClick={() => pick(1)}
              className="st-border-ornate group rounded-2xl border border-[#f4f0e6]/12 bg-[#1a1814]/6 px-5 py-4 text-left text-sm leading-relaxed text-[#e8e2d4] transition hover:border-[#c45c48]/45 hover:bg-[#c45c48]/10"
            >
              <span className="mb-1 block text-[10px] tracking-widest text-[#c45c48]/75">
                乙
              </span>
              {q.optionB}
            </button>
          </div>
        </section>
      )}

      {phase === "result" && mbti && meta && persona && radarAxes.length > 0 && (
        <section
          ref={resultAnchorRef}
          id="soultype-result-anchor"
          className="st-animate-in flex flex-col scroll-mt-4 pb-6"
        >
          <p className="mb-2 text-center text-[11px] tracking-[0.35em] text-[#b8860b]/90">
            气质所近
          </p>
          <p className="mb-1 text-center text-[10px] uppercase tracking-[0.28em] text-[#e8e2d4]/35">
            古今名人 · 映像
          </p>
          <div className="mb-4 flex flex-col items-center gap-4">
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#b8860b]/35 bg-[radial-gradient(circle_at_30%_25%,rgba(244,240,230,0.08),transparent_55%)] shadow-[inset_0_0_24px_rgba(0,0,0,0.35)]">
              <span className="st-title text-5xl text-[#f4f0e6] opacity-95">
                {persona.sealChar}
              </span>
              <span className="absolute -bottom-1 rounded-full border border-[#3d6b5f]/40 bg-[#141210] px-2 py-0.5 text-[9px] tracking-widest text-[#a8c4b8]">
                名印
              </span>
            </div>
            <div className="text-center">
              <h2 className="st-title text-4xl leading-tight text-[#f4f0e6] md:text-5xl">
                {persona.name}
              </h2>
              <p className="mt-1.5 text-xs text-[#b8860b]/85">{persona.tagline}</p>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#e8e2d4]/78">
                {persona.mirrorLine}
              </p>
            </div>
          </div>

          <div className="st-border-ornate mb-6 rounded-2xl border border-[#f4f0e6]/10 bg-[#12100e]/92 px-4 py-6">
            <p className="mb-4 text-center text-[11px] tracking-[0.25em] text-[#3d6b5f]">
              心印五维
            </p>
            <PersonaRadar axes={radarAxes} size={248} />
          </div>

          <div className="st-border-ornate mb-6 rounded-2xl border border-[#f4f0e6]/10 bg-[#12100e]/88 px-5 py-5">
            <p className="mb-3 text-center text-[11px] tracking-[0.25em] text-[#b8860b]">
              天赋所长
            </p>
            <ul className="flex flex-col gap-2.5">
              {persona.talents.map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-2 border-b border-[#f4f0e6]/6 pb-2.5 text-sm text-[#e8e2d4]/88 last:border-0 last:pb-0"
                >
                  <span className="text-[#c45c48]">◆</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="st-border-ornate relative mb-6 overflow-hidden rounded-2xl border border-[#f4f0e6]/10 bg-[#12100e]/95 p-6">
            <div
              className={`space-y-4 text-sm leading-relaxed transition ${unlocked ? "" : "select-none blur-[6px]"}`}
            >
              <p className="font-medium text-[#f4f0e6]">{meta.gist}</p>
              <div className="space-y-2 border-t border-[#f4f0e6]/10 pt-4 text-[#e8e2d4]/88">
                <p>
                  <span className="text-[#b8860b]">儒</span> {meta.ru}
                </p>
                <p>
                  <span className="text-[#3d6b5f]">释</span> {meta.shi}
                </p>
                <p>
                  <span className="text-[#c45c48]/90">道</span> {meta.dao}
                </p>
              </div>
              <div className="space-y-2 border-t border-[#f4f0e6]/10 pt-4 text-xs text-[#e8e2d4]/78">
                <p>
                  <span className="text-[#b8860b]">八字意象</span> {meta.baziLine}
                </p>
                <p>
                  <span className="text-[#3d6b5f]">紫微意象</span> {meta.ziweiLine}
                </p>
                <p>
                  <span className="text-[#c45c48]/85">星盘元素</span> {meta.astroLine}
                </p>
              </div>
              <ul className="list-inside list-disc border-t border-[#f4f0e6]/10 pt-4 text-xs text-[#e8e2d4]/80 marker:text-[#b8860b]">
                {meta.tips.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>

          {!unlocked && (
            <div className="mb-6 text-center">
              <button
                type="button"
                onClick={() => setPayOpen(true)}
                className="w-full rounded-xl border border-[#b8860b]/50 bg-gradient-to-r from-[#3d6b5f]/25 to-[#c45c48]/20 py-3.5 text-sm font-semibold tracking-widest text-[#f4f0e6] shadow-[0_0_32px_rgba(61,107,95,0.15)] transition hover:from-[#3d6b5f]/35 hover:to-[#c45c48]/30"
              >
                支付 ¥{UNLOCK_PRICE_CNY} 解锁完整解读
              </button>
              <p className="mt-2 text-[11px] text-[#e8e2d4]/45">
                解锁后含：四仪张力图 · 五维能量条 · 儒释道/命理长卷 · 心流与阴影 · 关系星谱 · 成长脚手架
              </p>
            </div>
          )}

          {unlocked && (
            <>
              <p className="mb-6 text-center text-[11px] text-[#3d6b5f]">已解锁 · 感谢支持</p>
              {premium && (
                <div className="mb-8 border-t border-[#f4f0e6]/10 pt-8">
                  <PremiumInsightPanel bundle={premium} radarAxes={radarAxes} />
                </div>
              )}
            </>
          )}

          <button
            type="button"
            onClick={restart}
            className="rounded-lg border border-[#f4f0e6]/12 bg-transparent py-2.5 text-center text-xs text-[#e8e2d4]/70 transition hover:border-[#b8860b]/40 hover:text-[#f4f0e6]"
          >
            重新测试
          </button>
        </section>
      )}

      {!payOpen && (
        <p
          className="pointer-events-none fixed bottom-3 left-0 right-0 z-[5] text-center text-[11px] tracking-[0.28em] text-[#b8860b]/85 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]"
          aria-hidden
        >
          {uiBuildTag}
        </p>
      )}

      {payOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pay-title"
        >
          <div className="st-border-ornate w-full max-w-md rounded-2xl border border-[#f4f0e6]/15 bg-[#141210] p-6 shadow-2xl">
            <h3 id="pay-title" className="st-title mb-2 text-2xl text-[#f4f0e6]">
              解锁完整报告
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-[#e8e2d4]/75">
              金额 <strong className="text-[#c45c48]">¥{UNLOCK_PRICE_CNY}</strong>
              。正式上架后，请在此接入微信支付或支付宝，并在服务端验签后再写入解锁状态；当前仓库仅提供流程与界面演示。
            </p>
            <div className="mb-5 flex h-28 items-center justify-center rounded-xl border border-dashed border-[#f4f0e6]/15 bg-[#0d0c0a] text-xs text-[#e8e2d4]/45">
              收款码 / 商户 H5 占位
            </div>
            <div className="flex flex-col gap-2">
              {import.meta.env.DEV && (
                <button
                  type="button"
                  onClick={handleMockPay}
                  className="rounded-lg border border-[#3d6b5f]/50 bg-[#3d6b5f]/20 py-2.5 text-xs text-[#a8c4b8]"
                >
                  开发模式：模拟支付成功
                </button>
              )}
              <button
                type="button"
                onClick={() => setPayOpen(false)}
                className="rounded-lg border border-[#f4f0e6]/12 py-2.5 text-xs text-[#e8e2d4]/70"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
