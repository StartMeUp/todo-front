import { State } from "./types";

export const state: State = {
  todos: [],
  todoUpdate: { title: "", description: "" },
  user: { name: "", surname: "", email: "", loggedIn: false },
  login: {
    email: "",
    password: "",
    active: true,
  },
  signup: { name: "", surname: "", email: "", password: "" },
  notification: { message: "", show: "hidden" },
  createTodo: { title: "", description: "" },
};
