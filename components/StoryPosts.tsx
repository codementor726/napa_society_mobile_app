import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {
  AwardIcon,
  CommentIcon,
  HeartIcon,
  MintIcon,
  ShareIcon,
} from '../assets/svg';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {SCREENS} from '../typings/screens-enums';
import {Post} from '../store/slices/socialArtData';
import Video from 'react-native-video';

const StoryPosts: React.FC<Post> = ({
  avatar,
  profileName,
  createdAt,
  videoTitle,
  videoCaption,
  videoURL,
  paused,
}) => {
  const {navigate} = useNavigation<any>();

  return (
    <View style={styles.container}>
      {/* <ImageBackground
        style={styles.backgroundImage}
        imageStyle={{borderRadius: 24}}
        resizeMode="cover"
        source={require('../assets/images/postBackground.png')}> */}
      <View style={styles.backgroundImage}>
        <Video
          source={{uri: videoURL}}
          // paused={paused}
          repeat={true}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
          muted={false}
          resizeMode={'cover'}
          volume={1.0}
          rate={1.0}
          playWhenInactive={true}
          playInBackground={false}
        />
        <View style={styles.post}>
          <View style={styles.postTop}>
            <View style={styles.postTopView}>
              <View>
                <Image
                  style={styles.postTopImage}
                  source={{
                    uri:
                      avatar ||
                      'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png',
                  }}
                />
              </View>
              <View>
                <Text style={styles.heading}>{profileName}</Text>
                <Text style={styles.heading1}>{createdAt}</Text>
              </View>
            </View>
            <View style={styles.postTimeDiv}>
              <Text style={styles.time}>Live 04:25:31</Text>
            </View>
          </View>
          <View style={styles.postBottom}>
            <View style={styles.minted}>
              <Text style={styles.mintedText}>Minted</Text>
            </View>
            <Text style={styles.postBottomSerpentive}>{videoTitle}</Text>
            <Text style={styles.postBottomText}>{videoCaption}</Text>
          </View>
        </View>
      </View>
      {/* </ImageBackground> */}
      <View style={styles.postIcons}>
        <TouchableOpacity style={styles.postIconsItems}>
          <HeartIcon />
          <Text style={styles.postIconsText}>46</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postIconsItems}>
          <CommentIcon />
          <Text style={styles.postIconsText}>16</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postIconsItems}>
          <AwardIcon />
          <Text style={styles.postIconsText}>12</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate(SCREENS.MINTINGPOST)}
          style={styles.postIconsItems}>
          <MintIcon />
          <Text style={styles.postIconsText}>Mint</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postIconsItems}>
          <ShareIcon />
          <Text style={styles.postIconsText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StoryPosts;
const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(20),
    paddingHorizontal: moderateScale(8),
  },
  backgroundImage: {
    height: moderateScale(250),
    borderRadius: 24,
    padding: moderateScale(15),
  },
  post: {
    alignContent: 'space-between',
    justifyContent: 'space-between',
    height: '100%',
  },
  postTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postTopView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postTopImage: {
    borderRadius: 24,
    marginRight: 15,
    height: verticalScale(30),
    width: verticalScale(30),
  },
  heading: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.default,
  },
  heading1: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.s,
  },
  postTimeDiv: {
    backgroundColor: 'rgba(10, 19, 19, 0.2)',
    padding: moderateScale(5),
    borderRadius: 20,
  },
  time: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.s,
    fontWeight: '500',
  },
  postBottom: {
    alignContent: 'flex-end',
  },
  minted: {
    backgroundColor: themeColors.aquaColor,
    width: verticalScale(60),
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(5),
    borderRadius: 24,
    marginBottom: moderateScale(10),
  },
  mintedText: {
    color: themeColors.secondaryColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.s,
  },
  postBottomSerpentive: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.lg,
    fontWeight: '400',
    marginBottom: moderateScale(10),
  },
  postBottomText: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.s,
    fontWeight: '500',
    lineHeight: 16.8,
  },
  postIcons: {
    marginTop: moderateScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  postIconsItems: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postIconsText: {
    color: themeColors.primaryColor,
    marginLeft: moderateScale(5),
    fontFamily: Fontfamily.Avenier,
    fontWeight: '400',
    fontSize: size.default,
  },
});
