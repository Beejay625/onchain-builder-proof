'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementAccessControlProps {
  achievementId: bigint
}

export default function OnchainAchievementAccessControl({ achievementId }: OnchainAchievementAccessControlProps) {
  const { address } = useAccount()
  const [allowedAddresses, setAllowedAddresses] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const setAccessControl = async () => {
    if (!address) return
    
    const accessData = `ACCESS_CONTROL: ${allowedAddresses || 'public'}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, accessData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔐 Access Control</h3>
      
      <textarea
        value={allowedAddresses}
        onChange={(e) => setAllowedAddresses(e.target.value)}
        placeholder="Enter allowed addresses (one per line) or leave empty for public"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
        rows={4}
      />
      
      <button
        onClick={setAccessControl}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Updating...' : 'Update Access Control Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Access control updated onchain
        </div>
      )}
    </div>
  )
}
