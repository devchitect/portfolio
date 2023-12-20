import dynamic from 'next/dynamic';

const DynamicTransition = dynamic(() => import('./page-transistion'), {
    loading: () => null,
    ssr: false 
})

const DynamicScrollTrigger = dynamic(() => import('./scroll-trigger'), {
    loading: () => null,
    ssr: false 
  })


export default function PageWrapper({children} : {children: React.ReactNode}){

    return (
        <>
        <DynamicTransition/>
        <div>
            {children}
        </div>
        <DynamicScrollTrigger/>
        <OverlayGrid/>
        </>
    )
}


function OverlayGrid(){
    const grid = [0,1,2,3,4,5,6,7,8,9];
  
    return(
      <>
        <div className='-z-10 opacity-[0.1] select-none pointer-events-none'>
          {grid.map((x) => {
              return (
                  <div key={x}
                    style={{left: `${x*(100/grid.length)}%`}}
                    className='fixed top-0 right-0 h-screen w-[10%] 
                    border-x border-secondaryColor'
                      
                  />
              )
          })}          
        </div>
              
      </>
    )
  }
  
  