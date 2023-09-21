import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import imageIndex from '../assets/imageIndex';
import {Fontfamily} from '../theme/fontFamily';
import Header from '../common/Header';
import {BackIcon, DoubleDotIcon, StarIcon} from '../assets/svg';
import {useNavigation} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import SellDetails from './SellDetails';
import {size} from '../theme/fontstyle';
import {SCREENS} from '../typings/screens-enums';

const SellNftDetails = () => {
  const {goBack, navigate} = useNavigation<any>();
  const [tabIndex, setTabIndex] = useState<number>(0);
  return (
    // <Layout>
    // <ScrollView style={{flex: 1}} contentContainerStyle={{paddingBottom: 20}}>
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <ImageBackground
        source={imageIndex.bgImage}
        style={styles.container}
        resizeMode="cover">
        <ImageBackground source={imageIndex.gradient}>
          <ImageBackground source={imageIndex.gradient}>
            <View style={{marginTop: moderateScale(30)}}>
              <Header
                leftChildren={
                  <View style={styles.leftChildStyle}>
                    <TouchableOpacity onPress={goBack}>
                      <BackIcon />
                    </TouchableOpacity>
                  </View>
                }
                title={false}
                rightChildren={
                  <View style={styles.rightChildStyle}>
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
          </ImageBackground>
        </ImageBackground>
        <View style={styles.userContent}>
          <Image source={imageIndex.userImage} style={styles.imageStyle} />
          <Text style={styles.youTextStyle}>You</Text>
        </View>
        <Text style={styles.nftTitle}>Infinite Space of Variations</Text>
        <Text style={styles.description}>
          Sociable formerly six but handsome. Up do view time they shot. He
          concluded disposing provision.
        </Text>
      </ImageBackground>
      <View>
        <View style={styles.marketDetailTabs}>
          <TouchableOpacity
            onPress={() => {
              setTabIndex(0);
            }}>
            <Text style={styles.marketDetailTabsText}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setTabIndex(1);
            }}>
            <Text style={styles.marketDetailTabsText}>Price History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setTabIndex(2);
            }}>
            <Text style={styles.marketDetailTabsText}>Listings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setTabIndex(3);
            }}>
            <Text style={styles.marketDetailTabsText}>Offers</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>{tabIndex == 0 && <SellDetails />}</ScrollView>
      </View>
      <TouchableOpacity
        style={styles.sellButton}
        onPress={() => navigate(SCREENS.SELL)}>
        <Text style={styles.sellText}>Sell</Text>
      </TouchableOpacity>
    </View>
    // </ScrollView>
    // </Layout>
  );
};

export default SellNftDetails;

const styles = StyleSheet.create({
  sellText: {
    color: 'black',
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: 15,
  },
  sellButton: {
    height: 60,
    backgroundColor: themeColors.aquaColor,
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 80,
  },
  buyText: {
    textAlign: 'center',
    color: themeColors.secondaryColor,
    fontSize: size.default,
    fontWeight: '400',
    fontFamily: Fontfamily.Neuropolitical,
  },
  buy: {
    backgroundColor: themeColors.aquaColor,
    paddingVertical: moderateScale(22),
  },
  buyButton: {
    // marginTop: 40,
    justifyContent: 'flex-end',
    backgroundColor: themeColors.cardsColor,
  },
  rightChildStyle: {
    flexDirection: 'row',
  },
  leftChildStyle: {
    flexDirection: 'row',
  },
  marketDetailTabsText: {
    color: themeColors.primaryColor,
    marginRight: moderateScale(20),
  },
  marketDetailTabs: {
    paddingHorizontal: moderateScale(24),
    flexDirection: 'row',
    marginTop: 8,
  },
  description: {
    fontFamily: Fontfamily.Avenier,
    fontSize: 14,
    color: 'white',
    paddingLeft: 24,
    paddingBottom: 10,
  },
  nftTitle: {
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: 32,
    color: 'white',
    paddingLeft: 24,
    paddingTop: 15,
    paddingBottom: 11,
  },
  youTextStyle: {
    fontSize: 14,
    color: 'white',
    fontFamily: Fontfamily.Avenier,
    marginLeft: 12,
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
  },
  userContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
    marginHorizontal: 24,
  },
  container: {
    width: '100%',
    height: 480,
  },
  starIcon: {
    marginRight: moderateScale(15),
  },
});
