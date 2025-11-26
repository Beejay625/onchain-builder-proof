'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function VestingSchedules() {
  const { address, isConnected } = useAccount()
  const [recipientAddress, setRecipientAddress] = useState('')
  const [totalAmount, setTotalAmount] = useState('1000')
  const [vestingPeriod, setVestingPeriod] = useState(12)
  const [cliffPeriod, setCliffPeriod] = useState(3)
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainVesting')) {
    return null
  }

  const handleSetupVesting = async () => {
    if (!isConnected || !address || !recipientAddress || !totalAmount) return

    try {
      const content = `Vesting Schedule Setup\nRecipient: ${recipientAddress}\nTotal Amount: ${totalAmount} tokens\nVesting Period: ${vestingPeriod} months\nCliff Period: ${cliffPeriod} months`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Vesting setup failed:', error)
    }
  }

  return (
    <AppCard title="📊 Vesting Schedule" subtitle="Setup token vesting schedules" accent="violet">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Address</label>
          <input
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Total Amount (tokens)</label>
          <input
            type="text"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Vesting Period (months)</label>
          <input
            type="number"
            value={vestingPeriod}
            onChange={(e) => setVestingPeriod(Number(e.target.value))}
            min={1}
            max={60}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cliff Period (months)</label>
          <input
            type="number"
            value={cliffPeriod}
            onChange={(e) => setCliffPeriod(Number(e.target.value))}
            min={0}
            max={vestingPeriod}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSetupVesting}
          disabled={isPending || isConfirming || !isConnected || !recipientAddress || !totalAmount}
          className="w-full rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Setting up...' : 'Setup Vesting'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Vesting schedule recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}





