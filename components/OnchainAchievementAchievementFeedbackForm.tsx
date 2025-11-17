'use client'

import { useState } from 'react'

export default function OnchainAchievementAchievementFeedbackForm() {
  const [feedback, setFeedback] = useState('')

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">💬 Feedback Form</h2>
      <div className="space-y-4">
        <textarea
          placeholder="Share your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          rows={4}
        />
        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Submit Feedback
        </button>
      </div>
    </div>
  )
}

