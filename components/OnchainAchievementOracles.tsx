'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementOracles() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [oracleData, setOracleData] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const verifyWithOracle = async () => {
    if (!address || !postId || !oracleData) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), `ORACLE:${oracleData}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔮 Oracles</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Achievement ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <textarea
          placeholder="Oracle verification data"
          value={oracleData}
          onChange={(e) => setOracleData(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={verifyWithOracle}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Verifying...' : 'Verify with Oracle'}
        </button>
        {isSuccess && <p className="text-green-600">Oracle verification recorded!</p>}
      </div>
    </div>
  )
}

