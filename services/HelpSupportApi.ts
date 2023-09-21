// http://localhost:8000/user/support/email

import axios, { AxiosResponse } from "axios";
import { API_URL } from "../const/Url";
import { emailSupport } from "../typings/HelpSupport";

export const sendEmailtoSupport = async (email: string, title: string, description: string,deviceType:string) => {
    try {
        const p = await axios.post<{}, AxiosResponse<emailSupport>>(
            `${API_URL}/user/support/email`,
            {
                email,
                title,
                description,
                deviceType
            }
        );
        return {
            data: p?.data,
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
