"use client"

import {Icon} from '@iconify/react' ;
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { hoverOn, hoverOff } from '@/app/redux/slices/cursorSlice';
import { switchMode } from '@/app/redux/slices/themeSlice';
import Magnetic from "../utils/magnetic";
import { clickSound } from './navbar';
import useIsomorphicLayoutEffect from '../gsap-helper/isomorphic-effect';

export function ThemeSwitcher(){

    const dispatch = useDispatch();
    const [theme, setTheme] = useState<string | null>();

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
    
    useIsomorphicLayoutEffect(() => 
    {
        const selectedTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark';
        let res = selectedTheme === 'dark' ? 'dark' : 'light';            

        setDocTheme(res);
        dispatch(switchMode(res));
        
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