'use client'

import { useState } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementExportProps {
  achievementId: bigint
}

export default function OnchainAchievementExport({ achievementId }: OnchainAchievementExportProps) {
  const { address } = useAccount()
  const [exportFormat, setExportFormat] = useState('json')
  
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
  })

  const exportAchievement = () => {
    if (!post) return
    
    let content = ''
    
    if (exportFormat === 'json') {
      content = JSON.stringify({
        id: post.id.toString(),
        author: post.author,
        content: post.content,
        timestamp: post.timestamp.toString(),
        likes: post.likes.toString(),
        comments: post.comments.toString(),
      }, null, 2)
    } else if (exportFormat === 'csv') {
      content = `ID,Author,Content,Timestamp,Likes,Comments\n${post.id.toString()},${post.author},"${post.content}",${post.timestamp.toString()},${post.likes.toString()},${post.comments.toString()}`
    } else if (exportFormat === 'markdown') {
      content = `# Achievement #${post.id.toString()}\n\n**Author:** ${post.author}\n\n**Content:** ${post.content}\n\n**Timestamp:** ${new Date(Number(post.timestamp) * 1000).toISOString()}\n\n**Likes:** ${post.likes.toString()}\n**Comments:** ${post.comments.toString()}`
    }
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `achievement-${post.id.toString()}.${exportFormat}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📥 Export Achievement</h3>
      
      <select
        value={exportFormat}
        onChange={(e) => setExportFormat(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="json">JSON</option>
        <option value="csv">CSV</option>
        <option value="markdown">Markdown</option>
      </select>
      
      <button
        onClick={exportAchievement}
        disabled={!post}
        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
      >
        Export as {exportFormat.toUpperCase()}
      </button>
    </div>
  )
}
