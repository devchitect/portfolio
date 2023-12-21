'use client'

import '@/styles/pages/home.scss'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux'
import { hoverOn, hoverOff, hoverTitle } from '@/app/redux/slices/cursorSlice';
//GSAP have its bugs on SPA Framework, not workin on every case
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { motion } from 'framer-motion';

import { Icon } from '@iconify/react/dist/iconify.js';
// import { useSelector } from 'react-redux';
// import { RootState } from './store/store';
import Magnetic from '@/component/utils/magnetic'
import EncryptText from '@/component/utils/encrypted-text'
import { usePageNavigate } from '@/component/custom-hook/use-page_navigate'
import { desktop } from '@/component/layout/responsive-media_queries';
import { RevealedText, RevealedTextParagraph } from '@/component/utils/revealed-text';
import { InterBlack, InterBold, InterMedium, InterSemiBold, LibraryRegular, LibrarySoft, NeueMachinaBlack, NeueMachinaBold, NeueMachinaUltraBold } from '@/component/layout/fonts';
import StaggeredText from '@/component/utils/staggered-text';


//Code Splitting & Lazy Loading
const DynamicRevealedText = dynamic(() =>
  import('@/component/utils/revealed-text').then((mod) => mod.RevealedText), {
    loading: () => null,
    ssr: false
  }
)

const DynamicRevealedTextParagraph = dynamic(() =>
  import('@/component/utils/revealed-text').then((mod) => mod.RevealedTextParagraph),{
    loading: () => null,
    ssr: false
  }
)

export default function LandingHomepage ({params: {language}}) {

  const GSAPContext = useRef<HTMLElement>(null);
  const collabTimeline = useRef<GSAPTimeline>();
  const aboutButtonTimeline = useRef<GSAPTimeline>();

  useGSAP(() => {

    gsap.registerPlugin(ScrollTrigger);

    if(desktop){

    const serviceBoxs = gsap.utils.toArray('.service-box');

    aboutButtonTimeline.current = gsap.timeline({
      scrollTrigger: {
        trigger: '.about-btn',
            markers: false,
            start: 'top center',
            end: 'bottom top',
            scrub: 0.69,
      }
    })
    .to('.about-btn', {
      y: '300px',
      rotate:'360deg',
    })

      collabTimeline.current = gsap.timeline(
        {
          scrollTrigger: {
            trigger: '.collab-trigger',
            markers: false,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      ).from('.collab', { yPercent:-60, opacity:0, })
      .to('.collab', { yPercent:0, opacity:1, })
      .to('.collab', { yPercent:30, opacity:0, })

      serviceBoxs.forEach((el : any) => {
        gsap.fromTo(el, {
          opacity: 0,
          },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: el,
              markers: false,
              start: 'bottom 100%',
              end: 'bottom 50%',
              scrub: 0.3,
            }
          },
        )})

    }},{ scope: GSAPContext, dependencies: [] });


  return (
    <>
      <main ref={GSAPContext} className=''>
          {/* <FirstSection/> */}
          <div className='w-5 h-20'/>
          <SecondSection/>
          <div className='w-5 lg:h-20'/>
          <ThirdSection/>
          <div className='w-5 lg:h-20 sm:h-5'/>
          <FourthSection/> 
      </main>
    </>
  )
}

const  FirstSection = () => {
  const dispatch = useDispatch();
  const navigate = usePageNavigate();

  return(

  <>
    <div 
    className={`relative w-full z-1 ${'home-intro'} overflow-hidden
    lg:pt-0  
    sm:pt-32 sm:flex sm:flex-col sm:items-start sm:px-[10%]
    `}>
      <div className="absolute w-screen h-screen -z-1">
        <div className='w-[600px] h-[600px] gradient-mist mist-1 rounded-full'/>
        <div className='w-[380px] h-[380px] gradient-mist mist-2 rounded-full'/>
      </div>
      <div 
        className='absolute flex items-center dark:text-gray-200 opacity-50 hover:opacity-100 z-1
        md:bottom-auto md:top-10 md:right-auto md:px-0 
        sm:left-0 sm:top-4 sm:right-auto sm:bottom-auto sm:mx-per10 sm:text-sm
        '>
          <Icon icon='gis:globe-share' className='mr-3 ml-1'/>
          <span>Open for any collaborations and offers.</span>
      </div>

      <div 
      className='absolute flex items-center text-sm dark:text-gray-200 opacity-50 hover:opacity-100 z-1
      md:top-3 md:bottom-auto md:right-auto md:px-0
      sm:left-0 sm:top-14 sm:mx-per10
      '>
        <Icon icon='circle-flags:vn' className='mr-3 ml-1'/>
        <span>Presently located in Vietnam (GMT+7).</span>
      </div>

      <div 
      style={{writingMode: 'vertical-rl'}}
      className='absolute flex items-center justify-center left-[10%] opacity-80 floating 
      lg:
      sm:bottom-10
      '>
        <span className={`tracking-[0.1rem] lg:text-[0.78rem] sm:text-[0.69rem] border-l border-themeColor border-dashed ${InterSemiBold.className}`}>
          <span>SCROLL TO DISCOVER</span>
          <Icon icon='solar:arrow-up-broken' vFlip={true}  className='sm:text-[0.9rem] absolute bottom-0 right-full mr-1'/>
        </span>
        
      </div>

      <article
      className='w-full h-full relative flex flex-col 
      lg:justify-center 
      sm:px-0'
      >
        <div className='flex ml-1'>
          <RevealedText
            className={`
            xl:text-[79px] 
            lg:text-[4rem] 
            md:py-1
            sm:text-[2.1rem] sm:py-2 
            `} 
            delay={0.25}
            text={<div className={`${LibrarySoft.className} leading-[1.1] lg:tracking-[-0.25rem]`}>DZUNG NGUYEN</div>}
            />
        </div>

        <DynamicRevealedText delay={0.4} className='' 
        text={ <div className='h-[1px] md:w-per50 sm:w-per60 ml-[5%] border-black dark:border-white border border-solid opacity-30 sm:my-1 rounded-r-full'/> }/>

        <div className='relative self-start flex lg:ml-8 sm:ml-6 opacity-90'>
          <RevealedText
            className={` 
            xl:text-[110px]  
            lg:text-[3.6rem]
            md:py-1
            sm:text-[1.8rem] sm:py-2 
            `} 
            delay={0.5}
            text={<div  
                  className={`${NeueMachinaUltraBold.className} font-black leading-[1] tracking-[0.05rem]`}>
                  THE DEVELOPER</div>}
            />
            <div className={`absolute bottom-full lg:right-3 sm:right-1 -mb-2 leading-[1.5rem]`}>
              <DynamicRevealedText delay={0.6} className={`${InterSemiBold.className} lg:text-[1rem] sm:text-[0.8rem]`} text={<>MAIN</>}/>
            </div>
        </div>

        <DynamicRevealedText delay={0.8} className='' 
        text={ <div className='h-[1px] md:w-per25 sm:w-per30 ml-[15%] border-black dark:border-white border border-dashed opacity-30 lg:my-3 sm:my-2 rounded-r-full'/> }/>

        <div className='relative flex self-start lg:ml-36 sm:ml-12 opacity-80'>
          <RevealedText
            className={` 
            xl:text-[95px]  
            lg:text-[3.4rem]
            md:py-1
            sm:text-[1.5rem] sm:py-2 
            `} 
            delay={0.75}
            text={<div  
                  className={`${NeueMachinaUltraBold.className} font-black leading-[1] tracking-[0.25rem] text-stroke`}>
                  DESIGNER</div>}
            />
            <div className={`absolute top-full lg:right-3 sm:left-1 -mb-2 leading-[1.5rem]`}>
                <DynamicRevealedText delay={0.9} className={`${InterSemiBold.className} lg:text-[1rem] sm:text-[0.8rem]`} text={<>MAJOR</>}/>
            </div>
        </div>
      </article>
      
      <div   
      className={`${'about-btn'} origin-center will-change-transform flex justify-center w-[20%] rounded-full
      lg:mx-per10 lg:mt-10 lg:py-0 lg:absolute lg:bottom-28 lg:right-0
      sm:ml-auto sm:py-5 sm:relative sm:right-per10 
      `}>
        <Magnetic>
        <span 
        onMouseMove={() => {dispatch(hoverOn())}}
        onMouseLeave={() => {dispatch(hoverOff())}}
        onClick={() => {navigate('/about')}}
        className={` ${NeueMachinaBlack.className} glassmorphism 
        relative flex items-center justify-center rounded-full overflow-hidden text-center origin-center duration-[500ms] 
        border-[var(--font-color)] border-[2px] border-solid 
        bg-[#ffffff00] dark:bg-[#00000000]  dark:shadow-[#ffffff81] shadow-[#00000050]
        text-[var(--font-color)]
        xl:w-[200px] xl:h-[200px] xl:text-[20px] 
        lg:w-[180px] lg:h-[180px] lg:text-[1.0rem] 
        sm:w-[130px] sm:h-[130px] sm:text-md 
        hover:text-white hover:dark:text-black hover:border-transparent hover:shadow-2xl  
        before:content-[""] before:absolute before:right-0 before:top-0 before:left-0 before:bottom-0 before:m-auto before:h-0 before:w-0 before:duration-[500ms] before:z-2 before:rounded-full
        before:bg-white hover:before:bg-[var(--font-color)] before:opacity-0 hover:before:opacity-100 before:ease-in-out
        hover:before:w-full hover:before:h-full 
        `}
        >
         <span className='block z-3 w-full h-full tracking-wide '><EncryptText target_text='ABOUT ME'/></span>
        </span>
        </Magnetic>
      </div>

    </div>
  </>
  )
}

const SecondSection = () => {
 
  return (
    <section className='home-section2'>
      
      <div className={`absolute h-full w-full flex -z-1 opacity-[0.69] justify-center items-center overflow-hidden ${NeueMachinaBlack.className} text-stroke`}>
        <div className='tracking-[24px] mb-[15px]'>
          <span className='lg:text-[230px]'>EXCEPTIONAL</span>
        </div>
      </div>

      <div 
      className={`relative text-left collab-trigger
      lg:center lg:mb-10 lg:pt-0 lg:h-screen
      md
      sm:flex sm:flex-col sm:justify-center sm:h-[89vh]
      `}
    >     
        <div 
        className={`${'collab'} relative leading-[1] text-center select-none h-full
        lg:mx-[10%] lg:mt-[7rem] 
        sm:mx-[10%] sm:mt-[3rem] sm:mb-[var(--header-height)] ease-out will-change-transform
        `}>
          
          <div className='absolute w-full h-full flex justify-center items-center pointer-events-none select-none -z-5'>
            <div 
            className='gradient-mist h-[18%] w-[69%] rounded-[69%] opacity-90'/>
          </div>

          <div className='px-6 flex flex-col items-center justify-center h-full
          lg:py-[3.8rem]
          sm:py-[1.5rem]
          '>
           
            <div 
            className={`lg:tracking-[-0.15rem] sm:leading-normal md:leading-none relative
            lg:text-[110px]
            md:text-[3rem]
            sm:text-[1.7rem]
            `}> 
              <div className='flex items-center justify-center absolute right-full top-0 mr-5 mt-3'>  
                <span className={`text-6xl sm:hidden xl:block duration-500 floating
                `}>&#128640;</span>
              </div>
              <div className={`${NeueMachinaUltraBold.className} absolute bottom-full left-5 lg:mb-3 sm:mb-1 lg:text-[60px] sm:text-[1rem] tracking-[0] opacity-80 `}>LET&apos;S</div>
              <span className={`${InterBold.className}`}>CRAFTING</span>
              </div>

            <div className={`relative z-1 pointer-events-none select-none
            lg:text-[130px] 
            md:text-[4.2rem] md:py-5
            sm:text-[2.1rem] sm:py-3 sm:px-5
            `}>
              <div className={`${NeueMachinaBlack.className} z-3 text-gradient opacity-90 tracking-[0.1rem]`}>EXCEPTIONAL</div>
              <span className={`absolute xl:-right-[35px] sm:right-3 rotate-[-15deg] rounded-md border-4 border-double border-black -z-1
              bg-[#ffe600] text-black ${InterBold.className}
              lg:text-[30px] lg:px-5 lg:py-3 lg:top-[72%]
              md:text-[1.8rem] 
              sm:text-[0.78rem] sm:p-2 sm:pb-1 sm:top-[60%]
              `}>No Bullsh!t</span>
            </div>

            <div className={`relative font-b lg:tracking-[-0.15rem] sm:leading-normal md:leading-none flex
            lg:text-[110px]
            md:text-[3rem]
            sm:text-[1.7rem]
            `}>
            <div className={`${LibraryRegular.className} relative `}>
              <span className=''>DIGITAL</span>
              <ul className={`${InterSemiBold.className} absolute w-full whitespace-nowrap opacity-90 text-left leading-[1.75] tracking-[-0.01rem] top-full
                lg:text-[20px] lg:left-1/3  lg:mt-5 
                sm:text-[0.69rem] sm:left-[10%] sm:mt-2
                `}>
                <li>+ Website</li>
                <li>+ Web Application</li>
              </ul>
              </div>
            <div className='relative'>
              <span className={`${InterBold.className}`}>&nbsp;PRODUCTS</span>
              <div className={`${NeueMachinaUltraBold.className} absolute top-full right-0 lg:mt-3 sm:mt-1 lg:text-[60px] sm:text-[1rem] tracking-[0] opacity-80 `}>TOGETHER !</div>
            </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

const ThirdSection = () => {
  const [isActive, setIsActive] = useState<number>(); 

  const services = [
    {
      title : 'ANALYSIS',
      description : ['I have the ability to analyzing your project by using different techniques to understand its needs and identify the best solutions for you .']
    },
    {
      title : 'UI/UX DESIGN',
      description : ["I deliver strong and user-friendly designs.","Minialist yet unforgetable!"]
    },
    {
      title : 'DEVELOPMENT',
      description : ["Each unique requirement need an unique solution stack!","I'm here to crafting your perfect match."]
    },
    {
      title : 'FULL PROCESS',
      description : ["From concept to reality."]
    },
  ]

  function toggleService(index : number){
    if(isActive !== index){
      setIsActive(index);
    }else{
      setIsActive(undefined);
    }
  }

  return (
    <>
      <section 
      className='my-20 relative w-full
      '
      >
      
        <div className={`absolute w-full translate-y-[165px] flex flex-col -z-5 items-center justify-center ${NeueMachinaUltraBold.className} leading-none overflow-hidden`}>
          <div className='-tracking-[0.5rem] translate-x-[-17px] translate-y-[15px]  opacity-[0.1]'>
            <span className='text-[456px]'>SERVICE</span>
          </div>

        </div>


        <div className={`relative tracking-[0.1rem] my-5 z-3 flex flex-col justify-center items-center      
        sm:mx-[10.05%] sm:text-base 
        `}>
          <RevealedTextParagraph delay={0} text={['I CAN HELP YOU']}
          className={`${InterBold.className} lg:text-[70px] sm:text-[1.5rem] leading-[1.25] lg:text-stroke`} />
          <RevealedTextParagraph delay={0.1}  text={['WITH']} 
          className={` ${InterBlack.className} lg:text-[63px] sm:text-[1.35rem] leading-[1.25]`} />
          <RevealedText delay={0.2} wrapper={'absolute top-[100%] mt-2'}
          text={<Icon icon={`gg:arrow-up-o`} vFlip={true} className='lg:text-[44px] sm:text-[1.25rem]'/>}/>    
        </div>    

        <div 
        className='flex flex-col items-start py-2 
        lg:mt-44  
        sm:mb-10 sm:mt-16
        '>
          <div className='lg:mx-per20 sm:mx-per10 lmy-10 border-l border-themeColor glassmorphism px-2 py-1 rounded-r-md'>
            <RevealedText 
            className={`${NeueMachinaBold.className} lg:text-[1.2rem] sm:text-[0.78rem] flex items-center`}
            text={<div>TARGET : WEBSTE / WEB APPLICATION</div>}/>
          </div>

          {services.map((s, index) => {
          return (
            <ServiceBox key={s.title} 
            isActive = {isActive === index} setActive={() => toggleService(index)} currentActive = {isActive}
            s={s} index={index} />
          )})}
        </div>
       
      </section>
    </>
  )
}

const ServiceBox = ({s, index, isActive, setActive, currentActive}) => {
  const dispatch = useDispatch();

  const { title, description } = s ;

  return (
    <>
      <div key={title} className='service-box w-full my-8'>
        <div className={`lg:w-[60%] sm:w-per80 mx-auto duration-300 ${isActive && 'glassmorphism rounded-lg'}`}>
          <div 
          onClick={() => {setActive()}}
          onMouseMove={() => {currentActive === index ? dispatch(hoverTitle('Close')) : dispatch(hoverTitle('View'));}}
          onMouseLeave={() => {dispatch(hoverOff())}}
          className={`relative overflow-hidden flex duration-500 py-3 px-4 items-center justify-between border-b
          ${!isActive ? 'px-4 border-[#00000030] dark:border-[#ffffff30]' : 'px-8 text-themeColor before:translate-x-0 before:opacity-100 rounded-t-lg border-transparent'}
          hover:rounded-t-lg hover:text-themeColor hover:px-8
          before:content-[""] before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:bg-themeColor
          before:-translate-x-per100 before:duration-500 before:opacity-0 before:select-none before:pointer-events-none
          hover:before:translate-x-0 hover:before:opacity-100 
          `}>
            <RevealedText 
            wrapper={``}
            className={`${NeueMachinaBold.className} xl:text-[38px] sm:text-[1.2rem]`}
            text={index.toString().length < 2 ? `0${index + 1}.` : `${index + 1}.`}
            />
              
            <StaggeredText once={true}
            className={`${NeueMachinaUltraBold.className} xl:text-[69px] sm:text-[1.5rem] inline-block leading-[1.2] mb-2 glowing`} 
            text={title}
            />
          </div>
          
          <div 
            className={`flex w-full ${!isActive ? 'h-[0px]' : 'lg:h-[180px] sm:h-auto'} overflow-hidden items-center
            duration-300 rounded-b-md`}>
            <div className='lg:p-5 sm:p-3 '>
              <DynamicRevealedTextParagraph once={false} className={`${InterMedium.className} lg:text-2xl sm:text-base leading-relaxed `} text={description}/>
            </div>          
          </div>

        </div>
      </div>
    </>
  )
}


const FourthSection = () => {

  const navigate = usePageNavigate();
  const dispatch = useDispatch();

  return (
    <main className='px-per10 my-20'>

        <div className='flex justify-center sm:py-5'>
          <StaggeredText text={'RECENT WORK'} once={false} repeatDelay={2500}
          className={`${NeueMachinaUltraBold.className} lg:text-[60px] sm:text-[1.55rem]`} />
        </div>

        <DynamicRevealedText once={false} delay={0.2} className='' 
        text={ <div className='h-[1px] lg:w-[50%] sm:w-[75%] mx-auto border-black dark:border-white border border-solid opacity-20 sm:my-1 rounded-r-full'/> }/>

        <div className='flex justify-center py-10'>
          <Magnetic>
            <span 
            onMouseEnter={() => {dispatch(hoverOn())}}
            onMouseLeave={() => {dispatch(hoverOff())}}
            onClick={() => {navigate('/work')}}
            className='relative flex items-center justify-center rounded-md overflow-hidden text-center origin-center duration-[500ms] glassmorphism
            border-themeColor border-1 border-solid 
            bg-[#ffffff78] dark:bg-[#00000078]  dark:shadow-[#ffffff81] shadow-[#00000050]
            
            lg:text-[1rem] 
            sm:text-[0.8rem]
            hover:text-white hover:dark:text-black hover:shadow-md
            before:content-[""] before:absolute before:left-0 before:top-0 before:h-0 before:w-full before:duration-[500ms] before:z-2 before:rounded-md
            before:bg-themeColor before:opacity-80
            hover:before:h-full hover:before:top-[unset] hover:before:bottom-0
            '>
              <span className={`${NeueMachinaUltraBold.className} inline-block lg:p-5 sm:p-3 z-3 lg:text-[1.3rem] w-full h-full`}>MORE WORK..</span>
            </span>
          </Magnetic>
        </div>
      
      

      
    </main>
  )
}
