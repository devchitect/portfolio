'use client'

import { useDispatch } from "react-redux";
import { transition } from "@/app/redux/slices/pageTransitionSlice";
import { usePathname, useRouter } from "next/navigation";
import { navigateDelay } from "../layout/page-transistion";
import { useContext, useEffect } from "react";


export function usePageNavigate(){

    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    
    useEffect(() => {
        const label = pathname.split('/').slice(-1)[0].toUpperCase() ;
        const endpath = label.toLowerCase()  === document.documentElement.getAttribute('lang') ? 'Home' : label;
        dispatch(transition({type: 'enter', endpath: endpath}));

    },[dispatch, pathname])

    return (path : string) => {
        const label = path.split('/').slice(-1)[0].toUpperCase();
        path = '/' + document.documentElement.getAttribute('lang') + path;
        const endpath = label  === '' ? 'Home' : label;
        if(path !== pathname){
            dispatch(transition({type: 'exit', endpath: endpath}))
            setTimeout(()=>{
                router.push(path, { scroll: false });    
            }, navigateDelay)
        }
        
    }
}
