'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementERC4337WalletProps {
  achievementId: bigint
}

export default function OnchainAchievementERC4337Wallet({ achievementId }: OnchainAchievementERC4337WalletProps) {
  const { address } = useAccount()
  const [walletAddress, setWalletAddress] = useState('0xwallet')
  const [factory, setFactory] = useState('0xfactory')
  const [implementation, setImplementation] = useState('0ximpl')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordWallet = () => {
    if (!address) return
    if (!walletAddress.trim()) return
    if (!walletAddress.startsWith('0x') || walletAddress.length !== 42) return

    const payload = `ERC4337_WALLET|wallet:${walletAddress}|factory:${factory}|impl:${implementation}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-purple-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">👛 ERC-4337 Wallet</h3>
      <p className="text-sm text-gray-600 mb-4">Track smart contract wallet deployments using ERC-4337.</p>

      <div className="space-y-3 mb-4">
        <input value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500" placeholder="Wallet address" />
        <input value={factory} onChange={(e) => setFactory(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Factory address" />
        <input value={implementation} onChange={(e) => setImplementation(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Implementation address" />
      </div>

      <button
        onClick={recordWallet}
        disabled={isPending || isConfirming || !address || !walletAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record ERC-4337 wallet'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-purple-700 bg-purple-50 border border-purple-200 rounded-lg p-3">
          ✓ ERC-4337 wallet deployment recorded.
        </div>
      )}
    </section>
  )
}
