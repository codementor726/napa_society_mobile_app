
import { API_URL, SOCIAL_ART_API_URL } from '../const/Url';

import axios, { AxiosResponse } from 'axios';

export const handleGetFollowers = async (id: any) => {
    try {
        const p = await axios.get<{}, AxiosResponse<any>>(
            `${SOCIAL_ART_API_URL}/user/social/followers?id=${id}`
        );
        return {
            data: p?.data?.data,
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

export const handleGetFollowings = async (id: any) => {
    try {
        const p = await axios.get<{}, AxiosResponse<any>>(
            `${SOCIAL_ART_API_URL}/user/social/following?id=${id}`
        );
        return {
            data: p?.data?.data,
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

export const becomeFan = async (requesterId: string, targetId: string) => {
    try {
        const p = await axios.post<{}, AxiosResponse<any>>(
            `${SOCIAL_ART_API_URL}/user/social/fan/new`,
            {
                requesterId,
                targetId,
            }
        );
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

export const exitClub = async (requesterId: string, targetId: string) => {
    try {
        const p = await axios.patch<{}, AxiosResponse<any>>(
            `${SOCIAL_ART_API_URL}/user/social/fan/update`,
            {
                requesterId,
                targetId,
            }
        );
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

export const handleSearchUsers = async (userName: any) => {
    try {
        const p = await axios.get<{}, AxiosResponse<any>>(
            `${API_URL}/user/search?userName=${userName}`
        );
        return {
            data: p?.data?.data,
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