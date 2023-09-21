import { readFunction, signTransaction } from "../services/AssetManagement";
import { NAPA_SNFT } from "./addressHelper";
import snftABI from "../connectivity/abis/snft.json"
import { transactionType } from "../typings/web3types";

// 3) setApprovalForAll
export const setApprovalForAll = async (_id: number | undefined, _chainId: string | undefined, _profileId: string, _operator: string, _approved: boolean): Promise<any> => {
    let res: any = { response: "-1", transactionHash: "-1" };
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(snftABI),
                    contractAddress: JSON.stringify(NAPA_SNFT),
                    functionName: JSON.stringify("setApprovalForAll"),
                    allParams: JSON.stringify([_operator, _approved])
                }
            };
            //params will be injected within API CALL
            console.log("Wait Transaction is under process....");
            const response: any = await signTransaction(params);
            console.log("setApprovalForAll Reponse from  NAPA WALLET", response);
            const transactionHash: any = await response?.data?.data.transactionSuccess.response.hash;
            res.response = await response;
            res.transactionHash = await transactionHash;
            return res;
            //
        }
        //  else if (_id == 1) {
        //     const contract = await snftC(_signer);
        //     const response: any = await contract.setApprovalForAll(_operator, _approved);
        //     const processedTransaction = await response.wait();
        //     res.response = processedTransaction;
        //     console.log("setApprovalForAll Reponse from  Metamask", processedTransaction);
        //     const transactionHash: any = await processedTransaction?.transactionHash;
        //     res.transactionHash = transactionHash;
        //     return res;
        // } 
        else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling setApprovalForAll() of SNFT Token");
        return res;
    }
}

//read functions
// 1) _exists
export const _exists = async (
    // _signer: any,
    _id: number | undefined, _chainId: string | undefined, _profileId: string, _tokenId: string): Promise<boolean> => {
    let res: any;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(snftABI),
                    contractAddress: JSON.stringify(NAPA_SNFT as string),
                    functionName: JSON.stringify("_exists"),
                    allParams: JSON.stringify([_tokenId])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            console.log("_exists response from USDTTOKEN", response?.data?.data?.transactionSuccess?.response)
            const value = response?.data?.data?.transactionSuccess?.response;
            console.log("Exists response from SNFT from NAPAWallet", value)
            res = await value;
            return res;
            //
        }
        // else if (_id == 1) {
        //     const contract = await snftC(_signer);
        //     const response: any = await contract._exists(_tokenId);
        //     res = response;
        //     return res;
        // }
        else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling _exists() of SNFT Token");
        return res;
    }
}

// 2) lazyMint
export const lazyMint = async (
    // _signer: any, 
    _id: number | undefined, _chainId: string | undefined, _profileId: string, _tokenId: string, _seller: string, _salePrice: string, _tokenSelect: string, _tokenUri: string, _transferToNapa: boolean, ethAmount: string): Promise<transactionType> => {
    let res: transactionType = { response: "-1", transactionHash: "-1" };
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(snftABI),
                    contractAddress: JSON.stringify(NAPA_SNFT as string),
                    functionName: JSON.stringify("BuySNFT"),
                    allParams: JSON.stringify([_tokenId, _seller, _salePrice, _tokenSelect, _tokenUri, _transferToNapa, { value: ethAmount }])
                }
            };
            //params will be injected within API CALL
            const response: any = await signTransaction(params);
            console.log("LazyMint Response from  NAPA WALLET", response);
            const transactionHash: any = await response?.data?.data.transactionSuccess.response.hash;
            res.response = await response;
            res.transactionHash = await transactionHash;
            return res;
            //
        }
        // else if (_id == 1) {
        //     const contract = await snftC(_signer);
        //     const response: any = await contract.lazyMint(_tokenId, _seller, _salePrice, _tokenSelect, _tokenUri, _transferToNapa, { value: ethAmount });
        //     const processedTransaction = await response.wait();
        //     res.response = processedTransaction;
        //     console.log("LazyMint Response for SNFT from  Metamask", processedTransaction);
        //     const transactionHash: any = await processedTransaction?.transactionHash;
        //     res.transactionHash = transactionHash;
        //     return res;
        // } 
        else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling lazyMint() of SNFT Token");
        return res;
    }
}

// 6) getFees
export const getFees = async (
    // _signer: any,
    _id: number | undefined, _chainId: string | undefined, _profileId: string) => {
    let res: any;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(snftABI),
                    contractAddress: JSON.stringify(NAPA_SNFT as string),
                    functionName: JSON.stringify("getFees"),
                    allParams: JSON.stringify([])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            console.log("getFees response from NAPA WALLET", response?.data?.data?.transactionSuccess?.response)
            res = await response?.data?.data?.transactionSuccess?.response?.hex;
            return res;
        }
        // else if (_id == 1) {
        //     const contract = await snftC(_signer);
        //     res = await contract.getFees();
        //     console.log((res._hex).toString(), "getFees response from Metamask");
        //     return (res._hex).toString();
        // } 
        else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling getFees() of SNFT Token");
    }
}