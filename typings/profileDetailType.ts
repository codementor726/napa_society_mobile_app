export type ProfileDetails = {
    profileId: string;
    profileName: string;
    primaryCurrency: string;
    accountNumber: string;
    language: string;
    timezone: string;
    accountType: string;
    bio: string;
    createdAt: string;
    updatedAt: string;
    avatar: string;
    awardsEarned: number;
    awardsGiven: number;
    netAwardsAvailable: number;
};


export type ProfileInitialState = {
    data: ProfileDetails;
    loading: boolean;
    error: string
};