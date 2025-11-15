'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

export default function BuilderCertificates() {
  const [courseName, setCourseName] = useState('')
  const [certificateURI, setCertificateURI] = useState('')
  const [completionDate, setCompletionDate] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const mintCertificate = async () => {
    if (!courseName.trim() || !certificateURI.trim()) return

    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'mintCertificate',
        args: [courseName, certificateURI, BigInt(Math.floor(new Date(completionDate).getTime() / 1000))],
      })
    } catch (error) {
      console.error('Certificate minting error:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🎓 Mint Certificate</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-2">Course Name</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Advanced Solidity"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Certificate URI</label>
          <input
            type="url"
            value={certificateURI}
            onChange={(e) => setCertificateURI(e.target.value)}
            placeholder="ipfs://..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Completion Date</label>
          <input
            type="date"
            value={completionDate}
            onChange={(e) => setCompletionDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          onClick={mintCertificate}
          disabled={isPending}
          className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400"
        >
          {isPending ? 'Minting...' : 'Mint Certificate'}
        </button>
        {isSuccess && (
          <div className="mt-3 p-2 bg-green-100 text-green-800 rounded text-sm text-center">
            ✓ Certificate minted successfully
          </div>
        )}
      </div>
    </div>
  )
}
