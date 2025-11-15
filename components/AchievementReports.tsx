'use client'

import { useState } from 'react'

interface Report {
  id: string
  type: 'achievement' | 'comment' | 'user'
  reason: string
  description: string
  status: 'pending' | 'reviewed' | 'resolved'
}

export default function AchievementReports() {
  const [reports, setReports] = useState<Report[]>([])

  const submitReport = () => {
    // Submit report
    console.log('Submitting report')
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">🚨 Report</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Report Type</label>
          <select className="w-full p-2 border border-gray-300 rounded-lg">
            <option value="achievement">Achievement</option>
            <option value="comment">Comment</option>
            <option value="user">User</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Reason</label>
          <select className="w-full p-2 border border-gray-300 rounded-lg">
            <option value="spam">Spam</option>
            <option value="inappropriate">Inappropriate Content</option>
            <option value="harassment">Harassment</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows={4}
            placeholder="Provide details..."
          />
        </div>

        <button
          onClick={submitReport}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Submit Report
        </button>
      </div>
    </div>
  )
}
