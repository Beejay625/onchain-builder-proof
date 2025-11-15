'use client'

import { useAccount } from 'wagmi'
import { base } from 'wagmi/chains'

export default function NetworkStatus() {
  const { chain, isConnected } = useAccount()

  if (!isConnected) return null

  const isCorrectNetwork = chain?.id === base.id
  
  return (
    <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 ${
      isCorrectNetwork ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
    }`}>
      <div className={`w-2 h-2 rounded-full ${isCorrectNetwork ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`} />
      <span className="text-sm font-medium">
        {isCorrectNetwork ? `Connected to ${chain?.name}` : 'Wrong Network - Please switch to Base'}
      </span>
    </div>
  )
}
