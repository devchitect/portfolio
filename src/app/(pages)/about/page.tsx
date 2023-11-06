import dynamic from 'next/dynamic'
import ParallaxText from '@/component/marquee-motion'
const DynamicTypedText = dynamic(() => import('../../../component/utils/typed-text'), {
    loading: () => null,
    ssr: false
  })

export default function About() {
    return (
        <>
            <div>
              <div>
                <div
                className={` 
                font-l3 leading-none opacity-50 duration-300 tracking-[-0.8rem]
                lg:text-[220px] 

                sm:text-[100px] 
                `}
                >
                  <ParallaxText baseVelocity={3}><span>&#32;Dzung Nguyen&#32;</span><span className='inline-block scale-[0.75]'>+</span></ParallaxText>
                </div>
              </div>
            </div>
        </>
    )
  }
  