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
        <div className="footer min-h-[50%] bg-theme flex justify-center">
           <div className="md:max-w-[1129px] w-full p-5">
           <div className="content w-full text-white">
             <div className="logo text-3xl md:text-5xl md:mt-20">
              <div className="text-4xl">SavaHR</div>
              <div className="tagline text-base md:text-xl">Employers best partner and Employees best friend.</div>
              </div>
           </div>
           <div className="links flex justify-center md:mt-20 2xl:w-1/2">
              <div className="flex w-full flex-col md:flex-row md:justify-between">
              {getLinks("Terms and conditions",[
                {link:"", label:"Terms and conditions"},
              ])}
              {getLinks("About us",[
                {link:"", label:"About us"},
              ])}

              {getLinks("Contact",[
                {link:"mailto:contact@savahr.com", label:"contact@savahr.com"},
              ])} 
              </div>
           </div>
           </div>
        </div>
    </div>
  );
}
