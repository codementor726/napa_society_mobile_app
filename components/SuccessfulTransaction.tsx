import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Layout from '../common/Layout';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {RightIcon} from '../assets/svg/RightIcon';
import {fontSize} from '../responsive';
import {size} from '../theme/fontstyle';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {Image} from 'react-native';
import {NapaGrayIcon} from '../assets/svg';
import {NapaIcon} from '../assets/svg/NapaIcon';
import {TwitterBlueIcon} from '../assets/svg/TwitterBlueIcon';
import {FacebookBlueIcon} from '../assets/svg/FacebookBlueIcon';

const SuccessfulTransaction = () => {
  return (
    <Layout>
      <View style={{justifyContent: 'space-between', flex: 1}}>
        <View style={styles.mainContainer}>
          <View style={styles.iconContainer}>
            <RightIcon />
          </View>
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>
              Congratulations on your purchase of
            </Text>
          </View>
          <View style={{marginHorizontal: moderateScale(20)}}>
            <View style={styles.detailContainerMain}>
              <View style={styles.detailContainer}>
                <Image
                  style={{width: 48, height: 48, borderRadius: 10}}
                  source={require('../assets/images/filter.png')}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    marginLeft: moderateScale(5),
                  }}>
                  <Text style={styles.titleText}>Illusions of Darkness</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.titleTxt}>Bid Price:</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        // marginTop: 20,
                        paddingLeft: 5,
                      }}>
                      <NapaIcon />
                      <Text style={[styles.titleText]}> 0.34</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.statusContainer}>
              <Text style={[styles.titleText, {color: themeColors.garyColor}]}>
                Transaction Status
              </Text>
              <Text style={[styles.titleText, {width: '55%'}]}>
                Pending Shipping & Transfer on Blockchain
              </Text>
            </View>
            <View style={styles.border}></View>
            <View style={styles.totalAmountContainer}>
              <Text style={[styles.totalAmountText]}>
                Total Amount of Purchase
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <NapaIcon />
                <Text style={[styles.titleText]}> 0.34</Text>
              </View>
            </View>
            <View style={{marginTop: verticalScale(10)}}>
              <TouchableOpacity style={[styles.container]}>
                <TwitterBlueIcon />
                <Text style={[styles.textStyle, {color: '#1D9BF0'}]}>
                  {' '}
                  Share on Twitter
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.container, {backgroundColor: '#061E3c'}]}>
                <FacebookBlueIcon />
                <Text style={[styles.textStyle, {color: '#1877F2'}]}>
                  {' '}
                  Share on Facebook
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.container,{backgroundColor:themeColors.cardsColor}]}>
                <NapaIcon iconColor={themeColors.aquaColor} />
                <Text style={[styles.textStyle]}> Share on Napa Society</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.sellBtn}>
            <Text style={styles.completeSellBtn}>Return to Merketolace</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default SuccessfulTransaction;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
  },
  iconContainer: {
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: themeColors.cardsColor,
    borderRadius: 70,
    paddingTop: 55,
    width: 140,
    height: 140,
  },
  headingContainer: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  headingText: {
    marginTop: moderateScale(20),
    textAlign: 'center',
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.lg,
    color: themeColors.primaryColor,
    fontWeight: '400',
    width: '70%',
  },
  detailContainerMain: {
    marginTop: verticalScale(20),

    backgroundColor: themeColors.cardsColor,
    borderRadius: 10,
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(10),
  },
  detailContainer: {
    flexDirection: 'row',
  },
  titleText: {
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: Fontfamily.Avenier,
    color: themeColors.primaryColor,
    fontSize: size.default,
    fontWeight: '500',
  },
  titleTxt: {
    fontFamily: Fontfamily.Avenier,
    color: themeColors.garyColor,
    fontSize: size.s,
    fontWeight: '500',
  },
  statusContainer: {
    marginTop: verticalScale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  border: {
    marginTop: verticalScale(20),
    marginHorizontal: moderateScale(-20),
    borderBottomWidth: 1,
    borderBottomColor: themeColors.garyColor,
  },

  totalAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(20),
  },
  totalAmountText: {
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: Fontfamily.Avenier,
    color: themeColors.garyColor,
    marginTop: verticalScale(15),
    fontSize: size.default,
    fontWeight: '500',
  },
  container: {
    marginTop: verticalScale(10),
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#07273c',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    // 061E3c
  },
  textStyle: {
    color: themeColors.aquaColor,
    fontSize: size.default,
    fontFamily: Fontfamily.Neuropolitical,
  },
  sellBtn: {
    height: 60,
    backgroundColor: themeColors.aquaColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeSellBtn: {
    fontFamily: Fontfamily.Neuropolitical,
    color: 'black',
    fontSize: 14,
  },
});
