'use client'
import { login } from "@/actions/login";
import { Button, TextField,  } from "@mui/material";
import { useFormState, useFormStatus } from 'react-dom'

function loginn(formData:any){
  fetch("api/login",{
    method:'POST',
    body:formData
}).then(resp=>resp.json().then(data=>window.location.replace('/logout')))
}
export default function Login() {

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

