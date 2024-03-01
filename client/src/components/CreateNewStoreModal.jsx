import React, { useEffect, useRef, useState } from "react";
import Loader from "./Loader";

export default function CreateNewStoreModal({
  showModal,
  setShowModal,
  categories,
  handleCreateStore,
}) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("any");
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
          <div className="flex gap-2">
            <div className="relative flex items-center w-3/4">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <img src="/icons/add-icon.svg" width={30} height={30} alt="" />
              </span>
              <input
                type="text"
                placeholder="ADD NEW CATEGORY"
                value={category}
                onChange={(e) => setCategory(e.target.value.toLowerCase())}
                className="w-full p-2 pl-12 rounded-md focus:outline-none bg-color2 bg-opacity-10 focus:bg-opacity-5 text-color1"
              />
            </div>
            <select
              className="w-1/4 max-h-40 overflow-y-auto focus:outline-none border-b-2 border-color1"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="any">any</option>
              {categories.map((c) => {
                return (
                  <option key={c} value={c}>
                    {c}
                  </option>
                );
              })}
            </select>
          </div>
          <button
            className="bg-white border hover:bg-color2 hover:text-color3 uppercase transition-all duration-100 ease-in-out border-color1 border-dashed p-2 rounded-lg drop-shadow-md"
            onClick={() => {
              handleCreateStore({ name, desc, image, category }, setLoading);
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
