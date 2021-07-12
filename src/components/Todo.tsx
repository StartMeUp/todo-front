import React, { useState } from "react";
import { useActions, useAppState } from "../store";
import TodoUpdate from "./TodoUpdate";

const Todo = ({ i }: { i: number }) => {
  const [todoUpdate, setTodoUpdate] = useState(false);
  const state = useAppState();
  const todo = state.todos[i];
  const actions = useActions();

  const handleDone = () => {
    const toUpdate = { ...todo };
    toUpdate.done = !todo.done;
    actions.todos.update({
      todo: toUpdate,
    });
  };

  return (
    <div className="todo">
      {todoUpdate ? (
        <TodoUpdate i={i} setTodoUpdate={setTodoUpdate} />
      ) : (
        <div className="info flex-shrink">
          <p>
            <b>Title:</b> {todo.title}
          </p>
          <p>
            <b>Description:</b> {todo.description}
          </p>
        </div>
      )}

      {!todoUpdate && (
        <div className="edit">
          <button
            className="delete"
            onClick={() =>
              actions.todos.delete({
                todo: { _id: todo._id, owner: todo.owner },
              })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-9 w-9 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <button
            className="update"
            onClick={() => {
              actions.todos.todoUpdate({
                title: todo.title,
                description: todo.description,
              });
              setTodoUpdate(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-9 w-9 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>

          <button
            className={`completed ${todo.done ? "done" : "notDone"}`}
            onClick={handleDone}
          >
            {todo.done ? "Done :)" : "To do :("}
          </button>
        </div>
      )}
    </div>
  );
};

export default Todo;
