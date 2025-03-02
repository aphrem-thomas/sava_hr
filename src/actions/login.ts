'use server'

import { createSession } from "@/lib/session"

export async function login(formData:any){
    console.log("in login formdata", formData.get('username'))
    return fetch("http://localhost:5000/login",{
        method:'POST',
        body:formData
    }).then(re=> console.log("cookies",re.headers.get('set-cookie')))
}