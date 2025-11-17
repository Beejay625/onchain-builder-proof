'use client'

export default function OnchainAchievementAchievementPrintButton() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🖨️ Print Button</h2>
      <button
        onClick={handlePrint}
        className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
      >
        Print Achievement
      </button>
    </div>
  )
}

