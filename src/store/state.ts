import { State } from "./types";

export const state: State = {
  todos: [],
  todoUpdate: { title: "", description: "" },
  user: { name: "", surname: "", email: "", loggedIn: false },
  login: {
    email: "demo@email.com",
    password: "DemoPassword",
    active: true,
  },
  signup: { name: "", surname: "", email: "", password: "" },
  notification: { message: "", show: "hidden" },
  createTodo: { title: "", description: "" },
};
