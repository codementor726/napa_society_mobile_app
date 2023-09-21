import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import AssetListNFT from './AssetsListNFT';
import moment from 'moment';
import {Fontfamily} from '../theme/fontFamily';
import {SCREENS} from '../typings/screens-enums';
import {useNavigation} from '@react-navigation/native';

type AssetProps = {
  nfts?: any;
  containerStyle?: any;
  search?: any;
  loading?: boolean;
};

const AssetsNFT: React.FC<AssetProps> = ({
  containerStyle,
  nfts,
  search,
  loading,
}) => {
  const {navigate} = useNavigation<any>();
  return (
    <>
      {loading ? (
        <View style={{height: 300, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <>
          {nfts?.length ? (
            <View style={{...styles.container, ...containerStyle}}>
              {nfts
                .filter((nft: any) =>
                  nft.name.toLowerCase().includes(search.toLowerCase()),
                )
                .map((nft: any, index: number) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigate(SCREENS.NFTDETAILPAGE, {snftId: nft?.id})
                      }>
                      <AssetListNFT
                        key={index}
                        title={nft?.description}
                        points={nft?.amount}
                        highestOffer={0.18}
                        floor={0.18}
                        imgUri={nft?.image || nft?.avatar}
                        date={moment(nft?.date).format('D MMM YYYY')}
                      />
                    </TouchableOpacity>
                  );
                })}
            </View>
          ) : (
            <View
              style={{
                // flex: 0.6,
                justifyContent: 'center',
                alignItems: 'center',
                height: 300,  
              }}>
              <Text
                style={{color: 'white', fontFamily: Fontfamily.Neuropolitical}}>
                Nft's not found
              </Text>
            </View>
          )}
        </>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(26),
    paddingHorizontal: moderateScale(24),
    marginBottom: moderateScale(70),
  },
});
export default AssetsNFT;
