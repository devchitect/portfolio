'use client'

import { Icon } from '@iconify/react/dist/iconify.js';
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react';
import { hoverOn, hoverOff } from '@/app/store/slices/cursorSlice';
import { RootState } from '@/app/store/store';
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Magnetic from '../magnetic';
import { usePageNavigate } from '../custom-hook/use-page_navigate';
import EncryptText from '../encrypt-text';


const textAnimate = {
  initial: {y:'110%'},
  animate: {y:'0%'},
}

export default function Footer(){

  const navigate = usePageNavigate();
  const dispatch = useDispatch();
  const targetRef = useRef<HTMLDivElement>(null);
  const getInTouchRef = useRef<any>();
  const article = useRef<any>();
  const { scrollYProgress } = useScroll({
    target: article,
    offset: ["start end", "end start"]
  });

  const GITInView = useInView(getInTouchRef, {once: true, margin: '0px 0px -30% 0px'})

  const y = useTransform(scrollYProgress, [0, 1], [`${100}%`, `${-100}%`]);


  return(
      <>
        <footer className="footer flex flex-col w-full min-h-screen font-extrab
        
        ">
          <div
          className='relative overflow-hidden mt-5 '>
            <Marquee marqueedirec={'forward'}
            text1={{label:'PASSIONATE', color:'linear-gradient(90deg, #fc4a1a, #f7b733)'}} 
            text2={{label:'INNOVATIVE',color:'linear-gradient(90deg, #1A2980, #26D0CE)'}} 
            text3={{label:'OPEN MINDED',color:'linear-gradient(90deg, #333399, #ff00cc)'}}
            /> 
          </div>
          <div
          className='relative overflow-hidden mt-2 '>
            <Marquee  marqueedirec={'backward'}
            text1={{label:'MULTIDISCIPLINARY', color:'var(--gradient-colorful)'}} 
            text2={{label:'INTEGRITY', color:'linear-gradient(90deg, #FF416C, #FF4B2B)'}} 
            text3={{label:'RELIABLE', color:'linear-gradient(90deg, #B3FFAB, #12FFF7)'}}
            /> 
          </div>

          <motion.div 
          ref={article}
          style={{y: y}}
          className=' 
          lg:px-per10 
          sm:px-per5 sm:mt-8
          '>
            <div className='font-l3-soft tracking-[-0.1rem] leading-[1.1] opacity-90
            lg:text-[95px]
            '>
              <div className=''>Let&apos;s</div>
              <div className='mt-2 '><span className='text-gradient'>collaborate</span> !</div>
              </div>
          </motion.div>

          <div 
          ref={targetRef}
          className='relative
          grid lg:grid-cols-[75%,25%] px-per10 items-center
          
          '>

          <motion.div 
          initial={{x: '100%'}}
          animate={GITInView ? {x: '0%'} : {}}
          transition={{duration: 1.5, delay: 0, ease: 'easeOut'}}
          className='absolute h-[2px] left-0 w-full top-0 bottom-0 my-auto border border-double border-t-4 border-b-0 border-x-0 border-themeColor opacity-60'/>


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
            lg:mx-auto lg:py-0 origin-center
            sm:ml-auto sm:mx-per10 sm:py-10 
            
            `}>
              <Magnetic>
              <span 
              onClick={() => {navigate('/contact')}}
              className='relative flex items-center justify-center rounded-full overflow-hidden text-center font-telegraf-ultrab origin-center duration-300
              border-themeColor border-4 border-double 
              bg-[#ffffff] dark:bg-[#000000b9]  dark:shadow-[#ffffff81] shadow-[#00000081]
              text-themeColor
              xl:w-[250px] xl:h-[250px] xl:text-[1.3rem] 
              lg:w-[180px] lg:h-[180px] lg:text-[1.1rem] 
              sm:w-[130px] sm:h-[130px] sm:text-md 
              hover:text-white hover:border-solid hover:shadow-2xl  hover:tracking-[0.05rem]
              before:content-[""] before:absolute before:right-0 before:top-0 before:h-full before:w-0 before:duration-[500ms] before:z-2 before:rounded-full
              before:bg-themeColor before:opacity-80
              hover:before:w-full hover:before:right-[unset] hover:before:left-0
              '
              >
              <span className='block z-3 w-full h-full'><EncryptText target_text='Get in touch'/></span>
              </span>
              </Magnetic>
            </motion.div>
          </div>

          <div
          className='flex items-center mt-auto
          lg:px-per10 lg:justify-between
          sm:px-per5 sm:justify-center sm:py-10
          '>
            <div className="lg:text-lg md:text-md sm:text-sm font-telegraf-ultrab
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
            <div className={`xl:fixed xl:right-12 xl:bottom-1/3 xl:grid xl:grid-flow-row xl:gap-6 xl:text-xl z-10 
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

function Marquee({text1, text2, text3, marqueedirec = 'forward'}){

    return (
      <>
        <motion.div      
        initial={{opacity: 0, filter: 'blur(10px)'}}
        whileInView={{opacity: 1, filter: 'blur(0)'}} 
        transition={{duration: 1}}
        viewport={{margin: '0px 0px -200px 0px', once: true }}
        className='relative flex select-none font-telegraf-ultrab
        lg:text-[3.3rem] 
        md:text-2xl
        sm:text-lg sm:my-2 sm:tracking-normal
        '>
          <div
          className={`flex shrink-0 min-w-full leading-normal border-y-[5px] border-[#11111155] border-double dark:border-[#ffffff55]

          sm:py-5 sm:mt-1 sm:mb-3
          ${marqueedirec === 'forward' ? 'animate-text-loop' : 'animate-text-loop-reverse'}`}>
            <MarqueeText text1={text1} text2={text2} text3={text3}/>
            <MarqueeText text1={text1} text2={text2} text3={text3}/>
            <MarqueeText text1={text1} text2={text2} text3={text3}/>
          </div>
          <div
          className={`flex shrink-0 min-w-full leading-normal border-y-[5px] border-[#11111155] border-double dark:border-[#ffffff55] 

          sm:py-5 sm:mt-1 sm:mb-3
          ${marqueedirec === 'forward' ? 'animate-text-loop' : 'animate-text-loop-reverse'}`}>
            <MarqueeText text1={text1} text2={text2} text3={text3}/>
            <MarqueeText text1={text1} text2={text2} text3={text3}/>
            <MarqueeText text1={text1} text2={text2} text3={text3}/>
          </div>
        </motion.div>
      </>
    )
}
  
  function MarqueeText({text1, text2, text3}){
  
    const theme = useSelector((state : RootState) => state.theme.mode)
  
    const hoverOn = (e : React.MouseEvent<Element, MouseEvent>, color : string) => {
      const target = e.currentTarget as HTMLElement;
      
      if(theme === 'light'){
        color = 'linear-gradient(360deg, black, grey)';
      }
       target.style.backgroundImage = color;
    }
  
    const hoverOut = (e : React.MouseEvent<Element, MouseEvent>) => {
      const target = e.currentTarget as HTMLElement;
      target.style.backgroundImage = 'none';
      target.style.backgroundColor = 'var(--marque-default-bg)';
    }
  
    return (
      <>
        <p>
          <span
          className='marquee-text trans-bg duration-200  border-none'
          onMouseEnter={(e) => {hoverOn(e, text1.color)}}
          onMouseLeave={(e) => {hoverOut(e)}}
          >{text1.label}</span>
          <span className='marquee-line'>&nbsp;&nbsp;-&nbsp;&nbsp;</span> 
          <span
          className='marquee-text trans-bg duration-200 border-none'
          onMouseEnter={(e) => {hoverOn(e, text2.color)}}
          onMouseLeave={(e) => {hoverOut(e)}}
          >{text2.label}</span>
          <span className='marquee-line'>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
          <span
           className='marquee-text trans-bg duration-200 border-none'
           onMouseEnter={(e) => {hoverOn(e, text3.color)}}
           onMouseLeave={(e) => {hoverOut(e)}}
          >{text3.label}</span>
          <span className='marquee-line'>&nbsp;&nbsp;-&nbsp;&nbsp;</span>  
        </p>
      </>
    )
}
  