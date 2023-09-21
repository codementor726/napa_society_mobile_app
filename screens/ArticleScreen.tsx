import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BackIcon, ShareIcon} from '../assets/svg';
import Header from '../common/Header';
import Layout from '../common/Layout';
import {moderateScale} from 'react-native-size-matters';
import {size} from '../theme/fontstyle';
import {themeColors} from '../theme/colors';

const ArticleScreen = () => {
  const {goBack} = useNavigation();
  return (
    <Layout>
      <Header
        leftChildren={
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={goBack}>
              <BackIcon color={'#677778'} />
            </TouchableOpacity>
          </View>
        }
        title={false}
        centerTitle=""
        rightChildren={
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
              <ShareIcon color={'#677778'} />
            </TouchableOpacity>
          </View>
        }
      />
    </Layout>
  );
};

export default ArticleScreen;

const styles = StyleSheet.create({
  childStyle: {
    width: '20%',
  },
  centerStyle: {
    width: '55%',
  },
  filterContainer: {
    paddingBottom: moderateScale(5),
    marginHorizontal: moderateScale(10),
    marginTop: moderateScale(18),
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterStyle: {
    fontSize: size.default,
    color: themeColors.primaryColor,
    marginLeft: moderateScale(12),
  },
});
