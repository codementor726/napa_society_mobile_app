import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {DoubleDotIcon} from '../assets/svg';
import {themeColors} from '../theme/colors';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {Fontfamily} from '../theme/fontFamily';
import {NapaIcon} from '../assets/svg/NapaIcon';
import {size} from '../theme/fontstyle';
import AssetsWatchlistListFiltertab from './AssetsWatchlistListFiltertab';

type AssetsWatchlistListProps = {
  imgUri: any;
  title: string;
  points?: number;
  highestOffer?: number;
  floor: number;
  //   imgUri: any;
  //     title: string;
  //     points?: number;
  //     highestOffer?: number;
  //     floor: number;
  //     Volume:number,
  //     Change: any,
  //     image:any,
  //     FloorPrice:number,
  //     UniqueOwners: any,
  //    ItemsListed: any
};
const AssetsWatchlistList: React.FC<AssetsWatchlistListProps> = () => {
  const [filterWatchlist, setfilterWatchlist] = useState<any>('1h');

  return (
    <View style={styles.mainContainer}>
      <AssetsWatchlistListFiltertab
        setfilterWatchlist={setfilterWatchlist}
        filterWatchlist={filterWatchlist}
      />
      <View>
        <View style={styles.firstContainer}>
          <View style={styles.firstContainerFirstChild}>
            <Image
              style={{width: 62, height: 50, borderRadius: 5}}
              source={require('../assets/images/image.png')}
            />
            <Text style={styles.firstContainerChildText}>
              Freaks {'\n'}and Geeks
            </Text>
          </View>
          <DoubleDotIcon />
        </View>
        <View style={styles.secondContainer}>
          <View>
            <View>
              <Text style={styles.headingText}>Volume</Text>
              <View style={styles.earnedPrice}>
                <View style={{paddingTop: verticalScale(4)}}>
                  <NapaIcon />
                </View>
                <Text style={styles.titleText}> 1.4</Text>
              </View>
            </View>
            <View style={styles.secondChildContainer}>
              <Text style={styles.headingText}>Sales</Text>
              <Text style={styles.titleText}>12</Text>
            </View>
          </View>
          <View>
            <View>
              <Text style={styles.headingText}>%Changes</Text>
              <Text style={styles.ChangesText}>+7%</Text>
            </View>
            <View style={styles.secondChildContainer}>
              <Text style={styles.headingText}>% Unique Owners</Text>
              <View style={styles.earnedPrice}>
                <Text style={styles.titleText}>38%</Text>
                <Text style={styles.OwnersText}>(2,831 Owners)</Text>
              </View>
            </View>
          </View>
          <View>
            <View>
              <Text style={styles.headingText}>Floor Price</Text>
              <View style={styles.earnedPrice}>
                <View style={{paddingTop: verticalScale(4)}}>
                  <NapaIcon />
                </View>
                <Text style={styles.titleText}> 0.35</Text>
              </View>
            </View>
            <View style={styles.secondChildContainer}>
              <Text style={styles.headingText}>% Items Listed</Text>
              <Text style={styles.titleText}>10</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AssetsWatchlistList;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: moderateScale(22),
    marginTop: verticalScale(20),
  },
  firstContainer: {
    marginTop: verticalScale(15),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  firstContainerFirstChild: {
    flexDirection: 'row',
  },
  firstContainerChildText: {
    fontFamily: Fontfamily.Neuropolitical,
    color: themeColors.primaryColor,
    fontWeight: '400',
    lineHeight: 19,
    paddingLeft: moderateScale(20),
  },
  secondContainer: {
    marginTop: verticalScale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondChildContainer: {
    marginTop: verticalScale(15),
  },
  earnedPrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingText: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    color: themeColors.garyColor,
    fontWeight: '500',
  },
  titleText: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    color: themeColors.primaryColor,
    fontWeight: '500',
    paddingTop: verticalScale(5),
  },
  ChangesText: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    color: themeColors.aquaColor,
    fontWeight: '500',
    paddingTop: verticalScale(5),
  },
  OwnersText: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    color: themeColors.garyColor,
    fontWeight: '500',
    paddingTop: verticalScale(5),
  },
});
