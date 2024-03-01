import React from "react";

export default function StoresContent({
  category,
  categories,
  setCategory,
  setCategories,
  stores,
  setShowCreateStore,
  handleNavigate,
}) {
  const Actions = () => {
    return (
      <div className="w-full flex flex-col md:flex-row gap-2 lg:gap-4">
        <div className="relative flex w-full">
          <input
            type="text"
            placeholder="Search"
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                setCategory(e.target.value);
              }
            }}
            className="w-full py-2 pl-10 pr-4 rounded-lg focus:outline-none bg-color1 bg-opacity-5 placeholder:text-color1"
          />
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <img src="/icons/search.svg" width={30} height={30} alt="" />
          </span>
        </div>
        <select
          className="w-full text-color1 bg-color1 bg-opacity-5 rounded-lg px-4 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">all</option>
          {categories.map((c) => {
            return (
              <option key={c} value={c}>
                {c}
              </option>
            );
          })}
        </select>
        <div className="w-full flex gap-2 justify-center items-center">
          <button
            className="px-4 w-full h-full border border-color1 hover:bg-color1 hover:text-white border-dashed rounded-lg font-semibold"
            onClick={() => setShowCreateStore(true)}
          >
            New
          </button>
          <button
            className="px-4 w-full h-full border border-color1 hover:bg-color1 hover:text-white border-dashed rounded-lg font-semibold"
            onClick={() => setShowCreateStore(true)}
          >
            mystores
          </button>
        </div>
      </div>
    );
  };

  const Store = ({ name, image, desc, _id }) => {
    return (
      <div
        className="w-full h-[375px] bg-white rounded-lg text-color1 border border-color1 hover:bg-color1 hover:text-white cursor-pointer p-1 drop-shadow-md"
        onClick={() => {
          handleNavigate(`/store/${_id}`);
        }}
      >
        <div
          className="h-3/4 rounded-md"
          style={{
            backgroundImage: `url('${image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="h-1/4 custom-scrollbar">
          <h1 className="text-2xl font-semibold pb-1">{name}</h1>
          <p>{desc}</p>
        </div>
      </div>
    );
  };

  return (
    <section className="w-full">
      <Actions />
      <ul className="py-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
        {stores.map((store) => {
          if (!categories.includes(store.category))
            categories.push(store.category);
          if (store.category === category || category === "all") {
            return (
              <li key={store._id}>
                <Store {...store} />
              </li>
            );
          }
        })}
      </ul>
    </section>
  );
}
