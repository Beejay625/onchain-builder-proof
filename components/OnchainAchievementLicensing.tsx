'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementLicensing() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [licenseType, setLicenseType] = useState('')
  const [licensee, setLicensee] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const issueLicense = async () => {
    if (!address || !postId || !licenseType || !licensee) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), `LICENSE:${licenseType}:${licensee}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📜 Licensing</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Achievement ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <select
          value={licenseType}
          onChange={(e) => setLicenseType(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Select license type</option>
          <option value="MIT">MIT</option>
          <option value="Apache">Apache 2.0</option>
          <option value="GPL">GPL v3</option>
          <option value="Commercial">Commercial</option>
        </select>
        <input
          type="text"
          placeholder="Licensee address"
          value={licensee}
          onChange={(e) => setLicensee(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={issueLicense}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Issuing...' : 'Issue License'}
        </button>
        {isSuccess && <p className="text-green-600">License issued onchain!</p>}
      </div>
    </div>
  )
}
