import React from "react";
import { useActions, useAppState } from "../store";
import Header from "../components/Header";
import Todo from "../components/Todo";
import CreateTodo from "../components/CreateTodo";

const Dashboard = () => {
  const state = useAppState();
  const actions = useActions();

  return (
    <div id="dashboard">
      <Header />
      <main>
        <CreateTodo />
        {state.todos.length === 0 ? (
          <p>No todos yet. Create one !</p>
        ) : (
          state.todos.map((todo, i) => <Todo key={todo._id} i={i} />)
        )}
      </main>
    </div>
  );
};

export default Dashboard;
