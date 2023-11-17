'use client'

import { ReactNode, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";
import { wrap } from "@motionone/utils";

interface ParallaxProps {
  children: ReactNode;
  baseVelocity: number;
}

export default function MarqueeMotion({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 100
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  /**
   * This is a magic wrapping for the length of the text,
   * You have to replace for wrapping that works for you or dynamically calculate
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -40, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((time, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * This is what changes the direction of the scroll once we switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  /**
   * The number of times to repeat the child text should be dynamically calculated based on the size of the text and viewport. 
   * Likewise, the x motion value is currently wrapped between -20 and -45%
   *  - this 25% is derived from the fact we have four children (100% / 4). 
   * This would also want deriving from the dynamically generated number of children.
   */
  return (
    <div className="select-none relative flex items-center whitespace-nowrap flex-nowrap leading-none w-screen overflow-hidden py-5">
      <motion.div className="" style={{ x }}>
        {[1,2,3,4,5].map((x) => {
          return(
            <span key={x}>{children}</span>
          )
        })}  
      </motion.div>
    </div>
  );
}

