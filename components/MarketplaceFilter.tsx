import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../common/Layout';
import Header from '../common/Header';
import {BackIcon} from '../assets/svg';
import MintDropDown from '../common/MintDropDown';
import {useNavigation} from '@react-navigation/native';
import {Fontfamily} from '../theme/fontFamily';
import {themeColors} from '../theme/colors';
import {size} from '../theme/fontstyle';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {CalenderIconM} from '../assets/svg/CalenderIconM';
import Checkbox from '../common/Checkbox';
import RadioButton from '../common/RadioButton';
import {useSelector} from 'react-redux';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
const collectionData = [
  {
    name: 'collection1',
    value: 'collection1',
  },
  {
    name: 'collection2',
    value: 'collection2',
  },
  {
    name: 'collection3',
    value: 'collection3',
  },
];
const views = [
  {
    name: 'From High To Low',
    value: 'From Low To High',
  },
  {
    name: 'collection2',
    value: 'collection2',
  },
];

var radioData = [
  {label: 'From High To Low', value: 0},
  {label: 'From Low To High', value: 1},
];
const MarketplaceFilter = () => {
  const {goBack} = useNavigation<any>();
  const [isTradeNFT, setIsTradeNFT] = useState<boolean>(false);
  const [isAuctions, setIsAuctions] = useState<boolean>(false);
  const [isTradeSNFT, setIsTradeSNFT] = useState<boolean>(false);
  const [isTradePhygitals, setIsTradePhygitals] = useState<boolean>(false);
  const [collection, setCollection] = useState<any>();
  const [price, setPrice] = useState<string>('From High To Low');
  const [views, setViews] = useState<string>('From High To Low');
  const [listNew, setListNew] = useState<boolean>(false);
  const [livestreams, setLivestreams] = useState<boolean>(false);
  const [highView, setHighView] = useState<boolean>(false);
  const [endingSoon, setEndingSoon] = useState<boolean>(false);
  const [bargains, setBargains] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState(false);
  const [toDate, setToDate] = useState(false);
  const [showFromDate, setShowFromDate] = useState(new Date());
  const [showToDate, setShowToDate] = useState(new Date());
  const [calenderMinimumDate, setCalenderMinimumDate] = useState<string>('');
  const accountCreatedAt = useSelector(selectProfileList)?.createdAt;

  const handleGetMinimumDate = () => {
    const year = new Date(accountCreatedAt).getFullYear();
    const month = new Date(accountCreatedAt).getMonth() + 1;
    const date = new Date(accountCreatedAt).getDate();
    setCalenderMinimumDate(`"${year}-${month}-${date}"`);
  };
  useEffect(() => {
    handleGetMinimumDate();
  }, []);

  const handleClear = () => {
    setIsTradeNFT(false);
    setIsAuctions(false);
    setIsTradeSNFT(false);
    setIsTradePhygitals(false);
    setLivestreams(false);
    setCollection('');
    setPrice('From High To Low');
    setViews('From High To Low');
    setListNew(false);
    setFromDate(false);
    setToDate(false);
  };

  return (
    <Layout>
      <View style={{justifyContent: 'space-between', flex: 1}}>
        <Header
          leftChildren={
            <TouchableOpacity onPress={() => goBack()}>
              <BackIcon color="white" />
            </TouchableOpacity>
          }
          title={false}
          centerTitle="Filter"
          rightChildren={
            <View>
              <TouchableOpacity onPress={handleClear}>
                <Text style={styles.headerText}>Clear</Text>
              </TouchableOpacity>
            </View>
          }
        />
        <ScrollView>
          <View style={[styles.mainContainer, {flex: 1}]}>
            <View>
              <Text style={styles.headingText}>Type</Text>
              <View style={styles.typesContainer}>
                <View>
                  <Pressable
                    style={styles.typesChild}
                    onPress={() => setIsTradeNFT(!isTradeNFT)}>
                    <Checkbox title="Trade NFT" isChecked={isTradeNFT} />
                  </Pressable>
                  <Pressable
                    style={styles.typessecondChild}
                    onPress={() => setIsAuctions(!isAuctions)}>
                    <Checkbox title="Auctions" isChecked={isAuctions} />
                  </Pressable>
                  <Pressable
                    style={styles.typessecondChild}
                    onPress={() => setLivestreams(!livestreams)}>
                    <Checkbox title="Livestreams" isChecked={livestreams} />
                  </Pressable>
                </View>
                <View
                  style={{
                    marginLeft:
                      Dimensions.get('window').width < 337
                        ? moderateScale(10)
                        : moderateScale(60),
                  }}>
                  <Pressable
                    style={styles.typesChild}
                    onPress={() => setIsTradeSNFT(!isTradeSNFT)}>
                    <Checkbox title="Trade SNFT" isChecked={isTradeSNFT} />
                  </Pressable>
                  <Pressable
                    style={styles.typessecondChild}
                    onPress={() => setIsTradePhygitals(!isTradePhygitals)}>
                    <Checkbox
                      title="Trade Phygitals"
                      isChecked={isTradePhygitals}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
            <View style={{marginTop: verticalScale(20)}}>
              <Text style={[styles.headingText, {marginBottom: -10}]}>
                Collection
              </Text>
              <View>
                <MintDropDown
                  title="Collection"
                  data={collectionData}
                  setSelected={setCollection}
                  value={collection}
                  // titleStyle={styles.dropdownTitleStyle}
                  // arrowStyle={styles.dropdownArrowStyle}
                />
              </View>
            </View>
            <View style={{marginTop: verticalScale(20)}}>
              <Text style={[styles.headingText]}>Price</Text>
              <View style={{marginTop: verticalScale(18)}}>
                {radioData?.map((item: any, index: number) => {
                  return (
                    <View key={index}>
                      <RadioButton
                        item={item}
                        onPress={(value: any) => setPrice(value.label)}
                        title={item.label}
                        subTitle={item.label}
                        isSelected={price == item.label ? true : false}
                        titleStyle={styles.titleStyle}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
            <View style={{marginTop: verticalScale(20)}}>
              <Text style={[styles.headingText]}>Views</Text>
              <View style={{marginTop: verticalScale(18)}}>
                {radioData?.map((item: any, index: number) => {
                  return (
                    <View key={index}>
                      <RadioButton
                        item={item}
                        onPress={(value: any) => setViews(value.label)}
                        title={item.label}
                        subTitle={item.label}
                        isSelected={views == item.label ? true : false}
                        titleStyle={styles.titleStyle}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
            <View style={{marginTop: verticalScale(20)}}>
              <Text style={[styles.headingText]}>Listings</Text>
              <View style={styles.typesContainer}>
                <View>
                  <Pressable
                    style={styles.typesChild}
                    onPress={() => setListNew(!listNew)}>
                    <Checkbox title="New" isChecked={listNew} />
                  </Pressable>
                  <Pressable
                    style={styles.typessecondChild}
                    onPress={() => setEndingSoon(!endingSoon)}>
                    <Checkbox title="Ending Soon" isChecked={endingSoon} />
                  </Pressable>
                </View>
                <View
                  style={{
                    marginLeft:
                      Dimensions.get('window').width < 337
                        ? moderateScale(10)
                        : moderateScale(60),
                  }}>
                  <Pressable
                    style={styles.typesChild}
                    onPress={() => setHighView(!highView)}>
                    <Checkbox title="Leaders" isChecked={highView} />
                  </Pressable>
                  <Pressable
                    style={styles.typessecondChild}
                    onPress={() => setBargains(!bargains)}>
                    <Checkbox title="Bargains" isChecked={bargains} />
                  </Pressable>
                </View>
              </View>
            </View>
            <View style={[styles.dateContainerMain]}>
              <View>
                <DatePicker
                  modal
                  open={fromDate}
                  date={showFromDate}
                  minimumDate={new Date("2023-5-19")}
                  maximumDate={new Date()}
                  onConfirm={Date => {
                    setFromDate(false);
                    setShowFromDate(Date);
                  }}
                  onCancel={() => {
                    setFromDate(false);
                  }}
                  mode="date"
                  title="From"
                />
                <Text style={[styles.typesText, {color: 'grey'}]}>From</Text>
                <Pressable
                  onPress={() => setFromDate(true)}
                  style={styles.dateContainer}>
                  <Text style={styles.typesText}>
                    {moment(showFromDate).format('LL')}
                  </Text>
                  <View style={{marginLeft: moderateScale(15)}}>
                    <CalenderIconM />
                  </View>
                </Pressable>
              </View>
              <View style={{marginBottom: verticalScale(25)}}>
                <DatePicker
                  modal
                  open={toDate}
                  date={showToDate}
                  // minimumDate={new Date(calenderMinimumDate || "2022-12-31")}
                  maximumDate={new Date()}
                  onConfirm={Date => {
                    setToDate(false);
                    setShowToDate(Date);
                  }}
                  onCancel={() => {
                    setToDate(false);
                  }}
                  androidVariant="nativeAndroid"
                  mode="date"
                  title="To"
                />
                <Text
                  style={[
                    styles.typesText,
                    {marginLeft: moderateScale(20), color: 'grey'},
                  ]}>
                  To
                </Text>
                <Pressable
                  onPress={() => setToDate(true)}
                  style={[
                    styles.dateContainer,
                    {marginLeft: moderateScale(20)},
                  ]}>
                  <Text style={styles.typesText}>
                    {moment(showToDate).format('LL')}
                  </Text>
                  <View style={{marginLeft: moderateScale(15)}}>
                    <CalenderIconM />
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.sellBtn}>
          <Text style={styles.completeSellBtn}>Apply Filter</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default MarketplaceFilter;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: Fontfamily.Neuropolitical,
    color: themeColors.garyColor,
    fontSize: size.default,
    fontWeight: '400',
  },
  mainContainer: {
    flex: 1,
    marginTop: verticalScale(23),
    marginHorizontal: moderateScale(23),
  },
  headingText: {
    fontFamily: Fontfamily.Neuropolitical,
    color: themeColors.primaryColor,
    fontSize: size.lg,
    fontWeight: '400',
  },
  typesText: {
    fontFamily: Fontfamily.Avenier,
    color: themeColors.primaryColor,
    fontSize: size.md,
    fontWeight: '500',
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: verticalScale(20),
  },
  typesChild: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typessecondChild: {
    flexDirection: 'row',
    marginTop: verticalScale(20),
    alignItems: 'center',
  },
  sellBtn: {
    height: 60,
    backgroundColor: themeColors.aquaColor,
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: verticalScale(60),
  },
  completeSellBtn: {
    fontFamily: Fontfamily.Neuropolitical,
    color: 'black',
    fontSize: 14,
  },
  dateContainer: {
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  dateContainerMain: {
    flexDirection: 'row',
    marginTop: verticalScale(20),
    marginLeft: Dimensions.get('window').width < 337 ? moderateScale(-15) : 0,
  },
  titleStyle: {
    fontSize: size.md,
  },
});
