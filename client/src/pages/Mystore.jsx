import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import MystoreContent from "../sections/MystoreContent";
import { useDispatch, useSelector } from "react-redux";
import { fetch_user } from "../redux/reducers/user_slice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetch_store } from "../redux/reducers/store_slice";
import { error, success } from "../redux/reducers/notification_slice";
import Footer from "../sections/Footer";
import CreateNewProductModal from "../components/CreateNewProductModal";
import {
  create_product,
  fetch_products,
} from "../redux/reducers/product_slice";

export default function Mystore() {
  const { _id } = useParams();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const handleNavigate = (to) => {
    navigate(to);
  };

  const handleCreateProduct = (inputs, setLoading) => {
    setLoading(true);
    dispatch(create_product({ ...inputs, store: store._id })).then((res) => {
      if (res.error) {
        dispatch(error(res.error.message));
      } else {
        dispatch(success("Created a new product"));
        dispatch(fetch_products(store._id));
      }
      setShowModal(false);
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    dispatch(fetch_user()).then((res) => {
      if (res.error) {
        handleNavigate("/authentication");
      } else {
        dispatch(fetch_store(_id)).then((res) => {
          if (res.error) {
            dispatch(error(res.error.message));
          } else {
            if (user && res.payload.owner !== user._id) {
              handleNavigate("/");
            } else {
              setStore(res.payload);
              dispatch(fetch_products(_id)).then((res) => {
                if (res.error) {
                  dispatch(error(res.error.message));
                } else {
                  setProducts(res.payload);
                }
              });
            }
          }
        });
      }
      setLoading(false);
    });
  }, []);

  const Header = () => {
    return (
      <section className="h-full w-full flex items-center justify-between text-color1 sticky bg-white top-0 z-40">
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
      {loading || !store ? (
        <div className="relative h-screen">
          <Loader />
        </div>
      ) : (
        <div className="px-4 relative md:px-16 lg:px-64 text-color1">
          <Header />
          <MystoreContent store={store} setShowModal={setShowModal} />
          <Footer />
          <CreateNewProductModal
            setShowModal={setShowModal}
            showModal={showModal}
            handleCreateProduct={handleCreateProduct}
          />
        </div>
      )}
    </>
  );
}
