import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {ForwardIcon} from '../assets/svg';
import HandleCurrencyIcon from './HandleCurrencyIcon';

type CTTokenButtonProps = {
  title: string;
  subTitle: string;
  isDisable?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
};
const CTTokenButton: React.FC<CTTokenButtonProps> = ({
  title,
  subTitle,
  onPress,
  isDisable,
}) => {
  return (
    <TouchableOpacity
      disabled={isDisable}
      onPress={onPress}
      style={styles.firstCointanier}>
      <View style={styles.firstCointanierItem}>
        {subTitle != 'SEPOLIA' && (
          <View style={styles.tokenIcon}>
            <HandleCurrencyIcon
              iconColor=""
              bgColor=""
              currencyName={subTitle}
            />
          </View>
        )}
        {subTitle == 'SEPOLIA' && (
          <View style={styles.tokenIconSepolia}>
            <HandleCurrencyIcon
              iconColor=""
              bgColor=""
              currencyName={subTitle}
            />
          </View>
        )}
        <View style={styles.tokenNameContainer}>
          <Text style={styles.tokenName}>{title}</Text>
          <Text style={styles.token}>{subTitle}</Text>
        </View>
      </View>
      <ForwardIcon />
    </TouchableOpacity>
  );
};

export default CTTokenButton;
const styles = StyleSheet.create({
  firstCointanier: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: themeColors.darkGray,
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(15),
    marginHorizontal: moderateScale(8),
    borderRadius: 24,
  },
  firstCointanierItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenIcon: {
    borderWidth: 1,
    borderColor: themeColors.garyColor,
    borderRadius: 50,
  },
  tokenIconSepolia: {
    borderWidth: 1,
    borderColor: themeColors.garyColor,
    borderRadius: 50,
    padding: 13,
  },
  tokenNameContainer: {
    paddingLeft: moderateScale(10),
  },
  tokenName: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
    color: themeColors.primaryColor,
  },

  token: {
    marginTop: moderateScale(3),
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
});
