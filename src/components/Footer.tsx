
export default function Footer() {

  const getLinks = (header:string, links:{link:string, label:string}[])=>(
    <div className="linksheader mt-10">
                <div className="text-xl md:text-2xl">{header}</div>
                <div className="mt-1">{links.map(item=><div className="text-base"><a href={item.link}>{item.label}</a></div>)}</div>
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
           <div className="links flex flex-col md:mt-20  md:flex-row md:justify-between">
              
              {getLinks("Terms and conditions",[
                {link:"", label:"Terms and conditions"},
                {link:"", label:"Terms and conditions"},
                {link:"", label:"Terms and conditions"},
                {link:"", label:"Terms and conditions"},
                {link:"", label:"Terms and conditions"}
              ])}
              {getLinks("About us",[
                {link:"", label:"About us"},
                {link:"", label:"About us"},
                {link:"", label:"About us"}
              ])}

              {getLinks("Contact",[
                {link:"", label:"Contact"},
                {link:"", label:"Contact"},
                {link:"", label:"Contact"},
                {link:"", label:"Contact"},
                {link:"", label:"Contact"},
                {link:"", label:"Contact"}
              ])} 
           </div>
           </div>
        </div>
    </div>
  );
}
