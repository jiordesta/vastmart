import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";

export default function AuthenticationContent({
  loading,
  setShowRegister,
  showRegister,
  handleSignin,
  handleSignup,
}) {
  const Signin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
      <div className="w-full md:border border-color1 border-dashed p-2 rounded-lg space-y-4 bg-white drop-shadow-lg">
        <h1 className="text-2xl font-semibold bg-color1 text-white py-8 uppercase text-center rounded-lg"></h1>
        <div className="space-y-2">
          <div className="relative flex items-center">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <img src="/icons/user-icon.svg" width={30} height={30} alt="" />
            </span>
            <input
              type="text"
              placeholder="USERNAME"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full py-2 pl-12 pr-2 rounded-md focus:outline-none bg-color2 bg-opacity-10 focus:bg-opacity-5 text-color1"
            />
          </div>
          <div className="relative flex items-center">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <img src="/icons/key-icon.svg" width={30} height={30} alt="" />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="PASSWORD"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2 pl-12 pr-12 rounded-md focus:outline-none bg-color2 bg-opacity-10 focus:bg-opacity-5 text-color1"
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <img src="/icons/open-icon.svg" width={30} height={30} alt="" />
              ) : (
                <img
                  src="/icons/close-icon.svg"
                  width={30}
                  height={30}
                  alt=""
                />
              )}
            </span>
          </div>
          <button
            className="text-2xl font-semibold hover:bg-color1 hover:text-white border border-color1 border-dashed py-1 uppercase text-center rounded-lg w-full bg-white drop-shadow-sm"
            onClick={() => {
              handleSignin({ username, password });
            }}
          >
            signin
          </button>
          <div className="flex gap-4 justify-center items-center text-color1">
            <div className="bg-color1 w-full h-[1px]" />
            <h1>or</h1>
            <div className="bg-color1 w-full h-[1px]" />
          </div>
          <button
            className="text-black w-full underline"
            onClick={() => setShowRegister(true)}
          >
            create new account
          </button>
        </div>
      </div>
    );
  };

  const Signup = () => {
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(true);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPasword2] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (password1 === password2) {
        setConfirmPassword(true);
      } else {
        setConfirmPassword(false);
      }
    }, [password1, password2]);

    return (
      <div className="w-full md:border border-color1 border-dashed p-2 rounded-lg space-y-4 bg-white drop-shadow-lg">
        <h1 className="text-2xl font-semibold bg-color1 text-white py-8 uppercase text-center rounded-lg"></h1>
        <div className="space-y-2">
          <div className="relative flex items-center">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <img
                src="/icons/identity-icon.svg"
                width={30}
                height={30}
                alt=""
              />
            </span>
            <input
              type="text"
              placeholder="YOUR NAME"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full py-2 pl-12 pr-2 rounded-md focus:outline-none bg-color2 bg-opacity-10 focus:bg-opacity-5 text-color1"
            />
          </div>
          <div className="relative flex items-center">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <img src="/icons/user-icon.svg" width={30} height={30} alt="" />
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="YOUR USERNAME"
              className="w-full py-2 pl-12 pr-2 rounded-md focus:outline-none bg-color2 bg-opacity-10 focus:bg-opacity-5 text-color1"
            />
          </div>
          <div className="relative flex items-center">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <img src="/icons/key-icon.svg" width={30} height={30} alt="" />
            </span>
            <input
              type={showPassword1 ? "text" : "password"}
              placeholder="CREATE PASSWORD"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              className={`w-full py-2 pl-12 pr-12 rounded-md focus:outline-none ${
                password1 === "" || password2 === ""
                  ? "bg-color1 bg-opacity-10"
                  : confirmPassword
                  ? "bg-[#65B741]"
                  : "bg-[#D24545]"
              } bg-opacity-10 focus:bg-opacity-5 text-color1`}
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
              onClick={() => setShowPassword1(!showPassword1)}
            >
              {showPassword1 ? (
                <img src="/icons/open-icon.svg" width={30} height={30} alt="" />
              ) : (
                <img
                  src="/icons/close-icon.svg"
                  width={30}
                  height={30}
                  alt=""
                />
              )}
            </span>
          </div>
          <div className="relative flex items-center">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              {confirmPassword ? (
                <img
                  src="/icons/check-icon.svg"
                  width={30}
                  height={30}
                  alt=""
                />
              ) : (
                <img
                  src="/icons/cross-icon.svg"
                  width={30}
                  height={30}
                  alt=""
                />
              )}
            </span>
            <input
              type={showPassword2 ? "text" : "password"}
              placeholder="CONFIRM PASSWORD"
              value={password2}
              onChange={(e) => setPasword2(e.target.value)}
              className={`w-full py-2 pl-12 pr-12 rounded-md focus:outline-none ${
                password1 === "" || password2 === ""
                  ? "bg-color1 bg-opacity-10"
                  : confirmPassword
                  ? "bg-[#65B741]"
                  : "bg-[#D24545]"
              } bg-opacity-10 focus:bg-opacity-5 text-color1`}
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
              onClick={() => setShowPassword2(!showPassword2)}
            >
              {showPassword2 ? (
                <img src="/icons/open-icon.svg" width={30} height={30} alt="" />
              ) : (
                <img
                  src="/icons/close-icon.svg"
                  width={30}
                  height={30}
                  alt=""
                />
              )}
            </span>
          </div>
          <button
            className={`text-2xl font-semibold  border border-color1 border-dashed py-1 uppercase text-center rounded-lg w-full bg-white drop-shadow-sm ${
              !confirmPassword || !name || !username
                ? "cursor-not-allowed"
                : "hover:bg-color1 hover:text-white"
            }`}
            onClick={() =>
              handleSignup({ name, username, password: password1 })
            }
          >
            signup
          </button>
          <div className="flex gap-4 justify-center items-center text-color1">
            <div className="bg-color1 w-full h-[1px]" />
            <h1>or</h1>
            <div className="bg-color1 w-full h-[1px]" />
          </div>
          <button
            className="text-black w-full underline"
            onClick={() => setShowRegister(false)}
          >
            login to an account
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="h-screen w-full flex justify-center items-center">
      <div className="w-full md:w-1/2 xl:w-[500px] relative">
        {showRegister ? <Signup /> : <Signin />}
        {loading && <Loader w={120} h={120} style="bg-color1 bg-opacity-25" />}
      </div>
    </section>
  );
}
