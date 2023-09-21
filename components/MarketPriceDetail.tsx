import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {formatString, payoutsCategoryName} from '../utils/helper';
import moment from 'moment';

const MarketPriceDetail = ({snftDetail, handleCurrenyIcon}: any) => {
  return (
    <View style={styles.detailContainer}>
      <View style={styles.detailContainerText}>
        <Text style={styles.detailContainerTitle}>NAPA Payouts Category</Text>
        <Text style={styles.detailContainerSubTitle}>
          {payoutsCategoryName(snftDetail?.payoutsCategory)}
        </Text>
      </View>
      {/* <View style={styles.detailContainerText}>
        <Text style={styles.detailContainerTitle}>Contract Address</Text>
        <Text style={styles.detailContainerSubTitle}>
          {formatString(snftDetail?.SNFTAddress)}
        </Text>
      </View> */}
      <View style={styles.detailContainerText}>
        <Text style={styles.detailContainerTitle}>Original Creator</Text>
        <Text style={styles.detailContainerSubTitle}>
          {snftDetail?.generatorName}
        </Text>
      </View>
      <View style={styles.detailContainerText}>
        <Text style={styles.detailContainerTitle}>Creator Account</Text>
        <Text style={styles.detailContainerSubTitle}>
          {formatString(snftDetail?.generatorId)}
        </Text>
      </View>
      <View style={styles.detailContainerText}>
        <Text style={styles.detailContainerTitle}>Collection</Text>
        <Text style={styles.detailContainerSubTitle}>
          {snftDetail?.SNFTCollection}
        </Text>
      </View>
      {/* <View style={styles.detailContainerText}>
        <Text style={styles.detailContainerTitle}>Views</Text>
        <Text style={styles.detailContainerSubTitle}>
          {snftDetail?.tokenId}
        </Text>
      </View> */}
      {/* <View style={styles.detailContainerText}>
        <Text style={styles.detailContainerTitle}>Popularity</Text>
        <Text style={styles.detailContainerSubTitle}>High</Text>
      </View> */}
      <View style={styles.detailContainerText}>
        <Text style={styles.detailContainerTitle}>Network</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.detailContainerSubTitle]}>
            {handleCurrenyIcon('2')}{' '}
          </Text>
          <Text
            style={{
              color: 'white',
              marginLeft: moderateScale(5),
              textAlign: 'center',
              marginBottom: 8,
            }}>
            ETH
            {/* {snftDetail?.currencyType == '0'
              ? 'NAPA'
              : snftDetail?.currencyType == '1'
              ? 'USDT'
              : 'ETH'} */}
          </Text>
        </View>
      </View>
      <View style={styles.detailContainerText}>
        <Text style={styles.detailContainerTitle}>Last Updated</Text>
        <Text style={styles.detailContainerSubTitle}>
          {moment(snftDetail?.updatedAt).startOf('seconds').fromNow()}
        </Text>
      </View>
    </View>
  );
};
export default MarketPriceDetail;
const styles = StyleSheet.create({
  detailContainer: {
    // paddingVertical: moderateScale(30),
    paddingHorizontal: moderateScale(24),
    backgroundColor: themeColors.secondaryColor,
  },
  detailContainerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(14),
  },
  detailContainerTitle: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
  },
  detailContainerSubTitle: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
  },
});
