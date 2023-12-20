
import { NeueMachinaUltraBold } from "../layout/fonts";


export default function Marquee({direction = 'forward', text, contrast = false}){

    return (
      <>
        <div      
        className={`${NeueMachinaUltraBold.className} 
        relative flex select-none border-y-2 border-black dark:border-white dark:text-stroke w-full
        hover:opacity-100 duration-300
        ${contrast ? 'hover:bg-[var(--bg-color)] hover:text-black bg-[var(--font-color)] text-white' : `hover:bg-[var(--font-color)] hover:text-white text-black dark:text-white` }
        lg:text-[3.8rem] 
        md:text-2xl
        sm:text-lg sm:tracking-wide 
        `}>
          {[1,2].map((i) => {
            return (
              <div key={i}
              className={`${direction === 'forward' ? 'animate-text-loop' : 'animate-text-loop-reverse'}
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