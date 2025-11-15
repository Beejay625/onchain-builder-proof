'use client'

import { useState } from 'react'
import { useReadContract } from 'wagmi'

interface BadgeMetadataProps {
  contractAddress: string
  tokenId: string
}

export default function BadgeMetadata({ contractAddress, tokenId }: BadgeMetadataProps) {
  const [metadata, setMetadata] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { data: tokenURI } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: [
      {
        inputs: [{ name: 'tokenId', type: 'uint256' }],
        name: 'tokenURI',
        outputs: [{ name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'tokenURI',
    args: [BigInt(tokenId)],
  })

  const loadMetadata = async () => {
    if (!tokenURI) return

    setIsLoading(true)
    try {
      const response = await fetch(tokenURI)
      const data = await response.json()
      setMetadata(data)
    } catch (error) {
      console.error('Failed to load metadata:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📋 Badge Metadata</h3>
      <button
        onClick={loadMetadata}
        disabled={isLoading || !tokenURI}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 mb-4"
      >
        {isLoading ? 'Loading...' : 'Load Metadata'}
      </button>

      {metadata && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-xs overflow-auto">{JSON.stringify(metadata, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
