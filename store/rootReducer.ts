import { combineReducers } from "@reduxjs/toolkit";
import { imageReducer } from "./slices/image";
import { profileDetailData } from "./slices/ProfileDetail";
import { socialArtPostData } from "./slices/socialArtData";
import { authorizeReducer } from "./slices/QrAuthorize";
import { accountData } from "./slices/NapaAccount";
import { tokenList } from "./slices/TokenList";
import { transactionHistoryList } from "./slices/TransactionHistory";
import { MintedPostData } from "./slices/MintedSNFT";
import { GenreData } from "./slices/GetGenre";
import { getMostViewedposts } from "./slices/getMostViewedPosts";
import { PostCommentsData } from "./slices/Postcomments";
import { MarketPlaceDetailData } from "./slices/MarketPlaceItem";
import { NftsAndSnftsData } from "./slices/NftsAndSnfts";
import { getRecentEventsData } from "./slices/Events";

import { followerData } from "./slices/Followers";
import { FollowingData } from "./slices/Following";

import { getTotalNapaUsersCountData } from "./slices/NapauserCount";
import { CreateUserProfileData } from "./slices/CreateUserProfile";


const rootReducers = combineReducers({
    image: imageReducer,
    socialArtPostData: socialArtPostData,
    profileDetailData: profileDetailData,
    authorizeData: authorizeReducer,
    accountData: accountData,
    tokenList: tokenList,
    transactionHistoryList: transactionHistoryList,
    MintedPostData: MintedPostData,
    GenreData: GenreData,
    getMostViewedPostsData: getMostViewedposts,
    getPostComments: PostCommentsData,
    MarketPlaceDetailData: MarketPlaceDetailData,
    NftsAndSnftsData: NftsAndSnftsData,
    getRecentEventsData: getRecentEventsData,
    followerData: followerData,
    FollowingData: FollowingData,
    getTotalNapaUsersCountData: getTotalNapaUsersCountData,
    CreateUserProfileData: CreateUserProfileData,
});

export default rootReducers;
