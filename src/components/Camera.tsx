import {useRef, useCallback} from 'react'
import Webcam from "react-webcam";
import { FaCircle } from "react-icons/fa";
import { IoChevronBackCircleSharp } from "react-icons/io5";

type Props = {
  toggle : ()=> void;
  setImage : (image:string | ImageData | undefined)=>void;
}

const Camera = ({toggle, setImage}:Props) => {
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    console.log(imageSrc);
    setImage(imageSrc as string);
    toggle();
    
  },[webcamRef]);
  

  
  return <div>
    <IoChevronBackCircleSharp size={56} color={"#fff"} className='absolute top-4 left-4 z-50 shadow-sm' onClick={toggle}/>
    <FaCircle size={56} color={"#fff"} onClick={capture} className='absolute bottom-6 right-[calc(50%-28px)] z-50 shadow-sm'/>
    <Webcam
        className="h-dvh w-dvw object-cover"
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/png"
        width={window.innerWidth}
        height={window.innerHeight}
        videoConstraints={{width: window.innerWidth,
        height: window.innerHeight,facingMode: "environment"}}
    />
  
  
  
  </div>
}

export default Camera