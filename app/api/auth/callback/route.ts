import { auth0 } from "@/lib/auth0";
import { NextRequest, NextResponse } from "next/server"; 


export const runtime = "nodejs";
export const Get=async(request:NextRequest)=>{
const session=await  auth0.getSession()  
console.log(request,"request")

console.log(session,"session")  


return NextResponse.json({message:"heloo"})
};