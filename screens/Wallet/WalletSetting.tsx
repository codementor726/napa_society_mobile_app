import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import Layout from '../../common/Layout';
import Header from '../../common/Header';
import {BackIcon, ForwardIcon, ImportIcon} from '../../assets/svg';
import {themeColors} from '../../theme/colors';
import {size} from '../../theme/fontstyle';
import {Fontfamily} from '../../theme/fontFamily';
import {moderateScale} from 'react-native-size-matters';
import RadioButtonComponent from '../../common/RadioButtonComponent';
import {AccountIcon} from '../../assets/svg/AccountIcon';
import {AddIcon} from '../../assets/svg/AddIcon';
import {CurrencyIcon} from '../../assets/svg/CurrencyIcon';
import {PolicyIcon} from '../../assets/svg/PolicyIcon';
import {SCREENS} from '../../typings/screens-enums';
import {switchNapaAccount} from '../../services/napaAccounts';
import {useDispatch, useSelector} from 'react-redux';
import {selectProfileList} from '../../store/selectors/profileDetailSelector';
import {
  selectAccountList,
  selectNapaWallet,
  selectNetworkType,
} from '../../store/selectors/NapaAccount';
import {WEBSOCKET_URL} from '../../const/Url';
import {
  fetchAccountData,
  setActiveWallet,
  setactiveWalletAddress,
} from '../../store/slices/NapaAccount';
import {addStreamAddress} from '../../services/AssetManagement';
import {handleGetImportedTokens} from '../../utils/helper';
import {setSelectedTokenList, setTokenList} from '../../store/slices/TokenList';
import {setMintedPost} from '../../store/slices/MintedSNFT';
import {selectSelectedTokenList} from '../../store/selectors/TokenList';

type SettingComponentProps = {
  title?: string;
  subTitle?: string;
  iconChildren?: React.ReactNode;
  containerStyle?: any;
  isRightIcon?: boolean;
  onPress?: any;
};
const WalletSettingScreen = () => {
  const {goBack, navigate} = useNavigation<any>();
  const currentActive = useSelector(selectNapaWallet);
  const socketRef = useRef<any>(null);
  const profileId = useSelector(selectProfileList)?.profileId;
  const networkType = useSelector(selectNetworkType)?.value;
  const dispatch = useDispatch();
  const account = useSelector(selectAccountList);
  const token = useSelector(selectSelectedTokenList);

  const onAccountPress = async (address: string) => {
    console.log(address, 'item');
    const {error}: any = await switchNapaAccount(profileId, address);
    if (error) {
      console.log(error, 'errorrr');
      return;
    }
  };

  const connectToGeneralServices = () => {
    if (profileId && socketRef.current == null) {
      socketRef.current = new WebSocket(WEBSOCKET_URL);
      socketRef.current.addEventListener('message', async ({data}: any) => {
        const response = JSON.parse(data);
        if (response?.event === `new-napa-account-${profileId}`) {
          dispatch(fetchAccountData(profileId));
        }
        if (response.event === `switch-to-new-napa-account-${profileId}`) {
          dispatch(setMintedPost([]));
          const activeWalletAC = response?.account?.activeWalletAC;
          dispatch(setActiveWallet(activeWalletAC));
          dispatch(
            setactiveWalletAddress(
              response?.account[`NWA_${activeWalletAC}_AC`],
            ),
          );
          await addStreamAddress(response?.account[`NWA_${activeWalletAC}_AC`]);
        }
        if (response.event === `delete-napa-account-${profileId}`) {
          dispatch(fetchAccountData(profileId));
        }
        if (response?.event === 'new-imported-token') {
          handleGetImportedTokens(
            profileId,
            account,
            currentActive,
            networkType,
          )
            .then(tokenList => {
              const napaToken = tokenList.find(
                (token: any) => token.symbol == 'NAPA',
              );
              if (napaToken) {
                dispatch(setSelectedTokenList(napaToken));
              } else {
                dispatch(setSelectedTokenList(tokenList[0]));
              }
              dispatch(setTokenList(tokenList));
            })
            .catch(error => console.log(error, 'error'));
        }
        if (response.event === `delete-napa-account-${profileId}`) {
          dispatch(fetchAccountData(profileId));
        }
      });
    }
  };

  useEffect(() => {
    connectToGeneralServices();
    if (socketRef.current) {
      socketRef.current.onclose = (e: any) => {
        console.log(
          'General Services Socket is closed. Reconnect will be attempted in 1 second.',
          e.reason,
        );
        setTimeout(() => {
          if (socketRef.current) {
            connectToGeneralServices();
          }
        }, 1000);
      };
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [profileId]);

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
        children={<Text style={styles.accountName}>Wallet Settings</Text>}
        width={'80%'}
        rightChildrenWidth={'10%'}
        leftChildrenWidth={'10%'}
      />

      <View style={{height: moderateScale(20)}}></View>
      <ScrollView>
        {account?.map((item: any, index: number) => {
          if (
            item[`NWA_${index + 1}_ST`] &&
            item[`NWA_${index + 1}_ST`] == '2'
          ) {
            return null;
          }
          return (
            <View key={index}>
              <RadioButtonComponent
                item={item}
                onPress={() => onAccountPress(item[`NWA_${index + 1}_AC`])}
                title={item[`NWA_${index + 1}_NE`]}
                subTitle={item[`NWA_${index + 1}_Type`]}
                isSelected={index + 1 == currentActive ? true : false}
                titleStyle={styles.titleStyle}
                iconChildren={
                  <AccountIcon
                    bgColor={
                      index + 1 == currentActive
                        ? themeColors.aquaColor
                        : themeColors.darkGray
                    }
                    iconColor={
                      index + 1 == currentActive
                        ? themeColors.black
                        : themeColors.primaryColor
                    }
                  />
                }
              />
            </View>
          );
        })}

        <SettingComponent
          title={'Add Account'}
          onPress={() => {
            navigate(SCREENS.ADDIMPORTACCOUNT, {type: 'Add'});
          }}
          iconChildren={<AddIcon />}
        />
        <SettingComponent
          title={'Import Account'}
          onPress={() => {
            navigate(SCREENS.ADDIMPORTACCOUNT, {type: 'Import'});
          }}
          iconChildren={
            <ImportIcon
              height={25}
              width={25}
              color={themeColors.primaryColor}
            />
          }
        />

        <View style={styles.lineContainer}></View>

        <SettingComponent
          title={'Default Currency'}
          containerStyle={styles.containerStyle}
          iconChildren={<CurrencyIcon />}
          subTitle={token?.symbol}
          isRightIcon={true}
          onPress={() => {
            navigate(SCREENS.WALLETCURRENCY);
          }}
        />
        <SettingComponent
          title={'Secret Recovery Phrase'}
          containerStyle={styles.containerStyle}
          iconChildren={<PolicyIcon />}
          isRightIcon={true}
          onPress={() => {
            navigate(SCREENS.RECOVERYPHRASE);
          }}
        />
      </ScrollView>
    </Layout>
  );
};

export default WalletSettingScreen;
const styles = StyleSheet.create({
  childStyle: {
    width: '20%',
  },
  centerStyle: {
    width: '55%',
  },
  iconContianer: {
    height: 48,
    width: 48,
  },
  titleStyle: {
    fontSize: size.md,
  },
  accountContainer: {
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(22),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'tan',
  },
  iconMainContainer: {
    height: 48,
    width: 48,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: themeColors.garyColor,
  },
  textContianer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenNameContainer: {
    flex: 1,
    paddingLeft: moderateScale(10),
  },
  tokenName: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.md,
    fontWeight: '500',
    color: themeColors.primaryColor,
  },

  lineContainer: {
    height: 1,
    backgroundColor: themeColors.garyColor,
    marginVertical: moderateScale(15),
  },
  token: {
    color: themeColors.garyColor,
    fontSize: size.s,
    fontFamily: Fontfamily.Avenier,
  },
  containerStyle: {
    borderWidth: 0,
    backgroundColor: themeColors.darkGray,
  },
  forwardContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  accountName: {
    color: themeColors.primaryColor,
    fontSize: size.lg,
    fontWeight: '500',
    fontFamily: Fontfamily.Avenier,
  },
});

const SettingComponent = ({
  title,
  iconChildren,
  subTitle,
  containerStyle,
  isRightIcon,
  onPress,
}: SettingComponentProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.accountContainer}>
      <View style={styles.textContianer}>
        <View style={{...styles.iconMainContainer, ...containerStyle}}>
          {iconChildren}
        </View>
        <View style={styles.tokenNameContainer}>
          <Text numberOfLines={1} style={styles.tokenName}>
            {title}
          </Text>
          {subTitle && <Text style={styles.token}>{subTitle}</Text>}
        </View>
      </View>
      {isRightIcon && (
        <View style={styles.forwardContainer}>
          <ForwardIcon />
        </View>
      )}
    </TouchableOpacity>
  );
};
