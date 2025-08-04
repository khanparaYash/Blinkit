import React from "react";
import { Outlet } from "react-router-dom";
import { useGlobalContext } from "../provider/GlobalProvider";
import Loading from "./Loading";

function ForOutlet() {
  const { loading } = useGlobalContext();
  return (
    <>
      {loading&&(<Loading/>)}
      <Outlet />
    </>
  );
}

export default ForOutlet;
