'use client'

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import useIsomorphicLayoutEffect  from "./gsap-helper/isomorphic-effect"

export default function HorizontalSection(){

    const container = useRef<any>(null);
    const sections = useRef<any>([]);
    const ctx = useRef();

    const createSectionsRefs = (section, index) => {
        sections.current[index] = section;
    }


    useIsomorphicLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        let ctx = gsap.context(() => {
            const totalSecs = sections.current.length;

            gsap.fromTo(container.current,{
                translateX: `0`          
            },{
                translateX: `-${100 * (totalSecs - 1)}vW`,
                ease: 'none',
                duration: 1,
                scrollTrigger: {
                    trigger: container.current,
                    markers: false,
                    start: 'center center',
                    scrub: 0.5,
                    pin: true,
                    end: () => "+=" + container.current.offsetWidth,
                }
            })
        }, container)
        return () => ctx.revert();
    },[])
    
    return (
        <>
            <div className="overflow-hidden relative ">
                <main ref={container}
                style={{width: '400vW'}}
                className="flex flex-nowrap relative h-screen">

                    <section id="1"
                    ref={(e) => createSectionsRefs(e, 0)}
                    className="h-full w-full relative">
                        <div 
                        style={{background: 'var(--header-bg)', backdropFilter:'blur(2px)', boxShadow:'0 0 2px var(--theme-color) '}}
                        className="absolute top-0 bottom-0 left-0 right-0 m-auto flex flex-col justify-center items-center rounded-xl 
                        lg:w-[80%] lg:h-3/4 
                        ">
                            <h1>Perception shapes perspective</h1>
                            <h1>Together we expand</h1>
                            <h1>Vision and Knowledge</h1>
                        </div>
                    </section>

                    <section id="2"
                    ref={(e) => createSectionsRefs(e, 1)}
                    className="h-full w-full flex justify-center items-center bg-blue-50">
                        <div>def</div>
                    </section>

                    <section id="3"
                    ref={(e) => createSectionsRefs(e, 2)}
                    className="h-full w-full flex justify-center items-center bg-purple-200">
                        <div>ghj</div>
                    </section>

                    <section id="4"
                    ref={(e) => createSectionsRefs(e, 3)}
                    className="h-full w-full flex justify-center items-center bg-red-400">
                        <div>klm</div>
                    </section>

                </main>
            </div>
        </>
    )
}

function SectionWrapper(children){
    return(
        <>

        </>
    )
}