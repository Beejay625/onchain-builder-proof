'use client'

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import LoadingSpinner from '@/components/LoadingSpinner'
import { truncateAddress, formatTimestamp } from '@/lib/utils'
import ProfileCard from '@/components/ProfileCard'
import ReactionButton from '@/components/ReactionButton'
import CommentSection from '@/components/CommentSection'
import Analytics from '@/components/Analytics'

// Deployed contract address on Base chain (verified)
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

export default function DashboardPage() {
  const { isConnected, address } = useAccount()
  const router = useRouter()
  const [achievementContent, setAchievementContent] = useState('')
  const [isMinting, setIsMinting] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState<bigint | null>(null)
  const [showAchievements, setShowAchievements] = useState(false)

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
    abi: BuilderProofABI,
    functionName: 'getTotalPosts',
  })

  // Get user's post IDs from blockchain
  const { data: userPostIds } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })

  // Fetch individual post details from chain
  const { data: selectedPost } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: selectedPostId ? [selectedPostId] : undefined,
    query: {
      enabled: !!selectedPostId,
    },
  })

  const handleMintAchievement = async () => {
    if (!achievementContent.trim()) {
      alert('Please enter your achievement to mint onchain')
      return
    }

    setIsMinting(true)
    try {
      // Write achievement directly to blockchain
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [achievementContent],
      })
    } catch (err) {
      console.error('Onchain minting error:', err)
      setIsMinting(false)
    }
  }

  useEffect(() => {
    if (isConfirmed) {
      setIsMinting(false)
      setAchievementContent('')
      alert('🎉 Achievement minted onchain successfully!')
    }
  }, [isConfirmed])

  // View all user achievements from blockchain
  const viewMyAchievements = () => {
    setShowAchievements(!showAchievements)
  }

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
          <h1 className="text-4xl font-bold">⛓️ Builder Dashboard</h1>
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-600">
              {truncateAddress(address)}
            </p>
            <appkit-button />
          </div>
        </div>

        <div className="mb-8">
          <ProfileCard />
        </div>

        <div className="mb-8">
          <Analytics />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">⛓️ Mint Your Weekly Achievement Onchain</h2>
          <p className="text-gray-600 mb-4">
            Record your weekly achievements permanently on Base blockchain via BuilderProof smart contract
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
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
          >
            {isPending || isConfirming || isMinting
              ? '⏳ Minting Onchain...'
              : '⛓️ Mint Achievement Onchain'}
          </button>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-lg">
              ⚠️ Blockchain Error: {error.message}
            </div>
          )}

          {isConfirmed && (
            <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg">
              ✅ Onchain Transaction Confirmed! Your achievement is now permanently recorded on Base blockchain.
              {hash && (
                <p className="text-xs mt-2">
                  <a 
                    href={`https://basescan.org/tx/${hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-green-600"
                  >
                    View on BaseScan ↗
                  </a>
                </p>
              )}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">🏆 Your Onchain Achievements</h2>
            {userPostIds && userPostIds.length > 0 && (
              <button
                onClick={viewMyAchievements}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm"
              >
                {showAchievements ? 'Hide Achievements' : 'View All Onchain'}
              </button>
            )}
          </div>
          {isLoadingPosts ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="flex gap-8 mb-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-blue-600">{totalPosts?.toString() || '0'}</span>
                  <span className="text-sm text-gray-500">Total Onchain</span>
                </div>
                {userPostIds && userPostIds.length > 0 && (
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold text-green-600">{userPostIds.length}</span>
                    <span className="text-sm text-gray-500">Your Achievements</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-400">
                All achievements are permanently stored on Base blockchain at {truncateAddress(CONTRACT_ADDRESS)}
              </p>
              
              {showAchievements && userPostIds && userPostIds.length > 0 && (
                <div className="mt-6 space-y-4">
                  <h3 className="font-semibold text-lg border-t pt-4">Your Minted Achievements</h3>
                  {userPostIds.map((postId) => (
                    <AchievementItem key={postId.toString()} postId={postId} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  )
}

// Component to display individual onchain achievement
function AchievementItem({ postId }: { postId: bigint }) {
  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'
  
  const { data: post, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [postId],
  })

  if (isLoading) {
    return (
      <div className="border border-gray-200 rounded-lg p-4 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    )
  }

  if (!post) return null

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition">
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-semibold text-blue-600">Achievement #{post.id.toString()}</span>
        <span className="text-xs text-gray-500">
          ⛓️ Onchain
        </span>
      </div>
      <p className="text-gray-800 mb-3">{post.content}</p>
      <div className="flex gap-4 items-center border-t pt-3">
        <ReactionButton postId={post.id} currentLikes={post.likes} />
        <span className="text-sm text-gray-500">💬 {post.comments.toString()}</span>
        <span className="text-xs text-gray-400 ml-auto">
          {new Date(Number(post.timestamp) * 1000).toLocaleDateString()}
        </span>
      </div>
      <CommentSection postId={post.id} />
    </div>
  )
}

