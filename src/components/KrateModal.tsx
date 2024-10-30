import React from 'react'
import { IoIosClose } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import {useState, useEffect} from "react";
import {v4 as uuid} from "uuid";
import Image from "next/image";
import {useKrates } from '@/lib/globalStates';
import { useSession } from 'next-auth/react';
import Camera from "@/components/Camera";

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
  const krates = useKrates((state)=>state.krates);
  const setKrates = useKrates(state=>state.setKrates)
  const {data:session} = useSession();
  const user = session?.user;
  const [imageUri, setImageUri] = useState<string | ImageData | undefined>();
  const [toggleCamera, setToggleCamera] = useState(false);;
  const [krateInfo, setKrateInfo] = useState<krateType>({name:name||"",description:description||"",location:location||"",image:image||(uuid()+".png"),id: id||uuid(), userID: user?.id || "-1"});


  // useEffect(()=>{
  //   console.log(imageUri);
  // },[imageUri])



  const cameraToggle = ()=>{
    console.log('toggle camera');
    setToggleCamera(!toggleCamera);
  }
  
  const setImageProp = (imageData:string | ImageData | undefined)=>{
    setImageUri(imageData);
  }

  

  

  async function addKrate(){
    
    const save = await fetch('/api/v1/krate',{
      method: "POST",
      body: JSON.stringify({...krateInfo, imageUri: imageUri}),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if(save.status === 200){
      const temp = [...krates];
      if(imageUri){
        temp.push({...krateInfo});
      }else{
        temp.push({...krateInfo, image: ""});
      }
      
      setKrates(temp);
      toggle?.();
    }
  }

  async function editSaveKrate(){
    const newImageURL = uuid()+ ".png";
    const save = await fetch('/api/v1/krate/'+id,{
      method: "POST",
      body: JSON.stringify({...krateInfo, newImage: newImageURL, imageUri: imageUri}),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if(save.status === 200){
      const index = krates.findIndex(krate=>{return krate.id === id});
      const temp = [...krates];
      if(imageUri){
        temp[index] = {...krateInfo, image: newImageURL};
      }else{
        temp[index] = krateInfo;
      }
      
      
      setKrates(temp);
      handleEdit?.("","","","","");
    }
  }

  return <>
    
      
    {toggleCamera&&
      <div className='z-20 absolute left-0 top-0 h-screen w-screen'>
        <Camera toggle={cameraToggle} setImage={setImageProp}/>
      </div>
    }
    
    <div className='z-10 absolute left-0 top-0 bg-black/60 w-full h-full' onClick={()=>{console.log('click background')}}>
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
            {imageUri?
              <div className='relative h-32 col-span-2 rounded-md cursor-pointer' onClick={cameraToggle}>
                <Image src={imageUri as string} alt={"krate image"} fill={true} className='object-contain'/>
              </div>
            :
              <div className="bg-gray-300 rounded-md h-32 flex flex-col justify-center items-center col-span-2 cursor-pointer" onClick={cameraToggle}>
                <FaCamera size={30} className='text-white'/>
              </div>
            }
            
          </div>
          <div className='flex flex-col justify-end items-center pt-5 h-'>
            {id?<button className='bg-sec rounded-md text-white w-40 h-10' onClick={editSaveKrate}>save</button>:<button className='bg-sec rounded-md text-white w-40 h-10' onClick={addKrate}>add</button>}
          </div>
          
        </div>
      </div>
    </div>
  </>
}

export default AddKrate