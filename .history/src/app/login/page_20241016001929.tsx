"use client";
import { useState} from "react";
import { useUser } from "../lib/globalStates";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"
import type { SignInOptions } from "next-auth/react";
const getUserData = async (input: string) => {
  const res = await fetch("/api/v1/" + input);
  const data = await res.json();
  
  return data;
};

export default function Home() {
  const router = useRouter();
  const [userInput, setUserInput] = useState("");
  const setUser = useUser((state)=> state.setUser);
  const options:SignInOptions

  const credentialsAction = (formData: FormData) => {
    signIn("credentials", formData)
  }
  
  const login = async () => {
    if (userInput) {
      const data = await getUserData(userInput);
      console.log(data);
      setUser(data);
      router.push("/"+userInput);
    }
  };
  
  return <>
    <div className="bg-prim text-white flex items-center flex-col justify-center h-screen gap-3">
      <div className="text-6xl font-extrabold">
        <span className="text-sec">Krate</span> <span>Scan</span>
      </div>
      <form className="flex flex-col gap-2" action={credentialsAction}>
        <input
          type="text"
          placeholder="username"
          className="px-3 py-2 max-w-96 rounded-md text-black outline-none"
          autoComplete="false"
          onChange={(e) => setUserInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          className="px-3 py-2 max-w-96 rounded-md text-black outline-none"
          autoComplete="false"
        />
      </form>

      <button
        className="bg-sec p-3 rounded-md w-40 font-semibold"
        onClick={login}
      >
        login
      </button>
      {/* <div className="flex w-40 items-center justify-center gap-2">
        <hr className="w-10"/>
        or
        <hr className="w-10"/>
      </div>
      <button className="bg-sec p-3 rounded-md w-40 font-semibold">create account</button> */}
    </div>
    
  </>
}
