import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../sections/Footer";
import AuthenticationContent from "../sections/AuthenticationContent";
import { useDispatch } from "react-redux";
import { signin, signup } from "../redux/reducers/user_slice";
import { error, success } from "../redux/reducers/notification_slice";

export default function Authentication() {
  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignin = (inputs) => {
    setLoading(true);
    dispatch(signin(inputs)).then((res) => {
      if (res.error) {
        dispatch(error(res.error.message));
      } else {
        dispatch(success("Logged in Successfully"));
        navigate("/");
      }
      setLoading(false);
    });
  };
  const handleSignup = (inputs) => {
    setLoading(true);
    dispatch(signup(inputs)).then((res) => {
      if (res.error) {
        dispatch(error(res.error.message));
      } else {
        dispatch(success("Registered Successfully"));
        navigate("/");
      }
      setLoading(false);
    });
  };

  const Header = () => {
    return (
      <section className="h-full w-full flex items-center justify-between text-color1 sticky top-0 z-40">
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
    <div className="px-4 md:px-16 lg:px-64 text-color1 relative">
      <Header />
      <AuthenticationContent
        setShowRegister={setShowRegister}
        showRegister={showRegister}
        loading={loading}
        handleSignin={handleSignin}
        handleSignup={handleSignup}
      />
      <Footer />
    </div>
  );
}
