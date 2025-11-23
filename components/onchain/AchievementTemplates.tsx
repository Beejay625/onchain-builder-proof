'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function AchievementTemplates() {
  const { address, isConnected } = useAccount()
  const [templateName, setTemplateName] = useState('')
  const [templateContent, setTemplateContent] = useState('')
  const [templateCategory, setTemplateCategory] = useState('development')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementTemplates')) {
    return null
  }

  const handleCreateTemplate = async () => {
    if (!isConnected || !address || !templateName.trim() || !templateContent.trim()) return

    try {
      const content = `Achievement Template\nName: ${templateName}\nCategory: ${templateCategory}\nTemplate: ${templateContent}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Template creation failed:', error)
    }
  }

  return (
    <AppCard title="📋 Achievement Templates" subtitle="Create and manage achievement templates" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
          <input
            type="text"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            placeholder="My Template"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={templateCategory}
            onChange={(e) => setTemplateCategory(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="development">Development</option>
            <option value="design">Design</option>
            <option value="learning">Learning</option>
            <option value="collaboration">Collaboration</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Template Content</label>
          <textarea
            value={templateContent}
            onChange={(e) => setTemplateContent(e.target.value)}
            placeholder="Template content..."
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleCreateTemplate}
          disabled={isPending || isConfirming || !isConnected || !templateName.trim() || !templateContent.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Template'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Template created onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

