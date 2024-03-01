import React, { useEffect, useRef, useState } from "react";
import Loader from "./Loader";

export default function CreateNewProductModal({
  showModal,
  setShowModal,
  handleCreateProduct,
}) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  const FileInput = ({ image, setImage }) => {
    const fileInputRef = useRef(null);

    const handleFileButtonClick = () => {
      fileInputRef.current.click();
    };
    return (
      <div className="flex gap-4 justify-center items-center">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <div
          className="flex w-full p-1 justify-start items-center border border-color1 border-dashed rounded-lg gap-4 cursor-pointer"
          onClick={handleFileButtonClick}
        >
          <img src="/icons/image-icon.svg" width={35} alt="" />
          <h1>{image ? "Change Image" : "Select Image"}</h1>
        </div>
        <div className="w-full">
          {image && <h1 className="truncate underline">{image.name}</h1>}
        </div>
      </div>
    );
  };

  if (showModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 p-4 z-50 flex flex-col justify-center items-center">
        <div className="w-full relative lg:w-1/4 flex flex-col gap-2 bg-white border border-color1 p-2 rounded-lg drop-shadow-lg">
          <input
            type="text"
            placeholder="STORE NAME"
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded-md focus:outline-none bg-color2 bg-opacity-10 focus:bg-opacity-5 text-color1"
          />
          <textarea
            rows={7}
            placeholder="STORE SHORT DESCRIPTION"
            onChange={(e) => setDesc(e.target.value)}
            className="w-full p-2 rounded-md focus:outline-none bg-color2 bg-opacity-10 focus:bg-opacity-5 text-color1"
          />
          <img
            src="/icons/close-btn.svg"
            className="absolute -right-3 -top-3"
            width={35}
            alt=""
            onClick={() => setShowModal(false)}
          />
          <FileInput image={image} setImage={setImage} />
          <button
            className="bg-white border hover:bg-color2 hover:text-color3 uppercase transition-all duration-100 ease-in-out border-color1 border-dashed p-2 rounded-lg drop-shadow-md"
            onClick={() => {
              handleCreateProduct({ name, desc, image }, setLoading);
            }}
          >
            Create
          </button>
          {loading && <Loader style="bg-black bg-opacity-15" />}
        </div>
      </div>
    );
  } else {
    return;
  }
}
