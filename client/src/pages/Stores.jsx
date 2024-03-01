import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetch_user } from "../redux/reducers/user_slice";
import { create_store, fetch_stores } from "../redux/reducers/store_slice";
import StoresContent from "../sections/StoresContent";
import Loader from "../components/Loader";
import CreateNewStoreModal from "../components/CreateNewStoreModal";
import { error, success } from "../redux/reducers/notification_slice";

export default function Stores() {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [category, setCategory] = useState(useParams().category);
  const [categories, setCategories] = useState([]);
  const { stores } = useSelector((state) => state.store);

  const [showCreateStore, setShowCreateStore] = useState(
    category === "create-store"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateStore = (inputs, setLoading) => {
    setLoading(true);
    dispatch(create_store(inputs)).then((res) => {
      if (res.error) {
        dispatch(error(res.error.message));
      } else {
        setShowCreateStore(false);
        dispatch(success("Store Created Successfully"));
        navigate(`/store/${res.payload._id}`);
      }

      setLoading(false);
    });
  };

  const handleNavigate = (to) => {
    navigate(to);
  };

  useEffect(() => {
    if (!showCreateStore && category === "create-store") {
      setCategory("all");
    }
  }, [showCreateStore]);

  useEffect(() => {
    setLoading(true);
    dispatch(fetch_user()).then((res) => {
      if (res.error) {
        handleNavigate("/");
        setLoading(false);
      } else {
        dispatch(fetch_stores()).then((res) => {
          setLoading(false);
        });
      }
    });
  }, []);

  useEffect(() => {
    navigate(`/stores/${category}`);
  }, [category]);

  const Header = () => {
    return (
      <section className="h-full w-full flex items-center justify-between bg-white text-color1 sticky top-0 z-40">
        {loading ? (
          <span className="flex justify-center items-center text-xl py-4 cursor-not-allowed">
            <img src="/icons/return.svg" width={40} height={40} alt="" />
            <h1 className="hidden md:block">Go back</h1>
          </span>
        ) : (
          <Link to={"/"}>
            <span className="flex justify-center items-center text-xl cursor-pointer py-4">
              <img src="/icons/return.svg" width={40} height={40} alt="" />
              <h1 className="hidden md:block">Go back</h1>
            </span>
          </Link>
        )}
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
        <div className="px-4 relative md:px-16 lg:px-64 text-color1">
          <Header />
          <StoresContent
            category={category}
            categories={categories}
            setCategory={setCategory}
            setCategories={setCategories}
            stores={stores}
            setShowCreateStore={setShowCreateStore}
            handleNavigate={handleNavigate}
          />
          <CreateNewStoreModal
            showModal={showCreateStore}
            setShowModal={setShowCreateStore}
            categories={categories}
            handleCreateStore={handleCreateStore}
          />
        </div>
      )}
    </>
  );
}
