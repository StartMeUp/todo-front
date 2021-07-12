import React from "react";
import { useActions, useAppState } from "../store";
import { customError } from "../requests/customError";

const Signup = () => {
  const actions = useActions();
  const state = useAppState();

  const handleclick = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const reqData = {
        email: state.signup.email,
        password: state.signup.password,
        name: state.signup.name,
        surname: state.signup.surname,
      };
      await actions.signup.submit(reqData);
    } catch (error) {
      customError(error, actions.notification);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form>
        <h1>Signup</h1>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          value={state.signup.name}
          onChange={(e) => actions.signup.changeName(e.currentTarget.value)}
        />

        <input
          type="text"
          name="surname"
          placeholder="Surame"
          required
          value={state.signup.surname}
          onChange={(e) => actions.signup.changeSurname(e.currentTarget.value)}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={state.signup.email}
          onChange={(e) => actions.signup.changeEmail(e.currentTarget.value)}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.signup.password}
          required
          onChange={(e) => actions.signup.changePassword(e.currentTarget.value)}
        />

        <button id="login" type="submit" onClick={handleclick}>
          <span>Create an account</span>
        </button>

        <p className="mt-5">
          Already have an account ?{" "}
          <a
            className="underline"
            href="#"
            onClick={() => actions.login.toggleActive()}
          >
            Click here to login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
