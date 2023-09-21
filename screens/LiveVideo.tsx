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
  BackHandler,
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
import {RotateIcon} from '../assets/svg/RotateIcon';
import {CameraRedIcon, CrossIcon, EyeIcon} from '../assets/svg';
import {MicroPhoneInactive} from '../assets/svg/MicroPhoneInactive';
import {VideoIcon} from './VideoIcon';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../typings/screens-enums';
import {updateLiveStream, updateLiveStreamUpdatedAt} from '../services/PostApi';
import {useToast} from 'react-native-toast-notifications';
import {AddIcon} from '../assets/svg/AddIcon';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getLiveStreamInfo,
  getLiveStreamUserList,
} from '../services/GetImportedToken';
import {NapaIcon} from '../assets/svg/NapaIcon';
import {isArray} from 'lodash';
import {resetStack} from '../utils/helper';
import {useSelector} from 'react-redux';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {SOCIAL_ART_WEBSOCKET_URL} from '../const/Url';
import KeepAwake from 'react-native-keep-awake';
import LiveStreamChatScreen from '../components/LiveStreamChat';
import ErrorToast from '../common/toasters/ErrorToast';

const appId = 'c6b5f53b210d45d2a83a24d27db3dfca';
const {width, height} = Dimensions.get('window');

const LiveVideo = () => {
  const navigation = useNavigation<any>();
  const socialArtSocketRef = useRef<any>(null);
  const agoraEngineRef = useRef<IRtcEngine>();
  const [channelName, setChannelName] = useState('');
  const [liveStreamToken, setLiveStreamToken] = useState('');
  const [liveStreamId, setLiveStreamId] = useState('');
  const [remoteUid, setRemoteUid] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [timer, setTimer] = useState('00:00');
  const [isMuted, setIsMuted] = useState(false);
  const [videoStop, setVideoStop] = useState(false);
  const [userLiveStreamList, setUserLiveStreamList] = useState([]);
  const [textInputFocused, setTextInputFocused] = useState(false);

  const ProfileData = useSelector(selectProfileList);
  const toast = useToast();
  const isAndroid = Platform.OS === 'android';
  const isJoined =
    agoraEngineRef.current?.getConnectionState() ===
    ConnectionStateType.ConnectionStateConnected;
  useEffect(() => {
    setupVideoSDKEngine();
    KeepAwake.activate();
  }, []);

  const handleTextInputFocus = () => {
    setTextInputFocused(!textInputFocused);
  };

  const handleTextInputBlur = () => {
    setTextInputFocused(!textInputFocused);
  };

  const updateData = async () => {
    try {
      let dataRaw: any = await AsyncStorage.getItem('data');
      dataRaw = JSON.parse(dataRaw);
      const {streamId = ''} = dataRaw;
      const {data}:any = await getLiveStreamUserList(streamId, {
        enabled: !!streamId,
      });
      const {data: streamInfo}:any = await getLiveStreamInfo(streamId, {
        enabled: !!streamId,
      });
      if (streamInfo?.data?.[0]) {
        setUserCount(streamInfo.data[0].streamUserCount);
      }
      const getListArr: any = isArray(data?.data) ? data?.data : [];

      setUserLiveStreamList(getListArr);
    } catch (error) {}
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      (async () => {
        const {data}:any = await getLiveStreamUserList(liveStreamId, {
          enabled: !!liveStreamId,
        });
        const getListArr: any = isArray(data?.data) ? data?.data : [];

        setUserLiveStreamList(getListArr);
      })();
    });

    return unsubscribe;
  }, [liveStreamId, navigation]);

  const connectToSocialArt = async () => {
    if (socialArtSocketRef.current == null) {
      socialArtSocketRef.current = new WebSocket(SOCIAL_ART_WEBSOCKET_URL);
      socialArtSocketRef.current.addEventListener('message', ({data}: any) => {
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
      });
    }
  };

  useEffect(() => {
    connectToSocialArt();
    if (socialArtSocketRef.current) {
      socialArtSocketRef.current.onclose = (e: any) => {
        console.log(
          'Social Art Socket is closed 1. Reconnect will be attempted in 1 second.',
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

  useEffect(() => {
    retrieveData();
  }, [liveStreamId, navigation]);

  const retrieveData = async () => {
    try {
      const rawChannelName: any = await AsyncStorage.getItem('channelName');
      setChannelName(rawChannelName);
      let data: any = await AsyncStorage.getItem('data');
      data = JSON.parse(data);
      const {streamToken = '', streamId = ''} = data;
      setLiveStreamId(streamId);
      setLiveStreamToken(streamToken);
    } catch (err) {}
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
      backHandler?.remove();
      unsubscribeblur?.remove();
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
          setRemoteUid(Uid);
        },
        onUserOffline: _connection => {
          setRemoteUid(0);
        },
        onRtcStats: (_connection, stats: RtcStats | any) => {
          // Handle the RtcStats object and extract the required statistics

          const {duration = 0} = stats;
          const formattedDuration = formatDuration(duration);
          setTimer(formattedDuration);
        },
      });

      agoraEngine.initialize({
        appId: appId,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      });
      agoraEngine.enableVideo();
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

  const join = async () => {
    if (isJoined) {
      return;
    }
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileLiveBroadcasting,
      );
      agoraEngineRef.current?.startPreview();
      agoraEngineRef.current?.joinChannel(liveStreamToken, channelName, 0, {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      });
      // setShowControls(true);

      if (liveStreamId) {
        const {error, message} = await updateLiveStream(liveStreamId, 1);
        if (error) {
          toast.show(<ErrorToast message={message} />, {
            placement: 'top',
          });
        }
      }
    } catch (e) {}
  };

  const leave = async () => {
    try {
      // setIsJoined(false);
      // setShowControls(false);
      resetStack(navigation, SCREENS.LIVESTREAMEND, {
        leaveChannel: () => agoraEngineRef.current?.leaveChannel(),
        disableVideo: () => agoraEngineRef.current?.disableVideo(),
        liveStreamId: liveStreamId,
        removeListners: () => agoraEngineRef.current?.removeAllListeners(),
        setRemoteUid,
      });
      KeepAwake.deactivate();
    } catch (e) {}
  };

  const pauseVideo = () => {
    if (videoStop === false) {
      agoraEngineRef.current?.muteLocalVideoStream(true);
      agoraEngineRef.current?.muteAllRemoteVideoStreams(true);
      agoraEngineRef.current?.stopPreview();
    } else {
      agoraEngineRef.current?.muteLocalVideoStream(false);
      agoraEngineRef.current?.startPreview();
    }
    setVideoStop(!videoStop);
  };

  const mute = () => {
    if (isMuted === false) {
      agoraEngineRef.current?.muteLocalAudioStream(true);
      agoraEngineRef.current?.muteAllRemoteAudioStreams(isMuted);
    } else {
      agoraEngineRef.current?.muteLocalAudioStream(false);
    }
    setIsMuted(!isMuted);
  };

  const flipCamera = () => {
    agoraEngineRef.current?.switchCamera();
  };

  const addNewItem = () => {
    if (userLiveStreamList.length < 5) {
      navigation.navigate(SCREENS.STREAMTITLEITEM);
    } else {
      toast.show(<ErrorToast message='Cannot Add More Items you can add  only 5 items to the stream.' />, {
        placement: 'top',
      });
    }
  };

  const UpdateLiveStreamItem = async () => {
    try {
      if (liveStreamId) {
        const updatedAt = new Date();
        await updateLiveStreamUpdatedAt(liveStreamId, updatedAt);
      }
    } catch (error) {}
  };

  useEffect(() => {
    UpdateLiveStreamItem();
    const intervalId = setInterval(UpdateLiveStreamItem, 300000);
    return () => clearInterval(intervalId);
  }, [liveStreamId]);

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
                <React.Fragment key={remoteUid}>
                  <RtcSurfaceView
                    canvas={{uid: remoteUid}}
                    style={styles.videoView}
                  />
                </React.Fragment>
              ) : (
                <Text>
                  {isJoined ? 'Waiting for a remote user to join' : ''}
                </Text>
              )}
              <View style={styles.controlsWrapper}>
                <View
                  style={{
                    ...styles.topControls,
                    ...(isJoined ? {marginTop: 20} : {}),
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      alignSelf: 'center',
                      width: '100%',
                      justifyContent: 'center',
                      right: 0,
                      left: 0,
                    }}>
                    <View style={styles.chatTopBar}>
                      <View style={styles.profileBar}>
                        <Image
                          style={styles.profileImage}
                          source={{
                            uri:
                              ProfileData?.avatar ||
                              'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png',
                          }}
                        />
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
                  <TouchableOpacity style={styles.button} onPress={leave}>
                    <CrossIcon />
                  </TouchableOpacity>
                  {isJoined ? (
                    <>
                      <TouchableOpacity style={styles.button} onPress={mute}>
                        {isMuted === true ? (
                          <MicroPhoneInactive />
                        ) : (
                          <Image
                            style={{width: 25, height: 24}}
                            source={require('../assets/images/muteIcon.png')}
                          />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={pauseVideo}>
                        {videoStop === true ? (
                          <Image
                            style={{width: 25, height: 24}}
                            source={require('../assets/images/inVideo.png')}
                          />
                        ) : (
                          <VideoIcon />
                        )}
                      </TouchableOpacity>
                      {/* <TouchableOpacity
                    style={styles.button}
                    onPress={() => resetStack(navigation, SCREENS.STREAMTITLE)}>
                    <BioIcon />
                  </TouchableOpacity> */}
                      <TouchableOpacity onPress={flipCamera}>
                        <RotateIcon />
                      </TouchableOpacity>
                    </>
                  ) : null}
                </View>

                <View style={styles.bottomControls}>
                  <View style={styles.bottomIcons}>
                    <View style={styles.colVideo}>
                      <>
                        {userLiveStreamList &&
                        userLiveStreamList.length === 0 ? (
                          <TouchableOpacity
                            onPress={addNewItem}
                            style={[
                              styles.addButton,
                              styles.itemStream,
                              isJoined
                                ? styles.itemStreamJoined
                                : styles.itemStream,
                            ]}>
                            <AddIcon />
                            <Text
                              style={{
                                color: themeColors.primaryColor,
                                marginLeft: 20,
                              }}>
                              Add Sell Items to Your Stream
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <View
                            style={
                              isJoined ? styles.accListJoined : styles.accList
                            }>
                            <TouchableOpacity
                              style={{marginRight: 20}}
                              onPress={addNewItem}>
                              <AddIcon />
                            </TouchableOpacity>
                            <ScrollView horizontal={true}>
                              {userLiveStreamList &&
                                userLiveStreamList
                                  .slice(0, 5)
                                  .map((user: any, index: number) => {
                                    return (
                                      <TouchableOpacity
                                        key={index}
                                        onPress={() =>
                                          navigation.navigate(
                                            SCREENS.VIDEOSTREAMITEM,
                                            {itemUuid: user?.itemUuid},
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
                                            {user?.itemName}
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
                                  })}
                            </ScrollView>
                          </View>
                        )}
                      </>
                      {!isJoined ? (
                        <View style={styles.vdeoControls}>
                          <Text />
                          <Text onPress={join}>
                            <CameraRedIcon />
                          </Text>
                          <Text onPress={flipCamera}>
                            <RotateIcon />
                          </Text>
                        </View>
                      ) : (
                        <View
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            alignSelf: 'center',
                            width: '100%',
                          }}>
                          <View
                            style={{
                              justifyContent: 'center',
                              paddingVertical: moderateScale(10),
                            }}>
                            <LiveStreamChatScreen
                              handleTextInputBlur={handleTextInputBlur}
                              handleTextInputFocus={handleTextInputFocus}
                            />
                          </View>
                        </View>
                      )}
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

export default LiveVideo;

const styles = StyleSheet.create({
  mainWrapper: {
    width: width,
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
    paddingHorizontal: moderateScale(25),
  },
  bottomControls: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'flex-end',
  },
  bottomIcons: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
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
  videoView: {
    width: width,
    height: height,
    position: 'absolute',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    color: '#fff',
  },
  addButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '100%',
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
  bottomView: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
  },
  imageStyle: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
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
  sqrImage: {
    width: 32,
    height: 32,
    borderRadius: 10,
  },
  fixedPrice: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  accAddDes: {
    color: themeColors.garyColor,
    fontSize: 12,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '600',
  },
  accListJoined: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'scroll',
    marginBottom: 100,
  },
  accList: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'scroll',
    marginBottom: 20,
  },
  inputField: {
    borderWidth: 1,
    borderColor: themeColors.garyColor,
    color: themeColors.primaryColor,
    borderRadius: 100,
    fontSize: 14,
    width: '88%',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(24),
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
  vdeoControls: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  colVideo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  itemStreamJoined: {
    marginBottom: 100,
  },
  itemStream: {
    marginBottom: 30,
  },
  profileImage: {
    height: verticalScale(30),
    width: verticalScale(30),
    borderRadius: 50,
    marginRight: 5,
  },
});
