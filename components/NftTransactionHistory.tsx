import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NapaGrayIcon, ShoppingCartIcon} from '../assets/svg';
import {themeColors} from '../theme/colors';
import {moderateScale} from 'react-native-size-matters';
import {size} from '../theme/fontstyle';

const NftTransactionHistory = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: moderateScale(20),
        marginBottom: moderateScale(20),
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: themeColors.cardsColor,
            borderRadius: 100,
            padding: 10,
          }}>
          <ShoppingCartIcon />
        </View>
        <View style={{marginLeft: moderateScale(20)}}>
          <Text
            style={{color: themeColors.primaryColor, fontSize: size.default}}>
            Sale Item
          </Text>
          <Text
            style={{
              color: themeColors.garyColor,
              fontSize: size.s,
              marginTop:
                Platform.OS == 'ios' ? moderateScale(5) : moderateScale(2),
            }}>
            23 Aug 2022 14:56
          </Text>
        </View>
      </View>
      <View>
        <View style={{flexDirection: 'row'}}>
          <NapaGrayIcon width={15} height={15} />
          <Text
            style={{
              color: themeColors.primaryColor,
              fontSize: size.s,
              marginLeft: moderateScale(10),
            }}>
            20.01
          </Text>
        </View>
        <Text
          style={{
            color: themeColors.garyColor,
            fontSize: size.s,
            marginLeft: moderateScale(10),
            textAlign: 'right',
            marginTop:
              Platform.OS == 'ios' ? moderateScale(5) : moderateScale(2),
          }}>
          $812.46
        </Text>
      </View>
    </View>
  );
};

export default NftTransactionHistory;

const styles = StyleSheet.create({});
