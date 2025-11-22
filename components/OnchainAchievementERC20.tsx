'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementERC20Props {
  achievementId: bigint
}

export default function OnchainAchievementERC20({ achievementId }: OnchainAchievementERC20Props) {
  const { address } = useAccount()
  const [contractAddress, setContractAddress] = useState('0xcontract')
  const [implementation, setImplementation] = useState('standard')
  const [txHash, setTxHash] = useState('0xtx')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const record = () => {
    if (!address || !contractAddress.trim()) return
    if (!contractAddress.startsWith('0x')) return
    const payload = `ERC20|contract:${contractAddress}|impl:${implementation}|tx:${txHash}`
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">ERC20</h3>
      <p className="text-sm text-gray-600 mb-4">Track ERC20 token standard implementation.</p>
      <div className="space-y-3 mb-4">
        <input value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Contract address" />
        <input value={implementation} onChange={(e) => setImplementation(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Implementation" />
        <input value={txHash} onChange={(e) => setTxHash(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Transaction" />
      </div>
      <button onClick={record} disabled={isPending || isConfirming || !contractAddress.startsWith('0x')} className="w-full px-4 py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 disabled:bg-gray-400">
        {isPending || isConfirming ? 'Recording...' : 'Record ERC20'}
      </button>
      {isSuccess && <div className="mt-4 text-sm text-pink-700 bg-pink-50 border border-pink-200 rounded-lg p-3">✓ ERC20 implementation recorded.</div>}
    </section>
  )
}
