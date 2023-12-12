import dynamic from 'next/dynamic';

const DynamicTrasition = dynamic(() => import('./page-transistion'), {
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
        <DynamicTrasition/>
        <div>
            {children}
        </div>
        <DynamicScrollTrigger/>
        </>
    )
}
