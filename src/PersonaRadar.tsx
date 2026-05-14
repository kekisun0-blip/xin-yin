import type { RadarAxis } from "./engine"

type Props = {
  axes: RadarAxis[]
  size?: number
}

/** 五维雷达，新中式配色 */
export function PersonaRadar({ axes, size = 240 }: Props) {
  const n = axes.length
  const cx = size / 2
  const cy = size / 2
  const maxR = size * 0.34
  const labelR = size * 0.42

  const pt = (i: number, radius: number) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / n
    return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)] as const
  }

  const polyFor = (scale: number) => {
    const pts = Array.from({ length: n }, (_, i) => {
      const [x, y] = pt(i, maxR * scale)
      return `${x},${y}`
    })
    return pts.join(" ")
  }

  const dataPoly = Array.from({ length: n }, (_, i) => {
    const r = maxR * (axes[i]!.value / 100)
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / n
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as const
  })
  const dataD =
    dataPoly.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ") +
    " Z"

  return (
    <div className="flex flex-col items-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
        aria-label="性格五维雷达图"
        role="img"
      >
        <defs>
          <linearGradient id="radarFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3d6b5f" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#c45c48" stopOpacity="0.22" />
          </linearGradient>
          <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {[0.35, 0.65, 1].map((s) => (
          <polygon
            key={s}
            points={polyFor(s)}
            fill="none"
            stroke="rgba(244,240,230,0.12)"
            strokeWidth={s === 1 ? 1.2 : 0.6}
          />
        ))}

        {Array.from({ length: n }, (_, i) => {
          const [x1, y1] = pt(i, maxR)
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={x1}
              y2={y1}
              stroke="rgba(244,240,230,0.1)"
              strokeWidth={0.8}
            />
          )
        })}

        <path
          d={dataD}
          fill="url(#radarFill)"
          stroke="#b8860b"
          strokeOpacity={0.85}
          strokeWidth={1.4}
          filter="url(#radarGlow)"
        />

        {axes.map((ax, i) => {
          const r = maxR * (ax.value / 100)
          const angle = -Math.PI / 2 + (2 * Math.PI * i) / n
          const x = cx + r * Math.cos(angle)
          const y = cy + r * Math.sin(angle)
          return (
            <circle
              key={ax.key}
              cx={x}
              cy={y}
              r={3.2}
              fill="#f4f0e6"
              stroke="#c45c48"
              strokeWidth={0.9}
            />
          )
        })}

        {axes.map((ax, i) => {
          const [lx, ly] = pt(i, labelR)
          const fs = size < 220 ? 9 : 10
          return (
            <text
              key={`t-${ax.key}`}
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="rgba(232,226,212,0.82)"
              fontSize={fs}
              className="select-none"
              style={{ fontFamily: "Noto Serif SC, serif" }}
            >
              {ax.label}
            </text>
          )
        })}
      </svg>
      <ul className="mt-3 grid w-full max-w-xs grid-cols-2 gap-x-3 gap-y-1 text-[10px] text-[#e8e2d4]/55">
        {axes.map((a) => (
          <li key={a.key} className="flex justify-between tabular-nums">
            <span className="truncate pr-1">{a.label}</span>
            <span className="text-[#b8860b]/90">{a.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
