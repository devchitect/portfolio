
import { NeueMachinaUltraBold } from "../layout/fonts";


export default function Marquee({marqueedirec = 'forward', text}){

    return (
      <>
        <div      
        className={`${NeueMachinaUltraBold.className} 
        relative flex select-none opacity-60 border-y-2 border-black dark:border-white dark:text-stroke glassmorphism
        hover:opacity-100 hover:bg-[var(--font-color)] hover:text-white duration-300
        lg:text-[3.8rem] 
        md:text-2xl
        sm:text-lg sm:tracking-wide 
        `}>
          {[1,2].map((i) => {
            return (
              <div key={i}
              className={`${marqueedirec === 'forward' ? 'animate-text-loop' : 'animate-text-loop-reverse'}
              flex shrink-0 min-w-full leading-normal  sm:py-5 
              `}>
                {[1,2,3].map((x) => {
                  return (
                    <p key={x} className="">
                      {text.map((t : string) => {return <span key={t}>&nbsp;{t}&nbsp;-</span>})}
                    </p>
                  )
                })}
              </div>
            )
          })}
         
        </div>
      </>
    )
}