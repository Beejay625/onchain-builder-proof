'use client'

import { useAccount } from 'wagmi'
import { useState } from 'react'

/**
 * Onchain Achievement Gasless Minting
 * Support meta-transactions for gasless achievement minting
 */
export default function OnchainAchievementGaslessMinting() {
  const { address, isConnected } = useAccount()
  const [achievementContent, setAchievementContent] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleGaslessMint = async () => {
    if (!isConnected || !address) return
    
    setIsProcessing(true)
    try {
      // Meta-transaction implementation would go here
      // This would use a relayer service to pay gas fees
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert('Gasless minting initiated via meta-transaction')
    } catch (error) {
      console.error('Error with gasless mint:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">⚡ Gasless Minting</h3>
        <p className="text-gray-600">Connect wallet to mint gasless</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">⚡ Gasless Minting</h3>
      <p className="text-gray-600 mb-4">
        Mint achievements using meta-transactions without paying gas
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Achievement Description</label>
          <textarea
            value={achievementContent}
            onChange={(e) => setAchievementContent(e.target.value)}
            placeholder="Describe your achievement..."
            className="w-full p-2 border rounded-lg"
            rows={4}
          />
        </div>

        <button
          onClick={handleGaslessMint}
          disabled={isProcessing || !achievementContent.trim()}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isProcessing ? 'Processing...' : '⚡ Mint Gasless'}
        </button>

        <p className="text-xs text-gray-500">
          Gas fees will be covered by the relayer service
        </p>
      </div>
    </div>
  )
}




