'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementVesting() {
  const { address } = useAccount()
  const [vestingSchedule, setVestingSchedule] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const setupVesting = async () => {
    if (!address || !vestingSchedule) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`VESTING: ${vestingSchedule}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Achievement Vesting</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Vesting schedule"
          value={vestingSchedule}
          onChange={(e) => setVestingSchedule(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={setupVesting}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Setting up...' : 'Setup Vesting'}
        </button>
        {isSuccess && <p className="text-green-600">Vesting configured onchain!</p>}
      </div>
    </div>
  )
}
