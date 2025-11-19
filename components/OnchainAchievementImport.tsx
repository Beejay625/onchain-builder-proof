'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementImport() {
  const { address } = useAccount()
  const [importData, setImportData] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setImportData(content)
    }
    reader.readAsText(file)
  }

  const importAchievement = async () => {
    if (!address || !importData.trim()) return
    
    const importContent = `IMPORT: ${importData.substring(0, 200)}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [importContent],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📥 Import Achievement</h3>
      
      <input
        type="file"
        accept=".json,.csv,.txt"
        onChange={handleFileUpload}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      {importData && (
        <textarea
          value={importData}
          onChange={(e) => setImportData(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-xs"
          rows={5}
        />
      )}
      
      <button
        onClick={importAchievement}
        disabled={isPending || isConfirming || !importData.trim()}
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Importing...' : 'Import Achievement Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Achievement imported onchain
        </div>
      )}
    </div>
  )
}
