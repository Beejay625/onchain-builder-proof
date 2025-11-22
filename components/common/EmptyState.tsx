'use client'

import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: string
  title: string
  description: string
  action?: ReactNode
  compact?: boolean
}

export default function EmptyState({
  icon = '✨',
  title,
  description,
  action,
  compact = false,
}: EmptyStateProps) {
  return (
    <div
      className={`border border-dashed border-gray-200 rounded-2xl text-center ${
        compact ? 'p-6' : 'p-8'
      } bg-gray-50`}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  )
}



