'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function OnchainImport() {
  const { address, isConnected } = useAccount()
  const [importFile, setImportFile] = useState<File | null>(null)
  const [importSource, setImportSource] = useState<'backup' | 'json' | 'csv'>('backup')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainImport')) {
    return null
  }

  const handleImport = async () => {
    if (!isConnected || !address || !importFile) return

    try {
      const text = await importFile.text()
      const content = `Import Achievement\nSource: ${importSource}\nFile: ${importFile.name}\nContent: ${text.substring(0, 200)}...`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Import failed:', error)
    }
  }

  return (
    <AppCard title="📥 Onchain Import" subtitle="Import achievements from backup files" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Import Source</label>
          <select
            value={importSource}
            onChange={(e) => setImportSource(e.target.value as 'backup' | 'json' | 'csv')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="backup">Backup File</option>
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Import File</label>
          <input
            type="file"
            onChange={(e) => setImportFile(e.target.files?.[0] || null)}
            accept={importSource === 'json' ? '.json' : importSource === 'csv' ? '.csv' : '*'}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleImport}
          disabled={isPending || isConfirming || !isConnected || !importFile}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Importing...' : 'Import Achievements'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Import completed onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

