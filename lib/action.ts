"use server"
import { auth0 } from "./auth0";
import prisma from "./prisma";


export const updatePhoneNo=async(number:number)=>{
 try {  
    const session=await auth0.getSession(); 

    if(!session?.user){
        return {error:"Unauthenticated Request", success:false};
    }  
    const PhoneNo=number; 
    if(PhoneNo < 1000000000){
        return {success:false,error:"Number Should be 10 Digit"}  
    }  
    

    const updatePhone= await prisma.user.update({
        where:{
            email:session.user.email,
        },
        data:{
            phone: PhoneNo.toString()
        }
    })
     
    return {success:true ,message:"No updated Successfully"}
 } catch (error) {
    return {success:false,error:"Internal Server Error"}  
 }
}