import axios, { AxiosResponse } from "axios";
import { ASSET_MANAGEMENT_API_URL } from "../const/Url";

export const fetchAllMixedTransactions = async (
    chainId: string,
    account: any
) => {
    try {
        const p = await axios.get<{}, AxiosResponse<{}>>(
            `${ASSET_MANAGEMENT_API_URL}/fetchAllMixedTransactions`,
            {
                params: {
                    chainId,
                    account,
                },
            }
        );
        return {
            data: p.data,
            message: '',
            error: false,
        };
    } catch (error) {
        return {
            data: null,
            error: true,
            message: error,
        };
    }
};