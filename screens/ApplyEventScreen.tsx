import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ImageBackground,
  Text,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {
  BackIcon,
  BinanceIcon,
  BlockchainIcon,
  ClockIcon,
  CryptoIcon,
  DisabilityIcon,
  ExchangeIcon,
  GiftIcon,
  LiabararyIcon,
  LocationIcon,
  OpenseaIcon,
  PayoutIcon,
  ShareIcon,
} from '../assets/svg';
import Header from '../common/Header';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {useNavigation} from '@react-navigation/native';
import Button from '../common/Button';
import Layout from '../common/Layout';
import {getEventDetail} from '../services/EventApi';
import {useToast} from 'react-native-toast-notifications';
import moment from 'moment';
import ErrorToast from '../common/toasters/ErrorToast';

const ApplyEventScreen: React.FC = ({route}: any) => {
  const {goBack} = useNavigation();
  const toast = useToast();
  const {id}: any = route?.params;
  const [getEventDetailData, setGetEventDetailData] = useState<any>({});
  const [seeMoreDetail, setSeeMoreDetail] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const handleGetEventDetail = async () => {
    setLoading(true);
    const {data, error, message}: any = await getEventDetail(id);
    if (error) {
      console.log(error, 'error');
      setLoading(false);
      toast.show(<ErrorToast message={message}/>, {
        placement: 'top',
      });
      return;
    }
    setLoading(false);
    setGetEventDetailData(data?.data);
  };
  useEffect(() => {
    handleGetEventDetail();
  }, []);

  return (
    <Layout>
      {!loading ? (
        <ScrollView>
          <ImageBackground
            resizeMode="cover"
            source={{
              uri:
                getEventDetailData?.eventImageOne ||
                getEventDetailData?.eventImageTwo,
            }}>
            <ImageBackground
              style={styles.eventBackground}
              source={require('../assets/images/gradient.png')}>
              <Header
                title={false}
                leftChildren={
                  <TouchableOpacity onPress={goBack}>
                    <BackIcon />
                  </TouchableOpacity>
                }
                rightChildren={
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity>
                      <ShareIcon />
                    </TouchableOpacity>
                  </View>
                }
              />
              <View style={styles.eventBottom}>
                <View style={styles.eventBottomIcon}>
                  <LocationIcon />
                  <Text style={styles.eventBottomText}>
                    {getEventDetailData?.address}, {getEventDetailData?.city}
                  </Text>
                </View>
                <Text style={styles.eventBottomText1}>
                  {getEventDetailData?.eventTitle}
                </Text>
              </View>
            </ImageBackground>
          </ImageBackground>
          <View style={styles.applyTimesView}>
            <View style={styles.applyTimes}>
              <View style={styles.applyIcon}>
                <PayoutIcon />
              </View>
              <View style={styles.applyTextView}>
                <Text style={styles.applyEntryText}>Entry Fee</Text>
                <Text style={styles.applyText}>
                  {getEventDetailData?.entryFees}
                </Text>
              </View>
            </View>
            <View style={styles.applyTimes}>
              <View style={styles.applyIcon}>
                <ClockIcon />
              </View>
              <View style={styles.applyTextView}>
                <Text style={styles.applyEntryText}>Date & Time</Text>
                <Text style={styles.applyText}>
                  {moment(getEventDetailData?.eventDate).format(
                    ' MMM DD, h:mm a',
                  )}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Button
              backgroundColor={themeColors.aquaColor}
              textColor="black"
              title="Buy Tickets"
            />
          </View>
          {seeMoreDetail ? (
            <View style={styles.about}>
              <Text style={styles.aboutText}>About Event</Text>
              <Text style={styles.aboutParagraph}>
                {getEventDetailData?.eventDetailsLongDescription}
                <TouchableOpacity
                  onPress={() => setSeeMoreDetail(!seeMoreDetail)}>
                  <Text
                    style={{
                      color: themeColors.aquaColor,
                      marginLeft: moderateScale(5),
                      top: Platform.OS === 'ios' ? 2 : 3,
                    }}>
                    see less
                  </Text>
                </TouchableOpacity>
              </Text>
            </View>
          ) : (
            <View style={styles.about}>
              <Text style={styles.aboutText}>About The Event</Text>
              <Text style={styles.aboutParagraph}>
                {getEventDetailData?.eventDetailsShortDescription}
                <TouchableOpacity
                  onPress={() => setSeeMoreDetail(!seeMoreDetail)}>
                  <Text
                    style={{
                      color: themeColors.aquaColor,
                      marginLeft: moderateScale(5),
                      top: Platform.OS === 'ios' ? 2 : 3,
                    }}>
                    see more
                  </Text>
                </TouchableOpacity>
              </Text>
            </View>
          )}
          <View style={styles.perks}>
            <Text style={styles.perksText}>Perks</Text>
            <View style={styles.perksView}>
              {getEventDetailData?.napaPerks
                ?.split(',')
                ?.includes('New Big Community for NFT’s Exchange') && (
                <View style={styles.perksItems}>
                  <View style={styles.perksIcon}>
                    <ExchangeIcon />
                  </View>
                  <Text style={styles.perksIconText}>
                    New Big Community for NFT’s Exchange
                  </Text>
                </View>
              )}
              {getEventDetailData?.napaPerks
                ?.split(',')
                ?.includes('Various Gifts for your Activity on Event') && (
                <View style={styles.perksItems}>
                  <View style={styles.perksIcon}>
                    <GiftIcon />
                  </View>
                  <Text style={styles.perksIconText}>
                    Various Gifts for your Activity on Event
                  </Text>
                </View>
              )}
              {getEventDetailData?.napaPerks
                ?.split(',')
                ?.includes('For People with Disabilities Entry is Free') && (
                <View style={styles.perksItems}>
                  <View style={styles.perksIcon}>
                    <DisabilityIcon />
                  </View>
                  <Text style={styles.perksIconText}>
                    For People with Disabilities Entry is Free
                  </Text>
                </View>
              )}
              {getEventDetailData?.napaPerks
                ?.split(',')
                ?.includes(`Free Video Library with Guides on NFT's`) && (
                <View style={styles.perksItems}>
                  <View style={styles.perksIcon}>
                    <LiabararyIcon />
                  </View>
                  <Text style={styles.perksIconText}>
                    Free Video Library with Guides on NFT's
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.apply}>
            <Text style={styles.applyEventText}>How to Apply to Event</Text>
            <View style={styles.applyNumber}>
              <View style={styles.applyEvent}>
                <View style={styles.applyEventIcon}>
                  <Text style={styles.applyEventIconText}>1</Text>
                </View>
                <View style={styles.applyEventView}>
                  <Text style={styles.applyViewText}>
                    Affronting discretion as do is announcing. Now months esteem
                    oppose nearer enable too six.
                  </Text>
                </View>
              </View>
              <View style={styles.applyEvent}>
                <View style={styles.applyEventIcon}>
                  <Text style={styles.applyEventIconText}>2</Text>
                </View>
                <View style={styles.applyEventView}>
                  <Text style={styles.applyViewText}>
                    She numerous unlocked you perceive speedily. Affixed offence
                    spirits or ye of offices between.
                  </Text>
                </View>
              </View>
              <View style={styles.applyEvent}>
                <View style={styles.applyEventIcon}>
                  <Text style={styles.applyEventIconText}>3</Text>
                </View>
                <View style={styles.applyEventView}>
                  <Text style={styles.applyViewText}>
                    Real on shot it were four an as. Absolute bachelor rendered
                    six nay you juvenile. Vanity entire an chatty.
                  </Text>
                </View>
              </View>
              <View style={styles.applyEvent}>
                <View style={styles.applyEventIcon}>
                  <Text style={styles.applyEventIconText}>4</Text>
                </View>
                <View style={styles.applyEventView}>
                  <Text style={styles.applyViewText}>
                    On assistance he cultivated considered frequently. Person
                    how having tended direct own day man.
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.sponsers}>
            <Text style={styles.sponsersText}>Sponsors</Text>
            <View style={styles.sponsersContainer}>
              {getEventDetailData?.sponsors
                ?.split(',')
                ?.includes('Binance') && (
                <View style={styles.sponsersIcon}>
                  <BinanceIcon />
                </View>
              )}
              {getEventDetailData?.sponsors
                ?.split(',')
                ?.includes('Blockchain') && (
                <View style={styles.sponsersIcon}>
                  <BlockchainIcon />
                </View>
              )}
              {getEventDetailData?.sponsors
                ?.split(',')
                ?.includes('Opensea') && (
                <View style={styles.sponsersIcon}>
                  <OpenseaIcon />
                </View>
              )}
              {getEventDetailData?.sponsors?.split(',')?.includes('Crypto') && (
                <View style={styles.sponsersIcon}>
                  <CryptoIcon />
                </View>
              )}
            </View>
          </View>
          <View style={styles.tags}>
            <Text style={styles.tagsmainText}>Tags</Text>
            <View style={styles.tagsNft}>
              {getEventDetailData?.tags?.split(',')?.map((tag: any) => {
                return (
                  <View style={styles.tagsView}>
                    <Text style={styles.tagsText}>{tag.toUpperCase()}</Text>
                  </View>
                );
              })}
              {/* <View style={styles.tagsView}>
              <Text style={styles.tagsText}>Lecture</Text>
            </View>
            <View style={styles.tagsView}>
              <Text style={styles.tagsText}>Event</Text>
            </View>
            <View style={styles.tagsView}>
              <Text style={styles.tagsText}>Сurrency</Text>
            </View>
            <View style={styles.tagsView}>
              <Text style={styles.tagsText}>Beginner</Text>
            </View>
            <View style={styles.tagsView}>
              <Text style={styles.tagsText}>Toronto</Text>
            </View>
            <View style={styles.tagsView}>
              <Text style={styles.tagsText}>Blockchain</Text>
            </View>
            <View style={styles.tagsView}>
              <Text style={styles.tagsText}>Gifts</Text>
            </View>
            <View style={styles.tagsView}>
              <Text style={styles.tagsText}>Tokens</Text>
            </View>
            <View style={styles.tagsView}>
              <Text style={styles.tagsText}>World</Text>
            </View>
            <View style={styles.tagsView}>
              <Text style={styles.tagsText}>Binance</Text>
            </View>
            <View style={styles.tagsView}>
              <Text style={styles.tagsText}>Crypto</Text>
            </View> */}
            </View>
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
          }}>
          <Header
            title={false}
            leftChildren={
              <TouchableOpacity onPress={goBack}>
                <BackIcon />
              </TouchableOpacity>
            }
          />
          <View
            style={{flex: 0.6, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={themeColors.primaryColor} />
          </View>
        </View>
      )}
    </Layout>
  );
};

export default ApplyEventScreen;
const styles = StyleSheet.create({
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  rightchildrenImage: {
    marginRight: 20,
  },
  eventBackground: {
    height: verticalScale(250),
    justifyContent: 'space-between',
  },
  eventBottom: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(15),
  },
  eventBottomIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(5),
  },
  eventBottomText: {
    color: themeColors.primaryColor,
    marginLeft: moderateScale(10),
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
  },
  eventBottomText1: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.vxlg,
    fontWeight: '400',
  },
  applyTimesView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(15),
  },
  applyTimes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  applyIcon: {
    borderColor: themeColors.cardsColor,
    borderWidth: 2,
    padding: moderateScale(12),
    borderRadius: 50,
  },
  applyTextView: {
    marginLeft: moderateScale(5),
  },
  applyEntryText: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.lg,
    fontWeight: '500',
    marginRight: 15,
  },
  applyText: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Grostestk,
    fontSize: size.lg,
    fontWeight: '400',
  },
  about: {
    paddingHorizontal: moderateScale(14),
    paddingTop: moderateScale(25),
  },
  aboutText: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontWeight: '400',
    fontSize: size.xlg,
    paddingTop: moderateScale(12),
  },
  aboutParagraph: {
    marginTop: moderateScale(10),
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.default,
    // lineHeight: 19.6,
  },
  perks: {
    paddingHorizontal: moderateScale(14),
    paddingTop: moderateScale(35),
  },
  perksText: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontWeight: '400',
    fontSize: size.xlg,
    paddingTop: moderateScale(12),
  },
  perksView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  perksItems: {
    marginVertical: moderateScale(20),
    alignItems: 'center',
    width: verticalScale(150),
  },
  perksIcon: {
    backgroundColor: themeColors.cardsColor,
    justifyContent: 'center',
    alignItems: 'center',
    width: verticalScale(90),
    height: verticalScale(90),
    borderRadius: 60,
  },
  perksIconText: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.md,
    fontWeight: '500',
    textAlign: 'center',
    paddingTop: moderateScale(15),
  },
  apply: {
    paddingHorizontal: moderateScale(15),
    paddingTop: moderateScale(25),
  },
  applyEventText: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontWeight: '400',
    fontSize: size.xlg,
    width: verticalScale(210),
    marginBottom: moderateScale(20),
  },
  applyNumber: {
    paddingRight: moderateScale(20),
  },
  applyEvent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  applyEventIcon: {
    backgroundColor: themeColors.cardsColor,
    justifyContent: 'center',
    alignItems: 'center',
    width: verticalScale(45),
    height: verticalScale(45),
    borderRadius: 50,
  },
  applyEventIconText: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontWeight: '400',
    fontSize: size.xlg,
  },
  applyEventView: {
    marginHorizontal: 20,
  },
  applyViewText: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
  },
  sponsers: {
    paddingHorizontal: moderateScale(15),
    paddingTop: moderateScale(35),
  },
  sponsersText: {
    marginBottom: moderateScale(20),
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontWeight: '400',
    fontSize: size.xlg,
  },
  sponsersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  sponsersIcon: {
    marginBottom: moderateScale(15),
  },
  tags: {
    paddingHorizontal: moderateScale(15),
    paddingTop: moderateScale(35),
    marginBottom: 100,
  },
  tagsmainText: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontWeight: '400',
    fontSize: size.xlg,
  },
  tagsNft: {
    marginTop: moderateScale(15),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagsView: {
    backgroundColor: themeColors.cardsColor,
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(12),
    borderRadius: 25,
    marginRight: moderateScale(5),
    marginBottom: moderateScale(10),
  },
  tagsText: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '400',
    fontSize: size.default,
  },
});
