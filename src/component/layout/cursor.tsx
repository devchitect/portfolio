'use client'

import { RootState } from "@/app/redux/store";
import { useCallback, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux";
import { NeueMachinaBold } from "./fonts";
import { useDispatch } from 'react-redux'
import { hoverOff } from '@/app/redux/slices/cursorSlice';
const Cursor = () => {
    const dispatch = useDispatch();
    const {cursorEffect , title} = useSelector((state : RootState) => state.cursor);
    const dot = useRef<any>(null);
    const outline = useRef<any>(null); 
    const cap = useRef<any>(null); 
    const l = 333;
    const [latency, setLatency] = useState(l);


    const mouseOnHover = useCallback(() => {
        setLatency(l * 0.7);
        outline.current.classList.add('cursor-outline-hover');
        dot.current.classList.add('cursor-dot-hover');

    },[])

    const mouseOutHover = useCallback(() => {
        setLatency(l);
        outline.current.classList.remove('cursor-outline-hover');
        dot.current.classList.remove('cursor-dot-hover');
        if(cap.current){
            dispatch(hoverOff());
        }
    },[dispatch])

    const mouseShow = () => {
        dot.current.style.opacity = `1`;
        outline.current.style.opacity = `1`;
    }

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

    },[])

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
            if(cap.current){
                cap.current.animate({
                    left:  `${e.clientX}px`,
                    top:  `${e.clientY}px`
        
                }, {duration: latency, fill: 'forwards'})
            }    
        }else{
            mouseOutHover();          
        }

    },[cursorEffect, mouseOnHover, mouseOutHover, latency])


    useEffect(() => {
        window.addEventListener("scroll", mouseOutHover)
        window.addEventListener('mousemove', mouseMove);
        document.documentElement.addEventListener('mousedown', mousePress);
        document.documentElement.addEventListener('mouseup', mouseRelease);
        document.documentElement.addEventListener('mouseleave', mouseHide);

        return () => {
            window.removeEventListener("scroll", mouseOutHover)
            window.removeEventListener('mousemove', mouseMove);
            document.documentElement.removeEventListener('mousedown', mousePress);
            document.documentElement.removeEventListener('mouseup', mouseRelease);
            document.documentElement.removeEventListener('mouseleave', mouseHide);
        }

    },[mouseMove, mousePress, mouseRelease, mouseOutHover])

    return(
        <>
            <div className="cursor-dot sm:hidden xl:flex select-none pointer-events-none" ref={dot}></div>
            <div className="cursor-outline sm:hidden xl:flex select-none pointer-events-none" ref={outline}></div>
            {title &&
                <div ref={cap}
                className={`cursor-title text-[0.8rem] ${NeueMachinaBold.className} text-white tracking-widest select-none pointer-events-none`}>
                    {title}
                </div>
            }
        </>
    )
}

export default Cursor;