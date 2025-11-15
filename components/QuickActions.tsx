'use client'

import Link from 'next/link'

export default function QuickActions() {
  const actions = [
    { label: 'Mint Achievement', icon: '⛓️', href: '/dashboard', color: 'blue' },
    { label: 'View Leaderboard', icon: '🏆', href: '#leaderboard', color: 'yellow' },
    { label: 'My Profile', icon: '👤', href: '#profile', color: 'purple' },
    { label: 'Explore', icon: '🔍', href: '#explore', color: 'green' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action) => (
        <Link
          key={action.label}
          href={action.href}
          className={`p-6 bg-${action.color}-50 hover:bg-${action.color}-100 rounded-lg transition text-center border-2 border-${action.color}-200 hover:border-${action.color}-400`}
        >
          <div className="text-4xl mb-2">{action.icon}</div>
          <div className="text-sm font-semibold">{action.label}</div>
        </Link>
      ))}
    </div>
  )
}
