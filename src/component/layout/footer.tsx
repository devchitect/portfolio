'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image';

import { Icon } from '@iconify/react/dist/iconify.js';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react';
import { hoverOn, hoverOff } from '@/app/redux/slices/cursorSlice';
import Magnetic from '../utils/magnetic';
import { usePageNavigate } from '../custom-hook/use-page_navigate';
import EncryptText from '../utils/encrypted-text';
import { LibraryRegular, InterExtraBold, PPTelegrafUltrabold, PPTelegrafRegular } from '../utils/fonts';
import Marquee from '../utils/marquee-regular';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { desktop, maxMedium } from '../utils/use-media_queries';
import { RevealedText } from '../utils/revealed-text';
import useIsomorphicLayoutEffect from '../gsap-helper/isomorphic-effect';
const DynamicStaggeredText = dynamic(() => import('../utils/staggered-text'), {
  loading: () => null,
  ssr: false
})
export default function Footer(){

  const navigate = usePageNavigate();
  const dispatch = useDispatch();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context((self : any) => {
        
      const elements = self.selector('.el');
      const trigger = self.selector('.trigger');

      const markers = false;

        gsap.fromTo(elements[0], {
          y: '100%',
          opacity: 0,
          },
          {
            y: '0px',
            opacity: 1,
            scrollTrigger: {
              trigger: trigger,
              markers: markers,
              start: '25% 100%',
              end: '90% 100%',
              scrub: 0.2,
            }
          },
        );
    
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);



  return(
      <footer
      className='footer'
      ref={sectionRef}
      >
        <div
        className={`trigger
        ${InterExtraBold}
        flex flex-col w-full min-h-screen relative overflow-hidden
        
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

          <div 
          className='el relative
          lg:px-per10
          sm:px-per10 sm:mt-20
          '>
            <div className={`${LibraryRegular.className} 
            inline-block
            `}>

               

              <div className='relative leading-[1.05] ml-1'>

                <div className='absolute w-[100%] h-[50%] flex justify-center items-center pointer-events-none select-none bottom-10 left-per5 opacity-60 -z-2'>
                  <div 
                  className='float-bg-gradient h-[100%] w-[100%] rounded-[50%] '/>
                </div>    

                <div className='flex items-center justify-start'>
                  <div className='relative lg:h-[85px] sm:h-[2.8rem] mr-5 rounded-full overflow-hidden border-[1px] border-solid border-[var(--text-color)]
                  shadow-themeColor shadow-md
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
                  <div className={`lg:text-[110px] sm:text-[2.8rem] tracking-wide`}>LET&apos;S</div>
                    
                </div>
                <div className='relative'>
                  <span
                  className='text-gradient lg:text-[115px] sm:text-[3rem] tracking-tight'
                  >CONNECT</span>
                  <DynamicStaggeredText text={['& COLLABORATE !']} className={`${PPTelegrafUltrabold.className} absolute top-full right-0 mt-[1.2rem] lg:text-[50px] sm:text-[1.3rem] tracking-wide`}/>
                </div>
              </div>
              
              </div>
          </div>

          <div 
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
