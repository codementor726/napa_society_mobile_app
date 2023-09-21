/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {StatusBar, LogBox, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import store from './store';
import BottomTabs from './navigation/bottomTabs';
import {ToastProvider} from 'react-native-toast-notifications';
import Notifee, {AndroidImportance} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
const App = () => {
  const showNotification = async (message: any) => {
    try {
      const permission: any = await AsyncStorage.getItem('notification');
      if (permission == 'true') {
        console.log('Notification display', message);
        const title: any = message?.notification?.title
          ? message?.notification?.title
          : 'Test';
        const body = message?.notification?.body
          ? message?.notification?.body
          : 'Test';
        const messageId = message?.messageId ? message?.messageId : '';
        if (title && body && messageId) {
          // Create a channel (required for Android)
          const channelId = await Notifee.createChannel({
            id: messageId,
            name: title,
          });

          await Notifee.displayNotification({
            title:
              Platform.OS == 'ios'
                ? title
                : '<p style="color: white; font-weight: 600; font-size: 16px; font-family: Avenir-Regular; margin-top: 0px;margin-bottom: 0px"><b>' +
                  title +
                  '</b></p>',
            body:
              Platform.OS === 'ios'
                ? body
                : '<p style="color: white; font-size: 14px; font-family: Avenir-Regular;margin-top: 0px;margin-bottom: 0px">' +
                  body +
                  '</p>',
            android: {
              channelId: channelId,
              importance: AndroidImportance.HIGH,
              smallIcon: 'ic_launcher', // (optional) default: "ic_notification" with fallback for "ic_launcher"
            },
          });
        }
      }
    } catch (error) {
      console.log('Notification display error:', error);
    }
  };

  useEffect(() => {
    LogBox.ignoreLogs([
      'VirtualizedLists should never be nested',
      'componentWillReceiveProps',
    ]);
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      showNotification(remoteMessage);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      showNotification(remoteMessage);
    });
  }, []);

  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        AsyncStorage.setItem('fcmToken', token);
      })
      .catch(error => {
        console.log(error, 'error');
      });
  }, []);

  return (
    <Provider store={store}>
      <ToastProvider normalColor="transparent">
        <>
          <NavigationContainer>
            <StatusBar backgroundColor="black" barStyle="default" />
            <BottomTabs />
          </NavigationContainer>
        </>
      </ToastProvider>
    </Provider>
  );
};

export default App;
