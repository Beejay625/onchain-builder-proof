'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementFlashLoansProps {
  achievementId: bigint
}

export default function AchievementFlashLoans({ achievementId }: AchievementFlashLoansProps) {
  const { address, isConnected } = useAccount()
  const [loanAmount, setLoanAmount] = useState('')
  const [assetSymbol, setAssetSymbol] = useState('ETH')
  const [useCase, setUseCase] = useState('arbitrage')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementFlashLoans')) {
    return null
  }

  const handleFlashLoan = async () => {
    if (!isConnected || !address || !loanAmount.trim()) return

    try {
      const content = `Flash Loan\nAchievement: #${achievementId.toString()}\nAmount: ${loanAmount} ${assetSymbol}\nUse Case: ${useCase}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Flash loan log failed:', error)
    }
  }

  return (
    <AppCard title="💸 Flash Loans" subtitle="Capture flash loan operations with repayment proof" accent="purple">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <input
              type="text"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Asset</label>
            <input
              type="text"
              value={assetSymbol}
              onChange={(e) => setAssetSymbol(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Use Case</label>
          <input
            type="text"
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleFlashLoan}
          disabled={isPending || isConfirming || !isConnected || !loanAmount.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Flash Loan'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Flash loan recorded
          </div>
        )}
      </div>
    </AppCard>
  )
}

