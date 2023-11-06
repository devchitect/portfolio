'use client'

import { RootState } from "@/app/store/store";
import { useCallback, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux";


const Cursor = () => {
    const {cursorEffect , title} = useSelector((state : RootState) => state.cursor);
    const dot = useRef<any>(null);
    const outline = useRef<any>(null); 
    const l = 333;
    const [latency, setLatency] = useState(l);


    const mouseOnHover = useCallback(() => {
        setLatency(0);
        outline.current.classList.add('cursor-outline-hover');
        dot.current.classList.add('cursor-dot-hover');
        outline.current.style.mixBlendMode = title && 'normal';
    },[title])

    const mouseOutHover = useCallback(() => {
        setLatency(l);
        outline.current.classList.remove('cursor-outline-hover');
        dot.current.classList.remove('cursor-dot-hover');
        outline.current.style.mixBlendMode = `exclusion`;

    },[])

    const mouseShow = () => {
        dot.current.style.opacity = `1`;
        outline.current.style.opacity = `1`;
    }

    const mouseHide = () => {
        dot.current.style.opacity = `0`;
        outline.current.style.opacity = `0`;
    }

    const mousePress = () => {
        outline.current.classList.add('cursor-outline-press');
        dot.current.classList.add('cursor-dot-press');

    }

    const mouseRelease = () => {
        outline.current.classList.remove('cursor-outline-press');
        dot.current.classList.remove('cursor-dot-press');

    }

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

        if(cursorEffect === true){
            mouseOnHover();
        }else{
            mouseOutHover();          
        }

    },[cursorEffect, mouseOnHover, mouseOutHover, latency])


    useEffect(() => {
        window.addEventListener('mousemove', mouseMove);
        document.documentElement.addEventListener('mousedown', mousePress);
        document.documentElement.addEventListener('mouseup', mouseRelease);
        document.documentElement.addEventListener('mouseleave', mouseHide);

        return () => {
          window.removeEventListener('mousemove', mouseMove);
          document.documentElement.removeEventListener('mousedown', mousePress);
          document.documentElement.removeEventListener('mouseup', mouseRelease);
          document.documentElement.removeEventListener('mouseleave', mouseHide);
        }

    },[mouseMove])

    return(
        <>
            <div className="cursor-dot sm:hidden xl:flex" ref={dot}></div>
            <div className="cursor-outline sm:hidden xl:flex" ref={outline}>
                {title && 
                    <span className="cursor-title text-[0.5rem] font-b tracking-wider ">{title}</span>
                }   
            </div>
        </>
    )
}

export default Cursor;