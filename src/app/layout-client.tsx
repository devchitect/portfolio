'use client'

import '../styles/root-layout.scss'
import '../styles/globals.scss'

import dynamic from 'next/dynamic'
import { Suspense, useCallback, useEffect, useRef } from "react";
import Header from '@/component/layout/header'
import Loading from './loading';
import PageWrapper from "@/component/page-wrapper";
import { Provider } from 'react-redux'
import { store } from '@/app/store/store'
import Footer from '@/component/layout/footer';

import { MomentumScrolling } from '@/component/momentum-scrolling';

export const navigateDelay = 1500;

//Code Splitting & Lazy Loading
const DynamicParticles = dynamic(() => import('../component/layout/particles-container'), {
  loading: () => null,
  ssr: false 
})

const DynamicCursor = dynamic(() => import('../component/utils/cursor'), {
  loading: () => null,
  ssr: false
})

const DynamicScrollbar = dynamic(() => import('../component/utils/custom-scrollbar'), {
  loading: () => null,
  ssr: false
})

export default function RootLayoutClientComponent({children}: {children: React.ReactNode}){

  return (
    <>
      <Provider store={store}>
        
        <>
        <div 
        className='root-layout relative flex flex-col justify-between 
        '>   
          <>
          <Header/> 
          <PageWrapper>
            <Suspense fallback={<Loading/>}>
            {children}
            </Suspense>
          </PageWrapper>   
          <Footer/>    
          </>     
        </div>
        </>

        <MomentumScrolling/>
        <DynamicScrollbar/>
        <DynamicCursor/>
        <DynamicParticles/> 

      </Provider>

      <Background/>
    </>
  )
}

function Background(){
  return(
    <>
      <div className="overlay-background sm:opacity-20"/>
    </>
  )
}

