import axios, { AxiosResponse } from "axios";
import { ResponseApi } from "../common/app-interface";
const { REACT_APP_API_URL } = process.env;

export const useVideo = () => {

  const getVideos = () => {
    return new Promise((resolve, reject) => {
      axios.get(`${REACT_APP_API_URL}/video`)
        .then((response: AxiosResponse<ResponseApi>) => resolve(response.data))
        .catch((err: any) => reject(err));
    });
  }
  return {getVideos}
}

