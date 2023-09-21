import {
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Layout from '../common/Layout';
import Header from '../common/Header';
import {Fontfamily} from '../theme/fontFamily';
import {themeColors} from '../theme/colors';
import {size} from '../theme/fontstyle';
import {BackIcon, CopyIcon} from '../assets/svg';
import {useNavigation} from '@react-navigation/native';
import {InviteIcon} from '../assets/svg/InviteIcon';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import Clipboard from '@react-native-clipboard/clipboard';

const Reference = () => {
  const {goBack} = useNavigation();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [referenceValue, setReferenceValue] = useState<string>('MelissaRob77');
  const copyToClipboard = (copiedText: any) => {
    Clipboard.setString(copiedText);
  };
 

  return (
    <Layout>
      <Header
        leftChildren={
          <TouchableOpacity onPress={() => goBack()}>
            {isEdit ? (
              <TouchableOpacity onPress={() => setIsEdit(false)}>
                <Text style={styles.headerText}>Cancel</Text>
              </TouchableOpacity>
            ) : (
              <BackIcon color="white" />
            )}
          </TouchableOpacity>
        }
        title={false}
        centerTitle=""
        rightChildren={
          <View>
            {isEdit ? (
              <TouchableOpacity onPress={() => setIsEdit(false)}>
                <Text
                  style={[styles.headerText, {color: themeColors.aquaColor}]}>
                  Done
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setIsEdit(true)}>
                <Text style={styles.headerText}>Edit Code</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />
      <View style={styles.mainContainer}>
        <View style={styles.firstContainer}>
          <View style={styles.referIcon}>
            <InviteIcon
              color={themeColors.darkColor}
              width={60}
              height={60}
              strokeWidth="40"
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.headingText}>Refer Friend</Text>
            <Text style={styles.text}>
              Send this link to your friends and get 0.02 NAPA on your account!
            </Text>
          </View>
          <View style={styles.input}>
            <TextInput
              value={referenceValue}
              placeholderTextColor="white"
              style={styles.input}
              textAlign="center"
              editable={isEdit}
              onChangeText={text => setReferenceValue(text)}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              if (isEdit) setIsEdit(false);
              copyToClipboard(referenceValue);
            }}
            style={styles.copyBtn}>
            <CopyIcon />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.sellBtn}>
          <Text style={styles.completeSellBtn}>Share</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default Reference;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: Fontfamily.Avenier,
    color: themeColors.garyColor,
    fontSize: size.md,
    fontWeight: '400',
  },
  mainContainer: {
    justifyContent: 'space-between',
    flex: 1,
  },
  firstContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  referIcon: {
    backgroundColor: themeColors.aquaColor,
    borderRadius: 100,
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    width: '70%',
    marginVertical: verticalScale(20),
  },
  headingText: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontWeight: '400',
    fontSize: size.lg,
  },
  text: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.default,
    marginTop: 10,
    textAlign: 'center',
  },
  input: {
    color: themeColors.primaryColor,
    backgroundColor: themeColors.cardsColor,
    width: '90%',
    borderRadius: 10,
    paddingVertical: moderateScale(10),
    alignItems: 'center',
  },
  copyBtn: {
    backgroundColor: themeColors.cardsColor,
    marginTop: verticalScale(60),
    padding: 20,
    borderRadius: 30,
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
});
