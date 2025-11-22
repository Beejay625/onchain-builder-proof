'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementFlashLoanProofProps {
  achievementId: bigint
}

export default function OnchainAchievementFlashLoanProof({ achievementId }: OnchainAchievementFlashLoanProofProps) {
  const { address } = useAccount()
  const [protocol, setProtocol] = useState('Aave')
  const [amount, setAmount] = useState('10000')
  const [txHash, setTxHash] = useState('0xflash')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordFlashLoan = () => {
    if (!address || !txHash.trim()) return

    const payload = `FLASH_LOAN|protocol:${protocol}|amount:${amount}|tx:${txHash}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-yellow-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">⚡ Flash Loan Proof</h3>
      <p className="text-sm text-gray-600 mb-4">Record flash loan transactions used for achievement milestones.</p>

      <div className="space-y-3 mb-4">
        <input value={protocol} onChange={(e) => setProtocol(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Protocol" />
        <input value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Amount" />
        <input value={txHash} onChange={(e) => setTxHash(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Transaction hash" />
      </div>

      <button
        onClick={recordFlashLoan}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-yellow-400 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record flash loan proof'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-yellow-800 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          ✓ Flash loan proof stored onchain.
        </div>
      )}
    </section>
  )
}
