'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementLendingProtocolProps {
  achievementId: bigint
}

export default function OnchainAchievementLendingProtocol({ achievementId }: OnchainAchievementLendingProtocolProps) {
  const { address } = useAccount()
  const [protocol, setProtocol] = useState('Aave')
  const [marketAddress, setMarketAddress] = useState('0xmarket')
  const [apy, setApy] = useState('5.2%')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordLending = () => {
    if (!address) return
    if (!marketAddress.trim()) return
    if (!marketAddress.startsWith('0x') || marketAddress.length !== 42) return

    const payload = `LENDING_PROTOCOL|protocol:${protocol}|market:${marketAddress}|apy:${apy}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-cyan-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">💰 Lending Protocol</h3>
      <p className="text-sm text-gray-600 mb-4">Record lending protocol market configurations.</p>

      <div className="space-y-3 mb-4">
        <input value={protocol} onChange={(e) => setProtocol(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-cyan-500" placeholder="Protocol name" />
        <input value={marketAddress} onChange={(e) => setMarketAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Market address" />
        <input value={apy} onChange={(e) => setApy(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="APY" />
      </div>

      <button
        onClick={recordLending}
        disabled={isPending || isConfirming || !address || !marketAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record lending protocol'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-cyan-700 bg-cyan-50 border border-cyan-200 rounded-lg p-3">
          ✓ Lending protocol market recorded.
        </div>
      )}
    </section>
  )
}
