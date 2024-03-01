import React from "react";
import Image from "../components/Image";

export default function HomepageContent({ sample, handleNavigate }) {
  return (
    <section className="w-full">
      <div className="flex flex-col 1300:flex-row py-4 gap-4">
        <div className="w-full space-y-4 lg:space-y-8">
          <div className="flex flex-row lg:flex-col gap-2">
            <h1 className="text-4xl xm:text-6xl md:text-7xl xl:text-8xl font-semibold uppercase">
              what is vastmart?
            </h1>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex nisi
            cumque possimus amet perferendis, officia mollitia enim modi
            consequatur omnis dolorem facilis ab fuga inventore. Lorem ipsum
            dolor sit amet consectetur adipisicing eli
          </p>
          <div className="w-full flex justify-center lg:justify-start items-center">
            <button
              className="px-8 py-2 uppercase border border-color1 border-dashed hover:bg-color1 hover:text-white rounded-lg w-full lg:w-[250px]"
              onClick={() => handleNavigate("/stores/all")}
            >
              get started
            </button>
          </div>
        </div>
        <Image
          image="/images/night-market.jpg"
          style="w-full h-[300px] md:h-[500px] rounded-lg"
        />
      </div>
      <div className="py-4">
        <div className="w-full py-4">
          <h1 className="text-4xl uppercase font-bold">
            home for all types of products
          </h1>
          <h1
            className="underline py-4 hover:text-color3 cursor-pointer"
            onClick={() => handleNavigate("/stores/create-store")}
          >
            want to sell a product?
          </h1>
        </div>
        <div className="w-full space-y-4">
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4 lg:gap-8 w-full">
            {sample.map((ts) => {
              return (
                <li key={ts.title}>
                  <div
                    className="rounded-lg p-4 flex gap-4 border border-color1 border-dashed transition-all duration-100 hover:bg-color1 hover:text-color4 cursor-pointer"
                    onClick={() => handleNavigate(`/stores/${ts.title}`)}
                  >
                    <div className="flex justify-center items-center p-2">
                      <img src={ts.icon} width={45} height={45} alt="" />
                    </div>
                    <div>
                      <h1 className="uppercase">{ts.title}</h1>
                      <p className="border-t-2 border-color1">
                        {`over ${ts.stores} stores`}
                      </p>
                      <p className="">{`with a total ${ts.products} products`}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="w-full flex justify-center items-center">
            <button
              className="uppercase underline"
              onClick={() => handleNavigate("/stores/all")}
            >
              and more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
