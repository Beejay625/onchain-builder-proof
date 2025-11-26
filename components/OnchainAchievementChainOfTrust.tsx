'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementChainOfTrust() {
  const { address } = useAccount()
  const [trustedAddress, setTrustedAddress] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const addTrustLink = async () => {
    if (!address || !trustedAddress) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`TRUST:${trustedAddress}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔗 Chain of Trust</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Trusted builder address"
          value={trustedAddress}
          onChange={(e) => setTrustedAddress(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={addTrustLink}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Adding...' : 'Add Trust Link'}
        </button>
        {isSuccess && <p className="text-green-600">Trust link added onchain!</p>}
      </div>
    </div>
  )
}





