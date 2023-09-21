/* eslint-disable react-native/no-inline-styles */
import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {DoneIcon} from '../assets/svg/DoneIcon';
import {FacebookBlueIcon} from '../assets/svg/FacebookBlueIcon';
import {NapaGreenIcon} from '../assets/svg/NapaGreenIcon';
import {NapaIcon} from '../assets/svg/NapaIcon';
import {TwitterBlueIcon} from '../assets/svg/TwitterBlueIcon';
import Layout from '../common/Layout';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {SCREENS} from '../typings/screens-enums';

const PurchaseStreamItem = () => {
  const navigation = useNavigation<any>();
  var serviceFee: number = 0.1;
  var ourFee: number = 0.99;

  const route = useRoute();
  const {userListItem} = route?.params as any;
  const total = parseFloat(userListItem.price) + serviceFee + ourFee;

  return (
    <Layout>
      <View style={styles.qrContainer}>
        <View style={styles.successMain}>
          <DoneIcon />
          <Text style={styles.message}>
            Congratulations on your purchase of
          </Text>
          <TouchableOpacity activeOpacity={0.8} style={styles.accAdd}>
            <Image
              source={{uri: userListItem?.itemImage}}
              style={styles.sqrImage}
            />
            <View style={styles.chatText}>
              <Text style={styles.streamTitleStye} numberOfLines={2}>
                {userListItem.itemName}
              </Text>
              <View style={styles.fixedPrice}>
                <Text style={styles.accAddDes}>Fixed Price:</Text>
                <View
                  style={{
                    marginLeft: 8,
                    marginRight: 4,
                  }}>
                  <NapaIcon />
                </View>
                <Text style={styles.accAddDes}>{userListItem.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={[styles.ppMain, styles.borderPP]}>
          <Text style={styles.grayText}>Transaction Status</Text>
          <Text style={styles.tstatus}>
            Pending Shipping & Transfer on Blockchain
          </Text>
        </View>
        <View style={styles.ppMain}>
          <Text style={styles.grayText}>Total Amount of Purchase</Text>
          <View style={styles.priceee}>
            <NapaIcon />
            <Text
              style={[
                styles.tstatus,
                {fontSize: 24, marginLeft: 10, fontWeight: '600'},
              ]}>
              {total.toFixed(2)}
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.roundButton}>
            <TwitterBlueIcon />
            <Text style={styles.roundButtonText}>Share on Twitter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roundButton, {backgroundColor: '#061e3c'}]}>
            <FacebookBlueIcon />
            <Text style={[styles.roundButtonText, {color: '#1877F2'}]}>
              Share on Facebook
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roundButton, {backgroundColor: '#181b1b'}]}>
            <NapaGreenIcon />
            <Text style={[styles.roundButtonText, {color: '#16E6EF'}]}>
              Share on NAPA Society
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buyButton}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(SCREENS.JOINERLIVEVIDEO, {...route.params})
            }
            activeOpacity={1.0}
            style={styles.buy}>
            <Text style={styles.buyText}>Return to Livestream</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default PurchaseStreamItem;

const styles = StyleSheet.create({
  qrContainer: {
    flex: 1,
    marginTop: 10,
  },
  space: {
    marginHorizontal: verticalScale(20),
  },
  accAdd: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ffffff26',
    height: 64,
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '80%',
    borderRadius: 16,
  },
  accAddDes: {
    color: themeColors.garyColor,
    fontSize: 12,
    fontFamily: Fontfamily.Avenier,
  },
  sqrImage: {
    width: 32,
    height: 32,
    borderRadius: 10,
  },
  chatText: {
    marginLeft: 10,
    marginTop: 5,
  },
  streamTitleStye: {
    color: 'white',
    fontSize: 14,
    fontFamily: Fontfamily.Neuropolitical,
    marginBottom: 4,
  },
  fixedPrice: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 15,
  },
  successMain: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  grayText: {
    color: themeColors.garyColor,
    width: '50%',
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
  roundButton: {
    width: '100%',
    borderRadius: 50,
    backgroundColor: '#07273c',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginBottom: 20,
  },
  roundButtonText: {
    color: '#1D9BF0',
    fontSize: 14,
    fontFamily: Fontfamily.Neuropolitical,
    marginLeft: 10,
  },
  tstatus: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: 14,
    width: '50%',
  },
  ppMain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  borderPP: {
    borderBottomWidth: 1,
    borderBottomColor: themeColors.garyColor,
    paddingVertical: 18,
  },
  priceee: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
});
