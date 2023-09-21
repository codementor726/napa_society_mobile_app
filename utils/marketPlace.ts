import marketPlaceABI from "../connectivity/abis/marketPlace.json"
import { readFunction, signTransaction } from "../services/AssetManagement";
import { marketIitem, transactionType } from "../typings/web3types";
import { NAPA_MARKETPLACE } from "./addressHelper";
// 3) getFees
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
                    abi: JSON.stringify(marketPlaceABI),
                    contractAddress: JSON.stringify(NAPA_MARKETPLACE),
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
        //  else if (_id == 1) {
        //     const contract = await marketPlaceC(_signer);
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

//3) setSale
export const setSale = async (
    // _signer: any,
    _id: number | undefined, _chainId: string | undefined, _profileId: string, _tokenId: string | number, _price: string | number, _nftContract: string, _paymentMode: string | number, _isCoBatchable: boolean, _ethAmount: string | number): Promise<any> => {
    console.log(_id, _chainId, _profileId, _tokenId, _price, _nftContract, _paymentMode, _isCoBatchable, _ethAmount, "SELLPARAMAS")
    let res: any = { response: "-1", transactionHash: "-1" };
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(marketPlaceABI),
                    contractAddress: JSON.stringify(NAPA_MARKETPLACE),
                    functionName: JSON.stringify("setSale"),
                    allParams: JSON.stringify([_tokenId, _price, _nftContract, _paymentMode, _isCoBatchable, { value: _ethAmount }])
                }
            };
            //params will be injected within API CALL
            const response: any = await signTransaction(params);
            console.log("setSale-napaToken-NAPA_WALLET", response)
            const transactionHash: any = await response?.data?.data.transactionSuccess.response.hash;
            res.response = await response;
            res.transactionHash = await transactionHash;
            return res;
            //
        }
        // else if (_id == 1) {
        //     const contract = await marketPlaceC(_signer);
        //     const response: any = await contract.setSale(_tokenId, _price, _nftContract, _paymentMode, _isCoBatchable, { value: _ethAmount });
        //     const processedTransaction = await response.wait();
        //     res.response = processedTransaction;
        //     console.log("setSale-napaToken-METAMASK", processedTransaction);
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
        console.log(e, "Error while calling setSale() of SNFT");
        return res;
    }
}


// 2) fetchSingleMarketItem
export const _fetchSingleMarketItem = async (
    // _signer: any, 
    _id: number | undefined, _chainId: string | undefined, _profileId: string, _itemId: string | number): Promise<marketIitem> => {
    console.log(_id, _chainId, _profileId, _itemId, "fetch single marketItem params")
    let res: marketIitem = { itemId: 0, isCobatchable: false, nftContract: "0x00", owner: "0x00", paymentMode: -1, price: -1, seller: "0x00", sold: false, tokenId: -1 };
    try {
        if (Number(_itemId) > 0) {
            if (_id == 0) {
                const params: any = {
                    callData: {
                        chainId: _chainId,
                        profileId: _profileId,
                        abi: JSON.stringify(marketPlaceABI),
                        contractAddress: JSON.stringify(NAPA_MARKETPLACE),
                        functionName: JSON.stringify("_fetchSingleMarketItem"),
                        allParams: JSON.stringify([_itemId])
                    }
                };
                //params will be injected within READ API CALL
                const response: any = await readFunction(params);
                const value = await response?.data?.data?.transactionSuccess;
                console.log(value, "_fetchSingleMarketItem by NAPA WALLET");

                let itemId: number = parseInt((value.response[0].hex).toString());
                let nftContract: string = value.response[1];
                let tokenId: number = parseInt((value.response[2].hex).toString());
                let seller: string = value.response[3];
                let owner: string = value.response[4];
                let price: number = parseInt((value.response[5].hex).toString());
                let paymentMode: number = value.response[6];
                let isCobatchable: boolean = value.response[7];
                let sold: boolean = value.response[8];

                res.itemId = itemId;
                res.nftContract = nftContract;
                res.tokenId = tokenId
                res.seller = seller;
                res.owner = owner;
                res.price = price;
                res.paymentMode = paymentMode;
                res.isCobatchable = isCobatchable;
                res.sold = sold;

                console.log(res, "_fetchSingleMarketItem");
                return res;
                //
            }
            //  else if (_id == 1) {
            //     const contract = await marketPlaceC(_signer);
            //     const value: any = await contract._fetchSingleMarketItem(_itemId);
            //     console.log(value, "contractcontractcontract")

            //     let itemId: number = parseInt((value[0]._hex).toString());
            //     let nftContract: string = value[1];
            //     let tokenId: number = parseInt((value[2]._hex).toString());
            //     let seller: string = value[3];
            //     let owner: string = value[4];
            //     let price: number = parseInt((value[5]._hex).toString());
            //     let paymentMode: number = value[6];
            //     let isCobatchable: boolean = value[7];
            //     let sold: boolean = value[8];

            //     res.itemId = itemId;
            //     res.nftContract = nftContract;
            //     res.tokenId = tokenId
            //     res.seller = seller;
            //     res.owner = owner;
            //     res.price = price;
            //     res.paymentMode = paymentMode;
            //     res.isCobatchable = isCobatchable;
            //     res.sold = sold;

            //     console.log(res, "_fetchSingleMarketItem-napaToken-METAMASK");
            //     return res;
            // }
            else {
                console.log("Wrong Wallet Connected");
            }
            return res;
        }
        else {
            console.log("Invalid Item ID");
            return res;
        }
    }
    catch (e) {
        console.log(e, "Error while calling _fetchSingleMarketItem() of SNFT");
        return res;
    }
}

//3) buyNFTToken
export const buyNFTToken = async (
    // _signer: any,
    _id: number | undefined, _chainId: string | undefined, _profileId: string, _tokenId: string | number, _ethValue: string | number, _currencyType: string | number): Promise<transactionType> => {

    let _ethAmount: string | number = 0;

    if (Number(_currencyType) === 2) {
        _ethAmount = _ethValue
    }

    let res: transactionType = { response: "-1", transactionHash: "-1" };
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(marketPlaceABI),
                    contractAddress: JSON.stringify(NAPA_MARKETPLACE),
                    functionName: JSON.stringify("buyNFTToken"),
                    allParams: JSON.stringify([_tokenId, { value: _ethAmount }])
                }
            };
            //params will be injected within API CALL
            const response: any = await signTransaction(params);
            console.log("buyNFTToken-napaToken-NAPA_WALLET", response)
            const transactionHash: any = await response?.data?.data.transactionSuccess.response.hash;
            res.response = await response;
            res.transactionHash = await transactionHash;
            return res;
            //
        }
        // else if (_id == 1) {
        //     const contract = await marketPlaceC(_signer);
        //     const response: any = await contract.buyNFTToken(_tokenId, { value: _ethAmount });
        //     const processedTransaction = await response.wait();
        //     res.response = processedTransaction;
        //     console.log("buyNFTToken-napaToken-METAMASK", processedTransaction);
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
        console.log(e, "Error while calling buyNFTToken() of SNFT");
        return res;
    }
}