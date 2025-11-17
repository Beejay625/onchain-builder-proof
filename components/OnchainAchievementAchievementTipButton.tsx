'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAchievementTipButton() {
  const { address } = useAccount()
  const [tipAmount, setTipAmount] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const sendTip = async () => {
    if (!address || !tipAmount) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`TIP: ${tipAmount} ETH`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">💰 Tip Button</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Tip amount (ETH)"
          value={tipAmount}
          onChange={(e) => setTipAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={sendTip}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Sending...' : 'Send Tip'}
        </button>
        {isSuccess && <p className="text-green-600">Tip sent onchain!</p>}
      </div>
    </div>
  )
}

