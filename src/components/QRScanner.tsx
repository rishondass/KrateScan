"use client";

import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import {useRouter} from 'next/navigation';
import { IoMdCloseCircle } from "react-icons/io";
type Props = {
  toggleScanner: () => void;
}
const QRScanner = ({toggleScanner}:Props) => {
      // QR States
      const router = useRouter();
      const scanner = useRef<QrScanner>();
      const videoEl = useRef<HTMLVideoElement>(null);
      const [qrOn, setQrOn] = useState<boolean>(true);
  
      // Success
      const onScanSuccess = (result: QrScanner.ScanResult) => {
          router.push("/krates/"+result.data);
      };
  
      // Fail
      const onScanFail = (err: string | Error) => {
          console.log(err);
      };
  
      useEffect(() => {
          if (videoEl?.current && !scanner.current) {
              // 👉 Instantiate the QR Scanner
              scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
                  onDecodeError: onScanFail,

                  preferredCamera: "environment",
                  highlightScanRegion: true,
                  calculateScanRegion(video) {
                    const width = video.videoWidth;
                    const height = video.videoHeight;
                
                    // Define the scan region (e.g., center of the video, 50% of width and height)
                    const regionWidth = width * 0.8;
                    const regionHeight = height * 0.5;
                
                    return {
                      x: (width - regionWidth) / 2, // Centered horizontally
                      y: (height - regionHeight) / 2, // Centered vertically
                      width: regionWidth,
                      height: regionHeight,
                    };
                  },
              });
  
              // 🚀 Start QR Scanner
              scanner?.current
                  ?.start()
                  .then(() => setQrOn(true))
                  .catch((err) => {
                      if (err) setQrOn(false);
                  });
          }
          return () => {
              if (!videoEl?.current) {
                  scanner?.current?.stop();
              }
          };
      }, []);
  
      
      useEffect(() => {
          if (!qrOn)
              alert(
                  "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
              );
      }, [qrOn]);
  
      return (
        <div className='absolute left-0 top-0 bg-black/60 z-20 h-screen w-screen'>
          <IoMdCloseCircle size={52} onClick={toggleScanner} className="text-white absolute right-5 top-5 z-20"/>
          <div className="relative h-screen w-screen">
              <video ref={videoEl} className="w-full h-full object-cover"></video>
          </div>
        </div>
          
      );
}

export default QRScanner;