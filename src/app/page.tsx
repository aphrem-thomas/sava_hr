import Image from "next/image";

export default function Home() {
  return (
    <div className="home">
      <div className="homebg w-full h-full left-0 top-0 fixed bg-cover -z-10 bg-[url('/images/savahr-cover.jpg')]"></div>
      <div className="bg-cover h-screen bg-transparent flex-col content-end">
        <div className="waveSection flex-col content-end">
          <svg viewBox="0 0 1440 150" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#FFF"
              d="M0,255 L80,255 C160,255,320,255,480,222.3 C640,190,800,124,960,83.5 C1120,43,1280,26,1440,50.8 L1440,255 L0,255 Z"
            ></path>
          </svg>
          <div className="content bg-white h-64 flex justify-center">
            <div className="container flex justify-between h-full items-center relative">
              <div className="punchline text-[48px]">Something here...</div>
              <div className="dialogue w-96 text-[24px] text-justify text-primaryfont absolute right-0 bottom-[40px]">
                HR is the bridge between people, management, and leadership at
                your organization. Ensure you have the right technology,
                partnership, and culture strategies in one place to positively
                impact employees and business goals.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dummy h-96 bg-white"></div>
    </div>
  );
}
