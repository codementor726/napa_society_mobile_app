/* eslint-disable react-native/no-inline-styles */
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {FC, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {useToast} from 'react-native-toast-notifications';
import {useSelector} from 'react-redux';
import {BackIcon} from '../assets/svg';
import {LargeNapaIcon} from '../assets/svg/LargeNapaIcon';
import {NapaIcon} from '../assets/svg/NapaIcon';
import Header from '../common/Header';
import Layout from '../common/Layout';
import {getJoinerLiveStreamList} from '../services/GetImportedToken';
import {purchaseLiveStreamItem} from '../services/PostApi';
import {selectActiveWalletAddress} from '../store/selectors/NapaAccount';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {SCREENS} from '../typings/screens-enums';
var serviceFee: number = 0.1;
var ourFee: number = 0.99;

const JoinerBuy: FC = () => {
  const {goBack} = useNavigation();
  const toast = useToast();
  const navigation = useNavigation<any>();
  const [userListItem, setUserListItem] = useState<any>({});
  let buyerProfileId = useSelector(selectProfileList).profileId;
  const activeAccountAddress = useSelector(selectActiveWalletAddress);
  const route = useRoute();
  const {itemUuid} = route?.params as any;
  const total = parseFloat(userListItem.price) + serviceFee + ourFee;

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

  const onItemPurchase = async (purchaseItemUuid: any) => {
    const purchaseData = {
      itemUuid: purchaseItemUuid,
      buyerProfileId: buyerProfileId,
      buyerWallet: activeAccountAddress,
    };

    const {error, message} = await purchaseLiveStreamItem(purchaseData);
    if (error) {
      
      toast.show(message, {
        type: 'danger',
      });
    } else {
      navigation.navigate(SCREENS.PURCHASESTREAMITEM, {
        ...route.params,
        itemUuid: purchaseItemUuid,
        userListItem,
      });
    }
  };

  return (
    <Layout>
      <Header
        leftChildren={
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={goBack}>
              <BackIcon />
            </TouchableOpacity>
          </View>
        }
        title={false}
        centerTitle={`Buy (${userListItem?.itemName})`}
      />
      <View style={styles.qrContainer}>
        <View style={styles.stmBg}>
          <View style={styles.itemCenter}>
            <View style={styles.itemContent}>
              <Image
                style={{
                  width: Dimensions.get('window').width - 20,
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
          </View>
          <View style={{paddingHorizontal: verticalScale(24)}}>
            <Text style={styles.summary}>Summary</Text>
            <View style={styles.bidPPMain}>
              <Text style={styles.bidPP}>Fixed Price</Text>
              <Text style={[styles.bidPP, {color: themeColors.primaryColor}]}>
                <NapaIcon /> {userListItem.price}
              </Text>
            </View>
            <View style={styles.bidPPMain}>
              <Text style={styles.bidPP}>Network Fee</Text>
              <Text style={[styles.bidPP, {color: themeColors.primaryColor}]}>
                <NapaIcon /> {serviceFee}
              </Text>
            </View>
            <View style={styles.bidPPMain}>
              <Text style={styles.bidPP}>Our Fee</Text>
              <Text style={[styles.bidPP, {color: themeColors.primaryColor}]}>
                <NapaIcon /> {ourFee}
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.totalPPMain}>
              <Text style={styles.totalPP}>Total</Text>
              <Text style={[styles.totalPP, {color: themeColors.primaryColor}]}>
                <LargeNapaIcon /> {total.toFixed(2)}
              </Text>
            </View>
          </View>
          <View style={styles.buyButton}>
            <TouchableOpacity
              onPress={() => {
                onItemPurchase(userListItem?.itemUuid);
              }}
              activeOpacity={1.0}
              style={styles.buy}>
              <Text style={styles.buyText}>Buy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default JoinerBuy;

const styles = StyleSheet.create({
  qrContainer: {
    flex: 1,
    marginTop: 10,
  },
  stmBg: {
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
    flex: 1,
    backgroundColor: themeColors.black,
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
    marginBottom: 20,
    marginTop: 10,
  },
  itemData: {
    position: 'absolute',
    right: 30,
    left: 30,
    paddingVertical: 30,
    zIndex: 999,
    bottom: 0,
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
  itemCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  summary: {
    fontSize: 24,
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    marginBottom: 10,
  },
  bidPPMain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  totalPPMain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: verticalScale(24),
    borderTopColor: themeColors.garyColor,
    borderTopWidth: 1,
    marginTop: 10,
    paddingTop: 15,
  },
  bidPP: {
    fontSize: 14,
    color: themeColors.garyColor,
  },
  totalPP: {
    fontSize: 24,
    color: themeColors.garyColor,
  },
  buyButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: Dimensions.get('window').height,
  },
  buy: {
    backgroundColor: themeColors.aquaColor,
    width: Dimensions.get('window').width,
    paddingVertical: verticalScale(20),
  },
  buyText: {
    textAlign: 'center',
    color: themeColors.secondaryColor,
    fontSize: size.default,
    fontFamily: Fontfamily.Neuropolitical,
  },
  itmName: {
    color: themeColors.primaryColor,
    textAlign: 'center',
    fontSize: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    backgroundColor: '#000000b5',
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height / 2,
    left: 0,
    zIndex: 1,
    borderRadius: 30,
  },
});
