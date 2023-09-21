import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Layout from '../common/Layout';
import {BackIcon, EthereumIcon, TetherIcon, TimeIcon} from '../assets/svg';
import Header from '../common/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NapaTokenIcon} from '../assets/svg/NapaTokenIcon';
import {themeColors} from '../theme/colors';
import {moderateScale} from 'react-native-size-matters';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import LiveTime from './LiveTimer';
import BuyModal from '../common/BuyModal';

const BuySNFT = () => {
  const [openModal, setOpenModal] = useState(false);
  const {goBack, navigate} = useNavigation<any>();
  const route = useRoute<any>();
  const {SNFTDetailData}: any = route?.params;
  const handleCurrenyIcon = (currencyType: string = '0') => {
    if (currencyType == '0') {
      return (
        <NapaTokenIcon
          bgColor={themeColors.aquaColor}
          iconColor={themeColors.secondaryColor}
          width={25}
          height={25}
        />
      );
    }
    if (currencyType == '1') {
      return (
        <TetherIcon
          bgColor="#FFD978"
          iconColor="white"
          width={25}
          height={25}
        />
      );
    } else {
      return (
        <EthereumIcon
          bgColor="#6481E7"
          iconColor={themeColors.primaryColor}
          width={25}
          height={25}
        />
      );
    }
  };

  return (
    <Layout>
      <Header
        leftChildren={
          <TouchableOpacity onPress={() => goBack()}>
            <BackIcon color="white" />
          </TouchableOpacity>
        }
        title={false}
        centerTitle="Buy"
      />
      <View style={{justifyContent: 'space-between', flex: 1}}>
        <View
          style={{
            marginTop: moderateScale(10),
            marginHorizontal: moderateScale(15),
          }}>
          <ImageBackground
            source={{uri: SNFTDetailData?.thumbnail}}
            style={{marginBottom: moderateScale(20)}}
            imageStyle={styles.backImage}>
            <View style={styles.container}>
              <Text style={styles.title}>{SNFTDetailData?.SNFTTitle}</Text>
              <Text style={styles.title}>
                {SNFTDetailData?.SNFTDescription}
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Text style={styles.titleheading}>Bid Price</Text>
                  <View style={styles.marketDetailContainer}>
                    {handleCurrenyIcon(SNFTDetailData?.currencyType)}
                    <Text style={styles.marketDetailPoints}>
                      {SNFTDetailData?.amount}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.titleheading}>Ending In</Text>
                  <View style={[styles.marketDetailContainer]}>
                    <TimeIcon />
                    <Text
                      style={[
                        styles.marketDetailPointsEnd,
                        {marginLeft: moderateScale(8)},
                      ]}>
                      <LiveTime
                        targetTime={new Date(SNFTDetailData.createdAt).setHours(
                          new Date(SNFTDetailData.createdAt).getHours() +
                            SNFTDetailData?.duration * 24,
                        )}
                        marketPlaceItem={true}
                        snftId={SNFTDetailData?.snftId}
                      />
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>

          <View>
            <Text style={styles.title}>Summary</Text>
            <TouchableOpacity onPress={() => setOpenModal(true)}>
              <Text style={styles.seetitle}>See more</Text>
            </TouchableOpacity>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text
                  style={[styles.titleheading, {color: themeColors.garyColor}]}>
                  Bid Price
                </Text>
                <Text
                  style={[
                    styles.titleheading,
                    ,
                    {color: themeColors.garyColor},
                  ]}>
                  Service Price
                </Text>
              </View>
              <View>
                <View style={styles.marketDetailContainer}>
                  {handleCurrenyIcon(SNFTDetailData?.currencyType)}
                  <Text style={styles.marketDetailPoints}>
                    {SNFTDetailData?.amount}
                  </Text>
                </View>
                <View
                  style={[
                    styles.marketDetailContainer,
                    {marginTop: moderateScale(15)},
                  ]}>
                  {handleCurrenyIcon(SNFTDetailData?.currencyType)}
                  <Text style={styles.marketDetailPoints}>
                    {SNFTDetailData?.creatorFees}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.border}></View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <Text style={styles.title}>Total</Text>
              <View style={[styles.marketDetailContainer]}>
                {handleCurrenyIcon(SNFTDetailData?.currencyType)}
                <Text style={styles.marketDetailPoints}>
                  {Number(SNFTDetailData?.creatorFees) +
                    Number(SNFTDetailData?.amount)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.sellBtn}>
            <Text style={styles.completeSellBtn}>Buy</Text>
          </TouchableOpacity>
        </View>
      </View>
      {openModal && (
        <BuyModal
          setModalOpen={setOpenModal}
          // HeaderTitle="Buy SNFT"
          // Title={dummydata.Title}
          // Description={dummydata?.Description}
          // NetworkFees={dummydata.NetworkFees}
          // TransactionType={dummydata.TransactionType}
          // confirmTransaction={dummydata.confirmTransaction}
          // minDetail={SNFTDetailData}
          // // isLoading={transactionInProgress}
          // TokenId={SNFTDetailData?.tokenId}
          // contractAddress={SNFTDetailData?.SNFTAddress}
          // originalCreator={SNFTDetailData?.generatorName}
          // Seller={SNFTDetailData?.owner}
          // Buyer={napaWalletAccount}
          // creatorFees={SNFTDetailData?.creatorFees}
          // SNFTTitle={SNFTDetailData?.SNFTTitle}
          // eligibileForCoBatching={
          //   SNFTDetailData?.eligibileForCoBatching == 'true' ? true : false
          // }
          // totalSpend={SNFTDetailData?.amount}
          // Congratulations={dummydata.Congratulations}
          // message={dummydata.Message}
          // currencyType={SNFTDetailData?.currencyType}
          // isOpenPayNowButton={isOpenPayNowButton}
          // checkBalance={checkBalance}
          // setIsOpenPayNowButton={setIsOpenPayNowButton}
          // confirmLoading={confirmLoading}
        />
      )}
    </Layout>
  );
};

export default BuySNFT;

const styles = StyleSheet.create({
  backImage: {
    height: 380,
    width: '100%',
    borderRadius: 30,
  },
  container: {
    height: 380,
    justifyContent: 'flex-end',
    paddingBottom: moderateScale(20),
    paddingHorizontal: moderateScale(10),
  },
  seetitle: {
    color: themeColors.aquaColor,
    fontSize: size.lg,
    fontWeight: '500',
    fontFamily: Fontfamily.Avenier,
  },
  titleheading: {
    color: themeColors.primaryColor,
    fontSize: Dimensions.get('window').width < 337 ? size.default : size.lg,
    fontWeight: '500',
    fontFamily: Fontfamily.Avenier,
    marginBottom: moderateScale(10),
    // textAlign: 'center',
  },
  title: {
    color: themeColors.primaryColor,
    fontSize: Dimensions.get('window').width < 337 ? size.default : size.lg,
    fontWeight: '500',
    fontFamily: Fontfamily.Neuropolitical,
    marginBottom: moderateScale(10),
    // textAlign: 'center',
  },
  border: {
    borderBottomColor: themeColors.garyColor,
    borderBottomWidth: 1,
    marginHorizontal: moderateScale(-15),
  },
  sellBtn: {
    height: 60,
    backgroundColor: themeColors.aquaColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeSellBtn: {
    fontFamily: Fontfamily.Neuropolitical,
    color: 'black',
    fontSize: 14,
  },
  marketDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marketDetailPoints: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Grostestk,
    fontSize: size.lg,
    marginLeft: moderateScale(10),
    fontWeight: '500',
  },
  marketDetailPointsEnd: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Grostestk,
    fontSize: size.lg,
    fontWeight: '500',
  },
  marketDetailTabs: {
    paddingHorizontal: moderateScale(24),
    flexDirection: 'row',
    paddingBottom: moderateScale(5),
  },
  marketDetailTabsText: {
    color: themeColors.primaryColor,
    marginRight: moderateScale(20),
  },
});
