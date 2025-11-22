import { NextResponse } from 'next/server'
import type { DraftSuggestionResponse, ToneStyle } from '@/types'

interface DraftRequestPayload {
  context?: string
  highlights?: string[]
  tone?: ToneStyle
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as DraftRequestPayload
    const context = body.context?.trim()

    if (!context) {
      return NextResponse.json({ error: 'Context is required to generate a draft.' }, { status: 400 })
    }

    const tone = body.tone ?? 'concise'
    const highlights = Array.isArray(body.highlights) ? body.highlights.filter(Boolean) : []

    const suggestion = await generateDraftSuggestion({ context, highlights, tone })
    return NextResponse.json(suggestion)
  } catch (error) {
    console.error('AI draft generation failed:', error)
    return NextResponse.json(
      { error: 'Unable to generate draft right now. Please try again shortly.' },
      { status: 500 }
    )
  }
}

async function generateDraftSuggestion({
  context,
  highlights,
  tone,
}: {
  context: string
  highlights: string[]
  tone: ToneStyle
}): Promise<DraftSuggestionResponse> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return buildFallbackDraft({ context, highlights, tone, confidence: 0.35 })
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              'You convert raw builder notes into polished onchain achievement statements. Respond with 2 sentences.',
          },
          {
            role: 'user',
            content: buildPrompt({ context, highlights, tone }),
          },
        ],
        temperature: 0.4,
        max_tokens: 250,
      }),
    })

    if (!response.ok) {
      console.warn('OpenAI response not ok', await response.text())
      return buildFallbackDraft({ context, highlights, tone, confidence: 0.4 })
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content?.trim()

    if (!content) {
      return buildFallbackDraft({ context, highlights, tone, confidence: 0.4 })
    }

    return {
      suggestion: content,
      highlights,
      tone,
      confidence: 0.92,
      createdAt: Date.now(),
    }
  } catch (error) {
    console.error('OpenAI generation error:', error)
    return buildFallbackDraft({ context, highlights, tone, confidence: 0.3 })
  }
}

function buildFallbackDraft({
  context,
  highlights,
  tone,
  confidence,
}: {
  context: string
  highlights: string[]
  tone: ToneStyle
  confidence: number
}): DraftSuggestionResponse {
  const toneDescriptor =
    tone === 'celebratory'
      ? 'highlighting the win'
      : tone === 'technical'
      ? 'sharing the technical specifics'
      : tone === 'detailed'
      ? 'calling out the journey'
      : 'keeping it short'

  const highlightLine =
    highlights.length > 0 ? ` Reinforced impact by ${highlights.join(', ')}.` : ''

  const suggestion = `Minted progress by ${context.trim()}. Stayed ${toneDescriptor} and anchored it to onchain accountability.${highlightLine}`

  return {
    suggestion,
    highlights,
    tone,
    confidence,
    createdAt: Date.now(),
  }
}

function buildPrompt({ context, highlights, tone }: { context: string; highlights: string[]; tone: ToneStyle }) {
  return `
You are helping a builder mint their achievement onchain.

Tone: ${tone}.
Context: ${context}.
Recent highlights: ${highlights.join(' | ') || 'none'}.

Respond with a concise, two-sentence summary emphasizing impact and verifiable details.
`
}


