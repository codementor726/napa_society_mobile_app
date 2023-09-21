import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {themeColors} from '../theme/colors';
import {moderateScale} from 'react-native-size-matters';
import {size} from '../theme/fontstyle';
import MintDropDown from '../common/MintDropDown';
import {listingDuration} from '../const/sellTypes';
import {Fontfamily} from '../theme/fontFamily';
import ToggleSwitch from 'toggle-switch-react-native';
import RangeSlider from '../common/RangeSlider';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {useToast} from 'react-native-toast-notifications';
import {selectNetworkType} from '../store/selectors/NapaAccount';
import PreViewModal from '../components/PreViewModal';
import CurrencyDropdown from '../common/CurrencyDropdown';
import {SCREENS} from '../typings/screens-enums';

const NftFixedPrice = ({
  loading,
  mintDetails,
  snftDetails,
  contract,
  tokenId,
}: any) => {
  const toast = useToast();
  const {navigate} = useNavigation<any>();
  const currencyIcon: any = ['NAPA', 'USDT', 'ETH'];
  const [currencyType, setCurrencyType] = useState<any>();
  const [amount, setAmount] = useState<any>();
  const [specificBuyer, setSpecificBuyer] = useState<boolean>(false);
  const [eligible, setEligible] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const profileId = useSelector(selectProfileList)?.profileId;
  const [validation, setValidation] = useState<string>('');
  const [creatorFees, setCreatorFees] = React.useState<any>('');
  const [duration, setDuration] = React.useState<any>();
  const [signer, _setSigner] = React.useState<any>('');
  const [_account, _setAccount] = React.useState<any>('');
  const [_balance, _setBalance] = React.useState<any>('');
  const dispatch = useDispatch();
  const [isPreViewModalVisible, setIsPreViewModalVisible] =
    useState<any>(false);
  const [errors, setErrors] = useState({
    currencyType: '',
    amount: '',
    duration: '',
    maxOffer: '',
    buyNow: '',
    creatorFees: '',
    offerSpread: '',
    validationError: '',
  });

  console.log(snftDetails, '=====> snftDetails');

  return (
    <>
      {!modalOpen && (
        <KeyboardAvoidingView style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="always">
            <View style={styles.rowContainer}>
              <View style={styles.dropdownContainer}>
                <CurrencyDropdown
                  title="Currency Type"
                  data={currencyIcon}
                  setSelected={setCurrencyType}
                  value={currencyType}
                  titleStyle={styles.dropdownTitleStyle}
                  arrowStyle={styles.dropdownArrowStyle}
                />
                {errors.currencyType && (
                  <Text style={styles.errorText}>{errors.currencyType}</Text>
                )}
              </View>
              <View style={styles.amountContainer}>
                <Text style={styles.fieldText}>Amount</Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.topInput}
                    placeholder="0.000001"
                    onChangeText={(name: any) => setAmount(name)}
                    placeholderTextColor={themeColors.primaryColor}
                    value={amount}
                    keyboardType="numeric"
                  />
                </View>
                {errors.amount && (
                  <Text
                    style={[styles.errorText, {marginLeft: moderateScale(15)}]}>
                    {errors.amount}
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.listingDurationContainer}>
              <MintDropDown
                title="Listing Duration"
                data={listingDuration}
                setSelected={setDuration}
                value={duration}
              />
              {errors.duration && (
                <Text style={styles.errorText}>{errors.duration}</Text>
              )}
            </View>
            <Text style={styles.otherOptions}>Other Options</Text>
            <View style={[styles.sliderContainer, {marginTop: 24}]}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.createrFeesLabel}>Creator Fees</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.createrFeesLabelfee}>{creatorFees}</Text>
                  <Text style={styles.createrFeesLabelfee}>%</Text>
                </View>
              </View>

              <RangeSlider
                from={0}
                to={20}
                setCreaterFeeValue={setCreatorFees}
              />
              <View
                style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                <Text style={{color: themeColors.garyColor}}>0%</Text>
                <Text style={{color: themeColors.garyColor}}>20%</Text>
              </View>
              {errors.creatorFees && (
                <Text style={styles.errorText}>{errors.creatorFees}</Text>
              )}
            </View>
            <View
              style={[
                styles.sliderContainer,
                {marginTop: moderateScale(25), marginBottom: moderateScale(25)},
              ]}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Text style={styles.createrFeesLabel}>
                    Reserve for Specific Buyer
                  </Text>
                  <Text style={styles.noteText}>
                    This item can be purchased as soon as it's listed
                  </Text>
                </View>
                <ToggleSwitch
                  isOn={specificBuyer}
                  onColor={themeColors.aquaColor}
                  offColor={themeColors.garyColor}
                  onToggle={isOn => setSpecificBuyer(isOn)}
                />
              </View>
            </View>

            {specificBuyer && (
              <View
                style={{
                  marginHorizontal: moderateScale(20),
                  marginBottom: moderateScale(30),
                }}>
                <Text style={{color: themeColors.garyColor, fontSize: size.s}}>
                  Enter the Wallet or Email Address of the Buyer
                </Text>
                <TextInput
                  style={{
                    borderColor: themeColors.garyColor,
                    borderBottomWidth: 1,
                    fontSize: size.md,
                    marginTop: moderateScale(0),
                    color: themeColors.primaryColor,
                  }}
                  value={validation}
                  // placeholder="0X95834698569385"
                  placeholderTextColor={themeColors.primaryColor}
                  onChangeText={(e: any) => setValidation(e)}
                />
                {errors.validationError && (
                  <Text
                    style={[styles.errorText, {marginLeft: moderateScale(15)}]}>
                    {errors.validationError}
                  </Text>
                )}
              </View>
            )}

            <View style={[styles.switchContainer, {marginTop: 10}]}>
              <Text style={styles.createrFeesLabel}>
                Eligible for Co-Batching Pool
              </Text>

              <ToggleSwitch
                isOn={eligible}
                onColor={themeColors.aquaColor}
                offColor={themeColors.garyColor}
                onToggle={isOn => setEligible(isOn)}
              />
            </View>
          </ScrollView>
          <TouchableOpacity onPress={() => setIsPreViewModalVisible(true)}>
            <Text style={styles.viewpreviewLabel}>View Preview</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigate(SCREENS.NFTDETAILPAGE, {
                snftId: snftDetails?.snftId,
                marketId: '',
              })
            }
            style={styles.sellBtn}>
            <Text style={styles.completeSellBtn}>Complete Listing</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}
      {isPreViewModalVisible && (
        <PreViewModal
          setIsPreViewModalVisible={setIsPreViewModalVisible}
          amount={amount}
          SNFTTitle={mintDetails?.SNFTTitle}
          thumbnail={mintDetails?.thumbnail}
          duration={duration}
          currencyType={currencyType}
        />
      )}
    </>
  );
};

export default NftFixedPrice;

const styles = StyleSheet.create({
  dropdownArrowStyle: {
    // marginTop: verticalScale(6),
  },
  dropdownTitleStyle: {
    marginLeft: 10,
  },
  contentContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  completeSellBtn: {
    fontFamily: Fontfamily.Neuropolitical,
    color: 'black',
    fontSize: 14,
  },
  sellBtn: {
    height: 65,
    backgroundColor: themeColors.aquaColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewpreviewLabel: {
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: 14,
    color: themeColors.aquaColor,
    // marginTop: (Dimensions.get('window').height = 839 ? 65 : 44),
    marginBottom: moderateScale(20),
    textAlign: 'center',
    // paddingTop: moderateScale(10),
  },
  percentageLabel: {
    fontFamily: Fontfamily.Avenier,
    fontSize: 18,
    color: 'white',
  },
  transactionFeeLabel: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: 16,
  },
  transactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginTop: 16,
  },
  feesLabel: {
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: 24,
    marginLeft: 24,
    color: 'white',
    marginTop: 29,
  },
  noteText: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: 12,
    width: Dimensions.get('window').width <= 350 ? 220 : '100%',
  },
  createrFeesLabel: {
    fontFamily: Fontfamily.Avenier,
    fontSize: 16,
    color: 'white',
    lineHeight: 22,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 24,
  },
  sliderContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    marginHorizontal: 24,
  },
  createrFeesLabelfee: {
    fontFamily: Fontfamily.Grostestk,
    color: themeColors.primaryColor,
    fontWeight: '400',
    fontSize: size.default,
  },
  otherOptions: {
    marginTop: 36,
    marginLeft: 24,
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: 24,
    color: 'white',
  },
  listingDurationContainer: {
    marginHorizontal: 24,
  },
  amountContainer: {
    // marginTop: 17,
    width: '50%',
    justifyContent: 'center',
  },
  amountContainerError: {
    position: 'relative',
    top: 13,
    marginTop: 32,
    width: '50%',
  },
  dropdownContainer: {
    // flex: 0.5,
    justifyContent: 'center',
    marginLeft: 24,
    width: '40%',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  topInput: {
    // height: fontSize(48),
    height: 48,
    color: themeColors.primaryColor,
  },
  fieldText: {
    marginTop: moderateScale(22),
    paddingLeft: Platform.OS == 'ios' ? moderateScale(17) : moderateScale(18),
    color: themeColors.garyColor,
    fontWeight: '400',
    fontSize: size.default,
    // paddingBottom: Platform.OS == 'ios' ? 15 : 0,
  },
  inputView: {
    borderBottomWidth: 1,
    borderColor: themeColors.garyColor,
    marginLeft: moderateScale(16),
    marginRight: moderateScale(24),
  },
  errorText: {
    color: 'red',
    marginTop: 3,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
  },
});
