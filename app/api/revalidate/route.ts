import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import settings from '../../conf/environment';

export async function POST(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  const secret = requestHeaders.get('x-vercel-reval-key')

  if (secret === settings.update_token) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  revalidateTag('')
  // await res.revalidate('/path-to-revalidate')

  return NextResponse.json({ revalidated: true, now: Date.now() })
}
