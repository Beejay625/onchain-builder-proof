'use client'

import { useAccount } from 'wagmi'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

export default function AchievementBuilderSlotScheduler() {
  const { isConnected } = useAccount()
  const [slotsBooked, setSlotsBooked] = useState(0)
  const [nextSlot, setNextSlot] = useState('2025-03-01T12:00')

  if (!isFeatureEnabled('achievementBuilderSlotScheduler')) {
    return null
  }

  const handleSchedule = () => {
    if (!isConnected) return
    setSlotsBooked((prev) => prev + 1)
  }

  return (
    <AppCard title="🗓️ Builder Slot Scheduler" subtitle="Coordinate builder slots for restaking + proof delivery" accent="cyan">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Next Slot</label>
          <input
            type="datetime-local"
            value={nextSlot}
            onChange={(e) => setNextSlot(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSchedule}
          disabled={!isConnected}
          className="w-full rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700 disabled:bg-gray-400"
        >
          Reserve Builder Slot
        </button>
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Slots Reserved" value={slotsBooked.toString()} accent="blue" />
          <StatBadge label="Next Slot" value={nextSlot.replace('T', ' ')} accent="purple" />
        </div>
      </div>
    </AppCard>
  )
}

