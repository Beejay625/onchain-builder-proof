'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementExpirationProps {
  achievementId: bigint
}

export default function OnchainAchievementExpiration({ achievementId }: OnchainAchievementExpirationProps) {
  const { address } = useAccount()
  const [expirationDate, setExpirationDate] = useState('')
  const [autoRenew, setAutoRenew] = useState(false)
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const setExpiration = async () => {
    if (!address || !expirationDate.trim()) return
    
    const expirationTimestamp = Math.floor(new Date(expirationDate).getTime() / 1000)
    const expirationData = `EXPIRATION:${expirationTimestamp}:${autoRenew ? 'auto-renew' : 'no-renew'}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, expirationData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">⏰ Achievement Expiration</h3>
      
      <input
        type="datetime-local"
        value={expirationDate}
        onChange={(e) => setExpirationDate(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={autoRenew}
          onChange={(e) => setAutoRenew(e.target.checked)}
          className="mr-2"
        />
        <span>Auto-renew on expiration</span>
      </label>
      
      <button
        onClick={setExpiration}
        disabled={isPending || isConfirming || !expirationDate.trim()}
        className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Setting...' : 'Set Expiration Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Expiration set onchain
        </div>
      )}
    </div>
  )
}
