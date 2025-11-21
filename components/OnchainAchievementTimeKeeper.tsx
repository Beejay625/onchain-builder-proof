'use client'

import { useEffect, useState } from 'react'

export default function OnchainAchievementTimeKeeper() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">⏱️ Time Keeper</h2>
      <p className="text-gray-600">Use this clock to time network snapshot-ready launches.</p>
      <p className="text-3xl font-mono mt-4">{now.toUTCString()}</p>
    </div>
  )
}
