'use client'
import { login } from "@/actions/login";
import { Button, TextField,  } from "@mui/material";
import { useState } from "react";
import { useFormState, useFormStatus } from 'react-dom'

function loginn(formData:any){
  fetch("api/change_password",{
    method:'POST',
    body:formData
}).then(resp=>resp.json().then(data=>window.location.replace('/login')))
}
export default function ChangePassword() {

  return (
    <div className="flex flex-col items-center p-4 h-40 mt-40">
      <form action={loginn}>
        <TextField
          sx={{ marginTop: '10px' }}
          className="w-full"
          id="username"
          label="User name"
          variant="standard"
          name="username"
        />
        <TextField
          sx={{ marginTop: '10px' }}
          className="w-full"
          id="pwd"
          label="Old Password"
          type="password"
          variant="standard"
          name="oldPassword"
        />
          <TextField
            sx={{ marginTop: '10px' }}
            className="w-full"
            id="newPwd"
            label="New Password"
            type="password"
            variant="standard"
            name="newPassword"
          />
        <SubmitButton/>
      </form>
      {/* {state?.errors?.username && <p>{state.errors.username}</p>} */}
    </div>
  );
}

function SubmitButton() {
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
  >{pending?"Updating":"Update"}</Button>
  )
}

