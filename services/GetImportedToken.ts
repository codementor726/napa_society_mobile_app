import axios, {AxiosResponse} from 'axios';
import {
  GetTokenResponse,
  joinerstreamListItem,
  LiveStreamMessageList,
  streamListItem,
  ThreadList,
  ThreadMessageList,
  ThreadUserList,
} from '../typings/tokens';

import {useEffect, useState} from 'react';
import {API_URL, SOCIAL_ART_API_URL} from '../const/Url';

export const getImportedTokens = async (
  napaWalletAccount: string,
  networkId: string,
) => {
  try {
    const p = await axios.get<{}, AxiosResponse<GetTokenResponse>>(
      `${API_URL}/tokens`,
      {
        params: {
          napaWalletAccount,
          networkId,
        },
      },
    );
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error) {
    return {
      data: null,
      error: true,
      //@ts-ignore
      message: error?.response?.data?.message,
    };
  }
};

export const useGetLiveStreamList = (refetch: number) => {
  const [dataList, setDataList] = useState<any>();
  useEffect(() => {
    axios
      .get<any[]>(`${SOCIAL_ART_API_URL}/user/liveStream`)
      .then((res: any) => setDataList(res?.data?.data))
      .catch(() => {
        setDataList([]);
      });
  }, [refetch]);

  return {dataList};
};

export const getLiveStreamUserList = async (
  streamId: string,
  options?: {enabled?: boolean},
) => {
  // Do not call API if streamID is null. Also no error should be returned
  if (!options?.enabled) {
    return {
      data: null,
    };
  }
  try {
    const url = `${SOCIAL_ART_API_URL}/user/socialrt/liveStreamItem?streamId=${streamId}`;
    const p = await axios.get<{}, AxiosResponse<streamListItem>>(url);
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error) {
    return {
      data: [],
      error: true,
      //@ts-ignore
      message: error?.response?.data?.message,
    };
  }
};

export const getLiveStreamInfo = async (
  streamId: string,
  options?: {enabled?: boolean},
) => {
  // Do not call API if streamID is null. Also no error should be returned
  if (!options?.enabled) {
    return {
      data: null,
    };
  }
  try {
    const url = `${SOCIAL_ART_API_URL}/user/liveStream?streamId=${streamId}`;
    const p = await axios.get<{}, AxiosResponse<streamListItem>>(url);
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error) {
    return {
      data: [],
      error: true,
      //@ts-ignore
      message: error?.response?.data?.message,
    };
  }
};

export const getJoinerLiveStreamList = async (
  itemUuid: string,
  options?: {enabled?: boolean},
) => {
  // Do not call API if streamID is null. Also no error should be returned
  if (!options?.enabled) {
    return {
      data: null,
    };
  }
  try {
    const url = `${SOCIAL_ART_API_URL}/user/socialrt/liveStreamItem?itemUuid=${itemUuid}`;
    const p = await axios.get<{}, AxiosResponse<joinerstreamListItem>>(url);
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error) {
    return {
      data: [],
      error: true,
      //@ts-ignore
      message: error?.response?.data?.message,
    };
  }
};

export const getLiveStreamMessageList = async (streamId: string) => {
  try {
    const url = `${SOCIAL_ART_API_URL}/user/liveStream/messages?streamId=${streamId}`;
    const p = await axios.get<{}, AxiosResponse<LiveStreamMessageList>>(url);
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error) {
    return {
      data: [],
      error: true,
      //@ts-ignore
      message: error?.response?.data?.message,
    };
  }
};

export const getThreadList = async (profileId: string) => {
  try {
    const url = `${SOCIAL_ART_API_URL}/user/thread/getList?profileId=${profileId}`;
    const p = await axios.get<{}, AxiosResponse<ThreadList>>(url);
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error) {
    return {
      data: [],
      error: true,
      //@ts-ignore
      message: error?.response?.data?.message,
    };
  }
};

export const getThreadUserList = async (threadId: string) => {
  try {
    const url = `${SOCIAL_ART_API_URL}/user/thread/getUserList?threadId=${threadId}`;
    const p = await axios.get<{}, AxiosResponse<ThreadUserList>>(url);
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error) {
    return {
      data: [],
      error: true,
      //@ts-ignore
      message: error?.response?.data?.message,
    };
  }
};

export const getThreadMessages = async (
  profileId: string,
  threadId?: string,
  receiverProfileId?: string,
) => {
  try {
    let apiUrl = `${SOCIAL_ART_API_URL}/user/thread/getMessages?profileId=${profileId}&threadId=${threadId}`;
    if (receiverProfileId) {
      apiUrl = `${SOCIAL_ART_API_URL}/user/thread/getMessages?profileId=${profileId}&receiverProfileId=${receiverProfileId}`;
    }
    const p = await axios.get<{}, AxiosResponse<ThreadMessageList>>(apiUrl);
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
