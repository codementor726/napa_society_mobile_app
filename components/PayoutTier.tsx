import React from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {PayoutNapaIcon} from '../assets/svg';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';

type PayoutProps = {
  count: number;
};

const PayoutTier: React.FC<PayoutProps> = ({count}) => {
  return (
    <ScrollView>
      <View style={styles.rewardContainer}>
        <View style={styles.rewardContainerCard}>
          <Text style={styles.rewardContainerTitle}>Tier {count}</Text>
          <View style={styles.tier}>
            <View style={styles.tierCards}>
              <Text style={styles.tokenAwardTitle}>Reward Tiers Cap</Text>
              <Text style={styles.tokenAwardText}></Text>
            </View>
            <View style={styles.tierCards}>
              <Text style={styles.tokenAwardTitle}>% Value</Text>
              <Text style={styles.tokenAwardText}></Text>
            </View>
          </View>
          <View style={styles.tier}>
            <View style={styles.tierCards}>
              <Text style={styles.tokenAwardTitle}>Value in NAPA Tokens</Text>
              <Text style={styles.tokenAwardText}>
                <PayoutNapaIcon /> 
              </Text>
            </View>
            <View style={styles.tierCards}>
              <Text style={styles.tokenAwardTitle}>Value in USD</Text>
              <Text style={styles.tokenAwardText}>$</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default PayoutTier;

const styles = StyleSheet.create({
  rewardContainer: {},
  rewardContainerCard: {
    paddingHorizontal: moderateScale(24),
    borderBottomWidth: 0.5,
    borderColor: themeColors.garyColor,
    paddingVertical: moderateScale(23),
  },
  rewardContainerTitle: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.lg,
  },
  tier: {
    marginTop: moderateScale(18),
    flexDirection: 'row',
  },
  tierCards: {
    width: '50%',
  },
  tokenAwardTitle: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.s,
  },
  tokenAwardText: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.default,
    paddingTop: moderateScale(7),

  },
});
