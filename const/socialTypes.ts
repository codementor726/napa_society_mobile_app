export type Post = {
    postId?: string;
    videoTitle?: string;
    videoURL?: string;
    videoType?: string;
    videoCaption?: string;
    accountId?: string;
    profileId?: string;
    minted?: string;
    createdAt?: string;
    updatedAt?: string;
    profileName?: string;
    avatar?: string;
    likedByUsers?: string | null;
    commentByUser?: string | null;
    awardsByUsers?: string;
    mintedTimeStamp?: string;
    isExpired?: string;
};
export type SocialInitialState = {
    data: Post;
    loading: boolean;
    error: string
};