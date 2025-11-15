'use client'

import { useState } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT, BuilderProofABI } from '@/abi/BuilderProof'
import { truncateAddress } from '@/lib/utils'

export default function OnchainReputationDelegation() {
  const { address } = useAccount()
  const [delegateTo, setDelegateTo] = useState('')
  const [amount, setAmount] = useState('')
  
  const { data: profile } = useReadContract({
    address: BUILDER_PROOF_CONTRACT,
    abi: BuilderProofABI,
    functionName: 'getProfile',
    args: address ? [address] : undefined,
  })
  
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const delegateReputation = async () => {
    if (!address || !delegateTo || !amount) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`Delegated ${amount} reputation to ${truncateAddress(delegateTo)}`],
    })
  }

  const reputation = profile ? Number(profile.reputation) : 0

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎫 Reputation Delegation</h2>
      <div className="mb-4">
        <p className="text-gray-600">Available: <span className="font-bold">{reputation}</span></p>
      </div>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Delegate to address"
          value={delegateTo}
          onChange={(e) => setDelegateTo(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Amount to delegate"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={delegateReputation}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Delegating...' : 'Delegate Reputation'}
        </button>
        {isSuccess && <p className="text-green-600">Reputation delegated onchain!</p>}
      </div>
    </div>
  )
}

