

import Nav from '../navbar';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux'
import { hoverOn, hoverOff } from '@/app/store/slices/cursorSlice';
import { clickSound } from '../navbar';
import EncryptText from '../encrypt-text';
import { usePageNavigate } from '../custom-hook/use-page_navigate';


function Header(){

    const path = usePathname();
    const navigate = usePageNavigate();
    const dispatch = useDispatch();
    const header = useRef<any>(null);
    const [toggleNavState, setToggleNav] = useState(false);
    const scrollPos = useRef(typeof window !== 'undefined' ? window.scrollY : 0);

    const scrolledHeader = useCallback(() => {
        const r = document.querySelector(':root') as HTMLElement;

        if(document.documentElement.scrollTop === 0){
            header.current.style.backgroundColor = "transparent";
            header.current.style.backdropFilter = 'none';
        }else{
            header.current.style.backgroundColor = "var(--header-bg)";
            header.current.style.backdropFilter = 'blur(var(--blur))';
        }
        
        if(window.innerWidth > 1000){
            if(scrollPos.current < window.scrollY){
                header.current.style.transform = 'var(--header-scroll-transform)';    
            
            }else if(scrollPos.current > window.scrollY){
                header.current.style.transform = 'translateY(0)';
            }
            scrollPos.current = window.scrollY;
        }
        
         
    },[scrollPos])

    function closeNavbar(){      
        if(path === '/'){
            return;
        }

        clickSound();
        navigate('/');

        if(window.innerWidth < 1000){
            if(toggleNavState){
                setToggleNav(!toggleNavState);    
            }
        }
    }
 
    
    useEffect(() => {
        window.addEventListener('scroll', scrolledHeader);
        return () => {
            window.removeEventListener('scroll', scrolledHeader);
        }
    },[scrolledHeader])

    return(
    <>
        <header 
        ref = {header}
        className="header sticky top-0 flex items-center justify-between z-20 duration-500 border-none transition-transform w-full
        xl:px-per10
        sm:px-per5 xm:py-3
        ">
            <span
            className={`logo font-l3 select-none lg:text-[1.5rem]`}
            onClick={closeNavbar}
            onMouseEnter={() => {dispatch(hoverOn(''))}}
            onMouseLeave={() => {dispatch(hoverOff())}}
            ><EncryptText target_text={'Devchitect'} /></span>   
            
            <Nav toggleNav={toggleNavState} setToggleNav={setToggleNav}/>
            <ScrollProgress/>
        </header>

    </>
    )
}

export default Header;

function ScrollProgress(){

    const progressLine = useRef<any>(null);
    const path = usePathname();

    function resetProgress(){
        progressLine.current.style.width = `0%`;
    }

    useEffect(() => {
        resetProgress()
    },[path])

    useEffect(() => {

        const  scrollProgress =() => {
            const { scrollTop , scrollHeight} = document.documentElement;
            const scrolled = (scrollTop / (scrollHeight - window.innerHeight)) * 100;

            progressLine.current.style.width = `${scrolled}%`;
        }

        window.addEventListener('scroll', scrollProgress);
        return () => {
            window.removeEventListener('scroll', scrollProgress);
        }
    },[])

 
    return(
        <>
            <div className="absolute w-full h-[0.25rem] left-0 top-full z-5 pointer-events-none opacity-[0.8]">
                <div 
                ref={progressLine}
                className="scroll-progress h-full w-full bg-themeColor rounded-r-lg"/>
            </div>
        </>
    )
}
