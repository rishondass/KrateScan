import React from 'react'
import { IoIosClose } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import Camera, { FACING_MODES} from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import {useState} from "react";
import Image from "next/image";

import { v4 as uuid } from 'uuid';
import { useItems } from '@/lib/globalStates';
type Props = {
  id?: string;
  name?: string;
  description?: string;
  quantity?: number;
  image?: string;
  krateID:string,
  handleEdit?: (id: string, name: string, quantity:number, description: string, image: string)=>void;
  toggle?: ()=>void;
}

const ItemModal = ({krateID, id,name, description, quantity, image, toggle,handleEdit}:Props) => {
  const items = useItems(state=>state.items);
  const setItems = useItems(state=>state.setItems);
  const [dataUri, setDataUri] = useState("")
  const [toggleCamera, setToggleCamera] = useState(false);
  const [itemInfo, setItemInfo] = useState<itemType>({name:name||"",description:description||"",quantity:quantity||1,image:image||"",id: id||uuid(),krateID: krateID || ""});

  const cameraToggle = ()=>{
    setToggleCamera(!toggleCamera);
  }

  

  function handleTakePhotoAnimationDone (dataUri:string) {
    console.log('takePhoto', dataUri);
    setDataUri(dataUri);
    cameraToggle();
  }

  async function addItem(){
    const add = await fetch('/api/v1/krate/items/'+krateID,{
      method: "POST",
      body: JSON.stringify(itemInfo),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if(add.status === 200){
      const temp = items;
      toggle?.();
    }
  }

  async function saveItem(){
    //TODO: save item api
    const save = await fetch("/api/v1/item/"+id,{
      method: "PUT",
      body: JSON.stringify(itemInfo),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if(save.status === 200){
      handleEdit?.("","",-1,"","");
    }
  }
  


  return <>
    <div className='z-20 absolute left-0 top-0'>
      {toggleCamera&&<Camera isFullscreen={true} idealFacingMode={FACING_MODES.ENVIRONMENT} isMaxResolution={true} onTakePhotoAnimationDone={handleTakePhotoAnimationDone}/>}
    </div>
    <div className='z-10 absolute left-0 top-0 bg-black/60 w-full h-full'>
      <div className='flex justify-center items-center h-full'>
        <div className='bg-white rounded-md h-4/5 w-11/12 p-2'>
          <div className='flex justify-end'>
            {handleEdit?<IoIosClose size={42} onClick={()=>{handleEdit("","",-1,"","")}}/>:<IoIosClose size={42} onClick={toggle}/>}
          </div>
          
          <div className='text-3xl font-bold text-center text-sec'>
            Item
          </div>

          <div className='grid grid-cols-2 gap-2'>
            <div className='flex flex-col'>
              <label htmlFor="name">Name:</label>
              <input type="text" defaultValue={name} className='outline-none bg-gray-200 rounded-md h-10 p-2' onChange={(e)=>{setItemInfo({...itemInfo,name:e.target.value})}}/>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="location">Quantity:</label>
              <input type="text" defaultValue={quantity}className='outline-none bg-gray-200 rounded-md h-10 p-2' onChange={(e)=>{setItemInfo({...itemInfo,quantity: parseInt(e.target.value)})}}/>
            </div>
            <div className='flex flex-col col-span-2'>
              <label htmlFor="location">Description:</label>
              <textarea name="" id="" defaultValue={description} className='outline-none bg-gray-200 rounded-md h-36 p-2' onChange={(e)=>{setItemInfo({...itemInfo,description:e.target.value})}}></textarea>
            </div>
            {dataUri?
              <div className='relative h-32 col-span-2 rounded-md cursor-pointer' onClick={cameraToggle}>
                <Image src={dataUri} alt={"krate image"} fill={true} className='object-contain'/>
              </div>
            :
              <div className="bg-gray-300 rounded-md h-32 flex flex-col justify-center items-center col-span-2 cursor-pointer" onClick={cameraToggle}>
                <FaCamera size={30} className='text-white'/>
              </div>
            }
            
          </div>
          <div className='flex flex-col justify-end items-center pt-5'>
            {id?
            <button className='bg-sec rounded-md text-white w-40 h-10' onClick={saveItem}>save</button>
            :
            <button className='bg-sec rounded-md text-white w-40 h-10' onClick={addItem}>add</button>
            }
            
          </div>
          
        </div>
      </div>
    </div>
  </>
}

export default ItemModal;