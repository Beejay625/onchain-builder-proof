'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementLicensing() {
  const { address } = useAccount()
  const [licenseType, setLicenseType] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const addLicense = async () => {
    if (!address || !licenseType) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`LICENSE: ${licenseType}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📜 Achievement Licensing</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="License type"
          value={licenseType}
          onChange={(e) => setLicenseType(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={addLicense}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Adding...' : 'Add License'}
        </button>
        {isSuccess && <p className="text-green-600">License added onchain!</p>}
      </div>
    </div>
  )
}
