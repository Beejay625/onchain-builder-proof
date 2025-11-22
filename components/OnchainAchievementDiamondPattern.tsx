'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementDiamondPatternProps {
  achievementId: bigint
}

export default function OnchainAchievementDiamondPattern({ achievementId }: OnchainAchievementDiamondPatternProps) {
  const { address } = useAccount()
  const [diamondAddress, setDiamondAddress] = useState('0xdiamond')
  const [facetAddress, setFacetAddress] = useState('0xfacet')
  const [functionSelectors, setFunctionSelectors] = useState('0x...')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordDiamond = () => {
    if (!address || !diamondAddress.trim()) return
    if (!diamondAddress.startsWith('0x') || !facetAddress.startsWith('0x')) return

    const payload = `DIAMOND_PATTERN|diamond:${diamondAddress}|facet:${facetAddress}|selectors:${functionSelectors}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-indigo-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">💎 Diamond Pattern</h3>
      <p className="text-sm text-gray-600 mb-4">Track EIP-2535 diamond pattern implementations.</p>

      <div className="space-y-3 mb-4">
        <input value={diamondAddress} onChange={(e) => setDiamondAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Diamond address" />
        <input value={facetAddress} onChange={(e) => setFacetAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Facet address" />
        <input value={functionSelectors} onChange={(e) => setFunctionSelectors(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Function selectors" />
      </div>

      <button
        onClick={recordDiamond}
        disabled={isPending || isConfirming || !diamondAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record diamond pattern'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg p-3">
          ✓ Diamond pattern configuration recorded.
        </div>
      )}
    </section>
  )
}
