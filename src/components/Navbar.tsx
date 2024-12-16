'use client'

import { useEffect, useState } from "react";

export default function Navbar() {
    const [scrollY, setScrollY]=useState(0)
    const [transparentBG, setTransparentBG] = useState(true)
    const routes= [
        {id:'contact', name:'Contact'},
        {id:'jobs', name:'Jobs'},
        {id:'events', name:'Events'},
    ]
    let windowHeight = 0
    if (typeof window !== "undefined") {
        windowHeight = window.innerHeight
      }
     
    useEffect(()=>{
        window.addEventListener('scroll', handleScroll);
        return ()=>{
            window.removeEventListener('scroll',handleScroll)
        }
    },[])

    const handleScroll = ()=>{
        if(windowHeight-window.scrollY<=370){
            setTransparentBG(false)
        } else{
            setTransparentBG(true)
        }
    }
  return (
    <div className={`w-full flex justify-center items-center fixed z-10 h-16 md:h-28 ${transparentBG?'bg-transparent text-white':'bg-white text-primaryfont border-primaryfont border-b-2 border-solid'}`}>
        <div className="container justify-between hidden md:flex">
            <div className="logo text-4xl font-bold"><a className="ml-4 text-[24px]" href={'/'}>SavaHR</a></div>
            <div className="navigation">
                {routes.map((item)=>{
                    return(
                        <a className="ml-4 text-[24px]" href={item.id}>{item.name}</a>
                    )
                })}
            </div>
        </div>
        <div className="mobileview w-full flex justify-center md:hidden relative">
            <div className="logo text-3xl align-middle">SavaHR</div>
            <div className="menu absolute right-4">=</div>
        </div>
    </div>
  );
}
