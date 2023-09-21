/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef} from 'react';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {
  BackIcon,
  CalenderIcon,
  CopyLinkIcon,
  DoubleDotIcon,
  LocationIcon,
  SettingsIcon,
  TwitterIcon,
  UserIcon,
} from '../assets/svg';
import Layout from '../common/Layout';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {SCREENS} from '../typings/screens-enums';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {FacebookIcon} from '../assets/svg/FacebookIcon';
import Header from '../common/Header';
import moment from 'moment';
import CTButton from '../common/CTButton';
import {MyProfileTabs} from '../const/profile';
import ProfileTab from '../common/ProfileTab';
import {BlurView} from '@react-native-community/blur';
import {LightCrossIcon} from '../assets/svg/LightCrossIcon';
import {getProfileDetail} from '../services/AuthApi';
import {UserProfileTypes} from '../const/types';
import MailIcon from '../assets/svg/MailIcon';
import {selectFollowingList} from '../store/selectors/FollowingSelector';
import {becomeFan, exitClub} from '../services/FollowAndFollowing';
import {useToast} from 'react-native-toast-notifications';
import {setFollowing} from '../store/slices/Following';
import {isAlreadyFan} from '../utils/helper';
import ProfilePost from '../components/ProfilePost';
import {getAllProfilePost} from '../services/PostApi';
import ErrorToast from '../common/toasters/ErrorToast';
import {
  setpostDetailPage,
  setprofilePostData,
} from '../store/slices/ProfileDetail';

const Profile = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const {navigate, goBack} = useNavigation<any>();
  const scrollViewRef = useRef(null);
  const getProfileDetails = useSelector(selectProfileList);
  const [reportModal, setReportModal] = useState<boolean>(false);
  const route = useRoute<any>();
  const [becomeFanLoading, setBecomeFanLoading] = useState(false);
  const followingList = useSelector(selectFollowingList);
  const toast = useToast();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {profileId}: any = route?.params || getProfileDetails?.profileId;
  const [profilePost, setProfilePost] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [userProfileData, setUserProfileData] =
    useState<UserProfileTypes | null>(null);
  useEffect(() => {
    // if (profileId === getProfileDetails?.profileId) {
    //   setUserProfileData(getProfileDetails);
    // } else {
    if (profileId) {
      getProfileDetail({profileId, emailAddress: ''})
        .then(data => {
          setUserProfileData(data);
        })
        .catch(error => {
          console.error('error message', error.message);
        });
    }
    // }
  }, [profileId, isFocused]);

  useEffect(() => {
    dispatch(setpostDetailPage(true));
  }, [isFocused]);

  const handleBecomeAFan = async () => {
    setBecomeFanLoading(true);
    const {data, error, message} = await becomeFan(
      getProfileDetails?.profileId,
      profileId,
    );
    if (error) {
      toast.show(<ErrorToast message={message} />, {
        placement: 'top',
      });
      setBecomeFanLoading(false);
      console.log(message, 'error');
      return;
    }
    setUserProfileData((prev: any) => {
      return {
        ...prev,
        fans: prev?.fans + 1,
      };
    });
    const temp = followingList?.length ? [...followingList] : [];
    const updateTemp = JSON.parse(JSON.stringify(temp));
    const isFound = updateTemp.findIndex((p: any) => p.profileId == profileId);
    if (isFound == -1) {
      updateTemp.push({
        profileId: userProfileData?.profileId,
        profileName: userProfileData?.profileName,
        avatar: userProfileData?.avatar,
      });
      dispatch(setFollowing(updateTemp));
    }
    setBecomeFanLoading(false);
  };

  const handleExitClub = async () => {
    setBecomeFanLoading(true);
    const {data, error, message} = await exitClub(
      getProfileDetails?.profileId,
      profileId,
    );
    if (error) {
      toast.show(<ErrorToast message={message} />, {
        placement: 'top',
      });
      setBecomeFanLoading(false);
      console.log(message, 'error');
      return;
    }
    setUserProfileData((prev: any) => {
      return {
        ...prev,
        fans: prev?.fans - 1,
      };
    });
    const temp = followingList?.length ? [...followingList] : [];
    const updateTemp = JSON.parse(JSON.stringify(temp));
    const filteredUpdatedTemp = updateTemp.filter(
      (p: any) => p.profileId != profileId,
    );
    dispatch(setFollowing(filteredUpdatedTemp));
    setBecomeFanLoading(false);
  };

  const handleGetProfilePost = async () => {
    setProfilePost([]);
    setLoading(true);
    const {data, error, message}: any = await getAllProfilePost({
      profileId: userProfileData?.profileId,
      offset: 0,
    });
    if (error) {
      // toast.show(<ErrorToast message={message} />, {
      //   placement: 'top',
      // });
      console.log(message, 'error');
      dispatch(setprofilePostData([]));
      setProfilePost([]);
      setLoading(false);
      return;
    }
    dispatch(setprofilePostData(data));
    setProfilePost(data);
    setLoading(false);
  };

  useEffect(() => {
    setProfilePost([]);
    if (userProfileData?.profileId && profileId) {
      handleGetProfilePost();
    }
  }, [userProfileData?.profileId, profileId]);

  const getMorePost = async () => {
    const {data, error, message}: any = await getAllProfilePost({
      profileId: userProfileData?.profileId,
      offset: profilePost?.length || 0,
    });
    if (error) {
      console.log(message, 'error');
      return;
    }
    setProfilePost((prev: any) => {
      const temp = prev?.length ? [...prev] : [];
      const updateTemp = JSON.parse(JSON.stringify(temp));
      updateTemp.push(...data);
      return updateTemp;
    });
    dispatch(setprofilePostData([...profilePost, ...data]));
  };
  const fetchThreadMessageList = async () => {
    setLoading(true);
    try {
      navigate(SCREENS.CHATSCREEN, {
        receiverProfileId: profileId,
      });
      // setIsAddPostVisible(false);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching thread message list:', error);
    }
  };

  return (
    <Layout>
      <ScrollView
        style={{paddingBottom: 100}}
        ref={scrollViewRef}
        onScroll={({nativeEvent}) => {
          const isCloseToBottom =
            nativeEvent.layoutMeasurement.height +
              nativeEvent.contentOffset.y >=
            nativeEvent.contentSize.height - 20;
          if (isCloseToBottom) {
            if (activeTabIndex == 0) getMorePost();
          }
        }}>
        <ImageBackground
          resizeMode="cover"
          style={{flex: 1}}
          source={require('../assets/images/profileGradient.png')}>
          <ImageBackground
            style={styles.profile}
            resizeMode="cover"
            source={{
              uri:
                userProfileData?.avatar ||
                'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png',
            }}>
            <ImageBackground
              resizeMode="cover"
              style={styles.profileGradient}
              source={require('../assets/images/profileGradient.png')}>
              <Header
                title={false}
                leftChildren={
                  <TouchableOpacity onPress={() => goBack()}>
                    <BackIcon />
                  </TouchableOpacity>
                }
                centerTitle=""
                rightChildren={
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => {
                        if (profileId === getProfileDetails.profileId) {
                          navigate(SCREENS.SETTINGS);
                        } else {
                          setReportModal(true);
                        }
                      }}>
                      {profileId === getProfileDetails.profileId ? (
                        <SettingsIcon iconColor="#fff" />
                      ) : (
                        <DoubleDotIcon />
                      )}
                    </TouchableOpacity>
                  </View>
                }
              />
              <View style={styles.profileContainer}>
                <View style={styles.profileHeading}>
                  <View style={styles.profileEdit}>
                    <LocationIcon />
                    <Text style={styles.profileEditText}>
                      {userProfileData?.timezone}
                    </Text>
                  </View>
                  <Text style={styles.profileTitle}>
                    {userProfileData?.profileName}
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </ImageBackground>
        </ImageBackground>
        <View style={styles.followingContainer}>
          <TouchableOpacity
            style={styles.fanContainer}
            onPress={() =>
              navigate(SCREENS.FANSSCREEN, {
                index: 0,
                profileId: userProfileData?.profileId,
              })
            }>
            <Text style={styles.followingText}>Followers</Text>
            <Text style={styles.followingCount}>
              {userProfileData?.fans < 0 ? 0 : userProfileData?.fans}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigate(SCREENS.FANSSCREEN, {
                index: 1,
                profileId: userProfileData?.profileId,
              })
            }>
            <Text style={styles.followingText}>Following</Text>
            <Text style={styles.followingCount}>
              {userProfileData?.fansOf < 0 ? 0 : userProfileData?.fansOf}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profileDescription}>
          <View style={styles.profileDescriptionUser}>
            <UserIcon />
            <Text style={styles.profileDescriptionUserTitle}>Influencer</Text>
          </View>
          <View style={styles.profileDescriptionDate}>
            <CalenderIcon />
            <Text style={styles.profileDescriptionUserTitle}>
              Joined {moment(userProfileData?.createdAt).format('DD MMMM YYYY')}
            </Text>
          </View>
          <View style={styles.profileDescriptionText}>
            <Text style={styles.profileDescriptionTitle}>
              {userProfileData?.bio}
            </Text>
          </View>
          <View style={styles.profileSocial}>
            <View style={styles.profileSocialView}>
              <CopyLinkIcon />
              <Text style={styles.profileSocialViewTitle}>Website</Text>
            </View>
            <View style={styles.profileSocialView}>
              <TwitterIcon />
              <Text style={styles.profileSocialViewTwitterTitle}>Twitter</Text>
            </View>
            <View style={styles.profileSocialView}>
              <FacebookIcon />
              <Text style={styles.profileSocialViewFacebookTitle}>
                Facebook
              </Text>
            </View>
          </View>
          <View style={{marginTop: moderateScale(10)}}>
            {profileId === getProfileDetails.profileId ? (
              <CTButton
                onPress={() => navigate(SCREENS.CREATEPROFILE)}
                title="Edit Profile"
                textStyle={styles.textStyle}
                containerStyle={styles.editContainer}
              />
            ) : (
              <View style={[styles.fanButtonContainer]}>
                <View style={styles.fanButton}>
                  {isAlreadyFan(followingList, profileId) ? (
                    <CTButton
                      title="Unfollow"
                      textStyle={styles.textStyle}
                      containerStyle={styles.editContainer}
                      onPress={handleExitClub}
                      disabled={becomeFanLoading}
                    />
                  ) : (
                    <CTButton
                      title="Follow"
                      textStyle={[styles.textStyle, {color: themeColors.black}]}
                      containerStyle={[
                        styles.editContainer,
                        {backgroundColor: themeColors.aquaColor},
                      ]}
                      onPress={handleBecomeAFan}
                      disabled={becomeFanLoading}
                    />
                  )}
                </View>
                <TouchableOpacity
                  // disabled={true}
                  style={styles.chatButton}
                  onPress={fetchThreadMessageList}>
                  <MailIcon color={themeColors.garyColor} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View style={{marginHorizontal: moderateScale(22)}}>
          <ProfileTab
            data={MyProfileTabs}
            activeTabIndex={activeTabIndex}
            setActiveTabIndex={setActiveTabIndex}
            usersearch={false}
          />
        </View>

        {/* {activeTabIndex === 0 && <SocialStorys />} */}
        {activeTabIndex === 0 && (
          <View style={styles.container}>
            {!loading ? (
              profilePost.length > 0 ? (
                <FlatList
                  data={profilePost}
                  renderItem={({item, index}) => (
                    <ProfilePost item={item} key={index} />
                  )}
                  keyExtractor={item => item?.postId}
                  contentContainerStyle={styles.flatListContainer}
                />
              ) : (
                <View style={styles.noFoundPost}>
                  <Text style={styles.noFoundPostText}>
                    Posts data not found
                  </Text>
                </View>
              )
            ) : (
              <View style={styles.noFoundPost}>
                <ActivityIndicator
                  size="large"
                  color={themeColors.primaryColor}
                />
              </View>
            )}
          </View>
        )}
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={reportModal}
        onRequestClose={() => {
          setReportModal(false);
        }}>
        <View style={{flex: 1}}>
          <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={10}
            overlayColor="transparent"
            reducedTransparencyFallbackColor="white"
          />
          <View style={styles.listData}>
            {/* <Text style={styles.labelStyle}>Exit Club</Text> */}
            <Text style={styles.labelStyle}>Restrict User</Text>
            <Text style={styles.labelStyle}>Report User</Text>
            {/* <Text style={styles.labelStyle}>Report and Block User</Text> */}
            <Text style={[styles.labelStyle, {color: '#FF4E51'}]}>
              Block User
            </Text>
            <TouchableOpacity
              onPress={() => setReportModal(false)}
              style={styles.crossStyle}>
              <LightCrossIcon />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Layout>
  );
};

export default Profile;
const styles = StyleSheet.create({
  crossStyle: {
    marginVertical: moderateScale(25),
    alignSelf: 'center',
  },
  labelStyle: {
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: 24,
    color: 'white',
    lineHeight: 26,
    textAlign: 'center',
    marginVertical: 16,
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
  profile: {
    // height: moderateScale(300),
    flex: 1,
  },
  profileGradient: {
    height: moderateScale(300),
    // paddingBottom: moderateScale(18),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScale(20),
  },
  headerTitle: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.md,
  },
  headerButton: {},
  headerButtonText: {
    color: themeColors.aquaColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontWeight: '400',
    fontSize: size.default,
  },
  profileContainer: {
    paddingHorizontal: moderateScale(22),
    justifyContent: 'flex-end',
  },
  profileHeading: {
    height: '82%',
    justifyContent: 'flex-end',
  },
  profileTitle: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontWeight: '400',
    fontSize: size.xxlg,
    width: moderateScale(300),
    marginTop: moderateScale(10),
  },
  profileEdit: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileEditText: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.default,
    marginLeft: moderateScale(14),
  },
  followingContainer: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(22),
    paddingTop: moderateScale(0),
  },
  followingText: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.s,
    color: themeColors.garyColor,
  },
  followingCount: {
    fontFamily: Fontfamily.Grostestk,
    fontSize: size.vxlg,
    color: themeColors.primaryColor,
  },
  fanContainer: {
    marginRight: moderateScale(40),
  },
  moreIcon: {
    paddingLeft: moderateScale(130),
  },
  trandingComponent: {
    marginTop: moderateScale(30),
  },
  trending: {
    paddingHorizontal:
      Platform.OS === 'ios' ? moderateScale(0) : moderateScale(6),
    flexDirection: 'row',
  },
  trendingView: {
    marginTop: moderateScale(10),
    marginRight: moderateScale(8),
    marginBottom: moderateScale(2),
  },
  trendingContainer: {
    backgroundColor: themeColors.cardsColor,
    // width: verticalScale(280),
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(20),
    borderRadius: 24,
    justifyContent: 'space-between',
  },
  trendingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: moderateScale(5),
  },
  trendingheadingView: {
    paddingBottom: moderateScale(5),
  },
  trendingCardImage: {
    height: verticalScale(30),
    width: verticalScale(30),
    borderRadius: 50,
  },
  trendingViewText: {},
  trendingText: {
    marginLeft: moderateScale(10),
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
  },
  trendingTextMoney: {
    color: themeColors.aquaColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.md,
    marginTop: moderateScale(15),
    marginBottom: moderateScale(10),
  },
  trendingTextBottom: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.s,
    // lineHeight: 15,
  },
  profileDescription: {
    paddingHorizontal: moderateScale(22),
    paddingTop: moderateScale(15),
  },
  profileDescriptionUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileDescriptionDate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(10),
  },
  profileDescriptionUserTitle: {
    color: themeColors.primaryColor,
    marginLeft: moderateScale(10),
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
  },
  profileDescriptionText: {
    marginTop: moderateScale(17),
  },
  profileDescriptionTitle: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
  },
  profileSocial: {
    paddingTop: moderateScale(18),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileSocialView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    borderRadius: 20,
    backgroundColor: themeColors.cardsColor,
  },
  profileSocialViewTitle: {
    color: themeColors.aquaColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
    marginLeft: moderateScale(10),
  },
  profileSocialViewTwitterTitle: {
    color: '#30B4FE',
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
    marginLeft: moderateScale(10),
  },
  profileSocialViewFacebookTitle: {
    color: '#1877F2',
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
    marginLeft: moderateScale(10),
  },
  profileCollection: {
    marginTop: moderateScale(28),
    marginBottom: moderateScale(14),
  },
  profileCollectionTitle: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.lg,
    fontWeight: '400',
    marginLeft: moderateScale(10),
  },
  textStyle: {
    color: themeColors.primaryColor,
  },
  editContainer: {
    backgroundColor: themeColors.black,
    borderWidth: 1,
    borderColor: themeColors.garyColor,
    borderRadius: 100,
    height: 50,
    marginVertical: moderateScale(10),
  },
  listData: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  fanButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fanButton: {
    width: '80%',
  },
  chatButton: {
    // width: '20%',
    padding: moderateScale(8),
    marginLeft: moderateScale(30),
    borderWidth: 1,
    borderRadius: 50,
    borderColor: themeColors.garyColor,
  },
  container: {
    flex: 1,
  },
  flatListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  noFoundPost: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(20),
  },
  noFoundPostText: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.md,
    fontWeight: '500',
  },
});
