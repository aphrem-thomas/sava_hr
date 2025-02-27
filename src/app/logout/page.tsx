'use client'
import { logout } from "@/actions/logout";
import { Button, TextField,  } from "@mui/material";
import { useFormStatus, useFormState } from 'react-dom'

export default function Login() {

  
    const [state, action, pending] = useFormState<any, any>(logout, undefined)

  return (
    <div className="flex flex-col items-center h-40 mt-40">
      <form action={action}>
              <Button
                className="mt-2 w-full"
                variant="outlined"
                type="submit"
              >Logout</Button>
      </form>
    </div>
  );
}
