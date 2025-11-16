'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementSocialRecovery() {
  const { address } = useAccount()
  const [guardians, setGuardians] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const setupRecovery = async () => {
    if (!address || !guardians) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(0), `RECOVERY: Guardians ${guardians}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔓 Social Recovery</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Guardian addresses (comma-separated)"
          value={guardians}
          onChange={(e) => setGuardians(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={setupRecovery}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Setting up...' : 'Setup Social Recovery'}
        </button>
        {isSuccess && <p className="text-green-600">Recovery setup complete!</p>}
      </div>
    </div>
  )
}

