'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementYieldFarmingProps {
  achievementId: bigint
}

export default function OnchainAchievementYieldFarming({ achievementId }: OnchainAchievementYieldFarmingProps) {
  const { address } = useAccount()
  const [farmAddress, setFarmAddress] = useState('')
  const [apy, setApy] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordFarm = () => {
    if (!address || !farmAddress.trim() || !apy.trim()) return

    const payload = `YIELD_FARM|farm:${farmAddress}|apy:${apy}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-green-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🌾 Yield Farming</h3>
      <p className="text-sm text-gray-600 mb-4">Record yield farming positions tied to achievements.</p>

      <div className="space-y-3 mb-4">
        <input 
          value={farmAddress} 
          onChange={(e) => setFarmAddress(e.target.value)} 
          className="w-full border border-gray-300 rounded-lg p-2" 
          placeholder="Farm address" 
        />
        <input 
          value={apy} 
          onChange={(e) => setApy(e.target.value)} 
          className="w-full border border-gray-300 rounded-lg p-2" 
          placeholder="APY %" 
        />
      </div>

      <button
        onClick={recordFarm}
        disabled={isPending || isConfirming || !farmAddress.trim() || !apy.trim()}
        className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record yield farm'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
          ✓ Yield farm recorded onchain.
        </div>
      )}
    </section>
  )
}
