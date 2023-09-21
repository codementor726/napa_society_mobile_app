import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useRef, useState} from 'react';
import Video from 'react-native-video';
import {
  AwardIcon,
  AwardIconFill,
  CommentIcon,
  CrossIcon,
  EyeIcon,
  GoldenStarIcon,
  HeartIcon,
  MintIcon,
  MuteIcon,
  PlayIcon,
  ShareIcon,
  UnMuteIcon,
} from '../assets/svg';
import {themeColors} from '../theme/colors';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {size} from '../theme/fontstyle';
import {Fontfamily} from '../theme/fontFamily';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectSocialList,
  selectSocialMintedPostList,
} from '../store/selectors/socialArtSelector';
import {useNavigation} from '@react-navigation/native';
import {selectFollowingList} from '../store/selectors/FollowingSelector';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {calculateAmountEarned, isAlreadyFan} from '../utils/helper';
import {
  setSocialData,
  setSocialMintedPost,
  setSocialVideoUploaded,
} from '../store/slices/socialArtData';
import LiveTime from './LiveTimer';
import {selectTokenPrice} from '../store/selectors/TokenList';
import {selectMintedPostList} from '../store/selectors/MintedSNFT';
import {awardPost, likePost, updatePostViewCount} from '../services/PostApi';
import {SCREENS} from '../typings/screens-enums';
import moment from 'moment';
import {useToast} from 'react-native-toast-notifications';
import {fetchProfileData} from '../store/slices/ProfileDetail';
import {selectActiveWalletAddress} from '../store/selectors/NapaAccount';
import {BlurView} from '@react-native-community/blur';
import {LightCrossIcon} from '../assets/svg/LightCrossIcon';
import {createNewMint} from '../utils/mintApi';
import {NAPA_SNFT} from '../utils/addressHelper';
import lodash, {set} from 'lodash';
import ErrorToast from '../common/toasters/ErrorToast';
import SuccessToast from '../common/toasters/SuccessToast';
import Slider from '@react-native-community/slider';
import PauseIcon from '../assets/svg/PauseIcon';

type NapaVideProps = {
  item: any;
  index: any;
  postId: string | undefined;
  setPostData: any;
  paused: number;
  setPaused: any;
  postData: any;
};

const NapaVideos: React.FC<NapaVideProps> = ({
  item,
  index,
  postId,
  setPostData,
  paused,
  setPaused,
  postData,
}) => {
  const toast = useToast();
  const {navigate, goBack} = useNavigation<any>();
  const {height, width} = Dimensions.get('window');
  const socialArt = useSelector(selectSocialList);
  const accountAddress = useSelector(selectActiveWalletAddress);
  const tokenPrice = useSelector(selectTokenPrice);
  const socialMintedPost: any = useSelector(selectSocialMintedPostList);
  const userEmail = useSelector(selectProfileList)?.emailAddress;
  const followingList = useSelector(selectFollowingList);
  const profileId = useSelector(selectProfileList)?.profileId;
  const mintedPost = useSelector(selectMintedPostList);
  const getProfileDetails = useSelector(selectProfileList);
  const videoRef = useRef<any>(null);
  const [muted, setMuted] = useState(false);
  const [hasCountedHalfwayView, setHasCountedHalfwayView] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buffer, setBuffer] = useState(true);
  const [isPause, setIsPause] = useState(false);
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(0);
  const [playableDuration, setPlayableDuration] = useState(0);

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

  const handleUpdateViews = async (e: any, postId: any) => {
    setCurrentTime(e.currentTime);
    setPlayableDuration(e.playableDuration);
    if (buffer) {
      setBuffer(false);
    }
    const halfDuration = e.playableDuration / 2;
    if (e.currentTime >= halfDuration && !hasCountedHalfwayView) {
      setHasCountedHalfwayView(true);
      const temp = socialArt?.length ? [...socialArt] : [];
      const updatedTemp = JSON.parse(JSON.stringify(temp));
      const postIndex = updatedTemp.findIndex((p: any) => p.postId == postId);
      if (postIndex > -1) {
        updatedTemp[postIndex]['views'] = updatedTemp[postIndex]['views'] + 1;
        dispatch(setSocialData([...updatedTemp]));
        // setPostData([...updatedTemp]);
      }
      const {data, error}: any = await updatePostViewCount(postId);
      if (error) {
        setHasCountedHalfwayView(false);
        return;
      }
    }
  };

  const handleLikePost = async (
    postId: any,
    likedByUsers: string | undefined,
  ) => {
    console.log('like');
    let existResults = likedByUsers ? likedByUsers?.split(',') : [];
    if (profileId) {
      if (existResults.includes(profileId)) {
        existResults = existResults.filter(id => profileId != id);
      } else {
        existResults.push(profileId);
      }
    }
    const temp: any = socialArt.length ? [...socialArt] : [];
    const updateTemp = JSON.parse(JSON.stringify(temp));
    const postIndex = updateTemp.findIndex((p: any) => p.postId == postId);
    if (postIndex > -1) {
      updateTemp[postIndex].likedByUsers = String(existResults);
      dispatch(setSocialData([...updateTemp]));
    }
    // if (setPostData) {
    //   setPostData((prev: any) => {
    //     return {
    //       ...prev,
    //       likedByUsers: String(existResults),
    //     };
    //   });
    // }
    await likePost(profileId, postId);
  };

  const isYouLiked = (likedByUsers: string | null) => {
    const users = likedByUsers ? likedByUsers?.split(',') : [];
    return users.includes(profileId) ? true : false;
  };

  const showPostLikeCount = (likedByUsers: any) => {
    let likes: any = likedByUsers ? likedByUsers?.split(',') : [];
    return likes?.length > 0 ? likes?.length : [];
  };

  const showPostCommentCount = (commentByUsers: string | null) => {
    const comments = commentByUsers ? commentByUsers.split(',') : [];
    return comments.length > 0 ? comments.length : '';
  };

  const isTimerExpired = (timestamp: any) => {
    const postTime = moment(timestamp).add(1, 'hours').format();
    const countDownTime = new Date(postTime).getTime();
    const duration = countDownTime - new Date().getTime();
    if (duration < 0) {
      toast.show(<ErrorToast message="You cannot award an expired posts" />, {
        placement: 'top',
      });
    }
    return duration < 0 ? true : false;
  };

  const handlePostAward = async (awardsByUsers: any) => {
    if (!getProfileDetails?.profileName) {
      return navigate(SCREENS.CREATEPROFILE);
    }
    let existResults = awardsByUsers ? awardsByUsers.split(',') : [];
    if (existResults.includes(getProfileDetails.profileId as string)) {
      toast.show(
        <ErrorToast message="You have already given award to this post!" />,
        {
          placement: 'top',
        },
      );
      return;
    }
    if (getProfileDetails.profileId == profileId) {
      toast.show(
        <ErrorToast message="Sorry but you cannot award your own post!" />,
        {
          placement: 'top',
        },
      );
      return;
    }
    if (getProfileDetails.awardsEarned > 0) {
      const temp: any = socialArt.length ? [...socialArt] : [];
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
        <ErrorToast message="oops! you are not able to give rewards now." />,
        {
          placement: 'top',
        },
      );
      return;
    }
  };

  const isYouAward = (awardsByUsers: string | null) => {
    const users = awardsByUsers ? awardsByUsers?.split(',') : [];
    return users.includes(profileId) ? true : false;
  };

  const showPostAwardsCount = (awardsByUsers: string | null) => {
    const awards = awardsByUsers ? awardsByUsers.split(',') : [];
    return awards.length > 0 ? awards.length : '';
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
      type: 'image/jpeg',
      name: 'my_file_name.jpeg',
    });
    setLoading(true);
    const {error, message}: any = await createNewMint(formData);
    const temp = lodash.uniqBy(socialArt, 'postId').map((post: any) => post);
    const isFound = temp.findIndex(
      (p: any) => p.postId == socialMintedPost.postId,
    );
    let updateTemp = JSON.parse(JSON.stringify(temp));
    if (isFound != -1) {
      updateTemp[isFound].minted = 'true';
      updateTemp[isFound].mintedTimeStamp = moment(new Date()).format(
        'YYYY-MM-DDTHH:mm:ssZ',
      );
      dispatch(setSocialData([...updateTemp]));
    }
    // if (setPostDetail) {
    //   setPostDetail((prev: any) => {
    //     return {
    //       ...prev,
    //       minted: 'true',
    //       mintedTimeStamp: moment(new Date()).format('YYYY-MM-DDTHH:mm:ssZ'),
    //     };
    //   });
    // }
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
    setModalOpen(false);
    toast.show(
      <SuccessToast message="Your post is now minted and live for 12 hours" />,
      {
        placement: 'top',
      },
    );
    // navigate(SCREENS.SOCIALART);
  };

  return (
    <>
      <View
        key={index}
        style={{
          backgroundColor: themeColors.secondaryColor,
          width: Dimensions.get('window').width,
          flex: 1,
          height: Platform.OS == 'ios' ? height : height * 1,
        }}>
        <Video
          source={{uri: item?.videoURL}} // the video file
          paused={index == paused ? isPause : true}
          repeat={true}
          style={{
            width: width,
            height: '100%',
            position: 'absolute',
          }}
          muted={!muted}
          ref={videoRef}
          resizeMode={'cover'}
          onProgress={e => handleUpdateViews(e, item?.postId)}
          onEnd={() => setHasCountedHalfwayView(false)}
          onBuffer={() => setBuffer(true)}
          onLoad={() => setBuffer(false)}
          poster={item?.thumbnail}
          posterResizeMode="cover"
        />
        <View style={{top: '16%', zIndex: 999}}>
          <Slider
            value={currentTime}
            style={{width: '100%', height: Platform.OS == 'ios' ? 0 : 10}}
            minimumValue={0}
            maximumValue={playableDuration}
            minimumTrackTintColor={themeColors.aquaColor}
            maximumTrackTintColor="#fff"
            thumbTintColor={themeColors.aquaColor}
          />
        </View>
        {buffer && (
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
        <View
          style={{
            height: '100%',
            position: 'absolute',
            width: width,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 20,
              marginTop:
                Platform.OS == 'ios' ? moderateScale(50) : moderateScale(20),
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => goBack()}
              style={{width: '20%', height: 40, zIndex: 9999}}>
              <CrossIcon width={30} height={30} />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginRight: moderateScale(10),
                  alignItems: 'center',
                }}>
                <EyeIcon width={15} height={15} />
                <Text style={[styles.heading1, {marginLeft: moderateScale(5)}]}>
                  {item?.views}
                </Text>
              </View>
              <View style={styles.postTimeDiv}>
                <View style={styles.liveContainer}>
                  {item?.mintedTimeStamp ? (
                    <LiveTime
                      targetTime={new Date(item?.mintedTimeStamp).setHours(
                        new Date(item?.mintedTimeStamp).getHours() + 1,
                      )}
                      postId={postId}
                      isExpired={item?.isExpired}
                      tokenPrice={tokenPrice}
                      amountEarned={handleGetAmountEarned(postId)}
                    />
                  ) : (
                    <Text style={{color: 'white'}}>Not Minted</Text>
                  )}
                </View>
              </View>
              <View style={{width: '5%'}}>
                {!muted ? (
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
                )}
              </View>
            </View>
          </View>
          <View
            style={{
              alignItems: 'flex-end',
            }}>
            {isPause ? (
              <TouchableOpacity onPress={() => setIsPause(false)}>
                <PlayIcon />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setIsPause(true)}
                style={{
                  marginRight: moderateScale(20),
                  marginTop: moderateScale(20),
                }}>
                <PauseIcon />
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              marginHorizontal: moderateScale(10),
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{width: 50, height: 50, borderRadius: 100}}
                source={{
                  uri:
                    item?.avatar ||
                    'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png',
                }}
              />
              {isAlreadyFan(followingList, item?.profileId) && (
                <View style={{position: 'absolute', left: -15, top: -5}}>
                  <GoldenStarIcon width="35" height="35" />
                </View>
              )}
              <Text style={{color: 'white', marginLeft: moderateScale(10)}}>
                {item?.profileName}
              </Text>
            </View>
            <View style={{marginTop: moderateScale(10)}}>
              <Text
                style={{
                  color: 'white',
                  marginLeft: moderateScale(10),
                  fontSize: size.lg,
                  fontWeight: '500',
                  fontFamily: Fontfamily.Avenier,
                }}>
                {item?.videoTitle}
              </Text>
              <Text
                style={{
                  color: 'white',
                  marginLeft: moderateScale(10),
                  fontSize: size.lg,
                  fontWeight: '500',
                  fontFamily: Fontfamily.Avenier,
                }}>
                {item?.videoCaption}
              </Text>
            </View>
          </View>
          <View style={[styles.postIcons, {zIndex: 9999}]}>
            <Pressable
              style={styles.postIconsItems}
              onPress={() => handleLikePost(item?.postId, item?.likedByUsers)}>
              {isYouLiked(item?.likedByUsers as string) ? (
                <HeartIcon color={'#16E6EF'} fill={'#16E6EF'} />
              ) : (
                <HeartIcon fill="transparent" />
              )}
              <Text
                style={
                  isYouLiked(item?.likedByUsers as string)
                    ? styles.postIconsTextFill
                    : styles.postIconsText
                }>
                {showPostLikeCount(item?.likedByUsers)}
              </Text>
            </Pressable>
            <Pressable
              style={styles.postIconsItems}
              onPress={() =>
                navigate(SCREENS.POSTCOMMENTS, {
                  postId: item?.postId,
                })
              }>
              <CommentIcon />
              <Text style={styles.postIconsText}>
                {showPostCommentCount(item?.commentByUser as string)}
              </Text>
            </Pressable>
            <Pressable
              disabled={item?.minted == 'false'}
              style={styles.postIconsItems}
              onPress={() => {
                if (!isTimerExpired(item?.mintedTimeStamp)) {
                  handlePostAward(item?.awardsByUsers);
                }
              }}>
              {item?.minted == 'false' ? (
                <AwardIcon color="grey" />
              ) : isYouAward(item?.awardsByUsers as string) ? (
                <AwardIconFill />
              ) : (
                <AwardIcon />
              )}
              <Text
                style={
                  item?.minted == 'false'
                    ? styles.postIconsText1
                    : isYouAward(item?.awardsByUsers as string)
                    ? styles.awardIconsTextfill
                    : styles.postIconsText
                }>
                {showPostAwardsCount(item?.awardsByUsers as string)}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                if (
                  item?.minted == 'false' &&
                  profileId == item?.profileId &&
                  item?.accountId == accountAddress
                ) {
                  dispatch(
                    setSocialMintedPost({
                      postId: item?.postId,
                      videoType: item?.videoType,
                      accountId: item?.accountId,
                      profileId: item?.profileId,
                      videoTitle: item?.videoTitle,
                      videoCaption: item?.videoCaption,
                      videoURL: item?.videoURL,
                      minted: false,
                      genre: '',
                      videoThumbnail: item?.thumbnail,
                    }),
                  );
                  dispatch(setSocialVideoUploaded(false));
                  // navigate(SCREENS.MINTINGPOST);
                  setModalOpen(true);
                }
              }}
              style={styles.postIconsItems}>
              {profileId == profileId && item?.accountId == accountAddress ? (
                <MintIcon
                  color={
                    item?.minted == 'true' ? themeColors.garyColor : 'white'
                  }
                />
              ) : (
                <MintIcon
                  color={
                    item?.minted == 'true'
                      ? themeColors.aquaColor
                      : themeColors.garyColor
                  }
                  fill={item?.minted == 'true' ? themeColors.aquaColor : 'none'}
                />
              )}
              {item?.minted == 'true' ? (
                <Text style={styles.postIconsTextMinted}>Minted</Text>
              ) : profileId == profileId &&
                item?.accountId == accountAddress ? (
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
      </View>

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
    </>
  );
};

export default memo(NapaVideos);

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
    marginBottom: moderateScale(25),
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
