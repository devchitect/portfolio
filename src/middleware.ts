'use client'

import { NextRequest, NextResponse } from 'next/server'
 
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
 
let headers = { 'accept-language':'en-US,en;q=0.5' }
let languages = new Negotiator({ headers }).languages()
let locales = ['en', 'vn']
let defaultLocale = 'en'

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|favicon.ico).*)',
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    //'/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

function getLocale(request) { 
  return match(languages, locales, defaultLocale);
 }

export function middleware(request: NextRequest) {
 // Check if there is any supported locale in the pathname
 const { pathname } = request.nextUrl
 const pathnameHasLocale = locales.some(
   (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
 )

 if (pathnameHasLocale) return

 //No Redirect for static assets in public folder
 if (/(images|sound)/.exec(pathname)){
  return NextResponse.next();
 }
 
 // Redirect if there is no locale
 const locale = getLocale(request)
 request.nextUrl.pathname = `/${locale}${pathname}`
 // e.g. incoming request is /products --> The new URL is now /en-US/products
 return NextResponse.redirect(request.nextUrl)
}

