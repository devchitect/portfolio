'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { Icon } from '@iconify/react/dist/iconify.js';
import { useDispatch } from 'react-redux'
import { hoverOn, hoverOff } from '@/app/redux/slices/cursorSlice';
import Magnetic from '../utils/magnetic';
import { usePageNavigate } from '../custom-hook/use-page_navigate';
import EncryptText from '../utils/encrypted-text';
import { InterExtraBold, NeueMachinaUltraBold, LibrarySoft, InterMedium } from './fonts';
import Marquee from '../utils/marquee-regular';

import { desktop, maxMedium } from './responsive-media_queries';
import { nickname } from './header';
import { usePathname } from 'next/navigation';

const DynamicStaggeredText = dynamic(() => import('../utils/staggered-text'), {
  loading: () => null,
  ssr: false
})
export default function Footer(){
  const pathname = usePathname();
  const navigate = usePageNavigate();
  const dispatch = useDispatch();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo('.footer-contact', {
      y: '100%',
      opacity: 0,
      },
      {
        y: '0px',
        opacity: 1,
        scrollTrigger: {
          trigger: '.footer-contact-trigger',
          markers: true,
          start: `center 100%`,
          end: `bottom 100%`,
          scrub: true,
        }
      },
    );
  }, {scope : sectionRef, dependencies: [pathname]})
 
  return(
      <footer ref={sectionRef}
      className='footer'
      >
        <div
        className={` footer-contact-trigger
        ${InterExtraBold}
        flex flex-col w-full min-h-screen relative overflow-hidden
        
        `}>

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
            text3={{label:'RESPONSIBLE', color:'linear-gradient(90deg, #B3FFAB, #12FFF7)'}}
            /> 
          </div>

          <div 
          className='footer-contact relative
          lg:px-per10
          sm:px-per10 sm:mt-20
          '>
            <div className={`${LibrarySoft.className} 
            inline-block
            `}>

               

              <div className='relative leading-[1.05] ml-1'>

                <div className='absolute w-[100%] h-[40%] flex justify-center items-center pointer-events-none select-none bottom-10 left-per5 opacity-60 -z-2'>
                  <div 
                  className='float-bg-gradient h-[100%] w-[100%] rounded-[50%] '/>
                </div>    

                <div className='flex items-center justify-start'>
                  <div className='relative lg:h-[69px] sm:h-[2.8rem] mr-5 ml-2 rounded-full overflow-hidden 
                  '>
                    <Image
                    priority={true}
                    src={`/images/me.jpg`}
                    alt="Picture of the author"
                    width={500}
                    height={500}
                    className='h-full w-auto'
                    />                
                  </div>     
                  <div className={`lg:text-[100px] sm:text-[2.8rem] tracking-tight`}>LET&apos;S</div>
                    
                </div>
                <div className='relative'>
                  <span
                  className='text-gradient lg:text-[110px] sm:text-[3rem]'
                  >CONNECT</span>
                  <DynamicStaggeredText text={['& COLLABORATE !']} className={`${NeueMachinaUltraBold.className} absolute top-full right-0 mt-[1.2rem] lg:text-[38px] sm:text-[1.1rem] tracking-wide`}/>
                </div>
              </div>
              
              </div>
          </div>

          <div 
          className='relative
          grid lg:grid-cols-[75%,25%] px-per10 items-center my-5
          lg:my-8
          sm:my-16
          '>

            <div
            className='absolute w-full overflow-hidden opacity-40'
            >
              <div 
              className='h-[1px] left-0 w-full top-0 bottom-0 my-auto border border-solid border-y-[1px] border-x-0 border-[var(--font-color)] 
              '/>
            </div>

            <div></div>

            <div 
            onMouseMove={() => {dispatch(hoverOn('Now!'))}}
            onMouseLeave={() => {dispatch(hoverOff())}}
            className={` 
            lg:mx-auto lg:py-0 origin-center will-change-[transform] 
            sm:ml-auto sm:mx-per10 sm:py-10 
            
            `}>
              <Magnetic>
              <span 
              onClick={() => {navigate('/contact')}}
              className={`relative flex items-center justify-center rounded-full overflow-hidden text-center ${NeueMachinaUltraBold.className} origin-center duration-[500ms]  
              bg-[#ffffff00] dark:bg-[#00000000] glassmorphism
              hover:bg-[#000000cc] hover:dark:bg-[#ffffffcc]  dark:shadow-[#ffffff81] shadow-[#00000081]
              text-[var(--font-color)]
              xl:w-[230px] xl:h-[230px] xl:text-[20px] 
              lg:w-[180px] lg:h-[180px] lg:text-[1.1rem] 
              sm:w-[144px] sm:h-[144px] sm:text-sm
              hover:text-white hover:dark:text-black hover:shadow-2xl hover:tracking-[0.05rem] before:glassmorphism before:duration-[500ms] before:rounded-full
              before:content-[""] before:absolute before:right-0 before:top-0 before:left-0 before:bottom-0 before:m-auto before:h-full before:w-full 
              before:z-2 before:dark:bg-black hover:before:bg-[var(--font-color)] before:opacity-100 hover:before:opacity-0 before:ease-in-out 
              before:dark:border-[#ffffff50] before:border-[#111111c1] before:border-[2px] before:border-solid 
              hover:before:w-0 hover:before:h-0 hover:before:border-transparent
              `}
              >
              <span className='block z-3 w-full h-full'><EncryptText target_text='GET IN TOUCH'/></span>
              </span>
              </Magnetic>
            </div>
          </div>

          <div className={`flex ${InterMedium.className} px-per10 `}>
            <div className='flex items-center glassmorphism p-3 rounded-sm'>
              <Icon icon={`tabler:mail-pin`} className='mr-2 text-2xl'/> 
              <a href="mailto:dzungnguyen.2k@gmail.com" className=''>dzungnguyen.2k@gmail.com</a>
            </div>
            
          </div>
        </div>

        <div
          className='flex items-center mt-10 glassmorphism
          lg:px-per10 lg:justify-between lg:py-5
          sm:px-per10 sm:justify-between sm:py-10 
          '>
            <div className={`md:text-base sm:text-sm ${NeueMachinaUltraBold.className} 
            `}>
                <div>2023 &copy; BY {nickname.toUpperCase()}.</div>
            </div>
            <Socials/>
          </div>
      </footer>
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
                    className='block opacity-100 hover:text-themeColor mx-3'
                    key={s.icon} href={s.href}
                    onMouseEnter={() => {dispatch(hoverOn(s.title))}}
                    onMouseLeave={() => {dispatch(hoverOff())}}
                    >
                        <Icon icon={s.icon} className='block hover:scale-150 duration-150 lg:text-xl sm:text-lg'/>
                    </a>     
                ))}
            </div>
        </>
    )
}
