'use client'

import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function LoginPage() {
  const { isConnected, address } = useAccount()
  const router = useRouter()

  useEffect(() => {
    if (isConnected) {
      router.push('/dashboard')
    }
  }, [isConnected, router])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8">
          Connect Your Wallet
        </h1>
        <p className="text-center mb-8 text-lg text-gray-600">
          Connect your wallet to start minting your achievements
        </p>
        <div className="flex justify-center">
          <appkit-button />
        </div>
        {isConnected && (
          <div className="mt-8 p-4 bg-green-100 rounded-lg text-center">
            <p className="text-green-800">
              Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
            <p className="text-sm text-green-600 mt-2">Redirecting to dashboard...</p>
          </div>
        )}
      </div>
    </main>
  )
}

