import React, { useEffect, useRef, useState } from "react"
import { animate, motion, useAnimate } from "framer-motion";

export default function Magnetic({children} : {children : React.ReactNode}){
    
    //const ref = useRef<any>(null);
    const [ref, animate] = useAnimate();
    const [pos, setPos] = useState({x: 0, y: 0}); 
    
    const mouseMove = (e: React.MouseEvent<Element, MouseEvent>) => {
        const {clientX, clientY} = e;
        const {width, height, left, top} = ref.current.getBoundingClientRect();
        const x = clientX  - (left + width / 2 );
        const y = clientY  - (top + height / 2 );
        if(window.innerWidth > 1380){
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
            className="inline-block"
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