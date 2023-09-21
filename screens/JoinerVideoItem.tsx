/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FC} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {CrossIcon} from '../assets/svg';
import Layout from '../common/Layout';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {SCREENS} from '../typings/screens-enums';
import {getJoinerLiveStreamList} from '../services/GetImportedToken';

const JoinerVideoItem: FC = () => {
  const {goBack} = useNavigation();
  const navigation = useNavigation<any>();
  const [userListItem, setUserListItem] = useState<any>({});

  const route = useRoute();
  const {itemUuid} = route?.params as any;
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      (async () => {
        if (itemUuid) {
          const {data} = (await getJoinerLiveStreamList(itemUuid, {
            enabled: !!itemUuid,
          })) as any;
          if (data && data?.data) {
            setUserListItem(data?.data[0]);
          }
        }
      })();
    });

    return unsubscribe;
  }, [itemUuid, navigation]);
  return (
    <Layout>
      <View style={styles.qrContainer}>
        <ImageBackground
          source={require('../assets/images/itemBg.png')}
          style={styles.stmBg}>
          <View style={styles.itemCenter}>
            <View style={styles.itemContent}>
              <Image
                style={{
                  width: Dimensions.get('window').width - 80,
                  height: Dimensions.get('window').height / 2,
                  borderRadius: 30,
                }}
                source={{uri: userListItem?.itemImage}}
              />
              <View style={styles.overlay}>
                <View style={styles.itemData}>
                  <Text style={styles.itemTitle}>{userListItem?.itemName}</Text>

                  <View style={styles.bidMain}>
                    <View>
                      <Text style={styles.itemPP}>Fixed Price</Text>
                      <View style={styles.unitMain}>
                        <Image
                          source={require('../assets/images/napa_icon.png')}
                        />
                        <Text style={[styles.itemUnit, {marginLeft: 10}]}>
                          {userListItem?.price} NAPA
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.buttonMain}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  navigation.navigate(SCREENS.JOINERBUY, {
                    ...route.params,
                    itemUuid: itemUuid,
                  });
                }}>
                <Text style={styles.aquaBorderButton}>
                  Buy for{' '}
                  <Image source={require('../assets/images/black_napa.png')} />{' '}
                  {userListItem?.price}
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                disabled
                onPress={() => navigation.navigate(SCREENS.PLACEBID)}
                activeOpacity={0.5}>
                <Text
                  style={[
                    styles.aquaBorderButton,
                    {
                      color: themeColors.aquaColor,
                      borderColor: themeColors.aquaColor,
                      backgroundColor: themeColors.transparent,
                    },
                  ]}>
                  Place a Bid
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
          <TouchableOpacity onPress={goBack} style={styles.crossIconMain}>
            <CrossIcon />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </Layout>
  );
};

export default JoinerVideoItem;

const styles = StyleSheet.create({
  qrContainer: {
    flex: 1,
    marginTop: 10,
  },
  stmBg: {
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 24,
    fontFamily: Fontfamily.Neuropolitical,
    color: themeColors.primaryColor,
    marginBottom: 15,
  },
  itemPP: {
    fontSize: 12,
    fontFamily: Fontfamily.Avenier,
    color: themeColors.primaryColor,
  },
  itemUnit: {
    fontSize: 18,
    fontWeight: '700',
    color: themeColors.primaryColor,
  },
  unitMain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bidMain: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemContent: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginBottom: 60,
  },
  itemData: {
    position: 'absolute',
    right: 30,
    left: 30,
    paddingVertical: 30,
    zIndex: 999,
    bottom: 0,
  },
  aquaBorderButton: {
    borderWidth: 1,
    borderRadius: 100,
    borderColor: themeColors.aquaColor,
    color: themeColors.black,
    minWidth: '48%',
    textAlign: 'center',
    paddingVertical: verticalScale(12),
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: 14,
    backgroundColor: themeColors.aquaColor,
    paddingHorizontal: 10,
  },
  buttonMain: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  itemCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossIconMain: {
    marginTop: 50,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    backgroundColor: '#000000b5',
    width: Dimensions.get('window').width - 80,
    height: Dimensions.get('window').height / 2,
    left: 0,
    zIndex: 1,
    borderRadius: 30,
  },
});
