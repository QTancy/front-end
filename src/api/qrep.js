'use server'
import { cookies } from "next/headers"
const BASE_URL = process.env.QTANCY_MODEL_URL

export async function fetchData() {
    try {
        const cookieStore = await cookies();
        console.log(cookieStore)
        const jwtToken = cookieStore.get('authToken')?.value; 
        console.log("Token JWT yang diambil dari cookie:", jwtToken); 
        if (!jwtToken) {
            throw new Error("Tidak terautentikasi. Silakan login kembali.");
        }
        const response = await fetch(`${BASE_URL}/receipts/my_receipts`,{
            method:"GET",
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${jwtToken}`
            }
        })
        const data = await response.json()
        console.log(data)
        if (response.ok) { 
            return data;
        } else {
            throw new Error('Gagal fetch data!')
        }
    } catch (error) { 
        throw new Error("Terjadi kegagalan dalam sistem!")
    }
} 