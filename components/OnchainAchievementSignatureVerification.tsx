'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementSignatureVerificationProps {
  achievementId: bigint
}

export default function OnchainAchievementSignatureVerification({ achievementId }: OnchainAchievementSignatureVerificationProps) {
  const { address } = useAccount()
  const [signer, setSigner] = useState('0xsigner')
  const [messageHash, setMessageHash] = useState('0xhash')
  const [signature, setSignature] = useState('0xsig')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordVerification = () => {
    if (!address || !signer.trim()) return
    if (!signer.startsWith('0x') || !messageHash.startsWith('0x')) return

    const payload = `SIG_VERIFICATION|signer:${signer}|hash:${messageHash}|sig:${signature}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-cyan-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">✍️ Signature Verification</h3>
      <p className="text-sm text-gray-600 mb-4">Record ECDSA signature verification for meta-transactions.</p>

      <div className="space-y-3 mb-4">
        <input value={signer} onChange={(e) => setSigner(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-cyan-500" placeholder="Signer address" />
        <input value={messageHash} onChange={(e) => setMessageHash(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-cyan-500" placeholder="Message hash" />
        <input value={signature} onChange={(e) => setSignature(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-cyan-500" placeholder="Signature" />
      </div>

      <button
        onClick={recordVerification}
        disabled={isPending || isConfirming || !address || !signer.startsWith('0x')}
        className="w-full px-4 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record signature verification'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-cyan-700 bg-cyan-50 border border-cyan-200 rounded-lg p-3">
          ✓ Signature verification recorded onchain.
        </div>
      )}
    </section>
  )
}
