import React from "react";
import { useActions, useAppState } from "../store";
import { customError } from "../requests/customError";

const CreateTodo = () => {
  const actions = useActions();
  const state = useAppState();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const reqData = {
        todo: {
          title: state.createTodo.title,
          description: state.createTodo.description,
        },
      };
      await actions.createTodo.submit(reqData);
    } catch (error) {
      customError(error, actions.notification);
    }
  };

  return (
    <form className="createTodo mb-5">
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => actions.createTodo.changeTitle(e.currentTarget.value)}
      />

      <input
        type="text"
        placeholder="Description"
        onChange={(e) =>
          actions.createTodo.changeDescription(e.currentTarget.value)
        }
      />

      <button type="submit" className="" onClick={handleSubmit}>
        Create todo !
      </button>
    </form>
  );
};

export default CreateTodo;
