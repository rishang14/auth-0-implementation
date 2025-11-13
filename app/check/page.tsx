"use client";
// what i am doing here is
// checking user exist or not if not exist then save in db and send him to complete the profile mean attend the profile info
// if exist then create a session and in complete profile i will create a session first and then complete the profile
// set the cookie for device id and then send it to the profile section
import { checkPage } from "@/lib/action/check";
import { useEffect } from "react";

const CheckPage =() => {
  useEffect(() => {
    async function checkUser() {
      await checkPage();
    }
    checkUser();
  }, []);
  return null;
};
export default CheckPage;
