import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {Fontfamily} from '../../theme/fontFamily';
import {size} from '../../theme/fontstyle';
import {themeColors} from '../../theme/colors';
import AlertIcon from '../../assets/svg/AlertIcon';
type WarningToastProps = {
  message?: string;
};
const WarningToast: React.FC<WarningToastProps> = ({message}) => {
  return (
    <ImageBackground
      imageStyle={{borderRadius: 15}}
      source={require('../../assets/images/warninggradient.png')}
      style={styles.backgroungImageStyle}>
      <View style={{marginLeft: moderateScale(15), alignSelf: 'center'}}>
        <AlertIcon color="#FFA50A" />
      </View>
      <Text style={styles.messageText}>{message}.</Text>
    </ImageBackground>
  );
};

export default WarningToast;

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
