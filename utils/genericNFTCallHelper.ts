import { signTransaction } from "../services/AssetManagement";
import nftABI from "../connectivity/abis/snft.json"

export const approve = async (_id: number | undefined, _chainId: string | undefined, _profileId: string, _to: string, _tokenId: string, _nftContract: string): Promise<any> => {
    let res: any = { response: "-1", transactionHash: "-1" };
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(nftABI),
                    contractAddress: JSON.stringify(_nftContract),
                    functionName: JSON.stringify("approve"),
                    allParams: JSON.stringify([_to, _tokenId])
                }
            };
            //params will be injected within API CALL
            console.log("Transaction under process for approve() of NFT...");
            const response: any = await signTransaction(params);
            console.log("Approve Reponse for NFT from  NAPA WALLET", response);
            const transactionHash: any = await response?.data?.data.transactionSuccess.response.hash;
            res.response = await response;
            res.transactionHash = await transactionHash;
            return res;
            //
        }
        // else if (_id == 1) {
        //     const contract = await genericNftC(_signer, _nftContract);
        //     const response: any = await contract.approve(_to, _tokenId);
        //     console.log("Transaction under process for approve() of NFT...");
        //     const processedTransaction = await response.wait();
        //     res.response = processedTransaction;
        //     console.log("Approve Reponse for NFT from  Metamask", processedTransaction);
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
        console.log(e, "Error while calling approve() of NFT Token");
        return res;
    }
}