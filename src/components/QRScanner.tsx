"use client";
import {Scanner} from "@yudiel/react-qr-scanner"
import { IoIosClose } from 'react-icons/io';
import {useRouter} from 'next/navigation';
type Props = {
  toggleScanner: () => void;
}
const QRScanner = ({toggleScanner}:Props) => {
  const router = useRouter();
  //TODO: Scanner doesn't work after closing modal
  return (
    <div className="z-20 absolute left-0 top-0 w-full h-full bg-white">
      <div className='flex justify-end'>
        <IoIosClose size={52} onClick={toggleScanner} className=''/>
      </div>
      <div>
        
        <Scanner  onScan={(result) => {router.push("/krates/"+result[0].rawValue)}} />
      </div>
      
    </div>
  )
}

export default QRScanner;