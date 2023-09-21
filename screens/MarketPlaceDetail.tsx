import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {
  BackIcon,
  DoubleDotIcon,
  EthereumIcon,
  StarIcon,
  TetherIcon,
} from '../assets/svg';
import Header from '../common/Header';
import MarketPriceDetail from '../components/MarketPriceDetail';
import MarketPriceHistory from '../components/MarketPriceHistory';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {SCREENS} from '../typings/screens-enums';
import {getSnft} from '../services/MarketPlace';
import {useToast} from 'react-native-toast-notifications';
import {NapaTokenIcon} from '../assets/svg/NapaTokenIcon';
import {useSelector} from 'react-redux';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import ErrorToast from '../common/toasters/ErrorToast';

const MarketPlaceDetail = ({route}: any) => {
  const toast = useToast();
  const {snftId}: any = route?.params;
  const {navigate} = useNavigation<any>();
  const [detail, setDetail] = useState(true);
  const [history, setHistory] = useState(false);
  const [SNFTDetail, setSNFTDetail] = useState<any>([]);
  const profileId = useSelector(selectProfileList).profileId;

  const handleGetSNFt = async () => {
    const {data, error, message} = await getSnft(snftId);
    console.log(data?.data, 'data');
    if (error) {
      toast.show(<ErrorToast message={message} />, {
        placement: 'top',
      });
      return;
    }
    setSNFTDetail(data?.data);
  };
  useEffect(() => {
    if (snftId) {
      handleGetSNFt();
    }
  }, [snftId]);

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
      <ImageBackground
        imageStyle={{
          height: verticalScale(350),
        }}
        source={{uri: SNFTDetail?.thumbnail}}
        resizeMode="cover">
        <ImageBackground
          imageStyle={{
            height: verticalScale(350),
          }}
          style={styles.profileGradient}
          source={require('../assets/images/marketPlaceGradient.png')}>
          <ImageBackground
            imageStyle={{
              height: verticalScale(350),
            }}
            source={require('../assets/images/marketPlaceGradient.png')}>
            <View style={{marginTop: 30}}>
              <Header
                leftChildren={
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => navigate(SCREENS.MARKETPLACE)}>
                      <BackIcon />
                    </TouchableOpacity>
                  </View>
                }
                title={false}
                rightChildren={
                  <View style={{flexDirection: 'row'}}>
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
            <View style={styles.container}>
              <View style={styles.profile}>
                <Image
                  style={{height: 40, width: 40, borderRadius: 50}}
                  source={{uri: SNFTDetail?.userImage}}
                />
                <Text style={styles.profileTitle}>{SNFTDetail?.userName}</Text>
              </View>
              <View style={styles.profileTextContainer}>
                <Text style={styles.heading}>{SNFTDetail?.SNFTTitle}</Text>
                <Text style={styles.subHeading}>
                  {SNFTDetail?.SNFTDescription}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </ImageBackground>
      </ImageBackground>
      <View>
        <View style={styles.marketDetailContainer}>
          {handleCurrenyIcon(SNFTDetail?.currencyType)}
          <Text style={styles.marketDetailPoints}>{SNFTDetail?.amount}</Text>
        </View>
        <View style={styles.marketDetailTabs}>
          <TouchableOpacity
            onPress={() => {
              setDetail(true), setHistory(false);
            }}>
            <Text style={styles.marketDetailTabsText}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setDetail(false), setHistory(true);
            }}>
            <Text style={styles.marketDetailTabsText}>Price History</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.marketDetailTabsText}>Listings</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.marketDetailTabsText}>Offers</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{height: 250, paddingTop: moderateScale(10)}}>
          {detail && (
            <MarketPriceDetail
              snftDetail={SNFTDetail}
              handleCurrenyIcon={handleCurrenyIcon}
            />
          )}
          {history && <MarketPriceHistory />}
        </ScrollView>
      </View>
      <View style={styles.buyButton}>
        <TouchableOpacity
          style={styles.buy}
          onPress={() => {
            if (profileId === SNFTDetail?.profileI) {
              navigate(SCREENS.SELL);
            }
          }}>
          {profileId !== SNFTDetail?.profileId ? (
            <Text style={styles.buyText}>
              Buy for {SNFTDetail?.amount}{' '}
              {SNFTDetail?.currencyType == '0'
                ? 'NAPA'
                : SNFTDetail?.currencyType == '1'
                ? 'USDT'
                : 'ETH'}
            </Text>
          ) : (
            <Text style={styles.buyText}>Sell</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default MarketPlaceDetail;
const styles = StyleSheet.create({
  starIcon: {
    marginRight: moderateScale(15),
  },
  container: {
    height: verticalScale(280),
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
    marginHorizontal: moderateScale(24),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  marketDetailPoints: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Grostestk,
    fontSize: size.xlg,
    marginLeft: moderateScale(10),
  },
  marketDetailTabs: {
    paddingHorizontal: moderateScale(24),
    flexDirection: 'row',
    paddingBottom: moderateScale(10),
  },
  marketDetailTabsText: {
    color: themeColors.primaryColor,
    marginRight: moderateScale(20),
  },
  buyButton: {
    justifyContent: 'flex-end',
    backgroundColor: themeColors.cardsColor,
  },
  buy: {
    backgroundColor: themeColors.aquaColor,
    paddingVertical: moderateScale(22),
  },
  buyText: {
    textAlign: 'center',
    color: themeColors.secondaryColor,
    fontSize: size.default,
    fontWeight: '400',
    fontFamily: Fontfamily.Neuropolitical,
  },
  profileGradient: {
    // paddingBottom: moderateScale(18),
  },
});
