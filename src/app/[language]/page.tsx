'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import useIsomorphicLayoutEffect from "@/component/gsap-helper/isomorphic-effect";

import '@/styles/landing-homepage.scss'

import { useDispatch } from 'react-redux'
import { hoverOn, hoverOff } from '@/app/redux/slices/cursorSlice';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Icon } from '@iconify/react/dist/iconify.js';
// import { useSelector } from 'react-redux';
// import { RootState } from './store/store';
import Magnetic from '@/component/utils/magnetic'
import EncryptText from '@/component/utils/encrypted-text'
import { usePageNavigate } from '@/component/custom-hook/use-page_navigate'
import { desktop, minLarge } from '@/component/utils/use-media_queries';
import { RevealedText, RevealedTextParagraph } from '@/component/utils/revealed-text';

//Code Splitting & Lazy Loading
const DynamicTypedText = dynamic(() => import('../../component/utils/typed-text'), {
  loading: () => null,
  ssr: false
})

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

const LandingHomepage = ({params: {language}}) => {

  return (
    <>
      <main className=''>
          <FirstSection/>
          <div className='w-5 h-20'/>
          <SecondSection/>
          <div className='w-5 lg:h-20'/>
          <ThirdSection/>
          <div className='w-5 h-20'/>
          <FourthSection/> 
      </main>
    </>
  )
}
export default LandingHomepage;

function FirstSection(){
  const dispatch = useDispatch();
  const navigate = usePageNavigate();
  //
  const sectionRef = useRef<HTMLDivElement>(null);
  const article = useRef<any>();

  const articleInView = useInView(article, {once: true, amount: 0.3})

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const opacity = useTransform(scrollYProgress, [0.5,1], [1,0] )


  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context((self : any) => {
        
      const elements = self.selector('.el');
      
      const markers = false;

        gsap.fromTo(elements[0], {
          y: '0px',
          opacity: 1,
          },
          {
            y: '400px',
            opacity: 1,
            scrollTrigger: {
              trigger: elements[0],
              markers: markers,
              start: 'top 0%',
              end: 'bottom 0%',
              scrub: 0.75,
            }
          },
        );
    
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);


  return(
  <>
    <div ref={sectionRef} 
    className='relative w-full home-intro z-1 
    lg:pt-0 lg:grid lg:grid-cols-[75%,25%] lg:items-center
    sm:pt-32 sm:flex sm:flex-col sm:items-start sm:px-[10%]
    '>
      <div 
        className='absolute flex items-center dark:text-gray-200 opacity-50 hover:opacity-100
        md:bottom-auto md:top-10 md:right-auto md:px-0 
        sm:left-0 sm:top-2 sm:right-auto sm:bottom-auto sm:mx-per10 sm:text-sm
        '>
          <Icon icon='gis:globe-share' className=' lg:mr-2 sm:mr-3'/>
          <span>Open for any collaborations and offers.</span>
      </div>

      <div 
      className='absolute flex items-center text-sm dark:text-gray-200 opacity-50 hover:opacity-100
      md:top-3 md:bottom-auto md:right-auto md:px-0
      sm:left-0 sm:top-12 sm:mx-per10
      '>
        <Icon icon='circle-flags:vn' className='lg:mr-2 sm:mr-3'/>
        <span>Presently located in Vietnam.</span>
      </div>

      <motion.article
      style={{opacity : opacity}}
      ref={article}
      className='
      lg:px-0
      sm:px-per5'
      >
        <DynamicRevealedText 
        className={`
        font-blk tracking-[-0.01rem]
        xl:text-[110px] 
        lg:text-7xl lg:py-3
        md:text-6xl
        sm:text-4xl sm:py-0
        `} 
        delay={0.1}
        text={<><DynamicTypedText gradient={true} delay={3000} speed={50} cursorC={''} params={['Hello','Xin Chào','こんにちは','Ciao','Guten Tag','안녕하세요','Bonjour','Hola','Привет']}/>&nbsp;</> }
        />
        
        <div 
        className='font-rg my-1 ml-1 leading-loose
        '>
          <DynamicRevealedText
          className={`
          xl:text-[60px] font-md tracking-[-0.09rem] 
          lg:text-[2rem] lg:py-3
          md:text-3xl
          sm:text-lg sm:py-1 
          `} 
          delay={0.2}
          text={<>I am <span className='font-telegraf-ultrab leading-[1.25] tracking-normal'>Dzung Nguyen</span></>}
          />

          <div className='leading-[1.25] tracking-[-0.05rem] '>
            <DynamicRevealedText
            className={`inline-block ml-3
            xl:text-[50px]
            lg:text-[2rem] lg:py-3 
            md:text-3xl
            sm:text-lg
            `} 
            delay={0.3}
            text={<span>- a <><DynamicTypedText classname='font-b' gradient={false} delay={1500} speed={80} cursorC={''} params={['Developer.','Designer.','Learner.']}/>&nbsp;</></span>}
            />
          </div>
        </div>
      </motion.article>
      
      <div 
      onMouseEnter={() => {dispatch(hoverOn('Click!'))}}
      onMouseLeave={() => {dispatch(hoverOff())}}
      className={` el
      lg:mx-auto lg:mt-10 lg:py-0 origin-center
      sm:ml-auto sm:mx-per10 sm:py-10 will-change-transform 
      ${articleInView ? 'opacity-1 duration-150 ' : {}}
      `}>
        <Magnetic>
        <span 
        onClick={() => {navigate('/about')}}
        className='relative flex items-center justify-center rounded-full overflow-hidden text-center font-telegraf-ultrab origin-center duration-300 
        border-themeColor border-4 border-double 
        bg-[#ffffffcd] dark:bg-[#00000078]  dark:shadow-[#ffffff81] shadow-[#00000050]
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
         <span className='block z-3 w-full h-full '><EncryptText target_text='ABOUT ME'/></span>
        </span>
        </Magnetic>
      </div>
      
    </div>
  </>
  )
}

function SecondSection(){
  const [isClient, setIsClient] = useState(false); 

  const [maskPosition, setMaskPosition] = useState({x:0, y:0}); 
  const [maskSize, setMaskSize] =  useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<GSAPTimeline>(
    gsap.timeline({
      defaults: {
        ease: 'back.out',
      },
    })
  );

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
  },[hideMask, updateMaskPosition])
  
  useEffect(() => {
    setIsClient(true);
  },[])


  
  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context((self : any) => {
        
      const elements = self.selector('.el');
      const trigger = self.selector('.trigger');

      const markers = false;

      gsap.fromTo(elements[0], {
        y: '-60%',
        opacity: 0,
        },
        {
          y: '0px',
          opacity: 1,
          scrollTrigger: {
            trigger: trigger,
            markers: markers,
            start: 'top 100%',
            end: 'center 50%',
            scrub: 0.1,
          }
        },
      );   
  
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);



  return (
    <section      
    ref={sectionRef}
    >
      <div 
      className={`h-screen relative text-left trigger
      lg:center lg:mb-10 lg:pt-0
      md
      sm:flex sm:flex-col sm:pt-20 sm:justify-center
      `}
    >     
        <div 
        className={`el something relative leading-[1] text-center select-none h-full
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
            <div className='absolute w-full h-full flex justify-center items-center pointer-events-none select-none -z-1 -mt-2'>
              <div 
              className='bg-black dark:bg-white h-[1px] w-[100%] rounded-[69%] opacity-20'/>
            </div>
          
            <div 
            className={`font-b lg:tracking-[-0.15rem] sm:leading-normal md:leading-none relative
            lg:text-[110px]
            md:text-[3rem]
            sm:text-[1.7rem]
            `}> 
              <div className='flex items-center justify-center absolute right-full top-0 mr-5 mt-3'>  
                <span className={`text-6xl sm:hidden xl:block duration-500 floating
                `}>&#128640;</span>
              </div>
              <div className='absolute bottom-full left-5 mb-1 text-[60px] tracking-[0] opacity-80 font-telegraf-ultrab'>LET&apos;S</div>
              <span>CRAFTING</span>
              </div>

            <div className={`relative font-telegraf-ultrab sm:py-5 sm:px-5  z-1 pointer-events-none select-none
            lg:text-[130px] 
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
            lg:text-[110px]
            md:text-[3rem]
            sm:text-[1.7rem]
            `}>
            <div className='relative font-l3'>
              <span style={{textShadow: '0 0 2px var(--theme-color)'}} className=''>DIGITAL</span>
              <ul className='absolute w-full whitespace-nowrap font-telegraf-rg opacity-90 lg:text-[23px] sm:text-[0.8rem] text-left leading-[1.5] tracking-[0rem] top-full left-1/3 mt-5'>
                <li>+ Website</li>
                <li>+ Web Application</li>
              </ul>
              </div>
            <div className='relative'>
              <span>&nbsp;PRODUCTS</span>
              <div className='absolute top-full right-0 mt-3 text-[50px] tracking-[0] opacity-80 font-telegraf-ultrab'>TOGETHER !</div>
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
            <div className={`relative font-b tracking-[-0.15rem] 
            lg:text-[110px]
            `}>
              <span>CRAFTING</span>
            </div>

            <div className={`relative font-telegraf-ultrab sm:px-5 sm:py-5 rounded-md 
            lg:text-[130px]
            `}>
              <div style={{textShadow: '0 0 15px var(--theme-color)'}} className='opacity-80'>EXCEPTIONAL</div>
              <span className='absolute -right-[35px] top-[60%] rotate-[-15deg] rounded-md border-4 border-double border-black opacity-80 
              bg-[#ffe600] text-black font-telegraf-ultrab
              lg:text-[33px] lg:px-5 lg:pt-3 lg:pb-2
              '>No Bullsh!t</span>
            </div>

            <div className={`relative font-b tracking-[-0.15rem] lg:-mt-3 flex  z-2
            lg:text-[110px]
            `}>
            <div className='mask-text font-l3'>DIGITAL</div>
            <div className='relative'>
              <span>&nbsp;PRODUCTS</span>
            </div>
            </div>
          </motion.div>
          }

        </div>
      </div>
    </section>
  )
}

function ThirdSection(){

  const main = useRef<HTMLDivElement>(null);
  const pathSVG = useRef<any>();
  const pathLength = useRef(0);
  
  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context((self : any) => {
        
      const elements = self.selector('.el');
      
      const markers = false;

      elements.forEach((el, i : number) => {
        gsap.fromTo(el, {
          x: i % 2 === 0 ? '-10%' : '50%',
          opacity: 0,
          },
          {
            x: '20%',
            opacity: 1,
            scrollTrigger: {
              trigger: el,
              markers: markers,
              start: '20% 100%',
              end: '1% 50%',
              scrub: 0.89,
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
      className=' my-10 relative 
      '
      >
        <div className='absolute top-[6.9%] h-auto -z-1 sm:hidden xl:block w-full overflow-hidden opacity-40 select-none pointer-events-none'>
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
            <div className='absolute w-[50%] h-[40%] flex justify-center items-start pointer-events-none select-none top-per40 right-0 translate-x-[50%]  opacity-20'>
              <div 
              className='float-bg-gradient h-[100%] w-[100%] rounded-[50%] mist '/>
            </div>
          </div>    
        </div>
        
        <div className=' tracking-[-0.05rem] sticky mt-5 mb-16 h-[var(--header-height)] flex items-center justify-center glassmorphism z-3
        lg:top-[0px] 
        sm:mx-[10.05%] sm:top-[var(--header-height)] sm:px-5 
        '>
          <DynamicRevealedText className={`xl:text-[39px] sm:text-xl font-semib py-3 tracking-[0.01rem]`} text={`I can help you with ...`} />
        </div>    

        <div 
        ref={main} 
        className='flex flex-col items-start py-2 '>

          <div className='w-5 lg:h-56 sm:h-24'/>

          <div className="el w-full">
            <div className='w-[60%]'>
              <div className='font-telegraf-ultrab text-xl mb-3'>01.</div>
              <div>
                <RevealedText className={`xl:text-[38px] sm:text-xl font-md py-3`} 
                text={<h3 className='xl:text-[78px] sm:text-3xl mt-2 font-telegraf-ultrab inline-block duration-300'>
                        <EncryptText target_text='ANALYSIS'/></h3>} />
              </div> 
              <div className='lg:text-2xl sm:text-base px-6 py-3 glassmorphism rounded-md mt-5 '>
                <div className='inline-block'>
                  <div>
                    <RevealedTextParagraph
                    className='leading-[1.5]'
                    text={["I have the ability to perform some analysis techniques for your business's digital transformation."]}
                    />
                    <div className='pl-5 mt-2 leading-[1.7] lg:text-lg sm:text-sm'>
                      <RevealedTextParagraph
                      className=''
                      text={["- Use-Case Modeling",
                      "- SWOT (Strengths, Weaknesses, Opportunities, Threats) ",
                      "- CATWOE (Clients, Agents, Transformation, World view, Owners, Environment)"
                      ]}
                      />
                    </div>
                  </div>
                </div>    
              </div>
            </div>
          </div>

          <div className='w-5 lg:h-48 sm:h-24'/>

          <div className="el w-full">
            <div className='w-[60%]'>
              <div className='font-telegraf-ultrab text-xl mb-3'>02.</div>
              <div>
                <RevealedText className={`xl:text-[38px] sm:text-xl font-md py-3`} 
                text={<h4 className='xl:text-[78px] sm:text-3xl mt-2 font-telegraf-ultrab inline-block duration-300'><EncryptText target_text='DESIGN'/></h4>} />
              </div>
              <div className='lg:text-2xl sm:text-base px-6 py-3 glassmorphism rounded-md leading-[1.5] mt-5'>
                <div className='inline-block'>
                <RevealedTextParagraph
                text={["I deliver strong and user-friendly designs.","Minialist yet unforgetable!"]}
                />
                </div>    
              </div>
            </div>
          </div>

          <div className='w-5 lg:h-48 sm:h-24'/>

          <div className="el w-full">
            <div className='w-[60%]'>
              <div className='font-telegraf-ultrab text-xl mb-3'>03.</div>
              <RevealedText className={`xl:text-[38px] sm:text-xl font-md py-3`} text={<h4 className='xl:text-[78px] sm:text-3xl mt-2 font-telegraf-ultrab inline-block duration-300'><EncryptText target_text='DEVELOPMENT'/></h4>} />
              <div className='lg:text-2xl sm:text-base leading-[1.5] px-6 py-3 glassmorphism rounded-md mt-5'>
              <div className='inline-block'>
              <RevealedTextParagraph
                text={["Each unique requirement need an unique solution stack!","I'm here to crafting your perfect match."]}
                />
              </div>    
              </div>
            </div>
          </div>

          <div className='w-5 lg:h-48 sm:h-24'/>

          <div className="el w-full">
            <div className='w-[60%]'>
              <div className='font-telegraf-ultrab text-xl mb-3'>04.</div>
              <RevealedText className={`xl:text-[38px] sm:text-xl font-md py-3`} text={<h4 className='xl:text-[78px] sm:text-3xl mt-2 font-telegraf-ultrab inline-block duration-300'>THE FULL PROCESS</h4>} />
              <div className='lg:text-2xl sm:text-base px-6 py-3 glassmorphism rounded-md mt-5'>
                <div className='inline-block'>
                <RevealedTextParagraph
                text={["A complete website from concept to implementation."]}
                />
                </div>    
              </div>
            </div>
          </div>

        </div>
       
      </section>
    </>
  )
}

function FourthSection(){
  return (
    <main>

    </main>
  )
}

