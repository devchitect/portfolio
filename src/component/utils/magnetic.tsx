import React, { useEffect, useRef, useState } from "react"
import { animate, motion, useAnimate } from "framer-motion";
import { desktop } from "../layout/responsive-media_queries";

export default function Magnetic({children, className} : {children:React.ReactNode, className?:string}){
    
    //const ref = useRef<any>(null);
    const [ref, animate] = useAnimate();
    const [pos, setPos] = useState({x: 0, y: 0}); 
    const mouseMove = (e: React.MouseEvent<Element, MouseEvent>) => {
        const {clientX, clientY} = e;
        const {width, height, left, top} = ref.current.getBoundingClientRect();
        const x = clientX  - (left + width / 2 );
        const y = clientY  - (top + height / 2 );
        if(desktop){
            setPos({x: x, y: y});

        }
    }

    const mouseLeave = () => {
        setPos({x:0,y:0});

    }

    const {x,y} = pos;
    
    return(
        <>
            <motion.div ref={ref}
            className={`inline-block ${className}`}
            onMouseMove={mouseMove}
            onMouseLeave={mouseLeave}
            animate={{x: x,y: y}}
            transition={{type: 'spring', stiffness: 150, damping: 30, mass: 0.1}}
            >
                <>{children}</>
            </motion.div>
        </>
    )
}