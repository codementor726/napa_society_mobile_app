import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  createNewComment,
  deleteComment,
  likeComment,
} from '../services/CommentPost';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import {selectSocialList} from '../store/selectors/socialArtSelector';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {getAllComments} from '../services/PostApi';
import {SOCIAL_ART_WEBSOCKET_URL} from '../const/Url';
import {setSocialData} from '../store/slices/socialArtData';
import {Image} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import moment from 'moment';
import {CrossIcon, DoubleDotIcon} from '../assets/svg';
import {Fontfamily} from '../theme/fontFamily';
import {themeColors} from '../theme/colors';
import {Modal} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {LightCrossIcon} from '../assets/svg/LightCrossIcon';
import {size} from '../theme/fontstyle';
import {set} from 'lodash';
import ErrorToast from '../common/toasters/ErrorToast';

type CommentsProps = {
  postId?: any;
  setPostDetail?: any;
};

const Comments: React.FC<CommentsProps> = ({postId, setPostDetail}) => {
  const {goBack} = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const [commentText, setCommentText] = useState('');
  const [commentByUserCount, setCommentByUserCount] = useState(0);
  const [replyUserName, setReplyUserName] = useState('');
  const [replyBoxShow, setReplyBoxShow] = useState(false);
  const [parentCommentId, setParentCommentId] = useState('');
  const socialArt = useSelector(selectSocialList);
  const profileId = useSelector(selectProfileList)?.profileId;
  const socialArtSocketRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const [postCommentsData, setPostCommentsData] = useState<any>([]);
  const [postCommentLoading, setPostCommentLoading] = useState<any>(false);
  const [isVsible, setIsVisible] = useState(false);
  const [isVsibleReportComment, setIsVsibleReportComment] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState('');
  const [deleteCommentLoading, setDeleteCommentLoading] = useState(false);
  const getComments = async () => {
    setPostCommentLoading(true);
    const {data, error} = await getAllComments(postId);
    setPostCommentsData(data);
    setPostCommentLoading(false);
  };
  useEffect(() => {
    getComments();
  }, []);

  const handleCreateComment = async () => {
    if (commentText.length >= 500) {
      setLoading(false);
      toast.show(<ErrorToast message='Comment text can be no more than 500 characters' />, {
        placement: 'top',
      });
      return;
    }
    const comment = {
      commentText,
      postId,
      profileId,
      parentCommentId: parentCommentId ? parentCommentId : '',
    };
    setLoading(true);
    const {error, message} = await createNewComment(comment);
    if (error) {
      setLoading(false);
      toast.show(<ErrorToast message={message} />, {
        placement: 'top',
      });
      return;
    }
    setCommentText('');
    setLoading(false);
  };

  const connectToSocialArt = () => {
    if (postId) {
      if (socialArtSocketRef.current) {
        socialArtSocketRef.current.close();
        // socialArtSocketRef.current = null;
      }
      socialArtSocketRef.current = new WebSocket(SOCIAL_ART_WEBSOCKET_URL);
      socialArtSocketRef.current.addEventListener('message', ({data}: any) => {
        const response = JSON.parse(data);
        if (response?.event === 'comments') {
          if (response?.comments?.postId == postId) {
            console.log('commetsssss');
            handleNewComment(response?.comments);
            if (setPostDetail) {
              setPostDetail((prev: any) => {
                return {
                  ...prev,
                  commentByUser: prev?.commentByUser
                    ? prev?.commentByUser + ',' + profileId
                    : profileId,
                };
              });
            }
          }
        }
        if (response?.event === 'likeComment') {
          handleUpdatedCommentLikes(response?.comments);
        }
        if (response?.event === `delete-post-comment-${postId}`) {
          deletePostComment(response?.comment?.commentId);
        }
      });
    }
  };

  useEffect(() => {
    connectToSocialArt();
    return () => {
      if (socialArtSocketRef.current) {
        socialArtSocketRef.current.close();
        socialArtSocketRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  if (socialArtSocketRef.current) {
    socialArtSocketRef.current.onclose = (e: any) => {
      console.log(
        'Comment Socket is closed. Reconnect will be attempted in 1 second.',
        e.reason,
      );
      setTimeout(() => {
        if (socialArtSocketRef.current) {
          connectToSocialArt();
        }
      }, 1500);
    };
  }

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

  const handleNewComment = (comment: any) => {
    if (comment.parentCommentId) {
      setPostCommentsData((Prev: any) => {
        const updateTemp = Prev ? [...Prev] : [];
        // const updateTemp = JSON.parse(JSON.stringify(temp));
        const commentIndex = updateTemp.findIndex(
          (c: any) => c.commentId == comment.parentCommentId,
        );
        if (commentIndex > -1) {
          if (updateTemp[commentIndex]?.replies?.length) {
            updateTemp[commentIndex].replies = [
              comment,
              ...updateTemp[commentIndex].replies,
            ];
          } else {
            updateTemp[commentIndex].replies = [{...comment}];
          }
        }
        return [...updateTemp];
      });
      // const temp = postCommentsData ? [...postCommentsData] : [];
      // const updateTemp = JSON.parse(JSON.stringify(temp));
      // const commentIndex = updateTemp.findIndex(
      //   (c: any) => c.commentId == comment.parentCommentId,
      // );
      // if (commentIndex > -1) {
      //   if (updateTemp[commentIndex]?.replies?.length) {
      //     updateTemp[commentIndex].replies = [
      //       comment,
      //       ...updateTemp[commentIndex].replies,
      //     ];
      //   } else {
      //     updateTemp[commentIndex].replies = [{...comment}];
      //   }
      // }
      // dispatch(setPostComments([...updateTemp]));
      const social: any = socialArt.length ? [...socialArt] : [];
      const updateTempSocial = JSON.parse(JSON.stringify(social));
      const postIndex = updateTempSocial.findIndex(
        (p: any) => p.postId == postId,
      );
      if (postIndex > -1) {
        let existResults = updateTempSocial[postIndex].commentByUser
          ? updateTempSocial[postIndex].commentByUser.split(',')
          : [];
        existResults.push(profileId as string);
        updateTempSocial[postIndex].commentByUser = String(existResults);
        dispatch(setSocialData([...updateTempSocial]));
      }
    } else {
      setPostCommentsData((Prev: any) => {
        if (Prev?.length) {
          const data: any = [comment, ...Prev];
          // const filteredPost = data.filter(
          //   (v, i, a) => a.findIndex(v2 => v2?.commentId === v?.commentId) === i,
          // );
          // console.log(filteredPost.length, 'filteredPost');
          // dispatch(setPostComments([...data]));
          const temp: any = socialArt.length ? [...socialArt] : [];
          const updateTemp = JSON.parse(JSON.stringify(temp));
          const postIndex = updateTemp.findIndex(
            (p: any) => p.postId == postId,
          );
          if (postIndex > -1) {
            let existResults = updateTemp[postIndex].commentByUser
              ? updateTemp[postIndex].commentByUser.split(',')
              : [];
            existResults.push(profileId as string);
            updateTemp[postIndex].commentByUser = String(existResults);
            dispatch(setSocialData([...updateTemp]));
          }
          return [...data];
        } else {
          let data: any = [];
          data.push(comment);
          // dispatch(setPostComments([...data]));
          const temp: any = socialArt.length ? [...socialArt] : [];
          const updateTemp = JSON.parse(JSON.stringify(temp));
          const postIndex = updateTemp.findIndex(
            (p: any) => p.postId == postId,
          );
          if (postIndex > -1) {
            let existResults = updateTemp[postIndex].commentByUser
              ? updateTemp[postIndex].commentByUser.split(',')
              : [];
            existResults.push(profileId as string);
            updateTemp[postIndex].commentByUser = String(existResults);
            dispatch(setSocialData([...updateTemp]));
          }
          return [...data];
        }
      });
    }
  };

  const handleReplyComment = (userName: string, id: string) => {
    setReplyBoxShow(true);
    setReplyUserName(userName);
    setParentCommentId(id);
  };

  const handleUpdatedCommentLikes = (comment: any) => {
    setPostCommentsData([...comment]);
    // dispatch(setPostComments([...comment]));
  };

  const getLikeByCommentId = (likedByUsers: string) => {
    let likes = 0;
    if (likedByUsers) {
      const likesCount = likedByUsers.split(',');
      likes = likesCount.length;
    }
    return likes === 0 ? '' : likes;
  };

  const handleLikeComment = async (
    commentId: string,
    postId: string,
    likedByUsers: string,
  ) => {
    let updatedLikesJson;
    if (likedByUsers) {
      const likes = likedByUsers;
      const updatedLikes = likes.split(',');
      const temp = [...updatedLikes];
      if (updatedLikes.includes(profileId)) {
        const index = temp.findIndex(id => id == profileId);
        if (index > -1) {
          temp.splice(index, 1);
        }
      } else {
        temp.push(profileId);
      }
      updatedLikesJson = temp.toLocaleString();
    } else {
      updatedLikesJson = profileId;
    }
    const {error, message} = await likeComment(
      commentId,
      postId,
      updatedLikesJson,
    );
    if (error) {
      toast.show(<ErrorToast message={message} />, {
        placement: 'top',
      });
      return;
    }
  };

  const isYouLiked = (likedByUsers: string | null) => {
    const users = likedByUsers ? likedByUsers?.split(',') : [];
    return users.includes(profileId) ? true : false;
  };
  const handleDeleteComment = async () => {
    setDeleteCommentLoading(true);
    const {error, message} = await deleteComment(
      postId,
      selectedCommentId,
      profileId,
    );
    console.log(error, message, 'error');

    if (error) {
      toast.show(<ErrorToast message={message} />, {
        placement: 'top',
      });
      setIsVisible(false);
      setDeleteCommentLoading(false);
      return;
    }
    setDeleteCommentLoading(false);
    setIsVisible(false);
  };
  const deletePostComment = (commentId: any) => {
    setPostCommentsData((prev: any) => {
      const temp = prev.length ? [...prev] : [];
      const isCommentFound = temp.findIndex(
        (item: any) => item.commentId === commentId,
      );
      if (isCommentFound > -1) {
        temp.splice(isCommentFound, 1);
        return temp;
      }
      temp.map((item: any, index: any) => {
        const isReplyFound = item?.replies?.findIndex(
          (reply: any) => reply.commentId === commentId,
        );
        if (isReplyFound > -1) {
          temp[index].replies.splice(isReplyFound, 1);
          return;
        }
      });
      return temp;
    });
  };
  return (
    <>
      <View style={styles.mainContainer}>
        {!postCommentLoading ? (
          postCommentsData?.length > 0 ? (
            <FlatList
              data={postCommentsData}
              contentContainerStyle={{marginTop: 19}}
              renderItem={(postComment: any) => {
                return (
                  <View style={styles.commentContaniar}>
                    <View style={styles.childContaniar}>
                      <View>
                        <Image
                          style={styles.imageStyle}
                          resizeMode="cover"
                          source={{
                            uri:
                              postComment?.item?.avatar ||
                              'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png',
                          }}
                        />
                      </View>
                      <View style={styles.childCommantContainer}>
                        <View
                          style={{
                            paddingLeft: moderateScale(20),
                            width: '95%',
                          }}>
                          <View style={styles.userProfile}>
                            <View style={{flexDirection: 'row'}}>
                              <Text style={styles.userProfiletext}>
                                {postComment?.item?.profileName}
                              </Text>
                              <Text style={styles.date}>
                                {moment(postComment?.item?.createdAt).format(
                                  'MMM D, h:mm A',
                                )}
                              </Text>
                            </View>
                            <Pressable
                              onPress={() => {
                                // handleDeleteComment(
                                //   postComment?.item?.postId,
                                //   postComment?.item?.commentId,
                                //   profileId,
                                // );
                                // deletePostComment(postComment?.item?.commentId)
                                if (postComment?.item?.profileId == profileId) {
                                  setIsVisible(true);
                                  setSelectedCommentId(
                                    postComment?.item?.commentId,
                                  );
                                } else {
                                  setIsVsibleReportComment(true);
                                }
                              }}>
                              <DoubleDotIcon />
                            </Pressable>
                          </View>
                          <View>
                            <Text style={styles.userComment}>
                              {postComment?.item?.commentText}
                            </Text>
                          </View>
                          <View style={styles.actionContainer}>
                            <Pressable
                              style={{flexDirection: 'row'}}
                              onPress={() =>
                                handleLikeComment(
                                  postComment?.item?.commentId,
                                  postComment?.item?.postId,
                                  postComment?.item?.likedByUsers,
                                )
                              }>
                              <Text
                                style={
                                  isYouLiked(postComment?.item?.likedByUsers)
                                    ? styles.likeTextBlue
                                    : styles.likeText
                                }>
                                {getLikeByCommentId(
                                  postComment?.item?.likedByUsers,
                                )}
                              </Text>
                              <Text
                                style={
                                  isYouLiked(postComment?.item?.likedByUsers)
                                    ? styles.likeTextBlue
                                    : styles.likeText
                                }>
                                Like
                              </Text>
                            </Pressable>
                            <Pressable
                              onPress={() =>
                                handleReplyComment(
                                  postComment?.item?.profileName,
                                  postComment?.item?.commentId,
                                )
                              }
                              style={{
                                flexDirection: 'row',
                                paddingLeft: moderateScale(8),
                              }}>
                              <Text style={[styles.likeText]}>
                                {postComment?.item?.replies?.length > 0
                                  ? postComment?.item?.replies?.length
                                  : ''}
                              </Text>

                              <Text
                                style={[
                                  styles.likeText,
                                  {paddingLeft: moderateScale(3)},
                                ]}>
                                Reply
                              </Text>
                            </Pressable>
                          </View>
                        </View>
                      </View>
                    </View>

                    {replyBoxShow &&
                      postComment?.item?.commentId == parentCommentId &&
                      postComment?.item?.replies &&
                      postComment?.item?.replies.map(
                        (comment: any, index: number) => {
                          return (
                            <View
                              key={index}
                              style={styles.commentContaniarReply}>
                              <View style={styles.childContaniar}>
                                <View>
                                  <Image
                                    style={styles.imageStyle}
                                    resizeMode="cover"
                                    source={{
                                      uri:
                                        comment?.avatar ||
                                        'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png',
                                    }}
                                  />
                                </View>
                                <View style={styles.childCommantContainer}>
                                  <View
                                    style={{
                                      paddingLeft: moderateScale(20),
                                      width: '94%',
                                    }}>
                                    <View style={styles.userProfile}>
                                      <View style={{flexDirection: 'row'}}>
                                        <Text style={styles.userProfiletext}>
                                          {comment?.profileName}
                                        </Text>
                                        <Text style={styles.date}>
                                          {moment(comment?.createdAt).format(
                                            'MMM D, h:mm',
                                          )}
                                        </Text>
                                      </View>
                                      <Pressable
                                        onPress={() => {
                                          if (comment?.profileId == profileId) {
                                            setIsVisible(true);
                                            setSelectedCommentId(
                                              comment?.commentId,
                                            );
                                          } else {
                                            setIsVsibleReportComment(true);
                                          }
                                        }}
                                        style={{
                                          marginLeft: moderateScale(62),
                                        }}>
                                        <DoubleDotIcon />
                                      </Pressable>
                                    </View>
                                    <View>
                                      <Text style={styles.userComment}>
                                        {comment?.commentText}
                                      </Text>
                                    </View>
                                    <View style={styles.actionContainer}>
                                      <Pressable
                                        style={{flexDirection: 'row'}}
                                        onPress={() =>
                                          handleLikeComment(
                                            comment?.commentId,
                                            comment?.postId,
                                            comment?.likedByUsers,
                                          )
                                        }>
                                        <Text
                                          style={
                                            isYouLiked(comment?.likedByUsers)
                                              ? styles.likeTextBlue
                                              : styles.likeText
                                          }>
                                          {getLikeByCommentId(
                                            comment?.likedByUsers,
                                          )}
                                        </Text>
                                        <Text
                                          style={
                                            isYouLiked(comment?.likedByUsers)
                                              ? styles.likeTextBlue
                                              : styles.likeText
                                          }>
                                          Like
                                        </Text>
                                      </Pressable>
                                      <Pressable
                                        style={{
                                          flexDirection: 'row',
                                          paddingLeft: moderateScale(8),
                                        }}
                                        onPress={() =>
                                          handleReplyComment(
                                            postComment?.item?.profileName,
                                            postComment?.item?.commentId,
                                          )
                                        }>
                                        <Text style={[styles.likeText]}>
                                          {comment?.replies?.length > 0
                                            ? comment?.replies?.length
                                            : ''}
                                        </Text>

                                        <Text
                                          style={[
                                            styles.likeText,
                                            {paddingLeft: moderateScale(3)},
                                          ]}>
                                          Reply
                                        </Text>
                                      </Pressable>
                                    </View>
                                  </View>
                                </View>
                              </View>
                            </View>
                          );
                        },
                      )}
                  </View>
                );
              }}
              // keyExtractor={(postComment: any) => postComment?.item?.commentId}
            />
          ) : (
            <View
              style={{
                flex: 0.8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{color: 'white', fontFamily: Fontfamily.Neuropolitical}}>
                You are the first one here!
              </Text>
            </View>
          )
        ) : (
          <View
            style={{
              flex: 0.8,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="	#fff" />
          </View>
        )}

        <View>
          {replyBoxShow && (
            <View
              style={{
                backgroundColor: themeColors.cardsColor,
                paddingHorizontal: moderateScale(15),
                paddingVertical: moderateScale(15),
                marginBottom: verticalScale(10),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{color: themeColors.garyColor}}>
                Response to @{replyUserName}
              </Text>
              <Pressable
                onPress={() => {
                  setReplyBoxShow(false);
                  setReplyUserName('');
                  setParentCommentId('');
                }}>
                <CrossIcon
                  color={themeColors.garyColor}
                  width={22}
                  height={22}
                />
              </Pressable>
            </View>
          )}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={(e: any) => setCommentText(e)}
              placeholder="Write a comment"
              placeholderTextColor={themeColors.garyColor}
              value={commentText}
            />
            <TouchableOpacity
              onPress={() => {
                if (commentText && !loading) {
                  handleCreateComment();
                }
              }}>
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVsible}
        onRequestClose={() => {
          setIsVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={10}
            overlayColor="transparent"
            reducedTransparencyFallbackColor="white"
          />
          <View style={styles.modalMainContainer}>
            <Text style={styles.titleStyle}></Text>
            <TouchableOpacity
              style={styles.buttonView}
              onPress={() => {
                if (!deleteCommentLoading) {
                  setIsVisible(false);
                }
              }}>
              <Text
                style={[
                  styles.subtitleStyle,
                  {color: themeColors.primaryColor},
                ]}>
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonView}
              onPress={() => {
                if (!deleteCommentLoading) {
                  handleDeleteComment();
                }
              }}>
              <Text
                style={[styles.subtitleStyle, {color: themeColors.lightred}]}>
                Delete
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (!deleteCommentLoading) {
                  setIsVisible(false);
                }
              }}
              style={styles.crossStyle}>
              <LightCrossIcon />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVsibleReportComment}
        onRequestClose={() => {
          setIsVsibleReportComment(false);
        }}>
        <View style={styles.modalContainer}>
          <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={10}
            overlayColor="transparent"
            reducedTransparencyFallbackColor="white"
          />
          <View style={styles.modalMainContainer}>
            <Text style={styles.titleStyle}></Text>
            <TouchableOpacity
              style={styles.buttonView}
              onPress={() => {
                setIsVsibleReportComment(false);
              }}>
              <Text
                style={[
                  styles.subtitleStyle,
                  {color: themeColors.primaryColor},
                ]}>
                Report
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsVsibleReportComment(false)}
              style={styles.crossStyle}>
              <LightCrossIcon />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Comments;

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
