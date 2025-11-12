import { auth0 } from '@/lib/auth0';
import { usePathname } from 'next/navigation';
import React from 'react'

const CheckPage = async() => {
  const user=await auth0.getSession(); 
  console.log(user); 
  
  const path= usePathname(); 

  console.log("path",path);   
}
export default CheckPage;