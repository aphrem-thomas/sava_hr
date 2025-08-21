'use client'
import { login } from "@/actions/login";
import { Button, TextField,  } from "@mui/material";
import { useState } from "react";
import { useFormState, useFormStatus } from 'react-dom'

export default function Login() {
  const [showError, setShowError] = useState(false);
  function loginn(formData:any){
  fetch("api/login",{
    method:'POST',
    body:formData
}).then(resp=>resp.json().then(data=>window.location.replace('/logout'))).catch(err=>{
  setShowError(true);
  setTimeout(()=>{
    setShowError(false);
  }, 3000)
})
}
  return (
    <div className="flex flex-col items-center p-4 h-40 mt-40">
      <form action={loginn}>
        <TextField
                sx={{marginTop:'10px'}}
                className="w-full"
                id="username"
                label="User name"
                variant="standard"
                name="username"
              />
              <TextField
                sx={{marginTop:'10px'}}
                className="w-full"
                id="pwd"
                label="Password"
                type="password"
                variant="standard"
                name="password"
              />
               <LoginButton/>
              
      </form>
      {/* {state?.errors?.username && <p>{state.errors.username}</p>} */}
      {showError && (
        <div className="text-red-500 mt-2">
          Invalid username or password. Please try again.
        </div>
      )}
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
  >{pending?"Logging in":"Login"}</Button>
  )
}

