import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { activateEditMode, deleteCustomer } from "../../../redux/customerSlice";

const CustomersList = ({ customers }) => {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    dispatch(deleteCustomer(id));
  };

  const handleEdit = (id) => {
    dispatch(activateEditMode(id));
  };

  return (
    <div className="p-10 flex flex-col gap-10 w-full">
      <h2 className=" text-xl font-bold">Customers</h2>
      <div className="flex flex-col w-full gap-3">
        <div className="text-gray-100 font-medium flex gap-6">
          <span className="min-w-[300px]">Name</span>
          <span className="min-w-[300px]">Company</span>
          <span className="min-w-[300px]">Email</span>
          <span className="w-[49px]">Admin</span>
          <span className="w-[58px]">Actions</span>
        </div>
        <div className="flex flex-col gap-3">
          {customers.map((el) => (
            <div key={el._id} className="flex gap-6">
              <span className="w-[300px] flex">
                <Image width={24} height={24} src={`/${el.img}.svg`} />
                <span className="ml-3">{el.firstName + " " + el.lastName}</span>
              </span>
              <span className="w-[300px]">{el.company}</span>
              <span className="w-[300px]">{el.email}</span>
              <div
                className={`w-[49px] rounded ${
                  el.status === "User" ? "bg-gray-250" : "bg-blue-350"
                }`}
              />
              <div className="flex">
                <button
                  onClick={() => handleEdit(el._id)}
                  className=" w-6 mr-4 flex justify-center items-center"
                >
                  <Image src="/edit.svg" width={24} height={24} />
                </button>
                <button
                  className="w-6 flex justify-center items-center"
                  onClick={() => handleDelete(el._id)}
                >
                  <Image src="/trash.svg" width={24} height={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomersList;
