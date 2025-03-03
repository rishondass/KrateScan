"use client";
import {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";
import QRCode from "react-qr-code";
import { useItems } from "@/lib/globalStates";
import ItemsSection from "./ItemsSection";
import PrintModal from "@/components/PrintModal"
type Props = {
  id?: string | undefined;
  name?: string;
  description?: string;
  location?: string;
  image?: string;
  items?: itemType[] | undefined;
};



const Page = ({ id, name, description, location, items}: Props) => {
  const router = useRouter();
  const setItems = useItems(state=>state.setItems);
  const krateItems = useItems(state=>state.items);
  const [togglePrint, setTogglePrint] = useState(false);
  
  useEffect(()=>{
    setItems(items || []);
  },[items]);

  

  return (
    <>
      
      {togglePrint&& <PrintModal name={name} id={id} togglePrint={()=>{setTogglePrint(!togglePrint)}}/>}
      <div className="p-2 h-screen flex flex-col">
        <div className="flex justify-between">
          <IoChevronBack
            size={32}
            onClick={() => {
              router.back();
            }}
          />
        </div>
        <div className="flex pt-4">
          <div className="flex flex-col grow overflow-clip">
            <div className="text-4xl text-sec font-semibold">{name}</div>
            <div className="font-semibold">{location}</div>
            <div>{description}</div>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            {id&&<QRCode value={id} size={100} />}
            <button onClick={()=>setTogglePrint(true)} className="bg-prim rounded-md text-white px-3 py-2">
              print
            </button>
          </div>
        </div>
        <ItemsSection items={krateItems??[]} krateID={id as string} add={true}/>
      </div>
    </>
  );
};

export default Page;
