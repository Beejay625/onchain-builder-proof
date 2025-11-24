'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementGovernanceTokenDistributionProps {
  achievementId: bigint
}

export default function OnchainAchievementGovernanceTokenDistribution({ achievementId }: OnchainAchievementGovernanceTokenDistributionProps) {
  const { address } = useAccount()
  const [tokenAddress, setTokenAddress] = useState('0xtoken')
  const [totalSupply, setTotalSupply] = useState('10000000')
  const [distributionType, setDistributionType] = useState('linear')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordDistribution = () => {
    if (!address) return
    if (!tokenAddress.trim()) return
    if (!totalSupply.trim() || isNaN(Number(totalSupply))) return
    if (!tokenAddress.startsWith('0x') || tokenAddress.length !== 42) return

    const payload = `GOVERNANCE_TOKEN_DISTRIBUTION|token:${tokenAddress}|supply:${totalSupply}|type:${distributionType}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-amber-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🗳️ Governance Token Distribution</h3>
      <p className="text-sm text-gray-600 mb-4">Record governance token distribution schedules and allocations.</p>

      <div className="space-y-3 mb-4">
        <input value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-500" placeholder="Token address" />
        <input value={totalSupply} onChange={(e) => setTotalSupply(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Total supply" />
        <input value={distributionType} onChange={(e) => setDistributionType(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Distribution type" />
      </div>

      <button
        onClick={recordDistribution}
        disabled={isPending || isConfirming || !address || !tokenAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record governance distribution'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
          ✓ Governance token distribution recorded onchain.
        </div>
      )}
    </section>
  )
}
