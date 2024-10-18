import React from 'react'
import { IoIosClose } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import Camera, { FACING_MODES} from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import {useState} from "react";
import Image from "next/image";
import { useUser, useKrates } from '@/lib/globalStates';
import { v4 as uuid } from 'uuid';
import { useSession } from 'next-auth/react';

type Props = {
  toggle?: ()=>void;
  id?:string;
  description?:string;
  image?:string;
  location?:string;
  name?:string;
  handleEdit?: (id: string, name: string, location: string, description: string, image: string)=>void;
}

const AddKrate = ({toggle, id, description, image,location,name,handleEdit}:Props) => {
  const [krates, setKrates] = useKrates((state)=>[state.krates, state.setKrates]);
  const {data:session} = useSession();
  const user = session?.user;
  const setUser = useUser(state=>state.setUser);
  const [dataUri, setDataUri] = useState("")
  const [toggleCamera, setToggleCamera] = useState(false);
  const [krateInfo, setKrateInfo] = useState<krateType>({name:name||"",description:description||"",location:location||"",image:image||"",id: id||uuid(), items: [], userID: user?.id || "-1"});

  const cameraToggle = ()=>{
    setToggleCamera(!toggleCamera);
  }

  function handleTakePhotoAnimationDone (dataUri:string) {
    console.log('takePhoto', dataUri);
    setDataUri(dataUri);
    cameraToggle();
  }

  async function saveKrate(){
    
    const save = await fetch('/api/v1/krate',{
      method: "POST",
      body: JSON.stringify(krateInfo),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if(save.status === 200){
      
      toggle?.();
    }
  }

  async function editSaveKrate(){
    const save = await fetch('/api/v1/krate/'+id,{
      method: "POST",
      body: JSON.stringify(krateInfo),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if(save.status === 200){
      handleEdit?.("","","","","");
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
            {handleEdit?<IoIosClose size={42} onClick={()=>{handleEdit("","","","","")}}/>:<IoIosClose size={42} onClick={toggle}/>}
          </div>
          
          <div className='text-3xl font-bold text-center text-sec'>
            Krate
          </div>

          <div className='grid grid-cols-2 gap-2'>
            <div className='flex flex-col'>
              <label htmlFor="name">Name:</label>
              <input type="text" className='outline-none bg-gray-200 rounded-md h-10 p-2' defaultValue={krateInfo.name} onChange={(e)=>{setKrateInfo({...krateInfo,name:e.target.value})}}/>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="location">Location:</label>
              <input type="text" className='outline-none bg-gray-200 rounded-md h-10 p-2' defaultValue={krateInfo.location} onChange={(e)=>{setKrateInfo({...krateInfo,location:e.target.value})}}/>
            </div>
            <div className='flex flex-col col-span-2'>
              <label htmlFor="location">Description:</label>
              <textarea name="" id="" className='outline-none bg-gray-200 rounded-md h-36 p-2' defaultValue={krateInfo.description} onChange={(e)=>{setKrateInfo({...krateInfo,description:e.target.value})}}></textarea>
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
          <div className='flex flex-col justify-end items-center pt-5 h-'>
            {id?<button className='bg-sec rounded-md text-white w-40 h-10' onClick={editSaveKrate}>save</button>:<button className='bg-sec rounded-md text-white w-40 h-10' onClick={saveKrate}>save</button>}
          </div>
          
        </div>
      </div>
    </div>
  </>
}

export default AddKrate