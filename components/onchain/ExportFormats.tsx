'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import { useState } from 'react'

interface ExportFormatsProps {
  achievementId: bigint
}

export default function ExportFormats({ achievementId }: ExportFormatsProps) {
  const { address } = useAccount()
  const [exportFormat, setExportFormat] = useState<'json' | 'csv' | 'markdown'>('json')
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
    query: { enabled: !!achievementId },
  })

  if (!isFeatureEnabled('exportFormats')) {
    return null
  }

  const handleExport = () => {
    if (!post) return

    let content = ''
    const data = {
      id: achievementId.toString(),
      author: post.author,
      content: post.content,
      timestamp: post.timestamp.toString(),
      likes: post.likes.toString(),
      comments: post.comments.toString(),
    }

    if (exportFormat === 'json') {
      content = JSON.stringify(data, null, 2)
    } else if (exportFormat === 'csv') {
      content = `ID,Author,Content,Timestamp,Likes,Comments\n${data.id},${data.author},${data.content.replace(/,/g, ';')},${data.timestamp},${data.likes},${data.comments}`
    } else if (exportFormat === 'markdown') {
      content = `# Achievement #${data.id}\n\n**Author:** ${data.author}\n\n**Content:**\n${data.content}\n\n**Timestamp:** ${new Date(Number(data.timestamp) * 1000).toISOString()}\n\n**Likes:** ${data.likes}\n\n**Comments:** ${data.comments}`
    }

    const blob = new Blob([content], { type: exportFormat === 'json' ? 'application/json' : exportFormat === 'csv' ? 'text/csv' : 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `achievement-${achievementId}.${exportFormat}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <AppCard title="📥 Export Formats" subtitle="Export achievements in JSON, CSV, Markdown" accent="indigo">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value as 'json' | 'csv' | 'markdown')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
            <option value="markdown">Markdown</option>
          </select>
        </div>
        <button
          onClick={handleExport}
          disabled={!post}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:bg-gray-400"
        >
          Export as {exportFormat.toUpperCase()}
        </button>
        <p className="text-xs text-gray-500">
          Download this achievement in your preferred format for backup or sharing.
        </p>
      </div>
    </AppCard>
  )
}

