import React, { useRef, useState } from 'react'
import { IoIosClose } from 'react-icons/io';
import { useReactToPrint } from 'react-to-print';
import QRCode from "react-qr-code";
type Props = {
  name: string | undefined;
  id: string | undefined;
  togglePrint: ()=>void;
}

const PrintModal = ({togglePrint,name,id}:Props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [qrCodeSize, setQrCodeSize] = useState(100)
  return (
    <div className="fixed top-0 left-0 z-40 bg-white h-dvh w-dvw p-4">
        
        
        <div className="flex flex-col w-full pb-10">
          <div className="flex justify-end pb-10">
            <IoIosClose size={42} onClick={togglePrint}/>
          </div>
          <div className="text-center align-middle">
            <label htmlFor="">size: </label>
            <input type="range" min={40} max={600} defaultValue={qrCodeSize} onChange={(e)=>setQrCodeSize(parseInt(e.target.value))}/>
            
          </div>
          <button onClick={()=>{reactToPrintFn();}} className="bg-prim rounded-md text-white px-3 py-2">
              print
          </button>
          
        </div>
        
        <div className="text-center w-fit border-2 border-black m-2" ref={contentRef} style={{padding: qrCodeSize/10+"px"}}>
          {id&&<QRCode value={id} size={qrCodeSize} />}
          <span className="font-bold" style={{fontSize: qrCodeSize/4+"px"}}>{name}</span>
        </div>
        
      </div>
  )
}

export default PrintModal