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
import { maxMedium, minLarge } from './responsive-media_queries';

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

        if(document.documentElement.scrollTop === 0){
            header.current.classList.remove("glassmorphism");
        }else{
            header.current.classList.add("glassmorphism");
        }
        
        if(minLarge){
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

        if(maxMedium){
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
        className="header sticky top-0 flex items-center justify-between z-20 duration-500 border-none w-full
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
        </header>

    </>
    )
}

export default Header;
