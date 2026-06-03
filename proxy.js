import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

const protectedRoutes = [
  '/dashboard', '/budget', '/cards', '/family', '/ai-coach',
  '/credit', '/invest', '/feed', '/onboarding',
]

const publicRoutes = ['/', '/login', '/pricing', '/privacy', '/terms']

export async function middleware(request) {
  let response = NextResponse.next({ request: { headers: request.headers } })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder',
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()
  const path = request.nextUrl.pathname
  const isProtected = protectedRoutes.some(r => path === r || path.startsWith(`${r}/`))
  const isPublic = publicRoutes.some(r => path === r)
  const isDemo = request.cookies.get('vitrix_demo')?.value === '1'

  if (isProtected && !session && !isDemo) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (path === '/login' && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
