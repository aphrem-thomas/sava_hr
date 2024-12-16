"use client";

import Image from "next/image";
import SchoolIcon from "@mui/icons-material/School";
import DevicesIcon from "@mui/icons-material/Devices";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import Footer from "@/components/Footer";
import { Alert, Button, CircularProgress, TextField, styled } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Paper from "@mui/material/Paper";
import DeleteIcon from '@mui/icons-material/Delete';
import { useRef, useState } from "react";

const VisuallyHiddenInput = styled("input")(({ theme }) => ({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
}));

export default function Contact() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [resume, setResume] = useState<any>("");
  const [submitting, setSubmittingState] = useState(false);
  const [type, setType] = useState<any>("success");
  const [alert, showAlert] = useState(false);
  const [message, setMessage] = useState("");

  const inputFile:any = useRef(null);

  enum statusList {
    working='working',
    searching='searching'
  }

  const resetMessage = ()=>{
    setTimeout(()=>{
      showAlert(false);
      setMessage("")
    },2000)
  }

  const resetAllFields = ()=>{
      setEmail("");
      setFname("");
      setLname("");
      setResume("");
      setTitle("");
      setStatus("");
  }



  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setSubmittingState(true);

    if (
      fname === "" ||
      lname === "" ||
      email === "" ||
      resume === "" ||
      status === "" ||
      title===""
    ) {
      setType("error");
      showAlert(true);
      setMessage("Please enter all fields")
      setSubmittingState(false);
      resetMessage()
      return;
    }
    const formData = new FormData();

    formData.append("name", fname + " " + lname);
    formData.append("email", email);
    formData.append("resume", resume);
    formData.append("title", title);
    formData.append("status", status);
    let resp = await fetch("api/contact", {
      method: "POST",
      body: formData,
      cache: "no-cache",
      mode: "no-cors",
    });
    if (resp.ok) {
      setType("success");
      setMessage("Successfully submitted your data");
      resetMessage()
      showAlert(true);
      resetAllFields()
      setSubmittingState(false);
    } else {
      setType("error");
      setMessage("error in subimitting data");
      showAlert(true);
      resetMessage()
      resetAllFields()
      setSubmittingState(false);
    }
    setSubmittingState(false);
  }


  return (
    <div className="home flex justify-center w-full mt-20 text-primaryfont ">
      <div className="container p-10 flex justify-between">
        <div className="leftSection md:w-2/5">
          <div className="header text-3xl">Connect with our team</div>
          <div className="connectionMessage mt-4">
            Need help with something, want demo, looking for a job. Get in touch
            with or team and will contact you.
          </div>
          <div className="contactform flex mt-8 flex-col">
            <div className="name w-full">
              <TextField
                sx={{marginTop:'10px'}}
                className="w-full"
                id="standard-basic"
                label="First name"
                variant="standard"
                value={fname}
                onChange={(e)=>setFname(e.target.value)}
              />
              <TextField
                sx={{marginTop:'10px'}}
                className="w-full"
                id="standard-basic"
                label="Last name"
                variant="standard"
                value={lname}
                onChange={(e)=>setLname(e.target.value)}
              />
            </div>
            <TextField value={email} sx={{marginTop:'10px'}} id="standard-basic" label="Email" variant="standard"
            onChange={(e)=>setEmail(e.target.value)} />
            <TextField
              sx={{marginTop:'10px'}}
              id="standard-basic"
              label="Current job title"
              variant="standard"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
            />
            <div className="resumeUpload mt-4 flex">
              <label
                tabIndex={-1}
                role={undefined}
                htmlFor={"file-upload"}
                style={{
                  padding: "16px",
                  borderRadius: "10px",
                  background: "#F5F5F5",
                  cursor:'pointer'
                }}
                className="uploadSection flex items-center w-full justify-between"
              >
                <div className="message">
                  {resume==="" && <>
                  <div className="messageheader text-base">Upload Resume</div>
                  <div className="messagecontent text-[10px]">
                    Upload Resume in pdf or doc format
                  </div>
                  </>}
                  {resume!=="" && <>
                  <div className="messageheader text-base">{resume.name}</div>
                  </>}
                </div>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50px",
                    border: "1px solid #53565A",
                  }}
                  className="icon flex justify-center items-center"
                >
                  {resume===""?<CloudUploadIcon/>:<DeleteIcon sx={{cursor:'pointer'}} onClick={(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    if (inputFile.current) {
                      inputFile.current.value = "";
                      inputFile.current.type = "text";
                      inputFile.current.type = "file";
                    }
                    setResume("")}}/>}
                </div>
              </label>
              <input className="hidden" id="file-upload" type="file"
                ref={inputFile}
               onChange={(e:any) => {
                if (e.target.files?.length) {
                  setResume(e.target.files[0]);
                  console.log("file is", resume)
                }
              }}
              accept=".pdf,.doc, .docx"
              />
            </div>
            <div className="jobstatus flex flex-col">
              <Button
                sx={{
                  height: "60px",
                  marginTop: "10px",
                  color: "#4cc0b4",
                  borderColor: "#4cc0b4",
                  borderWidth:status===statusList.working?"4px":"1px"
                }}
                onClick={()=>setStatus(statusList.working)}
                variant="outlined"
                endIcon={status=== statusList.working && <CheckCircleIcon />}
              >
                I am currently working
              </Button>

              <Button
                sx={{
                  height: "60px",
                  marginTop: "10px",
                  color: "#4cc0b4",
                  borderColor: "#4cc0b4",
                  borderWidth:status===statusList.searching?"4px":"1px"
                }}
                variant="outlined"
                onClick={()=>setStatus(statusList.searching)}
                endIcon={status===statusList.searching && <CheckCircleIcon />}
              >
                I am currently job hunting
              </Button>
            </div>

            <Button
              sx={{
                height: "50px",
                marginTop: "30px",
                color: "#FFF",
                borderColor: "#4cc0b4",
                width: "100%",
                background: "#4cc0b4",
              }}
              onClick={handleSubmit}
              variant="contained"
            >
              {submitting?<CircularProgress sx={{color:'#FFF'}}/>:"submit"}
            </Button>
          </div>
        </div>

        <div className="rightSection w-1/2 hidden md:flex items-center">
          <img src="/images/connect.svg"></img>
        </div>
        {alert && <div className="alertbox absolute bottom-0 left-0 w-full h-32 flex items-center justify-center">
          <Alert sx={{width:'50%'}} severity={type}>{message}</Alert>
        </div>}
      </div>
    </div>
  );
}
