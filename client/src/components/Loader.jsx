import React from "react";

export default function Loader({ w, h, style }) {
  return (
    <div
      className={`absolute inset-0 z-50  flex justify-center items-center rounded-lg ${style} cursor-not-allowed`}
    >
      <img src="/icons/loader-animation.svg" width={w} height={h} alt="" />
    </div>
  );
}
