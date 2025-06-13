'use server'
const BASE_URL = process.env.QTANCY_URL

export async function signUp(name, email, password) {
    try {
        const response = await fetch(`${BASE_URL}/signUp`,{
            method: "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({ name, email, password })
        })
    
        const data = await response.json()
    
        if (!response.ok) { 
            throw new Error(data.message || 'Sign Up Gagal!')
        }
        console.log(data)
        return data;
    } catch (error) { 
        console.error('Error saat sign up :',error)
        throw error;
    }
}

export async function signIn(email, password) {
    try { 
        const response = await fetch(`${BASE_URL}/signIn`, {
            method:"POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({ email, password })
        })

        const data = await response.json()

        if(!response.ok) { 
            throw new Error(data.message || 'Sign In Gagal!')
        }
        console.log(data)
        return data;
    } catch (error) { 
        console.error('Error saat sign in :',error)
        throw error;
    }
}