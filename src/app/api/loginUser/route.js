import { API_URL } from '../../../../config'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

// THIS IS THE LOGIN API REQUEST

export async function POST(req, res) {

    const { email, password } = await req.json();

    // console.log(`Here is the login request email: ${email}, and login request password: ${password}`)

    const strapiRes = await fetch(`${API_URL}/auth/local/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({

            identifier: email,
            password: password,
        }),
        cache: 'no-store'
    })

    const data = await strapiRes.json();

    if(strapiRes.ok) {

        console.log('api/loginUser success!:', data)

        cookies().set({
            name: 'token',
            value: data.jwt,
            httpOnly: true,
        })
        
        revalidatePath('/dashboard')
        return NextResponse.json(data);

    } else {
        console.log(data.error.message)
        return NextResponse.json(data)
    }
}