import React from "react";
import { Outlet } from "react-router";

const CustomerLayout = () => {
  return (
    <>
      <div>CustomerLayout</div>
      <Outlet />
    </>
  );
};

export default CustomerLayout;
