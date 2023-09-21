/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState, useEffect} from 'react';
import Layout from '../common/Layout';
import Header from '../common/Header';
import {BackIcon} from '../assets/svg';
import {useNavigation, useRoute} from '@react-navigation/native';
import {themeColors} from '../theme/colors';
import InputFields from '../common/InputFields';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {launchImageLibrary} from 'react-native-image-picker';
import {SCREENS} from '../typings/screens-enums';
import {newLiveStreamItem, updateLiveStreamItem} from '../services/PostApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'react-native-toast-notifications';
import {getLiveStreamUserList} from '../services/GetImportedToken';
import {selectActiveWalletAddress} from '../store/selectors/NapaAccount';
import {useSelector} from 'react-redux';
import ErrorToast from '../common/toasters/ErrorToast';

const StreamTitleItem: FC = () => {
  const toast = useToast();
  const {goBack} = useNavigation<any>();
  const [tokenized, setTokenized] = useState<number>(-1);
  const [tokenizedError, setTokenizedError] = useState('');
  const [transactionType, setTransactionType] = useState(2);
  const [channelName, setChannelName] = useState('');
  const [liveStreamProfileId, setLiveStreamProfileId] = useState('');
  const [liveStreamId, setLiveStreamId] = useState('');
  const [itemImage, setItemImage] = useState<any>();
  const [itemImageError, setItemImageError] = useState({itemImage: ''});
  const [itemImageUri, setItemImageUri] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const activeAccountAddress = useSelector(selectActiveWalletAddress);

  const navigation = useNavigation<any>();
  const editParams: {isEditItem: boolean; itemUuid: string} | any =
    useRoute().params;
  const [updatedDataId, setUpdatedDataId] = useState({
    buyerProfileId: '',
    itemUuid: '',
  });
  const [itemValues, setItemValues] = useState({
    itemName: '',
    itemDescription: '',
    itemAddress: '',
    price: '',
  });

  const [inputErrors, setInputErrors] = useState({
    itemName: '',
    itemDescription: '',
    itemAddress: '',
    price: '',
  });

  useEffect(() => {
    if (editParams?.isEditItem) {
      const unsubscribe = navigation.addListener('focus', () => {
        (async () => {
          let streamData: any = await AsyncStorage.getItem('data');
          streamData = JSON.parse(streamData);
          const {streamId = ''} = streamData;
          if (streamId) {
            const {data} = (await getLiveStreamUserList(streamId, {
              enabled: !!streamId,
            })) as any;
            if (data && data?.data) {
              const ListData = data?.data.find(
                (item: any) => item.itemUuid === editParams?.itemUuid,
              );
              setItemValues({
                itemName: ListData?.itemName,
                itemAddress: ListData?.itemAddress,
                itemDescription: ListData?.itemDescription,
                price: ListData?.price,
              });
              setTokenized(ListData?.tokenized);
              setItemImageUri(ListData?.itemImage);
              setUpdatedDataId({
                buyerProfileId: ListData?.buyerProfileId,
                itemUuid: ListData?.itemUuid,
              });
            }
          }
        })();
      });

      return unsubscribe;
    }
  }, [editParams?.isEditItem, navigation]);

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const rawChannelName: any = await AsyncStorage.getItem('channelName');
      setChannelName(rawChannelName);
      let data: any = await AsyncStorage.getItem('data');
      data = JSON.parse(data);
      const {profileId = '', streamId = ''} = data;
      setLiveStreamId(streamId);
      setLiveStreamProfileId(profileId);
    } catch (err: any) {}
  };

  const calculateFileSizeInMB = (sizeInBytes: any) => {
    return sizeInBytes / (1024 * 1024);
  };
  const options: any = {
    mediaType: 'photo',
  };
  const handleOpenLiabrary = async () => {
    const result = await launchImageLibrary(options);
    if (!result?.didCancel) {
      const asset = result.assets?.[0];
      if (asset) {
        const file = {
          //@ts-ignore
          uri: asset.uri,
          //@ts-ignore
          name: asset.fileName,
          //@ts-ignore
          type: asset.type,
        };
        const fileSizeInMB = calculateFileSizeInMB(asset.fileSize);

        if (fileSizeInMB > 10) {
          setItemImageError({itemImage: 'Image size should be less than 10MB'});
        } else {
          setItemImage(file);
          setItemImageUri(file.uri);
        }
      }
    }
  };

  const onSubmit = async () => {
    const isValid: any = handleValidation();
    if (isValid) {
      const formData = new FormData();
      formData.append('itemName', itemValues.itemName);
      formData.append('itemDescription', itemValues.itemDescription);
      formData.append('itemAddress', itemValues.itemAddress);
      formData.append('streamTitle', channelName);
      formData.append('profileId', liveStreamProfileId);
      formData.append('streamId', liveStreamId);
      formData.append('price', itemValues.price);
      formData.append('tokenized', tokenized);
      formData.append('transactionType', transactionType);
      formData.append('itemImage', {
        uri: itemImageUri,
        type: 'image/jpeg',
        name: 'my_file_name.jpeg',
      });
      formData.append('walletAddress', activeAccountAddress);
      setIsLoading(true);

      if (editParams) {
        formData.append('buyerProfileId', updatedDataId.buyerProfileId);
        formData.append('itemUuid', updatedDataId.itemUuid);
        const {error, message} = await updateLiveStreamItem(formData);
        setIsLoading(false);
        if (error) {
          toast.show(<ErrorToast message={message} />, {
            placement: 'top',
          });
        }
        navigation.navigate(SCREENS.LIVEVIDEO);
      } else {
        const {error, message} = await newLiveStreamItem(formData);
        setIsLoading(false);
        if (error) {
          toast.show(<ErrorToast message={message} />, {
            placement: 'top',
          });
        }
        navigation.navigate(SCREENS.LIVEVIDEO);
      }
    }
  };
  const handleChange = (name: string, value: any) => {
    setItemValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));

    setInputErrors(prevErrors => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleValidation = () => {
    let isValid = true;

    if (itemValues.itemName.trim() === '') {
      setInputErrors(prevErrors => ({
        ...prevErrors,
        itemName: 'Title is required.',
      }));
      isValid = false;
    } else {
      setInputErrors(prevErrors => ({
        ...prevErrors,
        itemName: '',
      }));
    }

    if (itemValues.itemDescription.trim() === '') {
      setInputErrors(prevErrors => ({
        ...prevErrors,
        itemDescription: 'Description is required.',
      }));
      isValid = false;
    } else {
      setInputErrors(prevErrors => ({
        ...prevErrors,
        itemDescription: '',
      }));
    }

    if (itemValues.itemAddress.trim() === '' && tokenized === 1) {
      setInputErrors(prevErrors => ({
        ...prevErrors,
        itemAddress: 'Address is required.',
      }));
      isValid = false;
    } else {
      setInputErrors(prevErrors => ({
        ...prevErrors,
        itemAddress: '',
      }));
    }

    if (itemValues.price.trim() === '') {
      setInputErrors(prevErrors => ({
        ...prevErrors,
        price: 'Price is required.',
      }));
      isValid = false;
    } else {
      setInputErrors(prevErrors => ({
        ...prevErrors,
        price: '',
      }));
    }

    if (tokenized < 0) {
      setTokenizedError('Tokenized is required.');
      isValid = false;
    } else {
      setTokenizedError('');
    }

    if (!itemImageUri) {
      setItemImageError(prevErrors => {
        return {
          ...prevErrors,
          itemImage: 'Item Image is required',
        };
      });
      isValid = false;
    } else {
      setItemImageError(prevErrors => ({
        ...prevErrors,
        itemImageUri: '',
      }));
    }

    return isValid;
  };

  const onToggle = (tok: number) => {
    setTokenized(tok);
    setTokenizedError('');
  };

  return (
    <Layout>
      <Header
        leftChildren={
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={goBack}>
              <BackIcon />
            </TouchableOpacity>
          </View>
        }
        title={false}
        centerTitle={editParams ? 'Update Item' : 'Add Sell Item'}
      />
      <View style={styles.qrContainer}>
        <ScrollView
          contentContainerStyle={{
            backgroundColor: themeColors.black,
          }}>
          <View>
            <View style={{paddingHorizontal: 24}}>
              <View style={styles.imageContainer}>
                {itemImageUri ? (
                  <TouchableOpacity>
                    <Image
                      style={styles.profile}
                      source={{
                        uri:
                          itemImageUri ||
                          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
                      }}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.selectButton}
                    onPress={handleOpenLiabrary}>
                    <Image source={require('../assets/images/upload.png')} />
                    <Text style={styles.selectButtonText}>
                      Click Here to Upload Image
                    </Text>
                    <Text style={styles.grayTxt}>Max File Size 10MB</Text>
                  </TouchableOpacity>
                )}
              </View>
              <Text style={styles.errorText}>
                {itemImageUri === undefined ? itemImageError.itemImage : ''}
              </Text>

              <InputFields
                title={'Title'}
                placholder={'Title of item to be sold'}
                value={itemValues.itemName}
                onChange={(e: any) => handleChange('itemName', e)}
              />
              <Text style={styles.errorText}>{inputErrors.itemName}</Text>
              <View style={styles.input}>
                <Text style={styles.inputText}>Description</Text>
                <TextInput
                  multiline
                  numberOfLines={4}
                  maxLength={40}
                  style={styles.inputField}
                  onChangeText={(e: any) => handleChange('itemDescription', e)}
                  value={itemValues.itemDescription}
                />
                <Text style={styles.errorText}>
                  {inputErrors.itemDescription}
                </Text>
              </View>
              <View>
                <Text style={styles.radioTitle}>Tokenized</Text>

                <View style={styles.radioInputMain}>
                  <View style={styles.radioMain}>
                    <TouchableOpacity
                      style={[
                        styles.radioOption,
                        tokenized === 1 && styles.radioOptionSelected,
                      ]}
                      onPress={() => onToggle(1)}
                    />
                    <Text
                      style={[
                        styles.radioOptionText,
                        tokenized === 1 && styles.radioOptSelText,
                      ]}>
                      Yes
                    </Text>
                  </View>
                  <View style={styles.radioMain}>
                    <TouchableOpacity
                      style={[
                        styles.radioOption,
                        tokenized === 0 && styles.radioOptionSelected,
                      ]}
                      onPress={() => onToggle(0)}
                    />
                    <Text
                      style={[
                        styles.radioOptionText,
                        tokenized === 0 && styles.radioOptSelText,
                      ]}>
                      No
                    </Text>
                  </View>
                </View>
                {tokenizedError && (
                  <Text style={styles.errorText}>{tokenizedError}</Text>
                )}
              </View>

              <InputFields
                title={'Address'}
                placholder={'Enter Items Contract Address'}
                value={itemValues.itemAddress}
                onChange={(e: any) => handleChange('itemAddress', e)}
              />
              <Text style={styles.errorText}>{inputErrors.itemAddress}</Text>
              <View>
                <Text style={styles.radioTitle}>Sale Type</Text>

                <View style={styles.radioInputMain}>
                  <View style={styles.radioMain}>
                    <TouchableOpacity
                      disabled
                      style={[
                        styles.radioOption,
                        transactionType === 1 && styles.radioOptionSelected,
                      ]}
                      onPress={() => setTransactionType(1)}
                    />
                    <Text
                      style={[
                        styles.radioOptionText,
                        transactionType === 1 && styles.radioOptSelText,
                      ]}>
                      Auction
                    </Text>
                  </View>
                  <View style={styles.radioMain}>
                    <TouchableOpacity
                      style={[
                        styles.radioOption,
                        transactionType === 2 && styles.radioOptionSelected,
                      ]}
                      onPress={() => setTransactionType(2)}
                    />
                    <Text
                      style={[
                        styles.radioOptionText,
                        transactionType === 2 && styles.radioOptSelText,
                      ]}>
                      Fixed
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <Text style={styles.inputTextPP}>Price</Text>

                <View style={styles.priceInputMain}>
                  <Image source={require('../assets/images/napa_icon.png')} />
                  <TextInput
                    keyboardType="numeric"
                    style={styles.priceInput}
                    placeholder="Enter sell price in NAPA tokens"
                    onChangeText={(e: any) => handleChange('price', e)}
                    value={itemValues.price}
                  />
                </View>
                <Text style={styles.errorText}>{inputErrors.price}</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.buyButton}>
          <TouchableOpacity
            onPress={onSubmit}
            activeOpacity={1.0}
            disabled={isLoading}
            style={styles.buy}>
            {isLoading ? (
              <ActivityIndicator
                size="small"
                color={themeColors.secondaryColor}
              />
            ) : (
              <Text style={styles.buyText}>
                {editParams ? 'Update Item' : 'Add'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default StreamTitleItem;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  qrContainer: {
    flex: 1,
    marginTop: 10,
  },
  input: {
    marginTop: moderateScale(30),
  },
  inputText: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '400',
    fontSize: size.s,
  },
  inputField: {
    borderWidth: 1,
    borderColor: themeColors.garyColor,
    paddingBottom: moderateScale(5),
    color: themeColors.primaryColor,
    borderRadius: 16,
    marginTop: 5,
  },
  radioTitle: {
    fontSize: size.vxlg,
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    marginBottom: 20,
    marginTop: 55,
  },
  radioMain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderRadius: 50,
    width: 30,
    height: 30,
    borderColor: themeColors.garyColor,
    backgroundColor: themeColors.transparent,
  },
  radioOptionSelected: {
    backgroundColor: themeColors.primaryColor,
    borderWidth: 7,
    borderRadius: 50,
    borderColor: themeColors.aquaColor,
  },
  radioOptionText: {
    marginLeft: 8,
    color: themeColors.garyColor,
  },
  radioOptSelText: {
    color: themeColors.primaryColor,
  },
  radioInputMain: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  buyButton: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 'auto',
    marginTop: 20,
  },
  buy: {
    backgroundColor: themeColors.aquaColor,
    width: Dimensions.get('window').width,
    paddingVertical: verticalScale(20),
  },
  buyText: {
    textAlign: 'center',
    color: themeColors.secondaryColor,
    fontSize: size.default,
    fontFamily: Fontfamily.Neuropolitical,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  selectButton: {
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: themeColors.garyColor,
    width: '100%',
    height: 240,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
  },
  selectButtonText: {
    color: '#FFFFFF',
    fontSize: size.s,
    marginVertical: 6,
  },
  grayTxt: {
    fontSize: size.s,
    color: themeColors.garyColor,
  },
  priceInputMain: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: themeColors.garyColor,
    paddingBottom: moderateScale(5),
    color: themeColors.primaryColor,
    alignItems: 'center',
  },
  priceInput: {
    color: themeColors.primaryColor,
    width: '90%',
    marginLeft: 10,
  },
  inputTextPP: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '400',
    fontSize: size.s,
    marginBottom: Platform.OS === 'ios' ? moderateScale(10) : moderateScale(0),
    marginTop: 30,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  profile: {
    height: verticalScale(100),
    width: verticalScale(250),
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#fff',
  },
});
