'use client'

import { useState } from 'react'

export default function OnchainAchievementAchievementRefreshButton() {
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      window.location.reload()
    }, 1000)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔄 Refresh Button</h2>
      <button
        onClick={handleRefresh}
        disabled={refreshing}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {refreshing ? 'Refreshing...' : 'Refresh Data'}
      </button>
    </div>
  )
}

