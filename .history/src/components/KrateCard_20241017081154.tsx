import clsx from 'clsx';
import React, { useState } from 'react'
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';
import { MdEdit } from "react-icons/md";
import { FaTrash } from 'react-icons/fa';


type Props = krateType & {
  handleEdit: (id: string, name: string, location: string, description: string, image:string)=>void;
}

const removeKrate = async(id:string)=>{
  if((await deleteKrate(id)).acknowledged){
    return true;
  }else{
    return false;
  }
}


const KrateCard = ({id, name, location, description,image,handleEdit}:Props) => {
  const router = useRouter();
  const [toggleTransition, setToggleTransition] = useState(false);
  const handlers = useSwipeable({
    onSwipedLeft : (eventData) => {
      console.log("User Swiped!", eventData);
      setToggleTransition(true);
    },
    onSwipedRight: (eventData) => {
      console.log("User Swiped!", eventData);
      setToggleTransition(false);
    }
  });




  return (
    <div {...handlers} key={id} className={clsx("min-h-32 bg-gray-300 rounded-md p-1 w-full flex gap-2 transition relative overflow-hidden")} onClick={()=>{router.push('/krates/'+id)}}>
          <div className={clsx("absolute right-0 top-0 bg-prim h-full rounded-md w-1/2 transition ease-in-out translate-x-full flex",toggleTransition?"translate-x-0":"")}>
            <div className='bg-blue-600 h-full flex justify-center items-center grow rounded-l-md' onClick={(e)=>{e.stopPropagation();handleEdit(id,name,location,description,image);}}>
              <MdEdit size={40} className='text-white'/>
            </div>
            <div className='bg-rose-600 h-full flex justify-center items-center grow'>
              <FaTrash size={32} className='text-white' onClick={async()=>{
                const res = await removeKrate(id);
                console.log(res);
              }}/>
            </div>
          </div>
          <div className="bg-gray-600 min-w-[50%] h-full">Images</div>
          <div className="h-full flex flex-col box-border overflow-hidden">
            <div className="font-bold text-xl">{name}</div>
            <div className="font-light text-sm">{location}</div>
            <div className="grow text-sm box-border">
            {description}
            </div>
          </div>
        </div>
  )
}

export default KrateCard