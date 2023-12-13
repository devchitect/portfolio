'use client'

import { useEffect, useRef, useCallback, useState } from "react";

export default function CustomScrollbar(){

    const content = typeof window !== 'undefined' ? document.documentElement : null;

    const scrollTrackRef = useRef<HTMLDivElement | any>(null);
    const scrollThumbRef = useRef<HTMLDivElement | any>(null);
    const scrollBarRef = useRef<HTMLDivElement | any>(null);

    const [thumbHeight, setThumbHeight] = useState(20);
    const observer = useRef<ResizeObserver | null>(null);
    const [scrollStartPosition, setScrollStartPosition] = useState<number>(0);
    const [initialScrollTop, setInitialScrollTop] = useState<number>(0);
    const [isDragging, setIsDragging] = useState(false);

    function handleResize(content , trackSize: number) {
      const { clientHeight, scrollHeight } = content;
      setThumbHeight((clientHeight / scrollHeight) * trackSize);
    }

    
    //Scrollbar
    const timer = useRef<any>(null);
    
    function deactiveScrollbar(){
        scrollBarRef.current.style.opacity = 0;

    }

    const activeScrollbar = useCallback(() => {
        scrollBarRef.current.style.opacity = 1;

        if(timer.current !== null){
            clearTimeout(timer.current);
        }

        timer.current = setTimeout( deactiveScrollbar, 1250);
    },[]);

    const activeScrollbarExtend = () => {
      scrollBarRef.current.style.opacity = 1;

      if(timer.current !== null){
          clearTimeout(timer.current);
      }
    };

    useEffect(() => {
      deactiveScrollbar();
    },[])

    //Track
    const handleTrackClick = useCallback((e : React.MouseEvent<HTMLElement>) => {
        // e.preventDefault();
        // e.stopPropagation();
        
        const { current: trackCurrent } = scrollTrackRef;
        if (trackCurrent && content) {
            const { clientY } = e;
            const target = e.target as HTMLDivElement;
            const rect = target.getBoundingClientRect();
            const trackTop = rect.top;
            const thumbOffset = -(thumbHeight / 2);
            const clickRatio =
            (clientY - trackTop + thumbOffset) / trackCurrent.clientHeight;
            const scrollAmount = Math.floor(
            clickRatio * content.scrollHeight
            );
            window.scrollTo({
            top: scrollAmount,
            behavior: 'smooth',
            });
        }
    },[thumbHeight, content]);

    //Thumb
    const handleThumbPosition = useCallback(() => {
        if (
        !content ||  
        !scrollTrackRef.current ||
        !scrollThumbRef.current
        ) {
        return;
        }
        const { scrollTop: contentTop, scrollHeight: contentHeight } =
        content;
        const { clientHeight: trackHeight } = scrollTrackRef.current;
        let newTop = (+contentTop / +contentHeight) * trackHeight;
        newTop = Math.min(newTop, trackHeight - thumbHeight);
        const thumb = scrollThumbRef.current;
        thumb.style.top = `${newTop}px`;
    }, [content, thumbHeight]);

    const handleThumbMousedown = useCallback((e : React.MouseEvent<HTMLElement>) => {
        // e.preventDefault();
        // e.stopPropagation();
        setIsDragging(true);
        setScrollStartPosition(e.clientY);
        if (content){
            setInitialScrollTop(content.scrollTop);
        }
      }, [content]);
    
      const handleThumbMouseup = useCallback((e : MouseEvent) => {
        //   e.preventDefault();
        //   e.stopPropagation();
        setIsDragging(false);
        },[]);
    
      const handleThumbMousemove = useCallback((e : MouseEvent) => {
        //   e.preventDefault();
        //   e.stopPropagation();
          if (isDragging && content) {
            const { clientHeight: trackHeight } = scrollTrackRef.current;
            const {
              scrollHeight: contentScrollHeight,
              offsetHeight: contentOffsetHeight,
            } = content;
            const ratioContentTrack = (contentScrollHeight) / (trackHeight);

            const scrollY = initialScrollTop + (e.clientY - scrollStartPosition) * (ratioContentTrack);
              
            window.scrollTo({
                top: scrollY,
                behavior: 'instant'
            }) ;
          }
        },[isDragging, scrollStartPosition, content, initialScrollTop]);
    
    // If the content and the scrollbar track exist, use a ResizeObserver to adjust height of thumb and listen for scroll event to move the thumb
    useEffect(() => {
        if (content && scrollTrackRef.current) {
            const { clientHeight: trackSize } = scrollTrackRef.current;
            observer.current = new ResizeObserver(() => {
              handleResize(content, trackSize);
            });
            observer.current.observe(content);
            window.addEventListener('scroll', handleThumbPosition);
            return () => {
              observer.current?.unobserve(content);
              window.removeEventListener('scroll', handleThumbPosition);
            };
          }
    },[handleThumbPosition, content])



    // Listen for mouse events to handle scrolling by dragging the thumb
    useEffect(() => {

      window.addEventListener('mousemove', handleThumbMousemove);
      window.addEventListener('mouseup', handleThumbMouseup);
      window.addEventListener('mouseleave', handleThumbMouseup);
      window.addEventListener("scroll", activeScrollbar)
      return () => {
        window.removeEventListener('mousemove', handleThumbMousemove);
        window.removeEventListener('mouseup', handleThumbMouseup);
        window.removeEventListener('mouseleave', handleThumbMouseup);
        window.removeEventListener("scroll", activeScrollbar)

        };
      }, [handleThumbMousemove, handleThumbMouseup, activeScrollbar]);


    return (
        <>
            <main 
            onMouseOver={activeScrollbarExtend}
            onMouseOut={activeScrollbar}
            className="scrollbar-wrapper fixed items-center h-[100vh] right-[15px] w-[15px] top-0 z-20 select-none 
            xl:flex sm:hidden">
                <div className="scrollbar relative h-[69%] duration-[1s] ease-in-out mx-auto" ref={scrollBarRef}>
                    <div
                    ref={scrollTrackRef}
                    onClick={handleTrackClick}
                    className="track absolute h-full w-[10px] dark:bg-[white] bg-[black] rounded-full opacity-20 
                    shadow-md shadow-black dark:shadow-white"></div>
              
                    <div 
                    ref={scrollThumbRef}
                    onMouseDown={handleThumbMousedown}
                    style={{height: `${thumbHeight}px`, boxShadow: '0 0 3px var(--theme-color)'}}
                    className={`thumb absolute w-[10px] bg-bgGradient rounded-full opacity-90`}></div>
                </div>
               
            </main>
        </>
    )
}