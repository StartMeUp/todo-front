import React from "react";
import { useActions, useAppState } from "../store";

const Notification = () => {
  const actions = useActions();
  const state = useAppState();

  return (
    <div className={`notification ${state.notification.show}`}>
      {state.notification.message}
    </div>
  );
};

export default Notification;
