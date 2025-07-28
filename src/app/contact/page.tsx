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
import ContactForm from "@/components/contactForm";

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
  const [experience, setExperience] = useState("");

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
      setExperience("");
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
    formData.append("experience", experience)
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
      <div className="max-w-[1129px] w-full p-10 flex justify-between">
        <div className="leftSection md:w-2/5">
          <ContactForm
            heading="Connect with our team"
            subHeading="Need help with something, want demo, looking for a job. Get in touch with or team and will contact you."
            doneSubmitting={(
            )=>{
              setType("success");
              setMessage("Successfully submitted your data");
              resetMessage()
              showAlert(true);
            }}
            errorSubmitting = {(
            )=>{
              setType("error");
              setMessage("error in subimitting data");
              showAlert(true);
              resetMessage()
            }}
          />
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
