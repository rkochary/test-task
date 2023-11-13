import Image from "next/image";
import React, { useState } from "react";

export const Input = ({
  label,
  type,
  name,
  error,
  errorText = "Required",
  defaultValue,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-2.5 w-full relative">
      <span className="text-gray-150 font-medium leading-6">{label}</span>
      <input
        name={name}
        className="py-2 px-3 focus:shadow-inputShadow border rounded-lg border-gray-50"
        type={showPassword ? "text" : type}
        defaultValue={defaultValue}
      />
      {error ? (
        <span className="text-red-400 text-sm leading-5">{errorText}</span>
      ) : null}
      {type === "password" ? (
        <div
          onClick={toggleShowPassword}
          className="w-6 h-6 absolute right-2 top-11 cursor-pointer"
        >
          <Image
            src={showPassword ? "/eye_off.svg" : "/eye.svg"}
            layout="fill"
            alt="show password"
          />
        </div>
      ) : null}
    </div>
  );
};
