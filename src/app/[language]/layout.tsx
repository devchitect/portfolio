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
  description: '',
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


export default function Root({
  children, params
}: {
  children: React.ReactNode,
  params: Record<string, string>
}) {

  return (
    <html lang={params.language} suppressHydrationWarning={true}>
      <head>
        <script async type="text/javascript" src='/script/initialize.js'/>
      </head>
      <body className=''>
        <Providers>
          <>
          <div 
          className='root-layout relative flex flex-col justify-between 
          '>   
            <>
            <Header /> 
            <PageWrapper>
              <Suspense fallback={<Loading/>}>
              {children}
              </Suspense>
            </PageWrapper>   
            <Footer/>    
            </>     
          </div>
          </>

          <DynamicScrollbar/>
          <DynamicCursor/>
          <DynamicParticles/> 

        </Providers>
        <Background/>

        {/* <RootLayoutClientComponent lang = {params.language}>{children}</RootLayoutClientComponent> */}
      </body>
    </html>
  )
}


function Background(){
  return(
    <>
      <div className="overlay-background sm:opacity-20"/>
    </>
  )
}

