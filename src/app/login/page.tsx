"use client";
import { useState, useEffect} from "react";
import {useSearchParams, useRouter} from "next/navigation";
import { signIn } from "next-auth/react"
import SignUp from "@/components/SignUp";
import {clsx} from "clsx";
import { GrFormView, GrFormViewHide } from "react-icons/gr";


export default function Page() {
  const [signUp, setSignUp] = useState(false);
  const [view, setView] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const error = params.get("error");

  
  useEffect(()=>{
    
  },[])
  

  const credentialsAction = async(formData: FormData) => {
    const res = await signIn("credentials",{
      redirect: false,
      username: formData.get('username'),
      password: formData.get('password'),
    });
    if(res?.code === "credentials"){
      router.push(`/login?error=invalid_credentials`)
    }else{
      router.push("/krates");
    }
  }
  

  
  return <>
    {signUp&&<SignUp toggle={()=>{setSignUp(!signUp)}}/>}
    <div className="bg-prim text-white flex items-center flex-col justify-center h-screen gap-3">
      <div className={clsx("bg-rose-500 py-2 px-3 rounded-md",error?"visible":"invisible")}>incorrect username/password</div>
      <div className="text-6xl font-extrabold">
        <span className="text-sec">Krate</span> <span>Scan</span>
      </div>
      <form className="flex flex-col gap-3 items-center" action={credentialsAction}>
        <input
          name="username"
          type="text"
          placeholder="username"
          className="px-3 py-2 max-w-96 rounded-md text-black outline-none"
          autoComplete="false"
        />
        <div className="bg-red-400 items-center max-w-96 rounded-md text-black relative">
          <input
            name="password"
            type={view?"text":"password"}
            placeholder="password"
            className="outline-none px-3 py-2 rounded-md"
            autoComplete="false"
          />
          {view?<GrFormViewHide className="absolute right-1 bottom-2" size={24} onClick={()=>setView(false)}/>:<GrFormView onClick={()=>setView(true)} className="absolute right-1 bottom-2" size={24}/>}

        </div>
        
        <button
        type="submit"
        className="bg-sec p-3 rounded-md w-40 font-semibold"
        >
          login
        </button>
      </form>

      
      <div className="flex w-40 items-center justify-center gap-2">
        <hr className="w-10"/>
        or
        <hr className="w-10"/>
      </div>
      <button className="bg-sec p-3 rounded-md w-40 font-semibold" onClick={()=>{setSignUp(!signUp)}}>create account</button>
    </div>
    
  </>
}
