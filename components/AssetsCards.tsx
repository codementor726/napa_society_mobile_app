import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {themeColors} from '../theme/colors';
import SectionHeader from '../common/SectionHeader';
import LiveTime from './LiveTimer';
import {NapaTokenIcon} from '../assets/svg/NapaTokenIcon';
import {EthereumIcon, TetherIcon} from '../assets/svg';
import {SCREENS} from '../typings/screens-enums';

interface AsssetSliderProps {
  loading: boolean;
  snftData: any;
}
const AssetsSlider: React.FC<AsssetSliderProps> = ({loading, snftData}) => {
  const {navigate} = useNavigation<any>();

  const durationDays = (duration: any) => {
    switch (duration) {
      case duration === '1 Day':
        return duration?.replace(' Day', '');
      default:
        return duration?.replace(' Days', '');
    }
  };

  const handleCurrenyIcon = (currencyType: string = '0') => {
    switch (currencyType) {
      case '0':
        return (
          <NapaTokenIcon
            bgColor={themeColors.aquaColor}
            iconColor={themeColors.secondaryColor}
            width={25}
            height={25}
          />
        );
      case '1':
        return (
          <TetherIcon
            bgColor="#FFD978"
            iconColor="white"
            width={25}
            height={25}
          />
        );
      default:
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
    <View style={styles.container}>
      <SectionHeader title="My Listings" />

      <View style={{marginHorizontal: 20}}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>SNFT</Text>
          <Text style={[styles.headingText]}>Ending</Text>
          <Text
            style={[
              styles.headingText,
              {
                marginRight:
                  Dimensions.get('window').width <= 337
                    ? moderateScale(15)
                    : moderateScale(40),
              },
            ]}>
            Price
          </Text>
        </View>
        <View style={styles.borderContainer}></View>

        {!loading ? (
          snftData?.length > 0 ? (
            <View>
              {snftData?.slice(0, 5)?.map((item: any, index: any) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigate(SCREENS.MARKETPLACEDETAILSNFT, {
                        snftId: item.snftId,
                        marketId: '',
                      })
                    }
                    key={index}>
                    <View style={styles.tableContainer}>
                      <View
                        style={{
                          width: '33%',
                          marginVertical: verticalScale(10),
                        }}>
                        <Text style={styles.titleText}>{item?.SNFTTitle}</Text>
                      </View>
                      <View
                        style={{
                          justifyContent: 'center',
                          width: '33%',
                        }}>
                        <LiveTime
                          targetTime={new Date(item.createdAt).setHours(
                            new Date(item.createdAt).getHours() +
                              durationDays(item?.duration) * 24,
                          )}
                          marketPlaceItem={true}
                          snftId={snftData?.snftId}
                        />
                      </View>
                      <View
                        style={[styles.marketDetailContainer, {width: '33%'}]}>
                        {handleCurrenyIcon(item?.currencyType)}
                        <Text
                          style={[
                            styles.titleText,
                            {paddingLeft: moderateScale(10)},
                          ]}>
                          {item?.amount}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.borderContainer}></View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: moderateScale(20),
              }}>
              <Text
                style={{color: 'white', fontWeight: '500', fontSize: size.lg}}>
                No SNFT Listed Yet
              </Text>
            </View>
          )
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: moderateScale(20),
            }}>
            <ActivityIndicator color="white" size="large" />
          </View>
        )}
      </View>
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.cardContainer}>
        {(tokenList || [])?.map((token: any, index: any) => {
          return (
            <TouchableOpacity
              key={`assets-${index}`}
              style={styles.cards}
              onPress={() =>
                navigate(SCREENS.WALLETDETAILS, {
                  assetData: {
                    title: token?.name,
                    currencyName: token?.symbol,
                    balance: token?.balance,
                    tokenAddress: token.tokenAddresses,
                  },
                })
              }>
              <View style={styles.cardsTextView}>
                <View>
                  <Text style={styles.time}>24hr Chg</Text>
                  <Text style={styles.timePercent}>+ 0.45%</Text>
                </View>
                <View>
                  <Text style={styles.cardsText}>{token?.symbol}</Text>
                  <Text style={styles.cardsNumber}>$29,850.15</Text>
                </View>
              </View>
              <View>
                <ChartIcon />
              </View>
              <View style={styles.cardsTextViewBottom}>
                <View style={styles.icon}>
                  <Text style={styles.cardsTextIcon}>
                    {numberWithCommas(token?.balance || '0')}
                  </Text>
                  <HandleCurrencyIcon
                    currencyName={token?.symbol}
                    bgColor=""
                    iconColor=""
                  />
                </View>
                <Text style={styles.cardsNumber}>$29,850.15</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView> */}
    </View>
  );
};
export default AssetsSlider;
const styles = StyleSheet.create({
  headingText: {
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.md,
    fontWeight: '500',
    color: themeColors.garyColor,
    marginVertical: verticalScale(10),
    width: '33%',
    // textAlign: Dimensions.get('window').width >= 674 ? 'left' : 'center',
  },
  borderContainer: {
    borderBottomWidth: 1,
    borderBottomColor: themeColors.garyColor,
    marginHorizontal: moderateScale(-20),
  },

  titleText: {
    color: 'white',
    fontWeight: '500',
    fontSize: size.lg,
    fontFamily: Fontfamily.Avenier,
  },
  marketDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    marginTop: moderateScale(30),
  },
  cardContainer: {
    flexDirection: 'row',
    paddingHorizontal:
      Platform.OS === 'ios' ? moderateScale(6) : moderateScale(6),
    marginTop: moderateScale(10),
  },
  marketDetailPoints: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Grostestk,
    fontSize: size.lg,
    marginLeft: moderateScale(10),
    fontWeight: '500',
  },
  cards: {
    backgroundColor: themeColors.cardsColor,
    borderRadius: 24,
    padding: moderateScale(10),
    marginRight: moderateScale(10),
    // width: verticalScale(200),
    // height: verticalScale(230),
  },
  cardsTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15),
    // paddingVertical: moderateScale(8),
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardsTextViewBottom: {
    alignItems: 'flex-end',
    paddingHorizontal: moderateScale(10),
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cardsText: {
    color: themeColors.primaryColor,
    fontWeight: '500',
    fontFamily: Fontfamily.Avenier,
    fontSize: size.xlg,
  },
  cardsTextIcon: {
    color: themeColors.primaryColor,
    fontWeight: '500',
    fontFamily: Fontfamily.Avenier,
    fontSize: size.xlg,
    marginRight: moderateScale(5),
  },
  cardsNumber: {
    color: themeColors.garyColor,
    fontSize: size.s,
  },
  time: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    // paddingTop: moderateScale(5),
    // Bottom: moderateScale(5),
    fontWeight: '500',
    fontSize: size.md,
  },
  timePercent: {
    color: themeColors.aquaColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.s,
  },
});
