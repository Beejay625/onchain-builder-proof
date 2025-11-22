'use client'

interface StatBadgeProps {
  label: string
  value: string | number
  delta?: {
    value: string
    trend: 'up' | 'down' | 'neutral'
  }
}

const trendStyles = {
  up: 'text-green-600 bg-green-50',
  down: 'text-red-600 bg-red-50',
  neutral: 'text-gray-600 bg-gray-100',
}

export default function StatBadge({ label, value, delta }: StatBadgeProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        {delta && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${trendStyles[delta.trend]}`}>
            {delta.trend === 'up' && '▲ '}
            {delta.trend === 'down' && '▼ '}
            {delta.value}
          </span>
        )}
      </div>
    </div>
  )
}



