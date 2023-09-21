import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, FC} from 'react';
import Layout from '../common/Layout';
import {themeColors} from '../theme/colors';
import {size} from '../theme/fontstyle';
import {Fontfamily} from '../theme/fontFamily';
import {verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../typings/screens-enums';
import {newLiveStream} from '../services/PostApi';
import {useSelector} from 'react-redux';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {useToast} from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {selectActiveWalletAddress} from '../store/selectors/NapaAccount';
import ErrorToast from '../common/toasters/ErrorToast';

const StreamTitle: FC = () => {
  const navigation = useNavigation<any>();
  const {navigate} = navigation;
  const [channelName, setChannelName] = useState('');
  const [streamTitleErrMessage, setStreamTitleErrMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  let profileId = useSelector(selectProfileList)?.profileId;
  const walletAddress = useSelector(selectActiveWalletAddress);

  const handleClick = async () => {
    const isValid = handleValidation();
    if (isValid) {
      setIsLoading(true);
      const {error, message, data} = await newLiveStream(
        profileId,
        walletAddress,
        channelName,
      );
      if (error) {
        toast.show(<ErrorToast message={message} />, {
          placement: 'top',
        });
      }
      if (!error) {
        await AsyncStorage.setItem('channelName', channelName);
        await AsyncStorage.setItem('data', JSON.stringify(data?.data));
        navigate(SCREENS.LIVEVIDEO);
      }
    }
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setInputEmptyText();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const setInputEmptyText = () => {
    setChannelName('');
  };

  const handleInputChange = (title: string) => {
    setChannelName(title);
    setStreamTitleErrMessage('');
  };

  const handleValidation = () => {
    if (channelName.trim() === '') {
      setStreamTitleErrMessage('Stream title is required');
      return false;
    }
    return true;
  };
  return (
    <Layout>
      <View style={styles.qrContainer}>
        <ImageBackground
          source={require('../assets/images/stream-titlebg.png')}
          style={styles.stmBg}>
          <View style={styles.inputMain}>
            <TextInput
              style={styles.inputField}
              placeholderTextColor={themeColors.garyColor}
              placeholder="Enter livestream title"
              value={channelName}
              onChangeText={handleInputChange}
            />
            <Text style={styles.errorText}>{streamTitleErrMessage}</Text>
          </View>
          <View style={styles.buyButton}>
            <View style={styles.smTextMain}>
              <Text style={styles.smText}>
                The entire NAPA community will see this title in the stream list
                but require your permissions to join.
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleClick}
              activeOpacity={1.0}
              disabled={isLoading}
              style={styles.buy}>
              {isLoading ? (
                <ActivityIndicator
                  size="small"
                  color={themeColors.secondaryColor}
                />
              ) : (
                <Text style={styles.buyText}>Add Title</Text>
              )}
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </Layout>
  );
};

export default StreamTitle;

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
  },
  inputMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height,
    zIndex: 99,
    width: '100%',
    paddingHorizontal: 35,
  },
  inputField: {
    color: themeColors.primaryColor,
    width: '100%',
    fontSize: size.vxlg,
    fontFamily: Fontfamily.Neuropolitical,
    textAlign: 'center',
  },
  smTextMain: {
    width: '60%',
    marginBottom: 20,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: Dimensions.get('window').height,
  },
  smText: {
    color: themeColors.primaryColor,
    textAlign: 'center',
    fontSize: size.default,
    lineHeight: 22,
  },
  buyButton: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: Dimensions.get('window').height,
  },
  buy: {
    backgroundColor: themeColors.aquaColor,
    width: Dimensions.get('window').width,
    paddingVertical: verticalScale(20),
  },
  buyText: {
    textAlign: 'center',
    color: themeColors.secondaryColor,
    fontSize: size.default,
    fontFamily: Fontfamily.Neuropolitical,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});
