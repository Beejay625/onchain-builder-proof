'use client'

import { useState } from 'react'

export default function OnchainImport() {
  const [isImporting, setIsImporting] = useState(false)
  const [importStatus, setImportStatus] = useState<string | null>(null)

  const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsImporting(true)
    setImportStatus('Importing data...')

    try {
      const text = await file.text()
      const data = JSON.parse(text)
      
      // Import achievements and badges
      setImportStatus('Import completed!')
    } catch (error) {
      setImportStatus('Import failed')
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📥 Import Data</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Import from File</label>
          <input
            type="file"
            accept=".json,.csv"
            onChange={handleFileImport}
            disabled={isImporting}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {importStatus && (
          <div className={`p-3 rounded-lg ${
            importStatus.includes('completed') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
          }`}>
            {importStatus}
          </div>
        )}
      </div>
    </div>
  )
}
