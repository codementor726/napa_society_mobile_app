import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BackIcon, FilterIcon, Search} from '../assets/svg';
import Header from '../common/Header';
import Layout from '../common/Layout';
import BlueTabs from '../common/BlueTab';
import {TrendingTab} from '../const/trending';
import {moderateScale} from 'react-native-size-matters';
import {size} from '../theme/fontstyle';
import {themeColors} from '../theme/colors';
import TrendingToken from '../components/Trendingarticles';

const TrendingScreen = () => {
  const {goBack} = useNavigation();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
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
        childStyle={styles.childStyle}
        centerStyle={styles.centerStyle}
        rightStyle={styles.childStyle}
        title={false}
        centerTitle="Trending"
        rightChildren={
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
              <Search color={'#677778'} />
            </TouchableOpacity>
          </View>
        }
      />

      <BlueTabs
        data={TrendingTab}
        activeTabIndex={activeTabIndex}
        setActiveTabIndex={setActiveTabIndex}
      />

      <View style={styles.filterContainer}>
        <FilterIcon />
        <Text style={styles.filterStyle}>Filters</Text>
      </View>

      {activeTabIndex == 1 && <TrendingToken />}
    </Layout>
  );
};

export default TrendingScreen;

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
