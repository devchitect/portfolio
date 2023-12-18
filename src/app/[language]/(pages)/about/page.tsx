'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'

import '@/styles/pages/about.scss'

import { LibraryRegular, NeueMachinaUltraBold } from '@/component/layout/fonts'
import { Icon } from '@iconify/react/dist/iconify.js'
import MarqueeMotion from '@/component/utils/marquee-motion'

const DynamicStaggeredText = dynamic(() => import('../../../../component/utils/staggered-text'), {
  loading: () => null,
  ssr: false
})


export default function About({params: {language}}) {

    return (
        <main>
            <Introduce/>
            <Details/>
            <Skills/>
        </main>
    )
  }


  function Introduce(){
    return (
      <>
        <div className=' min-h-[95vh]'>
          <div className='my-20 relative'>
            <div className='relative w-[35%] mx-auto corner-border floating'>
            <Image
            priority={true}
            src={`/images/me.jpg`}
            alt="Picture of the author"
            width={500}
            height={500}
            className='w-full h-auto'
            />                
            </div>

            <div
            className={` absolute -bottom-[15%] ${LibraryRegular.className}
            leading-none opacity-90 duration-300 tracking-[-0.5rem] 
            lg:text-[200px]
            sm:text-[100px] 
            `}
            >
              <MarqueeMotion baseVelocity={3}><span>Dzung Nguyen</span><span className='inline-block scale-75 px-10'>+</span></MarqueeMotion>
            </div>
          </div>
        </div>
      </>
    )
  }

  function Details(){
    return (
      <>
        <div className='px-[10%] my-20'>
          <div className={`${NeueMachinaUltraBold.className} relative
          lg:text-[40px]
          before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:dark:bg-white before:bg-black before:opacity-80
          `}>
             <DynamicStaggeredText 
                text={[
                  "MORE ABOUT ME",
                ]}
                repeatDelay={5000}
              />
            </div>
          <div>

          </div>
        </div>
      </>
    )
  }
  
  function Skills(){
    return (
      <>
         <div className='px-[10%]'>
          <div className={`${NeueMachinaUltraBold.className} relative
          lg:text-[40px]
          before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:dark:bg-white before:bg-black before:opacity-80
          `}>
             <DynamicStaggeredText 
                text={[
                  "MY SKILLS",
                ]}
                repeatDelay={5000}
              />
            </div>

        </div>
      </>
    )
  }
  