import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../common/Layout';
import Header from '../common/Header';
import {size} from '../theme/fontstyle';
import {Fontfamily} from '../theme/fontFamily';
import {themeColors} from '../theme/colors';
import {BackIcon} from '../assets/svg';
import {useNavigation} from '@react-navigation/native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import {selectSocialList} from '../store/selectors/socialArtSelector';
import Comments from './Comments';
const Postcomments = ({route}: any) => {
  const {goBack} = useNavigation();
  const {postId} = route?.params;
  const [commentByUserCount, setCommentByUserCount] = useState(0);
  const socialArt = useSelector(selectSocialList);

  useEffect(() => {
    if (socialArt && postId) {
      const temp: any = socialArt.length ? [...socialArt] : [];
      const updateTemp = JSON.parse(JSON.stringify(temp));
      const postIndex = updateTemp.findIndex((p: any) => p.postId == postId);
      if (postIndex > -1) {
        const commentCount = updateTemp[postIndex]?.commentByUser
          ? updateTemp[postIndex].commentByUser.split(',')
          : [];
        setCommentByUserCount(commentCount.length);
      }
    }
  }, [socialArt, postId]);

  return (
    <Layout>
      <Header
        leftChildren={
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={goBack}>
              <BackIcon color={'#677778'} />
            </TouchableOpacity>
          </View>
        }
        childStyle={styles.childStyle}
        centerStyle={styles.centerStyle}
        rightStyle={styles.childStyle}
        title={false}
        centerTitle={
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: themeColors.primaryColor,
              }}>
              Comments
            </Text>
            <Text
              style={{
                color: themeColors.garyColor,
                paddingLeft: moderateScale(10),
              }}>
              {commentByUserCount}
            </Text>
          </View>
        }
      />
      <Comments postId={postId} />
    </Layout>
  );
};

export default Postcomments;

const styles = StyleSheet.create({
  childStyle: {
    width: '20%',
  },
  centerStyle: {
    width: '55%',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },

  commentContaniar: {
    marginTop: verticalScale(10),
    // borderBottomWidth: 1,
    // borderBottomColor: themeColors.garyColor,
  },
  childCommantContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  childContaniar: {
    flexDirection: 'row',
    paddingRight: moderateScale(20),
    paddingLeft:
      Dimensions.get('window').width <= 337
        ? moderateScale(10)
        : moderateScale(20),
  },
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userProfiletext: {
    color: themeColors.primaryColor,
    fontSize: size.md,
    fontWeight: '500',
    fontFamily: Fontfamily.Avenier,
    lineHeight: 20,
  },
  likeText: {
    color: themeColors.garyColor,
    fontSize: size.default,
    fontWeight: '500',
    fontFamily: Fontfamily.Avenier,
    lineHeight: 20,
    paddingRight: moderateScale(3),
  },
  likeTextBlue: {
    color: themeColors.aquaColor,
    fontSize: size.default,
    fontWeight: '500',
    fontFamily: Fontfamily.Avenier,
    lineHeight: 20,
    marginRight: moderateScale(5),
  },
  userComment: {
    color: themeColors.primaryColor,
    fontSize: size.md,
    paddingRight: moderateScale(40),
    fontWeight: '500',
    fontFamily: Fontfamily.Avenier,
    lineHeight: 20,
    marginBottom: verticalScale(15),
    paddingTop: moderateScale(5),
  },
  date: {
    fontSize: size.default,
    fontWeight: '500',
    fontFamily: Fontfamily.Avenier,
    lineHeight: 20,
    color: themeColors.garyColor,
    paddingLeft: moderateScale(5),
  },
  imageStyle: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
  },
  actionContainer: {
    flexDirection: 'row',
    marginBottom: verticalScale(20),
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: moderateScale(15),
  },
  input: {
    color: themeColors.primaryColor,
    width: Dimensions.get('window').width <= 337 ? '80%' : '85%',
    paddingLeft:
      Dimensions.get('window').width <= 337
        ? moderateScale(10)
        : moderateScale(20),
  },
  sendText: {
    fontSize: size.md,
    fontWeight: '400',
    fontFamily: Fontfamily.Neuropolitical,
    color: themeColors.aquaColor,
    marginRight: moderateScale(20),
    alignSelf: 'center',
  },
  commentContaniarReply: {
    marginLeft: moderateScale(40),
  },
  modalContainer: {
    flex: 1,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalMainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  titleStyle: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.xlg,
    color: themeColors.primaryColor,
    textAlign: 'center',
  },
  subtitleStyle: {
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.lg,
    textAlign: 'center',
  },
  crossStyle: {
    marginVertical: moderateScale(25),
  },
  buttonView: {
    height: moderateScale(35),
    width: moderateScale(100),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
