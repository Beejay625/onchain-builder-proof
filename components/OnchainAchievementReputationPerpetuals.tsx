'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementReputationPerpetuals() {
  const { address } = useAccount()
  const [leverage, setLeverage] = useState('')
  const [position, setPosition] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const openPerpetual = async () => {
    if (!address || !leverage || !position) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(0), `PERP: ${leverage}x ${position}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⚡ Reputation Perpetuals</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Leverage"
          value={leverage}
          onChange={(e) => setLeverage(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Position size"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={openPerpetual}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Opening...' : 'Open Perpetual'}
        </button>
        {isSuccess && <p className="text-green-600">Perpetual opened!</p>}
      </div>
    </div>
  )
}

