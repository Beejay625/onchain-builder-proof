'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementCustomFieldsProps {
  achievementId: bigint
}

export default function AchievementCustomFields({ achievementId }: AchievementCustomFieldsProps) {
  const { address, isConnected } = useAccount()
  const [fieldName, setFieldName] = useState('')
  const [fieldValue, setFieldValue] = useState('')
  const [fieldType, setFieldType] = useState<'text' | 'number' | 'date' | 'boolean'>('text')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementCustomFields')) {
    return null
  }

  const handleAddCustomField = async () => {
    if (!isConnected || !address || !fieldName.trim() || !fieldValue.trim()) return

    try {
      const content = `Custom Field\nAchievement: #${achievementId.toString()}\nField: ${fieldName}\nType: ${fieldType}\nValue: ${fieldValue}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Custom field addition failed:', error)
    }
  }

  return (
    <AppCard title="📝 Achievement Custom Fields" subtitle="Add custom fields to achievements" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Field Type</label>
          <select
            value={fieldType}
            onChange={(e) => setFieldType(e.target.value as 'text' | 'number' | 'date' | 'boolean')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
            <option value="boolean">Boolean</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Field Name</label>
          <input
            type="text"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            placeholder="field-name"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Field Value</label>
          <input
            type={fieldType === 'number' ? 'number' : fieldType === 'date' ? 'date' : 'text'}
            value={fieldValue}
            onChange={(e) => setFieldValue(e.target.value)}
            placeholder="Field value"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleAddCustomField}
          disabled={isPending || isConfirming || !isConnected || !fieldName.trim() || !fieldValue.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Adding...' : 'Add Custom Field'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Custom field added onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

