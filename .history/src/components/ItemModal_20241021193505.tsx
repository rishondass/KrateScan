import React from 'react'
import { IoIosClose } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import Camera, { FACING_MODES} from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import {useState} from "react";
import Image from "next/image";
import { useUser } from '@/lib/globalStates';
import { v4 as uuid } from 'uuid';
type Props = {
  id?: string;
  name?: string;
  description?: string;
  location?: string;
  image?: string;
  krateID?:string,

  toggle: ()=>void;
}

const AddItem = ({krateID, id,name, description, location, image, toggle}:Props) => {
  const [dataUri, setDataUri] = useState("")
  const [toggleCamera, setToggleCamera] = useState(false);
  const [itemInfo, setItemInfo] = useState<itemType>({name:,description:"",location:"",image:"",id: uuid(),krateID: krateID || ""});

  const cameraToggle = ()=>{
    setToggleCamera(!toggleCamera);
  }

  function handleTakePhotoAnimationDone (dataUri:string) {
    console.log('takePhoto', dataUri);
    setDataUri(dataUri);
    cameraToggle();
  }

  async function addItem(){
    const save = await fetch('/api/v1/krate/items/'+krateID,{
      method: "POST",
      body: JSON.stringify(itemInfo),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if(save.status === 200){
      toggle();
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
            <IoIosClose size={42} onClick={toggle}/>
          </div>
          
          <div className='text-3xl font-bold text-center text-sec'>
            Item
          </div>

          <div className='grid grid-cols-2 gap-2'>
            <div className='flex flex-col'>
              <label htmlFor="name">Name:</label>
              <input type="text" className='outline-none bg-gray-200 rounded-md h-10 p-2' onChange={(e)=>{setItemInfo({...itemInfo,name:e.target.value})}}/>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="location">Location:</label>
              <input type="text" className='outline-none bg-gray-200 rounded-md h-10 p-2' onChange={(e)=>{setItemInfo({...itemInfo,location:e.target.value})}}/>
            </div>
            <div className='flex flex-col col-span-2'>
              <label htmlFor="location">Description:</label>
              <textarea name="" id="" className='outline-none bg-gray-200 rounded-md h-36 p-2' onChange={(e)=>{setItemInfo({...itemInfo,description:e.target.value})}}></textarea>
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

export default AddItem;