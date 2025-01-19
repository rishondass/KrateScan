import { useState } from 'react'
import ItemCard from './ItemCard';
import ItemModal from './ItemModal';
import { IoIosAddCircle } from 'react-icons/io';

type Props = {
  items: itemType[];
  krateID?: string;
  add: boolean;
}


const ItemsSection = ({items, krateID, add}:Props) => {
  const [toggleEditModal, setToggleEditModal] = useState<itemType | null>(null);
  const [toggleModal, setToggleModal] = useState(false);
  
  const handleEdit = (id: string, name: string, quantity: number, description: string, image: string, krateID: string)=>{
    if(id){
      setToggleEditModal({id, name, quantity, description, image, krateID});
    }else{
      setToggleEditModal(null);
    }
    
    
    
  } 

  const toggleModalFn = () => {
    setToggleModal(!toggleModal);
  };



  return (
    <div className='flex flex-col h-full overflow-y-auto'>
      {add&&<IoIosAddCircle
          size={40}
          className="text-sec cursor-pointer"
          onClick={toggleModalFn}
      />}
      {toggleEditModal && <ItemModal handleEdit={handleEdit} {...toggleEditModal}/>}
      {add&&toggleModal && <ItemModal krateID={krateID as string} toggle={toggleModalFn} />}
      <div className='flex flex-col gap-3 overflow-y-auto h-full'>
        {items?.map(item=>{
              return <ItemCard key={item.id} {...item} handleEdit={handleEdit}/>
            })}
      </div>
      
    </div>
  )
}

export default ItemsSection