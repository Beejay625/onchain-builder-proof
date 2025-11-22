'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementFlashMintProps {
  achievementId: bigint
}

export default function OnchainAchievementFlashMint({ achievementId }: OnchainAchievementFlashMintProps) {
  const { address } = useAccount()
  const [tokenAddress, setTokenAddress] = useState('0xtoken')
  const [amount, setAmount] = useState('1000000')
  const [callbackData, setCallbackData] = useState('0xcallback')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordFlashMint = () => {
    if (!address) return
    if (!tokenAddress.trim() || !tokenAddress.startsWith('0x')) return

    const payload = `FLASH_MINT|token:${tokenAddress}|amount:${amount}|callback:${callbackData}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-yellow-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">⚡ Flash Mint</h3>
      <p className="text-sm text-gray-600 mb-4">Record flash mint operations for temporary token creation.</p>

      <div className="space-y-3 mb-4">
        <input value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500" placeholder="Token address" />
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Amount" min="0" />
        <input value={callbackData} onChange={(e) => setCallbackData(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Callback data" />
      </div>

      <button
        onClick={recordFlashMint}
        disabled={isPending || isConfirming || !address || !tokenAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-yellow-400 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record flash mint'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-yellow-800 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          ✓ Flash mint operation recorded onchain.
        </div>
      )}
    </section>
  )
}
