import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../typings/screens-enums';
import {Text} from 'react-native';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';

const ProfilePost = ({item}: any) => {
  const {navigate} = useNavigation<any>();
  return (
    <TouchableOpacity
      onPress={() => navigate(SCREENS.POSTDETAILS, {post: item})}
      style={styles.postItem}>
      <Image
        style={{width: '100%', height: 120, borderRadius: 20}}
        source={
          item?.videoThumbnail
            ? {uri: item?.videoThumbnail}
            : require('../assets/images/filter.png')
        }
      />
      <Text style={styles.titleText}>{item?.videoTitle}</Text>
    </TouchableOpacity>
  );
};

export default ProfilePost;

const styles = StyleSheet.create({
  postItem: {
    width: verticalScale(90),
    height: verticalScale(90),
    marginHorizontal: moderateScale(8),
    marginVertical: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 30,
  },
  titleText: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.default,
    fontWeight: '400',
    position: 'absolute',
    bottom: 10,
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
});
