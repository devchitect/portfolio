'use client'

import { RootState } from "@/app/store/store";
import { useCallback, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux";


const Cursor = () => {
    const {cursorEffect , title} = useSelector((state : RootState) => state.cursor);
    const dot = useRef<any>(null);
    const outline = useRef<any>(null); 
    const l = 123;
    const [latency, setLatency] = useState(l);


    const mouseOnHover = useCallback(() => {
        setLatency(0);
        outline.current.classList.add('cursor-outline-hover');
        dot.current.classList.add('cursor-dot-hover');
        dot.current.style.opacity = !title ? `1` : '0';
        outline.current.style.mixBlendMode = !title ? `exclusion` : 'normal';
    },[title])

    const mouseOutHover = useCallback(() => {
        setLatency(l);
        outline.current.classList.remove('cursor-outline-hover');
        dot.current.classList.remove('cursor-dot-hover');
        outline.current.style.mixBlendMode = `normal`;

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
        if(window.innerWidth < 1380){
            dot.current.style.display = outline.current.style.display = `none`;
        }else{
            dot.current.style.display = outline.current.style.display = `flex`;
        }

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
            <div className="cursor-dot" ref={dot}></div>
            <div className="cursor-outline" ref={outline}>
                {title && 
                    <span className="cursor-title text-black text-[0.68rem] font-telegraf-ultrab tracking-wider ">{title}</span>
                }   
            </div>
        </>
    )
}

export default Cursor;