'use server'
import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'

const secretKey = 'dkfalkdfjalkdfjlakdjfldjflkd' //process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1d')
      .sign(encodedKey)
  }
   
  export async function decrypt(session: string | undefined = '') {
    try {
      const { payload } = await jwtVerify(session, encodedKey, {
        algorithms: ['HS256'],
      })
      return payload
    } catch (error) {
      console.log('Failed to verify session')
    }
  }
 
export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)
  const session = await encrypt({ userId, expiresAt })
  const cookieStore = await cookies()
    console.log("setting cookies, user id:", userId)
    cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    path: '/',
  })
}

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('session')
  }