import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {themeColors} from '../theme/colors';
import {size} from '../theme/fontstyle';
import {Fontfamily} from '../theme/fontFamily';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {getSnft} from '../services/MarketPlace';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
import Header from '../common/Header';
import {
  BackIcon,
  DoubleDotIcon,
  EthereumIcon,
  PlayIcon,
  StarIcon,
  TetherIcon,
} from '../assets/svg';
import MarketPriceDetail from './MarketPriceDetail';
import MarketPriceHistory from './MarketPriceHistory';
import {NapaTokenIcon} from '../assets/svg/NapaTokenIcon';
import {SCREENS} from '../typings/screens-enums';
import NftTransactionHistory from './NftTransactionHistory';

const NftDetailPage = ({route}: any) => {
  const {snftId, marketId}: any = route?.params;
  const {navigate, goBack} = useNavigation<any>();
  const videoRef = React.useRef<any>(null);
  const [SNFTDetail, setSNFTDetail] = useState<any>([]);
  const [showPauseButton, setShowPauseButton] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [detail, setDetail] = useState(true);
  const [history, setHistory] = useState(false);
  const [previousEarning, setPreviousEarning] = useState<boolean>(false);

  const handleGetSNFt = async () => {
    const {data, error, message} = await getSnft(snftId);
    if (error) {
      console.log(message, 'message');
      return;
    }
    setSNFTDetail(data?.data);
  };

  useEffect(() => {
    handleGetSNFt();
  }, [snftId]);

  const onEnd = () => {
    setShowPauseButton(true);
    if (Platform.OS == 'android') {
      videoRef.current.seek(0);
    }
    setRepeat(false);
  };
  const onPlayButtonPress = () => {
    console.log('test test');
    setShowPauseButton(false);
    videoRef.current.seek(0);
    setRepeat(true);
  };

  const handleCurrenyIcon = (currencyType: string = '0') => {
    if (currencyType == '0') {
      return (
        <NapaTokenIcon
          bgColor={themeColors.aquaColor}
          iconColor={themeColors.secondaryColor}
          width={25}
          height={25}
        />
      );
    }
    if (currencyType == '1') {
      return (
        <TetherIcon
          bgColor="#FFD978"
          iconColor="white"
          width={25}
          height={25}
        />
      );
    } else {
      return (
        <EthereumIcon
          bgColor="#6481E7"
          iconColor={themeColors.primaryColor}
          width={25}
          height={25}
        />
      );
    }
  };

  return (
    <View
      style={{
        backgroundColor: themeColors.secondaryColor,
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <View>
        <ImageBackground
          imageStyle={{
            height: verticalScale(355),
            flex: 1,
          }}
          style={styles.profileGradient}
          source={require('../assets/images/marketPlaceGradient.png')}>
          <ImageBackground
            imageStyle={{
              height: verticalScale(355),
            }}
            source={require('../assets/images/marketPlaceGradient.png')}>
            <Video
              ref={videoRef}
              source={{
                uri:
                  Platform.OS == 'ios'
                    ? SNFTDetail?.videoURL
                    : SNFTDetail?.mobileVideoURL,
              }}
              paused={showPauseButton}
              repeat={Platform.OS == 'ios' && repeat}
              style={{
                height: verticalScale(355),
                width: '100%',
                position: 'relative',
              }}
              resizeMode="cover"
              muted={false}
              onEnd={onEnd}
            />
            {showPauseButton && (
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                  zIndex: 999,
                }}
                onPress={() => {
                  onPlayButtonPress();
                }}>
                <PlayIcon />
              </TouchableOpacity>
            )}
            <View style={{position: 'absolute'}}>
              <View
                style={{
                  marginTop: 30,
                }}>
                <Header
                  leftChildren={
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity onPress={() => goBack()}>
                        <BackIcon />
                      </TouchableOpacity>
                    </View>
                  }
                  title={false}
                  rightChildren={
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'flex-end',
                      }}>
                      <TouchableOpacity style={styles.starIcon}>
                        <StarIcon />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <DoubleDotIcon />
                      </TouchableOpacity>
                    </View>
                  }
                />
              </View>
              <View
                style={[
                  styles.container,
                  {
                    height: verticalScale(280),
                  },
                ]}>
                <View style={styles.profile}>
                  <Image
                    style={{height: 40, width: 40, borderRadius: 50}}
                    source={{uri: SNFTDetail?.userImage}}
                  />
                  <Text style={styles.profileTitle}>
                    {SNFTDetail?.userName}
                  </Text>
                </View>
                <View style={styles.profileTextContainer}>
                  <Text style={styles.heading}>{SNFTDetail?.SNFTTitle} </Text>
                  <Text style={styles.subHeading}>
                    {SNFTDetail?.SNFTDescription}
                  </Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </ImageBackground>
      </View>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: moderateScale(15),
            marginBottom: moderateScale(15),
            paddingHorizontal: moderateScale(10),
          }}>
          <TouchableOpacity
            onPress={() => {
              setHistory(false);
              setDetail(true);
              setPreviousEarning(false);
            }}
            style={{
              marginHorizontal: moderateScale(10),
              borderBottomColor: detail ? 'white' : 'transparent',
              borderBottomWidth: 1,
              paddingBottom: moderateScale(5),
            }}>
            <Text
              style={{
                color: 'white',
              }}>
              Details
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setHistory(true);
              setDetail(false);
              setPreviousEarning(false);
            }}
            style={{
              marginHorizontal: moderateScale(10),
              borderBottomColor: history ? 'white' : 'transparent',
              borderBottomWidth: 1,
              paddingBottom: moderateScale(5),
            }}>
            <Text style={{color: 'white'}}>Price History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setHistory(false);
              setDetail(false);
              setPreviousEarning(true);
            }}
            style={{
              marginHorizontal: moderateScale(10),
              borderBottomColor: previousEarning ? 'white' : 'transparent',
              borderBottomWidth: 1,
              paddingBottom: moderateScale(5),
            }}>
            <Text style={{color: 'white'}}>Transaction History</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {detail && (
            <MarketPriceDetail
              snftDetail={SNFTDetail}
              handleCurrenyIcon={handleCurrenyIcon}
            />
          )}
          {history && <MarketPriceHistory />}
          {previousEarning && (
            <FlatList
              data={['1', '2', '3', '4', '5', '6']}
              renderItem={() => <NftTransactionHistory />}
            />
          )}
        </ScrollView>
      </View>
      <TouchableOpacity
        onPress={() => navigate(SCREENS.SELL, {id: snftId, nft: true})}
        style={styles.sellButton}>
        <Text style={styles.sellbuttonText}>Sell</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NftDetailPage;

const styles = StyleSheet.create({
  starIcon: {
    marginRight: moderateScale(15),
  },
  container: {
    paddingHorizontal: moderateScale(24),
    justifyContent: 'flex-end',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileTitle: {
    marginLeft: moderateScale(10),
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.default,
  },
  profileTextContainer: {},
  heading: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.xxlg,
    fontWeight: '500',
    marginTop: moderateScale(10),
    marginBottom: moderateScale(12),
    lineHeight: verticalScale(28),
  },
  subHeading: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
    lineHeight:
      Dimensions.get('window').width < 400
        ? verticalScale(15)
        : verticalScale(20),
    marginBottom:
      Dimensions.get('window').width < 400
        ? verticalScale(0)
        : verticalScale(20),
  },
  marketDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marketDetailPoints: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Grostestk,
    fontSize: size.lg,
    marginLeft: moderateScale(10),
    fontWeight: '500',
  },
  marketDetailPointsEnd: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Grostestk,
    fontSize: size.lg,
    fontWeight: '500',
  },
  marketDetailTabs: {
    paddingHorizontal: moderateScale(24),
    flexDirection: 'row',
    paddingBottom: moderateScale(5),
    marginTop: moderateScale(10),
  },
  marketDetailTabsText: {
    color: themeColors.primaryColor,
    marginRight: moderateScale(20),
  },
  buyButtonLoader: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 70,
    backgroundColor: themeColors.aquaColor,
  },
  buyButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: themeColors.cardsColor,
  },
  buy: {
    backgroundColor: themeColors.aquaColor,
    // paddingVertical:
    //   Platform.OS == 'ios' ? moderateScale(15) : moderateScale(20),
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
  },
  buySubmit: {
    backgroundColor: themeColors.lightAquaColor,
    // paddingVertical:
    //   Platform.OS == 'ios' ? moderateScale(15) : moderateScale(20),
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
  },
  buyText: {
    textAlign: 'center',
    color: themeColors.secondaryColor,
    fontSize: size.default,
    fontWeight: '400',
    fontFamily: Fontfamily.Neuropolitical,
  },
  sellButton: {
    backgroundColor: themeColors.aquaColor,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
  },
  buyTextSubmit: {
    textAlign: 'center',
    color: themeColors.primaryColor,
    fontSize: size.default,
    fontWeight: '400',
    fontFamily: Fontfamily.Neuropolitical,
  },
  sellbuttonText: {
    textAlign: 'center',
    color: themeColors.secondaryColor,
    fontSize: size.default,
    fontWeight: '400',
    fontFamily: Fontfamily.Neuropolitical,
  },
  profileGradient: {
    // paddingBottom: moderateScale(18),
  },
  tabBorderDetails: {
    borderBottomWidth: 1,
    borderBottomColor: themeColors.primaryColor,
    marginTop: -15,
    width: 45,
  },
  tabBorderHistory: {
    borderBottomWidth: 1,
    borderBottomColor: themeColors.primaryColor,
    marginTop: -13,
    width: 80,
  },
  tabBorderEarnings: {
    borderBottomWidth: 1,
    borderBottomColor: themeColors.primaryColor,
    marginTop: -13,
    width: 98,
  },
});
