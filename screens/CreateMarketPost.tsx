import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {BackIcon, CameraIcon, MuteIcon, UnMuteIcon} from '../assets/svg';
import Layout from '../common/Layout';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {SCREENS} from '../typings/screens-enums';
import {useEffect, useState} from 'react';
import Video from 'react-native-video';
import {useDispatch, useSelector} from 'react-redux';
import {selectImageList} from '../store/selectors/image';
import {handleGetImage} from '../utils/helper';
import {PermissionsAndroid, Platform} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {Camera} from 'react-native-vision-camera';
import {setImg} from '../store/slices/image';
import CreatePostDropdownProps from '../common/CreatePostDropDown';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
const CreateMarketPost = () => {
  const {navigate} = useNavigation<any>();
  const dispatch = useDispatch();
  const selectImage = useSelector(selectImageList);
  const isFocused = useIsFocused();
  const [firstImage, setFirstImage] = useState('');
  const [selectGalleryImage, setSelectGalleryImage] = useState(false);
  const [selectFilterVideo, setSelectFilterVideo] = useState<any>('All');
  const [isMuted, setIsMuted] = useState(false);
  const [first, setfirst] = useState<any>([]);
  const [handleVideo, setHandleVideo] = useState<any>(false);
  const [loading, setLoading] = useState(false);
  const [paused, setPaused] = useState(true);
  const filterVideo = ['Recent', 'All'];
  const [media, setMedia] = useState({
    image: '',
    video: '',
  });

  useEffect(() => {
    handleGetImage(selectImage, setMedia);
  }, [handleGetImage, selectImage, selectGalleryImage]);

  const camera = async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus();
    const newCameraPermission = await Camera.requestCameraPermission();
    if (
      cameraPermission == 'authorized' ||
      newCameraPermission == 'authorized'
    ) {
      if (Platform.OS == 'android') {
        hasAndroidPermission();
      }
    }
  };
  useEffect(() => {
    camera();
  }, []);

  async function hasAndroidPermission() {
    const permission =
      //@ts-ignore
      Platform.Version >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(permission);
    setHandleVideo(true);
    return status;
  }

  // useEffect(() => {
  //   if (Platform.OS === 'android') {
  //     hasAndroidPermission();
  //   }
  // }, []);

  async function recentPicture() {
    try {
      setLoading(true);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 2);

      const {edges} = await CameraRoll.getPhotos({
        first: 100,
        assetType: 'Videos',
      });
      const filteredEdges = edges.filter(edge => {
        const creationTime = new Date(edge.node.timestamp * 1000);
        return creationTime > yesterday && creationTime <= today;
      });
      let arr = [];
      for (let key in edges) {
        arr.push(edges[key].node.image.uri);
      }

      if (selectFilterVideo == 'Recent') {
        const mp4Urls: any = filteredEdges
          .filter(edge => edge.node.type === 'video/mp4')
          .map(edge => edge.node.image.uri)
          .sort();

        if (mp4Urls.length) {
          setFirstImage(mp4Urls[0]);
          setfirst(mp4Urls);
          dispatch(setImg(mp4Urls[0]));
          setLoading(false);
        } else {
          setLoading(false);
          console.log('No MP4 videos found in the gallery');
        }
      } else {
        if (arr.length) {
          setFirstImage(arr[0]);
          setfirst(arr);
          dispatch(setImg(arr[0]));
          setLoading(false);
        } else {
          setLoading(false);
          console.log('No MP4 videos found in the gallery');
        }
      }
    } catch (err) {
      setLoading(false);
      console.log(err, 'err');
    }
  }

  useEffect(() => {
    recentPicture();
    console.log('test');
  }, [!firstImage, selectFilterVideo, handleVideo]);

  let assetURI;
  if (selectImage.includes('file:///')) {
    assetURI = selectImage;
  } else {
    let phURI = selectImage;
    assetURI = `assets-library://asset/asset.mp4?id=${phURI.slice(
      5,
      41,
    )}&ext=mp4`;
  }

  const handleTakeAudioPermission = async () => {
    console.log('handleTakeAudioPermission');
    const result = await request(PERMISSIONS.IOS.MICROPHONE);
    if (result === RESULTS.GRANTED) {
      console.log('Microphone permission granted');
    } else {
      console.log('Microphone permission denied');
    }
  };

  useEffect(() => {
    if (Platform.OS == 'ios') {
      handleTakeAudioPermission();
    }
  }, []);

  useEffect(() => {
    setIsMuted(true);
    setPaused(false);
  }, [isFocused]);

  return (
    <Layout>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate(SCREENS.SOCIALART)}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create New Post</Text>
        <TouchableOpacity
          onPress={() => {
            setIsMuted(!isMuted);
            navigate(SCREENS.CREATENEWPOSTDETAIL);
          }}
          // onPress={() => navigate(SCREENS.CREATENEWPOSTEDIT)}
          style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: verticalScale(300),
          marginBottom: 40,
        }}>
        {/* {!media.image && !media.video && Platform.OS === 'android' && (
          <Image
            style={{
              width: '100%',
              height: verticalScale(300),
              marginVertical: 20,
            }}
            resizeMode="cover"
            source={{uri: 'file://' + firstImage}}
          />
        )}
        {!media.image && !media.video && Platform.OS === 'ios' && (
          <Image
            style={{
              width: '100%',
              height: verticalScale(300),
              marginVertical: 20,
            }}
            resizeMode="cover"
            source={{uri: firstImage}}
          />
        )}
        {media.image && !media.video && Platform.OS === 'android' && (
          <Image
            style={{
              width: '100%',
              height: verticalScale(300),
              marginVertical: 20,
            }}
            resizeMode="cover"
            source={{uri: media.image}}
          />
        )}
        */}
        {/* {media.image && !media.video && Platform.OS === 'ios' && (
          <Image
            style={{
              width: '100%',
              height: verticalScale(300),
              marginVertical: 20,
            }}
            resizeMode="cover"
            source={{uri: media.image}}
          />
        )} */}
        {media.video && !media.image && Platform.OS == 'android' && (
          <Video
            source={{uri: media.video}}
            paused={paused}
            repeat={true}
            style={{width: '100%', height: '100%'}}
            muted={isMuted}
            resizeMode={'cover'}
            volume={1.0}
            rate={1.0}
            ignoreSilentSwitch={'ignore'}
          />
        )}
        {Platform.OS == 'ios' && (
          <Video
            source={{uri: assetURI}}
            paused={false}
            repeat={true}
            style={{width: '100%', height: '100%'}}
            muted={isMuted}
            resizeMode={'cover'}
            volume={1.0}
            rate={1.0}
            ignoreSilentSwitch={'ignore'}
          />
        )}
      </View>
      <View
        style={{
          position: 'absolute',
          top: '15%',
          width: '100%',
          alignItems: 'flex-end',
          paddingRight: 20,
        }}>
        {isMuted ? (
          <TouchableOpacity
            onPress={() => setIsMuted(!isMuted)}
            style={{marginBottom: 7}}>
            <MuteIcon color={themeColors.primaryColor} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setIsMuted(!isMuted)}
            style={{marginBottom: 3}}>
            <UnMuteIcon color={themeColors.primaryColor} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.recentPic}>
        <CreatePostDropdownProps
          data={filterVideo}
          selectedOption={selectFilterVideo}
          setSelectedOption={setSelectFilterVideo}
        />
      </View>
      {!loading ? (
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              zIndex: 1,
              elevation: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginBottom: 30,
                width: '100%',
                elevation: 1,
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigate(SCREENS.CAMERA);
                }}
                style={{
                  width: '25%',
                }}>
                <ImageBackground
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 100,
                  }}
                  source={require('../assets/images/blur.png')}>
                  <CameraIcon />
                </ImageBackground>
              </TouchableOpacity>

              {first.map((item: any, index: number) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{width: '25%', height: 100}}
                    onPress={() => {
                      dispatch(setImg(item));
                      setSelectGalleryImage(true);
                    }}>
                    <Image
                      source={{uri: item}}
                      style={{width: '100%', height: 100}}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            height: '20%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={themeColors.primaryColor} />
        </View>
      )}
    </Layout>
  );
};

export default CreateMarketPost;
const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: moderateScale(8),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(24),
    paddingBottom: moderateScale(10),
    paddingTop: Platform.OS === 'ios' ? moderateScale(10) : moderateScale(20),
  },
  headerTitle: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.md,
  },
  recentPic: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    paddingBottom: moderateScale(20),
    zIndex: 1,
    elevation: 1,
  },
  recentText: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.md,
    paddingLeft: moderateScale(24),
    paddingRight: moderateScale(10),
  },
  recentIcon: {
    paddingTop: 4,
  },
  headerButton: {},
  headerButtonText: {
    color: themeColors.aquaColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontWeight: '400',
    fontSize: size.default,
  },
});
