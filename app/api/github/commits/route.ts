import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const repo = request.nextUrl.searchParams.get('repo')
  const token = request.nextUrl.searchParams.get('token')

  if (!repo) {
    return NextResponse.json({ error: 'repo parameter is required (e.g. owner/name).' }, { status: 400 })
  }

  try {
    const headers: Record<string, string> = { 'User-Agent': 'onchain-builder-proof' }
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=5`, {
      headers,
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      const text = await response.text()
      return NextResponse.json({ error: text || 'Unable to fetch commits from GitHub.' }, { status: response.status })
    }

    const data = await response.json()
    const commits = (Array.isArray(data) ? data : []).map((commit: any) => ({
      sha: commit.sha,
      message: commit.commit?.message,
      author: commit.commit?.author?.name,
      url: commit.html_url,
      timestamp: commit.commit?.author?.date,
    }))

    return NextResponse.json({ commits })
  } catch (error) {
    console.error('GitHub fetch failed:', error)
    return NextResponse.json({ error: 'Unexpected error contacting GitHub.' }, { status: 500 })
  }
}



