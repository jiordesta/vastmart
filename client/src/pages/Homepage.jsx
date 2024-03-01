import React, { useEffect, useState } from "react";
import Footer from "../sections/Footer";
import HomepageContent from "../sections/HomepageContent";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetch_user, signout } from "../redux/reducers/user_slice";
import Loader from "../components/Loader";

export default function Homepage() {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sample = [
    {
      icon: "/icons/fashion.svg",
      title: "fashion",
      stores: "100",
      products: "5999",
    },
    {
      icon: "/icons/gadgets.svg",
      title: "gadgets",
      stores: "1220",
      products: "55999",
    },
    {
      icon: "/icons/appliances.svg",
      title: "appliances",
      stores: "20",
      products: "59",
    },
    {
      icon: "/icons/beverages.svg",
      title: "beverages",
      stores: "10",
      products: "29",
    },
    {
      icon: "/icons/food.svg",
      title: "food",
      stores: "1770",
      products: "291233",
    },
    {
      icon: "/icons/fruits.svg",
      title: "fruits",
      stores: "170",
      products: "2233",
    },
  ];

  useEffect((s) => {
    setLoading(true);
    dispatch(fetch_user()).then((res) => {
      setLoading(false);
    });
  }, []);

  const handleNavigate = (to) => {
    if (!user) {
      navigate("/authentication");
    } else {
      navigate(to);
    }
  };

  const Burger = () => {
    return (
      <div className="block 1300:hidden">
        <div
          className="burger-menu"
          onClick={() => {
            const burger = document.querySelector(".burger-menu");
            const menu = document.querySelector(".nav-menu");
            burger.classList.toggle("active");
            if (menu.classList.contains("hidden")) {
              menu.classList.remove("hidden");
            } else {
              menu.classList.add("hidden");
            }
          }}
        >
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>
      </div>
    );
  };

  const Header = () => {
    return (
      <section className="w-full sticky bg-white top-0 z-40 border-b border-color1">
        <div className="py-4 md:py-8 flex justify-between items-center">
          <span className="flex justify-center items-center text-xl cursor-pointer">
            <img src="/icons/vastmart-logo.svg" width={40} height={40} alt="" />
            <h1 className="font-semibold text-2xl">VASTMART</h1>
          </span>
          <div className="hidden 1300:flex h-[40px] gap-4">
            <div className="relative flex">
              <input
                type="text"
                placeholder="Search"
                className="w-full py-2 pl-10 pr-4 rounded-lg focus:outline-none bg-color1 bg-opacity-5 placeholder:text-color1"
              />
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <img src="/icons/search.svg" width={30} height={30} alt="" />
              </span>
            </div>
            <span className="flex justify-center items-center text-xl cursor-pointer py-4">
              {user ? (
                <button
                  className="text-base"
                  onClick={() => {
                    dispatch(signout()).then((res) => {
                      dispatch(fetch_user());
                    });
                  }}
                >
                  SIGNOUT
                </button>
              ) : (
                <Link to={"/authentication"}>
                  <h1 className="text-base">SIGNIN</h1>
                </Link>
              )}
            </span>
          </div>
          <Burger />
        </div>
        <div className="flex h-[40px] gap-4 mb-4 nav-menu hidden">
          <div className="relative flex">
            <input
              type="text"
              placeholder="Search"
              className="w-full py-2 pl-10 pr-4 rounded-lg focus:outline-none bg-color1 bg-opacity-5 placeholder:text-color1"
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <img src="/icons/search.svg" width={30} height={30} alt="" />
            </span>
          </div>
          <span className="flex justify-center items-center text-xl cursor-pointer py-4">
            {user ? (
              <Link to={"/authentication"}>
                <h1 className="text-base">SIGNOUT</h1>
              </Link>
            ) : (
              <Link to={"/authentication"}>
                <h1 className="text-base">SIGNIN</h1>
              </Link>
            )}
          </span>
        </div>
      </section>
    );
  };

  return (
    <>
      {loading ? (
        <div className="relative h-screen">
          <Loader />
        </div>
      ) : (
        <div className="px-4 md:px-16 lg:px-64 text-color1">
          <Header />
          <HomepageContent sample={sample} handleNavigate={handleNavigate} />
          <Footer />
        </div>
      )}
    </>
  );
}
