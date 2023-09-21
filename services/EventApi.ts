import axios, { AxiosResponse } from "axios";
import { SOCIAL_ART_API_URL } from "../const/Url";

export const getRecentEvents = async () => {
  try {
    const p = await axios.get<{}, AxiosResponse<{}>>(
      `${SOCIAL_ART_API_URL}/user/social/events/list`);
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error: any) {
    return {
      data: null,
      error: true,
      message: error?.response?.data?.message,
    };
  }
};


export const getEventDetail = async (id: any) => {
  try {
    const p = await axios.get<{}, AxiosResponse<{}>>(
      `${SOCIAL_ART_API_URL}/user/social/event/${id}`);
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error: any) {
    return {
      data: null,
      error: true,
      message: error?.response?.data?.message,
    };
  }
};