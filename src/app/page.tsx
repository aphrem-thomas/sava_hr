import Image from "next/image";
import SchoolIcon from '@mui/icons-material/School';
import DevicesIcon from '@mui/icons-material/Devices';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import Footer from "@/components/Footer";
import bg from '@/images/sava-hr-cover.jpg'


const whySavaHR = () => (
 <>
          <div className="image md:w-1/2 2xl:w-1/3">
              <img className="contain h-48 md:h-72 w-full border-solid border rounded-lg object-cover md:object-fill" src="/images/discuss-compress.jpg"></img>
            </div>
            <div className="content md:w-1/2 md:ml-4 2xl:ml-10">
              <div className="md:hidden mt-8 whysavahr text-2xl">
              Why SavaHR?
              </div>
              <div className="whyanswer mt-4 text-base md:text-base 2xl:text-xl">
              say some punch lines here, like (Drive people-centered business strategies with HR technology that sees the whole person, beyond just work.)" "say some punch lines here, like (Drive people-centered business strategies with HR technology that sees the whole person, beyond just work.)
              </div>
            </div>
</>
)
export default function Home() {

  const punchlineText = "HR is the bridge between people, management, and leadership at\
                your organization. Ensure you have the right technology,\
                partnership, and culture strategies in one place to positively\
                impact employees and business goals."
  return (
    <div className="home w-full">
      <div className="homebg hidden md:block w-full md:h-full h-1/4 left-0 top-0 fixed bg-cover -z-10 bg-[url('/images/sava-hr-cover.jpg')]"></div>
      <div className="bg-cover h-full md:h-screen md:bg-transparent flex-col md:content-end">
        <div className="md:hidden [clip-path:ellipse(72%_51%_at_50%_33%)] homebg-mobile w-full h-64 bg-cover bg-[url('/images/sava-hr-cover.jpg')]"></div>
        <div className="waveSection bg-transparent flex-col md:content-end">
          <svg className="hidden md:block" viewBox="0 0 1440 150" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#FFF"
              d="M0,255 L80,255 C160,255,320,255,480,222.3 C640,190,800,124,960,83.5 C1120,43,1280,26,1440,50.8 L1440,255 L0,255 Z"
            ></path>
          </svg>
          <div className="content bg-white flex h-[250px] justify-center">
            <div className="container p-12 flex flex-col md:flex-row justify-between items-center relative">
              <div className="punchline text-xl text-primaryfont md:text-[60px]">Human resource</div>
              <div className="hidden md:block dialogue w-96 text-[18px] 2xl:text-[21px] font-medium text-justify md:text-center text-primaryfont right-0 top-0
              2xl:absolute 2xl:right-[-150px] 2xl:top-[-25px]">
                {punchlineText}
              </div>
              <div className="md:hidden  text-center text-primaryfont leading-[45px] mt-6 text-4xl">Build a people strategy that connects life and work.</div>
            </div>
          </div>
        </div>
      </div>


      <div className="md:hidden mt-24 why p-6 bg-white md:flex md:justify-center">
        <div className="container md:flex md:mt-40 md:justify-center">
            {whySavaHR()} 
        </div>
      </div>
      <div className="why_savahr hidden bg-white md:flex flex-col items-center w-full justify-center md:h-[70vh] 2xl:h-[50vh]">
            <div className="question text-center text-6xl bold text-primaryfont">
              Why SavaHR?
            </div>
            <div className="w-1/2 md:flex mt-10 md:justify-center 2xl:mt-16">
              {whySavaHR()} 
            </div>
      </div>

      <div className="dummy bg-white w-full flex justify-center">
          <div className="features flex flex-col items-center md:flex-row md:justify-around md:container">
            <div className="f1 flex-col flex w-80 items-center mt-10">
              <SchoolIcon className="text-theme !text-[40px]"/>
              <div className="header mt-2 mb-2 text-2xl text-darkthemefont">Some heading</div>
              <div className="description text-justify text-[16px] 2xl:text-[20px] font-medium">
                {"Provide your people and managers with leadership tools that see the whole employee — at any stage in their lifecycle — to deliver personalized support, foster belonging, and enable high performance."}
              </div>
            </div>

            <div className="f1 flex-col flex w-80 items-center mt-10">
              <DevicesIcon className="text-theme !text-[40px]"/>
              <div className="header mt-2 mb-2 text-2xl text-darkthemefont">Some heading</div>
              <div className="description justify text-[16px] 2xl:text-[20px] font-medium">
                {"Provide your people and managers with leadership tools that see the whole employee — at any stage in their lifecycle — to deliver personalized support, foster belonging, and enable high performance."}
              </div>
            </div>

            <div className="f1 flex-col flex w-80 items-center mt-10">
              <VpnLockIcon className="text-theme !text-[40px]"/>
              <div className="header mt-2 mb-2 text-2xl text-darkthemefont">Some heading</div>
              <div className="description text-justify text-[16px] 2xl:text-[20px] font-medium">
                {"Provide your people and managers with leadership tools that see the whole employee — at any stage in their lifecycle — to deliver personalized support, foster belonging, and enable high performance."}
              </div>
            </div>
          </div>
      </div>
      <Footer/>
    </div>
  );
}
