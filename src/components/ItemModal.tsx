import React from "react";
import { IoIosClose } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";
import Camera from "@/components/Camera";
import { v4 as uuid } from "uuid";
import { useItems } from "@/lib/globalStates";
type Props = {
  id?: string;
  name?: string;
  description?: string;
  quantity?: number;
  image?: string;
  krateID: string;
  handleEdit?: (
    id: string,
    name: string,
    quantity: number,
    description: string,
    image: string,
    krateID: string
  ) => void;
  toggle?: () => void;
};

const ItemModal = ({
  krateID,
  id,
  name,
  description,
  quantity,
  image,
  toggle,
  handleEdit,
}: Props) => {
  const items = useItems((state) => state.items);
  const setItems = useItems((state) => state.setItems);
  const [imageUri, setImageUri] = useState<string | ImageData | undefined>();
  const [toggleCamera, setToggleCamera] = useState(false);
  const [itemInfo, setItemInfo] = useState<itemType>({
    name: name || "",
    description: description || "",
    quantity: quantity || 1,
    image: image || uuid() + ".png",
    id: id || uuid(),
    krateID: krateID || "",
  });

  const cameraToggle = () => {
    setToggleCamera(!toggleCamera);
  };

  const setImageProp = (imageData: string | ImageData | undefined) => {
    setImageUri(imageData);
  };
  //TODO: add api changes for images
  async function addItem() {
    const add = await fetch("/api/v1/krate/items/" + krateID, {
      method: "POST",
      body: JSON.stringify({ ...itemInfo, imageUri: imageUri }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (add.status === 200) {
      const temp = [...items];
      if (imageUri) {
        temp.push({ ...itemInfo });
      } else {
        temp.push({ ...itemInfo, image: "" });
      }
      setItems(temp);
      toggle?.();
    }
  }

  async function saveItem() {
    const newImageURL = uuid() + ".png";
    const save = await fetch("/api/v1/item/" + id, {
      method: "PUT",
      body: JSON.stringify({
        ...itemInfo,
        newImage: newImageURL,
        imageUri: imageUri,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (save.status === 200) {
      const index = items.findIndex((item) => item.id === id);
      const temp = [...items];
      if (imageUri) {
        temp[index] = { ...itemInfo, image: newImageURL };
      } else {
        temp[index] = itemInfo;
      }
      setItems(temp);
      handleEdit?.("", "", -1, "", "", "");
    }
  }

  return (
    <>
      {toggleCamera && (
        <div className="z-30 absolute left-0 top-0 h-dvh w-dvw">
          <Camera toggle={cameraToggle} setImage={setImageProp} />
        </div>
      )}

      <div className="z-20 fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="bg-white rounded-md w-11/12 h-[90%] p-4 sm:w-10/12 md:w-8/12 lg:w-6/12 sm:h-4/5 md:h-3/4 lg:h-2/3 overflow-auto">
          <div className="flex justify-end">
            {handleEdit ? (
              <IoIosClose
                size={42}
                onClick={() => handleEdit("", "", -1, "", "", "")}
              />
            ) : (
              <IoIosClose size={42} onClick={toggle} />
            )}
          </div>

          <div className="text-3xl font-bold text-center text-sec">Item</div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                defaultValue={name}
                className="outline-none bg-gray-200 rounded-md h-10 p-2"
                onChange={(e) =>
                  setItemInfo({ ...itemInfo, name: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="text"
                defaultValue={quantity}
                className="outline-none bg-gray-200 rounded-md h-10 p-2"
                onChange={(e) =>
                  setItemInfo({
                    ...itemInfo,
                    quantity: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div className="flex flex-col col-span-1 sm:col-span-2">
              <label htmlFor="description">Description:</label>
              <textarea
                defaultValue={description}
                className="outline-none bg-gray-200 rounded-md p-2 h-24 sm:h-32"
                onChange={(e) =>
                  setItemInfo({ ...itemInfo, description: e.target.value })
                }
              />
            </div>
            {imageUri ? (
              <div
                className="relative h-32 col-span-1 sm:col-span-2 rounded-md cursor-pointer"
                onClick={cameraToggle}
              >
                <Image
                  src={imageUri as string}
                  alt="krate image"
                  fill={true}
                  className="object-contain"
                />
              </div>
            ) : (
              <div
                className="bg-gray-300 rounded-md h-32 flex flex-col justify-center items-center col-span-1 sm:col-span-2 cursor-pointer"
                onClick={cameraToggle}
              >
                <FaCamera size={30} className="text-white" />
              </div>
            )}
          </div>

          <div className="flex justify-center items-center pt-5">
            {id ? (
              <button
                className="bg-sec rounded-md text-white w-40 h-10"
                onClick={saveItem}
              >
                Save
              </button>
            ) : (
              <button
                className="bg-sec rounded-md text-white w-40 h-10"
                onClick={addItem}
              >
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemModal;
