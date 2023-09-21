import axios, { AxiosResponse } from 'axios';
import { ASSET_MANAGEMENT_API_URL } from '../const/Url';

export const getTransactionHistory = async (
    chainId: string,
    account: string
) => {
    try {
        const p = await axios.get<{}, AxiosResponse<{}>>(
            `${ASSET_MANAGEMENT_API_URL}/transactions`,
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
            //@ts-ignore
            message: error?.response?.data?.message,
        };
    }
};

export const getNativeTokenWalletBalance = async (
    profileId: string,
    chainId: string,
) => {
    try {
        const p = await axios.get<{}, AxiosResponse<{}>>(
            `${ASSET_MANAGEMENT_API_URL}/napaTokenBalance`,
            {
                params: {
                    chainId,
                    profileId,
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
            //@ts-ignore
            message: error?.response?.data?.message,
        };
    }
};

export const getOtherTokenWalletBalance = async (
    profileId: string,
    chainId: string,
    tokenAddresses: any
) => {
    try {
        const p = await axios.get<{}, AxiosResponse<{}>>(
            `${ASSET_MANAGEMENT_API_URL}/otherTokenBalance`,
            {
                params: {
                    chainId,
                    profileId,
                    tokenAddresses,
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
            //@ts-ignore
            message: error?.response?.data?.message,
        };
    }
};

export const getCustomTokenWalletBalance = async (
    chainId: string,
    profileId: string,
) => {
    try {
        const p = await axios.get<{}, AxiosResponse<{}>>(
            `${ASSET_MANAGEMENT_API_URL}/etherBalance`,
            {
                params: {
                    chainId,
                    profileId,
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
            //@ts-ignore
            message: error?.response?.data?.message,
        };
    }
};

export const getSendNativeToken = async (
    chainId: string,
    profileId: string,
    receiver_address: string,
    amount: string
) => {
    try {
        const p = await axios.get<{}, AxiosResponse<{}>>(
            `${ASSET_MANAGEMENT_API_URL}/sendNativeToken`,
            {
                params: {
                    chainId,
                    profileId,
                    receiver_address,
                    amount
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
            //@ts-ignore
            message: error?.response?.data?.message,
        };
    }
};

export const getSendCustomToken = async (
    profileId: string,
    chainId: string,
    contract_address: string,
    receiver_address: string,
    amount: string
) => {
    try {
        const p = await axios.get<{}, AxiosResponse<{}>>(
            `${ASSET_MANAGEMENT_API_URL}/sendCustomToken`,
            {
                params: {
                    profileId,
                    chainId,
                    contract_address,
                    receiver_address,
                    amount
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
            //@ts-ignore
            message: error?.response?.data?.message,
        };
    }
};

export const getImportToken = async (
    chainId: string,
    contracts: string,
) => {
    try {
        const p = await axios.get<{}, AxiosResponse<{}>>(
            `${ASSET_MANAGEMENT_API_URL}/importTokens`,
            {
                params: {
                    chainId,
                    contracts,
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
            //@ts-ignore
            message: error?.response?.data?.message,
        };
    }
};

export const getImportAccountFromPrivateKey = async (profileId: string) => {
    try {
        const p = await axios.get<{}, AxiosResponse<{}>>(
            `${ASSET_MANAGEMENT_API_URL}/importAccountFromPrivateKey`,
            {
                params: {
                    profileId,
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
            //@ts-ignore
            message: error?.response?.data?.message,
        };
    }
};

export const getImportAccountFromPhrase = async (phrase: any) => {
    try {
        const p = await axios.get<{}, AxiosResponse<{}>>(
            `${ASSET_MANAGEMENT_API_URL}/importAccountFromPhrase`,
            {
                params: {
                    phrase,
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
            //@ts-ignore
            message: error?.response?.data?.message,
        };
    }
};

export const getImportNFTs = async (
    chainId: string,
    contract: string,
    tokenId: string
) => {
    try {
        const p = await axios.get<{}, AxiosResponse<{}>>(
            `${ASSET_MANAGEMENT_API_URL}/importNFTs`,
            {
                params: {
                    chainId,
                    contract,
                    tokenId,
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
            //@ts-ignore
            message: error?.response?.data?.message,
        };
    }
};

export const getSwitchNetwork = async (id: string) => {
    try {
        const p = await axios.get<{}, AxiosResponse<{}>>(
            `${ASSET_MANAGEMENT_API_URL}/switchNetwork`,
            {
                params: {
                    id,
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
            //@ts-ignore
            message: error?.response?.data?.message,
        };
    }
};

export const getCurrentNetwork = async () => {
    try {
        const p = await axios.get<{}, AxiosResponse<{}>>(
            `${ASSET_MANAGEMENT_API_URL}/getCurrentNetwork`
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
            //@ts-ignore
            message: error?.response?.data?.message,
        };
    }
};

export const getStakeNapaTokens = async (
    profileId: any,
    amount: string,
    chainId: string,
    plan: string
) => {
    try {
        const p = await axios.get<{}, AxiosResponse<{}>>(
            `${ASSET_MANAGEMENT_API_URL}/stakeNapaTokens`,
            {
                params: {
                    profileId,
                    amount,
                    chainId,
                    plan,
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
            //@ts-ignore
            message: error?.response?.data?.message,
        };
    }
};

export const getUnStakeNapaTokens = async (
    profileId: any,
    private_key: string,
    chainId: string,
    plan: string
) => {
    try {
        const p = await axios.get<{}, AxiosResponse<{}>>(
            `${ASSET_MANAGEMENT_API_URL}/unstakeNapaTokens`,
            {
                params: {
                    profileId,
                    private_key,
                    chainId,
                    plan,
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
            //@ts-ignore
            message: error?.response?.data?.message,
        };
    }
};

export const getfetchAccountsByIndex = async (
    profileId: any,
    index: string,
) => {
    try {
        const p = await axios.get<{}, AxiosResponse<{}>>(
            `${ASSET_MANAGEMENT_API_URL}/unstakeNapaTokens`,
            {
                params: {
                    profileId,
                    index,
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
            //@ts-ignore
            message: error?.response?.data?.message,
        };
    }
};

export const getAllNFTsOfUser = async (
    chainId: string,
    address: string,
) => {
    try {
        const p = await axios.get<{}, AxiosResponse<{}>>(
            `${ASSET_MANAGEMENT_API_URL}/getAllNFTsOfUser`,
            {
                params: {
                    chainId,
                    address,
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
            //@ts-ignore
            message: error?.response?.data?.message,
        };
    }
};

export const getSpecificNFTsOfUser = async (
    chainId: string,
    address: string,
    tokenAddresses: string
) => {
    try {
        const p = await axios.get<{}, AxiosResponse<{}>>(
            `${ASSET_MANAGEMENT_API_URL}/getSpecificNFTsOfUser`,
            {
                params: {
                    chainId,
                    address,
                    tokenAddresses
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
            //@ts-ignore
            message: error?.response?.data?.message,
        };
    }
};

export const sendNFT = async (
    profileId: string,
    chainId: string,
    nftId: string,
    receiver_address: string,
    contract_address: string
) => {
    try {
        const p = await axios.get<{}, AxiosResponse<{}>>(
            `${ASSET_MANAGEMENT_API_URL}/sendNFT`,
            {
                params: {
                    profileId,
                    chainId,
                    nftId,
                    receiver_address,
                    contract_address
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
            //@ts-ignore
            message: error?.response?.data?.message,
        };
    }
};


export const addStreamAddress = async (
    address: string,
) => {
    try {
        const p = await axios.get<{}, AxiosResponse<{}>>(
            `${ASSET_MANAGEMENT_API_URL}/addStreamAddress`,
            {
                params: {
                    address,
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
            //@ts-ignore
            message: error?.response?.data?.message,
        };
    }
};

export const fetchTokenTransfers = async (
    chainId: string,
    account: any
) => {
    try {
        const p = await axios.get<{}, AxiosResponse<{}>>(
            `${ASSET_MANAGEMENT_API_URL}/fetchTokenTransfers`,
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
            //@ts-ignore
            message: error?.response?.data?.message,
        };
    }
};

export const fetchNFTTransfers = async (
    chainId: string,
    account: any
) => {
    try {
        const p = await axios.get<{}, AxiosResponse<{}>>(
            `${ASSET_MANAGEMENT_API_URL}/fetchNFTTransfers`,
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
            //@ts-ignore
            message: error?.response?.data?.message,
        };
    }
};

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
            //@ts-ignore
            message: error?.response?.data?.message,
        };
    }
};

export const signTransaction = async (params: any) => {
    try {
        const p = await axios.post<{}, AxiosResponse<{}>>(
            `${ASSET_MANAGEMENT_API_URL}/signTransaction`,
            { params }
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


export const fetchGasFees = async (params: any) => {
    try {
        const p = await axios.post<{}, AxiosResponse<{}>>(
            `${ASSET_MANAGEMENT_API_URL}/getGasFees`,
            { params }
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
            //@ts-ignore
            message: error?.response?.data?.message,
        };
    }
};


export const getTokenTransactions = async (
    profileId: any,
    chainId: string,
    tokenAddresses: string
) => {
    try {
        const p = await axios.get<{}, AxiosResponse<{}>>(
            `${ASSET_MANAGEMENT_API_URL}/getTokenTransactions`,
            {
                params: {
                    profileId,
                    chainId,
                    tokenAddresses,
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
            //@ts-ignore
            message: error?.response?.data?.message,
        };
    }
};


export const readFunction = async (params: any) => {
    try {
        const p = await axios.post<{}, AxiosResponse<{}>>(
            `${ASSET_MANAGEMENT_API_URL}/readFunction`,
            { params }
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

export const getTokensMarketPrice = async () => {
    try {
        const chainId = "0";
        const contract = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
        const p = await axios.get<{}, AxiosResponse<{}>>(
            `${ASSET_MANAGEMENT_API_URL}/getTokensMarketPrice?chainId=${chainId}&contract=${contract}`,
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