import axios, { AxiosResponse } from "axios";
import { ResponseApi } from "../common/app-interface";
import { useAuth } from "./useAuth";
const { REACT_APP_API_URL } = process.env;

export const useVideo = () => {
  const { getAccessToken } = useAuth()
  const getVideos = async () => {
    try{
      const response = await axios.get(`${REACT_APP_API_URL}/video`)
      if (response.data.code === 0) {
        return response.data.data
      } else {
        throw new Error(response.data.message);
      }
    }catch(e: any){
      throw new Error(e.response.data.message)
    }
  }
  const shareVideo = async (link: string) => {
    const token = getAccessToken();
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/video/share`, { link }, { headers: { Authorization: `Bearer ${token}` } });
      if(response.data.code !== 0) {
        throw new Error(response.data.message);
      }
      return response.data.data;
    } catch (e: any) {
      throw new Error(e.response.data.message)
    }
  }
  return { getVideos, shareVideo }
}

