import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../common/Header';
import {BackIcon} from '../assets/svg';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {useNavigation, useRoute} from '@react-navigation/native';
import Fans from './Fans';
import FansOf from './FansOf';
import {SafeAreaView} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';
import Layout from '../common/Layout';
const FansScreen = () => {
  const route = useRoute<any>();
  const {index, profileId} = route?.params;
  const [tabIndex, setTabIndex] = useState<number>(index ? index : 0);
  const {goBack} = useNavigation<any>();
  
  return (
    <Layout>
      <View style={{flex: 1, backgroundColor: '#000'}}>
        <Header
          leftChildren={
            <TouchableOpacity onPress={() => goBack()}>
              <BackIcon color="white" />
            </TouchableOpacity>
          }
          title={false}
        />
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={styles.tabOneStyle}
            onPress={() => setTabIndex(0)}>
            <Text
              style={[
                styles.tabOneTextStyle,
                {
                  color:
                    tabIndex == 0
                      ? themeColors.aquaColor
                      : themeColors.garyColor,
                },
              ]}>
              Followers
            </Text>
          </TouchableOpacity>
          <View style={styles.lineStyle} />
          <TouchableOpacity
            style={styles.tabTwoStyle}
            onPress={() => setTabIndex(1)}>
            <Text
              style={[
                styles.tabTwoTextStyle,
                {
                  color:
                    tabIndex == 1
                      ? themeColors.aquaColor
                      : themeColors.garyColor,
                },
              ]}>
              Following
            </Text>
          </TouchableOpacity>
        </View>
        {tabIndex == 0 ? (
          <Fans profileId={profileId} />
        ) : (
          <FansOf profileId={profileId} />
        )}
      </View>
    </Layout>
  );
};

export default FansScreen;

const styles = StyleSheet.create({
  tabTwoTextStyle: {
    fontFamily: Fontfamily.Avenier,
    fontSize: 14,
  },
  tabOneTextStyle: {
    fontFamily: Fontfamily.Avenier,
    fontSize: 14,
  },
  tabTwoStyle: {
    flex: 1,
    alignItems: 'center',
  },
  lineStyle: {
    height: '70%',
    width: 0.1,
    backgroundColor: themeColors.garyColor,
    flex: 0.01,
    opacity: 0.3,
  },
  tabOneStyle: {
    alignItems: 'center',
    flex: 1,
  },
  tabContainer: {
    backgroundColor: themeColors.darkGray,
    height: 32,
    marginHorizontal: 8,
    borderRadius: 100 / 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(15),
  },
});
