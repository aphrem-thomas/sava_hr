import { link } from "fs";

export default function Footer() {

  const getLinks = (header:string, links:{link:string, label:string}[])=>(
    <div className="linksheader mt-10" >
                <div  className="text-xl md:text-2xl">{header}</div>
                <div className="mt-1">{links.map(item=><div key={item.label} className="text-base"><a href={item.link}>{item.label}</a></div>)}</div>
    </div>
  )
    
  return (
    <div className={`w-full bg-white text-white h-screen flex flex-col justify-end`}>
        <div className="footer min-h-[75%] bg-theme flex justify-center">
           <div className="w-3/4 p-5">
           <div className="content md:container text-white">
             <div className="logo text-3xl md:text-5xl md:mt-20">
              <div>SavaHR</div>
              <div className="tagline text-base md:text-xl">some tagline here</div>
              </div>
           </div>
           <div className="links flex justify-center md:mt-20 2xl:w-1/2">
              <div className="flex w-full flex-col md:flex-row md:justify-between">
              {getLinks("Terms and conditions",[
                {link:"", label:"Terms and conditions1"},
                {link:"", label:"Terms and conditions2"},
                {link:"", label:"Terms and conditions3"},
                {link:"", label:"Terms and conditions4"},
                {link:"", label:"Terms and conditions5"}
              ])}
              {getLinks("About us",[
                {link:"", label:"About us1"},
                {link:"", label:"About us2"},
                {link:"", label:"About us3"}
              ])}

              {getLinks("Contact",[
                {link:"", label:"Contact1"},
                {link:"", label:"Contact2"},
                {link:"", label:"Contact3"},
                {link:"", label:"Contact4"},
                {link:"", label:"Contact5"},
                {link:"", label:"Contact6"}
              ])} 
              </div>
           </div>
           </div>
        </div>
    </div>
  );
}
