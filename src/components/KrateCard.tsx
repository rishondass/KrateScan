import clsx from 'clsx';
import React, {useState} from 'react'
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';
import { MdEdit } from "react-icons/md";
import { FaTrash } from 'react-icons/fa';
import { useKrates } from '@/lib/globalStates';
import Image from "next/image";
import krateImage from "@/assets/krate.svg"

type Props = krateType & {
  handleEdit: (id: string, name: string, location: string, description: string, image:string)=>void;
}


//TODO: Add Authorization checks for all api?

const KrateCard = ({id, name, location, description,image,handleEdit}:Props) => {
  const router = useRouter();
  const krates = useKrates(state=>state.krates);
  const setKrates = useKrates(state=>state.setKrates);
  const [toggleTransition, setToggleTransition] = useState(false);

  

  const handlers = useSwipeable({
    onSwipedLeft : () => {
      //console.log("User Swiped!", eventData);
      setToggleTransition(true);
    },
    onSwipedRight: () => {
      //console.log("User Swiped!", eventData);
      setToggleTransition(false);
    }
  });

  const deleteKrate = async(e:React.MouseEvent<SVGElement, MouseEvent>)=>{
    e.stopPropagation();
    const res = await fetch('/api/v1/krate/'+id,{
      method: "DELETE"
    });
    if(res.status === 200){
      const temp = krates.filter(krate=> krate.id !== id);
      setKrates(temp);
      console.log("Deleted Successfully");
    }
  }




  return (
    <div {...handlers} key={id} className={clsx("min-h-32 bg-[#F1F1F1] rounded-md p-1 w-full flex gap-2 transition relative overflow-hidden")} onClick={()=>{router.push('/krates/'+id)}}>
          <div className={clsx("absolute right-0 top-0 bg-prim h-full rounded-md w-1/2 transition ease-in-out flex",toggleTransition?"translate-x-0":"translate-x-full")}>
            <div className='bg-blue-600 h-full flex justify-center items-center grow rounded-l-md' onClick={(e)=>{e.stopPropagation();handleEdit(id,name,location,description,image);setToggleTransition(false)}}>
              <MdEdit size={40} className='text-white'/>
            </div>
            <div className='bg-rose-600 h-full flex justify-center items-center grow'>
              <FaTrash size={32} className='text-white' onClick={deleteKrate}/>
            </div>
          </div>
          <div className="min-w-[50%] h-full relative">
            {image?<Image src={"/api/v1/krate/images/"+ id +"/" + image} alt={"krate-image"} fill={true} className='object-cover rounded-md'/>:
            <Image src={krateImage} alt='krate image' fill={true} className='object-cover rounded-md'/>
            }
          </div>
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