
'use client'
import { login } from "@/actions/login";
import { Button, TextareaAutosize, TextField,  } from "@mui/material";
import { useFormStatus } from "react-dom";
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import {stateToHTML} from 'draft-js-export-html';

import React, { useState } from "react";

export default function Login() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [description, setDescription] = useState("");

  function addjob(formData:any){
    const today = new Date()
    console.log("current cookies", document.cookie.split('=')[1])
    formData.append('date', today)
    formData.append('description', description);
    fetch("/api/jobs",{
      method:'POST',
      body:formData,
      headers:{
        'X-CSRF-TOKEN':document.cookie.split('=')[1]
      }
  }).then(resp=>resp.json().then())
  }

  return (
    <div className="flex flex-col items-center h-40 mt-40">
      <div className="flex flex-col items-center mt-40 p-8">
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
                    <TextField
                      sx={{marginTop:'10px'}}
                      className="w-full"
                      id="company"
                      label="Company"
                      variant="standard"
                      name="company"
                    />
                    <div className="descHeader mt-10">Description</div>
                    <div className="descriptionSection mt-2 h-48 border-[1px] border-[#000] border-solid">
                      <Editor
                      editorState={editorState}
                      onChange={(e)=>{
                        setDescription(stateToHTML(e.getCurrentContent()));
                        setEditorState(e)
                      }}
                    />
                    </div>

                    <TextField
                      sx={{marginTop:'10px'}}
                      className="w-full"
                      id="requirements"
                      label="Requirements (comma separated, use colon for separating set of requirements)"
                      variant="standard"
                      name="requirements"
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
