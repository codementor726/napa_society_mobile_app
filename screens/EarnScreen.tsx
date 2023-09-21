import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import EarnSummary from '../components/EarnSummary';
import EarnStack from '../components/EarnStack';
import Layout from '../common/Layout';
import Header from '../common/Header';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../typings/screens-enums';
import {Search} from '../assets/svg';
import {useSelector} from 'react-redux';
import {selectProfileList} from '../store/selectors/profileDetailSelector';

const Earn: React.FC = () => {
  const {navigate} = useNavigation<any>();
  const [earn, setEarn] = useState(true);
  const [stacked, setStacked] = useState(false);
  const profileAvatar = useSelector(selectProfileList);
  return (
    <Layout>
      <Header
        title={true}
        leftChildren={
          <View style={styles.headerStyle}>
            <TouchableOpacity
              onPress={() => {
                navigate(SCREENS.PROFILE, {profileId: profileAvatar?.profileId});
              }}>
              <Image
                style={styles.profileImage}
                source={{
                  uri:
                    profileAvatar?.avatar ||
                    'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png',
                }}
              />
            </TouchableOpacity>
            <View />
          </View>
        }
        rightChildren={
          <View style={styles.iconParent}>
            <TouchableOpacity disabled >
              <Search color="grey" />
            </TouchableOpacity>
          </View>
        }
      />
      <ScrollView style={styles.marketItem}>
        <View style={styles.itemTextView}>
          <TouchableOpacity
            onPress={() => {
              setStacked(false), setEarn(true);
            }}
            style={styles.itemText}>
            <Text style={[styles.text, earn && styles.activTabs]}>Earn</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setEarn(false), setStacked(true);
            }}
            style={styles.itemText1}>
            <Text style={[styles.text, stacked && styles.activTabs]}>
              Staked
            </Text>
          </TouchableOpacity>
        </View>
        {earn && <EarnSummary />}
        {stacked && <EarnStack />}
      </ScrollView>
    </Layout>
  );
};
export default Earn;
const styles = StyleSheet.create({
  profileImage: {
    height: verticalScale(30),
    width: verticalScale(30),
    borderRadius: 50,
  },
  rightchildrenImage: {
    marginRight: 20,
  },
  marketItem: {
    paddingHorizontal:
      Platform.OS === 'ios' ? moderateScale(6) : moderateScale(6),
    marginBottom: moderateScale(50),
    // marginTop: moderateScale(10),
  },
  itemTextView: {
    backgroundColor: themeColors.cardsColor,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: moderateScale(25),
    height: Platform.OS === 'ios' ? moderateScale(30) : verticalScale(40),
    alignItems: 'center',
    marginTop: moderateScale(40),
  },
  itemText: {
    width: '50%',
    borderRightWidth: 1,
    borderColor: themeColors.garyColor,
    height: verticalScale(25),
    justifyContent: 'center',
  },
  itemText1: {
    width: '50%',
    height: verticalScale(25),
    justifyContent: 'center',
  },
  text: {
    color: themeColors.primaryColor,
    textAlign: 'center',
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
  },
  activTabs: {
    color: themeColors.aquaColor,
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: verticalScale(70),
    // backgroundColor: 'red',
    justifyContent: 'space-between',
  },
  chatIconStyle: {
    marginTop: 1,
  },
  iconParent: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: verticalScale(55),
  },
});
