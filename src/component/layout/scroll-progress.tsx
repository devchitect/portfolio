'use client'

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function ScrollProgress(){

    const progressLine = useRef<any>(null);
    const path = usePathname();

    function resetProgress(){
        progressLine.current.style.transform = `translateX(-100%)`;
    }

    useEffect(() => {
        resetProgress()
    },[path])

    useEffect(() => {

        const  scrollProgress =() => {
            const { scrollTop , scrollHeight} = document.documentElement;
            const scrolled = (scrollTop / (scrollHeight - window.innerHeight)) * 100;

            progressLine.current.style.transform = `translateX(${-(100-scrolled)}%)`;
        }

        window.addEventListener('scroll', scrollProgress);
        return () => {
            window.removeEventListener('scroll', scrollProgress);
        }
    },[])

 
    return(
        <>
            <div 
            className="fixed flex flex-col items-center w-full 
            h-[0.5rem] left-0 bottom-0 z-5 pointer-events-none opacity-[0.8] overflow-hidden ">
                <div ref={progressLine}
                className="scroll-progress h-1/2 w-full bg-themeColor rounded-r-lg ease-out duration-300 translate-x-[-100%] "/>
            </div>
        </>
    )
}
