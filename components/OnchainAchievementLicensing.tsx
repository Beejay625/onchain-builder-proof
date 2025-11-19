'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementLicensingProps {
  achievementId: bigint
}

export default function OnchainAchievementLicensing({ achievementId }: OnchainAchievementLicensingProps) {
  const { address } = useAccount()
  const [licenseType, setLicenseType] = useState('MIT')
  const [licenseText, setLicenseText] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const setLicense = async () => {
    if (!address || !licenseType.trim()) return
    
    const licenseData = `LICENSE: ${licenseType}${licenseText ? ` | ${licenseText}` : ''}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, licenseData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📜 Licensing</h3>
      
      <select
        value={licenseType}
        onChange={(e) => setLicenseType(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="MIT">MIT</option>
        <option value="Apache-2.0">Apache 2.0</option>
        <option value="GPL-3.0">GPL 3.0</option>
        <option value="CC0">CC0</option>
        <option value="Custom">Custom</option>
      </select>
      
      {licenseType === 'Custom' && (
        <textarea
          value={licenseText}
          onChange={(e) => setLicenseText(e.target.value)}
          placeholder="Custom license text"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          rows={4}
        />
      )}
      
      <button
        onClick={setLicense}
        disabled={isPending || isConfirming || !licenseType.trim()}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Setting...' : 'Set License Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ License information recorded onchain
        </div>
      )}
    </div>
  )
}
