'use client'

import { RootState } from "@/app/redux/store";
import { useCallback, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux";
import { NeueMachinaBold } from "./fonts";
import { desktop } from "./responsive-media_queries";
import StaggeredText from "../utils/staggered-text";

const CursorWrapper = () => {
    if(desktop){
        return (
          <Cursor/>
      )}
      return null;
}

const Cursor = () => {
    const {cursorHover, cursorTitle , title} = useSelector((state : RootState) => state.cursor);
    const dot = useRef<any>(null);
    const outline = useRef<any>(null); 
    const l = 333;
    const [latency, setLatency] = useState(l);


    const mouseOnHover = useCallback(() => {
        setLatency(l * 0.5);
        outline.current.classList.add('cursor-outline-hover');
        dot.current.classList.add('cursor-dot-hover');

    },[])
    const mouseOnDesc = useCallback(() => {
        setLatency(0);
        outline.current.classList.add('cursor-title')
    },[])

    const mouseOut = useCallback(() => {
        setLatency(l);
        outline.current.classList.remove('cursor-outline-hover');
        dot.current.classList.remove('cursor-dot-hover');
        if(!cursorTitle){
            outline.current.classList.remove('cursor-title')
        }
    },[cursorTitle])

    const mouseShow = useCallback(() => {
        dot.current.style.opacity = `1`;
        outline.current.style.opacity = `1`;
    },[])

    const mouseHide = () => {
        dot.current.style.opacity = `0`;
        outline.current.style.opacity = `0`;
    }

    const mousePress = useCallback((e) => {
        setLatency(0);
        outline.current.classList.add('cursor-outline-press');
        dot.current.classList.add('cursor-dot-press');

        if (e.offsetX > e.target.clientWidth || e.offsetY > e.target.clientHeight) 
        {
            // mouse down over scroll element
            mouseHide();
        }

    },[])

    const mouseRelease = useCallback(() => {
        setLatency(l);
        mouseShow();
        outline.current.classList.remove('cursor-outline-press');
        dot.current.classList.remove('cursor-dot-press');

    },[mouseShow])

    const mouseMove = useCallback((e: MouseEvent) => {
        mouseShow();
        dot.current.animate({
            left:  `${e.clientX}px`,
            top:  `${e.clientY}px`

        }, {duration: 0, fill: 'forwards'})

        outline.current.animate({
            left:  `${e.clientX}px`,
            top:  `${e.clientY}px`

        }, {duration: latency, fill: 'forwards'})
    },[ mouseShow, latency])


    useEffect(() => {
        if(cursorHover){
            mouseOnHover();
        }else if(cursorTitle){
            mouseOnDesc();
        }else{
            mouseOut();          
        }
        
        window.addEventListener("scroll", mouseOut)
        window.addEventListener('mousemove', mouseMove);
        document.documentElement.addEventListener('mousedown', mousePress);
        document.documentElement.addEventListener('mouseup', mouseRelease);
        document.documentElement.addEventListener('mouseleave', mouseHide);

        return () => {
            window.removeEventListener("scroll", mouseOut)
            window.removeEventListener('mousemove', mouseMove);
            document.documentElement.removeEventListener('mousedown', mousePress);
            document.documentElement.removeEventListener('mouseup', mouseRelease);
            document.documentElement.removeEventListener('mouseleave', mouseHide);
        }

    },[cursorHover, cursorTitle, mouseOnHover, mouseOnDesc, mouseMove, mousePress, mouseRelease, mouseOut])

    return(
        <>
            <div className="cursor-dot sm:hidden xl:flex select-none pointer-events-none" ref={dot}/>
            <div className="cursor-outline sm:hidden xl:flex select-none pointer-events-none" ref={outline}>
                {title &&  <StaggeredText className={`-mr-1 ${NeueMachinaBold.className} text-white dark:text-black`} text={`${title}`} /> }
            </div>
        </>
    )
}

export default CursorWrapper;