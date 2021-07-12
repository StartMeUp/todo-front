import Axios from "axios";
import { AnyZodObject } from "zod";
import Cookies from "js-cookie";

// routes tuple : [method, route]
type RouteData = ["get" | "post" | "patch" | "delete", string];

type Routes = {
  [key: string]: { [key: string]: RouteData };
};

export const routes: Routes = {
  todos: {
    getAll: ["get", "/todo/"],
    update: ["patch", "/todo/update"],
    add: ["post", "/todo/add"],
    delete: ["post", "/todo/delete"],
  },
  user: {
    signin: ["post", "/user/signin"],
    signup: ["post", "/user/signup"],
    account: ["get", "/user/account"],
  },
};

// axios config
export const checkAndFetch = async (
  route: RouteData,
  data?: { [key: string]: any },
  validation?: AnyZodObject
) => {
  const [method, path] = route;

  //validate the data sent to the server
  if (validation) validation.parse(data);

  //create axios instance
  const axios = Axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_BASE_API_URL,
    validateStatus: (status) => {
      return status < 500;
    },
  });

  // set userToken in headers when needed (signin and signup routes excluded)
  // all other routes demand a token
  const token = Cookies.get("UserToken");
  const excludedRoutes = [routes.user.signin[1], routes.user.signup[1]];
  if (!excludedRoutes.includes(path)) {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      throw new Error("UserToken missing");
    }
  }

  // make request
  const res = await axios[method](path, data);
  return res.data;
};
