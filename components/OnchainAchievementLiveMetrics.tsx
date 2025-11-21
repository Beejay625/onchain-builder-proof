'use client'

import { useEffect, useState } from 'react'

export default function OnchainAchievementLiveMetrics() {
  const [metric, setMetric] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMetric((prev) => prev + Math.floor(Math.random() * 5))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">📡 Live Metrics</h2>
      <p className="text-gray-600">Track real-time progress for current sprint achievements.</p>
      <p className="text-4xl font-black text-indigo-600 mt-4">{metric}</p>
    </div>
  )
}
