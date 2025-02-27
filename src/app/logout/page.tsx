import { login } from "@/actions/login";
import { Button, TextField,  } from "@mui/material";

export default function Login() {

  async function onSubmit(event: any) {
    "use server";
    console.log("in login func", event)
    await login(event)
    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   body: formData,
    // })
 
    // Handle response if necessary
    // const data = await response.json()
    // ...
  }

  return (
    <div className="flex flex-col items-center h-40 mt-40">
      <form action={onSubmit}>
              <Button
                className="mt-2 w-full"
                variant="outlined"
                type="submit"
              >Logout</Button>
      </form>
    </div>
  );
}
