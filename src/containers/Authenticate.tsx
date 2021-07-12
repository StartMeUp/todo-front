import React from "react";
import { useActions, useAppState } from "../store";
import Login from "../components/Login";
import Signup from "../components/Signup";

const Authenticate = () => {
  const state = useAppState();
  const actions = useActions();

  return state.login.active ? <Login /> : <Signup />;
};

export default Authenticate;
