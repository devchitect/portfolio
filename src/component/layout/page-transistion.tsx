'use client'

import { RootState } from '@/app/redux/store';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence, useAnimate } from 'framer-motion'
import { usePathname } from 'next/navigation';
import { LibrarySoft } from "../utils/fonts"
import { useCallback, useEffect, useRef } from 'react';

export const navigateDelay = 1250;

const grid = [0,1,2,3,4,5,6,7,8,9];
const gridWidth = '10.15%';

export default function PageTransition (){
    const transition = useSelector((state : RootState) => state.transition.type)

    return (
        <>
            <TransitionAnimation/>
            <RouteNotification/>
        </>
    )
}


const exit = {
    initial : {
        y: '0%',
        opacity: 0.69, 
    },
    animate : {
        y: '100%',
        opacity: 1,
    },
}

const enter = {
    initial : {
        y: '100%',
        opacity: 1,
    },
    animate : {
        y: '0%',
        opacity: 0.69,
    },
}

function TransitionAnimation(){
    const delay = 0.1;
    const duration = (navigateDelay / 1000) - delay, ease = 'easeInOut';
    const transition = useSelector((state : RootState) => state.transition.type)
    const pathname = usePathname();

    return(
        <>
            <AnimatePresence initial={false} mode='wait'>
            <motion.div 
            key={pathname}
            className='z-40 select-none pointer-events-none fixed top-0 left-0 overflow-hidden h-screen w-screen'>
                {grid.map((x, index) => {
                    return (
                        <motion.div 
                        key={x}
                        style={{left: `${x*10}%`,  width: index === 9 ? '10%' :gridWidth}}
                        className='fixed bottom-full right-0  
                        h-screen bg-[#111111] border border-white border-opacity-10'
                        variants={transition === 'enter' ? enter : exit}
                        initial='initial'
                        animate='animate'
                        transition={{delay: delay * x, duration: duration - (delay * x) + delay, ease: ease}}
                        />
                    )
                })}
            </motion.div>
            </AnimatePresence>
        </>
    )
}


function RouteNotification(){
    const duration = (navigateDelay / 1000) * 2, ease = 'easeInOut';
    const endpath = useSelector((state : RootState) => state.transition.endpath)
    const transition = useSelector((state : RootState) => state.transition.type)
    const [scope, animate] = useAnimate();

    useEffect(() => {
        if(transition === 'exit'){
            animate(scope.current, { opacity: [0,1,0] }, { duration: duration, ease: ease, times: [0,0.5,1] })
        }
    },[animate, scope, duration, transition])

    return (
        <>
        <div 
        ref={scope}
        className='fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center pointer-events-none'
        >
            <div className='relative text-center'>
                <div className='absolute w-full h-full flex justify-center items-center pointer-events-none select-none'>
                    <div 
                    className='float-bg-gradient h-[50%] w-[100%] rounded-[60%] opacity-80'/>
                </div>

                <div className={`${LibrarySoft.className}`}>
                    <span className='loader-text inline-block 
                    xl:text-[130px]
                    lg:text-[5.5rem]
                    sm:text-[3.3rem]
                    '>{endpath}</span>
                </div>
            </div>         
        </div>
        </>
    )
}
