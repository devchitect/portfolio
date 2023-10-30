'use client'

import { useSelector } from "react-redux"
import { RootState } from "@/app/store/store"

export default function Preloader(){
    return (
        <>
            <Content/>
        </>
    )
}

function Content(){

    const endpath = useSelector((state : RootState) => state.transition.endpath)

    return(
        <>
        <div 
        className='fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center pointer-events-none'
        >
            <div className='relative text-center'>
                <div className='absolute w-full h-full flex justify-center items-center pointer-events-none select-none -z-1'>
                    <div 
                    className='float-bg-gradient h-[50%] w-[100%] rounded-[60%] opacity-80'/>
                </div>

                <div className="font-l3">
                    <span className='loader-text inline-block relative
                    xl:text-[110px]
                    lg:text-[5.5rem]
                    sm:text-[3.3rem]
                    '>{endpath}</span>
                </div>
            </div>
            
            {/* <div className='fixed top-0 left-0 w-screen h-screen bg-black -z-10 opacity-0'/> */}
        </div>
        </>
    )
}

