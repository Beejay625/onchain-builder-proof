'use client'

import { useState } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT, BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementSync() {
  const { address } = useAccount()
  const [sourceChain, setSourceChain] = useState('')
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'complete'>('idle')
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
  })
  
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const syncAchievements = async () => {
    if (!address || !sourceChain) return
    setSyncStatus('syncing')
    // In real app, this would sync from another chain
    writeContract({
      address: BUILDER_PROOF_CONTRACT,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`Synced achievements from ${sourceChain}`],
    })
  }

  useEffect(() => {
    if (isSuccess) {
      setSyncStatus('complete')
      setTimeout(() => setSyncStatus('idle'), 3000)
    }
  }, [isSuccess])

  const posts = userPosts ? Array.from(userPosts as bigint[]) : []

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔄 Achievement Sync</h2>
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600">Current Achievements</p>
          <p className="text-2xl font-bold">{posts.length}</p>
        </div>
        <select
          value={sourceChain}
          onChange={(e) => setSourceChain(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Select source chain</option>
          <option value="ethereum">Ethereum</option>
          <option value="polygon">Polygon</option>
          <option value="arbitrum">Arbitrum</option>
          <option value="optimism">Optimism</option>
        </select>
        <button
          onClick={syncAchievements}
          disabled={isPending || isConfirming || !sourceChain}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {syncStatus === 'syncing' ? 'Syncing...' : syncStatus === 'complete' ? 'Sync Complete!' : 'Sync Achievements'}
        </button>
        {isSuccess && <p className="text-green-600">Achievements synced onchain!</p>}
      </div>
    </div>
  )
}

