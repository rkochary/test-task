import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "../../shared/Input";
import { RadioButton } from "../../shared/RadioButton";
import { isValidValue } from "../../../utils/checkInput";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewCustomer,
  deactivateEditMode,
  updateCustomer,
} from "../../../redux/customerSlice";

const Form = () => {
  const [radioBtnValue, setRadioBtnValue] = useState(0);
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const editing = useSelector((state) => state.customers.editing);
  const isEditing = useMemo(() => {
    return editing?._id;
  }, [editing]);

  useEffect(() => {
    if (isEditing) setRadioBtnValue(editing.status === "User" ? 0 : 1);
    else setRadioBtnValue(0);
  }, [isEditing]);

  const handleEdit = async (e) => {
    e.preventDefault();
    let hasError = false;
    const form = e.target;
    const { first, last, email, company } = form;
    [first, last, email, company].forEach((el) => {
      if (!isValidValue(el.value, el.name)) {
        setErrors((prev) => ({ ...prev, [el.name]: true }));
        hasError = true;
        return;
      } else setErrors((prev) => ({ ...prev, [el.name]: false }));
    });

    if (hasError) return;

    dispatch(
      updateCustomer({
        firstName: first.value,
        lastName: last.value,
        email: email.value,
        company: company.value,
        status: radioBtnValue === 0 ? "User" : "Administrator",
        img: editing.img,
        _id: editing._id,
      })
    );

    formRef.current.reset();
    dispatch(deactivateEditMode());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;
    const form = e.target;
    const { first, last, password, email, company } = form;
    [first, last, email, company, password].forEach((el) => {
      if (!isValidValue(el.value, el.name)) {
        setErrors((prev) => ({ ...prev, [el.name]: true }));
        hasError = true;
        return;
      } else setErrors((prev) => ({ ...prev, [el.name]: false }));
    });

    if (hasError) return;

    dispatch(
      addNewCustomer({
        firstName: first.value,
        lastName: last.value,
        password: password.value,
        email: email.value,
        company: company.value,
        img: Math.floor(Math.random() * 6),
        status: radioBtnValue === 0 ? "User" : "Administrator",
      })
    );

    formRef.current.reset();
  };

  return (
    <form
      ref={formRef}
      onSubmit={isEditing ? handleEdit : handleSubmit}
      className="p-10 flex flex-col gap-6 border-r border-gray-250 "
    >
      <h2 className=" text-xl font-bold text-black-200 mb-4">
        {isEditing ? "Edit Customer" : "Add Customer"}
      </h2>
      <div className="flex gap-6">
        <Input
          error={errors.first}
          defaultValue={isEditing ? editing.firstName : ""}
          name="first"
          label="First Name"
        />
        <Input
          error={errors.last}
          defaultValue={isEditing ? editing.lastName : ""}
          name="last"
          label="Last Name"
        />
      </div>
      <Input
        error={errors.company}
        defaultValue={isEditing ? editing.company : ""}
        name="company"
        label="Company"
      />
      <div className="flex flex-col">
        <span>Status</span>
        <RadioButton value={radioBtnValue} setValue={setRadioBtnValue} />
      </div>
      <Input
        error={errors.email}
        defaultValue={isEditing ? editing.email : ""}
        errorText="Invalid email"
        name="email"
        label="Email"
      />
      {!isEditing ? (
        <div className="flex flex-col">
          <Input
            error={errors.password}
            name="password"
            type="password"
            label="Password"
            errorText=""
          />
          <span
            className={`mt-2.5 text-gray-100 text-sm leading-5 ${
              errors.password ? "text-red-400" : ""
            }`}
          >
            8+ characters
          </span>
        </div>
      ) : null}
      <button
        type="submit"
        className="py-2 px-3 rounded-lg bg-blue-350 w-full text-white font-bold leading-6"
      >
        Save
      </button>
    </form>
  );
};

export default Form;
