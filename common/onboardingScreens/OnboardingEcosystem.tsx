import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Layout from '../Layout';
import {Fontfamily} from '../../theme/fontFamily';
import {themeColors} from '../../theme/colors';
import {size} from '../../theme/fontstyle';
import {fontSize} from '../../responsive';
import {SCREENS} from '../../typings/screens-enums';
import {HiIcon} from '../../assets/svg/HiIcon';
import {moderateScale, verticalScale} from 'react-native-size-matters';

const OnboardingEcosystem = () => {
  const {goBack, navigate} = useNavigation<any>();
  return (
    <Layout>
      <View style={styles.mainContainer}>
        <View style={styles.firstContainer}>
          <View>
            <HiIcon />
          </View>
          <View style={{marginTop: verticalScale(70)}}>
            <Text style={[styles.headingText]}>
              Let's Get Started!
            </Text>
            <Pressable onPress={()=>navigate(SCREENS.CREATEMARKETPOST)}>
              <Text style={[styles.descriptionText]}>Create and Mint Your First Post</Text>
            </Pressable>
          </View>
        </View>
        <View style={{alignItems: 'center', marginBottom: verticalScale(30)}}>
          <View style={[styles.dotContainer]}>
            <Text style={[styles.Dot]}> </Text>
            <Text style={[styles.Dot]}> </Text>
            <Text style={[styles.Dot]}> </Text>
            <Text style={[styles.Dot]}> </Text>
            <Text style={[styles.ActiveDot]}> </Text>
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default OnboardingEcosystem;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'space-between',
    flex: 1,
    marginTop: verticalScale(-70),
  },
  firstContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: moderateScale(24),
  },
  headerText: {
    fontFamily: Fontfamily.Neuropolitical,
    color: themeColors.aquaColor,
    fontSize: size.md,
    fontWeight: '400',
  },
  headingText: {
    fontFamily: Fontfamily.Neuropolitical,
    color: themeColors.primaryColor,
    fontSize: fontSize(32),
    fontWeight: '400',
  },
  descriptionText: {
    paddingTop: verticalScale(10),
    fontFamily: Fontfamily.Avenier,
    color: themeColors.aquaColor,
    fontSize: size.md,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dotContainer: {
    justifyContent: 'space-evenly',
    width: '20%',
    flexDirection: 'row',
  },
  ActiveDot: {
    backgroundColor: themeColors.primaryColor,
    width: 18,
    height: 4,
    borderRadius: 20,
  },
  Dot: {
    backgroundColor: themeColors.garyColor,
    width: 5,
    height: 5,
    borderRadius: 20,
  },
});
