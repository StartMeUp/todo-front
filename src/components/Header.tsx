import React from "react";
import { useActions, useAppState } from "../store";

const Header = () => {
  const actions = useActions();
  const state = useAppState();

  return (
    <header>
      <h1>{state.user.name}' s dashboard</h1>
      <button className="logout" onClick={() => actions.user.logout()}>
        Log out
      </button>
    </header>
  );
};

export default Header;
