"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useItems} from "@/lib/globalStates";
import { IoChevronBack } from "react-icons/io5";
import QRCode from "react-qr-code";
import { IoIosAddCircle } from "react-icons/io";
import ItemModal from "@/components/ItemModal";
import ItemCard from "@/components/ItemCard";
type Props = {
  id?: string | undefined;
  name?: string;
  description?: string;
  location?: string;
  image?: string;
};



const Page = ({ id, name, description, location, image }: Props) => {
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleEditModal, setToggleEditModal] = useState<Partial<itemType> | null>(null);
  const router = useRouter();
  //const [items, setItems] = useState<itemType[]>();
  const items = useItems(state=>state.items);
  const setItems = useItems(state=>state.setItems);

  const goBack = () => {
    router.back();
  };

  const addItem = async (name: string, quantity: number, description: string, image: string) => {
    const res = await fetch("/api/v1/item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, quantity, description, image, krate_id: id }),
    });
    if (res.status === 200) {
      const data = await res.json();
      setItems([...items, data]);
    }
  };

  const generateQRCode = () => {
    const url = window.location.href;
    return <QRCode value={url} />;
  };

  const deleteItem =
  
  const handleEdit = (id: string, name: string, quantity: number, description: string, image: string)=>{
    if(id){
      console.log("HANDLING EDIT",name);
      setToggleEditModal({id, name, quantity, description, image});
    }else{
      setToggleEditModal(null);
    }
    
    
    
  } 

  useEffect(()=>{
    

    async function getItems(){
      if(id){
        const res = await fetch("/api/v1/krate/items/" + id);
        const data = await res.json();
        setItems(data as itemType[]);
      }
      
      
    }

    getItems();

  },[id])

  const toggleModalFn = () => {
    setToggleModal(!toggleModal);
  };

  return (
    <>
      {id&&toggleEditModal && <ItemModal krateID={id} handleEdit={handleEdit} {...toggleEditModal}/>}
      {id&&toggleModal && <ItemModal krateID={id} toggle={toggleModalFn} />}

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
            {id&&<QRCode value={id} size={100} />}
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
        <div>
          {items?.map(item=>{
            return <ItemCard key={item.id} {...item} handleEdit={handleEdit}/>
          })}
        </div>
      </div>
    </>
  );
};

export default Page;
