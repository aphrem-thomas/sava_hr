export async function POST(req:Request) {
    return fetch("http://localhost:5000/logout",{
        method:'POST',
    })
  }