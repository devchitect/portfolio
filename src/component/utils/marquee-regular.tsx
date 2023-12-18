
import { NeueMachinaUltraBold } from "../layout/fonts";
import { RootState } from '@/app/redux/store';
import { useSelector } from 'react-redux'

export default function Marquee({text1, text2, text3, marqueedirec = 'forward'}){

    return (
      <>
        <div      
        className={`relative flex select-none ${NeueMachinaUltraBold.className}
        lg:text-[3.8rem] 
        md:text-2xl
        sm:text-lg sm:tracking-wide 
        `}>
          <div
          className={`flex shrink-0 min-w-full leading-normal border-y-[4px] border-[#11111155] border-double dark:border-[#ffffff55]

          sm:py-4
          ${marqueedirec === 'forward' ? 'animate-text-loop' : 'animate-text-loop-reverse'}`}>
            <MarqueeText text1={text1} text2={text2} text3={text3}/>
            <MarqueeText text1={text1} text2={text2} text3={text3}/>
            <MarqueeText text1={text1} text2={text2} text3={text3}/>
          </div>
          <div
          className={`flex shrink-0 min-w-full leading-normal border-y-[4px] border-[#11111155] border-double dark:border-[#ffffff55] 

          sm:py-4
          ${marqueedirec === 'forward' ? 'animate-text-loop' : 'animate-text-loop-reverse'}`}>
            <MarqueeText text1={text1} text2={text2} text3={text3}/>
            <MarqueeText text1={text1} text2={text2} text3={text3}/>
            <MarqueeText text1={text1} text2={text2} text3={text3}/>
          </div>
        </div>
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
          className='marquee-text bg-clip-text duration-200  border-none'
          onMouseEnter={(e) => {hoverOn(e, text1.color)}}
          onMouseLeave={(e) => {hoverOut(e)}}
          >{text1.label}</span>
          <span className='marquee-line'>&nbsp;&nbsp;-&nbsp;&nbsp;</span> 
          <span
          className='marquee-text bg-clip-text duration-200 border-none'
          onMouseEnter={(e) => {hoverOn(e, text2.color)}}
          onMouseLeave={(e) => {hoverOut(e)}}
          >{text2.label}</span>
          <span className='marquee-line'>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
          <span
           className='marquee-text bg-clip-text duration-200 border-none'
           onMouseEnter={(e) => {hoverOn(e, text3.color)}}
           onMouseLeave={(e) => {hoverOut(e)}}
          >{text3.label}</span>
          <span className='marquee-line'>&nbsp;&nbsp;-&nbsp;&nbsp;</span>  
        </p>
      </>
    )
}
  