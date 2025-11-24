'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementContractTestingProps {
  achievementId: bigint
}

export default function OnchainAchievementContractTesting({ achievementId }: OnchainAchievementContractTestingProps) {
  const { address } = useAccount()
  const [contractAddress, setContractAddress] = useState('0xcontract')
  const [testFramework, setTestFramework] = useState('Hardhat')
  const [coverage, setCoverage] = useState('95%')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordTesting = () => {
    if (!address) return
    if (!contractAddress.trim()) return
    if (!testFramework.trim()) return
    if (!contractAddress.startsWith('0x') || contractAddress.length !== 42) return

    const payload = `CONTRACT_TESTING|contract:${contractAddress}|framework:${testFramework}|coverage:${coverage}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-yellow-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🧪 Contract Testing</h3>
      <p className="text-sm text-gray-600 mb-4">Record smart contract testing frameworks and coverage metrics.</p>

      <div className="space-y-3 mb-4">
        <input value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500" placeholder="Contract address" />
        <input value={testFramework} onChange={(e) => setTestFramework(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Test framework" />
        <input value={coverage} onChange={(e) => setCoverage(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Coverage" />
      </div>

      <button
        onClick={recordTesting}
        disabled={isPending || isConfirming || !address || !contractAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-yellow-400 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record contract testing'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-yellow-800 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          ✓ Contract testing recorded onchain.
        </div>
      )}
    </section>
  )
}
