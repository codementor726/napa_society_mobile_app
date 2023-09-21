export type transactionModalType = {
    Title?: string;
    TransactionType?: string;
    Description?: string;
    TransactionID?: string;
    WalletID?: string;
    SpendAmount?: string;
    NetworkFees?: any;
    TotalSpend?: string;
    Congratulations?: string;
    Message?: string;
    confirmTransaction: () => Promise<void>
}