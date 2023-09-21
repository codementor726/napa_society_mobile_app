import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Platform,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {ForwardIcon, NapaGrayIcon} from '../assets/svg';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchSocialArt,
  setSocialData,
  setSocialMintedPost,
  setSocialVideoUploaded,
} from '../store/slices/socialArtData';
import {
  selectSocialList,
  selectSocialLoading,
} from '../store/selectors/socialArtSelector';
import SocialArtPosts from './socialArtPosts';
import {Post} from '../typings/tokens';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {SOCIAL_ART_WEBSOCKET_URL} from '../const/Url';
const data = [
  {
    title: 'Post Created',
    subTitle: '0',
  },
  {
    title: 'Minted Posts',
    subTitle: '0',
  },
  {
    title: 'Tokens Earned',
    subTitle: '0',
  },
];

const SocialStoryFeed = () => {
  const dispatch = useDispatch();
  const socialArt = useSelector(selectSocialList);
  const userProfileId = useSelector(selectProfileList)?.profileId;
  const [fetch, setFetch] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [animatedHeight, setAnimatedHeight] = useState(new Animated.Value(0));
  const socialArtSocketRef = useRef<any>(null);
  const socialArtLoading = useSelector(selectSocialLoading);
  const handleToggle = () => {
    if (!collapsed) {
      Animated.timing(animatedHeight, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start();
    }
    setCollapsed(!collapsed);
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(setSocialData([]));
    console.log('refresh');
    setTimeout(() => {
      console.log('refresh time oout');
      dispatch(fetchSocialArt({offset: 0, profileId: userProfileId}));
      setRefreshing(false);
    }, 700);
  }, []);

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / 510); // assuming each video is 350px tall
    if (index !== currentVideoIndex) {
      setCurrentVideoIndex(index);
    }
  };

  const handleGetUpdatedPost = (post: Post, postId: string) => {
    const temp = socialArt.length ? [...socialArt] : [];
    const updatedTemp = JSON.parse(JSON.stringify(temp));
    const postIndex = updatedTemp.findIndex((p: any) => p.postId == postId);
    if (postIndex > -1) {
      updatedTemp[postIndex] = post;
    }
    return dispatch(setSocialData([...updatedTemp]));
  };

  const handleNewPostLikeCount = (likes: any, postId: string) => {
    const temp = socialArt.length ? [...socialArt] : [];
    const updatedTemp = JSON.parse(JSON.stringify(temp));
    const postIndex = updatedTemp.findIndex((p: any) => p.postId == postId);
    if (postIndex > -1) {
      updatedTemp[postIndex].likedByUsers = likes.join();
    }
    dispatch(setSocialData([...updatedTemp]));
  };

  const handleGetUpdatedAwards = (postId: string, rewards: string) => {
    const temp = socialArt.length ? [...socialArt] : [];
    const updatedTemp = JSON.parse(JSON.stringify(temp));
    const postIndex = updatedTemp.findIndex((p: any) => p.postId == postId);
    if (postIndex > -1) {
      //@ts-ignore
      updatedTemp[postIndex].awardsByUsers = rewards;
    }
    dispatch(setSocialData([...updatedTemp]));
  };
  const handleUpdateViews = (post: any) => {
    const temp = socialArt.length ? [...socialArt] : [];
    const updatedTemp = JSON.parse(JSON.stringify(temp));
    const postIndex = updatedTemp.findIndex(
      (p: any) => p.postId == post.postId,
    );
    if (postIndex > -1) {
      updatedTemp[postIndex] = post;
      dispatch(setSocialData([...updatedTemp]));
    }
  };

  const connectToSocialArt = () => {
    if (userProfileId && socialArt && socialArtSocketRef.current == null) {
      socialArtSocketRef.current = new WebSocket(SOCIAL_ART_WEBSOCKET_URL);
      socialArtSocketRef.current.addEventListener('message', ({data}: any) => {
        const response = JSON.parse(data);
        if (response?.event === 'posts') {
          if (response?.posts?.profileId == userProfileId) {
            handleNewPost(response?.posts);
            dispatch(
              setSocialMintedPost({
                postId: response?.posts.postId,
                videoType: response?.posts.videoType,
                accountId: response?.posts.accountId,
                profileId: response?.posts.profileId,
                videoTitle: response?.posts.videoTitle,
                videoCaption: response?.posts.videoCaption,
                videoURL: response?.posts.videoURL,
                minted: true,
                genre: '',
              }),
            );
            dispatch(setSocialVideoUploaded(true));
            console.log('tetetetetetetetet');
          }
        }
        if (response?.event === 'updated-post') {
          handleGetUpdatedPost(response?.post, response?.postId);
        }
        // if (response?.event === 'post-views-count') {
        //   handleUpdateViews(response?.post);
        // }
        // if (response?.event === 'post-likes-count') {
        //   handleNewPostLikeCount(response?.likes, response?.postId);
        // }
        // if (response?.event === 'post-award-count') {
        //   handleGetUpdatedAwards(response?.postId, response?.awards);
        // }
      });
    }
  };

  useEffect(() => {
    connectToSocialArt();
    if (socialArtSocketRef.current) {
      socialArtSocketRef.current.onclose = (e: any) => {
        console.log(
          'Socail Art Socket is closed. Reconnect will be attempted in 1 second.',
          e.reason,
        );
        setTimeout(() => {
          if (socialArtSocketRef.current) {
            connectToSocialArt();
          }
        }, 1000);
      };
    }
    return () => {
      if (socialArtSocketRef.current) {
        socialArtSocketRef.current.close();
        socialArtSocketRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfileId, socialArt]);

  const handleNewPost = (post: any) => {
    const temp = socialArt.length ? [...socialArt] : [];
    const updatedTemp = JSON.parse(JSON.stringify(temp));
    updatedTemp.unshift(post);
    return dispatch(setSocialData([...updatedTemp]));
    // if (socialArt.length) {
    //   const data = [post, ...socialArt];
    //   const filteredPost = data.filter(
    //     (v, i, a) => a.findIndex(v2 => v2?.postId === v?.postId) === i,
    //   );
    //   return dispatch(setSocialData([...filteredPost]));
    // } else {
    //   let data = [];
    //   // @ts-ignore
    //   data.push(post);
    //   return dispatch(setSocialData([...data]));
    // }
  };

  return (
    <>
      <View style={styles.statisticContainer}>
        <Animated.View
          style={[
            {
              transform: [
                {
                  translateX: animatedHeight.interpolate({
                    inputRange: [0, 1],
                    outputRange: [500, 0],
                  }),
                },
              ],
            },
          ]}>
          {collapsed && (
            <View style={styles.statistic}>
              {data.map((item, index) => {
                return (
                  <View key={index}>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      {item.title === 'Tokens Earned' && <NapaGrayIcon />}
                      <Text
                        style={
                          item.title === 'Tokens Earned'
                            ? styles.tokenEarned
                            : styles.subTitle
                        }>
                        {item.subTitle}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </Animated.View>

        {collapsed ? <View style={styles.borderContainer}></View> : null}
        <View style={styles.viewStatistic}>
          {collapsed ? (
            <TouchableOpacity onPress={handleToggle}>
              <Text style={styles.viewStatisticText}>Hide Statistics</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleToggle}>
              <Text style={styles.viewStatisticText}>View Statistics</Text>
            </TouchableOpacity>
          )}
          <ForwardIcon />
        </View>
      </View>
      <View
        style={{
          marginTop: moderateScale(15),
          // paddingHorizontal: moderateScale(17),
          // marginBottom: moderateScale(200),
        }}>
        <ScrollView
          style={{marginBottom: 180}}
          scrollEventThrottle={16}
          onMomentumScrollEnd={({nativeEvent}: any) => {
            const isCloseToBottom =
              nativeEvent.layoutMeasurement.height +
                nativeEvent.contentOffset.y >=
              nativeEvent.contentSize.height - 20;
            if (isCloseToBottom && socialArt.length > fetch) {
              console.log(socialArt?.length, 'socialArt?.length');
              dispatch(
                fetchSocialArt({
                  offset: socialArt?.length,
                  profileId: userProfileId,
                }),
              );
              setFetch(socialArt.length);
            }
          }}
          refreshControl={
            <RefreshControl
              progressBackgroundColor="transparent"
              colors={['white']}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          onScroll={handleScroll}>
          {socialArtLoading && socialArt.length == 0 ? (
            <View style={styles.socialArtLoading}>
              <ActivityIndicator
                size="large"
                color={themeColors.primaryColor}
              />
            </View>
          ) : (
            socialArt && (
              <View
                style={{
                  marginBottom:
                    Platform.OS == 'ios' ? moderateScale(0) : moderateScale(50),
                }}>
                <FlatList
                  data={socialArt}
                  renderItem={({item, index}) => {
                    if (!item.mobileVideoURL) {
                      return null;
                    }
                    return (
                      <SocialArtPosts
                        key={index}
                        avatar={item?.avatar}
                        profileName={item?.profileName}
                        createdAt={item?.createdAt}
                        videoTitle={item?.videoTitle}
                        videoCaption={item?.videoCaption}
                        videoURL={
                          Platform.OS === 'ios'
                            ? item?.videoURL
                            : item?.mobileVideoURL
                        }
                        // paused={index !== currentVideoIndex}
                        paused={false}
                        likedByUsers={item?.likedByUsers}
                        profileId={item?.profileId}
                        postId={item?.postId}
                        awardsByUsers={item?.awardsByUsers}
                        minted={item?.minted}
                        mintedTimeStamp={item?.mintedTimeStamp}
                        accountId={item?.accountId}
                        videoType={item?.videoType}
                        isExpired={item?.isExpired}
                        commentByUser={item?.commentByUser}
                        videoThumbnail={item?.videoThumbnail}
                        index={index}
                        currentIndex={currentVideoIndex}
                        views={item?.views}
                      />
                    );
                  }}
                  keyExtractor={(item, index) => item?.postId + index}
                />
              </View>
            )
          )}
        </ScrollView>
      </View>
    </>
  );
};

export default SocialStoryFeed;
const styles = StyleSheet.create({
  container: {
    height: 100,
  },
  statisticContainer: {
    marginTop: moderateScale(20),
    backgroundColor: themeColors.cardsColor,
    paddingVertical: moderateScale(17),
    marginHorizontal: moderateScale(6),
    borderRadius: 24,
  },
  statistic: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: moderateScale(10),
    paddingHorizontal: moderateScale(17),
  },
  title: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.s,
    fontWeight: '500',
  },
  subTitle: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Grostestk,
    fontSize: size.xlg,
  },
  viewStatistic: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(17),
  },
  borderContainer: {
    height: 1,
    backgroundColor: themeColors.garyColor,

    marginBottom: moderateScale(10),
  },
  viewStatisticText: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.s,
    fontWeight: '500',
  },
  tokenEarned: {
    marginLeft: moderateScale(5),
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Grostestk,
    fontSize: size.xlg,
  },
  socialArtLoading: {
    justifyContent: 'center',
    height: 400,
  },
});
