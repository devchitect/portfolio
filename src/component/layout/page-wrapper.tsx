

import { ScrollTrigger } from '@/component/layout/scroll-trigger';
//import { useEffect, useLayoutEffect, useState } from 'react';
import { RootState } from '@/app/store/store';
import { useSelector } from 'react-redux';
import PreNavigate from '../prenavigate-loader';
import { motion, AnimatePresence  } from 'framer-motion'
import { usePathname } from 'next/navigation';
import { navigateDelay } from '@/app/layout-client';


const grid = [0,1,2,3,4,5,6,7,8,9];
const gridWidth = '10.15%';

export default function PageWrapper({children} : {children: React.ReactNode}){

    const transitionValue = useSelector((state : RootState) => state.transition.type)

    return (
        <>
        <EnterAnimation/>
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
        {transitionValue === 'exit' && <ExitAnimation/>}
        </>
    )
}

const slideup = {
    initial : {
        translateY: '0%',
        opacity: 0.69, 
    },
    animate : {
        translateY: '100%',
        opacity: 1,

    },
}

const slidedown = {
    initial : {
        translateY: '-100%',
        opacity: 1,
    },
    animate : {
        translateY: '0%',
        opacity: 0.69,
    },
}


function EnterAnimation(){
    const duration = (navigateDelay / 1000) - 0.125, ease = 'easeInOut';
    const delay = 0.1;
    const path = usePathname();
    //'0px','10%','20%','30%','40%','50%','60%','70%','80%','90%'
    return(
        <>
        <AnimatePresence initial={true}>
            <motion.div className='z-40 select-none pointer-events-none fixed top-0 left-0 overflow-hidden h-screen w-screen'
            key={path}>

                {grid.map((x, index) => {
                    return (
                        <motion.div 
                        key={x}
                        style={{left: `${x*10}%`,  width: index === 9 ? '10%' :gridWidth}}
                        className='fixed top-full right-0
                        h-screen bg-[#111111] border border-white border-opacity-10 will-change-transform'
                        variants={slidedown}
                        initial='initial'
                        animate='animate'
                        transition={{delay: delay * x, duration: duration - (delay * x) + delay, ease: ease}}
                        />
                    )
                })}
                <motion.div
                className='fixed bottom-full right-0 left-0 w-screen h-screen z-50'
                initial={{opacity: 1}}
                animate={{opacity: 0}}
                transition={{delay: 0, duration: duration * 0.78, ease: 'easeOut'}}
                >
                    <PreNavigate/>
                </motion.div>

            </motion.div>
        </AnimatePresence>
        </>
    )
}

function ExitAnimation(){
    const duration = (navigateDelay / 1000) - 0.125, ease = 'easeInOut';
    const delay = 0.1;

    return(
        <>
            <motion.div className='z-40 select-none pointer-events-none fixed top-0 left-0 overflow-hidden h-screen w-screen'>
                {grid.map((x, index) => {
                    return (
                        <motion.div 
                            key={x}
                            style={{left: `${x*10}%`,  width: index === 9 ? '10%' :gridWidth}}
                            className='fixed bottom-full right-0  
                            h-screen bg-[#111111] border border-white border-opacity-10 will-change-transform'
                            variants={slideup}
                            initial='initial'
                            animate='animate'
                            transition={{delay: delay * x, duration: duration - (delay * x) + delay, ease: ease}}
                            />
                    )
                })}
            </motion.div>

            <motion.div
                className='fixed bottom-full right-0 left-0 w-screen h-screen z-50'
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: duration * 0.4, duration: duration * 0.6, ease: 'easeIn'}}
                >
                <PreNavigate/>
            </motion.div>
        </>
    )
}

