import axios from "axios";
import { IUserInfo, ResponseApi } from "../common/app-interface";
import { notification } from "antd";
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
        notification.error({ message: response.message });
      }
    } catch (error : any) {
      notification.error({ message: error.response.data.message });
    }
    return {} as IUserInfo;
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
  return { login, getCurrentInfoUser, getAccessToken, logout }
}
