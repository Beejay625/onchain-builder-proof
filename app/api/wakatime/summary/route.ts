import { NextResponse } from 'next/server'

interface WakatimeRequest {
  apiKey?: string
  range?: 'today' | 'last_7_days' | 'last_30_days'
}

export async function POST(request: Request) {
  const { apiKey, range = 'last_7_days' } = (await request.json()) as WakatimeRequest

  if (!apiKey) {
    return NextResponse.json({
      summary: buildFallback(range),
      notice: 'API key missing. Showing simulated productivity data.',
    })
  }

  try {
    const params = new URLSearchParams({ range })
    const resp = await fetch(`https://wakatime.com/api/v1/users/current/summaries?${params.toString()}`, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${apiKey}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
    })

    if (!resp.ok) {
      const text = await resp.text()
      return NextResponse.json(
        { error: text || 'Unable to sync with Wakatime.', summary: buildFallback(range) },
        { status: resp.status }
      )
    }

    const data = await resp.json()
    return NextResponse.json({ summary: normalizeResponse(data) })
  } catch (error) {
    console.error('Wakatime sync failed', error)
    return NextResponse.json(
      { error: 'Unexpected error contacting Wakatime.', summary: buildFallback(range) },
      { status: 500 }
    )
  }
}

const buildFallback = (range: string) => ({
  range,
  totalSeconds: 6 * 60 * 60,
  dailyAvgSeconds: 60 * 60,
  topLanguages: [
    { name: 'TypeScript', percent: 48 },
    { name: 'Solidity', percent: 22 },
    { name: 'Markdown', percent: 12 },
  ],
})

const normalizeResponse = (payload: any) => {
  const totalSeconds = payload?.cummulative_total?.seconds ?? 0
  const dailyAvgSeconds = payload?.daily_average ?? 0
  const languages = payload?.data?.[0]?.languages ?? []

  return {
    range: payload?.range,
    totalSeconds,
    dailyAvgSeconds,
    topLanguages: languages.slice(0, 3).map((lang: any) => ({
      name: lang.name,
      percent: Math.round(lang.percent),
    })),
  }
}






