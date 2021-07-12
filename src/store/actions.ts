import { Context } from "./index";
import Cookies from "js-cookie";
import * as schemas from "../requests/schemas";

export const todos = {
  getAll: async ({ state, effects }: Context) => {
    const result = await effects.api.todos.getAll();
    state.todos = result.data;
  },

  update: async (
    { state, effects, actions }: Context,
    toUpdate: schemas.todoUpdatType
  ) => {
    const result = await effects.api.todos.update(toUpdate);
    const { message, success, data } = result;
    if (success) state.todos = data;
    actions.notification.show({ message, success });
  },

  todoUpdate: (
    { state }: Context,
    data: { title: string; description: string }
  ) => {
    state.todoUpdate = data;
  },

  todoUpdateTitle: ({ state }: Context, title: string) => {
    state.todoUpdate.title = title;
  },

  todoUpdateDescription: ({ state }: Context, description: string) => {
    state.todoUpdate.description = description;
  },

  add: async (
    { state, effects, actions }: Context,
    newTodo: schemas.todoAddType
  ) => {
    const result = await effects.api.todos.add(newTodo);
    const { message, data, success } = result;
    if (success) {
      state.todos = data;
    }
    actions.notification.show({ message, success });
  },

  delete: async (
    { effects, actions, state }: Context,
    todo: schemas.todoDeleteType
  ) => {
    const result = await effects.api.todos.delete(todo);
    console.log("delete =>", result);
    const { message, data, success } = result;
    if (success) {
      state.todos = data;
    }
    actions.notification.show({ message, success });
  },
};

export const user = {
  logout: ({ state, actions }: Context) => {
    Cookies.remove("UserToken");
    state.user.loggedIn = false;
    actions.notification.show({
      message: "successfully logged out",
      success: true,
    });
  },

  loggedIn: ({ state }: Context, value: boolean) => {
    state.user.loggedIn = value;
  },

  account: async ({ state, effects, actions }: Context) => {
    const user = await effects.api.user.account();
    state.user.name = user.data.name;
    await actions.todos.getAll();
  },
};

export const notification = {
  show: ({ state }: Context, data: { message: string; success: boolean }) => {
    state.notification.message = data.message;
    state.notification.show = `animate-bounce  ${
      data.success ? "bg-green-200" : "bg-red-200"
    }`;
    setTimeout(() => (state.notification.show = "hidden"), 5000);
  },
  hide: ({ state }: Context) => {
    state.notification.show = "hidden";
  },
};

export const login = {
  changeEmail: ({ state }: Context, email: string) => {
    state.login.email = email;
  },

  changePassword: ({ state }: Context, password: string) => {
    state.login.password = password;
  },

  toggleActive: ({ state }: Context) => {
    state.login.active = !state.login.active;
  },

  submit: async (
    { state, effects, actions }: Context,
    data: schemas.userSigninType
  ) => {
    const response = await effects.api.user.signin(data);
    const { message, success } = response;
    if (success) {
      if (!Cookies.get("UserToken"))
        Cookies.set("UserToken", response.data.token);
      state.user.name = response.data.name;
      state.todos = response.data.todos;
      state.user.loggedIn = true;
    }
    actions.notification.show({ message, success });
  },
};

export const signup = {
  changeName: ({ state }: Context, name: string) => {
    state.signup.name = name;
  },

  changeSurname: ({ state }: Context, surname: string) => {
    state.signup.surname = surname;
  },

  changeEmail: ({ state }: Context, email: string) => {
    state.signup.email = email;
  },

  changePassword: ({ state }: Context, password: string) => {
    state.signup.password = password;
  },

  submit: async (
    { state, effects, actions }: Context,
    newUser: schemas.userSignupType
  ) => {
    const response = await effects.api.user.signup(newUser);
    const { data, message, success } = response;
    if (success) {
      if (!Cookies.get("UserToken")) Cookies.set("UserToken", data.token);
      state.user.name = data.name;
      state.user.loggedIn = true;
      state.login.active = true;
    }
    actions.notification.show({ message, success });
  },
};

export const createTodo = {
  changeTitle: ({ state }: Context, title: string) => {
    state.createTodo.title = title;
  },
  changeDescription: ({ state }: Context, description: string) => {
    state.createTodo.description = description;
  },
  submit: async (
    { state, effects, actions }: Context,
    newtodo: schemas.todoAddType
  ) => {
    const response = await effects.api.todos.add(newtodo);
    console.log("add todo res => ", response);
    const { data, message, success } = response;
    if (success) {
      state.todos = data;
    }
    actions.notification.show({ message, success });
  },
};
