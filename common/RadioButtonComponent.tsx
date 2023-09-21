import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {size} from '../theme/fontstyle';
import {Fontfamily} from '../theme/fontFamily';
import React from 'react';
import {RightIcon} from '../assets/svg/RightIcon';

type RadioButtonComponentProps = {
  item?: any;
  onPress?: any;
  isSelected?: boolean;
  iconChildren?: React.ReactNode;
  title?: string;
  subTitle?: string;
  titleStyle?: any;
};
const RadioButtonComponent: React.FC<RadioButtonComponentProps> = ({
  item,
  onPress,
  isSelected,
  iconChildren,
  title,
  subTitle,
  titleStyle,
}) => {
  return (
    <>
      <View key={item?.id} style={styles.mainContainer}>
        <TouchableOpacity
          onPress={() => {
            onPress(item);
          }}
          style={[
            styles.firstCointanier,
            {
              backgroundColor: isSelected
                ? themeColors.darkGray
                : themeColors.black,
            },
          ]}>
          <View style={styles.firstCointanierItem}>
            {title != 'Sepolia Testnet' && (
              <View style={[styles.tokenIcon]}>{iconChildren}</View>
            )}
            {title == 'Sepolia Testnet' && (
              <View
                style={{
                  backgroundColor: isSelected
                    ? themeColors.aquaColor
                    : themeColors.cardsColor,
                  padding: 13,
                  borderRadius: 25,
                }}>
                {iconChildren}
              </View>
            )}
            <View style={styles.tokenNameContainer}>
              <Text
                numberOfLines={1}
                style={{...styles.tokenName, ...titleStyle}}>
                {title}
              </Text>
              {subTitle && <Text style={styles.token}>{subTitle}</Text>}
            </View>
          </View>
          {isSelected && (
            <View style={styles.rightIconStyle}>
              <RightIcon />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

export default RadioButtonComponent;

const styles = StyleSheet.create({
  mainContainer: {},

  firstCointanier: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(22),
  },
  firstCointanierItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenIcon: {
    borderColor: themeColors.garyColor,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenNameContainer: {
    flex: 1,
    paddingLeft: moderateScale(10),
  },
  tokenName: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
    color: themeColors.primaryColor,
  },

  token: {
    color: themeColors.garyColor,
    fontSize: size.s,
    fontFamily: Fontfamily.Avenier,
  },
  button: {
    backgroundColor: themeColors.aquaColor,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(20),
  },
  buttonTitle: {
    color: themeColors.secondaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.default,
    fontWeight: '400',
    textAlign: 'center',
  },
  rightIconStyle: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
