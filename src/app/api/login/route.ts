export async function POST(req:Request) {
    console.log("in api login")
    return req.formData().then(data=>{
        return fetch("http://localhost:5000/login",{
            method:'POST',
            body: data
        })
    })
   
  }