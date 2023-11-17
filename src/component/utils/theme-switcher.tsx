"use client"

import {Icon} from '@iconify/react' ;
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { hoverOn, hoverOff } from '@/app/store/slices/cursorSlice';
import { switchMode } from '@/app/store/slices/themeSlice';
import Magnetic from "../utils/magnetic";
import { clickSound } from '../layout/navbar';
import useIsomorphicLayoutEffect from '../gsap-helper/isomorphic-effect';

export function ThemeSwitcher(){

    const dispatch = useDispatch();
    const [theme, setTheme] = useState<string | null>();
    const schemeQuery = '(prefers-color-scheme: dark)';

    function switchTheme(){

        const mode = theme === 'dark' ? 'light' : 'dark';

        setDocTheme(mode);
        dispatch(switchMode(mode));

    }

    function setDocTheme(x : string){
        setTheme(x);
        document.documentElement.removeAttribute('class');
        document.documentElement.setAttribute('class', x);
        localStorage.setItem('theme', x);
    }
    
    useIsomorphicLayoutEffect(() => {

        const mediaQuery = window.matchMedia(schemeQuery);
        const userPref = mediaQuery.matches ? 'dark' : 'light';
        const selectedTheme = localStorage.getItem('theme');

        if(selectedTheme){
            let res = selectedTheme === 'dark' ? 'dark' : 'light';            
            setDocTheme(res);
            dispatch(switchMode(res));
        }else{
            setDocTheme(userPref);
            dispatch(switchMode(userPref));
        }
    },[dispatch])


    return(
        <>
        <div className='flex items-center justify-center lg:ml-4 sm:ml-2 sm:mr-[2px]'>
        <Magnetic>
                <button
                onMouseEnter={() => {dispatch(hoverOn(''))}}
                onMouseLeave={() => {dispatch(hoverOff())}}
                onClick={() => {switchTheme(); clickSound();}}
                className={`glassmorphism text-2xl rounded-lg p-[0.7rem] `}
                >
                    {theme === 'dark' && <Icon icon='line-md:sunny-outline-loop'color={`rgba(0, 255, 255)`} />}           
                    {theme === 'light' && <Icon icon='line-md:moon-loop' hFlip={true} color={`rgba(111, 0, 255)`} />}
                    
                </button>
            </Magnetic>
            </div>
                  
        </>
    )
}