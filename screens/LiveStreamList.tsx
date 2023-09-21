import {FlatList, StyleSheet} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import LiveStreamCard from '../components/LiveStreamCard';
import {useGetLiveStreamList} from '../services/GetImportedToken';
import {SOCIAL_ART_WEBSOCKET_URL} from '../const/Url';
import {useNavigation} from '@react-navigation/native';

const LiveStreamList = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [refetch, setRefetch] = useState(1);
  const {dataList} = useGetLiveStreamList(refetch);
  const socialArtSocketRef = useRef<any>(null);
  const [userLiveStreamList, setUserLiveStreamList] = useState([]);

  useEffect(() => {
    setUserLiveStreamList(dataList);
  }, [dataList]);

  const _handleRefresh = () => {
    setRefreshing(true);
    setRefetch(refetch + 1);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const connectToSocialArt = async () => {
    if (socialArtSocketRef.current == null) {
      socialArtSocketRef.current = new WebSocket(SOCIAL_ART_WEBSOCKET_URL);
      socialArtSocketRef.current.addEventListener('message', ({data}: any) => {
        const response = JSON.parse(data);
        if (
          response?.event === 'stream-update' ||
          response?.event === 'stream-end'
        ) {
          const rowId = parseInt(response?.data?.rowId, 10);
          setRefetch(refetch + rowId);
        }
      });
    }
  };

  useEffect(() => {
    let timeout: any;
    connectToSocialArt();
    if (socialArtSocketRef.current) {
      socialArtSocketRef.current.onclose = (e: any) => {
        console.log(
          'Social Art Socket is closed. Reconnect will be attempted in 1 second.',
          e.reason,
        );
        timeout = setTimeout(() => {
          if (!socialArtSocketRef.current) {
            connectToSocialArt();
          }
        }, 1000);
      };
    }
    return () => {
      if (typeof timeout !== undefined) {
        clearTimeout(timeout);
      }
      if (socialArtSocketRef.current) {
        socialArtSocketRef.current.close();
        socialArtSocketRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);
  return (
    <FlatList
      data={userLiveStreamList}
      numColumns={2}
      keyExtractor={(item: any) => item.id}
      contentContainerStyle={styles.contentContainerStyle}
      renderItem={({item}) => <LiveStreamCard item={item} />}
      refreshing={refreshing}
      onRefresh={_handleRefresh}
    />
  );
};

export default LiveStreamList;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 80,
  },
});
