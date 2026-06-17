import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { ChartItem } from '../types/content'

/** Accessible palette that reads well on both light and dark backgrounds. */
const PALETTE = [
  '#6366f1',
  '#8b5cf6',
  '#ec4899',
  '#f59e0b',
  '#10b981',
  '#3b82f6',
  '#ef4444',
  '#14b8a6',
]

const axisProps = {
  stroke: 'currentColor',
  tick: { fontSize: 12, fill: 'currentColor' },
} as const

/**
 * Renders a chart from a JSON-described `ChartItem` via Recharts. Dynamically
 * imported (see SectionView) so Recharts stays out of the main bundle.
 */
export function Chart({ item }: { item: ChartItem }) {
  const { kind, data, xKey, series } = item

  const inner = (() => {
    switch (kind) {
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.15} />
            <XAxis dataKey={xKey} {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip />
            <Legend />
            {series.map((s, i) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.label ?? s.key}
                stroke={PALETTE[i % PALETTE.length]}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        )
      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.15} />
            <XAxis dataKey={xKey} {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip />
            <Legend />
            {series.map((s, i) => (
              <Area
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.label ?? s.key}
                stroke={PALETTE[i % PALETTE.length]}
                fill={PALETTE[i % PALETTE.length]}
                fillOpacity={0.25}
              />
            ))}
          </AreaChart>
        )
      case 'pie':
        return (
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie
              data={data}
              dataKey={series[0]?.key ?? 'value'}
              nameKey={xKey}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((_, i) => (
                <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
              ))}
            </Pie>
          </PieChart>
        )
      case 'bar':
      default:
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.15} />
            <XAxis dataKey={xKey} {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip />
            <Legend />
            {series.map((s, i) => (
              <Bar
                key={s.key}
                dataKey={s.key}
                name={s.label ?? s.key}
                fill={PALETTE[i % PALETTE.length]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        )
    }
  })()

  return (
    <div className="h-72 w-full text-slate-500 dark:text-slate-400">
      <ResponsiveContainer width="100%" height="100%">
        {inner}
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
