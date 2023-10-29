"use client"

// import { RootState } from "@/app/store/store";
import Link from 'next/link';
import {Icon} from '@iconify/react' ;
import { useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { hoverOn, hoverOff } from '@/app/store/slices/cursorSlice';
import { transition } from '@/app/store/slices/pageTransitionSlice';
import { switchMode } from '@/app/store/slices/themeSlice';
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence} from "framer-motion";
import Magnetic from "./magnetic";
import { navigateDelay } from '@/app/layout-client';
import { usePageNavigate } from './custom-hook/use-page_navigate';

export function clickSound(){
    const audio = new Audio('./sound/high-pitch-click.mp3');
    audio.volume = 0.4;
    audio.play();
}


export default function Nav({toggleNav, setToggleNav}){
    const dispatch = useDispatch();
    const path = usePathname();
    const pageNavigate = usePageNavigate();

    const [activeNavlink, setActiveNavlink] = useState('');
    const [toggleDDState, setToggleDD] = useState(false);
    const [stuffState, setStuffState] = useState(false);
    const navbar = useRef<any>(null);
    const stuffs = useRef<any>(null);

    const links = [
        {href: '/about', label: 'About', type:'normal', icon: 'fluent-emoji-high-contrast:person-in-tuxedo'},
        {href: '/work', label: 'Work', type:'normal', icon: 'mdi:card-account-details-star-outline'},
        {href: '/blog', label: 'Blog', type:'normal', icon: 'mdi:book-open-page-variant-outline'},
        {href: '/contact', label: 'Contact', type:'normal', icon: 'fluent-emoji-high-contrast:call-me-hand'},
        {href: '', label: 'Playground', type:'dropdown', icon: ''},
    ]

    const stuffsLinks = [
        {href: '/1', label: 'Snippets'},
        {href: '/2', label: 'Templates'},
        {href: '/3', label: 'Utils'},
    ]

    function toggleNavbar(){
        if(window.innerWidth < 1000){
            setToggleNav(!toggleNav);       
        }
    }

    const toggleNavbarPassive = useCallback(() => {
        if(window.innerWidth < 1000){
            if(toggleNav){
                document.body.style.overflowY = 'hidden';
                navbar.current.style.height = 'var(--nav-resHeightOn)';
            }else{
                document.body.style.overflowY = 'auto';
                navbar.current.style.height = 'var(--nav-resHeightOff)';

            }
        }
    },[toggleNav])

    function toggleDropdown(e : React.MouseEvent<Element, MouseEvent>){

        if(window.innerWidth < 1000){
        const target = e.currentTarget as HTMLElement;
        if(toggleDDState){
            target.style.color = 'inherit';
            stuffs.current.style.height = '0';
            stuffs.current.style.borderColor = 'transparent';
            setToggleDD(!toggleDDState);
        }else{
            target.style.color = 'var(--theme-color)';
            stuffs.current.style.height = '100%';
            stuffs.current.style.borderColor = 'var(--theme-color)';
            setToggleDD(!toggleDDState);
        }
        }    
    }
    function dropdownActive(e: React.MouseEvent<Element, MouseEvent>, str: string){
        if(str === 'Playground' && window.innerWidth >= 1000){
            setStuffState(true);
            const target = e.currentTarget as HTMLElement;
            target.style.outline = 'var(--dropdown-hover-outline)';

            stuffs.current.style.height = '100%';
            stuffs.current.style.borderColor = 'var(--theme-color)';
        };
    }

    function dropdownDeactive(e: React.MouseEvent<Element, MouseEvent>, str: string){  
        if(str === 'Playground'  && window.innerWidth >= 1000){  
            setStuffState(false)
            const target = e.currentTarget as HTMLElement;
            target.style.outline = 'transparent';
        }
    }

    const navigate = (currpath : string) => {
        clickSound(); 
        toggleNavbar();
        pageNavigate(currpath);
    }

    useEffect(() => {
        setActiveNavlink(path);    
    },[path])

    useEffect(() => {  
        toggleNavbarPassive();        
    },[toggleNav, toggleNavbarPassive])


    return(
        <>
        <div className="flex items-center">
        <div 
        onClick={toggleNavbar}
        className="lg:hidden text-2xl">
            {!toggleNav && <Icon icon="line-md:close-to-menu-alt-transition"/>}
            {toggleNav &&  <Icon icon="line-md:menu-to-close-alt-transition"/> }
        </div>

        <nav 
        ref={navbar}
        className="nav z-20 duration-500 ease-out glassmorphism font-semib 
        lg:rounded-md
        lg:static lg:grid lg:grid-flow-col lg:gap-5 lg:bg-transparent lg:dark:bg-transparent lg:h-auto lg:w-auto lg:overflow-visible
        sm:absolute sm:right-0  sm:left-0 sm:top-full sm:bg-[#ffffffdd] sm:dark:bg-[#000000dd] sm:w-full sm:h-0 sm:overflow-y-scroll sm:overflow-x-hidden
        "> 
            <ul 
            className='z-10
            lg:grid lg:grid-flow-col lg:gap-2 lg:divide-y-0
            sm:grid sm:grid-flow-row sm:gap-0 sm:divide-solid sm:dark:divide-neutral-800 sm:divide-neutral-400 sm:divide-inherit sm:divide-y-2
            '>

            {links.map((l) => (     
                <li key={l.label} 
                className={`grid justify-center relative lg:rounded-md tracking-[0.1rem] 
                lg:grid-flow-col lg:py-0 lg:text-xs ${l.type === 'normal' && 'lg:mx-2'}
                sm:grid-flow-row sm:py-2 sm:text-[0.88rem] 
                ${l.href === path && 'pointer-events-none'}
                `}
                >
                    {l.type === 'normal' &&
                    
                    <div 
                    
                    className={`flex flex-col hover:text-themeColor items-center justify-center relative  
                    lg:w-auto
                    sm:w-screen
                    `}
                    onMouseEnter={() => {dispatch(hoverOn('')); }}
                    onMouseLeave={() => {dispatch(hoverOff()); }}
                    > 
                        <Magnetic>
                        <div 
                        onClick={() => {navigate(l.href)}}
                        className={`nav-link relative flex justify-center items-center overflow-hidden 
                        ${(l.href === activeNavlink) && `
                            text-themeColor
                            ${`before:content-[''] before:absolute before:bg-themeColor before:h-3/5 before:w-per150 before:animate-spin-opacity before:delay-1000`}
                            ${`after:content-[''] after:absolute after:bg-bgColor after:inset-1 after:rounded-md after:animate-opacity-up`}
                        `}
                        `}>
                        <div className={`
                        sm:px-3 sm:py-3  
                        relative z-30`}>{l.label.toUpperCase()}</div>

                        </div>
                        </Magnetic>                                     
                    </div>
                    // </Magnetic>
                    }

                    {/****  Dropdown link *****/}
                    {l.type === 'dropdown' &&
                    
                    <div
                    onMouseOver={(e) => {dropdownActive(e, l.label)}}
                    onMouseOut={(e) => {dropdownDeactive(e, l.label)}}
                    className={`flex flex-col items-center justify-center rounded-md duration-150 hover:text-themeColor
                    `}
                    >
                        <span
                        onClick={(e) => {toggleDropdown(e)}}
                        className={`text-center
                        lg:py-0 lg:px-3 lg:w-auto
                        sm:p-4 sm:w-full
                        `}
                        >{l.label.toUpperCase()}</span>

                        {/* Dropdown content */}
                        <div
                        className={`z-20 text-black dark:text-white tracking-wide
                        lg:w-auto lg:grid lg:grid-flow-row lg:justify-start lg:absolute lg:top-per100 lg:-right-1 lg:pt-3 lg:border-0 lg:overflow-visible
                        ${stuffState ? 'opacity-100 translate-x-0 duration-500' : 'opacity-0 -translate-x-1/3 select-none pointer-events-none'}
                        sm:w-screen sm:grid sm:grid-flow-row sm:justify-center sm:overflow-hidden
                    
                        `}>
                            <ul
                            ref = {stuffs}
                            className={`nav-dropdown lg:rounded-md px-3 z-20 justifity-self-start
                            lg:border-themeColor lg:border-2 lg:border-solid  lg:divide-y-2 lg:w-auto lg:h-auto 
                            sm:border-transparent sm:border sm:border-double 
                            sm:divide-y-2 sm:divide-dashed sm:dark:divide-neutral-700 sm:divide-neutral-300 sm:w-screen sm:h-0
                            `}
                            >
                                {stuffsLinks.map((sl) => (
                                    <li key={sl.href}
                                    className="text-sm hover:text-themeColor text-right"
                                    >
                                        <Link
                                        onMouseEnter={() => dispatch(hoverOn(''))}
                                        onMouseLeave={() => dispatch(hoverOff())}
                                        className="
                                        lg:py-2 my-1
                                        sm:py-4 sm:block sm:w-full
                                        " 
                                        href={sl.href}>{sl.label.toUpperCase()}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>              
                    }
                </li>
            ))}

            </ul>
            
      </nav>    
      <ThemeSwitcher/>
      </div>
      </>
    )
}



function ThemeSwitcher(){

    const dispatch = useDispatch();
    const [theme, setTheme] = useState<string | null>();
    const schemeQuery = '(prefers-color-scheme: dark)';

    function switchTheme(){

        const mode = theme === 'dark' ? 'light' : 'dark';

        setTheme(mode);
        setDocTheme(mode);
        dispatch(switchMode(mode));

    }

    function setDocTheme(x : string){
        document.documentElement.removeAttribute('class');
        document.documentElement.setAttribute('class', x);
        localStorage.setItem('theme', x);
    }
    
    useEffect(() => {

        const mediaQuery = window.matchMedia(schemeQuery);
        const userPref = mediaQuery.matches ? 'dark' : 'light';
        const selectedTheme = localStorage.getItem('theme');

        if(selectedTheme){
            let res = selectedTheme === 'dark' ? 'dark' : 'light';            
            setTheme(res);
            dispatch(switchMode(res));
        }else{
            setTheme(userPref);
            dispatch(switchMode(userPref));
        }
    },[dispatch])


    return(
        <>
        <div className='flex items-center justify-center lg:ml-4 sm:ml-2 sm:mr-1'>
        <Magnetic>
                <button
                onMouseEnter={() => {dispatch(hoverOn(''))}}
                onMouseLeave={() => {dispatch(hoverOff())}}
                onClick={() => {switchTheme(); clickSound();}}
                className={`glassmorphism text-2xl rounded-lg p-2 `}
                >
                    {theme === 'dark' && <Icon icon='line-md:sunny-outline-loop'color={`rgba(0, 255, 255)`} />}           
                    {theme === 'light' && <Icon icon='line-md:moon-loop' hFlip={true} color={`rgba(111, 0, 255)`} />}
                    
                </button>
            </Magnetic>
            </div>
                  
        </>
    )
}