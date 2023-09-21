import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import Layout from '../common/Layout';
import {updateLiveStream} from '../services/PostApi';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {SCREENS} from '../typings/screens-enums';
import {resetStack} from '../utils/helper';
import ErrorToast from '../common/toasters/ErrorToast';

type RouteParams = {
  leaveChannel: () => void;
  disableVideo: () => void;
  liveStreamId: any;
  removeListners: () => void;
  setRemoteUid: any;
};

const LiveStreamEnd = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);

  const {
    leaveChannel,
    disableVideo,
    liveStreamId,
    removeListners,
    setRemoteUid,
  } = route.params as RouteParams;
  const toast = useToast();
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.removeItem('channelName');
      await AsyncStorage.removeItem('data');
    } catch (error) {}
  };
  const leave = async (actionStatusId = 2) => {
    try {
      setRemoteUid(0);
      if (liveStreamId) {
        setIsLoading(true);
        const {error, message} = await updateLiveStream(
          liveStreamId,
          actionStatusId,
        );
        setIsLoading(false);
        if (error) {
          toast.show(<ErrorToast message={message}/>, {
            placement: 'top',
          });
        }
      }
      leaveChannel();
      disableVideo();
      resetStack(navigation, SCREENS.SOCIALART);
      removeListners();
      clearAsyncStorage();
    } catch (e) {}
  };
  return (
    <Layout>
      <View style={styles.qrContainer}>
        <ImageBackground
          source={require('../assets/images/itemBg.png')}
          style={styles.stmBg}>
          <View>
            <Text style={styles.endTitle}>End of Livestream</Text>
            <Text style={styles.endDes}>
              Are you sure you want to end the livestream?
            </Text>
          </View>
          <View style={styles.buttonMain}>
            <TouchableOpacity
              style={styles.activityIndicatorContainer}
              onPress={() => leave(2)}
              disabled={isLoading}>
              <Text
                style={[
                  styles.aquaBorderButton,
                  {color: themeColors.lightred},
                ]}>
                {isLoading ? (
                  <ActivityIndicator
                    size="small"
                    color={themeColors.primaryColor}
                  />
                ) : (
                  'End Now'
                )}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate(SCREENS.LIVEVIDEO)}>
              <Text style={styles.aquaBorderButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </Layout>
  );
};

export default LiveStreamEnd;

const styles = StyleSheet.create({
  qrContainer: {
    flex: 1,
    marginTop: 10,
  },
  stmBg: {
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  endTitle: {
    fontSize: 24,
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    marginBottom: 10,
  },
  endDes: {
    fontSize: 14,
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    marginBottom: 40,
  },
  aquaBorderButton: {
    color: themeColors.primaryColor,
    minWidth: '50%',
    textAlign: 'center',
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: 14,
  },
  buttonMain: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  activityIndicatorContainer: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
});
