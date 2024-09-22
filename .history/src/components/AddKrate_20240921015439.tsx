import React from 'react'
import { IoIosClose } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import Camera, { FACING_MODES} from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import {useState} from "react";
import Image from "next/image";
type Props = {
  toggle: ()=>void;
}

const AddKrate = ({toggle}:Props) => {
  const [dataUri, setDataUri] = useState("")
  const [toggleCamera, setToggleCamera] = useState(false);
  const [krateInfo, setKrateInfo] = useState<krate>({name:"",description:"",location:"",image:""});

  const cameraToggle = ()=>{
    setToggleCamera(!toggleCamera);
  }

  function handleTakePhotoAnimationDone (dataUri:string) {
    console.log('takePhoto', dataUri);
    setDataUri(dataUri);
    cameraToggle();
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
            Krate
          </div>

          <div className='grid grid-cols-2 gap-2'>
            <div className='flex flex-col'>
              <label htmlFor="name">Name:</label>
              <input type="text" className='outline-none bg-gray-200 rounded-md h-10 p-2'onChange={(e)=>{setKrateInfo({...krate})}}/>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="location">Location:</label>
              <input type="text" className='outline-none bg-gray-200 rounded-md h-10 p-2'/>
            </div>
            <div className='flex flex-col col-span-2'>
              <label htmlFor="location">Description:</label>
              <textarea name="" id="" className='outline-none bg-gray-200 rounded-md h-36 p-2'></textarea>
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
            <button className='bg-sec rounded-md text-white w-40 h-10'>save</button>
          </div>
          
        </div>
      </div>
    </div>
  </>
}

export default AddKrate