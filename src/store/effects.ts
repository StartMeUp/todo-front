import { checkAndFetch, routes } from "../requests/index";
import * as schemas from "../requests/schemas";

export const api = {
  todos: {
    getAll: async () => await checkAndFetch(routes.todos.getAll),

    update: async (data: schemas.todoUpdatType) =>
      await checkAndFetch(routes.todos.update, data, schemas.todoUpdate),

    add: async (data: schemas.todoAddType) =>
      await checkAndFetch(routes.todos.add, data, schemas.todoAdd),

    delete: async (data: schemas.todoDeleteType) =>
      await checkAndFetch(routes.todos.delete, data, schemas.todoDelete),
  },

  user: {
    signin: async (data: schemas.userSigninType) =>
      await checkAndFetch(routes.user.signin, data, schemas.userSignin),

    signup: async (data: schemas.userSignupType) =>
      await checkAndFetch(routes.user.signup, data, schemas.userSignup),

    account: async () => await checkAndFetch(routes.user.account),
  },
};
