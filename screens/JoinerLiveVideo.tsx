/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
  KeyboardAvoidingView,
} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import Layout from '../common/Layout';
import {PermissionsAndroid, Platform} from 'react-native';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  RtcSurfaceView,
  ChannelProfileType,
  RtcStats,
  ConnectionStateType,
} from 'react-native-agora';
import {useNavigation, useRoute} from '@react-navigation/native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {SCREENS} from '../typings/screens-enums';
import {CrossIcon, EyeIcon} from '../assets/svg';
import {
  getLiveStreamInfo,
  getLiveStreamUserList,
} from '../services/GetImportedToken';
import {NapaIcon} from '../assets/svg/NapaIcon';
import {BackHandler} from 'react-native';
import {resetStack} from '../utils/helper';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {useSelector} from 'react-redux';
import {SOCIAL_ART_WEBSOCKET_URL} from '../const/Url';
import KeepAwake from 'react-native-keep-awake';
import {
  decreaseLiveStreamUserCount,
  increaseLiveStreamUserCount,
} from '../services/PostApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LiveStreamChatScreen from '../components/LiveStreamChat';
const appId = 'c6b5f53b210d45d2a83a24d27db3dfca';

const {width, height} = Dimensions.get('window');

type RouteTypes = {
  liveStreamId: string;
  streamToken: string;
  streamTitle: string;
};

const JoinerLiveVideo = () => {
  const remoteUID = useRef(0);
  const navigation = useNavigation<any>();
  const {navigate} = useNavigation<any>();
  const route = useRoute();
  const {liveStreamId, streamToken, streamTitle} = route?.params as RouteTypes;
  const agoraEngineRef = useRef<IRtcEngine>();
  const socialArtSocketRef = useRef<any>(null);
  const [userLiveStreamList, setUserLiveStreamList] = useState([]);
  const [timer, setTimer] = useState('00:00');
  const [userCount, setUserCount] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const ProfileData = useSelector(selectProfileList);
  const [textInputFocused, setTextInputFocused] = useState(false);
  const isAndroid = Platform.OS === 'android';

  const isJoined =
    agoraEngineRef.current?.getConnectionState() ===
    ConnectionStateType.ConnectionStateConnected;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      retrieveData();
    });

    return unsubscribe;
  }, [navigation]);

  const connectToSocialArt = async () => {
    if (liveStreamId && socialArtSocketRef.current == null) {
      socialArtSocketRef.current = new WebSocket(SOCIAL_ART_WEBSOCKET_URL);
      socialArtSocketRef.current.addEventListener(
        'message',
        async ({data}: any) => {
          const response = JSON.parse(data);
          if (response?.event === 'stream-end') {
            const socketStreamId = response?.streamId;
            if (liveStreamId === socketStreamId) {
              leave();
            }
          } else if (
            response?.event === 'live-stream-item-delete' ||
            response?.event === 'live-stream-item-sale' ||
            response?.event === 'live-stream-item-update' ||
            response?.event === 'live-stream-item-add' ||
            response?.event === 'stream-join'
          ) {
            updateData();
          }
        },
      );
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
  }, []);

  const increaseUserCount = async (Uid: number) => {
    const activeUID = await AsyncStorage.getItem('UID');
    if (Uid && Uid.toString() !== activeUID) {
      remoteUID.current = Uid;
      await AsyncStorage.setItem('UID', Uid.toString());
      await increaseLiveStreamUserCount(liveStreamId);
    }
  };

  const decreaseUserCount = async () => {
    await decreaseLiveStreamUserCount(liveStreamId);
  };

  const updateData = async () => {
    try {
      const fetchStreamInfo = async () => {
        const {data}: any = await getLiveStreamUserList(liveStreamId, {
          enabled: !!liveStreamId,
        });

        const {data: streamInfo}: any = await getLiveStreamInfo(liveStreamId, {
          enabled: !!liveStreamId,
        });
        if (streamInfo?.data?.[0]) {
          setUserCount(streamInfo.data[0].streamUserCount);
        }
        const getListArr: any = Array.isArray(data?.data) ? data?.data : [];
        setUserLiveStreamList(getListArr);
      };

      await fetchStreamInfo();
    } catch (error) {}
  };

  const retrieveData = async () => {
    try {
      await updateData();

      if (agoraEngineRef.current) {
        return;
      }
      setupVideoSDKEngine();
    } catch (error) {}
  };

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', backAction);
    });

    const unsubscribeblur = navigation.addListener('blur', () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount

    return () => {
      if (backHandler && typeof backHandler.remove !== undefined) {
        backHandler.remove();
      }
      if (unsubscribeblur && typeof unsubscribeblur.remove !== undefined) {
        unsubscribeblur.remove();
      }
    };
  }, [navigation]);

  const getPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  };

  const setupVideoSDKEngine = async () => {
    try {
      // use the helper function to get permissions
      if (Platform.OS === 'android') {
        await getPermission();
      }
      agoraEngineRef.current = createAgoraRtcEngine();

      const agoraEngine = agoraEngineRef.current;
      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {},
        onUserJoined: (_connection, Uid) => {
          increaseUserCount(Uid);
        },
        onUserOffline: async _connection => {
          remoteUID.current = 0;
          await AsyncStorage.removeItem('UID');
        },
        onRtcStats: async (_connection, stats: RtcStats | any) => {
          // Handle the RtcStats object and extract the required statistics
          const totalUsers: any =
            parseInt(stats?.userCount) > 0
              ? parseInt(stats?.userCount, 10) - 1
              : 0;
          if (totalUsers > 0) {
            const {duration = 0} = stats;
            const formattedDuration = formatDuration(duration);
            setTimer(formattedDuration);
          } else {
            leave();
          }
        },
      });
      agoraEngine.initialize({
        appId: appId,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      });
      agoraEngine.enableVideo();
      join();
    } catch (e) {}
  };

  const join = async () => {
    if (isJoined) {
      return;
    }
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileLiveBroadcasting,
      );
      agoraEngineRef.current?.startPreview();
      agoraEngineRef.current?.joinChannel(streamToken, streamTitle, 0, {
        clientRoleType: ClientRoleType.ClientRoleAudience,
      });
      KeepAwake.activate();
    } catch (e) {}
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60); // Calculate the number of minutes
    const remainingSeconds = seconds % 60; // Calculate the remaining seconds

    // Format the minutes and seconds as a string
    const formattedMinutes = String(minutes).padStart(2, '0'); // Add leading zero if needed
    const formattedSeconds = String(remainingSeconds).padStart(2, '0'); // Add leading zero if needed

    return `${formattedMinutes}:${formattedSeconds}`; // Return the formatted duration
  };

  const leave = async () => {
    try {
      agoraEngineRef.current?.leaveChannel();
      remoteUID.current = 0;
      await AsyncStorage.removeItem('UID');
      resetStack(navigation, SCREENS.SOCIALART);
      decreaseUserCount();
      KeepAwake.deactivate();
    } catch (e) {}
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    const fetchUserList = async () => {
      const {data}: any = await getLiveStreamUserList(liveStreamId, {
        enabled: !!liveStreamId,
      });
      const getListArr: any = Array.isArray(data?.data) ? data?.data : [];
      setUserLiveStreamList(getListArr);
    };

    await fetchUserList();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleTextInputFocus = () => {
    setTextInputFocused(!textInputFocused);
  };

  const handleTextInputBlur = () => {
    setTextInputFocused(!textInputFocused);
  };

  return (
    <KeyboardAvoidingView behavior={isAndroid ? 'height' : 'padding'}>
      <ScrollView
        scrollEnabled={textInputFocused}
        contentContainerStyle={styles.innerrContainer}>
        <Layout>
          <ImageBackground
            source={require('../assets/images/EventBackground.png')}
            style={styles.mainWrapper}>
            <View style={styles.scroll}>
              {isJoined ? (
                <React.Fragment key={remoteUID.current}>
                  <RtcSurfaceView
                    canvas={{uid: remoteUID.current}}
                    style={styles.videoView}
                  />
                </React.Fragment>
              ) : (
                <Text>{'Waiting for a remote user to join'}</Text>
              )}
              <View style={styles.controlsWrapper}>
                <View style={styles.topControls}>
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      alignSelf: 'center',
                      width: '100%',
                      justifyContent: 'center',
                      right: 0,
                      left: 0,
                      paddingHorizontal: 24,
                      paddingTop: 20,
                    }}>
                    <View style={styles.chatTopBar}>
                      <View style={styles.profileBar}>
                        <TouchableOpacity
                          onPress={() => {
                            navigate(SCREENS.PROFILE);
                          }}>
                          <Image
                            style={styles.profileImage}
                            source={{
                              uri:
                                ProfileData?.avatar ||
                                'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png',
                            }}
                          />
                        </TouchableOpacity>
                        <Text style={{color: themeColors.primaryColor}}>
                          You
                        </Text>
                      </View>
                      <View style={styles.viewsMain}>
                        <View style={[styles.reView, {marginRight: 10}]}>
                          <View style={styles.reViewNo}>
                            <EyeIcon />
                            <Text
                              style={{
                                color: themeColors.primaryColor,
                                marginLeft: 7,
                              }}>
                              {userCount}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={[
                            styles.reViewNo,
                            {backgroundColor: '#ff4e51'},
                          ]}>
                          <Text style={{color: themeColors.primaryColor}}>
                            {timer}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.bottomControls}>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 80,
                      alignSelf: 'center',
                      width: '100%',
                      justifyContent: 'center',
                      right: 0,
                      left: 0,
                      paddingHorizontal: 24,
                    }}>
                    {userLiveStreamList.length > 0 && (
                      <View style={styles.accList}>
                        <ScrollView
                          refreshControl={
                            <RefreshControl
                              refreshing={refreshing}
                              onRefresh={onRefresh}
                            />
                          }
                          horizontal={true}>
                          {userLiveStreamList &&
                            userLiveStreamList.map(
                              (user: any, index: number) => {
                                return (
                                  <TouchableOpacity
                                    key={user.itemName + index}
                                    onPress={() =>
                                      navigation.navigate(
                                        SCREENS.JOINERVIDEOITEM,
                                        {
                                          ...route.params,
                                          itemUuid: user.itemUuid,
                                        },
                                      )
                                    }
                                    activeOpacity={0.8}
                                    style={styles.accAdd}>
                                    <Image
                                      source={{uri: user?.itemImage}}
                                      style={styles.sqrImage}
                                    />
                                    <View style={styles.chatText}>
                                      <Text
                                        style={styles.streamTitleStye}
                                        numberOfLines={2}>
                                        {user.itemName}
                                      </Text>
                                      <View style={styles.fixedPrice}>
                                        <Text style={styles.accAddDes}>
                                          Fixed Price:
                                        </Text>
                                        <View
                                          style={{
                                            marginLeft: 8,
                                            marginRight: 4,
                                          }}>
                                          <NapaIcon />
                                        </View>
                                        <Text style={styles.accAddDes}>
                                          {user?.price}
                                        </Text>
                                      </View>
                                    </View>
                                  </TouchableOpacity>
                                );
                              },
                            )}
                        </ScrollView>
                      </View>
                    )}
                  </View>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    paddingTop: 20,
                  }}>
                  <TouchableOpacity
                    style={styles.actionPadding}
                    onPress={leave}>
                    <CrossIcon />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 20,
                    alignSelf: 'center',
                    width: '100%',
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      paddingVertical: moderateScale(10),
                    }}>
                    <View
                      style={{
                        paddingHorizontal: moderateScale(24),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingVertical: moderateScale(10),
                      }}>
                      <LiveStreamChatScreen
                        handleTextInputBlur={handleTextInputBlur}
                        handleTextInputFocus={handleTextInputFocus}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>
        </Layout>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default JoinerLiveVideo;

const styles = StyleSheet.create({
  mainWrapper: {
    width: width,
  },
  actionPadding: {
    paddingHorizontal: 20,
  },
  innerrContainer: {
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlsWrapper: {
    height: height,
    justifyContent: 'space-between',
    paddingBottom: moderateScale(48),
  },
  bottomControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'flex-end',
  },
  topControls: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  button: {
    paddingVertical: 4,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 24,
  },
  scroll: {
    color: '#000',
    height: height,
  },
  videoView: {width: width, height: height, position: 'absolute'},
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    color: '#fff',
  },
  bottomView: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
  },
  accList: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'scroll',
  },
  accAdd: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#302a3d',
    height: 64,
    alignItems: 'center',
    paddingHorizontal: 10,
    width: 258,
    borderRadius: 16,
    marginRight: 10,
  },
  accAddDes: {
    color: themeColors.garyColor,
    fontSize: 12,
    fontFamily: Fontfamily.Avenier,
  },
  imageStyle: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
  },
  sqrImage: {
    width: 32,
    height: 32,
    borderRadius: 10,
  },
  chatText: {
    marginLeft: 10,
    marginTop: 5,
  },
  streamTitleStye: {
    color: 'white',
    fontSize: 14,
    fontFamily: Fontfamily.Neuropolitical,
    marginBottom: 4,
  },
  userNameStyle: {
    fontSize: 12,
    color: 'white',
    fontFamily: Fontfamily.Avenier,
  },
  viewsMain: {
    display: 'flex',
    flexDirection: 'row',
  },
  reView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reViewNo: {
    backgroundColor: '#ffffff26',
    borderRadius: 100,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  chatTopBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '87%',
  },
  profileBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputField: {
    borderWidth: 1,
    borderColor: themeColors.garyColor,
    color: themeColors.primaryColor,
    borderRadius: 100,
    fontSize: 14,
    width: '78%',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(24),
  },
  fixedPrice: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    height: verticalScale(30),
    width: verticalScale(30),
    borderRadius: 50,
    marginRight: 5,
  },
});
