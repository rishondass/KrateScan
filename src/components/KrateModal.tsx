import React from "react";
import { IoIosClose } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import { useState} from "react";
import { v4 as uuid } from "uuid";
import Image from "next/image";
import { useKrates } from "@/lib/globalStates";
import { useSession } from "next-auth/react";
import Camera from "@/components/Camera";

type Props = {
  toggle?: () => void;
  id?: string;
  description?: string;
  image?: string;
  location?: string;
  name?: string;
  handleEdit?: (
    id: string,
    name: string,
    location: string,
    description: string,
    image: string
  ) => void;
};

const AddKrate = ({
  toggle,
  id,
  description,
  image,
  location,
  name,
  handleEdit,
}: Props) => {
  const krates = useKrates((state) => state.krates);
  const setKrates = useKrates((state) => state.setKrates);
  const { data: session } = useSession();
  const user = session?.user;
  const [imageUri, setImageUri] = useState<string | ImageData | undefined>();
  const [toggleCamera, setToggleCamera] = useState(false);
  const [krateInfo, setKrateInfo] = useState<krateType>({
    name: name || "",
    description: description || "",
    location: location || "",
    image: image || uuid() + ".png",
    id: id || uuid(),
    userID: user?.id || "-1",
  });

  // useEffect(() => {
  //   console.log(image);
  //   console.log(krateInfo);
  // }, [krateInfo]);

  const cameraToggle = () => {
    console.log("toggle camera");
    setToggleCamera(!toggleCamera);
  };

  const setImageProp = (imageData: string | ImageData | undefined) => {
    setImageUri(imageData);
  };

  async function addKrate() {
    const save = await fetch("/api/v1/krate", {
      method: "POST",
      body: JSON.stringify({ ...krateInfo, imageUri: imageUri }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (save.status === 200) {
      const temp = [...krates];
      if (imageUri) {
        temp.push({ ...krateInfo });
      } else {
        temp.push({ ...krateInfo, image: "" });
      }

      setKrates(temp);
      toggle?.();
    }
  }

  async function editSaveKrate() {
    const newImageURL = uuid() + ".png";
    const save = await fetch("/api/v1/krate/" + id, {
      method: "POST",
      body: JSON.stringify({
        ...krateInfo,
        newImage: newImageURL,
        imageUri: imageUri,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (save.status === 200) {
      const index = krates.findIndex((krate) => {
        return krate.id === id;
      });
      const temp = [...krates];
      if (imageUri) {
        temp[index] = { ...krateInfo, image: newImageURL };
      } else {
        temp[index] = krateInfo;
      }

      setKrates(temp);
      handleEdit?.("", "", "", "", "");
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
                onClick={() => handleEdit("", "", "", "", "")}
              />
            ) : (
              <IoIosClose size={42} onClick={toggle} />
            )}
          </div>

          <div className="text-3xl font-bold text-center text-sec">Krate</div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="outline-none bg-gray-200 rounded-md h-10 p-2"
                defaultValue={krateInfo.name}
                onChange={(e) =>
                  setKrateInfo({ ...krateInfo, name: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                className="outline-none bg-gray-200 rounded-md h-10 p-2"
                defaultValue={krateInfo.location}
                onChange={(e) =>
                  setKrateInfo({ ...krateInfo, location: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col col-span-1 sm:col-span-2">
              <label htmlFor="description">Description:</label>
              <textarea
                className="outline-none bg-gray-200 rounded-md p-2 h-24 sm:h-32"
                defaultValue={krateInfo.description}
                onChange={(e) =>
                  setKrateInfo({ ...krateInfo, description: e.target.value })
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
                onClick={editSaveKrate}
              >
                Save
              </button>
            ) : (
              <button
                className="bg-sec rounded-md text-white w-40 h-10"
                onClick={addKrate}
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

export default AddKrate;
