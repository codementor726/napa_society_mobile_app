import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Platform,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  Modal,
} from 'react-native';
import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
import Layout from '../common/Layout';
import Header from '../common/Header';
import {
  BackIcon,
  DeleteIcon,
  EyeIcon,
  FacebookIcona,
  TwitterIcona,
  VerticaldotIcon,
  WeblinlIcon,
} from '../assets/svg';
import {useNavigation, useRoute} from '@react-navigation/native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import MintDropDown from '../common/MintDropDown';
import {countries, profileLinks, userType} from '../const/socialArt';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectPinCode,
  selectProfileList,
} from '../store/selectors/profileDetailSelector';
import {SCREENS} from '../typings/screens-enums';
import {launchImageLibrary} from 'react-native-image-picker';
import {updateUserProfile} from '../services/AuthApi';
import {CreateNewUserProfile} from '../store/slices/CreateUserProfile';
import {fetchProfileData} from '../store/slices/ProfileDetail';
import {handleGetFCMToken, validateEmail} from '../utils/helper';
import CTTextinput from '../common/CTTextinput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectGetTermCondition } from '../store/selectors/CreateProfileSelector';

const CreateProfile = () => {
  const {navigate, goBack} = useNavigation<any>();
  const route = useRoute<any>();
  const termsAndConditionvalue =useSelector(selectGetTermCondition);
  const getProfileDetails = useSelector(selectProfileList);
  const dispatch = useDispatch();
  const [name, setName] = useState<any>('');
  const [emailAddress, setEmailAddress] = useState<any>('');
  const [accountType, setAccountType] = useState<any>();
  const [bio, setBio] = useState<any>('');
  const [avatar, setAvatar] = useState<any>();
  const [userAvatar, setUserAvatar] = useState<any>();
  const [primaryCurrency, setPrimaryCurrency] = useState<any>('NAPA');
  const [language, setLanguage] = useState<any>('English');
  const [timezone, setTimezone] = useState<any>('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const nameInputRef = useRef<TextInput | null>(null);
  const emailInputRef = useRef<TextInput | null>(null);
  const bioInputRef = useRef<TextInput | null>(null);
  const pin = useSelector(selectPinCode);
  useEffect(() => {
    if (getProfileDetails?.profileName) {
      setName(getProfileDetails?.profileName);
      setBio(getProfileDetails?.bio);
      setAvatar(getProfileDetails?.avatar);
      setLanguage(getProfileDetails?.language);
      setPrimaryCurrency(getProfileDetails?.primaryCurrency);
      setEmailAddress(getProfileDetails?.emailAddress);
      setAccountType(getProfileDetails?.accountType);
      setTimezone(getProfileDetails?.timezone);
    }
  }, [getProfileDetails]);

  const handleCardSwipeValueChange = (swipeData: any) => {
    const {key, value} = swipeData;
    if (value < -150) {
    }
  };
  const profileUpdateHandler = async () => {
    setError({
      profileName: '',
      emailAddress: '',
    });
    if (!name) {
      setError(prev => {
        return {
          ...prev,
          profileName: 'Name is required',
        };
      });
      return;
    }
    const data = {
      profileName: name,
      bio: bio,
      primaryCurrency,
      language,
      timezone,
      accountType,
      selectedAvatar: userAvatar ? userAvatar : '',
    };
    setLoading(true);
    updateUserProfile(getProfileDetails.emailAddress, data).then(
      async (emailAddress: any) => {
        dispatch(
          fetchProfileData({
            emailAddress,
          }),
        ).then((data: any) => {
          if (data) {
            setLoading(false);
            goBack();
          }
        });
      },
    );
  };

  const [error, setError] = useState({
    profileName: '',
    emailAddress: '',
  });
  const profileCreateHandler = async () => {
    // const pin = await AsyncStorage.getItem('pinCode');
    setError({
      profileName: '',
      emailAddress: '',
    });
    if (!name) {
      setError(prev => {
        return {
          ...prev,
          profileName: 'Name is required',
        };
      });
    }
    if (!emailAddress) {
      setError(prev => {
        return {
          ...prev,
          emailAddress: 'Email is required',
        };
      });
    }
    if (emailAddress && !validateEmail(emailAddress)) {
      setError(prev => {
        return {
          ...prev,
          emailAddress: 'Email is invalid',
        };
      });
    }
    if (!name || !emailAddress || !validateEmail(emailAddress)) {
      return;
    }

    const token = await handleGetFCMToken();

    const data = {
      profileName: name,
      bio: bio,
      primaryCurrency,
      language,
      timezone,
      accountType: accountType ? accountType : '',
      emailAddress,
      avatar: userAvatar ? userAvatar : '',
      pin: pin ? pin : '',
      registrationType: pin ? 'Pin' : 'Biometric',
      deviceToken: token,
      termsAndCondition: termsAndConditionvalue,
    };

    console.log(data, '=====> data');
    setLoading(true);
    dispatch(CreateNewUserProfile(data)).then(async (data: any) => {
      console.log(data);
      if (data.payload) {
        const obj = {
          emailAddress: data.payload,
          pin: pin,
        };
        dispatch(fetchProfileData(obj)).then((dataPayload: any) => {
          if (dataPayload.payload) {
            navigate(SCREENS.CHOOSEAUDIENCE);
            setLoading(false);
          } else {
            console.log('error fetch data');
          }
        });
      } else {
        setModalVisible(true);
        setLoading(false);
      }
    });
  };
  const options = {
    mediaType: 'photo',
  };
  const handleOpenLiabrary = async () => {
    //@ts-ignore
    const result = await launchImageLibrary(options);
    const file = {
      //@ts-ignore
      uri: result.assets[0].uri,
      //@ts-ignore
      name: result.assets[0].fileName,
      //@ts-ignore
      type: result.assets[0].type,
    };
    setUserAvatar(file);
    setAvatar(file.uri);
  };

  return (
    <Layout>
      <ScrollView>
        {/* <Header
          leftChildren={
            getProfileDetails?.profileName && (
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => navigate(SCREENS.PROFILE)}>
                  <BackIcon color={'#677778'} />
                </TouchableOpacity>
              </View>
            )
          }
          title={false}
          centerTitle={`${
            getProfileDetails?.profileName ? 'Edit Profile' : 'Create Profile'
          }`}
        /> */}

        <Header
          leftChildren={
            getProfileDetails?.profileName && (
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => goBack()}>
                  <BackIcon color={'#677778'} />
                </TouchableOpacity>
              </View>
            )
          }
          childStyle={styles.childStyle}
          centerStyle={styles.centerStyle}
          rightStyle={styles.childStyle}
          title={false}
          centerTitle={`${
            getProfileDetails?.profileName ? 'Edit Profile' : 'Create Profile'
          }`}
        />
        <View style={styles.imageContainer}>
          <TouchableOpacity>
            <Image
              style={styles.profile}
              source={{
                uri:
                  avatar ||
                  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <TouchableOpacity onPress={handleOpenLiabrary}>
            <Text style={styles.changeText}>Change Avatar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputFieldContainer}>
          <Text style={styles.generalText}>General</Text>
          {/* <View>
            <TouchableOpacity
              onPress={() =>
                nameInputRef.current && nameInputRef.current.focus()
              }>
              <Text style={styles.fieldText}>Name</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.topInput}
              value={name}
              editable={loading ? false : true}
              ref={nameInputRef}
              onChangeText={(name: any) => setName(name)}
            />
            {error.profileName && !name && (
              <Text
                style={{
                  color: 'red',
                  paddingHorizontal: moderateScale(22),
                  marginTop: moderateScale(8),
                }}>
                {error.profileName}
              </Text>
            )}
          </View> */}
          <View style={{height: moderateScale(25)}}></View>
          <CTTextinput
            title="Name"
            value={name}
            onChangeText={(name: any) => setName(name)}
            inputRef={nameInputRef}
          />
          {error.profileName && !name && (
            <Text
              style={{
                color: 'red',
                paddingHorizontal: moderateScale(22),
                marginTop: moderateScale(8),
              }}>
              {error.profileName}
            </Text>
          )}

          {/* <View>
            <TouchableOpacity
              onPress={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }>
              <Text style={styles.fieldText}>Email</Text>
            </TouchableOpacity>
            <TextInput
              style={[
                styles.topInput,
                {
                  color: getProfileDetails?.profileName
                    ? themeColors.garyColor
                    : themeColors.primaryColor,
                },
              ]}
              value={emailAddress}
              ref={emailInputRef}
              editable={
                getProfileDetails?.emailAddress || loading ? false : true
              }
              onChangeText={email => {
                setEmailAddress(email);
                setError(prev => {
                  return {
                    ...prev,
                    emailAddress: '',
                  };
                });
              }}
            />
            {error.emailAddress && (
              <Text
                style={{
                  color: 'red',
                  paddingHorizontal: moderateScale(22),
                  marginTop: moderateScale(8),
                }}>
                {error.emailAddress}
              </Text>
            )}
          </View> */}

          <View style={{height: moderateScale(25)}}></View>
          <CTTextinput
            title="Email"
            value={emailAddress}
            inputRef={emailInputRef}
            editable={getProfileDetails?.emailAddress || loading ? false : true}
            onChangeText={email => {
              setEmailAddress(email);
              setError(prev => {
                return {
                  ...prev,
                  emailAddress: '',
                };
              });
            }}
          />
          {error.emailAddress && (
            <Text
              style={{
                color: 'red',
                paddingHorizontal: moderateScale(22),
                marginTop: moderateScale(8),
              }}>
              {error.emailAddress}
            </Text>
          )}

          <View style={styles.dropDown}>
            <MintDropDown
              title="Account Type"
              data={userType}
              setSelected={setAccountType}
              value={accountType}
            />
            <View style={{marginTop: moderateScale(10)}}>
              <MintDropDown
                title="Location"
                data={countries}
                setSelected={setTimezone}
                value={timezone}
              />
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                bioInputRef.current && bioInputRef.current.focus()
              }>
              <Text style={styles.fieldText}>Bio</Text>
            </TouchableOpacity>
            <TextInput
              value={bio}
              onChangeText={bio => setBio(bio)}
              numberOfLines={10}
              multiline={true}
              ref={bioInputRef}
              editable={loading ? false : true}
              style={styles.descriptionInput}
            />
          </View>

          {/* <TouchableOpacity
            onPress={() => bioInputRef.current && bioInputRef.current.focus()}>
            <Text style={styles.fieldText}>Interests</Text>
          </TouchableOpacity> */}

          {/* <View style={styles.interestsContainer}>
            <MultipleSelectDropDown
              title="Location"
              data={countries}
              setSelected={setTimezone}
              value={timezone}
            />
          </View> */}
        </View>
        <View style={styles.Textcontainer}>
          <Text style={styles.profileLink}>Links</Text>
          <TouchableOpacity>
            <Text style={styles.profileAddLink}>Add Link</Text>
          </TouchableOpacity>
        </View>
        <View>
          <SwipeListView
            useFlatList={true}
            data={profileLinks}
            renderItem={({item}) => (
              <View style={styles.profileContainer}>
                <View style={styles.profileType}>
                  <View style={styles.profileName}>
                    {item.profileType.includes('Website') && <WeblinlIcon />}
                    {item.profileType.includes('Facebook') && <FacebookIcona />}
                    {item.profileType.includes('Twitter') && <TwitterIcona />}

                    <Text
                      style={[
                        {
                          color: item.profileType.includes('Website')
                            ? '#16E6EF'
                            : item.profileType.includes('Facebook')
                            ? '#1877F2'
                            : item.profileType.includes('Twitter')
                            ? '#30B4FE'
                            : 'white',
                        },
                        styles.socialMediaName,
                      ]}>
                      {item.profileType}
                    </Text>
                  </View>
                  <EyeIcon />
                </View>
                <View style={styles.profileLinkUrlContainerTop}>
                  <Text style={styles.profileLinkUrlText}>URL</Text>
                  <View style={styles.profileLinkUrl}>
                    <Text style={styles.profileLinkUrltextcontainer}>
                      {item.url}
                    </Text>
                    <VerticaldotIcon />
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item: any) => item.id}
            renderHiddenItem={item => (
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  width: moderateScale(68),
                  paddingRight: moderateScale(2),
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <DeleteIcon />
              </TouchableOpacity>
            )}
            // onSwipeValueChange={handleCardSwipeValueChange}
            // leftOpenValue={200}
            rightOpenValue={moderateScale(-66)}
          />
        </View>
        <View style={styles.buyButton}>
          {loading ? (
            <View style={styles.buyLoader}>
              <ActivityIndicator
                size="large"
                color={themeColors.primaryColor}
              />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.buy}
              onPress={() => {
                getProfileDetails?.profileName
                  ? profileUpdateHandler()
                  : profileCreateHandler();
              }}>
              <Text style={styles.buyText}>Save Changes</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* comment out the modal option here for now  */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Alert</Text>
            <Text style={styles.modalTextSubTitle}>
              This email address is already associated with a NAPA account. Do
              you want to recover your account?
            </Text>

            <View
              style={{
                justifyContent: 'flex-end',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: 180,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigate(SCREENS.RECOVERYSCREEN);
                    setModalVisible(false);
                  }}>
                  <Text style={styles.textStyle}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </Layout>
  );
};

export default CreateProfile;
const styles = StyleSheet.create({
  childStyle: {
    width: '20%',
  },
  centerStyle: {
    width: '55%',
  },
  imageContainer: {
    paddingTop: verticalScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
  textContainer: {
    paddingTop: verticalScale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: {
    height: verticalScale(100),
    width: verticalScale(100),
    resizeMode: 'center',
    borderRadius: 120,
    // backgroundColor: 'yellow',
  },
  changeText: {
    color: themeColors.aquaColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontWeight: '400',
    fontSize: size.default,
  },
  inputFieldContainer: {
    marginTop: verticalScale(42),
  },
  generalText: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontWeight: '400',
    fontSize: size.lg,
    paddingHorizontal: moderateScale(25),
  },
  fieldText: {
    paddingTop: verticalScale(15),
    paddingHorizontal: moderateScale(15),
    marginHorizontal: moderateScale(22),
    color: themeColors.garyColor,
    fontWeight: '400',
    fontSize: size.s,
    fontFamily: Fontfamily.Avenier,
  },
  interestsContainer: {
    marginTop: moderateScale(10),
    marginHorizontal: moderateScale(22),
    borderWidth: 1,
    borderColor: themeColors.garyColor,
    paddingHorizontal: moderateScale(15),
    minHeight: 50,
    borderRadius: 15,
  },
  topInput: {
    borderBottomWidth: 1,
    borderColor: themeColors.garyColor,
    paddingLeft: Platform.OS === 'ios' ? moderateScale(10) : moderateScale(20),
    paddingBottom: Platform.OS === 'ios' ? moderateScale(10) : moderateScale(0),
    borderRadius: 24,
    color: themeColors.primaryColor,
    marginHorizontal:
      Platform.OS === 'ios' ? moderateScale(20) : moderateScale(10),
    marginTop: Platform.OS === 'ios' ? moderateScale(8) : moderateScale(0),
  },
  descriptionInput: {
    marginTop: moderateScale(10),
    marginHorizontal: moderateScale(22),
    paddingHorizontal: moderateScale(15),
    borderWidth: 1,
    borderColor: themeColors.garyColor,
    height: 120,
    borderRadius: 15,
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    textAlignVertical: 'top',
  },
  cancelButton: {
    marginTop: 40,
    justifyContent: 'flex-end',
    backgroundColor: themeColors.cardsColor,
  },
  cancel: {
    backgroundColor: themeColors.secondaryColor,
    paddingVertical: verticalScale(2),
  },
  cancelText: {
    textAlign: 'center',
    color: themeColors.garyColor,
    fontSize: size.default,
    fontWeight: '400',
    fontFamily: Fontfamily.Neuropolitical,
  },
  buyButton: {
    marginTop: 40,
    justifyContent: 'flex-end',
    backgroundColor: themeColors.cardsColor,
  },
  buy: {
    backgroundColor: themeColors.aquaColor,
    paddingVertical: verticalScale(22),
  },
  buyLoader: {
    backgroundColor: themeColors.aquaColor,
    paddingVertical: verticalScale(15),
  },
  buyText: {
    textAlign: 'center',
    color: themeColors.secondaryColor,
    fontSize: size.default,
    fontWeight: '400',
    fontFamily: Fontfamily.Neuropolitical,
  },
  Textcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(22),
    paddingTop: verticalScale(36),
    paddingBottom: verticalScale(10),
  },
  profileLink: {
    color: themeColors.primaryColor,
    fontSize: size.lg,
    fontFamily: Fontfamily.Neuropolitical,
  },
  profileAddLink: {
    color: themeColors.aquaColor,
    fontSize: size.md,
    fontFamily: Fontfamily.Neuropolitical,
  },
  profileContainer: {
    marginHorizontal:
      Platform.OS === 'ios' ? moderateScale(6) : moderateScale(6),
    marginVertical: Platform.OS === 'ios' ? verticalScale(6) : verticalScale(6),
    paddingHorizontal:
      Platform.OS === 'ios' ? moderateScale(16) : moderateScale(16),
    paddingVertical: verticalScale(10),
    borderRadius: 20,
    backgroundColor: themeColors.cardsColor,
  },
  profileType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialMediaName: {
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.lg,
    paddingLeft: moderateScale(6),
  },
  profileLinkUrlContainerTop: {
    marginTop: Platform.OS === 'ios' ? verticalScale(25) : verticalScale(25),
  },
  profileLinkUrlContainer: {},
  profileLinkUrlText: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '400',
    fontSize: size.s,
  },
  profileLinkUrl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileLinkUrltextcontainer: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '400',
    fontSize: size.md,
  },
  dropDown: {
    paddingHorizontal: moderateScale(22),
    marginBottom: verticalScale(10),
    marginTop: moderateScale(10),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: themeColors.cardsColor,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 70,
    marginTop: moderateScale(10),
    backgroundColor: themeColors.aquaColor,
  },
  textStyle: {
    color: themeColors.cardsColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: size.xlg,
    color: themeColors.primaryColor,
    fontWeight: 'bold',
    fontFamily: Fontfamily.Neuropolitical,
  },
  modalTextSubTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: size.default,
    color: themeColors.primaryColor,
  },
});
