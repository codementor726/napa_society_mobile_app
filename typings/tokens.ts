export type CreateNewTokenResponse = {
  data: TokenResponse;
  code: number;
  responseTime: string;
};

export type TokenResponse = {
  rowId: string;
  tokenId: string;
  profileId: string;
  napaWalletAccount: string;
  networkId: string;
  decimals: string;
  name: string;
  symbol: string;
};

export type GetTokenResponse = {
  data: TokenResponse;
  code: number;
  responseTime: string;
};

export type NewToken = {
  profileId: string;
  napaWalletAccount: string;
  networkId: string;
  decimals: string;
  name: string;
  symbol: string;
};

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

export type GetNewLiveStream = {
  data: string;
  code: number;
  responseTime: string;
};

export type GetNewLiveStreamItem = {
  data: string;
  code: number;
  responseTime: string;
};

export type EditLiveStreamItem = {
  data: string;
  code: number;
  responseTime: string;
};
export type DeleteLiveStreamItem = {
  data: string;
  code: number;
  responseTime: string;
};

export type UpdateLiveStream = {
  data: string;
  code: number;
  responseTime: string;
};

export type PurchaseStreamItem = {
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

export type streamListItem = {
  data: string;
  code: number;
  responseTime: string;
};

export type joinerstreamListItem = {
  data: string;
  code: number;
  responseTime: string;
};
export type GetCommentsResponse = {
  data: CommentResponse;
  code: number;
  responseTime: string;
};
export type CommentResponse = {
  commentId: string;
  commentText: string;
  postId: string;
  profileId: string;
  profileName: string;
  avatar: string;
  replies: CommentResponse[];
  likedByUsers: string;
  parentCommentId: string;
  createdAt: string;
  updatedAt: string;
};

export type LiveStreamMessageList = {
  data: string;
  code: number;
  responseTime: string;
};

export type AddStreamMessage = {
  data: string;
  code: number;
  responseTime: string;
};

export type LiveStreamTypeEnum = {
  Pending: 0;
  Started: 1;
  Ended: 2;
  Abandoned: 3;
};

export type ThreadUserList = {
  data: string;
  code: number;
  responseTime: string;
};

export type ThreadList = {
  data: string;
  code: number;
  responseTime: string;
};

export type addThread = {
  data: string;
  code: number;
  responseTime: string;
};

export type addMessageThread = {
  data: string;
  code: number;
  responseTime: string;
};

export type ThreadMessageList = {
  data: string;
  code: number;
  responseTime: string;
};
