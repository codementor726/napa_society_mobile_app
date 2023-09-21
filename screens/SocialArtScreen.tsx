import React, {useEffect, useRef, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Modal,
  Text,
} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {PlusIcon, Search} from '../assets/svg';
import Header from '../common/Header';
import {socialArtItems} from '../const/SocialArtItems';
import Layout from '../common/Layout';
import SocialStorys from '../components/SocialStorys';
import SocialStoryFeed from '../components/SocialStoryFeed';
import Tabs from '../common/Tabs';
import {fetchSocialArt} from '../store/slices/socialArtData';
import {useDispatch, useSelector} from 'react-redux';
import SocialMySNFT from '../components/SocialMySNFT';
import {setImg} from '../store/slices/image';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {SCREENS} from '../typings/screens-enums';
import ActionSheet from 'react-native-actionsheet';
import {
  fetchProfileData,
  setpostDetailPage,
} from '../store/slices/ProfileDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {WEBSOCKET_URL} from '../const/Url';
import Explore from '../components/Explore';
import SocialLeaders from './SocialLeaders';
import LiveStreamList from './LiveStreamList';
import {BlurView} from '@react-native-community/blur';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {themeColors} from '../theme/colors';
import {LightCrossIcon} from '../assets/svg/LightCrossIcon';
import {
  fetchAccountData,
  setactiveWalletAddress,
} from '../store/slices/NapaAccount';
import {
  selectAccountList,
  selectActiveWalletAddress,
  selectNapaWallet,
} from '../store/selectors/NapaAccount';
import {MintPost} from '../typings/mint';
import {fetchMintedPost, setMintedPost} from '../store/slices/MintedSNFT';
import {selectMintedPostList} from '../store/selectors/MintedSNFT';
import {fetchGenre} from '../store/slices/GetGenre';
import {setTokenPrice} from '../store/slices/TokenList';
import {selectSocialList} from '../store/selectors/socialArtSelector';
import {fetchGetMostViewedPosts} from '../store/slices/getMostViewedPosts';
import {fetchFollowers} from '../store/slices/Followers';
import {fetchFollowing} from '../store/slices/Following';
import {handleGetFCMToken} from '../utils/helper';

const SocialArt: React.FC = () => {
  const ProfileData = useSelector(selectProfileList);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isAddPostVsible, setIsAddPostVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isIndex, setIsIndex] = useState<number>();
  const dispatch = useDispatch();
  const actionSheetRef = React.createRef();
  const account = useSelector(selectAccountList);
  const currentActive = useSelector(selectNapaWallet);
  const [selectedOption, setSelectedOption] = useState('');
  const options = ['Create New Post', 'Story', 'Live', 'Cancel'];
  const {navigate} = useNavigation<any>();
  const mintedPost = useSelector(selectMintedPostList);
  const socialArtSocketRef = useRef<any>(null);
  const generalServicesSocketRef = useRef<any>(null);
  const activeAccountAddress = useSelector(selectActiveWalletAddress);
  const socialArt = useSelector(selectSocialList);
  const profileId = useSelector(selectProfileList)?.profileId;
  const isFocused = useIsFocused();

  useEffect(() => {
    if (profileId) {
      dispatch(
        fetchSocialArt({offset: socialArt.length, profileId: profileId}),
      );
    }
  }, [profileId]);

  useEffect(() => {
    dispatch(setpostDetailPage(false));
  }, [isFocused]);

  const handleOptionSelect = (index: any) => {
    setSelectedOption(options[index]);
    if (index === options.length - 1) {
      return;
    } else if (options[index] === 'Create New Post') {
      dispatch(setImg(''));
      navigate(SCREENS.CREATEMARKETPOST);
    } else if (selectedOption === 'Story') {
    } else {
    }
  };

  const getProfileData = async () => {
    const emailAddress = await AsyncStorage.getItem('emailAddress');
    const token = await handleGetFCMToken();
    if (emailAddress) {
      dispatch(
        fetchProfileData({
          emailAddress,
          deviceToken: token,
        }),
      );
    }
  };
  useEffect(() => {
    getProfileData();
    dispatch(fetchGetMostViewedPosts());
  }, []);

  useEffect(() => {
    if (profileId) {
      dispatch(fetchGenre(profileId));
    }
  }, [profileId]);

  const connectToGeneralServices = async () => {
    const token = await handleGetFCMToken();
    if (profileId && generalServicesSocketRef.current == null) {
      generalServicesSocketRef.current = new WebSocket(WEBSOCKET_URL);
      generalServicesSocketRef.current.addEventListener(
        'message',
        ({data}: any) => {
          const response = JSON.parse(data);
          if (response?.event === `update-user-${profileId}`) {
            dispatch(
              fetchProfileData({
                profileId,
              }),
            );
          }
        },
      );
    }
  };

  useEffect(() => {
    connectToGeneralServices();
    if (generalServicesSocketRef.current) {
      generalServicesSocketRef.current.onclose = (e: any) => {
        console.log(
          'General Services Socket is closed. Reconnect will be attempted in 1 second.',
          e.reason,
        );
        setTimeout(() => {
          if (generalServicesSocketRef.current) {
            connectToGeneralServices();
          }
        }, 1000);
      };
    }
    return () => {
      if (generalServicesSocketRef.current) {
        generalServicesSocketRef.current.close();
        generalServicesSocketRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId]);

  useEffect(() => {
    if (profileId) {
      dispatch(fetchAccountData(profileId));
    }
  }, [profileId]);

  const handleGetMintPosts = async () => {
    if (account.length) {
      const selectedAccount = account?.find(
        (val: any, index: number) =>
          val[`NWA_${index + 1}_NE`] == val[`NWA_${currentActive}_NE`],
      );
      dispatch(
        setactiveWalletAddress(selectedAccount[`NWA_${currentActive}_AC`]),
      );
      setLoading(true);
      dispatch(
        fetchMintedPost({
          accountId: selectedAccount[`NWA_${currentActive}_AC`],
          offset: mintedPost?.length || 0,
        }),
      );
    }
  };

  useEffect(() => {
    handleGetMintPosts();
  }, [account, currentActive, isFocused]);

  const connectToSocialArt = () => {
    if (activeAccountAddress && socialArtSocketRef.current == null) {
      socialArtSocketRef.current = new WebSocket(WEBSOCKET_URL);
      socialArtSocketRef.current.addEventListener('message', ({data}: any) => {
        const response = JSON.parse(data);
        if (response?.event === 'napa-token-price') {
          dispatch(setTokenPrice(response?.price));
        } else if (response?.event === `mints-${activeAccountAddress}`) {
          handleNewMint(response?.posts);
        } else if (response?.event === 'mint-post-status-update') {
          handleMintPostStatusUpdate(response?.mintId, response?.mint);
        } else if (response?.event === 'payout-category-update') {
          handlePayoutCategoryUpdate(
            response?.post?.postId,
            response?.post?.payoutsCategory,
          );
        } else if (response?.event === 'redeem-token') {
          handleRedeemTokenUpdate(
            response?.post?.postId,
            response?.post?.closingDate,
          );
        }
      });
    }
  };

  useEffect(() => {
    connectToSocialArt();
    if (socialArtSocketRef.current) {
      socialArtSocketRef.current.onclose = (e: any) => {
        console.log(
          'Social Art Socket is closed. Reconnect will be attempted in 1 second.',
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
  }, [activeAccountAddress, mintedPost]);

  const handleNewMint = (post: any) => {
    if (mintedPost.length) {
      const data = [post, ...mintedPost];
      const filteredPost = data.filter(
        (v, i, a) => a.findIndex(v2 => v2?.postId === v?.postId) === i,
      );
      dispatch(setMintedPost([...filteredPost]));
    } else {
      let data: any = [];
      data.push(post);
      dispatch(setMintedPost([...data]));
    }
  };

  const handleMintPostStatusUpdate = (mintId: string, mint: MintPost) => {
    const temp = mintedPost?.length ? mintedPost : [];
    const updatedTemp = JSON.parse(JSON.stringify(temp));
    const index = updatedTemp.findIndex((m: any) => m.mintId == mintId);
    if (index > -1) {
      updatedTemp[index] = mint;
    }
    dispatch(setMintedPost([...updatedTemp]));
  };

  const handlePayoutCategoryUpdate = (
    postId: string,
    payoutsCategory: string,
  ) => {
    const temp = mintedPost?.length ? mintedPost : [];
    const updatedTemp = JSON.parse(JSON.stringify(temp));
    const index = updatedTemp.findIndex((m: any) => m.postId == postId);
    if (index > -1) {
      updatedTemp[index].payoutsCategory = payoutsCategory;
    }
    dispatch(setMintedPost([...updatedTemp]));
  };

  const handleRedeemTokenUpdate = (postId: string, closingDate: string) => {
    const temp = mintedPost?.length ? mintedPost : [];
    const updatedTemp = JSON.parse(JSON.stringify(temp));
    const index = updatedTemp.findIndex((m: any) => m.postId == postId);
    if (index > -1) {
      updatedTemp[index].closingDate = closingDate;
    }
    dispatch(setMintedPost([...updatedTemp]));
  };

  useEffect(() => {
    dispatch(fetchFollowers(profileId));
    dispatch(fetchFollowing(profileId));
  }, [profileId]);

  return (
    <Layout>
      <Header
        leftChildren={
          <View style={styles.headerStyle}>
            <TouchableOpacity
              onPress={() => {
                navigate(SCREENS.SEARCHSCREEN);

                // navigate(SCREENS.PROFILE, {profileId: profileId});
              }}>
              <Search color={themeColors.garyColor} />
              {/* <Image
                style={styles.profileImage}
                source={{
                  uri:
                    ProfileData?.avatar ||
                    'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png',
                }}
              /> */}
            </TouchableOpacity>
            <View />
          </View>
        }
        title={true}
        rightChildren={
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              // onPress={() => navigate(SCREENS.FANSSCREEN)}
              onPress={() => setIsAddPostVisible(true)}>
              <ActionSheet
                //@ts-ignore
                ref={actionSheetRef}
                title={'Create'}
                options={options}
                cancelButtonIndex={options.length - 1}
                onPress={handleOptionSelect}
              />
              <PlusIcon />
            </TouchableOpacity>
          </View>
        }
      />

      <Tabs
        data={socialArtItems}
        activeTabIndex={activeTabIndex}
        setActiveTabIndex={setActiveTabIndex}
      />
      {activeTabIndex == 0 && <SocialStoryFeed />}
      {activeTabIndex == 1 && <SocialMySNFT />}
      {activeTabIndex == 2 && <LiveStreamList />}
      {activeTabIndex == 5 && <SocialStorys />}
      {activeTabIndex == 4 && <Explore />}
      {activeTabIndex == 3 && <SocialLeaders />}

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
            <Text style={styles.titleStyle}>What Are We Doing?</Text>
            <TouchableOpacity
              style={styles.buttonView}
              onPress={() => {
                navigate(SCREENS.CREATEMARKETPOST);
                setIsAddPostVisible(false);
                setIsIndex(0);
              }}>
              <Text
                style={[
                  styles.subtitleStyle,
                  {
                    color:
                      isIndex === 0
                        ? themeColors.aquaColor
                        : themeColors.primaryColor,
                  },
                ]}>
                Create Post
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.buttonView}
              onPress={() => {
                setActiveTabIndex(1);
                setIsAddPostVisible(false);
                setIsIndex(1);
              }}>
              <Text
                style={[
                  styles.subtitleStyle,
                  {
                    color:
                      isIndex === 1
                        ? themeColors.aquaColor
                        : themeColors.primaryColor,
                  },
                ]}>
                 Stories 
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.buttonView}
              onPress={() => {
                setActiveTabIndex(2);
                setIsAddPostVisible(false);
                setIsIndex(2);
                navigate(SCREENS.STREAMTITLE);
              }}>
              <Text
                style={[
                  styles.subtitleStyle,
                  {
                    color:
                      isIndex === 2
                        ? themeColors.aquaColor
                        : themeColors.primaryColor,
                  },
                ]}>
                Go Live
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsAddPostVisible(false)}
              style={styles.crossStyle}>
              <LightCrossIcon />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Layout>
  );
};

export default SocialArt;
const styles = StyleSheet.create({
  profileImage: {
    height: verticalScale(30),
    width: verticalScale(30),
    borderRadius: 50,
  },
  iconParent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: verticalScale(60),
  },
  searchIcon: {
    // marginRight: moderateScale(8),
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: verticalScale(66),
    justifyContent: 'space-between',
  },
  searchStyle: {
    flexDirection: 'row',
    height: verticalScale(30),
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    // backgroundColor: 'red',
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
  modalMainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    // backgroundColor: 'tan',
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
    // color: themeColors.primaryColor,
    textAlign: 'center',
  },
  crossStyle: {
    marginVertical: moderateScale(25),
  },
  buttonView: {
    height: moderateScale(35),
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(22),
  },
});
