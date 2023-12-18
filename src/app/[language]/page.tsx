'use client'

import '@/styles/pages/home.scss'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux'
import { hoverOn, hoverOff } from '@/app/redux/slices/cursorSlice';

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
import { InterBold, InterMedium, InterSemiBold, LibraryRegular, LibrarySoft, NeueMachinaBold, NeueMachinaUltraBold } from '@/component/layout/fonts';
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
  
  useGSAP(() => {

    gsap.registerPlugin(ScrollTrigger);

    if(desktop){

      const serviceBoxs = gsap.utils.toArray('.service-box');

      gsap.fromTo('.about-btn', {
        y: '0px',
        rotate:'0deg',
        opacity: 1,
        },
        {
          y: '300px',
          rotate:'360deg',
          opacity: 1,
          scrollTrigger: {
            trigger: '.about-btn',
            markers: false,
            start: 'top 50%',
            end: 'bottom 0%',
            scrub: 0.69,
          }
        },
      );

      collabTimeline.current = gsap.timeline(
        {
          scrollTrigger: {
            trigger: '.collab-trigger',
            markers: false,
            start: 'top 100%',
            end: '100% 0%',
            scrub: true,
          }
        }
      ).from('.collab', { yPercent:-60, opacity:0, })
      .to('.collab', { yPercent:0, opacity:1, })
      .to('.collab', { yPercent:40, opacity:0, })

      serviceBoxs.forEach((el : any) => {
        gsap.fromTo(el, {
          opacity: 0,
          },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: el,
              markers: false,
              start: 'center 100%',
              end: 'bottom 50%',
              scrub: 0.3,
            }
          },
        )})

    }},{ scope: GSAPContext, dependencies: [] });


  return (
    <>
      <main ref={GSAPContext} className=''>
          <FirstSection/>
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
    className='relative w-full home-intro z-1 
    lg:pt-0  
    sm:pt-32 sm:flex sm:flex-col sm:items-start sm:px-[10%]
    '>
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
        <span className='tracking-[0.15rem] lg:text-[0.78rem] sm:text-[0.69rem] border-l border-themeColor border-dashed'>
        SCROLL DOWN
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
        text={ <div className='h-[1px] lg:w-per50 sm:w-per60 ml-[5%] border-black dark:border-white border border-solid opacity-40 sm:my-1 rounded-r-full'/> }/>

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
              <DynamicRevealedText delay={0.6} className={`${InterMedium.className} lg:text-[1rem] sm:text-[0.8rem]`} text={<>MAIN</>}/>
            </div>
        </div>

        <DynamicRevealedText delay={0.8} className='' 
        text={ <div className='h-[1px] lg:w-per25 sm:w-per30 ml-[15%] border-black dark:border-white border border-dashed opacity-40 lg:my-3 sm:my-2 rounded-r-full'/> }/>

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
                <DynamicRevealedText delay={0.9} className={`${InterMedium.className} lg:text-[1rem] sm:text-[0.8rem]`} text={<>MAJOR</>}/>
            </div>
        </div>
      </article>
      
      <div 
      onMouseMove={() => {dispatch(hoverOn('Click!'))}}
      onMouseLeave={() => {dispatch(hoverOff())}}
      className={` ${'about-btn'} origin-center will-change-transform flex justify-center w-[20%] rounded-full
      lg:mx-per10 lg:mt-10 lg:py-0 lg:absolute lg:bottom-28 lg:right-0
      sm:ml-auto sm:py-5 sm:relative sm:right-per10 
      `}>
        <Magnetic>
        <span 
        onClick={() => {navigate('/about')}}
        className={` ${NeueMachinaUltraBold.className} glassmorphism
        relative flex items-center justify-center rounded-full overflow-hidden text-center origin-center duration-[500ms] 
        border-[var(--font-color)] border-[2px] border-solid 
        bg-[#ffffff00] dark:bg-[#00000000]  dark:shadow-[#ffffff81] shadow-[#00000050]
        text-[var(--font-color)]
        xl:w-[200px] xl:h-[200px] xl:text-[20px] 
        lg:w-[180px] lg:h-[180px] lg:text-[1.0rem] 
        sm:w-[130px] sm:h-[130px] sm:text-md 
        hover:text-white hover:dark:text-black hover:border-transparent hover:shadow-2xl  hover:tracking-[0.25rem]
        before:content-[""] before:absolute before:right-0 before:top-0 before:left-0 before:bottom-0 before:m-auto before:h-0 before:w-0 before:duration-[500ms] before:z-2 before:rounded-full
        before:bg-white hover:before:bg-[var(--font-color)] before:opacity-0 hover:before:opacity-100 before:ease-in-out
        hover:before:w-full hover:before:h-full 
        `}
        >
         <span className='block z-3 w-full h-full '><EncryptText target_text='ABOUT ME'/></span>
        </span>
        </Magnetic>
      </div>
      
    </div>
  </>
  )
}

const SecondSection = () => {
  const [isClient, setIsClient] = useState(false); 

  const [maskPosition, setMaskPosition] = useState({x:0, y:0}); 
  const [maskSize, setMaskSize] =  useState(0);

  //
  const updateMaskPosition = useCallback((e : React.MouseEvent<HTMLDivElement, MouseEvent> ) =>{
    showMask();
    const target =  e.currentTarget as HTMLElement;
    const rect  = target.getBoundingClientRect()
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMaskPosition({x:x, y: y});
  },[]);

  function showMask(){
    setMaskSize(500);
  }
  const hideMask = useCallback(() => {
    setMaskSize(0);
  },[])

 
  useEffect(() => {
    hideMask();
    window.addEventListener('scroll', hideMask);

    return () => {
      window.removeEventListener('scroll', hideMask)
    }
  },[hideMask, updateMaskPosition])
  
  useEffect(() => {
    setIsClient(true);
  },[])

  return (
    <section>
      <div 
      className={`relative text-left collab-trigger
      lg:center lg:mb-10 lg:pt-0 h-screen
      md
      sm:flex sm:flex-col sm:justify-center sm:h-[89vh]
      `}
    >     
        <div 
        className={`${'collab'} something relative leading-[1] text-center select-none h-full
        lg:mx-[10%] lg:mt-[7rem] 
        sm:mx-[10%] sm:mt-[3rem] sm:mb-[var(--header-height)] ease-out will-change-transform
        `}>
          
          <div className='absolute w-full h-full flex justify-center items-center pointer-events-none select-none -z-1'>
            <div 
            className='float-bg-gradient h-[18%] w-[69%] rounded-[69%] opacity-70'/>
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
            sm:text-[2.2rem] sm:py-3 sm:px-5
            `}>
              <div className={`${NeueMachinaUltraBold.className} z-3 text-gradient opacity-90`}>EXCEPTIONAL</div>
              <span className={`absolute xl:-right-[35px] sm:right-3 rotate-[-15deg] rounded-md border-4 border-double border-black -z-1
              bg-[#ffe600] text-black ${InterBold.className}
              lg:text-[30px] lg:px-5 lg:py-3 lg:top-[72%]
              md:text-[1.8rem] 
              sm:text-[0.8rem] sm:p-2 sm:pb-1 sm:top-[60%]
              `}>No Bullsh!t</span>
            </div>

            <div className={`relative font-b lg:tracking-[-0.15rem] sm:leading-normal md:leading-none flex
            lg:text-[110px]
            md:text-[3rem]
            sm:text-[1.7rem]
            `}>
            <div className={`${LibraryRegular.className} relative `}>
              <span className=''>DIGITAL</span>
              <ul className={`${InterSemiBold.className} absolute w-full whitespace-nowrap opacity-90 text-left leading-[1.75] tracking-[0.1rem] top-full
                lg:text-[23px] lg:left-1/3  lg:mt-5 
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

          {(isClient && desktop) && 
          <motion.div 
          onMouseLeave={() => {hideMask()}}
          onMouseMove={(e) => {updateMaskPosition(e)}}
          animate={{
            WebkitMaskPosition: `${maskPosition.x - maskSize/2}px ${maskPosition.y - maskSize/2}px`,
            WebkitMaskSize: `${maskSize}px`, 
          }}
          transition={{type:'tween', ease:'backOut'}}
          className={`mask px-6 py-[3.8rem] flex-col items-center absolute h-full w-full justify-center top-0 left-0 select-none z-2 
          xl:flex
          sm:hidden
          `}>
            <div className={`relative tracking-[-0.15rem] 
            lg:text-[110px]
            `}>
              <span className={`${InterBold.className}`}>CRAFTING</span>
            </div>

            <div className={`relative sm:px-5 sm:py-5 rounded-md 
            lg:text-[130px]
            `}>
              <div style={{textShadow: '0 0 15px var(--theme-color)'}} className={`opacity-80 ${NeueMachinaUltraBold.className}`}>EXCEPTIONAL</div>
              <span className={`absolute -right-[35px] top-[72%] rotate-[-15deg] rounded-md border-4 border-double border-black opacity-80 
              bg-[#ffe600] text-black ${InterBold.className}
              lg:text-[30px] lg:px-5 lg:py-3
              `}>No Bullsh!t</span>
            </div>

            <div className={`relative font-b tracking-[-0.15rem] flex  z-2
            lg:text-[110px]
            `}>
            <div className={`mask-text ${LibraryRegular.className}`}>DIGITAL</div>
            <div className='relative'>
              <span className={`${InterBold.className}`}>&nbsp;PRODUCTS</span>
            </div>
            </div>
          </motion.div>
          }

        </div>
      </div>
    </section>
  )
}

const ThirdSection = () => {
  const dispatch = useDispatch();

  const pathSVG = useRef<any>();
  const pathLength = useRef(0);

  const [ servicesTitle, setServicesTitle ] = useState([])
  const servicesContentRef = useRef<Array<HTMLDivElement | null>>([]);
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
    servicesContentRef.current.forEach((ref, i) => {
      if(i === index){
        ref!.style.transitionDuration = '500ms';
        ref!.style.height = '100%';

      }else{
        ref!.style.transitionDuration = '0ms';
        ref!.style.height = '0';
      }
    })
  }

  useEffect(() => {
    pathLength.current = pathSVG.current.getTotalLength();
  },[])

  return (
    <>
      <section 
      className='my-20 relative 
      '
      >
        <div className='absolute top-20 h-auto -z-1 sm:hidden xl:block w-full overflow-hidden opacity-40 select-none pointer-events-none'>
        <svg width="1920" height="604" viewBox="0 0 1920 604" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
           ref={pathSVG}
           style={{
             strokeDasharray: `${pathLength.current}`,
             strokeDashoffset: pathLength.current
           }}
           className={`fill-transparent stroke-black dark:stroke-white stroke-2 svg-draw
           `}
           d="M0 170.14H243.172V2L320.643 79.4376L398.114 2V170.14H390.224V23.8689L320.643 93.4193L293.744 66.5313H410.309V170.14H516.473V66.5313L451.913 2H464.467L516.473 53.9835L568.478 2H580.314L510.017 72.2674V90.5513H524.722V170.14H696.521V338.28H605.421V326.449H795.511V262.276H605.421V180.895H795.511V193.801H615.463V273.748H804.836V338.28H828.867V273.748H932.52V262.276H828.867V193.801H932.52V180.895H842.496V338.28H968.745V180.895H985.96H1085.31V273.748H998.872V262.276H1072.04V193.801H985.96V338.28H998.872V282.734H1072.04V338.28H1168.3L1109.79 180.895H1122.29L1161.8 282.734L1199.81 180.895H1212.82L1161.8 306.253H1141.3V326.449H1242.32V338.28H1257.33V180.895H1242.32V306.253H1272.83V338.28H1456.38V326.449H1336.85V193.801H1456.38V180.895H1324.84V314.26H1484.89V180.895H1592.41V193.801H1504.39V262.276H1592.41V273.748H1504.39V326.449H1592.41V338.28H1524.9V314.26H1694.94V338.28H1637.43V326.449H1765.46V273.748H1637.43V180.895H1765.46V193.801H1627.42V262.276H1754.46V314.26H1845.48V548.455H1920V519.931H1876.49V603H1810.47V404.835H510.017V436.862H541.141V240.198H230.06V2H214.056V157.629H0" stroke="black"/>
          </svg>

        </div>

        <div className='absolute w-full h-full'>
          <div className='w-full h-full overflow-hidden'>
            <div className='absolute w-[44rem] h-[44rem] flex justify-center items-start pointer-events-none select-none top-per40 right-0 translate-x-[50%]  opacity-20'>
              <div 
              className='float-bg-gradient h-[100%] w-[100%] rounded-[50%] mist'/>
            </div>
          </div>    
        </div>
        
        <div className={`relative tracking-[0.1rem] my-5 z-3 flex flex-col justify-center items-center      
        sm:mx-[10.05%] sm:text-base 
        `}>
          <RevealedTextParagraph delay={0} text={['I CAN HELP YOU']}
          className={`${InterSemiBold.className} lg:text-[66px] sm:text-[1.5rem] leading-[1.25] text-stroke`} />
          <RevealedTextParagraph delay={0.1}  text={['WITH']} 
          className={` ${InterBold.className} lg:text-[58px] sm:text-[1.35rem] leading-[1.25]`} />
          <RevealedText delay={0.2} wrapper={'absolute top-[100%] mt-2'}
          text={<Icon icon={`gg:arrow-up-o`} vFlip={true} className='lg:text-[44px] sm:text-[1.25rem]'/>}/>    
        </div>    

        <div 
        className='flex flex-col items-start py-2 
        lg:mt-44  
        sm:mb-10 sm:mt-16
        '>
          <div className='lg:mx-per20 sm:mx-per10 my-10 border-l border-themeColor glassmorphism px-2 py-1 rounded-r-md'>
            <RevealedText 
            className={`${NeueMachinaBold.className} lg:text-[1.2rem] sm:text-[0.78rem] flex items-center`}
            text={<div>TARGET : WEBSTE / WEB APPLICATION</div>}/>
          </div>

          {services.map((s, index) => {
          return (
          <div key={s.title} className='service-box w-full my-8'>
            <div className='lg:w-[60%] sm:w-per80 mx-auto'>
              <div 
              onClick={() => {toggleService(index)}}
              onMouseMove={() => {dispatch(hoverOn('Click!'))}}
              onMouseLeave={() => {dispatch(hoverOff())}}
              className='relative overflow-hidden flex duration-500 py-2 px-4 items-center justify-between
              hover:glassmorphism hover:rounded-t-lg hover:text-themeColor 
              before:content-[""] before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:bg-themeColor
              before:-translate-x-per100 before:duration-500 before:opacity-0 before:select-none before:pointer-events-none
              hover:before:translate-x-0 hover:before:opacity-100 
              '>
                <RevealedText 
                wrapper={``}
                className={`${NeueMachinaBold.className} xl:text-[38px] sm:text-[1.2rem]`}
                text={index.toString().length < 2 ? `0${index + 1}.` : `${index + 1}.`}
                />
                  
                <StaggeredText once={true}
                className={`${NeueMachinaUltraBold.className} xl:text-[69px] sm:text-[1.5rem] inline-block leading-[1.2] mb-2`} 
                text={s.title}
                />
              </div>
              
              <div ref={(el) => servicesContentRef.current[index] = el} 
                className='glassmorphism overflow-hidden h-[0] rounded-b-md border-t border-[#00000020] dark:border-[#ffffff20]'>
                <div className='lg:p-6 sm:p-3 '>
                  <RevealedTextParagraph once={false} className={`lg:text-2xl sm:text-base leading-relaxed `} text={s.description}/>
                </div>          
              </div>

            </div>
          </div>
          )})}
        </div>
       
      </section>
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
            onMouseEnter={() => {dispatch(hoverOn(''))}}
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

