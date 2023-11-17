'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import useIsomorphicLayoutEffect from "@/component/gsap-helper/isomorphic-effect";

import '../styles/landing-homepage.scss'

import { useDispatch } from 'react-redux'
import { hoverOn, hoverOff } from '@/app/store/slices/cursorSlice';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Icon } from '@iconify/react/dist/iconify.js';
// import { useSelector } from 'react-redux';
// import { RootState } from './store/store';
import Magnetic from '@/component/utils/magnetic'
import EncryptText from '@/component/utils/encrypted-text'
import { RevealedText, RevealedTextParagraph } from '@/component/utils/revealed-text';
import { usePageNavigate } from '@/component/custom-hook/use-page_navigate'
import { desktop, minLarge } from '@/component/utils/use-media_queries';

//Code Splitting & Lazy Loading
const DynamicTypedText = dynamic(() => import('../component/utils/typed-text'), {
  loading: () => null,
  ssr: false
})

const LandingHomepage = () => {

  return (
    <>
      <main className=''>
          <FirstSection/>
          <div className='w-5 h-20'/>
          <SecondSection/>
          <div className='w-5 lg:h-40 sm:h-20 '/>
          <ThirdSection/>
          <div className='w-5 h-40'/>
          <FourthSection/> 
          <div className='w-5 h-40'/>
          <FifthSection/> 

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
    yValue.current = minLarge ? 60 : 60;
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
        style={(isClient &&  desktop) ? {y: y, opacity: opacity} : {}} 
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

            <div className={`relative font-b lg:tracking-[-0.15rem] sm:leading-normal md:leading-none lg:-mt-3 flex
            lg:text-[100px]
            md:text-[3rem]
            sm:text-[1.7rem]
            `}>
            <div className='relative font-l3'>
              <span style={{textShadow: '0 0 2px var(--theme-color)'}} className='opacity-70'>DIGITAL</span>
              <ul className='absolute w-full whitespace-nowrap font-telegraf-rg opacity-90 lg:text-[23px] sm:text-[0.8rem] text-left leading-[1.5] tracking-[0rem] top-full left-1/3 mt-5'>
                <li>+ Website</li>
                <li>+ Web Application</li>
              </ul>
              </div>
            <div className='opacity-70'>&nbsp;PRODUCTS</div>
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

            <div className={`relative font-b tracking-[-0.15rem] lg:-mt-3 flex  z-2
            lg:text-[100px]
            `}>
            <div className='mask-text font-l3'>DIGITAL</div>
            <div className='relative'>
              <span>&nbsp;PRODUCTS</span>
            <div className='absolute top-full right-0 mt-3 text-[50px] tracking-[0] opacity-75 font-telegraf-ultrab'>TOGETHER !</div>
            </div>
            </div>
          </motion.div>
          }

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

  const articleInView = useInView(article, {once: true, amount: 0.3})

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });
  const opacity = useTransform(scrollYProgress, [0,0.5], [0,1] )
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
      className='absolute h-[2px] left-0 w-full top-0 border border-solid border-t border-b-0 border-x-0  will-change-transform opacity-60'/>

      <article
      ref={article}
      className='
      lg:px-0
      sm:px-per5'
      >
        <RevealedText 
        className={`
        font-blk tracking-[-0.01rem]
        xl:text-[6.8rem] 
        lg:text-7xl lg:py-3
        md:text-6xl
        sm:text-4xl sm:py-0
        `} 
        delay={0.1}
        text={<><DynamicTypedText gradient={true} delay={3000} speed={50} cursorC={''} params={['Hello','Xin Chào','こんにちは','Ciao','Guten Tag','안녕하세요','Bonjour','Hola','Привет']}/>&nbsp;</> }
        />
        <div 
        className='font-rg my-1 ml-1  
        lg:text-[2rem]
        md:text-3xl
        sm:text-lg
        '>
          <RevealedText 
          className={`
          xl:text-[2.8rem] lg:py-4 sm:py-1 font-md tracking-[-0.09rem]
          `} 
          delay={0.2}
          text={<>My name is <span className='font-telegraf-ultrab tracking-normal'>Dzung Nguyen</span>,</>}
          />
          <div className='leading-[1.5] tracking-[-0.05rem] '>
            <RevealedText 
            className={`
            `} 
            delay={0.3}
            text={<>I&apos;m a <span className='text-gradient font-b tracking-tight'>freelance developer</span> that take offers</>}
            />

            <RevealedText 
            className={`
            `} 
            delay={0.4}
            text={<>whenever there is a need.</>}
            />
          </div>
        </div>
      </article>
      
      <motion.div 
      onMouseEnter={() => {dispatch(hoverOn('Click!'))}}
      onMouseLeave={() => {dispatch(hoverOff())}}
      initial={{opacity: 0, rotate: '360deg'}}
      animate={articleInView ? {opacity: 1, rotate: '0deg'} : {}}
      transition={{duration: 1, delay: 0, ease: 'easeOut'}}
      style={{y: y}}
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
         <span className='fixed block z-3 w-full h-full'><EncryptText target_text='ABOUT ME'/></span>
        </span>
        </Magnetic>
      </motion.div>
      
    </motion.div>
  </>
  )
}

function ThirdSection(){

  const article = useRef<any>();
  const articleInView = useInView(article, {once: false, amount: 0.2})


  return (
    <>
    <div className='
    relative w-screen overflow-hidden 
    lg:px-[10%] lg:grid lg:grid-cols-[37.5%,62.5%] lg:mt-10
    sm:px-[10%] sm:py-5 sm:mt-5
    '>
      <div className='flex items-center justify-center '>  
        <span className={`text-6xl sm:hidden xl:block  duration-500 floating
        ${articleInView ? 'opacity-100' : 'opacity-0'}
        `}>&#128640;</span>
      </div>

      <article 
      ref={article}
      className='
      lg:text-[2rem] tracking-[-0.09rem]
      '>
        <RevealedText
        className={`
        xl:text-[38px] font-rg 
        `}
        text={<>I help brands to stand out in the digital era.</>}
        />

        <RevealedText
        className={`
        xl:text-[38px] font-rg
        `}
        text={<>Together we build <span className='font-semib'>a product that both can be proud of</span>.</>}
        />
      </article>
      
    </div>
    </>
  )
}

function FourthSection(){

  const main = useRef<HTMLDivElement>(null);
  const section = useRef<any>();
  const sectionInView = useInView(section, {once: false, margin: '0px 0px -5% 0px'})
  const pathSVG = useRef<any>();
  const pathLength = useRef(0);
  
  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context((self : any) => {
        
      const elements = self.selector('.el');
      
      const markers = false;

      elements.forEach((el, i : number) => {
        gsap.fromTo(el, {
          x: i % 2 === 0 ? '10%' : '50%',
          opacity: 0,
          },
          {
            x: '20%',
            opacity: 1,
            scrollTrigger: {
              trigger: el,
              markers: markers,
              start: 'bottom 98%',
              end: 'top 38%',
              scrub: true,
            }
          },
        );
        }         
      )

    }, main);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    pathLength.current = pathSVG.current.getTotalLength();
  },[])

  return (
    <>
      <section 
      ref={section}
      className=' mt-5 relative overflow-hidden
      '
      >

        <div className='absolute top-[6.9%] h-auto -z-1 sm:hidden xl:block w-full overflow-hidden opacity-40'>
        <svg width="1920" height="604" viewBox="0 0 1920 604" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
           ref={pathSVG}
           style={{
             strokeDasharray: `${pathLength.current}`,
             strokeDashoffset: pathLength.current
           }}
           className={`fill-transparent stroke-black dark:stroke-white stroke-2
           ${sectionInView && 'svg-draw'}
           `}
           d="M0 170.14H243.172V2L320.643 79.4376L398.114 2V170.14H390.224V23.8689L320.643 93.4193L293.744 66.5313H410.309V170.14H516.473V66.5313L451.913 2H464.467L516.473 53.9835L568.478 2H580.314L510.017 72.2674V90.5513H524.722V170.14H696.521V338.28H605.421V326.449H795.511V262.276H605.421V180.895H795.511V193.801H615.463V273.748H804.836V338.28H828.867V273.748H932.52V262.276H828.867V193.801H932.52V180.895H842.496V338.28H968.745V180.895H985.96H1085.31V273.748H998.872V262.276H1072.04V193.801H985.96V338.28H998.872V282.734H1072.04V338.28H1168.3L1109.79 180.895H1122.29L1161.8 282.734L1199.81 180.895H1212.82L1161.8 306.253H1141.3V326.449H1242.32V338.28H1257.33V180.895H1242.32V306.253H1272.83V338.28H1456.38V326.449H1336.85V193.801H1456.38V180.895H1324.84V314.26H1484.89V180.895H1592.41V193.801H1504.39V262.276H1592.41V273.748H1504.39V326.449H1592.41V338.28H1524.9V314.26H1694.94V338.28H1637.43V326.449H1765.46V273.748H1637.43V180.895H1765.46V193.801H1627.42V262.276H1754.46V314.26H1845.48V548.455H1920V519.931H1876.49V603H1810.47V404.835H510.017V436.862H541.141V240.198H230.06V2H214.056V157.629H0" stroke="black"/>
          </svg>

        </div>

        <div className='absolute w-[50%] h-[40%] flex justify-center items-start pointer-events-none select-none top-per40 right-0 translate-x-[50%]  opacity-20'>
          <div 
          className='float-bg-gradient h-[100%] w-[100%] rounded-[50%] mist '/>
        </div>


        <div className=' tracking-[-0.05rem] mt-5 mb-16 sticky lg:top-[0px] sm:top-[var(--header-height)] h-[var(--header-height)] flex items-center glassmorphism z-3
        sm:px-[10.05%]
        '>
          <RevealedText className={`xl:text-[38px] sm:text-xl font-md py-3`} text={`I can help you with ...`} />
        </div>    

        <div 
        ref={main} 
        className='flex flex-col items-start '>

          <div className='w-5 lg:h-60 sm:h-28'/>

          <div className="el w-full my-20">
            <div className='w-[60%]'>
              <div className='font-telegraf-ultrab text-xl mb-5'>01.</div>
              <h4 className='xl:text-[78px] sm:text-3xl font-telegraf-ultrab inline-block hover:tracking-wider duration-300'><EncryptText target_text='ANALYSIS'/></h4>
              <ul className='lg:text-3xl sm:text-lg p-6 glassmorphism rounded-md mt-5'>
                  <li>
                  <RevealedTextParagraph
                  className='leading-[1.5]'
                  once={false}
                  text={["I have the ability to perform some analysis techniques for your business's digital transformation."]}
                  />
                  <div className='pl-5 mt-2 leading-[1.7] lg:text-2xl sm:text-base'>
                    <RevealedTextParagraph
                    className=''
                    once={false}
                    text={["- Use-Case Modeling",
                    "- SWOT (Strengths, Weaknesses, Opportunities, Threats) ",
                    "- CATWOE (Clients, Agents, Transformation, World view, Owners, Environment)"
                    ]}
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className='w-5 lg:h-48 sm:h-28'/>

          <div className="el w-full my-20">
            <div className='w-[60%]'>
              <div className='font-telegraf-ultrab text-xl mb-5'>02.</div>
              <h4 className='xl:text-[78px] sm:text-3xl font-telegraf-ultrab inline-block hover:tracking-wider duration-300'><EncryptText target_text='DESIGN'/></h4>
              <ul className='lg:text-3xl sm:text-lg p-6 glassmorphism rounded-md leading-[1.5] mt-5'>
                <RevealedTextParagraph
                once={false}
                text={["I deliver strong and user-friendly designs.","Minialist yet unforgetable!"]}
                />
              </ul>
            </div>
          </div>

          <div className='w-5 lg:h-48 sm:h-28'/>

          <div className="el w-full my-20">
            <div className='w-[60%]'>
              <div className='font-telegraf-ultrab text-xl mb-5'>03.</div>
              <h4 className='xl:text-[78px] sm:text-3xl font-telegraf-ultrab inline-block hover:tracking-wider duration-300'><EncryptText target_text='DEVELOPMENT'/></h4>
              <ul className='lg:text-3xl sm:text-lg leading-[1.5] p-6 glassmorphism rounded-md mt-5'>
                <RevealedTextParagraph
                once={false}
                text={["Each unique requirement need an unique solution stack!","I'm here to crafting your perfect match."]}
                />
              </ul>
            </div>
          </div>

          <div className='w-5 lg:h-48 sm:h-28'/>

          <div className="el w-full my-20">
            <div className='w-[60%]'>
              <div className='font-telegraf-ultrab text-xl mb-5'>04.</div>
              <h4 className='xl:text-[78px] sm:text-3xl font-telegraf-ultrab inline-block select-none hover:tracking-wider duration-300'>THE FULL PROCESS</h4>
              <ul className='lg:text-3xl sm:text-lg p-6 glassmorphism rounded-md mt-5'>
                <RevealedTextParagraph
                once={false}
                text={["A complete website from concept to implementation."]}
                />
              </ul>
            </div>
          </div>


        </div>
       
      </section>
    </>
  )
}

function FifthSection(){
  return (
    <main>

    </main>
  )
}

