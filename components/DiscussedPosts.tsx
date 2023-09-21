import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Fontfamily} from '../theme/fontFamily';
import {themeColors} from '../theme/colors';
import {selectgetMostViewedPostsDataList} from '../store/selectors/getMostViewedPosts';
import DiscussedPostscard from './DiscussedPostsscard';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {CrowncarveIcon} from '../assets/svg/CrowncarveIcon';
import {size} from '../theme/fontstyle';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../typings/screens-enums';

interface viewedPostsValue {
  thumbnail?: string;
  userName?: string;
  comments?: number;
  postId?: string;
}
type DiscussedPostsProps = {
  setLeaderRefrash: any;
};
const DiscussedPosts: React.FC<DiscussedPostsProps> = ({setLeaderRefrash}) => {
  const getMostViewedPosts = useSelector(selectgetMostViewedPostsDataList).data;
  const [top3discussedPost, setTop3discussedPost] = useState<
    viewedPostsValue[]
  >([]);
  const [topdiscussedPost, setTopdiscussedPost] = useState<viewedPostsValue[]>(
    [],
  );
  const {navigate} = useNavigation<any>();
  useEffect(() => {
    if (getMostViewedPosts?.discussedPosts?.length <= 2) {
      let discussedPostsLengthLessthantwo =
        getMostViewedPosts?.discussedPosts?.slice(
          0,
          getMostViewedPosts?.discussedPosts?.length,
        );
      setTop3discussedPost(discussedPostsLengthLessthantwo);
    }
    if (getMostViewedPosts?.discussedPosts?.length >= 2) {
      let discussedPostsLengthequaltwo =
        getMostViewedPosts?.discussedPosts?.slice(0, 3);
      setTop3discussedPost(discussedPostsLengthequaltwo);
    }
    if (getMostViewedPosts?.discussedPosts?.length > 2) {
      let discussedPostsLengthGreaterthantwo =
        getMostViewedPosts?.discussedPosts?.slice(
          3,
          getMostViewedPosts?.discussedPosts?.length,
        );
      setTopdiscussedPost(discussedPostsLengthGreaterthantwo);
    }
  }, []);

  // const _scrollInterpolator = (index: any, carouselProps: any) => {
  //   const range = [3, 2, 1, 0, -1];
  //   const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
  //   const outputRange = range;

  //   return {inputRange, outputRange};
  // };

  // const _animatedStyles = (
  //   index: any,
  //   animatedValue: any,
  //   carouselProps: any,
  // ) => {
  //   const sizeRef = carouselProps.vertical
  //     ? carouselProps.itemHeight
  //     : carouselProps.itemWidth;
  //   const translateProp = carouselProps.vertical ? 'translateY' : 'translateX';

  //   return {
  //     zIndex: animatedValue.interpolate({
  //       inputRange: [-1, 0, 1],
  //       outputRange: [1, 5, 1],
  //       extrapolate: 'clamp',
  //     }),
  //     opacity: animatedValue.interpolate({
  //       inputRange: [-1, 0, 1],
  //       outputRange: [0.8, 1, 0.8],
  //       extrapolate: 'clamp',
  //     }),
  //     transform: [
  //       {
  //         scale: animatedValue.interpolate({
  //           inputRange: [-1, 0, 1],
  //           outputRange: [0.75, 1, 0.75],
  //           extrapolate: 'clamp',
  //         }),
  //       },
  //       {
  //         translateX: animatedValue.interpolate({
  //           inputRange: [-1, 0, 1],
  //           outputRange: [20, 1, -20],
  //           extrapolate: 'clamp',
  //         }),
  //       },
  //       {
  //         translateY: animatedValue.interpolate({
  //           inputRange: [-1, 0, 1],
  //           outputRange: [0, 1, 0],
  //           extrapolate: 'clamp',
  //         }),
  //       },
  //     ],
  //   };
  // };
  const truncatedText =(title:any)=>{
    if (title?.length > 20) {
      let truncatedText = title?.substring(0, 19);
     return  truncatedText += '...';
    }
    else{
      return title
    }
  }
  
  return (
    <>
     {getMostViewedPosts?.discussedPosts?.length ? (
      <View style={styles.container}>
        {/* <View style={{margin: 20}}>
          <Carousel
            data={getMostViewedPosts?.discussedPosts}
            sliderWidth={Dimensions.get('screen').width}
            itemWidth={verticalScale(95)}
            inactiveSlideScale={0.7}
            enableMomentum={true}
            useScrollView={true}
            scrollInterpolator={_scrollInterpolator}
            slideInterpolatedStyle={_animatedStyles}
            ref={(c: any) => {
              isCarousel = c;
            }}
            autoplay={true}
            autoplayInterval={3000}
            renderItem={({item, index}: any) => (
              <View style={styles.topLikesContent}>
                <Text style={{color: 'white'}}></Text>
                <View style={styles.secondLikeContent}>
                  <Text style={styles.secondLike}>
                    {index === 0 ? <CrownIcon /> : index + 1}
                  </Text>
                  <Image
                    style={styles.secondLikeUserImage}
                    source={{
                      uri:
                        item.thumbnail ||
                        'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png',
                    }}
                  />
                  <Text style={styles.secondLikeUserName}>
                    {item?.userName}
                  </Text>
                  <Text style={styles.totalLikes}>{item?.comments}</Text>
                  <Text style={styles.likesLabel}>Comments</Text>
                </View>
              </View>
            )}
          />
        </View> */}
        <Pressable
          style={styles.topLikesContent}
          // onPress={() => setLeaderRefrash(true)}
        >
          {top3discussedPost?.length >= 2 && (
            <TouchableOpacity
              onPress={() =>
                navigate(SCREENS.POSTDETAILS, {
                  post: top3discussedPost[1]?.postId,
                })
              }
              style={styles.secondLikeContent}>
              <Text style={styles.secondLike}>2</Text>
              <Image
                style={styles.secondLikeUserImage}
                source={{
                  uri:
                    top3discussedPost[1]?.thumbnail ||
                    'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png',
                }}
              />
              <Text style={styles.secondLikeUserName}>
                {truncatedText(top3discussedPost[1]?.userName)}
              </Text>
              <Text style={styles.totalLikes}>
                {top3discussedPost[1]?.comments}
              </Text>
              <Text style={styles.likesLabel}>Comments</Text>
            </TouchableOpacity>
          )}
          {top3discussedPost?.length >= 1 && (
            <TouchableOpacity
              onPress={() =>
                navigate(SCREENS.POSTDETAILS, {
                  post: top3discussedPost[0]?.postId,
                })
              }
              style={styles.firstLikeContent}>
              <CrowncarveIcon style={styles.iconStyle} />
              <Image
                style={styles.firstLikeUserImage}
                source={{
                  uri:
                    top3discussedPost[0]?.thumbnail ||
                    'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png',
                }}
              />
              <Text style={styles.firstLikeUserName}>
                {truncatedText(top3discussedPost[0]?.userName)}
              </Text>
              <Text style={styles.totalLikes}>
                {top3discussedPost[0]?.comments}
              </Text>
              <Text style={styles.likesLabel}>Comments</Text>
            </TouchableOpacity>
          )}
          {top3discussedPost?.length >= 3 && (
            <TouchableOpacity
              onPress={() =>
                navigate(SCREENS.POSTDETAILS, {
                  post: top3discussedPost[0]?.postId,
                })
              }
              style={styles.thirdLikeContent}>
              <Text style={styles.thirdLike}>3</Text>
              <Image
                style={styles.thirsLikeUserImage}
                source={{
                  uri:
                    top3discussedPost[2]?.thumbnail ||
                    'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png',
                }}
              />
              <Text style={styles.thirdLikeUserName}>
                {truncatedText(top3discussedPost[2]?.userName)}
              </Text>
              <Text style={styles.totalLikes}>
                {top3discussedPost[2]?.comments}
              </Text>
              <Text style={styles.likesLabel}>Comments</Text>
            </TouchableOpacity>
          )}
        </Pressable>
        <ScrollView>
          <Pressable
            style={{
              marginBottom: 300 * 2,
            }}
            // onPress={() => {
            //   if (topdiscussedPost?.length > 0) setLeaderRefrash(false);
            // }}
          >
            <FlatList
              data={topdiscussedPost}
              contentContainerStyle={{marginTop: 19}}
              renderItem={({item, index}) => (
                <DiscussedPostscard item={item} index={index} />
              )}
            />
          </Pressable>
        </ScrollView>
      </View>
      ) : (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: moderateScale(200),
        }}>
        <Text
          style={{
            color: themeColors.garyColor,
            fontFamily: Fontfamily.Avenier,
            fontSize: size.lg,
            fontWeight: 'bold',
          }}>
          No Post Found
        </Text>
      </View>
    )}
    </>
  );
};

export default DiscussedPosts;

const styles = StyleSheet.create({
  likesLabel: {
    fontSize: size.default,
    fontFamily: Fontfamily.Avenier,
    color: themeColors.garyColor,
    marginTop: 8,
    fontWeight: '500',
  },
  totalLikes: {
    color: themeColors.aquaColor,
    fontSize: size.md,
    lineHeight: 19,
    fontFamily: Fontfamily.Grostestk,
  },
  iconStyle: {
    marginBottom: 10,
  },
  secondLikeUserName: {
    color: 'white',
    fontSize: size.md,
    fontFamily: Fontfamily.Avenier,
    marginTop: 13,
    fontWeight: '500',
    flexWrap:'wrap'
  },
  firstLikeUserName: {
    color: 'white',
    fontSize: size.md,
    fontFamily: Fontfamily.Avenier,
    marginTop: 13,
    fontWeight: '500',
  },
  thirdLikeUserName: {
    color: 'white',
    fontSize: size.md,
    fontFamily: Fontfamily.Avenier,
    marginTop: 13,
    fontWeight: '500',
    flexWrap:'wrap',
    // width:'50%'
  },
  thirdLike: {
    color: 'white',
    fontSize: size.default,
    fontFamily: Fontfamily.Avenier,
    marginBottom: 10,
    fontWeight: '500',
  },
  secondLike: {
    color: 'white',
    fontSize: size.default,
    fontFamily: Fontfamily.Avenier,
    marginBottom: 10,
    fontWeight: '500',
  },
  thirsLikeUserImage: {
    width: Dimensions.get('window').width < 337 ? 90 : 100,
    height: Dimensions.get('window').width < 337 ? 90 : 100,
    borderRadius: 120 / 2,
    backgroundColor:'#B1B1B1'
  },
  firstLikeUserImage: {
    width: Dimensions.get('window').width < 337 ? 115 : 150,
    height: Dimensions.get('window').width < 337 ? 115 : 150,
    borderRadius: 170 / 2,
    marginBottom: Dimensions.get('window').width < 337 ? 15 : 0,
    backgroundColor:'#B1B1B1'
  },
  secondLikeUserImage: {
    width: Dimensions.get('window').width < 337 ? 90 : 100,
    height: Dimensions.get('window').width < 337 ? 90 : 100,
    borderRadius: 120 / 2,
    backgroundColor:'#B1B1B1'
  },
  thirdLikeContent: {
    marginLeft: moderateScale(-10),
    width: 100,
    height: 200,   
     alignItems: 'center',
  },
  firstLikeContent: { 
    width: Dimensions.get('window').width < 337 ? 115 : 150,
    height: 254,
    alignItems: 'center',
    zIndex: 50,
  },
  secondLikeContent: {
    marginRight: moderateScale(-10),
    width:  100,
    height: 200,
    alignItems: 'center',
  },
  topLikesContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    height: 300,
  },
  container: {
    marginTop: 30,
    marginBottom: verticalScale(100),
  },
})