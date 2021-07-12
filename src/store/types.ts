export type Todo = {
  _id: string;
  title: string;
  description: string;
  done: boolean;
  owner: string;
};

export type State = {
  todos: Todo[];
  todoUpdate: { title: string; description: string };
  user: { name: string; loggedIn: boolean; surname: string; email: string };
  login: { email: string; password: string; active: boolean };
  signup: { email: string; password: string; name: string; surname: string };
  notification: { message: string; show: string };
  createTodo: { title: string; description: string };
};
