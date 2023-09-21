import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Fontfamily} from '../theme/fontFamily';
import {themeColors} from '../theme/colors';
import {moderateScale} from 'react-native-size-matters';
import {size} from '../theme/fontstyle';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../typings/screens-enums';
type LikePostCardProps = {
  item: any;
  index: number;
};
const LikePostCard: React.FC<LikePostCardProps> = ({item, index}) => {
const {navigate} = useNavigation<any>();

  return (
    <>
     <TouchableOpacity onPress={() => navigate(SCREENS.POSTDETAILS, {post: item?.postId})} style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.serialNumberLabel}>{index + 4}</Text>
          <Image
            source={{
              uri:
                item.thumbnail ||
                'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png',
            }}
            style={styles.imageStyle}
          />
          <Text style={styles.userName}>{item?.userName}</Text>
        </View>
        <Text style={styles.likes}>{item?.likes}</Text>
      </TouchableOpacity>
    </>
  );
};

export default LikePostCard;

const styles = StyleSheet.create({
  likes: {
    fontFamily: Fontfamily.Grostestk,
    fontSize: size.lg,
    color: themeColors.aquaColor,
  },
  userName: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.md,
    color: 'white',
    fontWeight: '500',
  },
  imageStyle: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    marginHorizontal: 16,
  },
  serialNumberLabel: {
    color: 'white',
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: moderateScale(4),
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: themeColors.darkGray,
    alignItems: 'center',
    height: 72,
    marginTop: 8,
    borderRadius: 12,
    marginHorizontal: moderateScale(8),
  },
});
