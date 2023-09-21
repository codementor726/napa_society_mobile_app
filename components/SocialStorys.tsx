import React from 'react';
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {story} from '../const/story';
type storyProps = {
  title: string;
  imageProfile?: any;
  background?: any;
};

const Items: React.FC<storyProps> = ({title, imageProfile, background}) => {
  return (
    <View style={styles.storyContainer}>
      <ImageBackground
        imageStyle={{borderRadius: 24}}
        style={styles.background}
        source={background}
        resizeMode="cover">
        <View style={styles.storyIcon}>
          <Image style={styles.imageProfile} source={imageProfile} />
        </View>
        <Text style={styles.storyText}>{title}</Text>
      </ImageBackground>
    </View>
  );
};
const SocialStorys = () => {
  return (
    <View style={styles.container}>
      {story.map((item:any, index) => {
        return (
          <Items
            key={index}
            title={item.title}
            imageProfile={item.storyProfile}
            background={item.storyBackground}
          />
        );
      })}
    </View>
  );
};

export default SocialStorys;
const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(20),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(8),
    marginBottom: moderateScale(60),
  },
  storyContainer: {
    backgroundColor: themeColors.garyColor,
    borderRadius: moderateScale(24),
    width: '49%',
    height: verticalScale(200),
    marginTop: moderateScale(5),
    marginBottom: moderateScale(10),
  },
  background: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: themeColors.cardsColor,
    borderRadius: moderateScale(24),
  },
  imageProfile: {
    width: verticalScale(45),
    height: verticalScale(45),
  },
  storyIcon: {
    backgroundColor: themeColors.aquaColor,
    padding: moderateScale(1),
    borderRadius: 50,
    borderWidth: 1,
  },
  storyText: {
    paddingBottom: moderateScale(18),
    color: themeColors.primaryColor,
    marginTop: moderateScale(10),
    fontSize: size.default,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
  },
  storyPlus: {
    backgroundColor: themeColors.aquaColor,
    padding: moderateScale(10),
    borderRadius: 50,
  },
});
