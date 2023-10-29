import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import { hoverOn,hoverOff } from "@/app/store/slices/cursorSlice";
import { Icon } from "@iconify/react/dist/iconify.js";

export function ScrollTrigger(){
 
    const [pos, setPos] = useState<number>();
    const dispatch = useDispatch();  
    const path = usePathname();

    function scrollNow(){
      if(pos! > 0){
        window.scrollTo(0,0);
      }else{
        window.scrollTo(0,document.documentElement.scrollHeight);
      }
    }

    const  getScrolled =() => {
      const { scrollTop , scrollHeight} = document.documentElement;

      const scrolled = (scrollTop / (scrollHeight - window.innerHeight)) * 100;
      setPos(scrolled);
    }
  
  useEffect(() => {
    window.scrollTo(0,0);

    window.addEventListener('scroll', getScrolled);
    return () => { 
      window.removeEventListener('scroll', getScrolled); 
    }
  },[path])
  
    return(
      <>   
        <div 
        onMouseEnter={() => {dispatch(hoverOn(''))}}
        onMouseLeave={() => {dispatch(hoverOff())}}
        onClick={() => {scrollNow()}}
        className='fixed opacity-40 hover:opacity-100 z-2 
        text-white bg-black rounded-full dark:text-black dark:bg-white dark:hover:bg-darkTheme
        md:right-10 md:bottom-24  md:text-3xl
        sm:right-5 sm:bottom-16 sm:text-2xl
        '>
          <Icon icon='line-md:chevron-up-circle'
          className="duration-200 ease-out "
          style={{transform: `${pos! > 0 ? 'rotate(0deg)' : 'rotate(180deg)'}`}}
          />
        </div>
        
      </>
    )
  }
