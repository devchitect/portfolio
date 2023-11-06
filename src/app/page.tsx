'use client'

import dynamic from 'next/dynamic'

import '../styles/landing-homepage.scss'

import { useDispatch } from 'react-redux'
import { hoverOn, hoverOff } from '@/app/store/slices/cursorSlice';
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { Icon } from '@iconify/react/dist/iconify.js';
// import { useSelector } from 'react-redux';
// import { RootState } from './store/store';
import Magnetic from '@/component/utils/magnetic'
import EncryptText from '@/component/utils/encrypt-text'

import useIsomorphicLayoutEffect from "@/component/gsap-helper/isomorphic-effect";
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { usePageNavigate } from '@/component/custom-hook/use-page_navigate'


//Code Splitting & Lazy Loading
const DynamicTypedText = dynamic(() => import('../component/utils/typed-text'), {
  loading: () => null,
  ssr: false
})

const textAnimate = {
  initial: {y:'110%'},
  animate: {y:'0%'},
}

const LandingHomepage = () => {

  return (
    <>
      <main className=''>
          <FirstSection/>
          <div className='w-5 h-20'/>
          <SecondSection/>
          <div className='w-5 h-32 '/>
          <ThirdSection/>
          <div className='w-5 lg:h-32 sm:h-14'/>
          <FourthSection/> 
          <div className='w-5 h-32'/>

      </main>
    </>
  )
}
export default LandingHomepage;

function FirstSection(){
  const [isClient, setIsClient] = useState(false); 

  const landingSection = useRef<HTMLElement>(null);
  const landingSectionInView = useInView(landingSection, { once: true });
  const [maskPosition, setMaskPosition] = useState({x:0, y:0}); 
  const maskArea = useRef<any>(null);
  const size = useRef<number>(0)


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
    maskArea.current.style.opacity = '1';
    size.current = 500;
  }
  const hideMask = useCallback(() => {
    maskArea.current.style.opacity = '0';
    size.current = 0;

  },[])

  //
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });
  const yValue = useRef(50);
  const y =  useTransform(scrollYProgress, [0, 1], [`-${yValue.current}%`, `${yValue.current}%`]);
  const opacity = useTransform(scrollYProgress, [0.5, 1], [1,0]);


  useEffect(() => {
    hideMask();
    yValue.current = (typeof window !== 'undefined' && window.innerWidth > 1000) ? 60 : 60;
  },[hideMask, updateMaskPosition])
  
  useEffect(() => {
    setIsClient(true);
  },[])

  return (
    <>
      <section ref={landingSection}  
      className={`home-intro relative text-left 
      lg:center lg:mb-10 lg:pt-0
      md
      sm:flex sm:flex-col sm:pt-20 sm:justify-center
      ${landingSectionInView ? 'duration-[1.8s] ease-out opacity-100 translate-y-0' : 'opacity-0 -translate-y-[20%]'} 
      `}
    > 
    
        <div 
        className='absolute flex items-center dark:text-gray-200 xl:left-per10 xl:mx-0 opacity-50 hover:opacity-100
        md:left-per5 md:bottom-auto md:top-10 md:right-auto md:px-0 md:mx-0
        sm:left-0 sm:top-2 sm:right-auto sm:bottom-auto sm:mx-5 sm:text-sm
        '>
          <Icon icon='gis:globe-share' className=' lg:mr-2 sm:mr-3'/>
          <span>Open for any collaborations and offers.</span>
        </div>

        <div 
        className='absolute flex items-center text-sm dark:text-gray-200 opacity-50 hover:opacity-100
        xl:left-per10 xl:mx-0
        md:left-per5 md:top-3 md:bottom-auto md:right-auto md:px-0 md:mx-0
        sm:left-0 sm:top-12 sm:mx-5
        '>
          <Icon icon='circle-flags:vn' className='lg:mr-2 sm:mr-3'/>
          <span>Presently located in Vietnam.</span>
        </div>

      
        <motion.div 
        ref={targetRef}
        style={(isClient &&  window.innerWidth > 1380) ? {translateY: y, opacity: opacity} : {}} 
        className={`something relative leading-[1] text-center select-none h-full
        lg:mx-[10%] lg:mt-[7rem] 
        sm:mx-[10%] sm:mt-[3rem] sm:mb-[var(--header-height)] ease-out will-change-transform
        `}>
          <div className='absolute w-full h-full flex justify-center items-center pointer-events-none select-none -z-1'>
            <div 
            className='float-bg-gradient h-[30%] w-[69%] rounded-[69%] opacity-70'/>
          </div>

          <div className='px-6 flex flex-col items-center justify-center h-full
          lg:py-[3.8rem]
          sm:py-[1.5rem]
          '>
            <div className='absolute w-full h-full flex justify-center items-center pointer-events-none select-none -z-1 -mt-2'>
              <div 
              className='bg-black dark:bg-white h-[1px] w-[100%] rounded-[69%] opacity-20'/>
            </div>
          
            <div 
            className={`font-b lg:tracking-[-0.15rem] sm:leading-normal md:leading-none opacity-70
            lg:text-[100px]
            md:text-[3rem]
            sm:text-[1.7rem]
            `}>CRAFTING</div>

            <div className={`relative font-telegraf-ultrab sm:py-5 sm:px-5 opacity-90 z-1 pointer-events-none select-none
            lg:text-[120px] 
            md:text-[4.2rem]
            sm:text-[2.2rem]
            `}>
              <div className='z-3 text-gradient opacity-90'>EXCEPTIONAL</div>
              <span className='absolute xl:-right-[35px] sm:right-3 top-[60%] rotate-[-15deg] rounded-md border-4 border-double border-black -z-1
              bg-[#ffe600] text-black font-telegraf-ultrab
              lg:text-[33px] lg:px-5 lg:pt-3 lg:pb-2
              md:text-[1.8rem]
              sm:text-[1rem] sm:p-2 sm:pb-1
              '>No Bullsh!t</span>
            </div>

            <div className={`relative font-b lg:tracking-[-0.15rem] sm:leading-normal md:leading-none  lg:-mt-3 flex
            lg:text-[100px]
            md:text-[3rem]
            sm:text-[1.7rem]
            `}>
            <div className='relative font-l3'>
              <span style={{textShadow: '0 0 5px var(--theme-color)'}} className='opacity-70'>DIGITAL</span>
              <ul className='absolute w-full whitespace-nowrap font-telegraf-rg opacity-90 lg:text-[1.2rem] sm:text-[0.8rem] text-left leading-[1.5] tracking-[0rem] top-full left-1/3 mt-4'>
                <li>+ Website</li>
                <li>+ Web Application</li>
              </ul>
              </div>
            <div className='opacity-70'>&nbsp;PRODUCTS</div>
            </div>
          </div>

          <motion.div 
          ref={maskArea}
          onMouseLeave={() => {hideMask()}}
          onMouseMove={(e) => {updateMaskPosition(e)}}
          animate={{
            WebkitMaskPosition: `${maskPosition.x - size.current/2}px ${maskPosition.y - size.current/2}px`,
            WebkitMaskSize: `${size.current}px`, 
          }}
          transition={{type:'tween', ease:'backOut'}}
          className={`mask px-6 py-[3.8rem] flex-col items-center absolute h-full w-full justify-center top-0 left-0 select-none z-2 
          xl:flex
          sm:hidden
          `}>
            <div className={`relative font-b tracking-[-0.15rem] 
            lg:text-[100px]
            `}>
              <span>CRAFTING</span>
              <div className='absolute bottom-full left-10 mb-1 text-[50px] tracking-[0] opacity-75 font-telegraf-ultrab'>LET&apos;S</div>
            </div>

            <div className={`relative font-telegraf-ultrab sm:px-5 sm:py-5 rounded-md 
            lg:text-[120px]
            `}>
              <div style={{textShadow: '0 0 15px var(--theme-color)'}} className='opacity-80'>EXCEPTIONAL</div>
              <span className='absolute -right-[35px] top-[60%] rotate-[-15deg] rounded-md border-4 border-double border-black opacity-80 
              bg-[#ffe600] text-black font-telegraf-ultrab
              lg:text-[33px] lg:px-5 lg:pt-3 lg:pb-2
              '>No Bullsh!t</span>
            </div>

            <div className={`relative font-b tracking-[-0.15rem] lg:-mt-3 flex -translate-y-[1px] z-2
            lg:text-[100px]
            `}>
            <div className='mask-text font-l3'>DIGITAL</div>
            <div className='relative'>
              <span>&nbsp;PRODUCTS</span>
            <div className='absolute top-full right-0 mt-3 text-[50px] tracking-[0] opacity-75 font-telegraf-ultrab'>TOGETHER !</div>
            </div>
            </div>
          </motion.div>

        </motion.div>
      </section>
    </>
  )
}

function SecondSection(){
  const dispatch = useDispatch();
  const navigate = usePageNavigate();
  //
  const targetRef = useRef<HTMLDivElement>(null);
  const article = useRef<any>();

  const articleInView = useInView(article, {once: true, margin: '0px 0px -30% 0px'})

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });
  const opacity = useTransform(scrollYProgress, [0,0.3], [0,1] )
  const y = useTransform(scrollYProgress, [0, 1], [`${100}%`, `${-100}%`]);

  return(
  <>
    <motion.div ref={targetRef} 
    style={{opacity : opacity}}
    className='relative w-full  
    xl:mt-28
    lg:grid lg:grid-cols-[75%,25%] items-start
    lg:px-[10%]
    md:mt-20
    sm:px-[5%] sm:pt-36 sm:mt-5 sm:flex sm:flex-col will-change-[opacity]
    '>

      <motion.div 
      initial={{translateX: '-100%'}}
      animate={articleInView ? {translateX: '0%'} : {}}
      transition={{duration: 1.5, delay: 0, ease: 'easeOut'}}
      className='absolute h-[2px] left-0 w-full top-0 border border-dotted border-t-2 border-b-0 border-x-0 border-themeColor will-change-transform'/>

      <article
      ref={article}
      className='
      lg:px-0
      sm:px-per5'
      >
        <div
          className='overflow-hidden
          '> 
          <motion.p
          variants={textAnimate}
          initial='initial'
          animate={articleInView ? 'animate' : ''}
          transition={{duration: 0.6, delay: 0.1, ease: 'easeOut'}}
          className=' font-blk tracking-[-0.01rem]
          xl:text-[6.8rem] 
          lg:text-7xl lg:py-3
          md:text-6xl
          sm:text-4xl sm:py-0
          '
          >
          <DynamicTypedText gradient={true} delay={3000} speed={50} cursorC={''} params={['Hello','Xin Chào','こんにちは','Ciao','Guten Tag','안녕하세요','Bonjour','Hola','Привет']}/>
          &nbsp;
          </motion.p>
        </div>   

        <div 
        className='font-rg my-1 ml-1  
        lg:text-[2rem]
        md:text-3xl
        sm:text-lg
        '>
          <div className='overflow-hidden tracking-[-0.09rem]'>
            <motion.p
            variants={textAnimate}
            initial='initial'
            animate={articleInView ? 'animate' : ''}
            transition={{duration: 0.6, delay: 0.2, ease: 'easeOut'}}
            className='xl:text-[2.8rem] lg:py-4 sm:py-1 font-md'>My name is <span className='font-telegraf-ultrab tracking-normal'>Dzung Nguyen</span>,</motion.p>
          </div>

          <div className='leading-[1.5] tracking-[-0.05rem] '>
            <div className='overflow-hidden'>
              <motion.p 
              variants={textAnimate}
              initial='initial'
              animate={articleInView ? 'animate' : ''}
              transition={{duration: 0.6, delay: 0.3, ease: 'easeOut'}}
              className=''>I&apos;m a <span className='text-gradient font-b tracking-tight'>freelance developer</span> that take offers</motion.p>
            </div>
            <div className='overflow-hidden'>
            <motion.p 
              variants={textAnimate}
              initial='initial'
              animate={articleInView ? 'animate' : ''}
              transition={{duration: 0.8, delay: 0.4, ease: 'easeOut'}}
              className=''>whenever there is a need. </motion.p>     
            </div>
          </div>
        </div>
      </article>
      
      <motion.div 
      style={{y: y}}
      onMouseEnter={() => {dispatch(hoverOn('Click!'))}}
      onMouseLeave={() => {dispatch(hoverOff())}}
      initial={{opacity: 0, rotate: '360deg'}}
      animate={articleInView ? {opacity: 1, rotate: '0deg'} : {}}
      transition={{duration: 1, delay: 0, ease: 'easeOut'}}
      className={` 
      lg:mx-auto lg:mt-10 lg:py-0 origin-center
      sm:ml-auto sm:mx-per10 sm:py-10 will-change-transform
      ${articleInView ? 'opacity-1 ' : {}}
      `}>
        <Magnetic>
        <span 
        onClick={() => {navigate('/about')}}
        className='relative flex items-center justify-center rounded-full overflow-hidden text-center font-telegraf-ultrab origin-center duration-300
        border-themeColor border-4 border-double 
        bg-[#ffffff78] dark:bg-[#00000078]  dark:shadow-[#ffffff81] shadow-[#00000050]
        text-themeColor
        xl:w-[250px] xl:h-[250px] xl:text-[1.3rem] 
        lg:w-[180px] lg:h-[180px] lg:text-[1.1rem] 
        sm:w-[130px] sm:h-[130px] sm:text-md 
        hover:text-white hover:border-solid hover:shadow-2xl  hover:tracking-[0.25rem]
        before:content-[""] before:absolute before:right-0 before:top-0 before:h-full before:w-0 before:duration-[500ms] before:z-2 before:rounded-full
        before:bg-themeColor before:opacity-80
        hover:before:w-full hover:before:right-[unset] hover:before:left-0
        '
        >
         <span className='block z-3 w-full h-full'><EncryptText target_text='ABOUT ME'/></span>
        </span>
        </Magnetic>
      </motion.div>
      
    </motion.div>
  </>
  )
}

function ThirdSection(){

  const article = useRef<any>();
  const articleInView = useInView(article, {once: false, margin: '0px 0px -20% 0px'})


  return (
    <>
    <div className='
    relative w-screen overflow-hidden 
    lg:px-[10%] lg:grid lg:grid-cols-[37.5%,62.5%] lg:mt-10
    sm:px-[10%] sm:py-5 sm:mt-5
    '>
      <div className='flex items-center justify-center '>  
        <span className={`text-6xl sm:hidden xl:block hover:scale-150 duration-300
        ${articleInView ? 'opacity-100' : 'opacity-0'}
        `}>&#128640;</span>
      </div>

      <article 
      ref={article}
      className='
      lg:text-[2rem]
      '>

        <div className='overflow-hidden tracking-[-0.09rem]'>
            <motion.p
            variants={textAnimate}
            initial='initial'
            animate={articleInView ? 'animate' : ''}
            transition={{duration: 0.6, delay: 0.1, ease: 'easeOut'}}
            className='xl:text-[38px] font-rg'>I help brands to stand out in the digital era.</motion.p>
          </div>
          <div className='overflow-hidden tracking-[-0.09rem]'>
            <motion.p
            variants={textAnimate}
            initial='initial'
            animate={articleInView ? 'animate' : ''}
            transition={{duration: 0.6, delay: 0.2, ease: 'easeOut'}}
            className='xl:text-[38px] font-rg'>Together we build <span className='font-semib'>a product that both can be proud of</span>.</motion.p>
          </div>     
      </article>
      
    </div>
    </>
  )
}

function FourthSection(){

  const main = useRef<HTMLDivElement>(null);
  const section = useRef<any>();
  const sectionInView = useInView(section, {once: false, margin: '0px 0px -10% 0px'})
  const pathSVG = useRef<any>();
  const pathLength = useRef(0);
  
  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context((self : any) => {
        
      const elements = self.selector('.el');
      
      const markers = false;

      elements.forEach((el, i : number) => {
        gsap.fromTo(el, {
          x: i % 2 === 0 ? '20%' : '100%',
          opacity: 0,
          },
          {
            x: '40%',
            opacity: 1,
            scrollTrigger: {
              trigger: el,
              markers: markers,
              start: 'bottom 95%',
              end: 'top 50%',
              scrub: true,
            }
          },
        );
        }         
      )

    }, main);
    return () => ctx.revert();
  }, []);

  function drawSVG(){
    console.log('asd')
  }

  useEffect(() => {
    pathLength.current = pathSVG.current.getTotalLength();

  },[])
 
  return (
    <>
      <section 
      ref={section}
      className=' mt-5 relative
      '
      >

        <div className='absolute -left-32 top-per15 -z-1'>
          <svg width="2428" height="1549" viewBox="0 0 2428 1549" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
            ref={pathSVG}
            style={{
              strokeDasharray: pathLength.current,
              strokeDashoffset: pathLength.current
            }}
            className={`fill-transparent stroke-black dark:stroke-white
            ${sectionInView && 'svg-draw'}
            `}
            d="M1 156.5C521.8 298.9 914 241.002 907.5 84C904.806 18.9313 934.9 -20.7 1064.5 162.5C1226.5 391.5 1388.24 -91.9995 1431.24 18.0005C1474.24 128 1763.5 227.502 1579 241.002C1394.5 254.502 1390.5 293.5 1697 397.5C2003.5 501.5 1838.5 215.5 1792.5 290C1746.5 364.5 1958.16 575.269 2114 457.002C2255 350 2489 980.5 2412.5 587.5C2365.63 346.702 2094 1124 1640.5 1114C1552.5 1116.17 1418 1057 1371.5 1101.5C1318.68 1152.04 1482 1250.5 1392.5 1279.5C1303 1308.5 1194.5 1210.5 1242 1155C1289.5 1099.5 1213.5 986 1041.5 1229C869.5 1472 1044 806 877.5 1070.5C711 1335 251 1435.5 357 1279.5C441.8 1154.7 186.333 1406.83 48 1548.5" stroke="black"/>
          </svg>

        </div>

        <div className='absolute w-[500px] h-[500px] flex justify-center items-start pointer-events-none select-none -z-1 -top-10 left-per5'>
          <div 
          className='float-bg-gradient h-[69%] w-[69%] rounded-[10%] opacity-30 rotate-45'/>
          <div 
          className='float-bg-gradient h-[30%] w-[100%] rounded-[10%] opacity-30'/>
        </div>

        <div className='absolute w-[50%] h-[50%] flex justify-center items-start pointer-events-none select-none -z-1 top-per30 -right-per30  opacity-30'>
          <div 
          className='float-bg-gradient h-[100%] w-[100%] rounded-[50%] animate-bounce-slow '/>
        </div>

        <h3 className='overflow-hidden tracking-[-0.09rem] mt-5 mb-16 sticky lg:top-[0px] sm:top-[var(--header-height)] h-[var(--header-height)] flex items-center glassmorphism z-3
        sm:px-[10.05%]
        '>
            <motion.p
            variants={textAnimate}
            initial='initial'
            animate={sectionInView ? 'animate' : ''}
            transition={{duration: 0.6, delay: 0, ease: 'easeOut'}}
            className='xl:text-[38px] sm:text-xl font-md'>I can help you with ...</motion.p>
        </h3>    

        <div 
        ref={main} 
        className='flex flex-col items-start '>

          <div className='w-5 h-20'/>

          <div className="el w-1/2 my-5">
            <div>
              <div className='font-telegraf-ultrab text-xl'>1.</div>
              <h4 className='xl:text-7xl sm:text-3xl font-telegraf-ultrab inline-block'><EncryptText target_text='ANALYSIS'/></h4>
              <ul className='lg:text-3xl sm:text-lg pt-5'>
                <li>
                  <span className='leading-[1.5]'>I have the ability to perform some analysis techniques for your business&apos;s digital transformation.</span>
                  <ol className='pl-5 mt-2 leading-[1.7] lg:text-2xl sm:text-lg'>
                  <li><span>- Use-Case Modeling</span></li>
                    <li><span>- SWOT (Strengths, Weaknesses, Opportunities, Threats) </span></li>
                    <li><span>- CATWOE (Clients, Agents, Transformation, World view, Owners, Environment)</span></li>
                  </ol>
                </li>
              </ul>
            </div>
          </div>

          <div className='w-5 h-52'/>

          <div className="el w-1/2 my-5">
            <div>
              <div className='font-telegraf-ultrab text-xl'>2.</div>
              <h4 className='xl:text-7xl sm:text-3xl font-telegraf-ultrab inline-block'><EncryptText target_text='DESIGN'/></h4>
              <ul className='lg:text-3xl sm:text-lg pt-5 leading-[1.5]'>
                <li><span>I deliver strong and user-friendly designs.</span></li>
                <li><span>Minialist yet unforgetable!</span></li>
              </ul>
            </div>
          </div>

          <div className='w-5 h-52'/>

          <div className="el w-1/2 my-5">
            <div>
              <div className='font-telegraf-ultrab text-xl'>3.</div>
              <h4 className='xl:text-7xl sm:text-3xl font-telegraf-ultrab inline-block'><EncryptText target_text='DEVELOPMENT'/></h4>
              <ul className='lg:text-3xl sm:text-lg pt-5 leading-[1.5]'>
                <li><span>Each unique requirement need an unique solution stack!</span></li>
                <li><span>I&apos;m here to crafting your perfect match.</span></li>
              </ul>
            </div>
          </div>

          <div className='w-5 h-52'/>

          <div className="el w-1/2 my-5">
            <div>
              <div className='font-telegraf-ultrab text-xl'>4.</div>
              <h4 className='xl:text-7xl sm:text-3xl font-telegraf-ultrab inline-block'>THE FULL PROCESS</h4>
              <ul className='lg:text-3xl sm:text-lg pt-5'>
                <li><span>A complete website from concept to implementation.</span></li>
              </ul>
            </div>
          </div>


        </div>
       
      </section>
    </>
  )
}

