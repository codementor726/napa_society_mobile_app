import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Fontfamily} from '../theme/fontFamily';
import {themeColors} from '../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {BackIcon} from '../assets/svg';
import Header from '../common/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import FixedPrice from './FixedPrice';
import TimeAuction from './TimeAuction';
import {getMintedPost} from '../utils/mintApi';
import {getSnft} from '../services/MarketPlace';
import NftFixedPrice from '../components/NftFixedPrice';

const Sell = ({route}: any) => {
  const {id, nft}: any = route?.params;
  const [tabIndex, setTabIndex] = useState<number>(0);
  const {goBack} = useNavigation<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [mintPost, setMintPost] = useState<any>(null);
  const [snftDetails, setSnftDetails] = useState<any>();

  const handleGetMintPost = async () => {
    console.log('ID', id);

    setLoading(true);
    const {data, error, message}: any = await getMintedPost(id);
    if (error) {
      setLoading(false);
      console.log(message, 'message');
      return;
    }
    setMintPost(data?.data || []);
    console.log(data?.data, 'mintData');
    setLoading(false);
  };

  const handleGetSnft = async () => {
    const {data, error, message}: any = await getSnft(id);
    if (error) {
      setLoading(false);
      return;
    }
    setSnftDetails(data?.data);
  };

  useEffect(() => {
    if (id) {
      handleGetMintPost();
      handleGetSnft();
    }
  }, [id]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      <Header
        leftChildren={
          <TouchableOpacity onPress={() => goBack()}>
            <BackIcon color="white" />
          </TouchableOpacity>
        }
        title={false}
        centerTitle="Sell"
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
                  tabIndex == 0 ? themeColors.aquaColor : themeColors.garyColor,
              },
            ]}>
            Fixed Price
          </Text>
        </TouchableOpacity>
        <View style={styles.lineStyle} />
        <TouchableOpacity
          style={styles.tabTwoStyle}
          disabled={true}
          onPress={() => setTabIndex(1)}>
          <Text
            style={[
              styles.tabTwoTextStyle,
              {
                color:
                  tabIndex == 1 ? themeColors.aquaColor : themeColors.garyColor,
              },
            ]}>
            Time Auction
          </Text>
        </TouchableOpacity>
      </View>
      {tabIndex == 0 ? (
        nft == false ? (
          <FixedPrice
            loading={loading}
            mintDetails={mintPost}
            snftDetails={snftDetails}
            contract=""
            tokenId=""
          />
        ) : (
          <NftFixedPrice
            loading={loading}
            mintDetails={mintPost}
            snftDetails={snftDetails}
            contract=""
            tokenId=""
          />
        )
      ) : (
        <TimeAuction />
      )}
    </SafeAreaView>
  );
};

export default Sell;

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
    marginTop: 26,
  },
});
