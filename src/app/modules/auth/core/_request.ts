import { AuthModel, UserModel } from "./_models";
import axios from "axios";
const API_URL = import.meta.env.API_URL;
export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/auth/verify_token`;
export const LOGIN_URL = `${API_URL}/auth/login`;


export function login(email: string, password: string) {
  return axios.post<AuthModel>(
    LOGIN_URL,
    {
      email,
      password,
    },
    { withCredentials: true }
  );
}
export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    token: token,
  });
}