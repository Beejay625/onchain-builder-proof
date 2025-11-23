'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import { useState } from 'react'

export default function OnchainExport() {
  const { address } = useAccount()
  const [exportFormat, setExportFormat] = useState<'json' | 'csv' | 'pdf'>('json')
  const { data: userPostIds } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  if (!isFeatureEnabled('onchainExport')) {
    return null
  }

  const handleExport = () => {
    const data = {
      achievements: userPostIds?.map((id) => id.toString()) || [],
      exportDate: new Date().toISOString(),
      format: exportFormat,
    }

    let content = ''
    if (exportFormat === 'json') {
      content = JSON.stringify(data, null, 2)
    } else if (exportFormat === 'csv') {
      content = `ID,ExportDate\n${data.achievements.map((id) => `${id},${data.exportDate}`).join('\n')}`
    }

    if (content) {
      const blob = new Blob([content], { type: exportFormat === 'json' ? 'application/json' : 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `achievements-export.${exportFormat}`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <AppCard title="📤 Onchain Export" subtitle="Export all achievements" accent="green">
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">
            Export {userPostIds?.length || 0} achievement{userPostIds?.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value as 'json' | 'csv' | 'pdf')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
            <option value="pdf">PDF (Coming Soon)</option>
          </select>
        </div>
        <button
          onClick={handleExport}
          disabled={!userPostIds || userPostIds.length === 0}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          Export Achievements
        </button>
      </div>
    </AppCard>
  )
}

