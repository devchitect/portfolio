"use client"

import {Icon} from '@iconify/react' ;
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { hoverOn, hoverOff } from '@/app/redux/slices/cursorSlice';
import { switchMode } from '@/app/redux/slices/themeSlice';
import Magnetic from "../utils/magnetic";
import { clickSound } from './navbar';
import useIsomorphicLayoutEffect from '../custom-hook/isomorphic-effect';

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
        <div className='flex items-center justify-center sm:mx-3 '>
        <Magnetic>
                <button
                onMouseEnter={() => {dispatch(hoverOn())}}
                onMouseLeave={() => {dispatch(hoverOff())}}
                onClick={() => {switchTheme(); clickSound();}}
                className={`glassmorphism lg:text-2xl sm:text-xl text-themeColor rounded-md p-[0.5rem] `}
                >
                    {theme === 'light' && <Icon icon='line-md:sunny-outline-loop'/>}           
                    {theme === 'dark' && <Icon icon='line-md:moon-loop' hFlip={true} />}
                    
                </button>
            </Magnetic>
            </div>
                  
        </>
    )
}