/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  TouchableOpacity,
  Modal,
  ImageBackground,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {
  AwardIcon,
  AwardIconFill,
  CommentIcon,
  HeartIcon,
  MintIcon,
  UnMuteIcon,
  PlayIcon,
  ShareIcon,
  MuteIcon,
  EyeIcon,
  GoldenStarIcon,
} from '../assets/svg';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {SCREENS} from '../typings/screens-enums';
import {
  Post,
  setSocialData,
  setSocialMintedPost,
  setSocialVideoUploaded,
} from '../store/slices/socialArtData';
import Video from 'react-native-video';
import {awardPost, likePost, updatePostViewCount} from '../services/PostApi';
import {
  selectSocialList,
  selectSocialMintedPostList,
} from '../store/selectors/socialArtSelector';
import {useDispatch, useSelector} from 'react-redux';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import moment from 'moment';
import {fetchProfileData} from '../store/slices/ProfileDetail';
import {BlurView} from '@react-native-community/blur';
import {LightCrossIcon} from '../assets/svg/LightCrossIcon';
import imageIndex from '../assets/imageIndex';
import {useToast} from 'react-native-toast-notifications';
import {selectActiveWalletAddress} from '../store/selectors/NapaAccount';
import LiveTime from './LiveTimer';
import {selectMintedPostList} from '../store/selectors/MintedSNFT';
import {calculateAmountEarned, isAlreadyFan} from '../utils/helper';
import {selectTokenPrice} from '../store/selectors/TokenList';
import lodash, {set} from 'lodash';
import {NAPA_SNFT} from '../utils/addressHelper';
import {createNewMint} from '../utils/mintApi';
import {getProfileDetail, handleGetMintedPost} from '../services/AuthApi';
import {UserProfileTypes} from '../const/types';
import {becomeFan, exitClub} from '../services/FollowAndFollowing';
import {selectFollowingList} from '../store/selectors/FollowingSelector';
import {setFollowing} from '../store/slices/Following';
import RNFS from 'react-native-fs';
import WarningToast from '../common/toasters/WarningToast';
import ErrorToast from '../common/toasters/ErrorToast';
import SuccessToast from '../common/toasters/SuccessToast';
import FullscreenIcon from '../assets/svg/FullscreenIcon';
const SocialArtPosts: React.FC<Post> = ({
  avatar,
  profileName,
  createdAt,
  videoTitle,
  videoCaption,
  videoURL,
  paused,
  likedByUsers,
  profileId,
  postId,
  onLayout,
  onload,
  awardsByUsers,
  minted,
  mintedTimeStamp,
  accountId,
  videoType,
  isExpired,
  index,
  currentIndex,
  commentByUser,
  videoThumbnail,
  views,
  setPostDetail,
}) => {
  const {navigate} = useNavigation<any>();
  const dispatch = useDispatch();
  const socialArtData = useSelector(selectSocialList);
  const userProfile = useSelector(selectProfileList)?.profileId;
  const userEmail = useSelector(selectProfileList)?.emailAddress;
  const getProfileDetails = useSelector(selectProfileList);
  const [isAddPostVsible, setIsAddPostVisible] = useState<boolean>(false);
  const toast = useToast();
  const mintedPost = useSelector(selectMintedPostList);
  const tokenPrice = useSelector(selectTokenPrice);
  const accountAddress = useSelector(selectActiveWalletAddress);
  const videoRef: any = useRef(null);
  const [playCount, setPlayCount] = useState(0);
  const [stopVideo, setStopVideo] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [muted, setMuted] = useState(false);
  const maxPlays = 4;
  const [modalOpen, setModalOpen] = useState(false);
  const socialMintedPost: any = useSelector(selectSocialMintedPostList);
  const [loading, setLoading] = useState(false);
  const [hasCountedHalfwayView, setHasCountedHalfwayView] = useState(false);
  const [becomeFanLoading, setBecomeFanLoading] = useState(false);
  const followingList = useSelector(selectFollowingList);
  const [userProfileData, setUserProfileData] =
    useState<UserProfileTypes | null>();
  const [userMintedPostData, setMintedPostData] = useState<any>([]);
  const [VideoPaused, setVideoPaused] = useState(false);
  // Mar 23, 12:30AM
  const createdAtFormat = moment(createdAt).format('MMM DD, hh:mm A');
  useEffect(() => {
    if (profileId && isAddPostVsible) {
      getProfileDetail({profileId, emailAddress: ''})
        .then(data => {
          setUserProfileData(data);
        })
        .catch(error => {
          console.error('error message', error.message);
        });
      handleGetMintedPost(profileId)
        .then((data: any) => {
          setMintedPostData(data?.data);
        })
        .catch((error: any) => {
          console.error('error message', error.message);
        });
    }
  }, [profileId, isAddPostVsible]);

  // ==check Post live time
  const isTimerExpired = (timestamp: any) => {
    const postTime = moment(timestamp).add(1, 'hours').format();
    const countDownTime = new Date(postTime).getTime();
    const duration = countDownTime - new Date().getTime();
    if (duration < 0) {
      toast.show(<WarningToast message="You cannot award an expired posts" />, {
        placement: 'top',
      });
    }
    return duration < 0 ? true : false;
  };

  const showPostLikeCount = (likedByUsers: any) => {
    let likes: any = likedByUsers ? likedByUsers?.split(',') : [];
    return likes?.length > 0 ? likes?.length : [];
  };

  const handleLikePost = async (
    postId: string | undefined,
    likedByUsers: string | undefined,
  ) => {
    console.log('like');
    let existResults = likedByUsers ? likedByUsers?.split(',') : [];
    if (userProfile) {
      if (existResults.includes(userProfile)) {
        existResults = existResults.filter(id => userProfile != id);
      } else {
        existResults.push(userProfile);
      }
    }
    const temp: any = socialArtData.length ? [...socialArtData] : [];
    const updateTemp = JSON.parse(JSON.stringify(temp));
    const postIndex = updateTemp.findIndex((p: any) => p.postId == postId);
    if (postIndex > -1) {
      updateTemp[postIndex].likedByUsers = String(existResults);
      dispatch(setSocialData([...updateTemp]));
    }
    if (setPostDetail) {
      setPostDetail((prev: any) => {
        return {
          ...prev,
          likedByUsers: String(existResults),
        };
      });
    }
    // @ts-ignore
    await likePost(userProfile, postId);
  };

  const showPostAwardsCount = (awardsByUsers: string | null) => {
    const awards = awardsByUsers ? awardsByUsers.split(',') : [];
    return awards.length > 0 ? awards.length : '';
  };
  // handlePostAward Api
  const handlePostAward = async () => {
    // if (!getProfileDetails.accountNumber) {
    //   return
    // toast.error(
    //   CustomToastWithLink({
    //     icon: WalletNeedsToConnected,
    //     title: ToastTitle.WALLET_NEEDS_TO_CONNECTED,
    //     description: ToastDescription.WALLET_NEEDS_TO_CONNECTED,
    //     time: 'Now',
    //   })
    // );
    // return push(`/wallet?redirectTo=${pathname.split('/')[1]}`);
    // }
    if (!getProfileDetails?.profileName) {
      //   toast.error(
      //     CustomToastWithLink({
      //       icon: ErrorIcon,
      //       title: ToastTitle.PROFILE_NEEDS_TO_BE_CREATED,
      //       description: ToastDescription.PROFILE_NEEDS_TO_BE_CREATED,
      //       time: 'Now',
      //     })
      //   );
      return navigate(SCREENS.CREATEPROFILE);
    }
    let existResults = awardsByUsers ? awardsByUsers.split(',') : [];
    if (existResults.includes(getProfileDetails.profileId as string)) {
      toast.show(
        <WarningToast message="You have already given award to this post!" />,
        {
          placement: 'top',
        },
      );
      return;
    }
    if (getProfileDetails.profileId == profileId) {
      toast.show(
        <WarningToast message="Sorry but you cannot award your own post!" />,
        {
          placement: 'top',
        },
      );
      return;
    }
    if (getProfileDetails.awardsEarned > 0) {
      const temp: any = socialArtData.length ? [...socialArtData] : [];
      const updateTemp = JSON.parse(JSON.stringify(temp));
      const postIndex = updateTemp.findIndex((p: any) => p.postId == postId);
      existResults.push(getProfileDetails.profileId as string);
      if (postIndex > -1) {
        updateTemp[postIndex].awardsByUsers = String(existResults);
        dispatch(setSocialData([...updateTemp]));
      }
      await awardPost(getProfileDetails?.profileId, postId as string);
      dispatch(fetchProfileData({userEmail}));
      return;
    } else {
      toast.show(
        <WarningToast message="oops! you are not able to give rewards now." />,
        {
          placement: 'top',
        },
      );
      return;
    }
  };

  const handleGetAmountEarned = (postId: any) => {
    let amountEarned = '0.00';
    const mintPost = mintedPost?.find((p: any) => p.postId == postId);
    if (mintPost) {
      amountEarned = calculateAmountEarned(
        tokenPrice,
        mintPost.payoutsCategory,
      );
    }
    return amountEarned;
  };

  const isYouLiked = (likedByUsers: string | null) => {
    const users = likedByUsers ? likedByUsers?.split(',') : [];
    return users.includes(userProfile) ? true : false;
  };

  const isYouAward = (awardsByUsers: string | null) => {
    const users = awardsByUsers ? awardsByUsers?.split(',') : [];
    return users.includes(userProfile) ? true : false;
  };

  const onEnd = () => {
    if (videoEnded && Platform.OS == 'android') {
      setVideoEnded(true);
      setPlayCount(4);
      return;
    }
    if (playCount < maxPlays) {
      if (Platform.OS == 'ios') {
        setVideoEnded(false);
        setStopVideo(false);
        setPlayCount(prevCount => ++prevCount);
        videoRef.current.seek(0);
        setHasCountedHalfwayView(false);
      }
      if (Platform.OS == 'android') {
        setVideoEnded(false);
        setStopVideo(true);
        setPlayCount(prevCount => ++prevCount);
        videoRef.current.seek(0);
        videoRef.current.setNativeProps({paused: false});
        setHasCountedHalfwayView(false);
      }
    } else {
      setVideoEnded(true);
    }
  };
  const showPostCommentCount = (commentByUsers: string | null) => {
    const comments = commentByUsers ? commentByUsers.split(',') : [];
    return comments.length > 0 ? comments.length : '';
  };
  const fetchThreadMessageList = async () => {
    setLoading(true);
    try {
      navigate(SCREENS.CHATSCREEN, {
        receiverProfileId: profileId,
      });
      setIsAddPostVisible(false);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching thread message list:', error);
    }
  };

  const handleMintNowPost = async () => {
    const formData = new FormData();
    formData.append('postId', socialMintedPost.postId);
    formData.append('videoType', socialMintedPost.videoType);
    formData.append('generatorId', socialMintedPost.accountId);
    formData.append('profileId', socialMintedPost.profileId);
    formData.append('title', socialMintedPost.videoTitle);
    formData.append('network', '');
    formData.append('status', '0');
    formData.append('SNFTTitle', socialMintedPost.videoTitle);
    formData.append('SNFTCollection', 'NAPA Society Collection');
    formData.append('SNFTDescription', socialMintedPost.videoCaption);
    formData.append('location', '');
    formData.append('taggedPeople', '');
    // formData.append('genre', genreSelect.join());
    formData.append('tags', '');
    formData.append('live', '');
    formData.append('payoutApproved', '');
    formData.append('SNFTAddress', NAPA_SNFT);
    formData.append('networkTxId', '');
    formData.append('owner', socialMintedPost.accountId);
    formData.append('thumbnail', {
      uri:
        socialMintedPost?.videoThumbnail ||
        'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png',
      type: 'image/jpg',
      name: 'my_file_name.jpg',
    });
    setLoading(true);
    const {error, message}: any = await createNewMint(formData);
    const temp = lodash
      .uniqBy(socialArtData, 'postId')
      .map((post: any) => post);
    const isFound = temp.findIndex(p => p.postId == socialMintedPost.postId);
    let updateTemp = JSON.parse(JSON.stringify(temp));
    console.log(updateTemp, 'temp before');
    if (isFound != -1) {
      console.log('temp[isFound]', temp[isFound]);
      updateTemp[isFound].minted = 'true';
      updateTemp[isFound].mintedTimeStamp = moment(new Date()).format(
        'YYYY-MM-DDTHH:mm:ssZ',
      );
    }
    if (setPostDetail) {
      setPostDetail((prev: any) => {
        return {
          ...prev,
          minted: 'true',
          mintedTimeStamp: moment(new Date()).format('YYYY-MM-DDTHH:mm:ssZ'),
        };
      });
    }
    dispatch(setSocialData([...updateTemp]));
    if (error) {
      console.log(message, 'message');
      setLoading(false);
      toast.show(<ErrorToast message={message} />, {
        placement: 'top',
      });
      return;
    }
    // dispatch(fetchSocialArt(0));
    setLoading(false);
    toast.show(
      <SuccessToast message="Your post is now minted and live for 12 hours" />,
      {
        placement: 'top',
      },
    );
    setModalOpen(false);
    // navigate(SCREENS.SOCIALART);
  };
  const handleSeeProfile = () => {
    navigate(SCREENS.PROFILE, {profileId: profileId});
    setIsAddPostVisible(false);
  };

  const handleUpdateViews = async (e: any) => {
    if (onBufferLoading) setOnBufferLoading(false);
    const halfDuration = e.playableDuration / 2;
    if (e.currentTime >= halfDuration && !hasCountedHalfwayView) {
      setHasCountedHalfwayView(true);
      const temp = socialArtData.length ? [...socialArtData] : [];
      const updatedTemp = JSON.parse(JSON.stringify(temp));
      const postIndex = updatedTemp.findIndex((p: any) => p.postId == postId);
      if (postIndex > -1) {
        updatedTemp[postIndex]['views'] = updatedTemp[postIndex]['views'] + 1;
        dispatch(setSocialData([...updatedTemp]));
      }
      const {data, error}: any = await updatePostViewCount(postId);
      if (error) {
        setHasCountedHalfwayView(false);
        return;
      }
    }
  };

  const handleBecomeAFan = async () => {
    console.log('handleBecomeAFan');
    setBecomeFanLoading(true);
    const {data, error, message} = await becomeFan(userProfile, profileId);
    if (error) {
      toast.show(<SuccessToast message={message} />, {
        placement: 'top',
      });
      setBecomeFanLoading(false);
      setIsAddPostVisible(false);
      return;
    }
    const temp = followingList?.length ? [...followingList] : [];
    const updateTemp = JSON.parse(JSON.stringify(temp));
    const isFound = updateTemp.findIndex((p: any) => p.profileId == profileId);
    if (isFound == -1) {
      updateTemp.push({
        profileId: profileId,
        profileName: profileName,
        avatar: avatar,
      });
      dispatch(setFollowing(updateTemp));
    }
    setBecomeFanLoading(false);
    setIsAddPostVisible(false);
  };

  const handleExitClub = async () => {
    console.log('handleExitaClub');
    setBecomeFanLoading(true);
    const {data, error, message} = await exitClub(userProfile, profileId);
    if (error) {
      toast.show(<SuccessToast message={message} />, {
        placement: 'top',
      });
      setBecomeFanLoading(false);
      setIsAddPostVisible(false);
      return;
    }
    const temp = followingList?.length ? [...followingList] : [];
    const updateTemp = JSON.parse(JSON.stringify(temp));
    const filteredUpdatedTemp = updateTemp.filter(
      (p: any) => p.profileId != profileId,
    );
    dispatch(setFollowing(filteredUpdatedTemp));
    setBecomeFanLoading(false);
    setIsAddPostVisible(false);
  };

  const videoTitleText: any = videoTitle;
  let truncatedText = videoTitle?.substring(0, 20);
  if (videoTitleText?.length > 20) {
    truncatedText += '...';
  }
  const videoCaptionText: any = videoCaption;
  let videoCaptiontruncatedText = videoTitle?.substring(0, 50);
  if (videoCaptionText?.length > 50) {
    videoCaptiontruncatedText += '...';
  }
  const [videoDimensions, setVideoDimensions] = useState({width: 0, height: 0});
  useEffect(() => {
    // Fetch video dimensions or use a predefined aspect ratio
    const videoWidth = Dimensions.get('window').width;
    const videoHeight = (3 / 4) * videoWidth; // Assuming 16:9 aspect ratio, adjust as needed

    setVideoDimensions({width: videoWidth, height: videoHeight});
  }, []);

  const [onBufferLoading, setOnBufferLoading] = useState(true);

  const isFound = useIsFocused();
  useEffect(() => {
    setVideoPaused(false);
  }, [isFound]);

  return (
    <View style={styles.container}>
      <View style={styles.post}>
        <View
          style={{
            marginHorizontal: moderateScale(6),
            paddingVertical: moderateScale(10),
            opacity: 0.9,
          }}>
          <View style={[styles.videoStyle, {position: 'relative'}]}>
            {videoURL &&
              (Platform.OS == 'ios' ? (
                !VideoPaused ? (
                  <Image
                    style={{
                      width: '100%',
                      height:
                        Dimensions.get('window').width < 337
                          ? verticalScale(410)
                          : verticalScale(400),
                      borderRadius: 24,
                    }}
                    source={
                      videoThumbnail
                        ? {uri: videoThumbnail}
                        : require('../assets/images/blur.png')
                    }
                  />
                ) : (
                  <Video
                    source={{uri: videoURL}}
                    paused={paused}
                    repeat={stopVideo}
                    ref={videoRef}
                    style={{
                      width: '100%',
                      height: verticalScale(400),
                      borderRadius: 24,
                    }}
                    resizeMode={'cover'}
                    onBuffer={() => setOnBufferLoading(true)}
                    volume={1.0}
                    rate={1.0}
                    onEnd={onEnd}
                    muted={!muted}
                    onProgress={e => handleUpdateViews(e)}
                    poster={videoThumbnail}
                    posterResizeMode="cover"
                    onLoad={() => setOnBufferLoading(false)}
                  />
                )
              ) : !VideoPaused ? (
                <Image
                  style={{
                    width: '100%',
                    height:
                      Dimensions.get('window').width < 337
                        ? verticalScale(410)
                        : verticalScale(400),
                    borderRadius: 24,
                  }}
                  source={
                    videoThumbnail
                      ? {uri: videoThumbnail}
                      : require('../assets/images/blur.png')
                  }
                />
              ) : (
                <Video
                  source={{uri: videoURL}}
                  // paused={VideoPaused }
                  paused={(playCount == 4 && videoEnded) || paused}
                  repeat={false}
                  ref={videoRef}
                  style={{
                    width: '100%',
                    height:
                      Dimensions.get('window').width < 337
                        ? verticalScale(410)
                        : verticalScale(400),
                    borderRadius: 24,
                  }}
                  resizeMode={'cover'}
                  volume={1.0}
                  onBuffer={() => setOnBufferLoading(true)}
                  onLoad={() => setOnBufferLoading(false)}
                  rate={1.0}
                  onEnd={onEnd}
                  muted={!muted}
                  onProgress={e => handleUpdateViews(e)}
                  poster={videoThumbnail}
                  posterResizeMode="cover"
                />
              ))}
          </View>
          <View style={[styles.postIcons, {zIndex: 9999}]}>
            <Pressable
              style={styles.postIconsItems}
              onPress={() => handleLikePost(postId, likedByUsers)}>
              {isYouLiked(likedByUsers as string) ? (
                <HeartIcon color={'#16E6EF'} fill={'#16E6EF'} />
              ) : (
                <HeartIcon />
              )}
              <Text
                style={
                  isYouLiked(likedByUsers as string)
                    ? styles.postIconsTextFill
                    : styles.postIconsText
                }>
                {showPostLikeCount(likedByUsers)}
              </Text>
            </Pressable>
            <Pressable
              style={styles.postIconsItems}
              onPress={() =>
                navigate(SCREENS.POSTCOMMENTS, {
                  postId: postId,
                })
              }>
              <CommentIcon />
              <Text style={styles.postIconsText}>
                {showPostCommentCount(commentByUser as string)}
              </Text>
            </Pressable>
            <Pressable
              disabled={minted == 'false'}
              style={styles.postIconsItems}
              onPress={() => {
                if (!isTimerExpired(mintedTimeStamp)) {
                  handlePostAward();
                }
              }}>
              {minted == 'false' ? (
                <AwardIcon color="grey" />
              ) : isYouAward(awardsByUsers as string) ? (
                <AwardIconFill />
              ) : (
                <AwardIcon />
              )}
              <Text
                style={
                  minted == 'false'
                    ? styles.postIconsText1
                    : isYouAward(awardsByUsers as string)
                    ? styles.awardIconsTextfill
                    : styles.postIconsText
                }>
                {showPostAwardsCount(awardsByUsers as string)}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                if (
                  minted == 'false' &&
                  userProfile == profileId &&
                  accountId == accountAddress
                ) {
                  dispatch(
                    setSocialMintedPost({
                      postId,
                      videoType,
                      accountId,
                      profileId,
                      videoTitle,
                      videoCaption,
                      videoURL,
                      minted: false,
                      genre: '',
                      videoThumbnail,
                    }),
                  );
                  dispatch(setSocialVideoUploaded(false));
                  // navigate(SCREENS.MINTINGPOST);
                  setModalOpen(true);
                }
              }}
              style={styles.postIconsItems}>
              {profileId == profileId && accountId == accountAddress ? (
                <MintIcon
                  color={minted == 'true' ? themeColors.aquaColor : 'white'}
                  fill={minted == 'true' ? themeColors.aquaColor : 'none'}
                />
              ) : (
                <MintIcon
                  color={
                    minted == 'true'
                      ? themeColors.aquaColor
                      : themeColors.garyColor
                  }
                  fill={minted == 'true' ? themeColors.aquaColor : 'none'}
                />
              )}
              {minted == 'true' ? (
                <Text style={styles.postIconsTextMinted}>Minted</Text>
              ) : profileId == userProfile && accountId == accountAddress ? (
                <Text style={styles.postIconsText}>Mint</Text>
              ) : (
                <Text style={{color: themeColors.garyColor}}>Mint</Text>
              )}
            </Pressable>
            <Pressable style={styles.postIconsItems}>
              <ShareIcon />
            </Pressable>
          </View>
        </View>

        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '93%',
            justifyContent: 'space-between',
          }}>
          <View style={[styles.postTop, {paddingVertical: 30, zIndex: 200}]}>
            <View style={[styles.postTopView]}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    alignContent: 'center',
                  }}>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginRight: moderateScale(10),
                        marginBottom: 5,
                      }}>
                      <EyeIcon width={15} height={15} />
                      <Text
                        style={[
                          styles.heading1,
                          {marginLeft: moderateScale(5)},
                        ]}>
                        {views}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.postTimeDiv}>
                    <View style={styles.liveContainer}>
                      {mintedTimeStamp ? (
                        <LiveTime
                          targetTime={new Date(mintedTimeStamp).setHours(
                            new Date(mintedTimeStamp).getHours() + 1,
                          )}
                          postId={postId}
                          isExpired={isExpired}
                          tokenPrice={tokenPrice}
                          amountEarned={handleGetAmountEarned(postId)}
                        />
                      ) : (
                        <Text style={{color: 'white'}}>Not Minted</Text>
                      )}
                    </View>
                  </View>
                  <View style={{width: '5%'}}>
                    {!videoEnded &&
                      (!muted ? (
                        <TouchableOpacity
                          onPress={() => setMuted(!muted)}
                          style={{marginBottom: 7}}>
                          <MuteIcon color={themeColors.primaryColor} />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => setMuted(!muted)}
                          style={{marginBottom: 3}}>
                          <UnMuteIcon color={themeColors.primaryColor} />
                        </TouchableOpacity>
                      ))}
                  </View>
                </View>
              </View>
            </View>
          </View>
          {onBufferLoading && VideoPaused && (
            <View
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                right: '50%',
              }}>
              <ActivityIndicator size="large" color="white" />
            </View>
          )}
          {!VideoPaused && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 999,
                marginTop: moderateScale(100),
                height: '10%',
              }}>
              <TouchableOpacity onPress={() => setVideoPaused(true)}>
                <PlayIcon />
              </TouchableOpacity>
            </View>
          )}

          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}>
            {playCount == 4 && videoEnded && (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  height: '100%',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    // if (VideoPaused) {
                    //   setVideoPaused(!VideoPaused);
                    //   return;
                    // }
                    if (Platform.OS == 'ios') {
                      setPlayCount(3);
                      videoRef.current.seek(0);
                      setVideoEnded(false);
                    }
                    if (Platform.OS == 'android') {
                      setPlayCount(3);
                      // videoRef.current.seek(0);
                      setVideoEnded(false);
                    }
                  }}>
                  <PlayIcon />
                </TouchableOpacity>
              </View>
            )}
            {/* {VideoPaused && (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  height: '100%',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    if (VideoPaused) {
                      setVideoPaused(!VideoPaused);
                      return;
                    }
                    if (Platform.OS == 'ios') {
                      setPlayCount(3);
                      videoRef.current.seek(0);
                      setVideoEnded(false);
                    }
                    if (Platform.OS == 'android') {
                      setPlayCount(3);
                      // videoRef.current.seek(0);
                      setVideoEnded(false);
                    }
                  }}>
                  <PlayIcon />
                </TouchableOpacity>
              </View>
            )} */}
            {/* {!videoEnded &&
              (!muted ? (
                <TouchableOpacity
                  onPress={() => setMuted(!muted)}
                  style={{
                    position: 'absolute',
                    alignItems: 'flex-end',
                    width: '100%',
                    paddingHorizontal: moderateScale(30),
                    paddingVertical: moderateScale(20),
                    zIndex: 300,
                    top: '15%',
                  }}>
                  <MuteIcon color={themeColors.primaryColor} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setMuted(!muted)}
                  style={{
                    position: 'absolute',
                    alignItems: 'flex-end',
                    width: '100%',
                    paddingHorizontal: moderateScale(30),
                    paddingVertical: moderateScale(20),
                    zIndex: 300,
                    top: '15%',
                  }}>
                  <UnMuteIcon color={themeColors.primaryColor} />
                </TouchableOpacity>
              ))} */}
          </View>

          <View style={[styles.postBottom, {paddingVertical: 20}]}>
            <View
              style={[
                styles.profilebottom,
                {paddingVertical: 20, zIndex: 200},
              ]}>
              <View style={[styles.postTopView]}>
                <View style={{position: 'relative'}}>
                  <TouchableOpacity onPress={() => setIsAddPostVisible(true)}>
                    <Image
                      style={styles.postTopImage}
                      source={{
                        uri:
                          avatar ||
                          'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png',
                      }}
                    />
                  </TouchableOpacity>
                  {isAlreadyFan(followingList, profileId) && (
                    <View style={{position: 'absolute', left: -15, top: -5}}>
                      <GoldenStarIcon width="35" height="35" />
                    </View>
                  )}
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <View
                    style={{
                      paddingRight: 20,
                      marginBottom: -3,
                    }}>
                    <Text style={styles.heading} numberOfLines={1}>
                      {profileName}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    {/* <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text style={styles.heading1}>{createdAtFormat}</Text>
                    </View> */}
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text style={styles.postBottomSerpentive}>
                  {videoTitleText}
                </Text>
                <Text style={styles.postBottomText}>{videoCaptionText}</Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigate(SCREENS.NAPAFULLVIDEOS, {postId: postId})
                }>
                <FullscreenIcon />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isAddPostVsible}
        onRequestClose={() => {
          setIsAddPostVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={10}
            overlayColor="transparent"
            reducedTransparencyFallbackColor="white"
          />
          <View style={styles.modalMainContainer}>
            <View style={styles.modalChildContainer}>
              <Image
                style={styles.imageStyle}
                source={{
                  uri:
                    userProfileData?.avatar ||
                    'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png',
                }}
              />
              <Text style={styles.usernameStyle}>
                {userProfileData?.profileName}
              </Text>
              <Text style={styles.description}>{userProfileData?.bio}</Text>
              {userMintedPostData ? (
                <ImageBackground
                  source={{
                    uri:
                      userMintedPostData?.thumbnail ||
                      'https://napa-vod-service-source71e471f1-13xaaaxvv76pu.s3.ap-southeast-1.amazonaws.com/assets01/dda4fa44-bc70-4e22-a5d1-afa82f529ba7.png',
                  }}
                  style={styles.backgroundImage}
                  imageStyle={{borderRadius: 24}}>
                  {/* <View style={styles.rowContainer}>
                  <View style={styles.highestEarningContainer}>
                    <Text style={styles.highestEarningLabel}>
                      Highest Earning
                    </Text>
                  </View>
                  <View style={styles.earnedView}>
                    <View style={styles.napaIconView}>
                      <Image
                        source={imageIndex.napaIcon}
                        style={styles.napaIconStyle}
                      />
                    </View>
                    <Text style={styles.earnedLabel}>24.56 Earned</Text>
                  </View>
                </View> */}
                  <View style={styles.footerView}>
                    <Text style={styles.labelStyle}>
                      {userMintedPostData?.SNFTTitle}
                    </Text>
                  </View>
                </ImageBackground>
              ) : (
                <ImageBackground
                  source={require('../assets/images/napa_icon_black.png')}
                  style={styles.backgroundImage}
                  imageStyle={{borderRadius: 24}}>
                  {/* <View style={styles.rowContainer}>
                    <View style={styles.highestEarningContainer}>
                      <Text style={styles.highestEarningLabel}>
                        Highest Earning
                      </Text>
                    </View>
                    <View style={styles.earnedView}>
                      <View style={styles.napaIconView}>
                        <Image
                          source={imageIndex.napaIcon}
                          style={styles.napaIconStyle}
                        />
                      </View>
                      <Text style={styles.earnedLabel}>24.56 Earned</Text>
                    </View>
                  </View> */}
                  <View style={styles.footerView}>
                    <Text style={styles.labelStyle}></Text>
                  </View>
                </ImageBackground>
              )}
            </View>
            <View style={styles.bottomStyle}>
              <View style={styles.profileView}>
                <Image
                  source={imageIndex.userProfileIcon}
                  style={styles.profileIcon}
                />
                <Text
                  style={styles.subtitleStyle}
                  suppressHighlighting={false}
                  onPress={handleSeeProfile}>
                  See Profile
                </Text>
              </View>
              {profileId != userProfile && (
                <View style={styles.profileView}>
                  <Image
                    source={imageIndex.chatIcon}
                    style={styles.profileIcon}
                  />
                  <Text
                    style={styles.subtitleStyle}
                    suppressHighlighting={false}
                    // disabled={true}
                    onPress={fetchThreadMessageList}>
                    {loading ? (
                      <ActivityIndicator
                        size="small"
                        color={themeColors.primaryColor}
                      />
                    ) : (
                      ' Send Message'
                    )}
                  </Text>
                </View>
              )}
              {profileId != userProfile && (
                <View style={styles.profileView}>
                  <Image
                    source={imageIndex.starIcon}
                    style={styles.profileIcon}
                  />
                  {isAlreadyFan(followingList, profileId) ? (
                    <Text
                      disabled={becomeFanLoading}
                      style={styles.subtitleStyle}
                      onPress={handleExitClub}>
                      Unfollow
                    </Text>
                  ) : (
                    <Text
                      disabled={becomeFanLoading}
                      style={styles.subtitleStyle}
                      onPress={handleBecomeAFan}>
                      Follow
                    </Text>
                  )}
                </View>
              )}
              <TouchableOpacity
                onPress={() => setIsAddPostVisible(false)}
                style={styles.crossStyle}>
                <LightCrossIcon />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {modalOpen && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalOpen}
          onRequestClose={() => {
            setModalOpen(false);
          }}>
          <View style={styles.modalContainer}>
            <BlurView
              style={styles.absolute}
              blurType="light"
              blurAmount={10}
              overlayColor="transparent"
              reducedTransparencyFallbackColor="white"
            />
            <View style={styles.modalMainContainer}>
              <TouchableOpacity
                disabled={loading}
                onPress={() => handleMintNowPost()}
                style={styles.buttonView}>
                <Text style={styles.subtitleStyle}>Mint Now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={loading}
                style={styles.buttonView}
                onPress={() => {
                  navigate(SCREENS.MINTINGPOST);
                  setModalOpen(false);
                }}>
                <Text style={styles.subtitleStyle}>Advanced Mint</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={loading}
                onPress={() => setModalOpen(false)}
                style={styles.crossStyle}>
                <LightCrossIcon />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default SocialArtPosts;
const styles = StyleSheet.create({
  labelStyle: {
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: 18,
    color: 'white',
    width: moderateScale(185),
  },
  footerView: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 16,
  },
  earnedLabel: {
    fontFamily: Fontfamily.Avenier,
    fontSize: 18,
    color: 'white',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16,
  },
  highestEarningLabel: {
    fontSize: 12,
    color: themeColors.black,
    fontFamily: Fontfamily.Avenier,
    paddingHorizontal: 8,
  },
  highestEarningContainer: {
    backgroundColor: themeColors.aquaColor,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  backgroundImage: {
    width: moderateScale(359),
    height: moderateScale(214),
    borderRadius: 10,
    marginTop: 34,
    alignSelf: 'center',
  },
  description: {
    fontSize: 14,
    fontFamily: Fontfamily.Avenier,
    color: 'white',
    textAlign: 'center',
    marginHorizontal: 24,
    marginTop: 13,
  },
  bottomStyle: {
    justifyContent: 'flex-end',
    flex: 1,
    alignItems: 'center',
  },
  usernameStyle: {
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: 24,
    color: 'white',
    lineHeight: 26,
    textAlign: 'center',
    width: 165,
    alignSelf: 'center',
    marginTop: 15,
  },
  imageStyle: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    alignSelf: 'center',
  },
  modalChildContainer: {
    flex: 1,
    marginTop: 30,
  },
  modalMainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  titleStyle: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.xlg,
    color: themeColors.primaryColor,
    textAlign: 'center',
  },
  subtitleStyle: {
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.lg,
    color: themeColors.primaryColor,
    textAlign: 'center',
  },
  crossStyle: {
    marginVertical: moderateScale(25),
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
  },
  container: {
    marginTop: moderateScale(6),
    // paddingHorizontal: moderateScale(8),
  },
  bgImage: {
    height: moderateScale(250),
    borderRadius: 24,
    padding: moderateScale(15),
  },
  post: {
    alignContent: 'space-between',
    justifyContent: 'space-between',
    // height: '100%',
  },
  postTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
    alignContent: 'center',
  },
  profilebottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postTopView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  postTopImage: {
    borderRadius: 24,
    marginRight: 15,
    height: verticalScale(40),
    width: verticalScale(40),
  },
  heading: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.default,
  },
  heading1: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.s,
  },
  postTimeDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    marginRight: moderateScale(10),
  },
  time: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.s,
    fontWeight: '500',
  },
  postBottom: {
    alignContent: 'flex-end',
    paddingHorizontal: moderateScale(18),
    marginBottom: moderateScale(10),
  },
  minted: {
    backgroundColor: themeColors.aquaColor,
    width: verticalScale(60),
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(5),
    borderRadius: 24,
    marginBottom: moderateScale(10),
  },
  mintedText: {
    color: themeColors.secondaryColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.s,
  },
  postBottomSerpentive: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.lg,
    fontWeight: '400',
  },
  postBottomText: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.md,
    fontWeight: '500',
    lineHeight: 16.8,
    paddingTop: moderateScale(10),
  },
  postIcons: {
    marginTop: moderateScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: moderateScale(12),
  },
  postIconsItems: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postIconsTextMinted: {
    color: themeColors.aquaColor,
    marginLeft: moderateScale(5),
    fontFamily: Fontfamily.Avenier,
    fontWeight: '400',
    fontSize: size.default,
  },
  postIconsText: {
    color: themeColors.primaryColor,
    marginLeft: moderateScale(5),
    fontFamily: Fontfamily.Avenier,
    fontWeight: '400',
    fontSize: size.default,
  },
  awardIconsTextfill: {
    color: themeColors.aquaColor,
    marginLeft: moderateScale(5),
    fontFamily: Fontfamily.Avenier,
    fontWeight: '400',
    fontSize: size.default,
  },
  postIconsTextFill: {
    color: themeColors.aquaColor,
    marginLeft: moderateScale(5),
    fontFamily: Fontfamily.Avenier,
    fontWeight: '400',
    fontSize: size.default,
  },
  postIconsText1: {
    color: themeColors.garyColor,
    marginLeft: moderateScale(5),
    fontFamily: Fontfamily.Avenier,
    fontWeight: '400',
    fontSize: size.default,
  },
  liveContainer: {
    backgroundColor: themeColors.darkGray,
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(3),
    borderRadius: 100,
    marginBottom: moderateScale(5),
  },
  videoStyle: {
    width: '100%',
    height:
      Dimensions.get('window').width < 337
        ? verticalScale(410)
        : verticalScale(400),
    borderRadius: 24,
    // alignSelf: 'center',
    position: 'relative',
    resizeMode: 'cover',
  },
  napaIconView: {
    height: 24,
    width: 24,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeColors.aquaColor,
    marginRight: 12,
  },
  earnedView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  napaIconStyle: {
    height: 10,
    width: 13,
  },
  profileView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(22),
  },
  profileIcon: {
    height: 20,
    width: 20,
    marginRight: 12,
  },
  buttonView: {
    height: moderateScale(35),
    // width: moderateScale(100),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(22),
  },
});
