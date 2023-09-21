import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import Video from 'react-native-video';
import {useSelector} from 'react-redux';
import {BackIcon} from '../assets/svg';
import ContinueButton from '../common/ContinueButton';
import Layout from '../common/Layout';
import {selectImageList, selectImageObject} from '../store/selectors/image';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {SCREENS} from '../typings/screens-enums';
import {handleGetImage} from '../utils/helper';
import Header from '../common/Header';
const editTabs = [
  'Crop',
  'Filters',
  'Blur',
  'Color',
  'Effects',
  'Light',
  'Brightness',
];

const CreatNewPostEdit = () => {
  const {goBack, navigate} = useNavigation<any>();
  const [media, setMedia] = useState({
    image: '',
    video: '',
  });
  const selectImage = useSelector(selectImageList);
  const selectImgObject = useSelector(selectImageObject);

  useEffect(() => {
    handleGetImage(selectImage, setMedia);
  }, [handleGetImage]);

  return (
    <Layout>
      {/* <FilteredImage /> */}
      {/* // </Layout>
    // <Layout> */}
      <View style={{justifyContent: 'space-between', flex: 1}}>
        {/* <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.edit} onPress={goBack}>
            <BackIcon />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Edit</Text>
          </View>
        </View> */}
        <Header
          leftChildren={
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={goBack}>
                <BackIcon />
              </TouchableOpacity>
            </View>
          }
          title={false}
          centerTitle="Edit"
        />
        <View style={styles.container}>
          <View>
            {media.image && (
              <Image
                style={{
                  width: '100%',
                  height: verticalScale(300),
                }}
                resizeMode="cover"
                source={{uri: 'file://' + media.image}}
              />
            )}
            {media.video && (
              <Video
                source={{uri: media.video}} // the video file
                paused={false}
                repeat={true}
                style={{width: '100%', height: 400}}
                muted={false}
                resizeMode={'cover'}
                volume={1.0}
                rate={1.0}
                ignoreSilentSwitch={'ignore'}
              />
            )}
          </View>
        </View>
        <View style={styles.editTabsConatiner}>
          <ScrollView horizontal>
            {editTabs.map((items, index) => {
              return (
                <View style={styles.editTabs} key={index}>
                  <Text style={styles.editTabsTitle}>{items}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View
          style={{
            marginVertical: moderateScale(24),
            marginHorizontal: moderateScale(20),
          }}>
          <ScrollView horizontal>
            <Image
              style={{borderRadius: 15, marginRight: moderateScale(10)}}
              source={require('../assets/images/filter.png')}
            />
            <Image
              style={{borderRadius: 15, marginRight: moderateScale(10)}}
              source={require('../assets/images/filter.png')}
            />
            <Image
              style={{borderRadius: 15, marginRight: moderateScale(10)}}
              source={require('../assets/images/filter.png')}
            />
            <Image
              style={{borderRadius: 15, marginRight: moderateScale(10)}}
              source={require('../assets/images/filter.png')}
            />
            <Image
              style={{borderRadius: 15, marginRight: moderateScale(10)}}
              source={require('../assets/images/filter.png')}
            />
          </ScrollView>
        </View>
        <ContinueButton
          title="Continue"
          onPress={() => navigate(SCREENS.CREATENEWPOSTDETAIL)}
        />
      </View>
    </Layout>
  );
};

export default CreatNewPostEdit;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(8),
  },
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(24),
  },
  edit: {
    position: 'absolute',
    top: 2.5,
    left: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  headerTitle: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.md,
  },
  headerButtonText: {
    color: themeColors.aquaColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontWeight: '400',
    fontSize: size.default,
  },
  editTabsConatiner: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10),
  },
  editTabs: {
    marginRight: moderateScale(25),
    borderColor: themeColors.cardsColor,
    borderWidth: 1.5,
    borderRadius: 24,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  editTabsTitle: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.default,
  },
});
