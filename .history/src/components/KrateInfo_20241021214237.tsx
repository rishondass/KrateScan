"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/globalStates";
import { IoChevronBack } from "react-icons/io5";
import QRCode from "react-qr-code";
import { IoIosAddCircle } from "react-icons/io";
import ItemModal from "@/components/ItemModal";

type Props = {
  id: string;
  name: string;
  description: string;
  location: string;
  image: string;
};



const Page = ({ id, name, description, location, image }: Props) => {
  const [toggleModal, setToggleModal] = useState(false);
  const router = useRouter();
  const [items, setItems] = useState<itemType[]>();

  useEffect(async()=>{
    const res = await fetch("/api/v1/krates/items/" + { id });
    const data = await res.json();
    setItems(data as itemType[]);
  },[])

  const toggleModalFn = () => {
    setToggleModal(!toggleModal);
  };

  return (
    <>
      {toggleModal && <ItemModal krateID={id} toggle={toggleModalFn} />}

      <div className="p-2">
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
            <QRCode value={id} size={100} />
            <button className="bg-prim rounded-md text-white px-3 py-2">
              print
            </button>
          </div>
        </div>
        <div>
          <IoIosAddCircle
            size={40}
            className="text-sec cursor-pointer"
            onClick={toggleModalFn}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
