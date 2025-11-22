'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementSafeMathProps {
  achievementId: bigint
}

export default function OnchainAchievementSafeMath({ achievementId }: OnchainAchievementSafeMathProps) {
  const { address } = useAccount()
  const [operation, setOperation] = useState('add')
  const [library, setLibrary] = useState('SafeMath')
  const [version, setVersion] = useState('0.8.0')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordSafeMath = () => {
    if (!address || !operation.trim()) return

    const payload = `SAFE_MATH|op:${operation}|lib:${library}|ver:${version}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-blue-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🔢 Safe Math</h3>
      <p className="text-sm text-gray-600 mb-4">Document safe arithmetic operations to prevent overflow attacks.</p>

      <div className="space-y-3 mb-4">
        <select value={operation} onChange={(e) => setOperation(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2">
          <option value="add">Add</option>
          <option value="sub">Subtract</option>
          <option value="mul">Multiply</option>
          <option value="div">Divide</option>
        </select>
        <input value={library} onChange={(e) => setLibrary(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Math library" />
        <input value={version} onChange={(e) => setVersion(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Version" />
      </div>

      <button
        onClick={recordSafeMath}
        disabled={isPending || isConfirming || !address}
        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record safe math'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-lg p-3">
          ✓ Safe math configuration recorded.
        </div>
      )}
    </section>
  )
}
