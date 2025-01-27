import clsx from 'clsx';
import React, { useState } from 'react'
import { useSwipeable } from 'react-swipeable';
import { MdEdit } from "react-icons/md";
import { FaTrash } from 'react-icons/fa';
import { useItems } from '@/lib/globalStates';
import Image from "next/image";
import krateImage from "@/assets/krate.svg"
import { BsThreeDotsVertical } from 'react-icons/bs';
import ItemContextMenu from './ItemContextMenu';
type Props = itemType & {
  handleEdit: (id: string, name: string, quantity: number, description: string, image:string, krateID: string)=>void;
}


//TODO:items update on display when edited



const ItemCard = ({id,krateID, name, quantity, description,image,handleEdit}:Props) => {
  const items = useItems(state=>state.items);
  const setItems = useItems(state=>state.setItems);
  const [toggleTransition, setToggleTransition] = useState(false);
  const [toggleContext, setToggleContext] = useState(false);


  const handlers = useSwipeable({
    onSwipedLeft : () => {
      setToggleTransition(true);
    },
    onSwipedRight: () => {
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
      body: JSON.stringify({id:id, krateID: krateID, image: image}),
    });
    if(res.status === 200){
      const temp = items.filter(item=> item.id !== id);
      setItems(temp);
      console.log("Deleted Successfully");
    }
  }




  return (
    <div {...handlers} key={id} className={clsx("min-h-32 bg-[#F1F1F1] rounded-md p-1 w-full flex gap-2 transition relative overflow-hidden cursor-pointer")} >
        {toggleContext &&<ItemContextMenu toggle={()=>{setToggleContext(!toggleContext)}}/>}
        <BsThreeDotsVertical className='absolute right-1 top-2' onClick={()=>{setToggleContext(!toggleContext)}}/>
          <div className={clsx("absolute right-0 top-0 bg-prim h-full rounded-md w-1/2 transition ease-in-out flex",toggleTransition?"translate-x-0":"translate-x-full")}>
            <div className='bg-blue-600 h-full flex justify-center items-center grow rounded-l-md' onClick={(e)=>{e.stopPropagation();handleEdit(id,name,quantity,description,image,krateID);setToggleTransition(false)}}>
              <MdEdit size={40} className='text-white'/>
            </div>
            <div className='bg-rose-600 h-full flex justify-center items-center grow'>
              <FaTrash size={32} className='text-white' onClick={deleteItem}/>
            </div>
          </div>
          <div className="min-w-[50%] relative">
            {image?<Image src={"/api/v1/krate/images/"+ krateID +"/" + image} alt={"krate-image"} fill={true} className='object-cover'/>:
            <Image src={krateImage} alt='krate image' fill={true} className='object-cover rounded-md'/>
            }
          </div>
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