'use server'

import { createSession } from "@/lib/session"

export async function login(formData:any){
    console.log("in login formdata", formData.get('username'))
    if(formData.get("password")==="abc"){
        
        createSession(formData.get('username'))
    }
}