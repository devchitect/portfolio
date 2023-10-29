'use client'

import { useDispatch } from "react-redux";
import { transition } from "@/app/store/slices/pageTransitionSlice";
import { usePathname, useRouter } from "next/navigation";
import { navigateDelay } from "@/app/layout-client";
import { useEffect } from "react";

export function usePageNavigate(){
    const dispatch = useDispatch();
    const router = useRouter();
    const path = usePathname();
    
    useEffect(() => {
        const label = path.split('/')[1].toUpperCase() ;
        const endpath = label  === '' ? 'Home' : label;
        dispatch(transition({type: 'enter', endpath: endpath}));
        //document.body.style.overflowY = 'scroll';

    },[dispatch, path])

    return (path : string) => {
        const label = path.split('/')[1].toUpperCase();
        const endpath = label  === '' ? 'Home' : label;

        dispatch(transition({type: 'exit', endpath: endpath}))
        //document.body.style.overflowY = 'hidden';
        setTimeout(()=>{
            router.push(path, { scroll: false });    
        }, navigateDelay)
    }
}
