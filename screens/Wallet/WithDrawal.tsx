import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  SectionList,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Layout from '../../common/Layout';
import Header from '../../common/Header';
import {moderateScale} from 'react-native-size-matters';
import CTTokenButton from '../../common/CTTokenButton';
import {themeColors} from '../../theme/colors';
import {size} from '../../theme/fontstyle';
import {Fontfamily} from '../../theme/fontFamily';
import {SCREENS} from '../../typings/screens-enums';
import {useSelector} from 'react-redux';
import {selectNetworkType} from '../../store/selectors/NapaAccount';
import WithDrawalToken from './WithDrawalToken';
import {CrossIcon} from '../../assets/svg';
import WithDrawalNFT from './WithDrawalNFTs';
import WithDrawalSNFT from './WithDrawalSNFTs';
const WithDrawalScreen = () => {
  const {goBack, navigate} = useNavigation<any>();
  const networkType = useSelector(selectNetworkType);
  const [index, setIndex] = useState('0');
  return (
    <>
      <Layout>
        <Header
          leftChildren={
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={goBack}>
                <CrossIcon color={'#677778'} />
              </TouchableOpacity>
            </View>
          }
          childStyle={styles.childStyle}
          centerStyle={styles.centerStyle}
          rightStyle={styles.childStyle}
          title={false}
          centerTitle="Send"
        />
        <View style={styles.selectOption}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingRight: moderateScale(30),
              paddingVertical: moderateScale(5),
              borderRightColor: themeColors.garyColor,
              borderRightWidth: 0.5,
            }}
            onPress={() => setIndex('0')}>
            <Text
              style={[
                styles.selectOptionText,
                {
                  color:
                    index == '0'
                      ? themeColors.aquaColor
                      : themeColors.garyColor,
                },
              ]}>
              Tokens
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingRight: moderateScale(30),
              paddingVertical: moderateScale(5),
              borderRightColor: themeColors.garyColor,
              borderRightWidth: 0.5,
            }}
            onPress={() => setIndex('1')}>
            <Text
              style={[
                styles.selectOptionText,
                {
                  color:
                    index == '1'
                      ? themeColors.aquaColor
                      : themeColors.garyColor,
                },
              ]}>
              NFT's
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              // paddingHorizontal: moderateScale(10),
              paddingVertical: moderateScale(5),
            }}
            onPress={() => setIndex('2')}>
            <Text
              style={[
                styles.selectOptionText,
                {
                  color:
                    index == '2'
                      ? themeColors.aquaColor
                      : themeColors.garyColor,
                },
              ]}>
              SNFT's
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.networkView}>
          <CTTokenButton
            onPress={() => {
              navigate(SCREENS.SELECTNETWORK);
            }}
            title={networkType?.title}
            subTitle={networkType?.currencyName}
          />
        </View>
        {index == '0' && <WithDrawalToken />}
        {index == '1' && <WithDrawalNFT />}
        {index == '2' && <WithDrawalSNFT />}
      </Layout>
    </>
  );
};

export default WithDrawalScreen;
const styles = StyleSheet.create({
  childStyle: {
    width: '20%',
  },
  centerStyle: {
    width: '55%',
  },
  selectOption: {
    marginTop: moderateScale(20),
    backgroundColor: themeColors.cardsColor,
    marginHorizontal: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(5),
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 50,
  },
  selectOptionText: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    lineHeight: 19.6,
    alignItems: 'center',
    fontSize: size.default,
  },
  networkView: {
    marginTop: moderateScale(20),
  },
});
