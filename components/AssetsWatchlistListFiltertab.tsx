import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {verticalScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';

type AssetsWatchlistListFiltertabProps = {
  setfilterWatchlist?: any;
  filterWatchlist?: any;
};

const AssetsWatchlistListFiltertab: React.FC<
  AssetsWatchlistListFiltertabProps
> = ({setfilterWatchlist, filterWatchlist}) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity onPress={() => setfilterWatchlist('1h')}>
        <Text style={{color: filterWatchlist == '1h' ? '#16E6EF' : '#677778'}}>
          1h
        </Text>
      </TouchableOpacity>
      <View style={styles.tabBorderContainer}></View>
      <TouchableOpacity onPress={() => setfilterWatchlist('6h')}>
        <Text style={{color: filterWatchlist == '6h' ? '#16E6EF' : '#677778'}}>
          6h
        </Text>
      </TouchableOpacity>
      <View style={styles.tabBorderContainer}></View>
      <TouchableOpacity onPress={() => setfilterWatchlist('24h')}>
        <Text style={{color: filterWatchlist == '24h' ? '#16E6EF' : '#677778'}}>
          24h
        </Text>
      </TouchableOpacity>
      <View style={styles.tabBorderContainer}></View>
      <TouchableOpacity onPress={() => setfilterWatchlist('7d')}>
        <Text style={{color: filterWatchlist == '7d' ? '#16E6EF' : '#677778'}}>
          7d
        </Text>
      </TouchableOpacity>
      <View style={styles.tabBorderContainer}></View>
      <TouchableOpacity onPress={() => setfilterWatchlist('30d')}>
        <Text style={{color: filterWatchlist == '30d' ? '#16E6EF' : '#677778'}}>
          30d
        </Text>
      </TouchableOpacity>
      <View style={styles.tabBorderContainer}></View>
      <TouchableOpacity onPress={() => setfilterWatchlist('All')}>
        <Text style={{color: filterWatchlist == 'All' ? '#16E6EF' : '#677778'}}>
          All
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AssetsWatchlistListFiltertab;

const styles = StyleSheet.create({
  tabContainer: {
    marginBottom: verticalScale(10),
    padding: verticalScale(10),
    backgroundColor: themeColors.darkGray,
    borderRadius: 20,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  tabText: {
    color: themeColors.garyColor,
  },
  selectedtabText: {
    color: themeColors.aquaColor,
  },
  tabBorderContainer: {
    borderRightWidth: 1,
    borderColor: themeColors.garyColor,
  },
});
