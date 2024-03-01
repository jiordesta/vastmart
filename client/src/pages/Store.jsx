import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetch_store } from "../redux/reducers/store_slice";
import { fetch_user } from "../redux/reducers/user_slice";
import Loader from "../components/Loader";
import StoreContent from "../sections/StoreContent";
import { error } from "../redux/reducers/notification_slice";

export default function Store() {
  const { _id } = useParams();
  const [store, setStore] = useState(null);
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
            setStore(res.payload);
            if (res.payload.owner === user._id) {
              handleNavigate(`/stores/mystore/${_id}`);
            }
          }
          setLoading(false);
        });
      }
    });
  }, []);

  const handleNavigate = (to) => {
    navigate(to);
  };

  return (
    <>
      {loading ? (
        <div className="relative h-screen">
          <Loader />
        </div>
      ) : (
        <div className="px-4 relative md:px-16 lg:px-64 text-color1">
          <StoreContent />
        </div>
      )}
    </>
  );
}
