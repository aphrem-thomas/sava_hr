import Image from "next/image";
import SchoolIcon from '@mui/icons-material/School';
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <div className="home w-full">
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
              <div className="dialogue w-96 text-[24px] font-medium text-justify text-primaryfont absolute right-0 bottom-[40px]">
                HR is the bridge between people, management, and leadership at
                your organization. Ensure you have the right technology,
                partnership, and culture strategies in one place to positively
                impact employees and business goals.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dummy h-screen bg-white w-full flex justify-center">
        <div className="messages container mt-28">
        <div className="why flex flex-col justify-center h-full items-center w-full">
          <div className="why_savahr flex-col items-center w-full justify-center">
            <div className="question text-center text-6xl bold text-black">
              Why SavaHR?
            </div>
            <div className="answer mt-2 font-medium text-center text-[24px]  text-primaryfont">
              "say some punch lines here, like (Drive people-centered business strategies with HR technology that sees the whole person, beyond just work.)"
            </div>
          </div>

          <div className="features flex mt-32 justify-around w-full">
            <div className="f1 flex-col flex w-80 items-center">
              <SchoolIcon className="text-theme !text-[40px]"/>
              <div className="description text-center text-[20px] font-medium">
                {"Provide your people and managers with leadership tools that see the whole employee — at any stage in their lifecycle — to deliver personalized support, foster belonging, and enable high performance."}
              </div>
            </div>

            <div className="f1 flex-col flex w-80 items-center">
              <SchoolIcon className="text-theme !text-[40px]"/>
              <div className="description text-center text-[20px] font-medium">
                {"Provide your people and managers with leadership tools that see the whole employee — at any stage in their lifecycle — to deliver personalized support, foster belonging, and enable high performance."}
              </div>
            </div>

            <div className="f1 flex-col flex w-80 items-center">
              <SchoolIcon className="text-theme !text-[40px]"/>
              <div className="description text-center text-[20px] font-medium">
                {"Provide your people and managers with leadership tools that see the whole employee — at any stage in their lifecycle — to deliver personalized support, foster belonging, and enable high performance."}
              </div>
            </div>
          </div>

        </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
