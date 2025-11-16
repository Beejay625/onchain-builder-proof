'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAchievementReminder() {
  const { address } = useAccount()
  const [reminderTime, setReminderTime] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const setReminder = async () => {
    if (!address || !reminderTime) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`REMINDER: ${reminderTime}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⏰ Achievement Reminder</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Reminder time"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={setReminder}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Setting...' : 'Set Reminder'}
        </button>
        {isSuccess && <p className="text-green-600">Reminder set onchain!</p>}
      </div>
    </div>
  )
}

