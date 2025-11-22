'use client'

import { useEffect, useMemo, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import AppCard from '@/components/common/AppCard'
import EmptyState from '@/components/common/EmptyState'
import type { DraftSuggestionResponse, ToneStyle } from '@/types'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementDraftAssistantProps {
  isOpen: boolean
  onClose: () => void
  onApplyDraft: (draft: string) => void
  lastAchievement?: string
  recentHighlights?: string[]
}

interface DraftPayload {
  context: string
  tone: ToneStyle
  highlights: string[]
}

const toneLabels: Record<ToneStyle, string> = {
  concise: 'Concise',
  detailed: 'Detailed',
  celebratory: 'Celebratory',
  technical: 'Technical',
}

export default function AchievementDraftAssistant({
  isOpen,
  onClose,
  onApplyDraft,
  lastAchievement = '',
  recentHighlights = [],
}: AchievementDraftAssistantProps) {
  const [context, setContext] = useState(lastAchievement)
  const [tone, setTone] = useState<ToneStyle>('concise')

  useEffect(() => {
    if (isOpen) {
      setContext(lastAchievement)
    }
  }, [isOpen, lastAchievement])

  const highlights = useMemo(() => recentHighlights.slice(-3), [recentHighlights])

  const mutation = useMutation<DraftSuggestionResponse, Error, DraftPayload>({
    mutationFn: async (payload) => {
      const response = await fetch('/api/ai-draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Unable to generate draft right now.')
      }

      return response.json()
    },
  })

  if (!isFeatureEnabled('aiDraftAssistant')) {
    return null
  }

  if (!isOpen) {
    return null
  }

  const handleSubmit = () => {
    mutation.mutate({
      context,
      tone,
      highlights,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      <AppCard
        title="AI Achievement Draft Assistant"
        subtitle="Describe what you built and let the assistant polish it for the chain."
        className="relative z-10 w-full max-w-2xl"
        accent="blue"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              What should we highlight?
            </label>
            <textarea
              value={context}
              onChange={(event) => setContext(event.target.value)}
              rows={4}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="Shipped a deployment pipeline that autosigns Base transactions..."
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">Tone</p>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(toneLabels) as ToneStyle[]).map((toneValue) => {
                const isActive = tone === toneValue
                return (
                  <button
                    key={toneValue}
                    type="button"
                    onClick={() => setTone(toneValue)}
                    className={`rounded-full border px-4 py-1 text-sm font-medium transition ${
                      isActive
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-600 hover:border-blue-200'
                    }`}
                  >
                    {toneLabels[toneValue]}
                  </button>
                )
              })}
            </div>
          </div>

          {highlights.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700">Recent achievements</p>
              <div className="flex flex-wrap gap-2">
                {highlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={mutation.isPending || !context.trim()}
              className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {mutation.isPending ? 'Generating draft…' : 'Generate draft'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 hover:border-gray-300"
            >
              Close
            </button>
          </div>

          {mutation.isError && (
            <EmptyState
              icon="⚠️"
              title="Generation failed"
              description={mutation.error.message || 'Please try again in a few seconds.'}
              compact
              action={
                <button
                  type="button"
                  onClick={() => mutation.reset()}
                  className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-700 hover:border-gray-300"
                >
                  Dismiss
                </button>
              }
            />
          )}

          {mutation.data && (
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-700">Suggested draft</p>
                <span className="text-xs text-gray-400">
                  tone: {toneLabels[mutation.data.tone]} · confidence {Math.round(mutation.data.confidence * 100)}%
                </span>
              </div>

              <p className="mt-3 whitespace-pre-line text-sm text-gray-800">{mutation.data.suggestion}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onApplyDraft(mutation.data.suggestion)
                    onClose()
                  }}
                  className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700"
                >
                  Use this draft
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof navigator !== 'undefined' && mutation.data?.suggestion) {
                      navigator.clipboard?.writeText(mutation.data.suggestion)
                    }
                  }}
                  className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-gray-300"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>
      </AppCard>
    </div>
  )
}


