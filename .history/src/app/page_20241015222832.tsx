"use client";
import { useState } from "react";
import { useUser } from "../lib/globalStates";
import { useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react"
const getUserData = async (input: string) => {
  const res = await fetch("/api/v1/" + input);
  const data = await res.json();
  
  return data;
};

export default function Home() {
  const router = useRouter();
  const [userInput, setUserInput] = useState("");
  const setUser = useUser((state)=> state.setUser);

  const login = async () => {
    if (userInput) {
      const data = await getUserData(userInput);
      console.log(data);
      setUser(data);
      router.push("/"+userInput);
    }
  };
  
  return <>
    <SessionProvider>

    </SessionProvider>
  </>
    
  );
}
