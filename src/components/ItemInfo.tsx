import { useRouter } from "next/navigation";
import { IoIosAddCircle } from "react-icons/io";
import { IoChevronBack } from "react-icons/io5";

type Props = {

} & Partial<itemType>

const ItemInfo = ({name, description, quantity}: Props) => {
  const router = useRouter();
  return (
    <div className="p-2">
      <div className="flex justify-between">
        <IoChevronBack
          size={32}
          onClick={() => {
            router.back();
          }}
        />
      </div>
      <div className="flex pt-4">
        <div className="flex flex-col grow overflow-clip">
          <div className="text-4xl text-sec font-semibold">{name}</div>
          <div className="font-semibold">{quantity}</div>
          <div>{description}</div>
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          
        </div>
      </div>
      <div>
        <IoIosAddCircle
          size={40}
          className="text-sec cursor-pointer"
          
        />
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default ItemInfo