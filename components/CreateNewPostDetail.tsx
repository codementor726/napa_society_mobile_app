import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  NativeModules,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Video from 'react-native-video';
import {useDispatch, useSelector} from 'react-redux';
import {BackIcon} from '../assets/svg';
import ContinueButton from '../common/ContinueButton';
import Layout from '../common/Layout';
import {createNewPost} from '../services/PostApi';
import {selectImageList} from '../store/selectors/image';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {SCREENS} from '../typings/screens-enums';
import {handleGetImage} from '../utils/helper';
import Header from '../common/Header';
import MintDropDown from '../common/MintDropDown';
import {genre} from '../const/socialArt';
import LoaderButton from '../common/LoaderButton';
import {
  selectAccountList,
  selectNapaWallet,
} from '../store/selectors/NapaAccount';
import {useToast} from 'react-native-toast-notifications';
import {setSocialMintedPost} from '../store/slices/socialArtData';
import {Video as CompressVideo} from 'react-native-compressor';
import ErrorToast from '../common/toasters/ErrorToast';
const CreatNewPostDetail = () => {
  const {goBack, navigate} = useNavigation<any>();
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [genreError, setGenreError] = useState(false);
  const [loading, setLoading] = useState(false);
  const account = useSelector(selectAccountList);
  const currentActive = useSelector(selectNapaWallet);
  const toast = useToast();
  const [selectedGenre, setSelectedGenre] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const dispatch = useDispatch();
  const toggleSwitch = () => setIsEnabled(previousState => previousState);
  const [isEnabledOne, setIsEnabledOne] = useState(false);
  const toggleSwitchOne = () => setIsEnabledOne(!isEnabledOne);
  const [isMuted, setIsMuted] = useState(false);
  const user = useSelector(selectProfileList);
  const [compressVideo, setCompressVideo] = useState<any>();
  const [compressingProgress, setCompressProgress] = useState<any>(false);
  const [compress, setCompress] = useState<any>(false);
  const [thumnail, setThumbnail] = useState<any>();
  const userProfileId = user.profileId;
  const [media, setMedia] = useState({
    image: '',
    video: '',
  });
  const selectImage = useSelector(selectImageList);

  // let phURI = selectImage;
  // let assetURI = `assets-library://asset/asset.mp4?id=${phURI.slice(
  //   5,
  //   41,
  // )}&ext=mp4`;

  let assetURI: any;
  if (selectImage.includes('file:///')) {
    assetURI = selectImage;
  } else {
    let phURI = selectImage;
    assetURI = `assets-library://asset/asset.mp4?id=${phURI.slice(
      5,
      41,
    )}&ext=mp4`;
  }
  useEffect(() => {
    handleGetImage(selectImage, setMedia);
  }, [handleGetImage]);

  const [postDetails, setPostDetails] = useState({
    title: '',
    caption: '',
  });

  const handleCompressVideo = async () => {
    setCompressProgress(true);
    const result = await CompressVideo.compress(
      Platform.OS == 'android' ? media.video : selectImage,
      {
        compressionMethod: 'auto',
      },
      // progress => {
      //   console.log(progress, 'result else');
      // },
    );
    setCompressProgress(false);
    setCompressVideo(result);
  };

  useEffect(() => {
    if (compress) {
      handleCompressVideo();
    }
  }, [media.video, selectImage, compress]);

  const handleCreatePost = async () => {
    // if (!postDetails.title) {
    //   setTitleError(!titleError);
    // } else {
    //   setTitleError(false);
    // }
    // if (!postDetails.caption) {
    //   setDescriptionError(!descriptionError);
    // } else {
    //   setDescriptionError(false);
    // }
    if (!selectedGenre) {
      setGenreError(!genreError);
    } else {
      setGenreError(false);
    }
    if (!selectedGenre) {
      return;
    }
    const selectedAccount = account?.find(
      (val: any, index: number) =>
        val[`NWA_${index + 1}_NE`] == val[`NWA_${currentActive}_NE`],
    );

    const formData = new FormData();
    formData.append('videoTitle', postDetails.title);
    formData.append('videoFile', {
      uri: compressVideo
        ? compressVideo
        : Platform.OS == 'android'
        ? media.video
        : selectImage,
      type: 'video/mp4',
      name: 'my_file_name.mp4',
    });
    formData.append('awardsByUsers', '');
    formData.append('videoType', 'video/mp4' || '');
    formData.append('videoCaption', postDetails.caption);
    formData.append('accountId', selectedAccount[`NWA_${currentActive}_AC`]);
    formData.append('profileId', userProfileId);
    formData.append('minted', 'false');
    formData.append('genre', selectedGenre);
    formData.append('postedBy', 'metamask' || '');
    formData.append('videoThumbnail', {
      uri: thumnail.path,
      type: thumnail.mime,
      name: 'my_file_name',
    });
    setLoading(true);
    const {error, message, data} = await createNewPost(formData);
    if (error) {
      toast.show(<ErrorToast message={message} />, {
        placement: 'top',
      });
      setLoading(false);
      return;
    }
    if (data) {
      setLoading(false);
      setIsMuted(!isMuted);
      console.log(data, 'data');
      navigate(SCREENS.SOCIALART);
    }
  };

  const handleNavigateMintedPage = () => {
    // if (!postDetails.title) {
    //   setTitleError(!titleError);
    // } else {
    //   setTitleError(false);
    // }
    // if (!postDetails.caption) {
    //   setDescriptionError(!descriptionError);
    // } else {
    //   setDescriptionError(false);
    // }
    if (!selectedGenre) {
      setGenreError(!genreError);
    } else {
      setGenreError(false);
    }
    if (!selectedGenre) {
      return;
    }
    dispatch(
      setSocialMintedPost({
        postId: '',
        videoType: 'video/mp4',
        accountId: '',
        profileId: '',
        videoTitle: postDetails.title,
        videoCaption: postDetails.caption,
        videoURL: compressVideo
          ? compressVideo
          : Platform.OS == 'android'
          ? media.video
          : selectImage,
        minted: true,
        genre: selectedGenre,
      }),
    );
    setIsMuted(!isMuted);
    navigate(SCREENS.MINTINGPOST);
  };

  // const handleCreateThumbnail = async () => {
  //   const result = await CompressVideo.compress(
  //     Platform.OS == 'android' ? media.video : selectImage,
  //     {
  //       compressionMethod: 'auto',
  //     },
  //     progress => {
  //       console.log(progress, 'result else');
  //     },
  //   );
  //   const res = await createThumbnail({
  //     url: Platform.OS == 'android' ? media.video : result,
  //     timeStamp: 10000,
  //   })
  //     .then(response => {
  //       setThumbnail(response);
  //       console.log({response}, 'response');
  //     })
  //     .catch(err => console.log({err}, 'error'));
  // };

  useEffect(() => {
    if (media.video || selectImage) {
      // handleCreateThumbnail();
    }
  }, [media.video, selectImage]);

  return (
    <Layout>
      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 0}}>
        <View style={{flex: 1}}>
          <Header
            leftChildren={
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={goBack}>
                  <BackIcon />
                </TouchableOpacity>
              </View>
            }
            title={false}
            centerTitle="Post Details"
          />
          <View style={styles.container}>
            <View
              style={{
                height: 375,
              }}>
              {!compress &&
                !compressVideo &&
                media.video &&
                Platform.OS == 'android' && (
                  <Video
                    source={{uri: media.video}}
                    paused={false}
                    repeat={true}
                    style={{width: '100%', height: 400}}
                    muted={isMuted}
                    resizeMode={'cover'}
                    volume={1.0}
                    rate={1.0}
                    ignoreSilentSwitch={'ignore'}
                  />
                )}
              {!compress &&
                !compressVideo &&
                assetURI &&
                Platform.OS == 'ios' && (
                  <Video
                    source={{uri: assetURI}}
                    paused={false}
                    repeat={true}
                    style={{width: '100%', height: 400}}
                    muted={isMuted}
                    resizeMode={'cover'}
                    volume={1.0}
                    rate={1.0}
                    ignoreSilentSwitch={'ignore'}
                  />
                )}
              {!compressingProgress ? (
                compressVideo && (
                  <Video
                    source={{uri: compressVideo}}
                    paused={false}
                    repeat={true}
                    style={{width: '100%', height: 400}}
                    muted={isMuted}
                    resizeMode={'cover'}
                    volume={1.0}
                    rate={1.0}
                    ignoreSilentSwitch={'ignore'}
                  />
                )
              ) : (
                <View
                  style={{
                    height: 300,
                    justifyContent: 'center',
                  }}>
                  <ActivityIndicator size="large" color="white" />
                </View>
              )}
            </View>
          </View>
          <View style={styles.editInputContainer}>
            <TextInput
              style={styles.editInput}
              placeholder="Give your post a title..."
              placeholderTextColor={themeColors.garyColor}
              onChangeText={(e: any) => {
                setPostDetails((prev: any) => {
                  return {
                    ...prev,
                    title: e,
                  };
                });
              }}
            />
          </View>
          {titleError && (
            <Text style={styles.error}>Title should not be empty</Text>
          )}
          <View style={styles.AddSomethingContainer}>
            <TextInput
              style={styles.AddSomethingInput}
              placeholder="Add a cool description, if you'd like..."
              placeholderTextColor={themeColors.garyColor}
              // numberOfLines={10}
              multiline={true}
              onChangeText={(e: any) => {
                setPostDetails((prev: any) => {
                  return {
                    ...prev,
                    caption: e,
                  };
                });
              }}
            />
            <Text style={styles.countWord}>0/ 200</Text>
          </View>
          {descriptionError && (
            <Text style={styles.error}>Description should not be empty</Text>
          )}
          <View style={{marginTop: -30}}>
            <MintDropDown
              title="Genre"
              data={genre}
              setSelected={setSelectedGenre}
              value={null}
              containerStyle={styles.selectionContainer}
            />
          </View>
          {genreError && (
            <Text style={styles.error}>Genre should not be empty</Text>
          )}
          <View style={styles.switch}>
            <Text style={styles.switchText}>Private Post</Text>
            <Switch
              trackColor={{
                false: '#677778',
                true: themeColors.aquaColor,
              }}
              thumbColor={
                isEnabled ? themeColors.primaryColor : themeColors.primaryColor
              }
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
            />
          </View>
          <View style={[styles.switch, {marginTop: 10, paddingBottom: 40}]}>
            {/* <Text style={styles.switchText}>Mint Post</Text>
            <Switch
              trackColor={{
                false: '#677778',
                true: themeColors.aquaColor,
              }}
              thumbColor={
                isEnabledOne
                  ? themeColors.primaryColor
                  : themeColors.primaryColor
              }
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchOne}
              value={isEnabledOne}
              style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
            /> */}
          </View>
          {isEnabledOne ? (
            <ContinueButton
              title="Continue"
              isDisabled={compressingProgress}
              onPress={handleNavigateMintedPage}
            />
          ) : loading ? (
            <LoaderButton />
          ) : (
            <ContinueButton
              isDisabled={compressingProgress}
              onPress={handleCreatePost}
              title="Post"
            />
          )}
        </View>
      </ScrollView>
    </Layout>
  );
};
export default CreatNewPostDetail;
const styles = StyleSheet.create({
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
  container: {
    paddingHorizontal: moderateScale(8),
    marginHorizontal: 8,
    marginTop: 22,
    borderRadius: moderateScale(24),
  },
  headerButtonText: {
    color: themeColors.aquaColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontWeight: '400',
    fontSize: size.default,
  },
  editInputContainer: {
    paddingHorizontal: moderateScale(24),
    borderBottomWidth: 1,
    borderBottomColor: themeColors.garyColor,
    marginTop: 21,
  },
  editInput: {
    fontFamily: Fontfamily.Neuropolitical,
    fontWeight: '500',
    fontSize: size.lg,
    color: 'white',
    paddingBottom: moderateScale(20),
    marginTop: 10,
  },
  AddSomethingContainer: {
    // marginTop: moderateScale(20),
    paddingHorizontal: moderateScale(24),
    borderBottomWidth: 1,
    borderBottomColor: themeColors.garyColor,
  },
  AddSomethingInput: {
    fontFamily: Fontfamily.Avenier,
    fontWeight: '400',
    fontSize: size.md,
    color: 'white',
    // textAlignVertical: 'top',
    marginTop: 20,
  },
  switch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(24),
    marginTop: 46,
  },
  switchText: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '400',
    fontSize: size.lg,
  },
  continueButton: {
    backgroundColor: themeColors.aquaColor,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(20),
  },
  continueButtonText: {
    color: themeColors.secondaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.default,
    fontWeight: '400',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.s,
    fontWeight: '400',
    paddingHorizontal: moderateScale(24),
    marginTop: moderateScale(5),
    // textAlign: 'center',
  },
  countWord: {
    color: themeColors.garyColor,
    textAlign: 'right',
    fontSize: size.s,
    fontWeight: '400',
    fontFamily: Fontfamily.Avenier,
    paddingBottom: 16,
    marginTop: 40,
  },
  selectionContainer: {
    marginTop: 37,
    marginHorizontal: 23,
  },
});
