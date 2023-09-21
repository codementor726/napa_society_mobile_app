import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {themeColors} from '../../theme/colors';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {CrossIcon} from '../../assets/svg';
import {Fontfamily} from '../../theme/fontFamily';
import {size} from '../../theme/fontstyle';

type ErrorToastProps = {
  message?: string;
};
const ErrorToast: React.FC<ErrorToastProps> = ({message}) => {
  return (
    <ImageBackground
      imageStyle={{borderRadius: 15}}
      source={require('../../assets/images/reject_gradient.png')}
      style={styles.backgroungImageStyle}>
      <View style={{marginLeft: moderateScale(15), alignSelf: 'center'}}>
        <CrossIcon color={themeColors.lightred} />
      </View>
      <Text style={styles.messageText}>{message}.</Text>
    </ImageBackground>
  );
};
export default ErrorToast;
const styles = StyleSheet.create({
  backgroungImageStyle: {
    flexDirection: 'row',
    alignItems: 'center',
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
