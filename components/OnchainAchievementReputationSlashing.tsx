'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementReputationSlashing() {
  const { address } = useAccount()
  const [offender, setOffender] = useState('')
  const [slashAmount, setSlashAmount] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const slashReputation = async () => {
    if (!address || !offender || !slashAmount) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(0), `SLASH: ${slashAmount} from ${offender}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⚔️ Reputation Slashing</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Offender address"
          value={offender}
          onChange={(e) => setOffender(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Slash amount"
          value={slashAmount}
          onChange={(e) => setSlashAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={slashReputation}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Slashing...' : 'Slash Reputation'}
        </button>
        {isSuccess && <p className="text-green-600">Reputation slashed!</p>}
      </div>
    </div>
  )
}

