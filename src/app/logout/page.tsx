'use client'
import { logout } from "@/actions/logout";
import { Button, TextField,  } from "@mui/material";
import { useFormStatus, useFormState } from 'react-dom'

export default function Login() {

  
  async function logout(){
    fetch("/api/logout",{
      method:'POST',
      headers:{
        'X-CSRF-TOKEN':document.cookie.split('=')[1]
      }
  }).then(resp=>resp.json().then(()=>window.location.replace('/login')))
  }

  return (
    <div className="flex flex-col items-center h-40 mt-40">
      <form action={logout}>
              <Button
                className="mt-2 w-full"
                variant="outlined"
                type="submit"
              >Logout</Button>
      </form>
    </div>
  );
}
