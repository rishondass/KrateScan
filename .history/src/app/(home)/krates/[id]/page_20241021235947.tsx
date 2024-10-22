"use client"
import KrateInfo from "@/components/KrateInfo";
import {useKrates} from "@/lib/globalStates";
import {useEffect} from "react";



const Page = ({ params }: { params: { id: string } }) => {
  const krates = useKrates((state) => state.krates);

  // Check if `krates` exists in the state first
  if (krates.length !== 0) {
    const krate = krates.find((krate) => krate.id === params.id);
    if (krate) {
      return <KrateInfo {...krate} />;
    }
  }

  // Fetch data from the server if `krates` are not loaded in state
  const res = await fetch("/api/v1/krate/" + params.id);
  const krate = await res.json();

  // Handle loading or rendering after fetch
  return (
    <div>
      {krate ? (
        <KrateInfo {...krate} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
  

  
}

export default Page;