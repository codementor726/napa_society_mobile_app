import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  Image,
  Text,
} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {Search} from '../assets/svg';
import Header from '../common/Header';
import Layout from '../common/Layout';
import Tabs from '../common/Tabs';
import MarketPlaceItem from '../components/MarketPlaceItem';
import {marketPlace} from '../const/marketplace';
import {SCREENS} from '../typings/screens-enums';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {Fontfamily} from '../theme/fontFamily';

const MarketPlace: React.FC = () => {
  const {navigate} = useNavigation<any>();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const profileAvatar = useSelector(selectProfileList);

  return (
    <Layout>
      <Header
        leftChildren={
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
            <View />
          </TouchableOpacity>
        }
        title={true}
        // rightChildren={
        //   <View>
        //     <TouchableOpacity>
        //       <Search color="grey" />
        //     </TouchableOpacity>
        //   </View>
        // }
      />
      <Tabs
        data={marketPlace}
        activeTabIndex={activeTabIndex}
        setActiveTabIndex={setActiveTabIndex}
      />
      {activeTabIndex == 0 && (
        <View style={styles.marketPlace}>
          <MarketPlaceItem />
        </View>
      )}

      {activeTabIndex !== 0 && (
        <View
          style={{
            flex: 0.8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontFamily: Fontfamily.Neuropolitical}}>
            Coming Soon
          </Text>
        </View>
      )}
    </Layout>
  );
};

export default MarketPlace;
const styles = StyleSheet.create({
  profileImage: {
    height: verticalScale(30),
    width: verticalScale(30),
    borderRadius: 50,
  },
  marketPlace: {
    paddingHorizontal:
      Platform.OS === 'ios' ? moderateScale(0) : moderateScale(6),
  },
});
