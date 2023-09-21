import React from 'react';
import {ActivityIndicator, StyleSheet, View, Text} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import AssetListItem from '../components/AssetListItem';
import {numberWithCommas} from '../utils/NumberWithCommas';
import {Fontfamily} from '../theme/fontFamily';

type AssetProps = {
  containerStyle?: any;
  isFromWallet?: boolean;
  tokenList?: any;
  loading?: boolean;
  search?: string;
};

const AssetsToken: React.FC<AssetProps> = ({
  containerStyle,
  isFromWallet,
  tokenList,
  loading,
  search,
}) => {
  return (
    <View style={{...styles.container, ...containerStyle}}>
      {loading ? (
        <View style={{height: 300, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <>
          {tokenList?.length ? (
            tokenList
              .filter((item: any) =>
                item.name.toLowerCase().includes(search?.toLowerCase()),
              )
              .map((item: any, index: number) => {
                const {title, currencyName, balance, isFromWallet} = item;
                return (
                  <AssetListItem
                    key={index}
                    title={item?.name || 'Ethereum'}
                    coin={''}
                    currencyName={item?.symbol || 'ETH'}
                    balance={numberWithCommas(item?.balance || '0')}
                    isFromWallet={isFromWallet}
                    tokenAddress={item?.tokenAddresses}
                  />
                );
              })
          ) : (
            <View
              style={{
                height: 300,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{color: 'white', fontFamily: Fontfamily.Neuropolitical}}>
                Tokens not found
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: moderateScale(26),
    paddingHorizontal: moderateScale(22),
    marginBottom: moderateScale(70),
  },
});
export default AssetsToken;
