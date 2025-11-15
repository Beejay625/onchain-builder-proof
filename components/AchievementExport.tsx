'use client'

import { useState } from 'react'

interface AchievementExportProps {
  achievements: any[]
}

export default function AchievementExport({ achievements }: AchievementExportProps) {
  const exportToPDF = () => {
    // Generate PDF export
    alert('PDF export coming soon!')
  }

  const exportToMarkdown = () => {
    const markdown = achievements.map(achievement => 
      `## ${achievement.title}\n\n${achievement.content}\n\n*Date: ${new Date(achievement.timestamp * 1000).toLocaleDateString()}*\n`
    ).join('\n---\n\n')

    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `achievements-${Date.now()}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📥 Export Achievements</h3>
      
      <div className="space-y-3">
        <button
          onClick={exportToMarkdown}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Export as Markdown
        </button>
        <button
          onClick={exportToPDF}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Export as PDF
        </button>
      </div>
    </div>
  )
}
