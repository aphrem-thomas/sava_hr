'use client'
export default function Navbar() {
  return (
    <div className="w-full flex justify-center items-center absolute z-10 h-28 bg-transparent">
        <div className="container flex justify-between">
            <div className="logo text-4xl font-bold">SavaHR</div>
            <div className="navigation">
                {["Contact", "Jobs", "About Us", "Resources"].map((item)=>{
                    return(
                        <a className="ml-4 text-[24px]" href="item">{item}</a>
                    )
                })}
            </div>
        </div>
    </div>
  );
}
