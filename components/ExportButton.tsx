'use client'

interface Achievement {
  id: string
  content: string
  timestamp: number
  likes: number
  comments: number
}

interface ExportButtonProps {
  achievements: Achievement[]
  builderAddress: string
}

export default function ExportButton({ achievements, builderAddress }: ExportButtonProps) {
  const exportToJSON = () => {
    const data = {
      builder: builderAddress,
      totalAchievements: achievements.length,
      exportDate: new Date().toISOString(),
      achievements: achievements.map(a => ({
        id: a.id,
        content: a.content,
        date: new Date(a.timestamp * 1000).toISOString(),
        likes: a.likes,
        comments: a.comments,
      })),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `builder-achievements-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportToCSV = () => {
    const headers = ['ID', 'Content', 'Date', 'Likes', 'Comments']
    const rows = achievements.map(a => [
      a.id,
      `"${a.content.replace(/"/g, '""')}"`,
      new Date(a.timestamp * 1000).toISOString(),
      a.likes.toString(),
      a.comments.toString(),
    ])

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `builder-achievements-${Date.now()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={exportToJSON}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm"
      >
        📥 Export JSON
      </button>
      <button
        onClick={exportToCSV}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
      >
        📊 Export CSV
      </button>
    </div>
  )
}
