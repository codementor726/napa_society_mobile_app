import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Header from '../common/Header';
import {BackIcon} from '../assets/svg';
import {useNavigation} from '@react-navigation/native';
import {themeColors} from '../theme/colors';
import {size} from '../theme/fontstyle';
import {moderateScale} from 'react-native-size-matters';
import {Fontfamily} from '../theme/fontFamily';

const SubmitOffer = () => {
  const {goBack} = useNavigation<any>();
  return (
    <View style={styles.container}>
      <Header
        leftChildren={
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => goBack()}>
              <BackIcon />
            </TouchableOpacity>
          </View>
        }
        title={false}
        centerTitle={'Submit Offer'}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.inputContainerTitle}>Amount</Text>
        <View style={styles.inputContainer1}>
          <TextInput
            style={styles.inputContainerTextInput}
            placeholder="0.23"
            placeholderTextColor={themeColors.primaryColor}
            keyboardType={Platform.OS == 'android' ? 'numeric' : 'number-pad'}
          />
          <Text style={styles.inputContainerTokenName}>NAPA</Text>
        </View>
      </View>
      <View style={styles.offerExpire}>
        <Text style={styles.offerExpireText}>Offer Expires</Text>
        <View style={styles.offerExpireItems}>
          <TouchableOpacity style={styles.offerExpireButton}>
            <Text style={styles.offerExpireButtonText}>1 Day</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.offerExpireButton}>
            <Text style={styles.offerExpireButtonText}>3 Days</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.offerExpireButton}>
            <Text style={styles.offerExpireButtonText}>5 Days</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.offerExpireButton}>
            <Text style={styles.offerExpireButtonText}>7 Days</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SubmitOffer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeColors.secondaryColor,
    flex: 1,
    paddingTop: 30,
    justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainerTextInput: {
    color: themeColors.primaryColor,
    fontSize: size.xxxlg,
    fontFamily: Fontfamily.Grostestk,
    height: 100,
    paddingRight: moderateScale(10),
    width: 150,
  },
  inputContainerTitle: {
    color: themeColors.garyColor,
    fontSize: size.default,
    fonrweight: '500',
    lineHeight: 19.6,
    alignItems: 'center',
    fontFamily: Fontfamily.Avenier,
  },
  inputContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainerTokenName: {
    color: themeColors.primaryColor,
    fontSize: size.md,
    fontFamily: Fontfamily.Neuropolitical,
    lineHeight: 17.6,
    fontWeight: '400',
  },
  offerExpire: {
    paddingHorizontal: moderateScale(10),
  },
  offerExpireText: {
    color: themeColors.garyColor,
    fontSize: size.default,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    lineHeight: 19.6,
    marginLeft: moderateScale(15),
    marginBottom: moderateScale(5),
  },
  offerExpireItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  offerExpireButton: {
    borderColor: themeColors.aquaColor,
    borderWidth: 1,
    borderRadius: 50,
    width: '45%',
    marginVertical: moderateScale(10),
    paddingVertical: moderateScale(7),
    alignItems: 'center',
  },
  offerExpireButtonText: {
    color: themeColors.aquaColor,
  },
  submitButton: {
    backgroundColor: themeColors.aquaColor,
    paddingVertical: moderateScale(20),
  },
  submitButtonText: {
    color: themeColors.secondaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontWeight: '400',
    fontSize: size.default,
    textAlign: 'center',
    lineHeight: 15.4,
  },
});
