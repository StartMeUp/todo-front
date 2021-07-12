import React from "react";
import { useActions, useAppState } from "../store";
import { customError } from "../requests/customError";

const TodoUpdate = ({
  i,
  setTodoUpdate,
}: {
  i: number;
  setTodoUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const state = useAppState();
  const todo = state.todos[i];
  const actions = useActions();

  const handleUpdate = async () => {
    try {
      const toUpdate = { ...todo };
      toUpdate.title = state.todoUpdate.title;
      toUpdate.description = state.todoUpdate.description;
      await actions.todos.update({
        todo: toUpdate,
      });
      setTodoUpdate(false);
    } catch (error) {
      customError(error, actions.notification);
    }
  };

  return (
    <form id="edit" className="w-full items-stretch">
      <h2 className="mb-5 font-bold">Edit Todo</h2>
      <div className="flex justify-items-start mb-5">
        <button className="mr-2" onClick={() => setTodoUpdate(false)}>
          Exit
        </button>{" "}
        <button className="ml-2" onClick={handleUpdate}>
          Save changes
        </button>
      </div>
      <label>Title:</label>
      <input
        type="text"
        value={state.todoUpdate.title}
        onChange={(e) => actions.todos.todoUpdateTitle(e.currentTarget.value)}
      />

      <label>Description:</label>
      <input
        type="text"
        value={state.todoUpdate.description}
        onChange={(e) =>
          actions.todos.todoUpdateDescription(e.currentTarget.value)
        }
      />
    </form>
  );
};

export default TodoUpdate;
