import {useNavigation} from '@react-navigation/native';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';
import React from 'react';
import {BackIcon} from '../assets/svg';
import Header from '../common/Header';
import Layout from '../common/Layout';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {themeColors} from '../theme/colors';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {PayoutIcon} from '../assets/svg';
import PayoutTier from '../components/PayoutTier';
import {useState} from 'react';
import Tabs from '../common/Tabs';
import Etherscantransactions from '../components/Etherscantransactions';
const payoutTabs = ['Tiers', 'Etherscan Transactions'];

const PayoutScreen = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const {goBack} = useNavigation();
  let count = 0;
  return (
    <Layout>
      <Header
        title={false}
        centerTitle="Payouts"
        leftChildren={
          <View>
            <TouchableOpacity onPress={goBack}>
              <BackIcon />
            </TouchableOpacity>
          </View>
        }
      />
      <View>
        <View style={styles.cardContainer}>
          <View style={styles.payoutCard}>
            <Text style={styles.payoutText}>NAPA Token Price</Text>
            <View style={styles.payoutIcon}>
              <PayoutIcon />
              <Text style={styles.payoutIconText}>2.482.57</Text>
            </View>
          </View>
          <View style={styles.payoutCard}>
            <Text style={styles.payoutText}>Total Users</Text>
            <Text style={styles.payoutUserText}>16 839</Text>
          </View>
        </View>
      </View>
      <Tabs
        data={payoutTabs}
        activeTabIndex={activeTabIndex}
        setActiveTabIndex={setActiveTabIndex}
      />
      {activeTabIndex == 0 && (
        <>
          <ScrollView>
            {Array.from({length: 6}).map((_, index) => {
              count++;
              return (
                <View key={`payout-tiers-${index}`}>
                  <PayoutTier count={count} />
                </View>
              );
            })}
          </ScrollView>
        </>
      )}
    </Layout>
  );
};
export default PayoutScreen;
const styles = StyleSheet.create({
  Textcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
  },
  assets: {
    color: themeColors.primaryColor,
    fontSize: size.lg,
    fontFamily: Fontfamily.Neuropolitical,
  },
  assetsView: {
    color: themeColors.aquaColor,
    fontSize: size.lg,
    fontFamily: Fontfamily.Neuropolitical,
  },
  cardContainer: {
    paddingHorizontal:
      Platform.OS === 'ios' ? moderateScale(0) : moderateScale(6),
    marginTop: moderateScale(10),
  },
  payoutCard: {
    width: '100%',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    marginRight: moderateScale(8),
    backgroundColor: themeColors.cardsColor,
    borderRadius: 24,
    height: verticalScale(90),
    justifyContent: 'center',
    marginBottom: moderateScale(8),
  },
  payoutText: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    color: themeColors.garyColor,
    marginBottom: moderateScale(10),
    fontWeight: '500',
  },
  payoutIconText: {
    fontFamily: Fontfamily.Grostestk,
    fontSize: size.xxlg,
    fontWeight: '600',
    color: themeColors.primaryColor,
    marginLeft: moderateScale(20),
  },
  payoutIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  payoutUserText: {
    fontSize: size.xxlg,
    fontWeight: '600',
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Grostestk,
  },
  payouttabs: {
    paddingHorizontal: moderateScale(24),
    marginVertical: moderateScale(15),
    flexDirection: 'row',
  },
  tiers: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
  },
  etherscan: {
    marginLeft: moderateScale(20),
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
  },
  marketItem: {
    marginTop: moderateScale(10),
    paddingHorizontal:
      Platform.OS === 'ios' ? moderateScale(0) : moderateScale(6),
  },
  itemTextView: {
    backgroundColor: themeColors.cardsColor,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: moderateScale(24),
    height: verticalScale(40),
    alignItems: 'center',
  },
  itemText: {
    width: '50%',
    borderRightWidth: 0.5,
    borderColor: themeColors.garyColor,
    height: verticalScale(25),
    justifyContent: 'center',
  },
  itemText1: {
    width: '50%',
    height: verticalScale(25),
    justifyContent: 'center',
  },
  textReward: {
    color: themeColors.aquaColor,
    textAlign: 'center',
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
  },
  textViral: {
    color: themeColors.garyColor,
    textAlign: 'center',
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
  },
});
