import React from "react";
import { useActions, useAppState } from "../store";
import { customError } from "../requests/customError";
import Cookies from "js-cookie";

const Login = () => {
  const actions = useActions();
  const state = useAppState();

  const handleclick = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const reqData = {
        email: state.login.email,
        password: state.login.password,
      };
      await actions.login.submit(reqData);
    } catch (error) {
      customError(error, actions.notification);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form>
        <h1>Login</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={state.login.email}
          onChange={(e) => actions.login.changeEmail(e.currentTarget.value)}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.login.password}
          required
          onChange={(e) => actions.login.changePassword(e.currentTarget.value)}
        />

        <button id="login" type="submit" onClick={handleclick}>
          <span>Login</span>
        </button>

        <p className="mt-5">
          No account yet ?{" "}
          <a
            className="underline"
            href="#"
            onClick={() => actions.login.toggleActive()}
          >
            Click here to signup
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
