
import { motion } from "framer-motion";
import { PPTelegrafUltrabold } from "./fonts";
import { RootState } from '@/app/store/store';
import { useSelector } from 'react-redux'

export default function Marquee({text1, text2, text3, marqueedirec = 'forward'}){

    return (
      <>
        <motion.div      
        initial={{opacity: 0, filter: 'blur(10px)'}}
        whileInView={{opacity: 1, filter: 'blur(0)'}} 
        transition={{duration: 1}}
        viewport={{margin: '0px 0px -200px 0px', once: true }}
        className={`relative flex select-none ${PPTelegrafUltrabold.className}
        lg:text-[3.3rem] 
        md:text-2xl
        sm:text-lg sm:tracking-normal will-change-[opacity]
        `}>
          <div
          className={`flex shrink-0 min-w-full leading-normal border-y-[5px] border-[#11111155] border-double dark:border-[#ffffff55]

          sm:pt-5 sm:pb-4  
          ${marqueedirec === 'forward' ? 'animate-text-loop' : 'animate-text-loop-reverse'}`}>
            <MarqueeText text1={text1} text2={text2} text3={text3}/>
            <MarqueeText text1={text1} text2={text2} text3={text3}/>
            <MarqueeText text1={text1} text2={text2} text3={text3}/>
          </div>
          <div
          className={`flex shrink-0 min-w-full leading-normal border-y-[5px] border-[#11111155] border-double dark:border-[#ffffff55] 

          sm:pt-5 sm:pb-4 
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
  