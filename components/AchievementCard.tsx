'use client'

import { getTimeAgo } from '@/lib/utils'

interface AchievementCardProps {
  id: string
  content: string
  timestamp: number
  likes: number
  comments: number
  author?: string
  onchain?: boolean
}

export default function AchievementCard({ 
  id, 
  content, 
  timestamp, 
  likes, 
  comments,
  author,
  onchain = true
}: AchievementCardProps) {
  const date = new Date(Number(timestamp) * 1000)
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 border-2 border-gray-200 hover:border-blue-300 transition">
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="text-sm font-semibold text-blue-600">Achievement #{id}</span>
          {onchain && (
            <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              ⛓️ Onchain
            </span>
          )}
        </div>
        <span className="text-xs text-gray-500">
          {getTimeAgo(timestamp)}
        </span>
      </div>
      {author && (
        <p className="text-xs text-gray-500 mb-2">By {author}</p>
      )}
      <p className="text-gray-800 mb-4 leading-relaxed">{content}</p>
      <div className="flex gap-6 text-sm text-gray-600 border-t pt-3">
        <span className="flex items-center gap-1">
          <span>❤️</span> {likes}
        </span>
        <span className="flex items-center gap-1">
          <span>💬</span> {comments}
        </span>
        <span className="ml-auto text-xs text-gray-400">
          {date.toLocaleDateString()}
        </span>
      </div>
    </div>
  )
}

