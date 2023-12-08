'use client'

import { useDispatch } from "react-redux";
import { transition } from "@/app/store/slices/pageTransitionSlice";
import { usePathname, useRouter } from "next/navigation";
import { navigateDelay } from "../layout/page-transistion";
import { useEffect } from "react";

export function usePageNavigate(){
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    
    useEffect(() => {
        const label = pathname.split('/')[1].toUpperCase() ;
        const endpath = label  === '' ? 'Home' : label;
        dispatch(transition({type: 'enter', endpath: endpath}));

    },[dispatch, pathname])

    return (path : string) => {
        const label = path.split('/')[1].toUpperCase();
        const endpath = label  === '' ? 'Home' : label;

        if(path !== pathname){
            dispatch(transition({type: 'exit', endpath: endpath}))
            setTimeout(()=>{
                router.push(path, { scroll: false });    
            }, navigateDelay)
        }
        
    }
}
