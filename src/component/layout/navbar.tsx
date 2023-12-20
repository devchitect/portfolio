
import {Icon} from '@iconify/react' ;
import { useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { hoverOn, hoverOff } from '@/app/redux/slices/cursorSlice';
import { usePathname } from "next/navigation";
import Magnetic from "../utils/magnetic";
import { usePageNavigate } from '../custom-hook/use-page_navigate';
import { ThemeSwitcher } from './theme-switcher';
import { InterSemiBold } from './fonts';
import { maxMedium, minLarge } from './responsive-media_queries';

export function clickSound(){
    const audio = new Audio('/assets/sound/high-pitch-click.mp3');
    audio.volume = 0.4;
    audio.play();
}

export default function Nav({toggleNav, setToggleNav, lang}){
    const dispatch = useDispatch();
    const path = usePathname();
    const pageNavigate = usePageNavigate();

    const [activeNavlink, setActiveNavlink] = useState('');
    const navbar = useRef<any>(null);

    const links = [
        {href: '/about', label: 'About', type:'normal', icon: 'fluent-emoji-high-contrast:person-in-tuxedo'},
        {href: '/work', label: 'Work', type:'normal', icon: 'mdi:card-account-details-star-outline'},
        {href: '/blog', label: 'Blog', type:'normal', icon: 'mdi:book-open-page-variant-outline'},
        {href: '/contact', label: 'Contact', type:'normal', icon: 'fluent-emoji-high-contrast:call-me-hand'},
    ]

    const dropdown = [
       {
        name: 'Playground',
        links: [
            {href: '/snippets', label: 'Snippets'},
            {href: '/templates', label: 'Templates'},
            {href: '/utils', label: 'Utils'},
        ]
       }
    ]

    function toggleNavbar(){
        setToggleNav(!toggleNav);       
    }

    const toggleNavbarPassive = useCallback(() => {
        if(maxMedium){
            if(toggleNav){
                document.body.style.overflowY = 'hidden';
                navbar.current.style.height = 'var(--nav-resHeightOn)';
            }else{
                document.body.style.overflowY = 'auto';
                navbar.current.style.height = 'var(--nav-resHeightOff)';

            }
        }
    },[toggleNav])

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
        className={`nav z-20 duration-500 ease-out glassmorphism ${InterSemiBold.className}
        lg:rounded-md
        lg:static lg:grid lg:grid-flow-col lg:gap-5 lg:bg-transparent lg:dark:bg-transparent lg:h-auto lg:w-auto lg:overflow-visible
        sm:absolute sm:right-0 sm:left-0 sm:top-full  sm:w-full sm:h-0 sm:overflow-y-scroll sm:overflow-x-hidden
        `}> 
            <ul 
            className='z-10
            lg:grid lg:grid-flow-col lg:gap-2 lg:divide-y-0
            sm:grid sm:grid-flow-row sm:gap-0 sm:divide-solid sm:dark:divide-neutral-800 sm:divide-neutral-400 sm:divide-inherit sm:divide-y-2
            '>

            {links.map((l) => (     
                <li key={l.label} 
                className={`grid justify-center relative lg:rounded-md tracking-[0.1rem] 
                lg:grid-flow-col lg:py-0  lg:mx-[0.55rem] first:lg:mx-0 last:lg:mx-0
                sm:grid-flow-row sm:py-2  sm:text-[0.88rem]
                `}
                >                    
                    <div 
                    
                    className={`flex flex-col hover:text-themeColor items-center justify-center relative  
                    ${`/${lang}${l.href}` === path && 'pointer-events-none'}
                    lg:w-auto
                    sm:w-screen
                    `}
                    onMouseEnter={() => {dispatch(hoverOn()); }}
                    onMouseLeave={() => {dispatch(hoverOff()); }}
                    > 
                        <Magnetic>
                        <div 
                        onClick={() => {navigate(l.href)}}
                        className={`nav-link relative flex justify-center items-center overflow-hidden 
                        ${(`/${lang}${l.href}` === activeNavlink) && `
                            text-themeColor
                            ${`before:content-[''] before:absolute before:bg-themeColor before:h-3/5 before:w-per150 before:animate-spin-opacity before:delay-1000`}
                            ${`after:content-[''] after:absolute after:bg-bgColor after:inset-1 after:rounded-md after:animate-opacity-up`}
                        `}
                        `}>
                        <div className={` pointer-events-none
                        sm:px-3 sm:py-[0.9rem]
                        relative z-30`}>{l.label.toUpperCase()}</div>

                        </div>
                        </Magnetic>                                     
                    </div>
                
                </li>
            ))}
            {dropdown.map((d) => (
                <Dropdown key={d.name} navigate={navigate} label={d.name} links={d.links}/>
            ))}
            </ul>
            
      </nav>    
      <ThemeSwitcher/>
      </div>
      </>
    )
}

function Dropdown({label, links, navigate}){

    const dispatch = useDispatch();
    const [DDState, setDDState] = useState(false);
    const [toggleDDState, setToggleDD] = useState(false);

    const dropdown = useRef<any>(null);

    function dropdownActive(e: React.MouseEvent<Element, MouseEvent>, str: string){
        
        if(str === 'Playground' && minLarge){
            setDDState(true);
            dropdown.current.style.height = '100%';
        };
    }

    function dropdownDeactive(e: React.MouseEvent<Element, MouseEvent>, str: string){  
        if(str === 'Playground'  && minLarge){  
            setDDState(false)

        }
    }

    function toggleDropdown(e : React.MouseEvent<Element, MouseEvent>){

        if(maxMedium){
            setDDState(!DDState)
            const target = e.currentTarget as HTMLElement;
            if(toggleDDState){
                target.style.color = 'inherit';
                dropdown.current.style.height = '0';
                setToggleDD(!toggleDDState);
            }else{
                target.style.color = 'var(--theme-color)';
                dropdown.current.style.height = '100%';
                setToggleDD(!toggleDDState);
            }
        }    
    }

    return (
        <>
            <div
            onMouseOver={(e) => {dropdownActive(e, label)}}
            onMouseOut={(e) => {dropdownDeactive(e, label)}}
            className={`flex flex-col items-center lg:justify-center rounded-md duration-150 hover:text-themeColor
            `}
            >
                <span
                onClick={(e) => {toggleDropdown(e)}}
                className={`text-center tracking-[0.1rem]
                lg:py-0 lg:px-3 lg:w-auto 
                sm:py-4 sm:w-full sm:text-[0.88rem] 
                `}
                >{label.toUpperCase()}</span>

                {/* Dropdown content */}
                <div
                ref = {dropdown}
                className={`z-20 text-black dark:text-white tracking-wide glasspmorphism
                lg:pt-2 lg:w-auto lg:grid lg:grid-flow-row lg:justify-start lg:absolute lg:top-per100 lg:border-0 lg:overflow-visible lg:h-auto duration-300
                ${DDState ? 'opacity-100 translate-x-0' : 'opacity-0 xl:-translate-x-1/3 select-none pointer-events-none'}
                sm:w-screen sm:grid sm:grid-flow-row sm:justify-center sm:overflow-hidden sm:h-0
            
                `}>
                    <ul           
                    className={`nav-dropdown lg:rounded-md z-20 justifity-self-start
                    lg:border-themeColor lg:border-2 lg:border-solid lg:w-auto lg:h-auto 
                    sm:border-transparent sm:border sm:border-double 
                    `}
                    >
                        {links.map((sl) => (
                            <li key={sl.href}
                            className="text-sm xl:text-right sm:text-center px-3
                            hover:bg-themeColor hover:text-white hover:dark:text-black duration-300
                            " 
                            >
                                <span
                                onClick={() => {navigate(sl.href)}}
                                onMouseEnter={() => dispatch(hoverOn())}
                                onMouseLeave={() => dispatch(hoverOff())}
                                className="
                                lg:py-3  
                                sm:py-4 sm:block sm:w-full
                                " 
                                >{sl.label.toUpperCase()}</span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>              
        </>
    )
}