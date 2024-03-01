import React, { useEffect, useState } from "react";
import Image from "../components/Image";

export default function MystoreContent({ store, setShowModal }) {
  const { image, name, _id, desc } = store;
  const [products, setProducts] = useState([]);
  useEffect(() => {
    //fetch products
  }, []);

  return (
    <section className="h-screen mb-4">
      <div className="flex flex-col xl:flex-row gap-4 h-full">
        <div className="w-full xl:w-1/4 space-y-2">
          <div className="border border-color1 border-dashed rounded-lg p-0 md:p-1">
            <Image
              image={`${image}`}
              style="w-full h-[150px] md:h-[200px] rounded-t-md"
            />
            <div className="custom-scrollbar h-[100px]">
              <h1 className="text-2xl font-semibold">{name}</h1>
              <h1>{desc}</h1>
            </div>
          </div>
          <button
            className="w-full border border-color1 border-dashed py-2 rounded-lg uppercase hover:bg-color1 hover:text-white"
            onClick={() => {
              setShowModal(true);
            }}
          >
            new product
          </button>
        </div>
        <div className="w-full xl:w-3/4 h-full bg-black">
          <ul></ul>
        </div>
      </div>
    </section>
  );
}
