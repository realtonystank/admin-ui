import React from "react";

const LoginPage = () => {
  return (
    <>
      <div>Sign in</div>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button>Log in</button>
      <label htmlFor="remember-me">Remember me</label>
      <input type="checkbox" id="remember-me" />
      <a href="#">Forgot password</a>
    </>
  );
};

export default LoginPage;
