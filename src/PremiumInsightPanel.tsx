import type { ReactNode } from "react"
import type { PremiumBundle } from "./premiumBundle"
import type { RadarAxis } from "./engine"
import { PersonaRadar } from "./PersonaRadar"

function peek(s: string, max = 44): string {
  const t = s.replace(/\s+/g, " ").trim()
  if (t.length <= max) return t
  return `${t.slice(0, max)}…`
}

function TensionMini({ row }: { row: PremiumBundle["tension"][0] }) {
  const aPct = 100 - row.towardB
  return (
    <div className="mb-2.5 last:mb-0">
      <div className="mb-0.5 flex justify-between text-[9px] text-[#e8e2d4]/45">
        <span className="max-w-[32%] truncate">{row.poleA}</span>
        <span className="text-[#b8860b]/75">{row.title}</span>
        <span className="max-w-[32%] truncate text-right">{row.poleB}</span>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-[#1a1814]">
        <div
          className="absolute inset-y-0 left-0 rounded-l-full bg-[#3d6b5f]/5"
          style={{ width: `${aPct}%` }}
        />
        <div
          className="absolute inset-y-0 right-0 rounded-r-full bg-[#c45c48]/5"
          style={{ width: `${row.towardB}%` }}
        />
        <div
          className="absolute top-0 bottom-0 w-px bg-[#f4f0e6]/70"
          style={{ left: `${aPct}%`, transform: "translateX(-50%)" }}
        />
      </div>
    </div>
  )
}

function DimStrip({ label, value, hint }: { label: string; value: number; hint: string }) {
  return (
    <div className="flex items-center gap-2 py-1" title={hint}>
      <span className="w-16 shrink-0 truncate text-[9px] text-[#e8e2d4]/65">{label}</span>
      <div className="min-w-0 flex-1">
        <div className="h-1.5 overflow-hidden rounded-full bg-[#1a1814]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#3d6b5f] to-[#c45c48]/85"
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
      <span className="w-7 shrink-0 text-right text-[9px] tabular-nums text-[#b8860b]">{value}</span>
    </div>
  )
}

function Fold({
  title,
  accent,
  preview,
  children,
}: {
  title: string
  accent: "gold" | "jade" | "cinnabar" | "muted"
  preview: string
  children: ReactNode
}) {
  const ring =
    accent === "gold"
      ? "border-[#b8860b]/35 bg-[#b8860b]/08"
      : accent === "jade"
        ? "border-[#3d6b5f]/35 bg-[#3d6b5f]/08"
        : accent === "cinnabar"
          ? "border-[#c45c48]/35 bg-[#c45c48]/06"
          : "border-[#f4f0e6]/12 bg-[#12100e]/60"
  return (
    <details className={`st-border-ornate group rounded-xl border ${ring} px-3 py-2`}>
      <summary className="cursor-pointer list-none text-xs leading-snug text-[#e8e2d4]/88 [&::-webkit-details-marker]:hidden">
        <span className="text-[#b8860b]/80">▸</span>{" "}
        <span className="font-medium text-[#f4f0e6]/95">{title}</span>
        <span className="mt-0.5 block pl-3 text-[10px] text-[#e8e2d4]/55">{peek(preview, 40)}</span>
      </summary>
      <div className="mt-2 border-t border-[#f4f0e6]/8 pt-2 text-[11px] leading-relaxed text-[#e8e2d4]/75">
        {children}
      </div>
    </details>
  )
}

type Props = { bundle: PremiumBundle; radarAxes: RadarAxis[] }

/** 付费区：图优先，长文折叠在「展开细读」内 */
export function PremiumInsightPanel({ bundle, radarAxes }: Props) {
  const quadChar =
    bundle.label.includes("理性") ? "理" : bundle.label.includes("理想") ? "和" : bundle.label.includes("秩序") ? "序" : "艺"

  return (
    <div className="space-y-5">
      <div className="text-center">
        <p className="mb-0.5 text-[10px] tracking-[0.35em] text-[#c45c48]/75">完整报告</p>
        <h3 className="st-title text-lg text-[#f4f0e6]">气质图谱</h3>
      </div>

      {/* 总览：一字印 + 一句 */}
      <div className="flex items-center gap-4 rounded-2xl border border-[#b8860b]/25 bg-[linear-gradient(120deg,rgba(61,107,95,0.14),rgba(196,92,72,0.06))] px-4 py-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#b8860b]/40 bg-[#141210]/80">
          <span className="st-title text-3xl text-[#f4f0e6]">{quadChar}</span>
        </div>
        <div className="min-w-0">
          <p className="text-[10px] tracking-widest text-[#b8860b]/85">{bundle.label}</p>
          <p className="mt-1 text-sm leading-snug text-[#e8e2d4]/88">{peek(bundle.blurb, 56)}</p>
        </div>
      </div>

      {/* 双图：张力 + 雷达 */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="st-border-ornate rounded-2xl border border-[#f4f0e6]/10 bg-[#12100e]/95 p-3">
          <p className="mb-2 text-center text-[10px] tracking-[0.25em] text-[#3d6b5f]">四仪张力</p>
          {bundle.tension.map((row) => (
            <TensionMini key={row.key} row={row} />
          ))}
        </div>
        <div className="st-border-ornate flex flex-col items-center rounded-2xl border border-[#f4f0e6]/10 bg-[#12100e]/92 px-2 py-3">
          <p className="mb-1 text-center text-[10px] tracking-[0.25em] text-[#b8860b]">五维雷达</p>
          <PersonaRadar axes={radarAxes} size={200} />
        </div>
      </div>

      {/* 五维条：纯条 + hover 提示 */}
      <div className="st-border-ornate rounded-2xl border border-[#f4f0e6]/10 bg-[#12100e]/90 px-3 py-3">
        <p className="mb-2 text-center text-[10px] tracking-[0.25em] text-[#e8e2d4]/55">
          五维能量（悬停看提示）
        </p>
        {bundle.radarEcho.map((r) => (
          <DimStrip key={r.label} label={r.label} value={r.value} hint={r.hint} />
        ))}
      </div>

      {/* 儒释道：大字 + 折叠 */}
      <div className="grid gap-2 sm:grid-cols-3">
        <div className="flex flex-col items-center rounded-xl border border-[#b8860b]/25 bg-[#161411]/80 px-2 pt-3 pb-2">
          <span className="st-title text-4xl leading-none text-[#b8860b]">儒</span>
          <Fold title="修身" accent="gold" preview={bundle.ruLong}>
            {bundle.ruLong}
          </Fold>
        </div>
        <div className="flex flex-col items-center rounded-xl border border-[#3d6b5f]/25 bg-[#161411]/80 px-2 pt-3 pb-2">
          <span className="st-title text-4xl leading-none text-[#6a9e8c]">释</span>
          <Fold title="观心" accent="jade" preview={bundle.shiLong}>
            {bundle.shiLong}
          </Fold>
        </div>
        <div className="flex flex-col items-center rounded-xl border border-[#c45c48]/25 bg-[#161411]/80 px-2 pt-3 pb-2">
          <span className="st-title text-4xl leading-none text-[#c45c48]/90">道</span>
          <Fold title="顺势" accent="cinnabar" preview={bundle.daoLong}>
            {bundle.daoLong}
          </Fold>
        </div>
      </div>

      {/* 命理：符号 + 折叠 */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { t: "八", sub: "字", body: bundle.baziLong, a: "gold" as const },
          { t: "紫", sub: "微", body: bundle.ziweiLong, a: "jade" as const },
          { t: "星", sub: "盘", body: bundle.astroLong, a: "cinnabar" as const },
        ].map((x) => (
          <div key={x.t} className="flex flex-col items-center rounded-xl border border-[#f4f0e6]/10 bg-[#12100e]/85 px-1 py-2">
            <div className="mb-1 flex h-11 w-11 flex-col items-center justify-center rounded-full border border-[#f4f0e6]/15 bg-[#0d0c0a]/60">
              <span className="st-title text-lg leading-none text-[#f4f0e6]">{x.t}</span>
              <span className="text-[7px] text-[#e8e2d4]/45">{x.sub}</span>
            </div>
            <Fold title="意象" accent={x.a} preview={x.body}>
              {x.body}
            </Fold>
          </div>
        ))}
      </div>

      {/* 心流 / 阴影：色块 + 折叠 */}
      <div className="grid grid-cols-2 gap-2">
        <div className="overflow-hidden rounded-xl border border-[#3d6b5f]/30">
          <div className="h-1 bg-gradient-to-r from-[#3d6b5f] to-transparent" />
          <div className="bg-[#3d6b5f]/10 p-2">
            <Fold title="心流" accent="jade" preview={bundle.flow}>
              {bundle.flow}
            </Fold>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-[#c45c48]/30">
          <div className="h-1 bg-gradient-to-r from-[#c45c48] to-transparent" />
          <div className="bg-[#c45c48]/8 p-2">
            <Fold title="阴影" accent="cinnabar" preview={bundle.shadow}>
              {bundle.shadow}
            </Fold>
          </div>
        </div>
      </div>

      {/* 成长：三枚药签 */}
      <div className="st-border-ornate rounded-2xl border border-[#f4f0e6]/10 bg-[#12100e]/88 px-3 py-3">
        <p className="mb-2 text-center text-[10px] tracking-[0.25em] text-[#b8860b]">成长药签</p>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
          {bundle.growth.map((g, i) => (
            <details
              key={g}
              className="flex-1 rounded-lg border border-[#f4f0e6]/8 bg-[#0d0c0a]/40 px-2 py-1.5"
            >
              <summary className="cursor-pointer list-none text-center text-[10px] text-[#e8e2d4]/85 [&::-webkit-details-marker]:hidden">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#b8860b]/20 text-[11px] text-[#b8860b]">
                  {i + 1}
                </span>
                <span className="mt-1 block truncate px-1" title={g}>
                  {peek(g, 14)}
                </span>
              </summary>
              <p className="mt-1 border-t border-[#f4f0e6]/6 pt-1 text-[10px] leading-relaxed text-[#e8e2d4]/70">{g}</p>
            </details>
          ))}
        </div>
      </div>

      {/* 关系：图标行 */}
      <div className="st-border-ornate rounded-2xl border border-[#f4f0e6]/10 bg-[#12100e]/88 px-3 py-3">
        <p className="mb-2 text-center text-[10px] tracking-[0.25em] text-[#3d6b5f]">相处透镜</p>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          {bundle.relations.map((r) => {
            const mark = r.role.includes("上") ? "上" : r.role.includes("下") ? "下" : "伴"
            return (
              <details
                key={r.role}
                className="flex-1 rounded-xl border border-[#f4f0e6]/8 bg-[#0d0c0a]/35 px-2 py-2 text-center"
              >
                <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <div className="mx-auto mb-1 flex h-10 w-10 items-center justify-center rounded-full border border-[#b8860b]/30 bg-[#b8860b]/10">
                    <span className="st-title text-xl text-[#f4f0e6]">{mark}</span>
                  </div>
                  <span className="text-[9px] text-[#e8e2d4]/55">{peek(r.tip, 20)}</span>
                </summary>
                <p className="mt-2 border-t border-[#f4f0e6]/6 pt-2 text-left text-[10px] leading-relaxed text-[#e8e2d4]/75">
                  <span className="block text-[9px] text-[#b8860b]/75">{r.role}</span>
                  {r.tip}
                </p>
              </details>
            )
          })}
        </div>
      </div>
    </div>
  )
}
