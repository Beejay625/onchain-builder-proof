'use client'

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SocialMediaContractABI } from '@/abi/SocialMediaContract'
import LoadingSpinner from '@/components/LoadingSpinner'

// Replace with your deployed contract address
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000'

export default function DashboardPage() {
  const { isConnected, address } = useAccount()
  const router = useRouter()
  const [achievementContent, setAchievementContent] = useState('')
  const [isMinting, setIsMinting] = useState(false)

  const { writeContract, data: hash, isPending, error } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({
      hash,
    })

  // Redirect if not connected
  useEffect(() => {
    if (!isConnected) {
      router.push('/login')
    }
  }, [isConnected, router])

  // Get user's posts/achievements
  const { data: totalPosts, isLoading: isLoadingPosts } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: SocialMediaContractABI,
    functionName: 'getTotalPosts',
  })

  // Get user's post IDs
  const { data: userPostIds } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: SocialMediaContractABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })

  const handleMintAchievement = async () => {
    if (!achievementContent.trim()) {
      alert('Please enter your achievement')
      return
    }

    setIsMinting(true)
    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: SocialMediaContractABI,
        functionName: 'createPost',
        args: [achievementContent],
      })
    } catch (err) {
      console.error('Error minting:', err)
      setIsMinting(false)
    }
  }

  useEffect(() => {
    if (isConfirmed) {
      setIsMinting(false)
      setAchievementContent('')
      alert('Achievement minted successfully!')
    }
  }, [isConfirmed])

  if (!isConnected) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <p>Please connect your wallet first</p>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-4xl w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Builder Dashboard</h1>
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-600">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
            <appkit-button />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Mint Your Weekly Achievement</h2>
          <p className="text-gray-600 mb-4">
            Share your weekly achievements and mint them onchain via Talenty Protocol
          </p>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Achievement Description
            </label>
            <textarea
              value={achievementContent}
              onChange={(e) => setAchievementContent(e.target.value)}
              placeholder="Describe your achievement for this week..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={5}
            />
          </div>

          <button
            onClick={handleMintAchievement}
            disabled={isPending || isConfirming || isMinting}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isPending || isConfirming || isMinting
              ? 'Minting...'
              : 'Mint Achievement'}
          </button>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-lg">
              Error: {error.message}
            </div>
          )}

          {isConfirmed && (
            <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg">
              Transaction confirmed! Achievement minted successfully.
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Your Achievements</h2>
          {isLoadingPosts ? (
            <LoadingSpinner />
          ) : (
            <>
              <p className="text-gray-600 mb-4">
                Total achievements minted: {totalPosts?.toString() || '0'}
              </p>
              {userPostIds && userPostIds.length > 0 && (
                <p className="text-sm text-gray-500">
                  Your personal achievements: {userPostIds.length}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  )
}

