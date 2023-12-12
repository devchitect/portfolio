'use client'

import { RootState } from '@/app/redux/store';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence  } from 'framer-motion'
import { usePathname } from 'next/navigation';
import { LibrarySoft } from "../utils/fonts"
import { useEffect } from 'react';

export const navigateDelay = 1250;

const grid = [0,1,2,3,4,5,6,7,8,9];
const gridWidth = '10.15%';

export default function PageTransition (){
    const transitionValue = useSelector((state : RootState) => state.transition.type)

    return (
        <>
            <TransitionAnimation/>
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

function EnterAnimation(){
    const delay = 0.1;
    const duration = (navigateDelay / 1000) - delay, ease = 'easeInOut';
    const path = usePathname();
    //'0px','10%','20%','30%','40%','50%','60%','70%','80%','90%'
    return(
        <AnimatePresence initial={true} >
            <motion.div className='z-40 select-none pointer-events-none fixed top-0 left-0 overflow-hidden h-screen w-screen'
            key={path}>            
                {grid.map((x, index) => {
                    return (
                        <motion.div 
                        key={x}
                        style={{left: `${x*10}%`,  width: index === 9 ? '10%' :gridWidth}}
                        className='fixed bottom-full right-0
                        h-screen bg-[#111111] border border-white border-opacity-10'
                        variants={enter}
                        initial='initial'
                        animate='animate'
                        transition={{delay: delay * x, duration: duration - (delay * x) + delay, ease: ease}}
                        />
                    )
                })}

            </motion.div>
        </AnimatePresence>
    )
}

function ExitAnimation(){
    const delay = 0.1;
    const duration = (navigateDelay / 1000) - delay, ease = 'easeInOut';

    return(
        <>
            <motion.div className='z-40 select-none pointer-events-none fixed top-0 left-0 overflow-hidden h-screen w-screen'>
                {grid.map((x, index) => {
                    return (
                        <motion.div 
                            key={x}
                            style={{left: `${x*10}%`,  width: index === 9 ? '10%' :gridWidth}}
                            className='fixed bottom-full right-0  
                            h-screen bg-[#111111] border border-white border-opacity-10'
                            variants={exit}
                            initial='initial'
                            animate='animate'
                            transition={{delay: delay * x, duration: duration - (delay * x) + delay, ease: ease}}
                            />
                    )
                })}
            </motion.div>
        </>
    )
}


function TransitionAnimation(){
    const delay = 0.1;
    const duration = (navigateDelay / 1000) - delay, ease = 'easeInOut';
    const transitionValue = useSelector((state : RootState) => state.transition.type)
    const pathname = usePathname();

    return(
        <>
            <AnimatePresence initial={true} mode='wait'>
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
                            variants={transitionValue === 'enter' ? enter : exit}
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


function PreNavigate(){

    const endpath = useSelector((state : RootState) => state.transition.endpath)

    return (
        <>
        <div 
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
