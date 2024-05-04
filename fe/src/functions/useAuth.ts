import axios from "axios";
import { IUserInfo, ResponseApi } from "../common/app-interface";
const { REACT_APP_API_URL } = process.env;

export const useAuth = () => {
  const login = async (userName: string, password: string) => {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/auth/login`, {
        userName,
        password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      }) as ResponseApi;
      if (response.data.code === 0) {
        setCurrentUser(response.data?.data?.accessToken);
        return getCurrentInfoUser();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error : any) {
      throw new Error(error.response.data.message);
    }
  }
  const register = async (userName: string, password: string, passwordVerify: string, name: string) => {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/auth/register`, {
        userName,
        password,
        passwordVerify,
        name,
        email: userName,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      }) as ResponseApi;
      if (response.data.code === 0) {
        return response.data.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error : any) {
      throw new Error(error.response.data.message);
    }
  }

  const setCurrentUser = (accessToken: string) => {
    localStorage.setItem("accessToken", accessToken);
  }
  const getCurrentInfoUser = (): IUserInfo => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return {} as IUserInfo;
    const payload = accessToken.split(".")[1];
    const data = JSON.parse(atob(payload));
    return data;
  }
  const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  }
  const logout = () => {
    localStorage.removeItem("accessToken");
  }
  return {register, login, getCurrentInfoUser, getAccessToken, logout }
}
