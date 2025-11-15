'use client'

interface AchievementCardProps {
  id: string
  content: string
  timestamp: number
  likes: number
  comments: number
}

export default function AchievementCard({ id, content, timestamp, likes, comments }: AchievementCardProps) {
  const date = new Date(Number(timestamp) * 1000)
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm text-gray-500">Achievement #{id}</span>
        <span className="text-sm text-gray-500">
          {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </span>
      </div>
      <p className="text-gray-800 mb-4">{content}</p>
      <div className="flex gap-4 text-sm text-gray-600">
        <span>👍 {likes} likes</span>
        <span>💬 {comments} comments</span>
      </div>
    </div>
  )
}

