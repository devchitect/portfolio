import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

import '@/styles/root-layout.scss'
import '@/styles/globals.scss'

import { Providers } from '@/component/layout/providers'
import { Suspense } from "react";
import Header from '@/component/layout/header'
import Loading from './loading';
import PageWrapper from "@/component/layout/page-wrapper";

import Footer from '@/component/layout/footer';

export const metadata: Metadata = {
  title: 'Dzung Nguyen',
  description: 'Portfolio',
}

//Code Splitting & Lazy Loading
const DynamicParticles = dynamic(() => import('../../component/layout/particles-container'), {
  loading: () => null,
  ssr: false 
})

const DynamicCursor = dynamic(() => import('../../component/utils/cursor'), {
  loading: () => null,
  ssr: false
})

const DynamicScrollbar = dynamic(() => import('../../component/utils/custom-scrollbar'), {
  loading: () => null,
  ssr: false
})

const DynamicFooter = dynamic(() => import('../../component/layout/footer'), {
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
      <body className=''>
        <Providers>
          <>
          <div 
          className='root-layout relative flex flex-col justify-between 
          '>   
            <>
            <Header lang={params.language}/> 
            <PageWrapper>
              <Suspense fallback={<Loading/>}>
              {children}
              </Suspense>
            </PageWrapper>   
            <DynamicFooter/>    
            </>     
          </div>
          </>

          <DynamicScrollbar/>
          <DynamicCursor/>
          <DynamicParticles/> 

        </Providers>
        <Background/>
      </body>
    </html>
  )
}


function Background(){
  const grid = [0,1,2,3,4,5,6,7,8,9];

  return(
    <>
      <div className="overlay-background sm:opacity-20"/>
      <div className='-z-30 opacity-[0.05]'>
                {grid.map((x) => {
                    return (
                        <div key={x}
                            style={{left: `${x*10}%`}}
                            className='fixed top-0 right-0 h-screen w-[10%] select-none pointer-events-none
                            border-x border-black dark:border-white'
                            
                        />
                    )
                })}          
            </div>
            
    </>
  )
}

