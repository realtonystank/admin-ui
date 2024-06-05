import React from "react";
import { Outlet } from "react-router-dom";

const NonAuth = () => {
  return (
    <div>
      <h1>Non auth</h1>
      <Outlet />
    </div>
  );
};

export default NonAuth;
