import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {RightIcon} from '../../assets/svg/RightIcon';
import {themeColors} from '../../theme/colors';
import {Fontfamily} from '../../theme/fontFamily';
import {size} from '../../theme/fontstyle';
type SuccessToastToastProps = {
  message?: string;
};
const SuccessToast: React.FC<SuccessToastToastProps> = ({message}) => {
  return (
    <ImageBackground
      imageStyle={{borderRadius: 15}}
      source={require('../../assets/images/suces_gradient.png')}
      style={styles.backgroungImageStyle}>
      <View style={{marginLeft: moderateScale(15), alignSelf: 'center'}}>
        <RightIcon color={themeColors.aquaColor} />
      </View>
      <Text style={styles.messageText}>{message}.</Text>
    </ImageBackground>
  );
};

export default SuccessToast;

const styles = StyleSheet.create({
  backgroungImageStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  messageText: {
    fontFamily: Fontfamily.Avenier,
    fontSize: Dimensions.get('window').width < 337 ? size.default : size.md,
    fontWeight: '500',
    color: themeColors.primaryColor,
    marginLeft: moderateScale(10),
    paddingRight: moderateScale(40),
    marginVertical: verticalScale(10),
  },
});
