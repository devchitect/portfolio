'use client'

import { useRef } from "react"
import useIsomorphicLayoutEffect from "@/component/gsap-helper/isomorphic-effect";
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    
    const main = useRef<HTMLDivElement>(null);

    useIsomorphicLayoutEffect(() => {

        const ctx = gsap.context((self : any) => {
            
          const boxes = self.selector('.box'); 
          boxes.forEach((box) => {
            gsap.to(box, {
              x: 300,
              scrollTrigger: {
                trigger: box,
                start: 'bottom bottom',
                end: 'top 20%',
                scrub: true,
              },
            });
          });
        }, main);
        return () => ctx.revert();
      }, []);

    return (
        <>
            <div className="min-h-screen">Start</div>
            <div className="section flex-center column" ref={main}>
                    <h1>This boxes animates as you scroll!</h1>
                    <div className="box w-[100px] h-[100px] text-center bg-red-500">box</div>
                    <div className="box w-[100px] h-[100px] text-center bg-violet-600">box</div>
                    <div className="box w-[100px] h-[100px] text-center bg-emerald-500">box</div>
                </div>
            <div className="min-h-screen">End</div>
        </>   
    )
  }
  