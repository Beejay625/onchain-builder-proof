'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementSmartContractVerificationProps {
  achievementId: bigint
}

export default function OnchainAchievementSmartContractVerification({ achievementId }: OnchainAchievementSmartContractVerificationProps) {
  const { address } = useAccount()
  const [contractAddress, setContractAddress] = useState('0xcontract')
  const [verificationStatus, setVerificationStatus] = useState('verified')
  const [verifier, setVerifier] = useState('Etherscan')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordVerification = () => {
    if (!address) return
    if (!contractAddress.trim()) return
    if (!verificationStatus.trim()) return
    if (!contractAddress.startsWith('0x') || contractAddress.length !== 42) return

    const payload = `SMART_CONTRACT_VERIFICATION|contract:${contractAddress}|status:${verificationStatus}|verifier:${verifier}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-blue-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">✅ Smart Contract Verification</h3>
      <p className="text-sm text-gray-600 mb-4">Record smart contract verification status and verifier information.</p>

      <div className="space-y-3 mb-4">
        <input value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500" placeholder="Contract address" />
        <input value={verificationStatus} onChange={(e) => setVerificationStatus(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Verification status" />
        <input value={verifier} onChange={(e) => setVerifier(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Verifier" />
      </div>

      <button
        onClick={recordVerification}
        disabled={isPending || isConfirming || !address || !contractAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record verification'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-lg p-3">
          ✓ Smart contract verification recorded onchain.
        </div>
      )}
    </section>
  )
}
