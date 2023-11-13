import Head from "next/head";
import Homepage from "../components/pages/Homepage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCustomers } from "../redux/customerSlice";

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/customer");
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

const Home = ({ data }) => {
  const customers = useSelector((state) => state.customers.customers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addCustomers(data));
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Homepage customers={customers} />
    </>
  );
};

export default Home;
