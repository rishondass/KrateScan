"use client";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
// const getUserData = async (input: string) => {
//   const res = await fetch("/api/v1/" + input);
//   const data = await res.json();
  
//   return data;
// };

export default function Page() {
  const router = useRouter();
  // const [userInput, setUserInput] = useState("");
  // const setUser = useUser((state)=> state.setUser);
  const { data: session } = useSession();

  if(session){
    console.log(session);
  }

  
  return <>
    <div className="bg-prim text-white flex items-center flex-col justify-center h-screen gap-3">
      <div className="text-6xl font-extrabold">
        <span className="text-sec">Congrats!</span>
        <button onClick={()=>{signOut({redirectTo:"/api/auth/signin"});}}>logout</button>
        <div>
          <button onClick={()=>{router.push("/krates")}}>Krates</button>
        </div>
      </div>
    </div>
    
  </>
}
