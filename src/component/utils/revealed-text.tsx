import { motion, useInView, useAnimation, Variant } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";

type RevealedTextProps = {
    text: ReactNode;
    className?: string;
    once?: boolean;
    delay?: number;
    duration?: number;
    animation?: {
        initial: Variant;
        animate: Variant;
    };
  };
  
const textAnimate = {
    initial: {
        y:'100%',
        opacity: 0,    
    },
    animate: {
        y:'0%',
        opacity: 1
    },
  }

export function RevealedText(
    {
        text,
        className,
        once = true,
        delay,
        duration = 0.69,
        animation = textAnimate
    } : RevealedTextProps){
    
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 1, once });


    return (

        <>
            <div className="overflow-hidden inline-block" ref={ref}>
                <motion.div
                variants={animation}
                initial='initial'
                animate={isInView ? 'animate' : ''}
                transition={{duration: duration, delay: delay, ease: 'easeOut'}}
                className={className}
                >
                    {text}
                </motion.div>
            </div>
        </>
    )
}

type RevealedTextParagraphProps = {
    text: string | string[];
    className?: string;
    once?: boolean;
    delay?: number;
    duration?: number;
    animation?: {
        initial: Variant;
        animate: Variant;
    };
  };

export function RevealedTextParagraph(
    {
        text,
        className,
        once = true,
        delay = 0,
        duration = 0.69,
        animation = textAnimate
    } : RevealedTextParagraphProps){
    
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 1, once });
    const textArray = Array.isArray(text) ? text : [text];


    return (

        <>
            {textArray.map((line, lineIndex) => (  
                <div className={`block`} key={`${line}-${lineIndex}`} ref={ref}>
                    {line.split(" ").map((word, wordIndex) => (
                        <div className="inline-block overflow-hidden" key={`${word}-${wordIndex}`}>
                            <motion.div
                            variants={animation}
                            initial='initial'
                            animate={isInView ? 'animate' : ''}
                            transition={{duration: duration, delay: delay + ( lineIndex * 0.1), ease: 'easeOut'}}
                            className={className}  
                            >
                                <span>{word}</span> 
                                <span className="inline-block">&nbsp;</span>                          
                            </motion.div>
                        </div>          
                    ))}
                </div>                          
            ))}
        </>
    )
}



