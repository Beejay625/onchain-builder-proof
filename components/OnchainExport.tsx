'use client'

import { useState } from 'react'

interface ExportOptions {
  format: 'json' | 'csv' | 'pdf'
  includeBadges: boolean
  includeComments: boolean
  includeHistory: boolean
}

export default function OnchainExport() {
  const [options, setOptions] = useState<ExportOptions>({
    format: 'json',
    includeBadges: true,
    includeComments: true,
    includeHistory: false,
  })

  const exportData = () => {
    const exportData = {
      achievements: [],
      badges: options.includeBadges ? [] : undefined,
      comments: options.includeComments ? [] : undefined,
      history: options.includeHistory ? [] : undefined,
    }

    if (options.format === 'json') {
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `onchain-export-${Date.now()}.json`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📥 Export Data</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Format</label>
          <select
            value={options.format}
            onChange={(e) => setOptions({ ...options, format: e.target.value as 'json' | 'csv' | 'pdf' })}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
            <option value="pdf">PDF</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={options.includeBadges}
              onChange={(e) => setOptions({ ...options, includeBadges: e.target.checked })}
            />
            <span className="text-sm">Include Badges</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={options.includeComments}
              onChange={(e) => setOptions({ ...options, includeComments: e.target.checked })}
            />
            <span className="text-sm">Include Comments</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={options.includeHistory}
              onChange={(e) => setOptions({ ...options, includeHistory: e.target.checked })}
            />
            <span className="text-sm">Include History</span>
          </label>
        </div>

        <button
          onClick={exportData}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Export Data
        </button>
      </div>
    </div>
  )
}
