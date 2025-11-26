'use client'

import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
  align?: 'left' | 'center'
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  actions,
  align = 'left',
}: SectionHeadingProps) {
  const alignmentClass = align === 'center' ? 'text-center' : 'text-left'
  const containerClass =
    align === 'center' ? 'flex flex-col items-center gap-4' : 'flex flex-wrap items-center gap-4'

  return (
    <div className={containerClass}>
      <div className={`flex-1 min-w-[200px] ${alignmentClass}`}>
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">{eyebrow}</p>}
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}





