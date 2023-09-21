import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import imageIndex from '../assets/imageIndex';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../typings/screens-enums';
import AsyncStorage from '@react-native-async-storage/async-storage';
type LiveStreamCardProps = {
  item: any;
};

const LiveStreamCard: React.FC<LiveStreamCardProps> = ({item}) => {
  const navigation = useNavigation();
  const setDataForJoin = async () => {
    await AsyncStorage.setItem('channelName', item?.streamTitle);
    await AsyncStorage.setItem('data', JSON.stringify(item));
    navigation.navigate(SCREENS.JOINERLIVEVIDEO, {
      liveStreamId: item.streamId,
      streamToken: item.streamToken,
      streamTitle: item.streamTitle,
    });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={setDataForJoin}>
        <ImageBackground
          borderRadius={24}
          source={imageIndex.bgImage}
          style={styles.bgImageStyle}>
          <View style={styles.headerContainer}>
            <View style={styles.liveContent}>
              <Text style={styles.liveLabel}>Live</Text>
            </View>
            <View style={styles.totalViewersContent}>
              <Text style={styles.viewersLabel}>
                {item.streamUserCount} viewers
              </Text>
            </View>
          </View>
          <View style={styles.bottomView}>
            <Text style={styles.streamTitleStye} numberOfLines={2}>
              {item?.streamTitle}
            </Text>
            <View style={styles.userDetailView}>
              <Image
                source={item?.avtar ? item?.avtar : imageIndex.userImage}
                style={styles.imageStyle}
              />
              <Text style={styles.userNameStyle}>{item?.profileName}</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default LiveStreamCard;

const styles = StyleSheet.create({
  userNameStyle: {
    fontSize: 12,
    color: 'white',
    fontFamily: Fontfamily.Avenier,
    marginLeft: 8,
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
  },
  userDetailView: {
    flexDirection: 'row',
    paddingVertical: 18,
  },
  bottomView: {
    justifyContent: 'flex-end',
    flex: 1,
    paddingLeft: 16,
  },
  streamTitleStye: {
    color: 'white',
    fontSize: 14,
    fontFamily: Fontfamily.Neuropolitical,
  },
  viewersLabel: {
    color: 'white',
    fontSize: 12,
    fontFamily: Fontfamily.Avenier,
    paddingHorizontal: 8,
  },
  totalViewersContent: {
    height: 24,
    backgroundColor: themeColors.blurBackground,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveLabel: {
    color: 'white',
    fontSize: 12,
    fontFamily: Fontfamily.Avenier,
    paddingHorizontal: 8,
  },
  liveContent: {
    height: 24,
    backgroundColor: themeColors.lightred,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 24,
  },
  bgImageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  container: {
    width: '48%',
    height: 220,
    borderRadius: 24,
    margin: 4,
  },
});
