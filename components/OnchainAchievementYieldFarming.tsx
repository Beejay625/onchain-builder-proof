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
  const [farmAddress, setFarmAddress] = useState('0xfarm')
  const [tokenAddress, setTokenAddress] = useState('0xtoken')
  const [apy, setApy] = useState('12.5%')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordFarm = () => {
    if (!address) return
    if (!farmAddress.trim()) return
    if (!tokenAddress.trim() || !tokenAddress.startsWith('0x')) return
    if (!farmAddress.startsWith('0x') || farmAddress.length !== 42) return

    const payload = `YIELD_FARMING|farm:${farmAddress}|token:${tokenAddress}|apy:${apy}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-yellow-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🌾 Yield Farming</h3>
      <p className="text-sm text-gray-600 mb-4">Record yield farming pool configurations and APY.</p>

      <div className="space-y-3 mb-4">
        <input value={farmAddress} onChange={(e) => setFarmAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500" placeholder="Farm address" />
        <input value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Token address" />
        <input value={apy} onChange={(e) => setApy(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="APY" />
      </div>

      <button
        onClick={recordFarm}
        disabled={isPending || isConfirming || !address || !farmAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-yellow-400 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record yield farm'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-yellow-800 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          ✓ Yield farming pool recorded onchain.
        </div>
      )}
    </section>
  )
}
