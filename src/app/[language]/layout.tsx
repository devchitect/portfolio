import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

import '@/styles/layout.scss'
import '@/styles/globals.scss'

import { Providers } from '@/component/context/providers'
import { Suspense } from "react";
import Header from '@/component/layout/header'
//import Footer from '@/component/layout/footer'

import Loading from './loading';
import PageWrapper from "@/component/layout/page-wrapper";
import { InterRegular } from '@/component/layout/fonts'

export const metadata: Metadata = {
  title: 'Dzung Nguyen',
  description: 'Portfolio',
}

//Code Splitting & Lazy Loading
const DynamicCursor = dynamic(() => import('../../component/layout/cursor'), {
  loading: () => null,
  ssr: false
})

const DynamicScrollbar = dynamic(() => import('../../component/layout/custom-scrollbar'), {
  loading: () => null,
  ssr: false
})

const DynamicFooter = dynamic(() => import('../../component/layout/footer'), {
  loading: () => null,
  ssr: false
})

const DynamicScrollProgress = dynamic(() => import('../../component/layout/scroll-progress'), {
  loading: () => null,
  ssr: false 
})

function initializeThemeBeforeRender() {
  return {
    __html: `try {
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    } catch (_) {}`
  };
}

export default function Root({
  children, params
}: {
  children: React.ReactNode,
  params: Record<string, string>
}) {

  return (
    <html lang={params.language} suppressHydrationWarning={true}>
      <head>
        <script 
        dangerouslySetInnerHTML={initializeThemeBeforeRender()}/>
      </head>
      <body className={`${InterRegular.className}`}>
        <Providers lang={params.language}>

          <div 
          className='root-layout relative flex flex-col justify-between 
          '>   
            <Header/> 
            <PageWrapper>
              <Suspense fallback={<Loading/>}>
              {children}
              </Suspense>
            </PageWrapper>   
            <DynamicFooter/>    
          </div>

          <DynamicScrollProgress/>
          <DynamicScrollbar/>
          <DynamicCursor/>

        </Providers>
      </body>
    </html>
  )
}

