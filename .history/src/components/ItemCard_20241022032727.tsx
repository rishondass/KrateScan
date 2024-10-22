import clsx from 'clsx';
import React, { useState } from 'react'
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';
import { MdEdit } from "react-icons/md";
import { FaTrash } from 'react-icons/fa';
import { useKrates } from '@/lib/globalStates';

type Props = itemType & {
  handleEdit: (id: string, name: string, quantity: number, description: string, image:string)=>void;
}




const ItemCard = ({id, name, quantity, description,image,handleEdit}:Props) => {
  const router = useRouter();
  const items = useKrates(state=>state.krates);
  const setKrates = useKrates(state=>state.setKrates);
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

  const deleteItem = async(e:React.MouseEvent<SVGElement, MouseEvent>)=>{
    e.stopPropagation();
    const res = await fetch('/api/v1/item/'+id,{
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id:id}),
    });
    console.log(res.status)
    if(res.status === 200){
      const temp = krates.filter(krate=> krate.id !== id);
      setKrates(temp);
      console.log("Deleted Successfully");
    }
  }




  return (
    <div {...handlers} key={id} className={clsx("min-h-32 bg-gray-300 rounded-md p-1 w-full flex gap-2 transition relative overflow-hidden")} onClick={()=>{router.push('/krates/'+id)}}>
          <div className={clsx("absolute right-0 top-0 bg-prim h-full rounded-md w-1/2 transition ease-in-out translate-x-full flex",toggleTransition?"-translate-x-0":"")}>
            <div className='bg-blue-600 h-full flex justify-center items-center grow rounded-l-md' onClick={(e)=>{e.stopPropagation();handleEdit(id,name,quantity,description,image);}}>
              <MdEdit size={40} className='text-white'/>
            </div>
            <div className='bg-rose-600 h-full flex justify-center items-center grow'>
              <FaTrash size={32} className='text-white' onClick={deleteItem}/>
            </div>
          </div>
          <div className="bg-gray-600 min-w-[50%]">Images</div>
          <div className="h-full flex flex-col box-border overflow-hidden">
            <div className="font-bold text-xl">{name}</div>
            <div className="font-light text-sm">{quantity}</div>
            <div className="grow text-sm box-border">
            {description}
            </div>
          </div>
        </div>
  )
}

export default ItemCard;