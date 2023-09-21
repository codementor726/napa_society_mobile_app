import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {DoubleDotIcon} from '../assets/svg';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {themeColors} from '../theme/colors';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {BlurView} from '@react-native-community/blur';
import {LightCrossIcon} from '../assets/svg/LightCrossIcon';
import {NAPA_SNFT} from '../connectivity/addressHelper/addressHelper';
import moment from 'moment';
import {
  calculateAmountEarned,
  getEndDate,
  valueInNapaToken,
} from '../utils/helper';
import {useSelector} from 'react-redux';
import {selectTokenPrice} from '../store/selectors/TokenList';
import LiveTime from './LiveTimer';
import {redeemToken} from '../utils/mintApi';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../typings/screens-enums';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {NapaIcon} from '../assets/svg/NapaIcon';
type MysnftsListProps = {
  title?: string;
  Minted?: any;
  earned?: any;
  RewardsTier?: any;
  imgUri?: any;
  payoutsCategory?: any;
  mintedTimeStamp?: any;
  postId?: string;
  isExpired?: string;
  napaTokenEarned?: string;
  status?: string;
  closingDate?: any;
  mintId?: string;
  marketPlaceListed?: string;
  snftId?: string;
  profileId?: string;
  allTimeViews?: number;
};
const MysnftsList: React.FC<MysnftsListProps> = ({
  title,
  Minted,
  earned,
  RewardsTier,
  imgUri,
  payoutsCategory,
  mintedTimeStamp,
  postId,
  isExpired,
  napaTokenEarned,
  status,
  closingDate,
  mintId,
  marketPlaceListed,
  snftId,
  profileId,
  allTimeViews,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isIndex, setIsIndex] = useState<number>();
  const [redeemMySnft, setRedeemMySnft] = useState<boolean>(false);
  const actionSheetRef = React.createRef();
  const options = ['Create New Post', 'Story', 'Live', 'Cancel'];
  const tokenPrice = useSelector(selectTokenPrice);
  const [redeemLoading, setRedeemLoading] = useState(false);
  const {navigate} = useNavigation<any>();
  const userProfileId = useSelector(selectProfileList)?.profileId;
  const handleRedeemToken = async (postId: any) => {
    setRedeemMySnft(false);
    setIsIndex(0);
    setRedeemLoading(true);
    await redeemToken(postId);
    setRedeemLoading(false);
  };
  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: moderateScale(20),
            marginTop: moderateScale(20),
          }}>
          <View
            style={{
              backgroundColor: themeColors.cardsColor,
              width: 150,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              paddingVertical: moderateScale(2),
            }}>
            {mintedTimeStamp ? (
              <LiveTime
                targetTime={new Date(mintedTimeStamp).setHours(
                  new Date(mintedTimeStamp).getHours() + 1,
                )}
                postId={postId}
                isExpired={isExpired}
                tokenPrice={tokenPrice}
                napaTokenEarned={napaTokenEarned}
                amountEarned={calculateAmountEarned(
                  tokenPrice,
                  payoutsCategory,
                )}
              />
            ) : (
              <Text style={{color: 'white'}}>Not Minted</Text>
            )}
          </View>

          {userProfileId === profileId && (
            <TouchableOpacity onPress={() => setRedeemMySnft(true)}>
              <DoubleDotIcon />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.firstContainer}>
            <View style={styles.firstContainerFirstChild}>
              <Image
                style={{width: 62, height: 50, borderRadius: 5}}
                source={{uri: imgUri}}
              />
              <Text style={styles.firstContainerChildText}>{title}</Text>
            </View>
          </View>
          <View style={styles.secondContainer}>
            <View>
              <View>
                <Text style={styles.headingText}>All Time Views</Text>
                <Text style={styles.titleText}>
                  {allTimeViews || 0}
                  {/* {NAPA_SNFT.substring(0, 5) +
                    '.....' +
                    NAPA_SNFT.substring(NAPA_SNFT.length - 5)} */}
                </Text>
              </View>
              <View style={styles.secondChildContainer}>
                <Text style={styles.headingText}>Minted</Text>
                <Text style={styles.titleText}>
                  {moment(mintedTimeStamp).format('D MMM YYYY')}
                </Text>
              </View>
            </View>
            <View>
              <View>
                <Text style={styles.headingText}>Rewards Tier</Text>
                <Text style={styles.titleText}>{payoutsCategory}</Text>
              </View>
              <View style={styles.secondChildContainer}>
                <Text style={styles.headingText}>Live Start Date</Text>
                <Text style={styles.titleText}>
                  {moment(mintedTimeStamp).format('h:mm:ss a')}
                </Text>
              </View>
            </View>
            <View>
              <View>
                <Text style={styles.headingText}>Earnings (NAPA)</Text>
                <View style={styles.earnedPrice}>
                  <View
                    style={{
                      paddingTop: verticalScale(4),
                      paddingRight: moderateScale(5),
                    }}>
                    <NapaIcon />
                  </View>
                  <Text style={styles.titleText}>
                    {valueInNapaToken(payoutsCategory)}
                    {/* {earned
                      ? `$ ${Number(earned).toFixed(2)}`
                      : `$ ${calculateAmountEarned(
                          tokenPrice,
                          payoutsCategory,
                        )}`} */}
                  </Text>
                </View>
              </View>
              <View style={styles.secondChildContainer}>
                <Text style={styles.headingText}>Live End Date</Text>
                <Text style={styles.titleText}>
                  {getEndDate(mintedTimeStamp)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={redeemMySnft}
        onRequestClose={() => {
          setRedeemMySnft(false);
        }}>
        <View style={styles.modalContainer}>
          <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={10}
            overlayColor="transparent"
            reducedTransparencyFallbackColor="white"
          />
          <View style={styles.modalMainContainer}>
            <TouchableOpacity
              style={styles.buttonView}
              onPress={() => handleRedeemToken(postId)}
              disabled={closingDate != '' || redeemLoading}>
              <Text
                style={[
                  styles.subtitleStyle,
                  {
                    color:
                      closingDate || status === '0'
                        ? themeColors.garyColor
                        : themeColors.primaryColor,
                    // isIndex === 0
                    //   ? themeColors.aquaColor
                    //   : themeColors.primaryColor,
                  },
                ]}>
                Redeem Payout
              </Text>
            </TouchableOpacity>
            {marketPlaceListed == 'true' ? (
              <TouchableOpacity
                style={styles.buttonView}
                onPress={() => {
                  setRedeemMySnft(false);
                  navigate(SCREENS.MARKETPLACEDETAILSNFT, {
                    snftId: snftId,
                    marketId: undefined,
                  });
                }}>
                <Text
                  style={[
                    styles.subtitleStyle,
                    {
                      color:
                        status === '0' || !closingDate
                          ? themeColors.garyColor
                          : themeColors.primaryColor,
                      // color:
                      //   isIndex === 1
                      //     ? themeColors.aquaColor
                      //     : themeColors.primaryColor,
                    },
                  ]}>
                  Listed in Marketplace
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.buttonView}
                onPress={() => {
                  setActiveTabIndex(1);
                  setRedeemMySnft(false);
                  setIsIndex(1);
                  navigate(SCREENS.SELL, {id: mintId, nft: false});
                }}
                disabled={status === '0' || !closingDate}>
                <Text
                  style={[
                    styles.subtitleStyle,
                    {
                      color:
                        status === '0' || !closingDate
                          ? themeColors.garyColor
                          : themeColors.primaryColor,
                      // color:
                      //   isIndex === 1
                      //     ? themeColors.aquaColor
                      //     : themeColors.primaryColor,
                    },
                  ]}>
                  Submit to Marketplace
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.buttonView}
              disabled={true}
              onPress={() => {
                setActiveTabIndex(2);
                setRedeemMySnft(false);
                setIsIndex(2);
                // navigate(SCREENS.STREAMTITLE);
              }}>
              <Text
                style={[
                  styles.subtitleStyle,
                  {
                    color: themeColors.garyColor,
                    // isIndex === 2
                    //   ? themeColors.aquaColor
                    //   : themeColors.primaryColor,
                  },
                ]}>
                Ask DAVE
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setRedeemMySnft(false)}
              style={styles.crossStyle}>
              <LightCrossIcon />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default MysnftsList;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: verticalScale(5),
    marginHorizontal:
      Dimensions.get('window').width <= 337
        ? moderateScale(10)
        : moderateScale(24),
  },
  container: {
    borderBottomWidth: 0.8,
    borderBottomColor: themeColors.garyColor,
  },
  firstContainer: {
    marginTop: verticalScale(15),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  firstContainerFirstChild: {
    flexDirection: 'row',
  },
  firstContainerChildText: {
    fontFamily: Fontfamily.Neuropolitical,
    color: themeColors.primaryColor,
    fontWeight: '400',
    lineHeight: 19,
    paddingLeft: moderateScale(20),
  },
  secondContainer: {
    marginTop: verticalScale(20),
    marginBottom: verticalScale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondChildContainer: {
    marginTop: verticalScale(15),
  },
  earnedPrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingText: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    color: themeColors.garyColor,
    fontWeight: '500',
  },
  titleText: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    color: themeColors.primaryColor,
    fontWeight: '500',
    paddingTop: verticalScale(5),
  },
  modalContainer: {
    flex: 1,
    // backgroundColor: 'red',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalMainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    // backgroundColor: 'tan',
  },
  titleStyle: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.xlg,
    color: themeColors.primaryColor,
    textAlign: 'center',
  },
  subtitleStyle: {
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.lg,
    // color: themeColors.primaryColor,
    textAlign: 'center',
  },
  crossStyle: {
    marginVertical: moderateScale(25),
  },
  buttonView: {
    height: moderateScale(35),
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(22),
  },
});
