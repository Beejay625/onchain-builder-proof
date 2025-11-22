'use client'

import AppCard from '@/components/common/AppCard'
import StatBadge from '@/components/common/StatBadge'
import { useAppState } from '@/context'

export default function ImpactKpiDashboard() {
  const { analyticsSnapshot } = useAppState()

  return (
    <AppCard
      title="Impact KPI Dashboard"
      subtitle="Track reach, velocity, and reputation impact across chains."
      accent="default"
    >
      <div className="grid gap-4 md:grid-cols-4">
        <StatBadge label="Total Achievements" value={analyticsSnapshot.totalAchievements} />
        <StatBadge label="Active Streak" value={`${analyticsSnapshot.activeStreakDays}d`} />
        <StatBadge
          label="Impact Score"
          value={analyticsSnapshot.impactScore.toFixed(1)}
          delta={{ value: '+4.2', trend: 'up' }}
        />
        <StatBadge
          label="Velocity"
          value={`${analyticsSnapshot.velocity.toFixed(1)} / wk`}
          delta={{ value: '-0.3', trend: 'down' }}
        />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Engagement funnel</p>
          <div className="mt-3 space-y-2 text-sm text-gray-700">
            <ProgressRow label="Views" percent={92} />
            <ProgressRow label="Reactions" percent={64} />
            <ProgressRow label="Proof clicks" percent={41} />
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Impact mix</p>
          <div className="mt-3 space-y-2 text-sm text-gray-700">
            <MixRow label="Product launches" value={42} />
            <MixRow label="DAO governance" value={23} />
            <MixRow label="DevRel / content" value={18} />
            <MixRow label="Ops / infra" value={17} />
          </div>
        </div>
      </div>
    </AppCard>
  )
}

function ProgressRow({ label, percent }: { label: string; percent: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-32 text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</div>
      <div className="flex-1 rounded-full bg-white">
        <div className="rounded-full bg-gray-900 py-1 text-right text-[10px] font-semibold text-white pr-2" style={{ width: `${percent}%` }}>
          {percent}%
        </div>
      </div>
    </div>
  )
}

function MixRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span className="font-semibold">{value}%</span>
    </div>
  )
}



