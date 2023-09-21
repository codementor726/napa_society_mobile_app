import axios from "axios";

export const getCountries = async () => {
    try {
        const p: any = await axios.get(
            'https://restcountries.com/v3.1/all')            
        return {
            data: p,
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