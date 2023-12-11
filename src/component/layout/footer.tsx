'use client'

import dynamic from 'next/dynamic'

import { Icon } from '@iconify/react/dist/iconify.js';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react';
import { hoverOn, hoverOff } from '@/app/redux/slices/cursorSlice';
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Magnetic from '../utils/magnetic';
import { usePageNavigate } from '../custom-hook/use-page_navigate';
import EncryptText from '../utils/encrypted-text';
import { LibraryRegular, InterExtraBold, PPTelegrafUltrabold, PPTelegrafRegular } from '../utils/fonts';
import Marquee from '../utils/marquee-regular';
import { desktop, maxMedium } from '../utils/use-media_queries';

const DynamicStaggeredText = dynamic(() => import('../utils/staggered-text'), {
  loading: () => null,
  ssr: false
})
export default function Footer(){

  const navigate = usePageNavigate();
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const article = useRef<any>();
  const { scrollYProgress } = useScroll({
    target: article,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${100}%`, `${-100}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0,1]);

  useEffect(() => {
    setIsClient(true);
  },[])

  return(
      <>
        <footer className={`
        ${InterExtraBold}
        footer flex flex-col w-full min-h-screen  relative overflow-hidden
        
        `}>
          <div className='absolute w-[44rem] h-[44rem] flex justify-center items-center pointer-events-none select-none top-per70 -right-per10 opacity-20 -z-2'>
            <div 
            className='float-bg-gradient h-[100%] w-[100%] rounded-[50%]  animate-spin-slow'/>
          </div>

          <div
          className='relative overflow-hidden mt-3'>
            <Marquee marqueedirec={'forward'}
            text1={{label:'PASSIONATE', color:'linear-gradient(90deg, #fc4a1a, #f7b733)'}} 
            text2={{label:'INNOVATIVE',color:'linear-gradient(90deg, #1A2980, #26D0CE)'}} 
            text3={{label:'OPEN MINDED',color:'linear-gradient(90deg, #333399, #ff00cc)'}}
            /> 
          </div>
          <div
          className='relative overflow-hidden mt-6 '>
            <Marquee  marqueedirec={'backward'}
            text1={{label:'MULTIDISCIPLINARY', color:'var(--gradient-colorful)'}} 
            text2={{label:'INTEGRITY', color:'linear-gradient(90deg, #FF416C, #FF4B2B)'}} 
            text3={{label:'RELIABLE', color:'linear-gradient(90deg, #B3FFAB, #12FFF7)'}}
            /> 
          </div>

          <motion.div 
          ref={article}
          style={(isClient && desktop ) ? {y: y, opacity: opacity} : {opacity: opacity}}

          className=' relative
          lg:px-per10
          sm:px-per10 sm:mt-28 will-change-[transform,opacity]
          '>
            <div className={`${LibraryRegular.className} 
            inline-block
            lg:text-[105px]
            sm:text-[3rem]
            `}>

              <div className='absolute w-[30%] h-[100%] flex justify-center items-center pointer-events-none select-none top-10 left-per5 opacity-60 -z-2 floating'>
                <div 
                className='float-bg-gradient h-[50%] w-[100%] rounded-[50%] '/>
              </div>      

              <div className='leading-[1.05]'>
                <div className={`lg:text-[100px] sm:text-[2.8rem] tracking-wide`}>LET&apos;S</div>
                <div className='relative'>
                  <span className='text-gradient'>CONNECT</span> 
                  <DynamicStaggeredText text={['& COLLABORATE !']} className={`${PPTelegrafUltrabold.className} absolute top-full right-0 mt-[1rem] lg:text-[42px] sm:text-[1.3rem] tracking-wide`}/>
                </div>
              </div>
              
              </div>
          </motion.div>

          <div 
          ref={targetRef}
          className='relative
          grid lg:grid-cols-[75%,25%] px-per10 items-center my-5
          
          '>

            <div
            className='absolute w-full overflow-hidden'
            >
              <div 
              className='h-[2px] left-0 w-full top-0 bottom-0 my-auto border border-double border-t-[3px] border-b-0 border-x-0 border-themeColor 
              will-change-[transform,opacity]
              '/>
            </div>


            <div></div>

            <div 
            onMouseEnter={() => {dispatch(hoverOn('Click!'))}}
            onMouseLeave={() => {dispatch(hoverOff())}}
            className={` 
            lg:mx-auto lg:py-0 origin-center will-change-[transform,opacity]
            sm:ml-auto sm:mx-per10 sm:py-10 
            
            `}>
              <Magnetic>
              <span 
              onClick={() => {navigate('/contact')}}
              className='relative flex items-center justify-center rounded-full overflow-hidden text-center font-telegraf-ultrab origin-center duration-300 
              border-themeColor border-4 border-double 
              bg-[#ffffffc8] dark:bg-[#000000b9]  dark:shadow-[#ffffff81] shadow-[#00000081]
              text-themeColor
              xl:w-[250px] xl:h-[250px] xl:text-[20px] 
              lg:w-[180px] lg:h-[180px] lg:text-[1.1rem] 
              sm:w-[144px] sm:h-[144px] sm:text-sm
              hover:text-white hover:border-solid hover:shadow-2xl  hover:tracking-[0.05rem]
              before:content-[""] before:absolute before:right-0 before:top-0 before:h-full before:w-0 before:duration-[500ms] before:z-2 before:rounded-full
              before:bg-themeColor before:opacity-80
              hover:before:w-full hover:before:right-[unset] hover:before:left-0
              '
              >
              <span className='block z-3 w-full h-full'><EncryptText target_text='GET IN TOUCH'/></span>
              </span>
              </Magnetic>
            </div>
          </div>

          <div className={`flex ${PPTelegrafRegular.className} px-per10 -translate-y-10`}>
            <div className='flex items-center glassmorphism py-2 px-3 rounded-md'>
              <Icon icon={`tabler:mail-pin`} className='mr-2 text-2xl'/> 
              <a href="mailto:dzungnguyen.2k@gmail.com" className='mt-1'>dzungnguyen.2k@gmail.com</a>
            </div>
            
          </div>

          <div
          className='flex items-center mt-10 glassmorphism
          lg:px-per10 lg:justify-between lg:py-5
          sm:px-per10 sm:justify-between sm:py-10 
          '>
            <div className="md:text-base sm:text-sm font-telegraf-ultrab sm:mt-2
            ">
                <div>2023 &copy; BY DEVCHITECT.</div>
            </div>
            <Socials/>
          </div>
          
        </footer>
      </>
  )
}

const socials = [
    {href: '', icon: 'ri:github-fill', title: 'Github'},
    {href: '', icon: 'ri:twitter-x-fill', title: 'Twitter'},
    {href: '', icon: 'ri:linkedin-box-fill', title: 'LinkedIn'},
    {href: '', icon: 'ri:discord-fill', title: 'Discord'},
];

function Socials(){

    const dispatch = useDispatch();

    return(
        <>
            <div className={` z-10 
            sm:flex sm:justify-evenly sm:py-2
            `}>
                {socials.map((s) => ( 
                    <a 
                    className='block opacity-70 hover:opacity-100 hover:text-themeColor mx-4'
                    key={s.icon} href={s.href}
                    onMouseEnter={() => {dispatch(hoverOn(s.title))}}
                    onMouseLeave={() => {dispatch(hoverOff())}}
                    >
                        <Icon icon={s.icon} className='block hover:scale-150 duration-150 text-2xl'/>
                    </a>     
                ))}
            </div>
        </>
    )
}
