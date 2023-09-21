import axios, { AxiosResponse } from "axios";
import { SOCIAL_ART_API_URL } from "../const/Url";

export const handlePostGenre = async (userGenre: any) => {
    const genre = await axios.post<AxiosResponse>(
        `${SOCIAL_ART_API_URL}/user/genre/new`, userGenre
    );
    console.log(genre.data.data)
    return genre.data.data;
};

export const handleUpdateGenre = async (
    profileId: string,
    genereSelected: any,
) => {
    try {
        const p = await axios.patch<AxiosResponse>(
            `${SOCIAL_ART_API_URL}/user/genre?profileId=${profileId}&genereSelected=${genereSelected}`
        );
        return {
            data: p.data.data,
            message: '',
            error: false,
        };
    } catch (error) {
        return {
            data: [],
            error: true,
            //@ts-ignore
            message: error?.response?.data?.message,
        };
    }
};


export const handleGetGenre = async (
    profileId: string,
) => {
    try {
        const p = await axios.get<{}, AxiosResponse>(
            `${SOCIAL_ART_API_URL}/user/genre`,
            {
                params: {
                    profileId
                },
            }
        );
        return {
            data: p.data.data,
            message: '',
            error: false,
        };
    } catch (error) {
        return {
            data: [],
            error: true,
            //@ts-ignore
            message: error?.response?.data?.message,
        };
    }
};