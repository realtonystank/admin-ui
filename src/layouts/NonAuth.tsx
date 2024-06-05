import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";

const NonAuth = () => {
  const { user } = useAuthStore();
  if (user !== null) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <div>
      <h1>Non auth</h1>
      <Outlet />
    </div>
  );
};

export default NonAuth;
