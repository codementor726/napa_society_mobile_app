export type CreateNewPostResponse = {
    data: Post;
    code: number;
    responseTime: string;
};

export type GetPostsResponse = {
    data: Post;
    code: number;
    responseTime: string;
};

export type GetMostViewedPostsResponse = {
    data: MostViewedPosts;
    code: number;
    responseTime: string;
};

export type GetLikePostResponse = {
    data: string;
    code: number;
    responseTime: string;
};

export type GetAwardPostResponse = {
    data: string;
    code: number;
    responseTime: string;
};

export type NewPost = {
    videoTitle: string;
    videoFile: string | ArrayBuffer | null;
    videoType: string;
    videoCaption: string;
    accountId: string;
    minted: string;
    userName: string;
    userImage: string;
};

export type Post = {
    postId: string;
    videoTitle: string;
    videoURL: string;
    videoType: string;
    videoCaption: string;
    accountId: string;
    postedBy: string;
    profileId: string;
    minted: string;
    createdAt: string;
    updatedAt: string;
    profileName: string;
    avatar: string;
    likedByUsers: string | null;
    commentByUser: string | null;
    awardsByUsers: string;
    mintedTimeStamp: string;
    isExpired: string;
};

export type MostViewedPosts = {
    postId: string;
    awards?: number;
    likes?: number;
    comments?: number;
    userName: string;
    avatar: string;
    mintId: string;
    thumbnail: string;
};

export type activePost = {
    postId: string;
    type: string;
    index: number | null;
};

export type SinglePost = {
    row_id?: number
    postId?: string
    videoURL?: string
    mobileVideoURL?: string
    videoThumbnail?: string
    videoType?: string
    videoTitle?: string
    videoCaption?: string
    accountId?: string
    postedBy?: string
    profileId?: string
    minted?: string
    likedByUsers?: string
    awardsByUsers?: string
    commentByUser?: string
    mintedTimeStamp?: string
    createdAt?: string
    updatedAt?: string
    isExpired?: string
    genre?: string
    views?: number
    profileName?: string
    avatar?: string
}

export type EarningDataI = {
    rowId?: number
    viewsUUID?: string
    postId?: string
    prev_7_days_views?: number
    prev_7_days_views_date?: string
    prev_14_days_views?: number
    prev_14_days_views_date?: string
    prev_21_days_views?: number
    prev_21_days_views_date?: string
    prev_28_days_views?: number
    prev_28_days_views_date?: string
    prev_35_days_views?: number
    prev_35_days_views_date?: string
    prev_42_days_views?: number
    prev_42_days_views_date?: string
    prev_allTime_views?: number
    prev_allTime_views_date?: string
    weekCount?: number
    createdAt?: string
    updatedAt?: string
    rolling_7_Days?: number
  }