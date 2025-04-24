
'use client'
import { login } from "@/actions/login";
import { Button, TextareaAutosize, TextField,  } from "@mui/material";
import { useFormStatus } from "react-dom";

export default function Login() {

  // async function addJob(event: any) {
  //   "use server";
  //   console.log("in login func", event)
  //   await login(event)
  //   // const response = await fetch('/api/login', {
  //   //   method: 'POST',
  //   //   body: formData,
  //   // })
 
  //   // Handle response if necessary
  //   // const data = await response.json()
  //   // ...
  // }

  function addjob(formData:any){
    fetch("/api/jobs",{
      method:'POST',
      body:formData
  }).then(resp=>resp.json().then())
  }

  return (
    <div className="flex flex-col items-center h-40 mt-40">
      <div className="flex flex-col items-center h-40 mt-40">
            <form action={addjob}>
                    <TextField
                      sx={{marginTop:'10px'}}
                      className="w-full"
                      id="title"
                      label="Job title"
                      variant="standard"
                      name="title"
                    />
                    <TextField
                      sx={{marginTop:'10px'}}
                      className="w-full"
                      id="role"
                      label="Position"
                      variant="standard"
                      name="role"
                    />
                    <TextField
                      sx={{marginTop:'10px'}}
                      className="w-full"
                      id="location"
                      label="Location"
                      variant="standard"
                      name="location"
                    />
                    
                    <TextareaAutosize
                      aria-label="description"
                      minRows={10}
                      name="description"
                      placeholder="Description"
                      style={{ marginTop:'10px', width: '100%' , border:'1px solid black', padding:'4px', borderRadius:'4px'}}
                    />
                     <LoginButton/>
                    
            </form>
            {/* {state?.errors?.username && <p>{state.errors.username}</p>} */}
          </div>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus()
 
  const handleClick = (event:any) => {
    if (pending) {
      event.preventDefault()
    }
  }
  return (
    <Button
    disabled={pending}
    className="mt-2 w-full"
    variant="outlined"
    type="submit"
    onClick={handleClick}
  >{pending?"Submitting in":"Submit"}</Button>
  )
}
