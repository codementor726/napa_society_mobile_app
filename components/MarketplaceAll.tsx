import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {EthereumIcon, TetherIcon} from '../assets/svg';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {SCREENS} from '../typings/screens-enums';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectMarketPlaceList,
  selectMarketPlaceLoading,
} from '../store/selectors/MarketPlaceItemSelector';
import {MarketPlaceData} from '../store/slices/MarketPlaceItem';
import {NapaTokenIcon} from '../assets/svg/NapaTokenIcon';

type MarketAllItemProps = {
  userName?: string;
  title?: string;
  amount?: string;
  userImage?: any;
  currencyType?: string;
  thumbnail?: any;
  snftId?: string;
  duration?: string;
};

const MarketAllItem: React.FC<MarketAllItemProps> = ({
  userName,
  title,
  amount,
  userImage,
  currencyType,
  thumbnail,
  snftId,
  duration,
}) => {
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
  const {navigate} = useNavigation<any>();
  return (
    <TouchableOpacity
      style={styles.marketPlaceCardOP}
      onPress={() => {
        if (snftId) {
          navigate(SCREENS.MARKETPLACEDETAILSNFT, {
            snftId: snftId,
            marketId: undefined,
          });
        }
      }}>
      <ImageBackground
        imageStyle={{borderRadius: 24}}
        source={{
          uri:
            thumbnail ||
            'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png',
        }}
        style={styles.marketPlaceCard}>
        <View style={styles.marketPlaceTop}>
          <Image
            style={styles.marketPlaceTopImage}
            resizeMode="cover"
            source={{
              uri:
                userImage ||
                'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png',
            }}
          />
          <Text style={styles.marketPlaceTopText}>{userName}</Text>
        </View>
        <View style={styles.marketPlaceBottom}>
          <Text style={styles.marketPlaceBottomText}>{title}</Text>
          <View style={styles.marketPlaceBottomIcon}>
            {handleCurrenyIcon(currencyType)}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '80%',
              }}>
              <Text style={styles.marketPlaceIconText}>{amount}</Text>
              <Text style={styles.marketPlaceDurationText}>{duration}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const MarketPlaceAll = () => {
  const dispatch = useDispatch();
  const marketData = useSelector(selectMarketPlaceList);
  const marketDataLoading = useSelector(selectMarketPlaceLoading);

  useEffect(() => {
    dispatch(MarketPlaceData(24));
  }, []);

  return (
    <>
      <View style={styles.marketPlaceConatiner}>
        {marketDataLoading ? (
          <View
            style={{
              justifyContent: 'center',
              height: 300,
            }}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          marketData?.data?.map((item: any, index: number) => {
            return (
              <MarketAllItem
                key={index}
                userName={item?.userName}
                title={item?.SNFTTitle}
                amount={item?.amount}
                userImage={item?.userImage}
                currencyType={item?.currencyType}
                thumbnail={item?.thumbnail}
                snftId={item?.snftId}
                duration={item?.duration}
              />
            );
          })
        )}
      </View>
    </>
  );
};
export default MarketPlaceAll;
const styles = StyleSheet.create({
  marketPlaceConatiner: {
    marginTop: moderateScale(20),
    flexDirection: 'row',
    justifyContent:
      Dimensions.get('window').width < 500 ? 'center' : 'flex-start',
    flexWrap: 'wrap',
    marginBottom: moderateScale(150),
  },
  marketPlaceCardOP: {
    height: verticalScale(180),
    marginHorizontal:
      Dimensions.get('window').width < 400
        ? moderateScale(3)
        : moderateScale(5),
    marginBottom: moderateScale(8),
    width:
      Dimensions.get('window').width < 400
        ? verticalScale(150)
        : verticalScale(145),
  },
  marketPlaceCard: {
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(10),
    height: verticalScale(180),
    justifyContent: 'space-between',
  },
  marketPlaceTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: moderateScale(12),
  },
  marketPlaceTopImage: {
    borderRadius: 50,
    width: 35,
    height: 35,
  },
  marketPlaceTopText: {
    marginLeft: moderateScale(5),
    color: themeColors.primaryColor,
    fontSize: size.s,
    fontWeight: '400',
    fontFamily: Fontfamily.Avenier,
  },
  marketPlaceBottom: {},
  marketPlaceBottomText: {
    color: themeColors.primaryColor,
    fontSize: 15,
    fontWeight: '400',
    fontFamily: Fontfamily.Neuropolitical,
    width: verticalScale(130),
    marginBottom: moderateScale(10),
  },
  marketPlaceBottomIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: moderateScale(7),
  },
  marketPlaceIconText: {
    marginLeft: moderateScale(10),
    color: themeColors.primaryColor,
    fontSize: size.default,
    fontWeight: '400',
    fontFamily: Fontfamily.Avenier,
  },
  marketPlaceDurationText: {
    marginLeft: moderateScale(10),
    color: themeColors.primaryColor,
    fontSize: size.default,
    fontWeight: '500',
    fontFamily: Fontfamily.Avenier,
  },
});
