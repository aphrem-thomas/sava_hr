import Image from "next/image";
import SchoolIcon from '@mui/icons-material/School';
import DevicesIcon from '@mui/icons-material/Devices';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import Footer from "@/components/Footer";
import bg from '@/images/sava-hr-cover.jpg'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

const punchlineText = "Whether you're taking your first step or making a career change, we’re here to connect you with the right opportunity." 

const empoweringText = "Empowering People, Elevating Businesses — Your Trusted Partner in HR Excellence.";

const aboutSavaHRText= "We connect top talent with the right opportunities, specializing in IT and government recruitment. Acting as trusted partners, we streamline hiring processes for employers and help job seekers find rewarding careers that match their skills and goals."
const newJob = () => (
  <>
           <div className="image md:w-1/2 2xl:w-1/3">
               <img className="contain h-48 md:h-72 w-full border-solid border rounded-lg object-cover md:object-fill" src="/images/discuss-compress.jpg"></img>
             </div>
             <div className="content md:w-1/2 md:ml-4 2xl:ml-10">
               <div className="md:hidden mt-8 whysavahr text-2xl">
               Looking for a job?
               </div>
               <div className="whyanswer mt-4 text-base md:text-base 2xl:text-xl">
               {punchlineText}
               </div>
               <a href="/jobs">
                <Button
                  sx={{
                    height: "30px",
                    marginTop: "10px",
                    color: "#FFF",
                    background:'#4cc0b4',
                    borderColor: "#4cc0b4",
                    boxShadow:"unset"
                  }}
                  variant="contained"
                >
                  Learn more
                </Button>
               </a>
             </div>
 </>
 )
export default function Home() {
  return (
    <div className="home w-full">
      <div className="homebg hidden md:block w-full md:h-full h-1/4 left-0 top-0 fixed bg-cover -z-10 bg-[url('/images/sava-hr-cover.jpg')]"></div>
      <div className="bg-cover h-full md:h-screen md:bg-transparent flex-col md:content-end">
        <div className="hidden md:flex flex-col items-center">
          <div className="punchlineWrapper container">
            <div className="punchline text-xl text-white md:text-lg">Human resource</div>
            <div className="punchlineDescription text-white w-[600px] md:text-4xl">{empoweringText}</div>
          </div>
        </div>
        <div className="md:hidden [clip-path:ellipse(72%_51%_at_50%_33%)] homebg-mobile w-full h-64 bg-cover bg-[url('/images/sava-hr-cover.jpg')]"></div>
        <div className="waveSection bg-transparent flex-col md:content-end">
          <svg className="hidden md:block" viewBox="0 0 1440 150" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#FFF"
              d="M0,255 L80,255 C160,255,320,255,480,222.3 C640,190,800,124,960,83.5 C1120,43,1280,26,1440,50.8 L1440,255 L0,255 Z"
            ></path>
          </svg>
          <div className="content bg-white flex h-[35vh] justify-center">
            <div className="hidden container p-12 md:flex flex-col md:flex-row justify-between relative">
              <div className="aboutSavaHR w-[700px] text-lg leading-7 text-primaryfont">
                <div className="whatwedo text-3xl">What we do?</div>
                <div className="whatwedotext mt-6 italic">{aboutSavaHRText}</div>
              </div>
              <div className="hidden md:block findjobCard xl:right-0 xl:top-[-150px]
              md:absolute md:right-0 2xl:top-[-255px]">
                <Card className="w-[100%] md:max-w-[350px]">
                  <CardMedia
                    sx={{ height: 240, border:"12px solid #FFF;"}}
                    image="/images/discuss-compress.jpg"
                    title="jobs"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Looking for a job
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {punchlineText}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <a href="/jobs"><Button size="small">Learn More</Button></a>
                  </CardActions>
                </Card>
              </div>
              {/* <div className="hidden md:block dialogue w-96 text-[18px] 2xl:text-[21px] font-medium text-justify md:text-center text-primaryfont right-0 top-0
              2xl:absolute 2xl:right-[-150px] 2xl:top-[-25px]">
                {punchlineText}
              </div> */}
            </div>
            <div className="md:hidden mobilePunchline flex flex-col items-center container">
              <div className="mobile-punchline-heading md:hidden">Human Resource</div>
              <div className="text-center text-primaryfont leading-[50px] p-10 mt-6 text-4xl">{empoweringText}</div>
            </div>
          </div>
        </div>
      </div>


      <div className="md:hidden mt-24 why p-6 bg-white md:flex md:justify-center">
        <div className="container md:flex md:mt-40 md:justify-center">
            {newJob()} 
        </div>
      </div>

      <div className="dummy bg-white w-full p-4 flex justify-center mt-10 md:mt-0">
          <div className="wrapper_why w-full flex flex-col items-center">
          <div className="hidden md:flex question bg-white text-center text-6xl bold text-primaryfont mt-48 mb-20">
            Why SavaHR?
          </div>
          <div className="features flex flex-col items-center md:items-start md:flex-row md:flex-wrap md:justify-between md:container">
            <div className="f1 flex-col flex w-full items-center mt-10 md:justify-between md:w-[400px] 2xl:w-[500px] md:p-6">
              <SchoolIcon className="text-theme !text-[40px]"/>
              <div className="header text-center mt-8 mb-6 text-2xl text-darkthemefont">Industry expertise in IT & government recruitment</div>
              <div className="description text-primaryfont w-full text-center text-[16px] 2xl:text-[20px] font-medium">
                {"With deep expertise in IT and government recruitment, we connect top talent with organizations, ensuring precise matches for specialized roles in both public and private sector environments."}
              </div>
            </div>

            <div className="f1 flex-col flex w-full items-center mt-24 md:mt-10 md:w-[400px] 2xl:w-[500px] md:p-6">
              <DevicesIcon className="text-theme !text-[40px]"/>
              <div className="header text-center mt-8 mb-6 text-2xl text-darkthemefont">Tailored hiring solutions for employers & job seekers</div>
              <div className="description text-primaryfont text-center text-[16px] 2xl:text-[20px] font-medium">
                {"Our customized hiring solutions support both employers and job seekers, ensuring businesses find top talent while professionals secure opportunities that match their skills, ambitions, and career paths."}
              </div>
            </div>

            <div className="f1 flex-col w-full flex items-center mt-24 md:mt-10 md:w-[400px] 2xl:w-[500px] md:p-6">
              <VpnLockIcon className="text-theme !text-[40px]"/>
              <div className="header text-center mt-8 mb-6 text-2xl text-darkthemefont">Efficient, reliable, and result-driven approach</div>
              <div className="description text-primaryfont text-center text-[16px] 2xl:text-[20px] font-medium">
                {"We deliver staffing and HR solutions with efficiency, consistency, and a focus on measurable results, ensuring every hire and HR process supports your business goals and long-term success."}
              </div>
            </div>
          </div>
          </div>
      </div>
      <Footer/>
    </div>
  );
}
