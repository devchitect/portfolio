import { motion, useInView, useAnimation, Variant } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";

type RevealedTextProps = {
    text: ReactNode;
    wrapper?: string;
    className?: string;
    style?: any;
    once?: boolean;
    delay?: number;
    duration?: number;
    amount?: number;
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
        wrapper,
        className,
        style,
        once = true,
        delay,
        duration = 0.5,
        amount = 1,
        animation = textAnimate
    } : RevealedTextProps){
    
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: amount, once });


    return (

        <>
            <div className={`overflow-hidden ${wrapper}`} ref={ref}>
                <motion.div
                style={style}
                variants={animation}
                initial='initial'
                animate={isInView ? 'animate' : ''}
                transition={{duration: duration, delay: delay, ease: 'easeOut'}}
                className={className}
                >{text}</motion.div>
            </div>
        </>
    )
}

type RevealedTextParagraphProps = {
    text: string | string[];
    wrapper?: string;
    className?: string;
    style?: any;
    once?: boolean;
    delay?: number;
    duration?: number;
    amount?: number;
    animation?: {
        initial: Variant;
        animate: Variant;
    };
  };

export function RevealedTextParagraph(
    {
        text,
        wrapper,
        className,
        style,
        once = true,
        delay = 0,
        duration = 0.5,
        amount = 1,
        animation = textAnimate
    } : RevealedTextParagraphProps){
    
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: amount, once });
    const textArray = Array.isArray(text) ? text : [text];

    return (
        <>
            {textArray.map((line, lineIndex) => (  
                <div className={`block ${wrapper}`} key={`${line}-${lineIndex}`} ref={ref}>
                    {line.split(" ").map((word, wordIndex) => (
                        <div className="overflow-hidden inline-block" key={`${word}-${wordIndex}`}>
                            <motion.p
                            variants={animation}
                            initial='initial'
                            animate={isInView ? 'animate' : ''}
                            transition={{duration: duration, delay: delay + ( lineIndex * 0.15), ease: 'easeOut'}}
                            className={className}  
                            style={style}
                            >
                                <span className="inline-block">{word}</span> 
                                <span className="inline-block">&nbsp;</span>                          
                            </motion.p>
                        </div>          
                    ))}
                </div>                          
            ))}
        </>
    )
}



