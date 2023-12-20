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
            h-[0.69rem] left-0 bottom-0 z-5 pointer-events-none opacity-[0.9] overflow-hidden ">
                <div ref={progressLine}
                className="scroll-progress h-1/2 my-auto w-full bg-themeColor ease-out duration-300  "/>
            </div>
        </>
    )
}
