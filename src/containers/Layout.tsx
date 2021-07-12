import React, { useState } from "react";

import Authenticate from "../containers/Authenticate";
import Notification from "../components/Notification";
import { useActions, useAppState } from "../store";

export default function Layout(props: any) {
  const state = useAppState();
  const actions = useActions();

  return (
    <div className="App">
      {state.user.loggedIn ? props.children : <Authenticate />}
      <Notification />
    </div>
  );
}
