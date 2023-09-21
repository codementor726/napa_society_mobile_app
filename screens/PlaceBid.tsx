/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../common/Header';
import Layout from '../common/Layout';
import {BackIcon, NapaGrayIcon} from '../assets/svg';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {themeColors} from '../theme/colors';
import {verticalScale} from 'react-native-size-matters';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {NapaIcon} from '../assets/svg/NapaIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getLiveStreamUserList} from '../services/GetImportedToken';

const PlaceBid = () => {
  const {goBack} = useNavigation();
  const navigation = useNavigation<any>();
  const [userListItem, setUserListItem] = useState<any>({});
  var serivceFee: string = '0.10';
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      (async () => {
        let streamData: any = await AsyncStorage.getItem('data');
        streamData = JSON.parse(streamData);
        const {streamId = ''} = streamData;
        if (streamId) {
          const {data} = (await getLiveStreamUserList(streamId, {
            enabled: !!streamId,
          })) as any;
          if (data && data?.data) {
            setUserListItem(data?.data[0]);
          }
        }
      })();
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <Layout>
      <View style={styles.qrContainer}>
        <Header
          leftChildren={
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={goBack}>
                <BackIcon />
              </TouchableOpacity>
            </View>
          }
          title={false}
          centerTitle="Place a Bid"
        />
        <View style={styles.bidBoxMain}>
          <TouchableOpacity activeOpacity={0.8} style={styles.bidBox}>
            <View style={styles.accAdd}>
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
                    <NapaGrayIcon />
                  </View>
                  <Text style={styles.accAddDes}>
                    {`${parseFloat(userListItem.price) + serivceFee}`}
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.ppflex, {marginTop: 10}]}>
              <Text style={styles.flpp}>Floor Price</Text>
              <View style={styles.fixedPrice}>
                <NapaIcon />
                <Text
                  style={[
                    styles.accAddDes,
                    {marginLeft: 10, color: themeColors.primaryColor},
                  ]}>
                  27.02
                </Text>
              </View>
            </View>
            <View style={styles.ppflex}>
              <Text style={styles.flpp}>Best Bid Price</Text>
              <View style={styles.fixedPrice}>
                <NapaIcon />
                <Text
                  style={[
                    styles.accAddDes,
                    {marginLeft: 10, color: themeColors.primaryColor},
                  ]}>
                  29.46
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.inputPPMain}>
          <Text style={styles.bidPP}>Your Bid Price</Text>
          <View style={styles.inputMain}>
            <TextInput style={styles.input} keyboardType="numeric" />
            <Text style={[styles.napaText, {paddingLeft: 10}]}>NAPA</Text>
          </View>
        </View>
        <View style={styles.buyButton}>
          <TouchableOpacity activeOpacity={1.0} style={styles.buy}>
            <Text style={styles.buyText}>Place</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default PlaceBid;

const styles = StyleSheet.create({
  qrContainer: {
    flex: 1,
    marginTop: 10,
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
  accAdd: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bidBox: {
    backgroundColor: '#ffffff26',
    padding: 10,
    width: '100%',
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
  flpp: {
    color: themeColors.garyColor,
    fontSize: 14,
    fontFamily: Fontfamily.Avenier,
  },
  ppflex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  bidBoxMain: {
    padding: 20,
  },
  inputMain: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '60%',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  input: {
    fontSize: 40,
    color: themeColors.primaryColor,
    width: '50%',
    borderRightColor: themeColors.garyColor,
    borderRightWidth: 1,
    paddingRight: 10,
    fontWeight: '900',
  },
  napaText: {
    fontSize: 16,
    fontFamily: Fontfamily.Neuropolitical,
    marginLeft: 10,
    color: themeColors.garyColor,
  },
  inputPPMain: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  bidPP: {
    fontSize: 14,
    fontFamily: Fontfamily.Avenier,
    color: themeColors.garyColor,
    textAlign: 'center',
  },
});
