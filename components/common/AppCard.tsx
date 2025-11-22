'use client'

import type { ReactNode } from 'react'

type Accent = 'default' | 'blue' | 'purple' | 'green' | 'orange'

const accentClasses: Record<Accent, string> = {
  default: 'border-gray-100',
  blue: 'border-blue-100',
  purple: 'border-purple-100',
  green: 'border-green-100',
  orange: 'border-orange-100',
}

interface AppCardProps {
  title?: string
  subtitle?: string
  accent?: Accent
  actions?: ReactNode
  children: ReactNode
  className?: string
  padding?: 'normal' | 'dense'
}

export default function AppCard({
  title,
  subtitle,
  accent = 'default',
  actions,
  children,
  className,
  padding = 'normal',
}: AppCardProps) {
  const baseClass = [
    'bg-white',
    'rounded-2xl',
    'border',
    'shadow-sm',
    accentClasses[accent],
    padding === 'dense' ? 'p-4' : 'p-6',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section className={baseClass}>
      {(title || actions) && (
        <header className="mb-4 flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[200px]">
            {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </header>
      )}
      {children}
    </section>
  )
}


