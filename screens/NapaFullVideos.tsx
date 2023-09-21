import {RefreshControl, StatusBar, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectPostDetailPage,
  selectProfileList,
  selectProfilePostData,
} from '../store/selectors/profileDetailSelector';
import {useToast} from 'react-native-toast-notifications';
import {selectSocialList} from '../store/selectors/socialArtSelector';
import {fetchSocialArt, setSocialData} from '../store/slices/socialArtData';
import NapaVideos from '../components/NapaVideos';

const NapaFullVideos = ({route}: any) => {
  const toast = useToast();
  const {postId} = route?.params;
  const socialArt = useSelector(selectSocialList);
  const postDetailPage = useSelector(selectPostDetailPage);
  const profilepostData = useSelector(selectProfilePostData);
  const profileId = useSelector(selectProfileList)?.profileId;
  const videoRef = useRef<any>(null);
  const dispatch = useDispatch();
  const [paused, setPaused] = useState(0);
  const [postData, setPostData] = useState<any>([]);
  const [handleRefresh, setHandleRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const handleSocialArtPost = () => {
    if (postDetailPage) {
      const temp = profilepostData?.length ? [...profilepostData] : [];
      const findPost = temp.find((i: any) => i?.postId === postId);
      const otherPost = temp.filter((i: any) => i?.postId !== postId);
      setPostData([findPost, ...otherPost]);
    } else {
      const temp = socialArt?.length ? [...socialArt] : [];
      const findPost = temp.find((i: any) => i?.postId === postId);
      const otherPost = temp.filter((i: any) => i?.postId !== postId);
      setPostData([findPost, ...otherPost]);
    }
  };

  useEffect(() => {
    if (!handleRefresh) {
      handleSocialArtPost();
    }
  }, [postId, handleRefresh, socialArt]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(setSocialData([]));
    setPostData([]);
    console.log('refresh');
    setHandleRefresh(true);
    setTimeout(() => {
      console.log('refresh time oout');
      dispatch(fetchSocialArt({offset: 0, profileId: profileId}));
      setRefreshing(false);
      setPostData(socialArt);
      setHandleRefresh(true);
    }, 700);
  }, []);

  const onchangeIndex = ({index}: any) => {
    setPaused(index);
  };

  const onEndReached = () => {
    console.log('end');
    if (!postDetailPage) {
      if (socialArt.length > 0) {
        dispatch(
          fetchSocialArt({
            offset: socialArt.length,
            profileId: profileId,
          }),
        );
      }
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <StatusBar backgroundColor={'black'} hidden={true} />
      <SwiperFlatList
        vertical={true}
        data={postData}
        renderItem={({item, index}) => (
          <NapaVideos
            item={item}
            index={index}
            postId={postId}
            setPostData={setPostData}
            paused={paused}
            setPaused={setPaused}
            postData={postData}
          />
        )}
        keyExtractor={item => item?.postId?.toString()}
        onChangeIndex={onchangeIndex}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={onEndReached}
        initialNumToRender={10} // Adjust this value based on your use case
        maxToRenderPerBatch={10}
      />
    </View>
  );
};

export default NapaFullVideos;

const styles = StyleSheet.create({});
