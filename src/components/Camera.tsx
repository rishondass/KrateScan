import {useRef} from 'react'
import {Camera as CameraPro, CameraType} from "react-camera-pro";
import { FaCircle } from "react-icons/fa";
import { IoChevronBackCircleSharp } from "react-icons/io5";

type Props = {
  toggle : ()=> void;
  setImage : (image:string | ImageData | undefined)=>void;
}

const Camera = ({toggle, setImage}:Props) => {
  const camera = useRef<CameraType | null>(null);
  


  function handleTakePhotoAnimationDone () {
    const photo = camera.current?.takePhoto();
    setImage(photo);
    toggle();
  }
  return <div>
    <IoChevronBackCircleSharp size={40} color={"#fff"} className='absolute top-4 left-4 z-50' onClick={toggle}/>
    <FaCircle size={50} color={"#fff"} onClick={handleTakePhotoAnimationDone} className='absolute bottom-6 right-[calc(50% - 25px)] z-50'/>
    <CameraPro ref={camera} facingMode={"environment"} aspectRatio={window.innerWidth/window.innerHeight} errorMessages={{
      noCameraAccessible: 'No camera device accessible. Please connect your camera or try a different browser.',
      permissionDenied: 'Permission denied. Please refresh and give camera permission.',
      switchCamera:
      'It is not possible to switch camera to different one because there is only one video device accessible.',
      canvas: 'Canvas is not supported.'
    }}/>
  
  
  </div>
}

export default Camera