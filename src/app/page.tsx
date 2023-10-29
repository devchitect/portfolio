'use client'

import dynamic from 'next/dynamic'

import '../styles/landing-homepage.scss'

import { useDispatch } from 'react-redux'
import { hoverOn, hoverOff } from '@/app/store/slices/cursorSlice';
import { use, useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useAnimationFrame, useSpring, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import Magnetic from '@/component/magnetic'
import EncryptText from '@/component/encrypt-text'

import useIsomorphicLayoutEffect from "@/component/gsap-helper/isomorphic-effect";
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { usePageNavigate } from '@/component/custom-hook/use-page_navigate'

//Code Splitting & Lazy Loading
const DynamicTypedText = dynamic(() => import('../component/typed-text'), {
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
          <div className='w-5 h-28'/>
          <SecondSection/>
          <div className='w-5 h-40'/>
          <ThirdSection/>
          <div className='w-5 h-40'/>
          <FourthSection/> 
          <div className='w-5 h-40'/>

      </main>
    </>
  )
}
export default LandingHomepage;

function FirstSection(){
  const dispatch = useDispatch();
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
    yValue.current = (typeof window !== 'undefined' && window.innerWidth > 1000) ? 60 : 75;
  },[hideMask, updateMaskPosition])
  
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
        style={{y: y, opacity: opacity}} 
        className={`something relative leading-[1] text-center select-none h-full
        lg:ml-[10%] lg:mr-[10.2%] lg:mt-[7rem] 
        sm:mt-[2rem] sm:mb-[var(--header-height)] sm:mx-per5 ease-out will-change-[transform] 
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
            sm:text-[1.5rem]
            `}>CRAFTING</div>

            <div className={` font-telegraf-ultrab sm:py-5 sm:px-5 opacity-90 
            lg:text-[120px] 
            md:text-[4.2rem]
            sm:text-[2rem]
            `}>EXCEPTIONAL</div>

            <div className={`relative font-b lg:tracking-[-0.15rem] sm:leading-normal md:leading-none opacity-70  lg:-mt-3
            lg:text-[100px]
            md:text-[3rem]
            sm:text-[1.5rem]
            `}>
            <span className='font-l3'>DIGITAL</span><span>&nbsp;PRODUCTS</span>
            <span className='absolute -right-[35px] top-[95%] rotate-[-15deg] rounded-md opacity-90 border-4 border-double border-black
            bg-[#ffff00] text-black
             lg:text-[44px] lg:px-5 lg:py-3 
             md:text-[1.8rem]
             sm:text-[1.2rem] sm:p-1
            '>No Bullsh!t</span>
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
          className={`mask px-6 py-[3.8rem] flex-col items-center absolute h-full w-full justify-center top-0 left-0 select-none
          xl:flex
          sm:hidden
          `}>
            <div className={`font-b tracking-[-0.15rem] 
            lg:text-[100px]
            `}>CRAFTING</div>

            <div className={`text-gradient font-telegraf-ultrab sm:py-5 rounded-md  
            lg:text-[120px]
            `}>EXCEPTIONAL</div>

            <div className={`relative font-b tracking-[-0.15rem] lg:-mt-3
            lg:text-[100px]
            `}>
            <span className='mask-text font-l3'>DIGITAL</span><span>&nbsp;PRODUCTS</span>
            <span className='absolute -right-[25px] top-[100%] rotate-[-0deg] rounded-md p-3 tracking-tight
            bg-[#0fff0f] text-black border-4 border-double border-black
             lg:text-[39px]
             md:text-[3rem]
             sm:text-[1.5rem]
            '>For Real &#x1F609;!</span>
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
      initial={{x: '-100%'}}
      animate={articleInView ? {x: '0%'} : {}}
      transition={{duration: 1.5, delay: 0, ease: 'easeOut'}}
      className='absolute h-[2px] left-0 w-full top-0 border border-dotted border-t-2 border-b-0 border-x-0 border-themeColor will-change-transform'/>

      <article
      ref={article}
      className='
      lg:px-0
      sm:px-per5'
      >
        <div
          className='font-blk tracking-[-0.05rem] overflow-hidden 

          '> 
          <motion.p
          variants={textAnimate}
          initial='initial'
          animate={articleInView ? 'animate' : ''}
          transition={{duration: 0.6, delay: 0.1, ease: 'easeOut'}}
          className='
          xl:text-[6.8rem]
          lg:text-7xl lg:py-5
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
      sm:ml-auto sm:mx-per10 sm:py-10 
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
         <span className='block z-3 w-full h-full'><EncryptText target_text='About me'/></span>
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
  const sectionInView = useInView(section, {once: false, margin: '0px 0px -20% 0px'})

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context((self : any) => {
        
      const el1 = self.selector('.el1');
      const el2 = self.selector('.el2');
      const el3 = self.selector('.el3');

      const markers = false;

      gsap.fromTo(el1, {
        x: '20%',
        opacity: 0,
        },
        {
          x: '40%',
          opacity: 1,
          scrollTrigger: {
            trigger: el1,
            markers: markers,
            start: 'bottom 90%',
            end: 'top 40%',
            scrub: true,
          }
        },
      );

      gsap.fromTo(el2, {
        x: '40%',
        opacity: 0,
        },
        {
          x: '60%',
          opacity: 1,
          scrollTrigger: {
            trigger: el2,
            markers: markers,
            start: 'bottom 90%',
            end: 'top 40%',
            scrub: true,
          }
        },
      );


      gsap.fromTo(el3, {
        x: '60%',
        opacity: 0,
        },
        {
          x: '80%',
          opacity: 1,
          scrollTrigger: {
            trigger: el3,
            markers: markers,
            start: 'bottom 90%',
            end: 'top 40%',
            scrub: true,
          }
        },
      );

    }, main);
    return () => ctx.revert();
  }, []);
 
  return (
    <>
      <section 
      ref={section}
      className=' mt-28
      '
      >
        <h3 className='overflow-hidden tracking-[-0.09rem] mt-5 mb-16
        lg:px-[10.05%]
        '>
            <motion.p
            variants={textAnimate}
            initial='initial'
            animate={sectionInView ? 'animate' : ''}
            transition={{duration: 0.6, delay: 0, ease: 'easeOut'}}
            className='xl:text-[44px] font-md'>I can help you with...</motion.p>
        </h3>    

        <div 
        ref={main} 
        className='flex flex-col items-start'>

          <div className="el1 w-1/2 my-5">
            <div>
              <div className='font-telegraf-ultrab text-lg'>1.</div>
              <h4 className='xl:text-6xl font-telegraf-ultrab'>Design</h4>
              <ul className='text-2xl pt-5'>
                <li><span>I deliver strong and user-friendly designs.</span></li>
              </ul>
            </div>
          </div>

          <div className='w-5 h-40'/>

          <div className="el2 w-1/2 my-5">
            <div>
              <div className='font-telegraf-ultrab text-lg'>2.</div>
              <h4 className='xl:text-6xl font-telegraf-ultrab'>Development</h4>
              <ul className='text-2xl pt-5'>
                <li><span>Anything in my tech-stack that match your requirement. </span></li>
              </ul>
            </div>
          </div>

          <div className='w-5 h-40'/>

          <div className="el3 w-1/2 my-5">
            <div>
              <div className='font-telegraf-ultrab text-lg'>3.</div>
              <h4 className='xl:text-6xl font-telegraf-ultrab'>The full package</h4>
              <ul className='text-2xl pt-5'>
                <li><span>A complete website from concept to implementation. The Wombo Combo.</span></li>
              </ul>
            </div>
          </div>


        </div>
       
      </section>
    </>
  )
}

