'use client'

import { useState } from 'react'

interface BridgeProps {
  badgeTokenId: string
  sourceChain: string
  targetChain: string
}

export default function CrossChainBridge({ badgeTokenId, sourceChain, targetChain }: BridgeProps) {
  const [isBridging, setIsBridging] = useState(false)
  const [bridgeStatus, setBridgeStatus] = useState<string | null>(null)

  const bridgeBadge = async () => {
    setIsBridging(true)
    setBridgeStatus('Initiating bridge...')
    
    try {
      // Bridge badge to target chain
      // This would integrate with a cross-chain bridge protocol
      setTimeout(() => {
        setBridgeStatus('Bridge completed!')
        setIsBridging(false)
      }, 3000)
    } catch (error) {
      setBridgeStatus('Bridge failed')
      setIsBridging(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🌉 Cross-Chain Bridge</h3>
      
      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold">From</span>
          <span className="text-sm">{sourceChain}</span>
        </div>
        <div className="text-center my-2">↓</div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">To</span>
          <span className="text-sm">{targetChain}</span>
        </div>
      </div>

      <button
        onClick={bridgeBadge}
        disabled={isBridging}
        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isBridging ? 'Bridging...' : 'Bridge Badge'}
      </button>

      {bridgeStatus && (
        <div className={`mt-4 p-3 rounded-lg ${
          bridgeStatus.includes('completed') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {bridgeStatus}
        </div>
      )}
    </div>
  )
}
