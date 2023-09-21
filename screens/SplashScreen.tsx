import React, {useRef} from 'react';
import {useEffect, useState} from 'react';
import {View, Text, Platform} from 'react-native';
import Video from 'react-native-video';
import {fetchProfileData} from '../store/slices/ProfileDetail';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WEBSOCKET_URL} from '../const/Url';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
// import messaging from '@react-native-firebase/messaging';

// async function requestUserPermission() {
//   return new Promise(async resolve => {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     if (enabled) {
//       resolve(authStatus);
//     }
//   });
// }

const SplashScreen = () => {
  // const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  // dispatch(fetchProfileData({emailAddress:'tester@test.com'}));
  // dispatch(fetchProfileData('Account11@gmail.com'));
  // dispatch(fetchProfileData({emailAddress: 'saurabh10@gmail.com'}));
  const profileId = useSelector(selectProfileList)?.profileId;
  const generalServicesSocketRef = useRef<any>(null);
  const getProfileData = async () => {
    const emailAddress = await AsyncStorage.getItem('emailAddress');
    if (emailAddress) {
      // setEmail(emailAddress);
      dispatch(fetchProfileData({emailAddress}));
    }
    if (!emailAddress) {
      const clearAppData = async function () {
        try {
          const keys = await AsyncStorage.getAllKeys();
          await AsyncStorage.multiRemove(keys);
        } catch (error) {
          console.error('Error clearing app data.');
        }
        clearAppData();
      };
    }
  };
  useEffect(() => {
    getProfileData();
  }, []);

  // useEffect(() => {
  //   let unsubscribeTokenRefresh: any;
  //   (async () => {
  //     if (Platform.OS === 'ios') {
  //       const permission = await requestUserPermission();
  //       if (permission) {
  //         const newToken = await messaging().getToken();
  //         console.log('Refreshed FCM token ios:', newToken);
  //       }
  //     } else {
  //       const newToken = await messaging().getToken();
  //       console.log('Refreshed FCM token android:', newToken);
  //     }
  //   })();

  //   // Clean up the listener when the component unmounts
  //   return () => unsubscribeTokenRefresh();
  // }, []);

  // const connectToGeneralServices = () => {
  //   if (profileId && generalServicesSocketRef.current == null) {
  //     generalServicesSocketRef.current = new WebSocket(WEBSOCKET_URL);
  //     generalServicesSocketRef.current.addEventListener(
  //       'message',
  //       ({data}: any) => {
  //         const response = JSON.parse(data);
  //         if (response?.event === `update-user-${profileId}`) {
  //           dispatch(fetchProfileData(profileId));
  //         }
  //       },
  //     );
  //   }
  // };

  // useEffect(() => {
  //   connectToGeneralServices();
  //   if (generalServicesSocketRef.current) {
  //     generalServicesSocketRef.current.onclose = (e: any) => {
  //       console.log(
  //         'General Services Socket is closed. Reconnect will be attempted in 1 second.',
  //         e.reason,
  //       );
  //       setTimeout(() => {
  //         if (generalServicesSocketRef.current) {
  //           connectToGeneralServices();
  //         }
  //       }, 1000);
  //     };
  //   }
  //   return () => {
  //     if (generalServicesSocketRef.current) {
  //       generalServicesSocketRef.current.close();
  //       generalServicesSocketRef.current = null;
  //     }
  //   };
  // }, [profileId]);

  return (
    <View style={{backgroundColor: '#181B1B'}}>
      <Video
        source={require('../assets/videos/splashvideo.mp4')} // the video file
        paused={false}
        repeat={true}
        style={{width: '100%', height: '100%'}}
        muted={false}
        resizeMode={'cover'}
        volume={1.0}
        rate={1.0}
        ignoreSilentSwitch={'ignore'}
        playWhenInactive={true}
        playInBackground={true}
      />
    </View>
  );
};

export default SplashScreen;
