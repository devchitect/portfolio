'use client'

import { RootState } from '@/app/redux/store';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence, useAnimate } from 'framer-motion'
import { usePathname } from 'next/navigation';
import { LibrarySoft } from "./fonts"
import { useEffect } from 'react';

export const navigateDelay = 1500;

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
    },
    animate : {
        y: '100%',
    },
}

const enter = {
    initial : {
        y: '100%',
    },
    animate : {
        y: '0%',
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
                        className='fixed bottom-full right-0 border-2 border-[#11111120] dark:border-[#f0f0f010] 
                        h-screen bg-gradient-to-b 
                        from-[#ffffff] to-[#dddddd] 
                        dark:from-[#000000] dark:to-[#111111]'
                        variants={transition === 'enter' ? enter : exit}
                        initial='initial'
                        animate='animate'
                        transition={{delay: delay * x, duration: duration - (delay * x), ease: ease}}
                        />
                    )
                })}
            </motion.div>
            </AnimatePresence>
        </>
    )
}


function RouteNotification(){
    const duration = (navigateDelay / 1000) * 2, ease = 'easeIn', delay = 0.2;
    const endpath = useSelector((state : RootState) => state.transition.endpath)
    const transition = useSelector((state : RootState) => state.transition.type)

    const [scope, animate] = useAnimate();

    useEffect(() => {
        if(transition === 'exit'){
            const animation = animate(scope.current, { opacity: [0,1,0] }, { delay: delay, duration: duration - (delay), ease: ease, times: [0,0.5,1] })
        }
    },[animate, scope, duration, transition])

    return (
        <>
        <div 
        ref={scope}
        className='fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center pointer-events-none select-none'
        >
            <div className='relative text-center'>
                <div className='absolute w-full h-full flex justify-center items-center pointer-events-none select-none'>
                    <div 
                    className='float-bg-gradient h-[50%] w-[100%] rounded-[60%] opacity-70'/>
                </div>

                <div className={`${LibrarySoft.className}`}>
                    <span className='loader-text inline-block 
                    xl:text-[155px]
                    lg:text-[5.5rem]
                    sm:text-[3.3rem]
                    '>{endpath}</span>
                </div>
            </div>         
        </div>
        </>
    )
}
