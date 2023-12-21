'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image';

import { useEffect, useRef, useState } from 'react';

import { Icon } from '@iconify/react/dist/iconify.js';
import { useDispatch } from 'react-redux'
import { hoverOff, hoverTitle } from '@/app/redux/slices/cursorSlice';
import Magnetic from '../utils/magnetic';
import { usePageNavigate } from '../custom-hook/use-page_navigate';
import EncryptText from '../utils/encrypted-text';
import { InterExtraBold, NeueMachinaUltraBold, LibrarySoft, InterMedium, NeueMachinaBlack } from './fonts';
import Marquee from '../utils/marquee-regular';

import { nickname } from './header';

//import StaggeredText from '../utils/staggered-text';
const DynamicStaggeredText = dynamic(() => import('../utils/staggered-text'), {
  loading: () => null,
  ssr: false
})

export default function Footer(){
  const navigate = usePageNavigate();
  const dispatch = useDispatch();
  const sectionRef = useRef<HTMLElement>(null);

  return(
    <>
      <footer ref={sectionRef}
      className='footer relative overflow-hidden'
      >
 
        <div
        className={`
        ${InterExtraBold}
        flex flex-col w-full min-h-screen relative 
        
        `}>
          <div
          className='relative mt-3 '>
            <Marquee direction={'forward'} contrast={true}
            text={['PASSIONATE', 'INNOVATIVE', 'OPEN MINDED']}
            /> 
          </div>
          <div
          className='relative  mt-6 '>
            <Marquee  direction={'backward'} 
            text={['MULTIDISCIPLINARY', 'INTEGRITY', 'RESPONSIBLE']}
            /> 
          </div>

          <div 
          className='relative
          lg:px-per10
          sm:px-per10 sm:mt-20
          '>
            <div className={`${LibrarySoft.className} footer-contact
            inline-block
            `}>
              <div className='relative leading-[1.05] ml-1 '>

                <div className='absolute w-[100%] h-[40%] flex justify-center items-center pointer-events-none select-none bottom-10 left-per5 opacity-100 -z-5'>
                  <div 
                  className='gradient-mist h-[100%] w-[100%] rounded-[50%] '/>
                </div>    

                <div className='flex items-center justify-start'>
                  <div className='relative lg:h-[69px] sm:h-[2.8rem] mr-5 ml-2 rounded-full overflow-hidden 
                  '>
                    <Image
                    priority={true}
                    src={`/assets/images/me.jpg`}
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
                  <DynamicStaggeredText text={['& COLLABORATE !']} className={`${NeueMachinaUltraBold.className} absolute top-full right-0 mt-[1.2rem] lg:text-[44px] sm:text-[1.1rem] `}/>
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
            className='absolute w-full overflow-hidden opacity-50 '
            >
              <div 
              className='h-[1px] left-0 w-full top-0 bottom-0 my-auto border border-solid border-y-[1px] border-x-0 border-[var(--font-color)] 
              '/>
            </div>

            <div></div>

            <div 
            onMouseMove={() => {dispatch(hoverTitle('Now!'))}}
            onMouseLeave={() => {dispatch(hoverOff())}}
            className={` 
            lg:mx-auto lg:p-1 origin-center rounded-full glassmorphism
            sm:ml-auto sm:my-5 
            
            `}>
              <Magnetic>
              <span 
              onClick={() => {navigate('/contact')}}
              className={`relative flex items-center justify-center rounded-full overflow-hidden text-center ${NeueMachinaBlack.className} origin-center duration-[500ms]  
              bg-[#ffffff00] dark:bg-[#00000000] dark:border-[#ffffff50] hover:border-[#000000c1] border-[2px] border-solid border-transparent
              hover:bg-[#ffffff] hover:dark:bg-[#ffffff]  dark:shadow-[#ffffff81] shadow-[#00000081]
              text-white hover:text-black hover:shadow-md 
              xl:w-[215px] xl:h-[215px] xl:text-[18px] 
              lg:w-[180px] lg:h-[180px] lg:text-[1.1rem] 
              sm:w-[144px] sm:h-[144px] sm:text-sm           
              before:duration-[500ms] before:rounded-full
              before:content-[""] before:absolute before:right-0 before:top-0 before:left-0 before:bottom-0 before:m-auto before:h-full before:w-full 
              before:z-2 before:bg-[#000000] before:dark:bg-[#000000] hover:before:bg-[var(--font-color)] beforedark:glassmorphism before:opacity-100 hover:before:opacity-0 before:ease-in-out 
              hover:before:w-0 hover:before:h-0 hover:before:border-transparent
              `}
              >
              <span className='block z-3 w-full h-full tracking-wide'><EncryptText target_text='GET IN TOUCH'/></span>
              </span>
              </Magnetic>
            </div>
          </div>

          <div className={`flex ${InterMedium.className} mx-per10 my-2 `}>
            <div className='flex items-center glassmorphism p-2 rounded-md'>
              <Icon icon={`tabler:mail-pin`} className='mr-2 text-2xl'/> 
              <a 
              href="mailto:dzungnguyen.2k@gmail.com" className=''>dzungnguyen.2k@gmail.com</a>
            </div>
          </div>
          
        </div>

        <div
          className='flex items-center mt-5 glassmorphism
          lg:px-per10 lg:justify-between md:py-8
          sm:px-per10 sm:justify-between sm:py-10 
          '>
            <div className={`md:text-base sm:text-sm ${NeueMachinaUltraBold.className} 
            `}>
                <div>2023 &copy; BY {nickname.toUpperCase()}.</div>
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
    return(
        <>
            <div className={` z-10 
            sm:flex sm:justify-evenly sm:py-2
            `}>
                {socials.map((s) => ( 
                    <a 
                    className='block opacity-100 mx-3'
                    key={s.icon} href={s.href} target='_blank' title={s.title}
                    >
                        <Icon icon={s.icon} className='block hover:scale-[1.75] duration-300 lg:text-xl sm:text-lg'/>
                    </a>     
                ))}
            </div>
        </>
    )
}
