import {useState} from 'react'
import { FaArrowCircleRight } from 'react-icons/fa'
import ItemMoveModal from './ItemMoveModal';

type Props = {
  toggle: () => void;
}

const ItemContextMenu = ({toggle}:Props) => {
  const [modal, setModal] = useState(false);
  return <>
    {modal&&<ItemMoveModal toggle={toggle}/>}
    <div className='absolute z-10 bg-white top-1 right-5 w-[30%] h-[90%] flex flex-col justify-start items-start rounded-md'>
      <div className="w-full flex items-center p-1 gap-1 cursor-pointer hover:bg-gray-100"
      onClick={()=>{setModal(!modal)}}
      >
        <FaArrowCircleRight size={16}/>
        <div className=''>move</div>
      </div>
    </div>
  </>
}

export default ItemContextMenu