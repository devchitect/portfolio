import dynamic from 'next/dynamic'
import ParallaxText from '@/component/marquee-motion'
const DynamicTypedText = dynamic(() => import('../../../component/typed-text'), {
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
                fullname font-l3 leading-none opacity-50 duration-300 tracking-[-0.8rem]
                lg:text-[220px] 

                sm:text-[110px] 
                `}
                >
                  <ParallaxText baseVelocity={3}><span>&#32;Dzung Nguyen&#32;</span><span className='inline-block scale-[0.75]'>+</span></ParallaxText>
                </div>
              </div>
            </div>
        </>
    )
  }
  