import {useEffect, useRef} from 'react'
import { FaCircle } from "react-icons/fa";
import { IoChevronBackCircleSharp } from "react-icons/io5";

type Props = {
  toggle : ()=> void;
  setImage : (image:string | ImageData | undefined)=>void;
}

const Camera = ({toggle, setImage}:Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  

  

  useEffect(()=>{
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {
          aspectRatio: 1,

          facingMode: {ideal: "environment"}
        }, audio: false,  });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startWebcam();

    return () => {
      console.log('unmount');
      stopWebcam();
    };
  },[])

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      console.log(stream.getTracks());
      // Stop all media tracks immediately
      stream.getTracks().forEach((track) => {
        stream.removeTrack(track);
        track.stop();
        console.log(`Track stopped: ${track.kind}`);
      });

      console.log(stream.getTracks());

      // Clear the video source
      videoRef.current.srcObject = null;
    }
  };

  const handleClose = () => {
    stopWebcam(); // Stop the webcam when modal is closed
    toggle(); // Call the toggle function to close the modal
  };
  

  const takePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        //videoRef.current.videoHeight
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        const imageData = canvasRef.current.toDataURL("image/png");
        setImage(imageData); // Save the photo
        handleClose();
      }
    }
  };
  
  return <>
    <IoChevronBackCircleSharp size={56} color={"#fff"} className='fixed top-5 left-4' onClick={handleClose}/>
    <div className='bg-black h-screen w-screen flex flex-col justify-center items-center gap-4'>
    
    <div>
        <video ref={videoRef} autoPlay muted controls={false} disablePictureInPicture disableRemotePlayback x-webkit-airplay="deny" playsInline></video>
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
    <div className=''>
      <FaCircle size={56} color={"#fff"} onClick={takePhoto} className=''/>
    </div>
    
    
  
  
  
    </div>

  
  </>
  
}

export default Camera