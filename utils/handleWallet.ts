export const whichWalletConnected = (
    // _metaMaskAccount: any,
    _napaWalletAccount: any, _profileId: any, chainId: number): {
        _id: number | undefined,
        _address: any | undefined, _profile: string, _chainId: number
    } => {
    let id;
    let address;
    let profileId = "";
    try {
        if (_napaWalletAccount !== undefined) {
            console.log("Wallet Data: ", { _id: 0, _address: (_napaWalletAccount).toString(), _profile: profileId, _chainId: chainId });
            id = 0;
            profileId = _profileId;
            address = (_napaWalletAccount).toString();
            return { _id: 0, _address: (_napaWalletAccount).toString(), _profile: profileId, _chainId: chainId };
        }
        // else if (((_metaMaskAccount).toString()).length > 0) {
        //     console.log("WLT 2", { _id: 1, _address: (_metaMaskAccount).toString(), _profile: profileId, _chainId: chainId });
        //     id = 1;
        //     address = (_metaMaskAccount).toString();
        //     return { _id: 1, _address: (_metaMaskAccount).toString(), _profile: profileId, _chainId: chainId };
        // } 
        else {
            console.log("Problem in Wallet Connectivity");
        }
    } catch (e: any) {
        console.log(e, "Error in wallet Handler")
    }
    console.log({ _id: id, _address: address, _profile: profileId, _chainId: chainId }, "WALLET DETAILS");
    return { _id: id, _address: address, _profile: profileId, _chainId: chainId };
}