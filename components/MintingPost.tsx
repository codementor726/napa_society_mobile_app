import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {BackIcon, MuteIcon, UnMuteIcon, UploadIcon} from '../assets/svg';
import ContinueButton from '../common/ContinueButton';
import InputFields from '../common/InputFields';
import Layout from '../common/Layout';
import MintDropDown from '../common/MintDropDown';
import TagsInput from '../common/TagsInput';
import {selectImageList} from '../store/selectors/image';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {countries, snftCollection} from '../const/socialArt';
import {launchImageLibrary} from 'react-native-image-picker';
import {NAPA_SNFT} from '../connectivity/addressHelper/addressHelper';
import LoaderButton from '../common/LoaderButton';
import {createNewMint} from '../utils/mintApi';
import {
  selectSocialList,
  selectSocialMintedPostList,
  selectSocialVideoUploaded,
} from '../store/selectors/socialArtSelector';
import lodash, {set} from 'lodash';
import moment from 'moment';
import {
  fetchSocialArt,
  setSocialData,
  setSocialVideoUploaded,
} from '../store/slices/socialArtData';
import {useToast} from 'react-native-toast-notifications';
import {SCREENS} from '../typings/screens-enums';
import Video from 'react-native-video';
import {
  selectAccountList,
  selectNapaWallet,
} from '../store/selectors/NapaAccount';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {createNewPost} from '../services/PostApi';
import ErrorToast from '../common/toasters/ErrorToast';
import SuccessToast from '../common/toasters/SuccessToast';
const MintingPost = () => {
  const {goBack, navigate} = useNavigation<any>();
  const [image, setImage] = useState<any>();
  const [collection, setCollection] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [genreSelect, setGenreSelect] = useState([]);
  const [tagPeople, setTagPeople] = useState([]);
  const [tag, setTag] = useState([]);
  const socialArt = useSelector(selectSocialList);
  const socialMintedPost: any = useSelector(selectSocialMintedPostList);
  const videoUploading: any = useSelector(selectSocialVideoUploaded);
  const account: any = useSelector(selectAccountList);
  const currentActive = useSelector(selectNapaWallet);
  const user: any = useSelector(selectProfileList);
  const userProfileId = user.profileId;
  const dispatch = useDispatch();
  const toast = useToast();
  const [muted, setMuted] = useState(false);
  const [mintDetails, setMintDetails] = useState({
    title: '',
    description: '',
    coverImage: '',
  });
  const [mintDetailsErrors, setMintDetailsErrors] = useState({
    title: '',
    description: '',
    genre: '',
    collection: '',
    coverImage: '',
  });
  const selectImage = useSelector(selectImageList);
  const handlegetImage = async () => {
    try {
      const check = selectImage?.includes('.jpg');
      if (check) {
        setImage(selectImage);
      }
    } catch (e) {}
  };

  useEffect(() => {
    handlegetImage();
  }, [handlegetImage]);

  let checkUrl = socialMintedPost.videoURL;
  let checkUrlStartWith = checkUrl.startsWith('ph');
  let phURI = socialMintedPost.videoURL;
  let assetURI = `assets-library://asset/asset.mp4?id=${phURI.slice(
    5,
    41,
  )}&ext=mp4`;

  const options: any = {
    mediaType: 'photo',
  };
  const handleOpenLiabrary = async () => {
    const result = await launchImageLibrary(options);
    const file: any = {
      //@ts-ignore
      uri: result.assets[0].uri,
      //@ts-ignore
      name: result.assets[0].fileName,
      //@ts-ignore
      type: result.assets[0].type,
    };
    setMintDetails((prev: any) => {
      return {
        ...prev,
        coverImage: file.uri,
      };
    });
    console.log(file.uri);
  };

  const handleMintPost = async (post: any) => {
    setMintDetailsErrors({
      title: '',
      description: '',
      genre: '',
      coverImage: '',
      collection: '',
    });
    const newTags = tag.map((tag: any) => tag).toLocaleString();
    const newPeopleTags = tagPeople.map((tag: any) => tag).toLocaleString();
    if (mintDetails.title == '') {
      setMintDetailsErrors(prev => {
        return {
          ...prev,
          title: 'Title is required.',
        };
      });
    }
    if (mintDetails.description == '') {
      setMintDetailsErrors(prev => {
        return {
          ...prev,
          description: 'Description is required.',
        };
      });
    }
    if (!collection) {
      setMintDetailsErrors(prev => {
        return {
          ...prev,
          collection: 'Collection is required.',
        };
      });
    }
    // if (!genreSelect.length) {
    //   setMintDetailsErrors(prev => {
    //     return {
    //       ...prev,
    //       genre: 'Genre is required.',
    //     };
    //   });
    // }
    if (!mintDetails.coverImage) {
      setMintDetailsErrors(prev => {
        return {
          ...prev,
          coverImage: 'Cover Image is required',
        };
      });
    }
    if (
      !mintDetails.title ||
      !mintDetails.description ||
      !collection ||
      // !genreSelect.length ||
      !mintDetails.coverImage
    )
      return;

    const formData = new FormData();
    formData.append('postId', socialMintedPost.postId);
    formData.append('videoType', socialMintedPost.videoType);
    formData.append('generatorId', socialMintedPost.accountId);
    formData.append('profileId', socialMintedPost.profileId);
    formData.append('title', mintDetails.title);
    formData.append('network', '');
    formData.append('status', '0');
    formData.append('SNFTTitle', mintDetails.title);
    formData.append('SNFTCollection', collection);
    formData.append('SNFTDescription', mintDetails.description);
    formData.append('location', location || '');
    formData.append('taggedPeople', newPeopleTags.length ? newPeopleTags : '');
    // formData.append('genre', genreSelect.join());
    formData.append('tags', newTags.length ? newTags : '');
    formData.append('live', '');
    formData.append('payoutApproved', '');
    formData.append('SNFTAddress', NAPA_SNFT);
    formData.append('networkTxId', '');
    formData.append('owner', socialMintedPost.accountId);
    formData.append('thumbnail', {
      uri: mintDetails.coverImage,
      type: 'image/jpeg',
      name: 'my_file_name.jpeg',
    });
    setLoading(true);
    const {error, message, data}: any = await createNewMint(formData);
    // console.log(data, 'data');
    const temp = lodash.uniqBy(socialArt, 'postId').map((post: any) => post);
    const isFound = temp.findIndex(p => p.postId == socialMintedPost.postId);
    let updateTemp = JSON.parse(JSON.stringify(temp));
    console.log(updateTemp, 'temp before');
    if (isFound != -1) {
      console.log('temp[isFound]', temp[isFound]);
      updateTemp[isFound].minted = 'true';
      updateTemp[isFound].mintedTimeStamp = moment(new Date()).format(
        'YYYY-MM-DDTHH:mm:ssZ',
      );
    }
    dispatch(setSocialData([...updateTemp]));
    if (error) {
      console.log(message, 'message');
      setLoading(false);
      toast.show(<ErrorToast message={message} />, {
        placement: 'top',
      });
      return;
    }
    // dispatch(fetchSocialArt(0));
    setLoading(false);
    toast.show(<SuccessToast message='Your Post is Now Minted and Live for 12 hours' />, {
      placement: 'top',
    });
    navigate(SCREENS.SOCIALART);
  };

  const handleMintAndCreatePost = async () => {
    setMintDetailsErrors({
      title: '',
      description: '',
      genre: '',
      coverImage: '',
      collection: '',
    });
    if (mintDetails.title == '') {
      setMintDetailsErrors(prev => {
        return {
          ...prev,
          title: 'Title is required.',
        };
      });
    }
    if (mintDetails.description == '') {
      setMintDetailsErrors(prev => {
        return {
          ...prev,
          description: 'Description is required.',
        };
      });
    }
    if (!collection) {
      setMintDetailsErrors(prev => {
        return {
          ...prev,
          collection: 'Collection is required.',
        };
      });
    }
    // if (!genreSelect.length) {
    //   setMintDetailsErrors(prev => {
    //     return {
    //       ...prev,
    //       genre: 'Genre is required.',
    //     };
    //   });
    // }
    if (!mintDetails.coverImage) {
      setMintDetailsErrors(prev => {
        return {
          ...prev,
          coverImage: 'Cover Image is required',
        };
      });
    }
    if (
      !mintDetails.title ||
      !mintDetails.description ||
      !collection ||
      // !genreSelect.length ||
      !mintDetails.coverImage
    )
      return;
    const selectedAccount = account?.find(
      (val: any, index: number) =>
        val[`NWA_${index + 1}_NE`] == val[`NWA_${currentActive}_NE`],
    );
    const formData = new FormData();
    formData.append('videoTitle', socialMintedPost.videoTitle);
    formData.append('videoFile', {
      uri: socialMintedPost.videoURL,
      type: socialMintedPost.videoType,
      name: 'my_file_name.mp4',
    });
    formData.append('awardsByUsers', '');
    formData.append('videoType', 'video/mp4' || '');
    formData.append('videoCaption', socialMintedPost.videoCaption);
    formData.append('accountId', selectedAccount[`NWA_${currentActive}_AC`]);
    formData.append('profileId', userProfileId);
    formData.append('minted', 'false');
    formData.append('genre', socialMintedPost.genre);
    formData.append('postedBy', 'metamask' || '');
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
      console.log(data, 'data');
      // navigate(SCREENS.SOCIALART);
    }
  };

  const handleNextApi = async () => {
    console.log('minting post test');
    console.log(socialMintedPost.postId, 'socialMintedPost.postId');
    const newTags = tag.map((tag: any) => tag).toLocaleString();
    const newPeopleTags = tagPeople.map((tag: any) => tag).toLocaleString();
    const formData = new FormData();
    formData.append('postId', socialMintedPost.postId);
    formData.append('videoType', socialMintedPost.videoType);
    formData.append('generatorId', socialMintedPost.accountId);
    formData.append('profileId', socialMintedPost.profileId);
    formData.append('title', mintDetails.title);
    formData.append('network', '');
    formData.append('status', '0');
    formData.append('SNFTTitle', mintDetails.title);
    formData.append('SNFTCollection', collection);
    formData.append('SNFTDescription', mintDetails.description);
    formData.append('location', location || '');
    formData.append('taggedPeople', newPeopleTags.length ? newPeopleTags : '');
    // formData.append('genre', genreSelect.join());
    formData.append('tags', newTags.length ? newTags : '');
    formData.append('live', '');
    formData.append('payoutApproved', '');
    formData.append('SNFTAddress', NAPA_SNFT);
    formData.append('networkTxId', '');
    formData.append('owner', socialMintedPost.accountId);
    formData.append('thumbnail', {
      uri: mintDetails.coverImage,
      type: 'image/jpeg',
      name: 'my_file_name.jpeg',
    });
    setLoading(true);
    const {error, message} = await createNewMint(formData);
    const temp = lodash.uniqBy(socialArt, 'postId').map((post: any) => post);
    let updateTemp = JSON.parse(JSON.stringify(temp));
    const isFound = temp.findIndex(p => p.postId == socialMintedPost.postId);
    if (isFound != -1) {
      updateTemp[isFound].minted = 'true';
      updateTemp[isFound].mintedTimeStamp = moment(new Date()).format(
        'YYYY-MM-DDTHH:mm:ssZ',
      );
    }

    dispatch(setSocialData([...updateTemp]));
    if (error) {
      console.log(message, 'message');
      setLoading(false);
      toast.show(<ErrorToast message={message} />, {
        placement: 'top',
      });
      return;
    }
    // dispatch(fetchSocialArt(0));
    setLoading(false);
    toast.show(<SuccessToast message='Your Post is Now Minted and Live for 12 hours' />, {
      placement: 'top',
    });
    dispatch(setSocialVideoUploaded(false));
    navigate(SCREENS.SOCIALART);
  };

  useEffect(() => {
    if (videoUploading) {
      handleNextApi();
    }
  }, [videoUploading]);

  return (
    <Layout>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.edit} onPress={goBack}>
            <BackIcon />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Mint your SNFT</Text>
          </View>
        </View>
        <ScrollView>
          <View style={{marginBottom: moderateScale(20)}}>
            <View style={styles.container}>
              <View style={styles.imageContainer}>
                <View>
                  <Video
                    source={{
                      uri: checkUrlStartWith
                        ? assetURI
                        : socialMintedPost.videoURL,
                    }}
                    style={{
                      height: 250,
                      width: '100%',
                      position: 'relative',
                      borderRadius: 24,
                    }}
                    resizeMode="cover"
                    paused={false}
                    repeat={true}
                    muted={muted}
                    volume={1.0}
                    rate={1.0}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      alignItems: 'flex-end',
                      paddingHorizontal: moderateScale(20),
                      paddingVertical: moderateScale(20),
                    }}>
                    {muted ? (
                      <TouchableOpacity onPress={() => setMuted(!muted)}>
                        <UnMuteIcon color={themeColors.primaryColor} />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => setMuted(!muted)}>
                        <MuteIcon color={themeColors.primaryColor} />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                <View style={{position: 'absolute', top: '70%', left: '5%'}}>
                  <Text style={styles.imageTitle}>
                    {socialMintedPost.videoTitle}
                  </Text>
                  <Text style={styles.imageSubTitle}>
                    {socialMintedPost.videoCaption}
                  </Text>
                </View>
                {/* <ImageBackground
                  imageStyle={{borderRadius: 24}}
                  style={styles.image}
                  // source={{uri: videoURL}}>
                  // source={{uri: 'file://' + image}}>
                  source={require('../assets/images/createBackground.png')}>
                  <Text style={styles.imageTitle}>{videoTitle}</Text>
                  <Text style={styles.imageSubTitle}>{videoCaption}</Text>
                </ImageBackground> */}
              </View>
            </View>
            <View style={styles.inputFields}>
              <View style={styles.uploadPhoto}>
                <Text style={styles.uploadPhotoText}>SNFT COVER</Text>
                {mintDetails.coverImage ? (
                  <>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: moderateScale(10),
                      }}>
                      <Image
                        style={{width: '100%', height: 150, borderRadius: 24}}
                        source={{uri: mintDetails.coverImage}}
                      />
                      <Pressable
                        onPress={handleOpenLiabrary}
                        style={{
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                          width: '100%',
                        }}>
                        <Text
                          style={{
                            color: themeColors.aquaColor,
                            fontFamily: Fontfamily.Avenier,
                            textAlign: 'right',
                            fontSize: size.md,
                          }}>
                          Replace
                        </Text>
                      </Pressable>
                    </View>
                  </>
                ) : (
                  <View style={styles.uploadPhotoContainer}>
                    <Pressable
                      onPress={handleOpenLiabrary}
                      style={styles.uploadPhotoPressable}>
                      <UploadIcon />
                      <Text style={styles.uploadPhotoContainerTitle}>
                        Click Here to Upload Image
                      </Text>
                      <Text style={styles.uploadPhotoContainerSubTitle}>
                        Max File Size 10MB
                      </Text>
                    </Pressable>
                  </View>
                )}
                {mintDetailsErrors.coverImage && (
                  <Text
                    style={{
                      color: 'red',
                      marginTop: 3,
                      fontFamily: Fontfamily.Avenier,
                      fontSize: size.default,
                    }}>
                    {mintDetailsErrors.coverImage}
                  </Text>
                )}
              </View>
              <Text style={styles.mintedDetailText}>Details</Text>
              <InputFields
                title="SNFT Title"
                placholder="Enter SNFT Title"
                value={mintDetails.title}
                onChange={(e: any) => {
                  setMintDetails((prev: any) => {
                    return {
                      ...prev,
                      title: e,
                    };
                  });
                }}
              />
              {mintDetailsErrors.title && (
                <Text
                  style={{
                    color: 'red',
                    marginTop: 3,
                    fontFamily: Fontfamily.Avenier,
                    fontSize: size.default,
                  }}>
                  {mintDetailsErrors.title}
                </Text>
              )}
              <MintDropDown
                title="SNFT Collection"
                data={snftCollection}
                setSelected={setCollection}
                value={collection}
              />
              {mintDetailsErrors.collection && (
                <Text
                  style={{
                    color: 'red',
                    marginTop: 3,
                    fontFamily: Fontfamily.Avenier,
                    fontSize: size.default,
                  }}>
                  {mintDetailsErrors.collection}
                </Text>
              )}
              <View style={styles.description}>
                <Text style={styles.descriptionText}>SNFT Description</Text>
                <TextInput
                  style={styles.descriptionInput}
                  numberOfLines={10}
                  multiline={true}
                  onChangeText={(e: any) => {
                    setMintDetails((prev: any) => {
                      return {
                        ...prev,
                        description: e,
                      };
                    });
                  }}
                />
                {mintDetailsErrors.description && (
                  <Text
                    style={{
                      color: 'red',
                      marginTop: 3,
                      fontFamily: Fontfamily.Avenier,
                      fontSize: size.default,
                    }}>
                    {mintDetailsErrors.description}
                  </Text>
                )}
              </View>
              <MintDropDown
                title="Location"
                data={countries}
                setSelected={setLocation}
                value={location}
              />
              <View style={{marginTop: moderateScale(10)}}>
                <TagsInput title="Tag People" tagPeople={setTagPeople} />
              </View>
              {/* <View style={{marginTop: moderateScale(10)}}>
                <TagsInput
                  title="Genre: Choose Your Audience"
                  tagPeople={setGenreSelect}
                />
                {mintDetailsErrors.genre && (
                  <Text
                    style={{
                      color: 'red',
                      marginTop: 3,
                      fontFamily: Fontfamily.Avenier,
                      fontSize: size.default,
                    }}>
                    {mintDetailsErrors.genre}
                  </Text>
                )}
              </View> */}
              <View style={{marginTop: moderateScale(10)}}>
                <TagsInput title="Tags" tagPeople={setTag} />
              </View>
            </View>
          </View>
        </ScrollView>
        {loading ? (
          <LoaderButton />
        ) : socialMintedPost.minted ? (
          <ContinueButton
            title="Mint / Post"
            onPress={handleMintAndCreatePost}
          />
        ) : (
          <ContinueButton title="Mint" onPress={handleMintPost} />
        )}
      </View>
    </Layout>
  );
  0;
};

export default MintingPost;
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(24),
    paddingBottom: moderateScale(10),
    paddingTop: moderateScale(10),
  },
  edit: {
    position: 'absolute',
    top: '70%',
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
  container: {
    paddingHorizontal: moderateScale(8),
  },
  imageContainer: {
    marginVertical: moderateScale(20),
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  image: {
    height: 200,
    justifyContent: 'flex-end',
    padding: moderateScale(12),
  },
  imageTitle: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontWeight: '400',
    fontSize: size.vxlg,
  },
  imageSubTitle: {
    marginTop: moderateScale(5),
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.md,
  },
  inputFields: {
    paddingHorizontal: moderateScale(25),
    marginBottom: moderateScale(10),
  },
  uploadPhoto: {},
  uploadPhotoText: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontWeight: '400',
    fontSize: size.lg,
  },
  uploadPhotoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateScale(50),
    borderWidth: 2,
    borderColor: themeColors.garyColor,
    borderRadius: 24,
    marginTop: moderateScale(20),
    borderStyle: 'dashed',
  },
  uploadPhotoPressable: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadPhotoContainerTitle: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.md,
    lineHeight: 22.4,
    marginTop: moderateScale(8),
  },
  uploadPhotoContainerSubTitle: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '400',
    fontSize: size.s,
    lineHeight: 16.8,
  },
  mintedDetailText: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontWeight: '400',
    fontSize: size.lg,
    lineHeight: 19.8,
    marginTop: moderateScale(30),
  },
  description: {
    marginTop: moderateScale(10),
    zIndex: 0,
  },
  descriptionText: {
    marginTop: moderateScale(20),
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '400',
    fontSize: size.s,
  },
  descriptionInput: {
    marginTop: moderateScale(10),
    borderWidth: 1,
    borderColor: themeColors.garyColor,
    height: 120,
    paddingBottom: moderateScale(5),
    borderRadius: 24,
    color: themeColors.primaryColor,
    paddingHorizontal: 10,
  },
});
