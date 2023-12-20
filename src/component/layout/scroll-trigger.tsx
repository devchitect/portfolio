'use client'

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function ScrollTrigger(){
 
    const [pos, setPos] = useState<number>();
    const path = usePathname();

    function scrollNow(){
      if(pos! > 0){
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }else{
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          left: 0,
          behavior: 'smooth'
        });
      }
    }

    const  getScrolled =() => {
      const { scrollTop , scrollHeight} = document.documentElement;

      const scrolled = (scrollTop / (scrollHeight - window.innerHeight)) * 100;
      setPos(scrolled);
    }
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior : 'instant'
    });

    window.addEventListener('scroll', getScrolled);
    return () => { 
      window.removeEventListener('scroll', getScrolled); 
    }
  },[path])
  
    return(
      <>   
        <div 
        onClick={() => {scrollNow()}}
        className='fixed opacity-40 hover:opacity-100 z-10 duration-200 hover:scale-125
        text-white bg-black rounded-full dark:text-black dark:bg-white 
        xl:right-[3.5%] xl:bottom-[155px]
        md:right-10 md:bottom-36  md:text-3xl
        sm:right-5 sm:bottom-28 sm:text-2xl
        '>
          <Icon icon='line-md:chevron-up-circle'
          className={`duration-200 ease-out ${pos! > 0 ? 'rotate-0' : 'rotate-180'}`}
          />
        </div>
        
      </>
    )
  }
