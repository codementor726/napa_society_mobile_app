import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {EarningDataI} from '../typings/post';
import {NapaIcon} from '../assets/svg/NapaIcon';

type PreviousEarningProps = {
  earningData?: EarningDataI;
};

const PreviousEarning = ({earningData}: PreviousEarningProps) => {
  return (
    <>
      <ScrollView>
        <View style={{marginBottom: 20}}>
          <View style={[styles.mainContainer]}>
            <View style={styles.container}>
              <View style={{}}>
                <View>
                  <Text style={[styles.headingText]}>Time Frame</Text>
                  <Text style={[styles.text]}>Prev 7 Days</Text>
                </View>
                <View style={{marginTop: moderateScale(10)}}>
                  <Text style={[styles.headingText]}>Earning (NAPA)</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <NapaIcon />
                    <Text style={[styles.text]}></Text>
                  </View>
                </View>

                {/* <View style={{marginTop: moderateScale(10)}}>
                  <Text style={[styles.headingText]}>SNFT Leaderboards</Text>
                  <Text style={[styles.text]}></Text>
                </View> */}
              </View>
              <View>
                <View>
                  <Text style={[styles.headingText]}>Views</Text>
                  <Text style={[styles.text]}>
                    {earningData?.rolling_7_Days || 0}
                  </Text>
                </View>

                <View style={{marginTop: moderateScale(10)}}>
                  <Text style={[styles.headingText]}>SNFT Leaderboards</Text>
                  <Text style={[styles.text]}></Text>
                </View>

                {/* <View
                    style={{
                      marginTop: moderateScale(10),
                      paddingBottom: verticalScale(10),
                    }}>
                    <Text style={[styles.headingText]}>Owner</Text>
                    <Text style={[styles.text]}>Dorothy Mccoy</Text>
                  </View> */}
              </View>
            </View>
          </View>
        </View>
        <View style={{marginBottom: 20}}>
          <View style={[styles.mainContainer]}>
            <View style={styles.container}>
              <View style={{}}>
                <View>
                  <Text style={[styles.headingText]}>Time Frame</Text>
                  <Text style={[styles.text]}>Prev 14 Days</Text>
                </View>
                <View style={{marginTop: moderateScale(10)}}>
                  <Text style={[styles.headingText]}>Earning (NAPA)</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <NapaIcon />
                    <Text style={[styles.text]}></Text>
                  </View>
                </View>

                {/* <View style={{marginTop: moderateScale(10)}}>
                  <Text style={[styles.headingText]}>SNFT Leaderboards</Text>
                  <Text style={[styles.text]}></Text>
                </View> */}
              </View>
              <View>
                <View>
                  <Text style={[styles.headingText]}>Views</Text>
                  <Text style={[styles.text]}>
                    {earningData?.prev_14_days_views}
                  </Text>
                </View>

                <View style={{marginTop: moderateScale(10)}}>
                  <Text style={[styles.headingText]}>SNFT Leaderboards</Text>
                  <Text style={[styles.text]}></Text>
                </View>

                {/*  <View
                    style={{
                      marginTop: moderateScale(10),
                      paddingBottom: verticalScale(10),
                    }}>
                    <Text style={[styles.headingText]}>Owner</Text>
                    <Text style={[styles.text]}>Dorothy Mccoy</Text>
                  </View> */}
              </View>
            </View>
          </View>
        </View>
        <View style={{marginBottom: 20}}>
          <View style={[styles.mainContainer]}>
            <View style={styles.container}>
              <View style={{}}>
                <View>
                  <Text style={[styles.headingText]}>Time Frame</Text>
                  <Text style={[styles.text]}>Prev 21 Days</Text>
                </View>
                <View style={{marginTop: moderateScale(10)}}>
                  <Text style={[styles.headingText]}>Earning ((NAPA))</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <NapaIcon />
                    <Text style={[styles.text]}></Text>
                  </View>
                </View>

                {/* <View style={{marginTop: moderateScale(10)}}>
                  <Text style={[styles.headingText]}>SNFT Leaderboards</Text>
                  <Text style={[styles.text]}></Text>
                </View> */}
              </View>
              <View>
                <View>
                  <Text style={[styles.headingText]}>Views</Text>
                  <Text style={[styles.text]}>
                    {earningData?.prev_21_days_views || 0}
                  </Text>
                </View>

                <View style={{marginTop: moderateScale(10)}}>
                  <Text style={[styles.headingText]}>SNFT Leaderboards</Text>
                  <Text style={[styles.text]}></Text>
                </View>

                {/*    <View
                    style={{
                      marginTop: moderateScale(10),
                      paddingBottom: verticalScale(10),
                    }}>
                    <Text style={[styles.headingText]}>Owner</Text>
                    <Text style={[styles.text]}>Dorothy Mccoy</Text>
                  </View> */}
              </View>
            </View>
          </View>
        </View>
        <View style={{marginBottom: 20}}>
          <View style={[styles.mainContainer]}>
            <View style={styles.container}>
              <View style={{}}>
                <View>
                  <Text style={[styles.headingText]}>Time Frame</Text>
                  <Text style={[styles.text]}>Prev 28 Days</Text>
                </View>
                <View style={{marginTop: moderateScale(10)}}>
                  <Text style={[styles.headingText]}>Earning ((NAPA))</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <NapaIcon />
                    <Text style={[styles.text]}></Text>
                  </View>
                </View>

                {/* <View style={{marginTop: moderateScale(10)}}>
                  <Text style={[styles.headingText]}>SNFT Leaderboards</Text>
                  <Text style={[styles.text]}></Text>
                </View> */}
              </View>
              <View>
                <View>
                  <Text style={[styles.headingText]}>Views</Text>
                  <Text style={[styles.text]}>
                    {earningData?.prev_28_days_views}
                  </Text>
                </View>

                <View style={{marginTop: moderateScale(10)}}>
                  <Text style={[styles.headingText]}>SNFT Leaderboards</Text>
                  <Text style={[styles.text]}></Text>
                </View>

                {/*   <View
                    style={{
                      marginTop: moderateScale(10),
                      paddingBottom: verticalScale(10),
                    }}>
                    <Text style={[styles.headingText]}>Owner</Text>
                    <Text style={[styles.text]}>Dorothy Mccoy</Text>
                  </View> */}
              </View>
            </View>
          </View>
        </View>
        <View style={{marginBottom: 20}}>
          <View style={[styles.mainContainer]}>
            <View style={styles.container}>
              <View style={{}}>
                <View>
                  <Text style={[styles.headingText]}>Time Frame</Text>
                  <Text style={[styles.text]}>Prev 35 Days</Text>
                </View>
                <View style={{marginTop: moderateScale(10)}}>
                  <Text style={[styles.headingText]}>Earning ((NAPA))</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <NapaIcon />
                    <Text style={[styles.text]}></Text>
                  </View>
                </View>

                {/* <View style={{marginTop: moderateScale(10)}}>
                  <Text style={[styles.headingText]}>SNFT Leaderboards</Text>
                  <Text style={[styles.text]}></Text>
                </View> */}
              </View>
              <View>
                <View>
                  <Text style={[styles.headingText]}>Views</Text>
                  <Text style={[styles.text]}>
                    {earningData?.prev_35_days_views || 0}
                  </Text>
                </View>

                <View style={{marginTop: moderateScale(10)}}>
                  <Text style={[styles.headingText]}>SNFT Leaderboards</Text>
                  <Text style={[styles.text]}></Text>
                </View>

                {/* <View
                    style={{
                      marginTop: moderateScale(10),
                      paddingBottom: verticalScale(10),
                    }}>
                    <Text style={[styles.headingText]}>Owner</Text>
                    <Text style={[styles.text]}>Dorothy Mccoy</Text>
                  </View> */}
              </View>
            </View>
          </View>
        </View>
        <View style={{marginBottom: 20}}>
          <View style={[styles.mainContainer]}>
            <View style={styles.container}>
              <View style={{}}>
                <View>
                  <Text style={[styles.headingText]}>Time Frame</Text>
                  <Text style={[styles.text]}>Prev 42 Days</Text>
                </View>
                <View style={{marginTop: moderateScale(10)}}>
                  <Text style={[styles.headingText]}>Earning ((NAPA))</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <NapaIcon />
                    <Text style={[styles.text]}></Text>
                  </View>
                </View>

                {/* <View style={{marginTop: moderateScale(10)}}>
                  <Text style={[styles.headingText]}>SNFT Leaderboards</Text>
                  <Text style={[styles.text]}></Text>
                </View> */}
              </View>
              <View>
                <View>
                  <Text style={[styles.headingText]}>Views</Text>
                  <Text style={[styles.text]}>
                    {earningData?.prev_42_days_views || 0}
                  </Text>
                </View>

                <View style={{marginTop: moderateScale(10)}}>
                  <Text style={[styles.headingText]}>SNFT Leaderboards</Text>
                  <Text style={[styles.text]}></Text>
                </View>

                {/* <View
                    style={{
                      marginTop: moderateScale(10),
                      paddingBottom: verticalScale(10),
                    }}>
                    <Text style={[styles.headingText]}>Owner</Text>
                    <Text style={[styles.text]}>Dorothy Mccoy</Text>
                  </View> */}
              </View>
            </View>
          </View>
        </View>
        <View style={{marginBottom: 20}}>
          <View style={[styles.mainContainer]}>
            <View style={styles.container}>
              <View style={{}}>
                <View>
                  <Text style={[styles.headingText]}>Time Frame</Text>
                  <Text style={[styles.text]}>All Time</Text>
                </View>
                <View style={{marginTop: moderateScale(10)}}>
                  <Text style={[styles.headingText]}>Earning ((NAPA))</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <NapaIcon />
                    <Text style={[styles.text]}></Text>
                  </View>
                </View>

                {/* <View style={{marginTop: moderateScale(10)}}>
                  <Text style={[styles.headingText]}>SNFT Leaderboards</Text>
                  <Text style={[styles.text]}></Text>
                </View> */}
              </View>
              <View>
                <View>
                  <Text style={[styles.headingText]}>Views</Text>
                  <Text style={[styles.text]}>
                    {earningData?.prev_allTime_views || 0}
                  </Text>
                </View>

                <View style={{marginTop: moderateScale(10)}}>
                  <Text style={[styles.headingText]}>SNFT Leaderboards</Text>
                  <Text style={[styles.text]}></Text>
                </View>

                {/* <View
                    style={{
                      marginTop: moderateScale(10),
                      paddingBottom: verticalScale(10),
                    }}>
                    <Text style={[styles.headingText]}>Owner</Text>
                    <Text style={[styles.text]}>Dorothy Mccoy</Text>
                  </View> */}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default PreviousEarning;

const styles = StyleSheet.create({
  mainContainer: {
    borderBottomWidth: 1,
    borderBottomColor: themeColors.garyColor,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(25),
    marginTop: verticalScale(10),
  },
  headingText: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.sl,
    fontWeight: '500',
    lineHeight: 16,
  },
  text: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
    paddingVertical: verticalScale(10),
  },
});
