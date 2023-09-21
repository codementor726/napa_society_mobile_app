import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Modal,
  Image,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {LightCrossIcon} from '../assets/svg/LightCrossIcon';
import {themeColors} from '../theme/colors';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {NapaTokenIcon} from '../assets/svg/NapaTokenIcon';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {useSelector} from 'react-redux';
import {EthereumIcon, TetherIcon} from '../assets/svg';
type PreViewModalProps = {
  setIsPreViewModalVisible?: any;
  userName?: string;
  userAvatar?: string;
  amount?: string;
  SNFTTitle?: string;
  thumbnail?: string;
  currencyType?: string;
  duration?: string;
};
const PreViewModal: React.FC<PreViewModalProps> = ({
  setIsPreViewModalVisible,
  amount,
  SNFTTitle,
  thumbnail,
  duration,
  currencyType,
}) => {
  const user = useSelector(selectProfileList);

  return (
    <>
      <Modal animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={10}
            overlayColor="transparent"
            reducedTransparencyFallbackColor="white"
          />
          <View style={styles.modalMainContainer}>
            <View style={styles.modalChildContainer}>
              <ImageBackground
                resizeMode="contain"
                source={{uri: thumbnail}}
                style={styles.backgroundImage}
                imageStyle={{borderRadius: 24}}>
                <View style={styles.profileContainer}>
                  <Image
                    style={styles.imageStyle}
                    resizeMode="cover"
                    source={{
                      uri:
                        user?.avatar ||
                        'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png',
                    }}
                  />
                  <Text style={styles.profileName}>{user?.profileName}</Text>
                </View>
                <View style={styles.footerView}>
                  <Text style={styles.labelStyle}>{SNFTTitle}</Text>

                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <View
                      style={[
                        styles.tokenContainer ]}>
                      <View>
                        <Text style={[styles.tokenPrice, {}]}>Sell Price</Text>
                        <View style={{flexDirection:'row'}}>
                        <View style={[styles.tokenIcon, {}]}>
                          {currencyType === 'NAPA' ? (
                            <NapaTokenIcon
                              bgColor={themeColors.aquaColor}
                              iconColor={themeColors.black}
                              height={25}
                              width={25}
                            />
                          ) : currencyType === 'USDT' ? (
                            <TetherIcon
                              bgColor="#FFD978"
                              iconColor="white"
                              width={25}
                              height={25}
                            />
                          ) : (
                            currencyType === 'ETH' && (
                              <EthereumIcon
                                bgColor="#6481E7"
                                iconColor={themeColors.primaryColor}
                                width={25}
                                height={25}
                              />
                            )
                          )}
                        </View>
                        <Text style={styles.tokenPrice}>
                          {!amount ? '--' : amount}
                        </Text>
                        </View>
                      </View>
                    </View>

                    <View style={[styles.tokenContainer]}>
                      <View>
                        <Text style={[styles.tokenPrice]}>Ending in</Text>
                        <Text style={[styles.tokenPrice]}>
                          {!duration ? '--' : duration}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
            <View style={styles.bottomStyle}>
              <TouchableOpacity
                onPress={() => setIsPreViewModalVisible(false)}
                style={styles.crossStyle}>
                <LightCrossIcon opacity={2}  />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
export default PreViewModal;

const styles = StyleSheet.create({
  labelStyle: {
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: 32,
    color: 'white',
    fontWeight: '400',
    marginBottom: verticalScale(20),
    width: moderateScale(300),
  },
  footerView: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 16,
    marginBottom: verticalScale(20),
  },

  backgroundImage: {
    width:
      Dimensions.get('window').width <= 337
        ? moderateScale(300)
        : moderateScale(359),
    height:
      Dimensions.get('window').width <= 337
        ? moderateScale(350)
        : moderateScale(448),
    borderRadius: 10,
    marginTop: 34,
    alignSelf: 'center',
    opacity: 0.8,
  },
  profileContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(20),
    marginLeft: moderateScale(20),
    alignItems: 'center',
  },
  profileName: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.lg,
    fontWeight: '500',
  },
  bottomStyle: {
    justifyContent: 'flex-end',
    flex: 1,
    alignItems: 'center',
  },

  imageStyle: {
    marginRight: moderateScale(10),
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  tokenPrice: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Grostestk,
    fontSize: size.lg,
    fontWeight: '700',
  },
  tokenName: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Grostestk,
    fontSize: size.lg,
    fontWeight: '700',
    marginLeft: moderateScale(10),
  },
  tokenIcon: {
    marginRight: moderateScale(10),
  },
  modalChildContainer: {
    flex: 1,
    marginTop:  Dimensions.get('window').width <= 337
    ?moderateScale(150) : moderateScale(120),
  },
  modalMainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  titleStyle: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.xlg,
    color: themeColors.primaryColor,
    textAlign: 'center',
  },
  tokenContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  crossStyle: {
    marginVertical:
      Dimensions.get('window').height <= 781
        ? moderateScale(8)
        : moderateScale(25),
    marginBottom: verticalScale(40),
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
  modalContainer: {
    flex: 1,
  },
});
