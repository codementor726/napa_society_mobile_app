import {
  FlatList,
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Layout from '../common/Layout';
import {BackIcon, LocationIcon, Search} from '../assets/svg';
import Header from '../common/Header';
import {useNavigation} from '@react-navigation/native';
import {CalenderIconM} from '../assets/svg/CalenderIconM';
import CategaryIcon from '../assets/svg/CategaryIcon';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {Languages} from '../const/Language';
import {SCREENS} from '../typings/screens-enums';
import DatePicker from 'react-native-date-picker';
import {selectGetRecentEventsList} from '../store/selectors/EventsSelector';
import {useSelector} from 'react-redux';
import moment from 'moment';

const Events = () => {
  const {goBack, navigate} = useNavigation<any>();
  const [selectDate, setSelectDate] = useState(false);
  const [getDate, setGetDate] = useState(new Date());
  const eventsData = useSelector(selectGetRecentEventsList);

  return (
    <Layout>
      <Header
        leftChildren={
          <TouchableOpacity onPress={() => goBack()}>
            <BackIcon color="white" />
          </TouchableOpacity>
        }
        title={false}
        centerTitle="Events"
        rightChildren={<Search />}
      />
      <View style={[styles.mainContainer]}>
        <View style={[styles.filterContainer]}>
          <Pressable
            style={[
              styles.filterChildContainer,
              {marginRight: moderateScale(70)},
            ]}>
            <CategaryIcon />
            <Text style={[styles.filterText]}>Categary</Text>
          </Pressable>
          <DatePicker
            modal
            open={selectDate}
            date={getDate}
            onConfirm={Date => {
              setSelectDate(false);
              setGetDate(Date);
            }}
            onCancel={() => {
              setSelectDate(false);
            }}
            mode="date"
            title="From"
          />
          <Pressable
            style={[styles.filterChildContainer]}
            onPress={() => setSelectDate(!selectDate)}>
            <CalenderIconM color={'white'} />
            <Text style={[styles.filterText]}>Date</Text>
          </Pressable>
        </View>
        <View style={{marginTop: verticalScale(20)}}>
          <FlatList
            data={eventsData?.data?.data}
            renderItem={({item, index}: any) => {
              return (
                <TouchableOpacity
                  style={{
                    width: '100%',
                    marginBottom: moderateScale(20),
                  }}
                  key={`social-art-${index}`}
                  onPress={() =>
                    navigate(SCREENS.APPLYEVENT, {id: item?.eventId})
                  }>
                  <ImageBackground
                    imageStyle={{borderRadius: 24}}
                    style={styles.socialImage}
                    source={{uri: item?.eventImageOne || item?.eventImageTwo}}
                    resizeMode="cover">
                    <View
                      style={{
                        justifyContent: 'space-between',
                        height: verticalScale(200),
                        padding: 10,
                      }}>
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
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </Layout>
  );
};

export default Events;

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: moderateScale(24),
    marginTop: verticalScale(15),
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: moderateScale(20),
  },
  filterChildContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
  },
  filterText: {
    marginLeft: moderateScale(10),
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.md,
  },
  socialImage: {
    width: '100%',
    height: verticalScale(220),
    justifyContent: 'space-between',
    paddingVertical: moderateScale(10),
    marginRight: moderateScale(8),
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
