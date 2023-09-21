import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  RefreshControl,
} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {FilterIcon} from '../assets/svg';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import MarketPlaceAll from './MarketplaceAll';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../typings/screens-enums';
import {useDispatch} from 'react-redux';
import {
  MarketPlaceData,
  setMarketPlaceData,
} from '../store/slices/MarketPlaceItem';

const MarketPlaceItem = () => {
  const {navigate} = useNavigation<any>();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(setMarketPlaceData([]));
    setTimeout(() => {
      dispatch(MarketPlaceData(24));
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <View style={styles.marketItem}>
      <ScrollView
        refreshControl={
          <RefreshControl
            progressBackgroundColor="transparent"
            colors={['white']}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <View style={styles.itemTextView}>
          <View style={styles.itemText}>
            <Text style={styles.text}>Digitals</Text>
          </View>
          <View style={styles.itemText1}>
            <Text style={styles.text1}>Merchants</Text>
          </View>
        </View>
        <Pressable
          onPress={() => navigate(SCREENS.MarketplaceFilter)}
          style={styles.filterIcon}>
          <FilterIcon />
          <Text style={styles.filterText}>Filters</Text>
        </Pressable>
        <MarketPlaceAll />
      </ScrollView>
    </View>
  );
};

export default MarketPlaceItem;
const styles = StyleSheet.create({
  marketItem: {
    marginTop: moderateScale(20),
  },
  itemTextView: {
    backgroundColor: themeColors.cardsColor,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: moderateScale(24),
    height: verticalScale(40),
    alignItems: 'center',
  },
  itemText: {
    width: '50%',
    borderRightWidth: 1,
    borderColor: themeColors.garyColor,
    height: verticalScale(25),
    justifyContent: 'center',
  },
  itemText1: {
    width: '50%',
    height: verticalScale(25),
    justifyContent: 'center',
  },
  text: {
    color: themeColors.aquaColor,
    textAlign: 'center',
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
  },
  text1: {
    color: themeColors.primaryColor,
    textAlign: 'center',
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
  },
  filterIcon: {
    marginTop: moderateScale(16),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: moderateScale(20),
  },
  filterText: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.default,
    marginLeft: moderateScale(10),
  },
});
