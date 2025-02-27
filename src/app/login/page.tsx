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
              <Button
                className="mt-2 w-full"
                variant="outlined"
                type="submit"
              >Login</Button>
      </form>
    </div>
  );
}
