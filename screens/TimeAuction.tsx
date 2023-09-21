import {
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
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {size} from '../theme/fontstyle';
import MintDropDown from '../common/MintDropDown';
import {currencyData, listingDuration, maximumOffer} from '../const/sellTypes';
import {Fontfamily} from '../theme/fontFamily';
import ToggleSwitch from 'toggle-switch-react-native';

const TimeAuction = () => {
  const [currencyType, setCurrencyType] = useState<any>();
  const [listing, setListingDuration] = useState<any>();
  const [createFees, setCreaterFees] = useState<boolean>(false);
  const [specificBuyer, setSpecificBuyer] = useState<boolean>(false);
  const [eligible, setEligible] = useState<boolean>(false);
  const [maximum, setMaximum] = useState<any>();
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="always">
        <View style={styles.rowContainer}>
          <View style={styles.dropdownContainer}>
            <MintDropDown
              title="Currency Type"
              data={currencyData}
              setSelected={setCurrencyType}
              value={currencyType}
              titleStyle={styles.dropdownTitleStyle}
              arrowStyle={styles.dropdownArrowStyle}
            />
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.fieldText}>Amount</Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.topInput}
                placeholder="0.000001"
                onChangeText={(name: any) => null}
                placeholderTextColor={themeColors.primaryColor}
              />
            </View>
          </View>
        </View>
        <View style={[styles.amountContainerBuy, {marginHorizontal: 20}]}>
          <Text style={styles.fieldText}>Buy Now</Text>
          <TextInput
            style={styles.topInputBuyNow}
            onChangeText={(name: any) => null}
          />
        </View>
        <View style={styles.listingDurationContainer}>
          <MintDropDown
            title="Maximum Offers"
            data={maximumOffer}
            setSelected={setMaximum}
            value={maximum}
          />
        </View>
        <View style={[styles.listingDurationContainer, {marginTop: 25}]}>
          <MintDropDown
            title="Listing Duration"
            data={listingDuration}
            setSelected={setListingDuration}
            value={listing}
          />
        </View>
        <Text style={styles.otherOptions}>Other Options</Text>
        <View style={[styles.switchContainer, {marginTop: 24}]}>
          <Text style={styles.createrFeesLabel}>Creator Fees</Text>
          <ToggleSwitch
            isOn={createFees}
            onColor={themeColors.aquaColor}
            offColor={themeColors.garyColor}
            onToggle={isOn => setCreaterFees(isOn)}
          />
        </View>

        <View style={[styles.switchContainer, {marginTop: 27}]}>
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
        <Text style={styles.feesLabel}>Fees</Text>
        <View style={styles.transactionContainer}>
          <Text style={styles.transactionFeeLabel}>Transaction Fee</Text>
          <Text style={styles.percentageLabel}>2.5%</Text>
        </View>
        <View style={styles.transactionContainer}>
          <Text style={styles.transactionFeeLabel}>Creator</Text>
          <Text style={styles.percentageLabel}>0%</Text>
        </View>
        <Text style={styles.viewpreviewLabel}>View Preview</Text>
      </ScrollView>
      <TouchableOpacity style={styles.sellBtn}>
        <Text style={styles.completeSellBtn}>Complete Listing</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default TimeAuction;

const styles = StyleSheet.create({
  dropdownArrowStyle: {
    marginTop: verticalScale(6),
  },
  dropdownTitleStyle: {
    marginLeft: 10,
  },
  contentContainer: {
    flexGrow: 1,
    // paddingBottom: 60,
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
    height: 60,
    backgroundColor: themeColors.aquaColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewpreviewLabel: {
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: 14,
    color: themeColors.aquaColor,
    marginTop: 44,
    marginBottom: 26,
    textAlign: 'center',
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
    // flex: 1,
    marginTop: 33,
    width: '50%',
  },
  amountContainerBuy: {
    marginTop: 33,
    width: '100%',
  },
  dropdownContainer: {
    // flex: 0.5,
    justifyContent: 'center',
    marginLeft: 24,
    width: '40%',
  },
  rowContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  topInput: {
    paddingBottom: moderateScale(0),
    color: themeColors.primaryColor,
    marginHorizontal: moderateScale(10),
    marginTop: moderateScale(10),
    bottom: 11,
  },
  fieldText: {
    paddingLeft: moderateScale(17),
    color: themeColors.garyColor,
    fontWeight: '400',
    fontSize: size.default,
    paddingBottom: Platform.OS == 'ios' ? 15 : 0,
  },
  inputView: {
    borderBottomWidth: 1,
    borderColor: themeColors.garyColor,
    marginLeft: 16,
    marginRight: 24,
  },
  topInputBuyNow: {
    color: themeColors.primaryColor,
    marginTop: moderateScale(10),
    bottom: 11,
    borderBottomColor: themeColors.garyColor,
    borderWidth: 1,
    marginRight: moderateScale(50),
    marginLeft: moderateScale(10),
  },
});
