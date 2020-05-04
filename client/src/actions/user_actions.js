import axios from "axios";
import { LOGIN_USER, REGISTER_USER } from "./types";

export function loginUser({ email, password }) {
  const req = axios
    .post("/api/users/login", { email, password })
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: req,
  };
}

export function registerUser({ email, password, name, lastName }) {
  const req = axios
    .post("/api/users/register", { email, password, name, lastName })
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: req,
  };
}
