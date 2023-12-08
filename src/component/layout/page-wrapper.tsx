'use client'

import { ScrollTrigger } from '@/component/layout/scroll-trigger';
//import { useEffect, useLayoutEffect, useState } from 'react';
import PageTransition from './page-transistion';

const grid = [0,1,2,3,4,5,6,7,8,9];


export default function PageWrapper({children} : {children: React.ReactNode}){


    return (
        <>
        <PageTransition/>
        <div>
            <div className='-z-10 opacity-[0.1]'>
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
            
            <>
            {children}
            </>

        </div>
        <ScrollTrigger/>
        
        </>
    )
}
