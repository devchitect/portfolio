'use client'

import { useDispatch } from "react-redux";
import { transition } from "@/app/redux/slices/pageTransitionSlice";
import { usePathname, useRouter } from "next/navigation";
import { navigateDelay } from "../layout/page-transistion";
import { useEffect } from "react";


export function usePageNavigate(){

    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    
    useEffect(() => {
        dispatch(transition({type: 'enter'}));

    },[dispatch, pathname])

    return (path : string) => {
        const label = path.split('/').slice(-1)[0].toUpperCase();
        const route = ('/' + document.documentElement.getAttribute('lang') + path);
        const endpath = label  === '' ? 'Home' : label;
        if(route !== pathname){
            dispatch(transition({type: 'exit', endpath: endpath}))
            setTimeout(()=>{
                router.push(path, { scroll: false });    
            }, navigateDelay)
        }       
    }
}
