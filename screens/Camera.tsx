import React from 'react';
import {TouchableOpacity, View, Image, Text, Platform} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useEffect, useRef, useState} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import Layout from '../common/Layout';
import {
  CameraCircleIcon,
  CameraRedIcon,
  CrossIcon,
  FlashIcon,
  FlashIconOff,
} from '../assets/svg';
import {RotateIcon} from '../assets/svg/RotateIcon';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../typings/screens-enums';
import {useDispatch, useSelector} from 'react-redux';
import {setImg, setImgObject} from '../store/slices/image';
import {cameraActionButtons} from '../const/cameraActionButtons';
import {launchImageLibrary} from 'react-native-image-picker';
import {PERMISSIONS, request} from 'react-native-permissions';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {get} from 'lodash';
const CameraScreen = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation<any>();
  const [video, setVideo] = useState(false);
  const [first, setFirst] = useState('Video');
  const [cameraToggle, setCameraToggle] = useState(true);
  const [flash, setFlash] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [firstAsset, setFirstAsset] = useState<any>(null);
  const userProfile = useSelector(selectProfileList);
  let timerRef: any = useRef(0);
  const camera = async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus();
    const newCameraPermission = await Camera.requestCameraPermission();
  };
  useEffect(() => {
    camera();
  }, []);

  const cameras = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = cameraToggle ? devices.back : devices.front;

  const takePhoto = async () => {
    if (cameras.current !== null) {
      const photo = await cameras.current.takePhoto({
        flash: flash ? 'on' : 'off',
      });
      try {
        dispatch(setImg(photo.path));
        dispatch(setImgObject(photo));
        navigate(SCREENS.CREATEMARKETPOST);
      } catch (e) {}
    }
  };

  const takeVideo = async () => {
    if (video) {
      setVideo(false);
      clearInterval(timerRef.current);
      setTimer(0);
      if (cameras.current !== null) {
        await cameras.current.stopRecording();
        navigate(SCREENS.CREATEMARKETPOST);
      }
    } else {
      setVideo(true);
      if (cameras.current !== null) {
        const video = cameras.current.startRecording({
          flash: flash ? 'on' : 'off',
          onRecordingFinished: async video => {
            try {
              dispatch(setImg(video.path));
              dispatch(setImgObject(video));
              console.log(video, 'video');
            } catch (e) {}
          },
          onRecordingError: error => console.error(error, 'error'),
        });
      }
      timerRef.current = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  };

  const options: any = {
    mediaType: 'mixed',
  };

  const handleOpenLiabrary = async () => {
    const result: any = await launchImageLibrary(options);
    dispatch(setImg(result.assets[0].uri));
    navigate(SCREENS.CREATEMARKETPOST);
  };
  const requestRecordAudioPermission = async () => {
    if (Platform.OS === 'android') {
      request(PERMISSIONS.ANDROID.RECORD_AUDIO).then((result: any) => {
        console.log(result, 'result');
      });
    }
  };

  useEffect(() => {
    requestRecordAudioPermission();
  }, []);

  // useEffect(() => {
  //   const getPhotos = async () => {
  //     const {edges} = await CameraRoll.getPhotos({
  //       first: 10,
  //       assetType: 'All',
  //     });
  //     setFirstAsset(edges[0]?.node?.image?.uri);
  //   };
  //   getPhotos();
  // }, []);

  return (
    <Layout>
      {device && (
        <>
          {/* <StatusBar backgroundColor="transparent" translucent={true} /> */}
          <View style={{flex: 1}}>
            <Camera
              ref={cameras}
              style={{flex: 1, width: '100%', height: '83%'}}
              device={device}
              isActive={true}
              photo={true}
              video={true}
              audio={true}
            />
            <TouchableOpacity
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
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  {video ? (
                    <Text
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        width: '100%',
                        fontSize: 20,
                      }}>
                      {timer}
                      {/* {'00' + ':' + '0' + num + ':' + timer} */}
                    </Text>
                  ) : (
                    cameraActionButtons.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => setFirst(item)}>
                          <Text
                            style={{
                              color: 'white',
                              textAlign: 'center',
                              marginBottom: moderateScale(10),
                              marginLeft: moderateScale(15),
                            }}>
                            {item}
                          </Text>
                        </TouchableOpacity>
                      );
                    })
                  )}
                </View>
                <View
                  style={{
                    paddingHorizontal: moderateScale(43),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: moderateScale(10),
                  }}>
                  <TouchableOpacity onPress={handleOpenLiabrary}>
                    <Image
                      style={{borderRadius: 24, height: 40, width: 40}}
                      source={{
                        uri:
                          userProfile?.avatar ||
                          'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png',
                      }}
                    />
                  </TouchableOpacity>
                  {first === 'Video' ? (
                    <TouchableOpacity onPress={takeVideo}>
                      <CameraRedIcon />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={takePhoto}>
                      <CameraCircleIcon />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    onPress={() => setCameraToggle(!cameraToggle)}>
                    <RotateIcon />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigate(SCREENS.CREATEMARKETPOST)}
            style={{
              position: 'absolute',
              top: 20,
              left: 10,
              paddingTop: 20,
            }}>
            <CrossIcon />
          </TouchableOpacity>
          {flash ? (
            <TouchableOpacity
              onPress={() => setFlash(false)}
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                paddingTop: 20,
              }}>
              <FlashIcon />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setFlash(true)}
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                paddingTop: 20,
              }}>
              <FlashIconOff />
            </TouchableOpacity>
          )}
        </>
      )}
    </Layout>
  );
};

export default CameraScreen;
