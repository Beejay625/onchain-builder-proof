'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementLending() {
  const { address } = useAccount()
  const [borrower, setBorrower] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const lendAchievement = async () => {
    if (!address || !borrower) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`LEND: ${borrower}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📚 Achievement Lending</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Borrower address"
          value={borrower}
          onChange={(e) => setBorrower(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={lendAchievement}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Lending...' : 'Lend Achievement'}
        </button>
        {isSuccess && <p className="text-green-600">Lending recorded onchain!</p>}
      </div>
    </div>
  )
}
