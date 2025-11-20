'use client'

import { useEffect, useState } from 'react'
import { useBlockNumber } from 'wagmi'

export default function OnchainAchievementChainHeartbeat() {
  const { data: blockNumber } = useBlockNumber({ watch: true })
  const [history, setHistory] = useState<number[]>([])

  useEffect(() => {
    if (!blockNumber) return
    setHistory((prev) => [Number(blockNumber), ...prev].slice(0, 6))
  }, [blockNumber])

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">💓 Chain Heartbeat</h2>
      <p className="text-gray-600 mb-4">
        Monitor live block progression to align release windows and announcements.
      </p>
      <div className="flex items-end gap-2 h-24">
        {history.map((num, idx) => (
          <div
            key={`${num}-${idx}`}
            className="flex-1 bg-indigo-100 rounded-t"
            style={{ height: `${40 + (idx === 0 ? 40 : 0)}%` }}
          >
            <div className="text-center text-xs text-indigo-700 mt-1">{num}</div>
          </div>
        ))}
        {history.length === 0 && (
          <div className="text-gray-400 text-sm">Waiting for heartbeat...</div>
        )}
      </div>
    </div>
  )
}
