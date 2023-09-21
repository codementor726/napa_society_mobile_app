import axios, { AxiosResponse } from "axios";
import { SOCIAL_ART_API_URL } from "../const/Url";

export const getTrendings = async () => {
    try {
        const p = await axios.get<{}, AxiosResponse<{}>>(
            `${SOCIAL_ART_API_URL}/user/trending/feed/list`);
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


export const getTrendingDetail = async (id: any) => {
    try {
        const p = await axios.get<{}, AxiosResponse<{}>>(
            `${SOCIAL_ART_API_URL}/user/social/feed/${id}`);
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