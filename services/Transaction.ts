import axios, { AxiosResponse } from "axios";
import { SOCIAL_ART_API_URL } from "../const/Url";
import { CreateNewTransactionResponse, NewTransaction } from "../typings/transaction";

export const createNewTransaction = async (transaction: NewTransaction) => {
    try {
        const p = await axios.post<{}, AxiosResponse<CreateNewTransactionResponse>>(
            `${SOCIAL_ART_API_URL}/user/transaction/new`,
            transaction
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