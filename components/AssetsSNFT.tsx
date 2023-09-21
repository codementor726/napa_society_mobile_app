import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import AssetListNFT from './AssetsListNFT';
import moment from 'moment';
import {Fontfamily} from '../theme/fontFamily';
import {SCREENS} from '../typings/screens-enums';
import {useNavigation} from '@react-navigation/native';

type AssetProps = {
  snfts?: any;
  containerStyle?: any;
  search: string;
  loading: boolean;
};
const AssetsSNFT: React.FC<AssetProps> = ({
  containerStyle,
  snfts,
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
          {snfts?.length ? (
            <View style={{...styles.container, ...containerStyle}}>
              {snfts
                .filter((snft: any) =>
                  snft.name.toLowerCase().includes(search.toLowerCase()),
                )
                .map((snft: any, index: number) => {
                  console.log(snft, 'snfts');
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        console.log(snft, '======> snft123');
                        if (snft?.id) {
                          navigate(SCREENS.MARKETPLACEDETAILSNFT, {
                            snftId: snft?.id,
                            marketId: undefined,
                          });
                        }
                      }}>
                      <AssetListNFT
                        key={index}
                        title={snft?.title}
                        description={snft?.description}
                        points={snft?.amount}
                        highestOffer={0.18}
                        floor={0.18}
                        imgUri={snft?.image || snft?.avatar}
                        date={moment(snft?.date).format('D MMM YYYY')}
                      />
                    </TouchableOpacity>
                  );
                })}
            </View>
          ) : (
            <View
              style={{
                height: 300,  
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{color: 'white', fontFamily: Fontfamily.Neuropolitical}}>
                Snft's not found
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
export default AssetsSNFT;
