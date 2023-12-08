"use client"

import {useEffect, useRef} from "react";
import Typed from "typed.js";

const TypedText = ({params, speed = 150, cursorC = '|', backSpeed = 80 , delay = 1000, gradient = false, classname = ''}) => {
    // Create reference to store the DOM element containing the animation
    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: params,
            typeSpeed: speed,
            backSpeed: backSpeed,
            backDelay: delay,
            showCursor: true,
            cursorChar: cursorC,
            smartBackspace: true,
            loop: true,
        });

        return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
        };
    }, [params, speed, cursorC, delay, backSpeed]);

    return (
        <span ref={el} 
        className={`${gradient && 'text-gradient'} ${classname}`}
        />
    );
}

export default TypedText;