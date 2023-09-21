import axios, { AxiosResponse } from 'axios';
import { SOCIAL_ART_API_URL } from '../const/Url';
import {
  addMessageThread,
  AddStreamMessage,
  addThread,
  CreateNewPostResponse,
  DeleteLiveStreamItem,
  EditLiveStreamItem,
  GetAwardPostResponse,
  GetCommentsResponse,
  GetLikePostResponse,
  GetMostViewedPostsResponse,
  GetNewLiveStream,
  GetNewLiveStreamItem,
  PurchaseStreamItem,
  UpdateLiveStream,
} from '../typings/tokens';

export const getAllSocialArtPost = async (obj: any) => {
  try {
    const socialArtPosts = await axios.get<AxiosResponse>(
      `${SOCIAL_ART_API_URL}/user/social/video/list?offset=${obj.offset}&profileId=${obj.profileId}`,
    );
    return socialArtPosts.data.data;
  } catch (error) { }
};

export const createNewPost = async (post: any) => {
  try {
    const p = await axios.post<{}, AxiosResponse<CreateNewPostResponse>>(
      `${SOCIAL_ART_API_URL}/user/social/video/new`,
      post,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error: any) {
    return {
      data: null,
      error: true,
      message: error?.response?.data?.message,
    };
  }
};

export const likePost = async (profileId: string, postId: string) => {
  try {
    const p = await axios.post<{}, AxiosResponse<GetLikePostResponse>>(
      `${SOCIAL_ART_API_URL}/user/social/video/like`,
      {
        profileId,
        postId,
      },
    );
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error: any) {
    return {
      data: null,
      error: true,
      message: error?.response?.data?.message,
    };
  }
};

export const awardPost = async (profileId: string, postId: string) => {
  try {
    const p = await axios.post<{}, AxiosResponse<GetAwardPostResponse>>(
      `${SOCIAL_ART_API_URL}/user/social/video/award`,
      {
        profileId,
        postId,
      },
    );
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error: any) {
    return {
      data: null,
      error: true,
      message: error?.response?.data?.message,
    };
  }
};

export const newLiveStream = async (
  profileId: string,
  walletAddress: string,
  streamTitle: string,
) => {
  try {
    const p = await axios.post<{}, AxiosResponse<GetNewLiveStream>>(
      `${SOCIAL_ART_API_URL}/user/liveStream/newLiveStream`,
      {
        profileId,
        walletAddress,
        streamTitle,
      },
    );
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error: any) {
    return {
      data: null,
      error: true,
      message: error?.response?.data?.message,
    };
  }
};

export const updateLiveStream = async (
  streamId: string,
  streamStatus: number,
) => {
  try {
    let p = await axios.patch<{}, AxiosResponse<UpdateLiveStream>>(
      `${SOCIAL_ART_API_URL}/user/liveStream/update`,
      {
        streamId,
        streamStatus,
      },
    );
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error: any) {
    return {
      data: null,
      error: true,
      message: error?.response?.data?.message,
    };
  }
};

export const updateLiveStreamUpdatedAt = async (
  streamId: string,
  updatedAt: any,
) => {
  try {
    let p = await axios.patch<{}, AxiosResponse<UpdateLiveStream>>(
      `${SOCIAL_ART_API_URL}/user/liveStream/update`,
      {
        streamId,
        updatedAt,
      },
    );
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error: any) {
    return {
      data: null,
      error: true,
      message: error?.response?.data?.message,
    };
  }
};

export const increaseLiveStreamUserCount = async (streamId: string) => {
  try {
    let p = await axios.patch<{}, AxiosResponse<UpdateLiveStream>>(
      `${SOCIAL_ART_API_URL}/user/liveStream/increaseUserCount`,
      {
        streamId,
      },
    );
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error: any) {
    return {
      data: null,
      error: true,
      message: error?.response?.data?.message,
    };
  }
};

export const decreaseLiveStreamUserCount = async (streamId: string) => {
  try {
    let p = await axios.patch<{}, AxiosResponse<UpdateLiveStream>>(
      `${SOCIAL_ART_API_URL}/user/liveStream/decreaseUserCount`,
      {
        streamId,
      },
    );
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error: any) {
    return {
      data: null,
      error: true,
      message: error?.response?.data?.message,
    };
  }
};

export const getMostViewedPosts = async () => {
  try {
    const p = await axios.get<{}, AxiosResponse<GetMostViewedPostsResponse>>(
      `${SOCIAL_ART_API_URL}/user/social/video/mostviewed`,
    );
    return {
      data: p?.data?.data,
      message: '',
      error: false,
    };
  } catch (error) {
    return {
      data: null,
      error: true,
      // message: error?.response?.data?.message,
    };
  }
};

export const newLiveStreamItem = async (body: any) => {
  try {
    const p = await axios.post<{}, AxiosResponse<GetNewLiveStreamItem>>(
      `${SOCIAL_ART_API_URL}/user/socialrt/liveStreamItem/new_saleitem`,
      body,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error: any) {
    return {
      data: null,
      error: true,
      message: error?.response?.data?.message,
    };
  }
};

interface purchaseStreamProps {
  itemUuid: string;
  buyerProfileId: string;
  buyerWallet: string;
}

export const purchaseLiveStreamItem = async (body: purchaseStreamProps) => {
  try {
    const p = await axios.patch<{}, AxiosResponse<PurchaseStreamItem>>(
      `${SOCIAL_ART_API_URL}/user/socialrt/liveStreamItem/purchase`,
      body,
    );
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error: any) {
    return {
      data: null,
      error: true,
      message: error?.response?.data?.message,
    };
  }
};

export const updateLiveStreamItem = async (body: any) => {
  try {
    const p = await axios.patch<{}, AxiosResponse<EditLiveStreamItem>>(
      `${SOCIAL_ART_API_URL}/user/socialrt/liveStreamItem/update`,
      body,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error: any) {
    return {
      data: null,
      error: true,
      message: error?.response?.data?.message,
    };
  }
};
export const getAllComments = async (postId: string) => {
  try {
    const p = await axios.get<{}, AxiosResponse<GetCommentsResponse>>(
      `${SOCIAL_ART_API_URL}/user/social/comment/${postId}`,
    );
    return {
      data: p?.data?.data,
      message: '',
      postId: postId,
    };
  } catch (error: any) {
    return {
      data: null,
      error: true,
      message: error?.response?.data?.message,
    };
  }
};

export const deleteLiveStreamItem = async (itemUuid: string) => {
  try {
    const p = await axios.post<{}, AxiosResponse<DeleteLiveStreamItem>>(
      `${SOCIAL_ART_API_URL}/user/socialrt/liveStreamItem/delete/${itemUuid}`,
    );
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error: any) {
    return {
      data: null,
      error: true,
      message: error?.response?.data?.message,
    };
  }
};

export const addLiveStreamMessage = async (
  streamId: string,
  profileId: string,
  text: string,
) => {
  try {
    let p = await axios.post<{}, AxiosResponse<AddStreamMessage>>(
      `${SOCIAL_ART_API_URL}/user/liveStream/newMessage`,
      {
        streamId,
        profileId,
        text,
      },
    );
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error: any) {
    return {
      data: null,
      error: true,
      message: error?.response?.data?.message,
    };
  }
};

export const addNewThread = async (
  profileId: string,
  threadUserIds: [],
  streamTitle: string,
) => {
  try {
    const p = await axios.post<{}, AxiosResponse<addThread>>(
      `${SOCIAL_ART_API_URL}/user/thread/create`,
      {
        profileId,
        threadUserIds,
        streamTitle,
      },
    );
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error: any) {
    return {
      data: null,
      error: true,
      message: error?.response?.data?.message,
    };
  }
};

export const sendNewMessage = async (
  profileId: string,
  threadId: string | undefined,
  receiverProfileId: string | undefined,
  text: string,
) => {
  try {
    let body = {
      profileId,
      threadId,
      text,
      receiverProfileId: '',
    };
    if (receiverProfileId) {
      body = {
        profileId,
        receiverProfileId,
        text,
        threadId: '',
      };
    }
    const p = await axios.post<{}, AxiosResponse<addMessageThread>>(
      `${SOCIAL_ART_API_URL}/user/thread/newMessage`,
      body,
    );
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error: any) {
    return {
      data: null,
      error: true,
      message: error?.response?.data?.message,
    };
  }
};

export const updatePostViewCount = async (postId: any) => {
  try {
    const p = await axios.post<{}, AxiosResponse<addMessageThread>>(
      `${SOCIAL_ART_API_URL}/user/social/video/views?postId=${postId}`);
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error: any) {
    return {
      data: null,
      error: true,
      message: error?.response?.data?.message,
    };
  }
}

export const getAllProfilePost = async (obj: any) => {
  try {
    const p = await axios.get<AxiosResponse>(
      `${SOCIAL_ART_API_URL}/user/social/video/mylist?offset=${obj.offset}&profileId=${obj.profileId}`,
    );
    return p?.data;
  } catch (error: any) {
    return {
      data: null,
      error: true,
      message: error?.response?.data?.message,
    };
  }
};

export const getSingleSocialArtPost = async (postId: string) => {
  try {
    const socialArtPost = await axios.get<AxiosResponse>(
      `${SOCIAL_ART_API_URL}/user/social/video/detail/${postId}`,
    );
    return {
      data: socialArtPost?.data?.data,
      message: '',
      error: false,
    };

  } catch (error: any) {
    return {
      data: null,
      error: true,
      message: error?.response?.data?.message
    }
  }
};

export const getPostViewsRollings = async (postId: string) => {
  try {
    const p = await axios.get<{}, AxiosResponse<GetMostViewedPostsResponse>>(
      `${SOCIAL_ART_API_URL}/user/social/video/views?postId=${postId}`
    );
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error: any) {
    return {
      data: null,
      error: true,
      message: error?.response?.data?.message,
    };
  }
};