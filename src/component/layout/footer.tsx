'use client'

import { Icon } from '@iconify/react/dist/iconify.js';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react';
import { hoverOn, hoverOff } from '@/app/store/slices/cursorSlice';
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Magnetic from '../utils/magnetic';
import { usePageNavigate } from '../custom-hook/use-page_navigate';
import EncryptText from '../utils/encrypted-text';
import { LibraryRegular, InterExtraBold, PPTelegrafUltrabold, PPTelegrafRegular } from '../utils/fonts';
import Marquee from '../utils/marquee-regular';
import { desktop, maxMedium } from '../utils/use-media_queries';
import { StaggeredText } from '../utils/staggered-text'; 

export default function Footer(){

  const navigate = usePageNavigate();
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const getInTouchRef = useRef<any>();
  const article = useRef<any>();
  const { scrollYProgress } = useScroll({
    target: article,
    offset: ["start end", "end start"]
  });

  const GITInView = useInView(getInTouchRef, {once: false, margin: '0px 0px -25% 0px'})

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
                  <StaggeredText text={['& COLLABORATE !']} className={`${PPTelegrafUltrabold.className} absolute top-full right-0 mt-[1rem] lg:text-[42px] sm:text-[1.3rem] tracking-wide`}/>
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
              <motion.div 
              initial={{x: '100%', opacity: 0}}
              animate={GITInView ? {x: '0%',  opacity: 0.5} : {}}
              transition={{duration: 2.2, delay: 0, ease: 'easeOut'}}
              className='h-[2px] left-0 w-full top-0 bottom-0 my-auto border border-double border-t-[3px] border-b-0 border-x-0 border-themeColor 
              will-change-[transform,opacity]
              '/>
            </div>


            <div></div>

            <motion.div 
            ref={getInTouchRef}
            // style={{y: y}}
            onMouseEnter={() => {dispatch(hoverOn('Click!'))}}
            onMouseLeave={() => {dispatch(hoverOff())}}
            initial={{opacity: 0, rotate: '360deg'}}
            animate={GITInView ? {opacity: 1, rotate: '0deg'} : {}}
            transition={{duration: 1.3, delay: 0, ease: 'easeOut'}}
            className={` 
            lg:mx-auto lg:py-0 origin-center will-change-[transform,opacity]
            sm:ml-auto sm:mx-per10 sm:py-10 
            
            `}>
              <Magnetic>
              <span 
              onClick={() => {navigate('/contact')}}
              className='relative flex items-center justify-center rounded-full overflow-hidden text-center font-telegraf-ultrab origin-center duration-300
              border-themeColor border-4 border-double 
              bg-[#ffffff] dark:bg-[#000000b9]  dark:shadow-[#ffffff81] shadow-[#00000081]
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
            </motion.div>
          </div>

          <div className={`flex ${PPTelegrafRegular.className} px-per10 -translate-y-10`}>
            <Magnetic>
              <div className='flex items-center text-xl glassmorphism p-3 rounded-md'>
                <Icon icon={`tabler:mail-pin`} className='mr-2 text-2xl'/> 
                <a href="mailto:dzungnguyen.2k@gmail.com" className='mt-1'>dzungnguyen.2k@gmail.com</a>
              </div>
            </Magnetic>
          </div>

          <div
          className='flex items-center mt-10
          lg:px-per10 lg:justify-center lg:py-5
          sm:px-per5 sm:justify-center sm:py-10 
          '>
            <div className="lg:text-xl md:text-md sm:text-sm font-telegraf-ultrab
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
            <div className={`xl:fixed xl:right-[4.20%] xl:bottom-1/3 xl:grid xl:grid-flow-row xl:gap-6 xl:text-xl z-10 
            sm:flex sm:justify-evenly sm:py-3
            `}>
                {socials.map((s) => ( 
                    <a 
                    className='block sm:pl-4 opacity-70 hover:opacity-100 hover:text-themeColor'
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
