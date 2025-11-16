'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementDAODelegationRouter() {
  const { address } = useAccount()
  const [daoAddress, setDaoAddress] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const delegateToDAO = async () => {
    if (!address || !daoAddress) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`DAO_DELEGATE: ${daoAddress}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🗳️ DAO Delegation Router</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="DAO address"
          value={daoAddress}
          onChange={(e) => setDaoAddress(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={delegateToDAO}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Delegating...' : 'Delegate to DAO'}
        </button>
        {isSuccess && <p className="text-green-600">Delegated onchain!</p>}
      </div>
    </div>
  )
}

