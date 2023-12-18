'use client'

import Nav from './navbar';

import { usePathname } from 'next/navigation';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux'
import { hoverOn, hoverOff } from '@/app/redux/slices/cursorSlice';
import { clickSound } from './navbar';
import EncryptText from '../utils/encrypted-text';
import { usePageNavigate } from '../custom-hook/use-page_navigate';
import { LanguageContext } from '../context/providers';
import { LibraryRegular } from './fonts';

export const nickname = 'Dan';

function Header(){
    const language = useContext(LanguageContext);
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
            header.current.style.backgroundColor = "var(--glassmorphism-bg)";
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
        if(path === `/${language}`){
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
        sm:px-per10 xm:py-3
        ">
            <div
            className={`${LibraryRegular.className} ${(path === `/${language}`) && 'text-themeColor'}
            inline-block select-none lg:text-[1.35rem] ml-[2px] duration-500
            hover:tracking-[0.25rem] 
            `}
            onClick={closeNavbar}
            onMouseEnter={() => {dispatch(hoverOn(''))}}
            onMouseLeave={() => {dispatch(hoverOff())}}
            ><EncryptText target_text={`${nickname}.`} /></div>   
            
            <Nav toggleNav={toggleNavState} setToggleNav={setToggleNav} lang={language}/>
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
        progressLine.current.style.transform = `translateX(-100%)`;
    }

    useEffect(() => {
        resetProgress()
    },[path])

    useEffect(() => {

        const  scrollProgress =() => {
            const { scrollTop , scrollHeight} = document.documentElement;
            const scrolled = (scrollTop / (scrollHeight - window.innerHeight)) * 100;

            progressLine.current.style.transform = `translateX(${-(100-scrolled)}%)`;
        }

        window.addEventListener('scroll', scrollProgress);
        return () => {
            window.removeEventListener('scroll', scrollProgress);
        }
    },[])

 
    return(
        <>
            <div className="absolute w-full h-[0.5rem] left-0 top-full z-5 pointer-events-none opacity-[0.8] overflow-hidden flex items-center">
                <div 
                ref={progressLine}
                className="scroll-progress h-1/2 w-full bg-themeColor rounded-r-lg ease-out duration-300 translate-x-[-100%] "/>
            </div>
        </>
    )
}
