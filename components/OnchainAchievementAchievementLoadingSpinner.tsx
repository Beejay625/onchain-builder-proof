'use client'

export default function OnchainAchievementAchievementLoadingSpinner() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⏳ Loading Spinner</h2>
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
      <p className="text-center text-gray-500 mt-4">
        Loading onchain data...
      </p>
    </div>
  )
}

