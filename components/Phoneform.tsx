"use client";

import { updatePhoneNo } from "@/lib/action/completeprofile";
import { redirect } from "next/navigation";
import { useState } from "react";

export const PhoneForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [phoneNO, setPhoneNo] = useState<number>(123456789);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (phoneNO && phoneNO < 1000000000) {
        setError("Phone Number Should be atleast 10 digit");
        return;
      }

      const { error, success } = await updatePhoneNo(phoneNO as number);

      if (error || !success) {
        setError(error);
        return;
      } else {
        redirect("/profile");
      }
    } catch (error) {
      setError("UnExpected Error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      className="space-y-6  border-gray-700 border  p-4 rounded-md  flex flex-col shadow-md  "
      onSubmit={handleFormSubmit}
    >
      <h3 className="text-xl font-medium  text-white">You are almost there </h3>
      <div>
        <label
          htmlFor="phone"
          className="text-sm font-medium  block mb-2 text-gray-300"
        >
          Your Phone No
        </label>
        <input
          type="tel"
          name="phoneno"
          id="phone"
          disabled={loading}
          value={phoneNO}
          onChange={(e) => setPhoneNo(Number(e.target?.value))}
          className=" border   sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="3223321212"
          required
        />
        {error && <span className="text-red-500">{error}</span>}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full text-white cursor-pointer  focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
      >
        continue
      </button>
    </form>
  );
};
