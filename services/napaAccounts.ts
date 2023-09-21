import axios, { AxiosResponse } from "axios";
import { API_URL } from "../const/Url";

export const getNapaAccounts = async (profileId: string) => {
    try {
        const p = await axios.get<{}, AxiosResponse<{}>>(`${API_URL}/napaccounts`, {
            params: {
                profileId,
            },
        });
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


export const switchNapaAccount = async (profileId: string, accountId: string) => {
    try {
        const p = await axios.get<{}, AxiosResponse<{}>>(`${API_URL}/napaccounts/switch`, {
            params: {
                profileId,
                accountId
            },
        });
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


export const addNapaAccount = async (profileId: string, name: string) => {
    try {
        const p = await axios.get<{}, AxiosResponse<{}>>(`${API_URL}/napaccounts/new`, {
            params: {
                profileId,
                name,
            },
        });
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


export const getRecoveryPhrase = async (profileId: string) => {
    try {
        const p = await axios.get<{}, AxiosResponse<{}>>(`${API_URL}/napaccounts/getRecoveryPhrase`, {
            params: {
                profileId,
            },
        });
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

