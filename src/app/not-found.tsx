'use client'

import { usePageNavigate } from "@/component/custom-hook/use-page_navigate"
import { PPTelegrafUltrabold, InterBold } from "@/component/utils/fonts";
import Magnetic from "@/component/utils/magnetic";
import MarqueeMotion from "@/component/utils/marquee-motion";

export default function NotFound404(){
    const navigate = usePageNavigate();

    return(
        <>
            <main
            className="h-[90vh] flex flex-col items-center justify-center
            "
            >
                <h1
                className={` ${PPTelegrafUltrabold.className} text-[8.2rem] text-gradient`}
                >Oops!</h1>
                <h1
                className={` ${PPTelegrafUltrabold.className} text-[2rem]`}
                >Looks like you&apos;re lost!</h1>
                <div 
                className="border-y-4 border-double border-black my-16 bg-[#ffe600] bg-opacity-80"
                >
                <MarqueeMotion baseVelocity={2}>
                    <span
                    className={` ${PPTelegrafUltrabold.className} inline-block
                    text-[60px] text-black py-8
                    `}
                    >404 - Page not found&nbsp;</span>
                    <span className="inline-block px-14 text-[80px]">&#x1F6A7;</span>
                </MarqueeMotion>
                </div>
                <div 
                className={` 
                lg:mx-auto lg:mt-10 lg:py-0 origin-center
                sm:ml-auto sm:mx-per10 sm:py-10 will-change-transform
                `}>
                    <Magnetic>
                    <span 
                    onClick={() => {navigate('/')}}
                    className='relative flex items-center justify-center rounded-md overflow-hidden text-center origin-center duration-300 glassmorphism
                    border-themeColor border-1 border-solid 
                    bg-[#ffffff78] dark:bg-[#00000078]  dark:shadow-[#ffffff81] shadow-[#00000050]
                    text-themeColor
                    xl:text-[1.3rem] 
                    lg:text-[1.1rem] 
                    sm:text-md 
                    hover:text-white hover:shadow-md
                    before:content-[""] before:absolute before:left-0 before:top-0 before:h-0 before:w-full before:duration-[500ms] before:z-2 before:rounded-md
                    before:bg-themeColor before:opacity-80
                    hover:before:h-full hover:before:top-[unset] hover:before:bottom-0
                    '
                    >
                        <span className={`${InterBold.className} inline-block p-5 z-3 w-full h-full`}>RETURN HOMEPAGE!</span>
                    </span>
                    </Magnetic>
                </div>
            </main> 
        </>
    )
}