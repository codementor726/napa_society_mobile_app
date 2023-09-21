import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import SectionHeader from '../common/SectionHeader';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {themeColors} from '../theme/colors';
import {SCREENS} from '../typings/screens-enums';
import {LocationIcon} from '../assets/svg';
import {useSelector} from 'react-redux';
import {
  selectGetRecentEventsList,
  selectGetRecentEventsLoading,
} from '../store/selectors/EventsSelector';
import moment from 'moment';

const EventCards = () => {
  const {navigate} = useNavigation<any>();
  const eventsData = useSelector(selectGetRecentEventsList);
  const eventsLoading = useSelector(selectGetRecentEventsLoading);
  return (
    <View style={styles.container}>
      <SectionHeader title="Events" onPress={() => navigate(SCREENS.EVENTS)} />
      {!eventsLoading ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal
          style={styles.cardContainer}>
          {eventsData?.data?.data?.length > 0 &&
            eventsData?.data?.data?.map((item: any, index: number) => {
              return (
                <TouchableOpacity
                  key={`social-art-${index}`}
                  onPress={() =>
                    navigate(SCREENS.APPLYEVENT, {id: item?.eventId})
                  }
                  style={{marginRight: moderateScale(10)}}>
                  <ImageBackground
                    imageStyle={{borderRadius: 24}}
                    source={{uri: item?.eventImageOne || item?.eventImageTwo}}
                    resizeMode="cover">
                    <ImageBackground
                      style={styles.socialImage}
                      source={require('../assets/images/gradient.png')}>
                      <View style={styles.location}>
                        <View style={styles.iconLocation}>
                          <LocationIcon />
                        </View>
                        <Text style={styles.socialProfileText}>
                          {item?.address},{item?.city}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.socialText}>
                          {item?.eventTitle}
                        </Text>
                        <View style={styles.socialProfile}>
                          <Text style={styles.socialProfileText}>
                            {moment(item?.eventDate).format(' MMM DD, h:mm a')}
                          </Text>
                        </View>
                      </View>
                    </ImageBackground>
                  </ImageBackground>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      ) : (
        <View style={{padding: 50}}>
          <ActivityIndicator size="large" color={themeColors.primaryColor} />
        </View>
      )}
    </View>
  );
};
export default EventCards;
const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(30),
  },
  Textcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
  },
  assets: {
    color: themeColors.primaryColor,
    fontSize: size.lg,
    fontFamily: Fontfamily.Neuropolitical,
  },
  assetsView: {
    color: themeColors.aquaColor,
    fontSize: size.lg,
    fontFamily: Fontfamily.Neuropolitical,
  },
  cardContainer: {
    flexDirection: 'row',
    paddingHorizontal:
      Platform.OS === 'ios' ? moderateScale(0) : moderateScale(6),
    marginTop: moderateScale(10),
    marginBottom: 90,
  },
  socialImage: {
    width: verticalScale(280),
    height: verticalScale(220),
    justifyContent: 'space-between',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(10),
  },
  location: {
    flexDirection: 'row',
    paddingLeft: moderateScale(10),
  },
  iconLocation: {
    paddingTop: moderateScale(1),
  },
  socialProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: Platform.OS === 'ios' ? moderateScale(1) : moderateScale(1),
  },
  socialText: {
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.md,
    color: themeColors.primaryColor,
    fontWeight: '500',
    width: verticalScale(230),
    marginLeft: 10,
  },
  socialProfileText: {
    fontFamily: Fontfamily.Avenier,
    fontSize: Platform.OS === 'ios' ? size.md : size.md,
    color: themeColors.primaryColor,
    marginLeft: 10,
    paddingBottom: moderateScale(3),
  },
});
