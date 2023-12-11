import { Metadata } from "next"
import React from "react"

export const metadata : Metadata = {
    title: 'Blog - Devchitect',
}

export default function Layout({children} : {children : React.ReactNode}){
    return(
        <>
        {children}
        </>
    )
}