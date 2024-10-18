"use client";
import { useState} from "react";
import { useUser } from "../../lib/globalStates";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"
import "../../"

export default function Page() {
  


  const credentialsAction = (formData: FormData) => {
  
    signIn("credentials",{
      redirectTo: "/",
      username: formData.get('username'),
      password: formData.get('password'),
    })
  }
  

  
  return <>
    <div className="bg-prim text-white flex items-center flex-col justify-center h-screen gap-3">
      <div className="text-6xl font-extrabold">
        <span className="text-sec">Krate</span> <span>Scan</span>
      </div>
      <form className="flex flex-col gap-2" action={credentialsAction}>
        <input
          name="username"
          type="text"
          placeholder="username"
          className="px-3 py-2 max-w-96 rounded-md text-black outline-none"
          autoComplete="false"
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          className="px-3 py-2 max-w-96 rounded-md text-black outline-none"
          autoComplete="false"
        />
        <button
        type="submit"
        className="bg-sec p-3 rounded-md w-40 font-semibold"
        >
          login
        </button>
      </form>

      
      {/* <div className="flex w-40 items-center justify-center gap-2">
        <hr className="w-10"/>
        or
        <hr className="w-10"/>
      </div>
      <button className="bg-sec p-3 rounded-md w-40 font-semibold">create account</button> */}
    </div>
    
  </>
}
