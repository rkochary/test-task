import React from "react";
import Form from "./Form";
import CustomersList from "./CustomersList";

const Homepage = ({ customers }) => {
  return (
    <div className="flex">
      <Form />
      <CustomersList customers={customers} />
    </div>
  );
};

export default Homepage;
