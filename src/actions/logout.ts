'use server'

import { deleteSession } from "@/lib/session"

export async function logout(formState:any,formData:any){
    console.log("in logout formdata:", formData.get('username'), "formState", formState)
    deleteSession()
}