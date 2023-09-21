import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from 'react-native';
import {RightIcon} from '../assets/svg/RightIcon';
import {moderateScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {switchNapaAccount} from '../services/napaAccounts';
import {useSelector} from 'react-redux';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {selectNapaWallet} from '../store/selectors/NapaAccount';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {LightCrossIcon} from '../assets/svg/LightCrossIcon';
import {BlurView} from '@react-native-community/blur';
import {AccountIcon} from '../assets/svg/AccountIcon';

type CustomDropdownProps = {
  data: any;
  selectedOption?: any;
};

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  data,
  selectedOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const profileId = useSelector(selectProfileList)?.profileId;
  const currentActive = useSelector(selectNapaWallet);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = async (accountAddress: any) => {
    const {error}: any = await switchNapaAccount(profileId, accountAddress);
    if (error) {
      console.log(error, 'errorrr');
      return;
    }
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdownHeader} onPress={toggleDropdown}>
        <Text style={styles.dropdownHeaderText}>{selectedOption}</Text>
        <Image
          source={require('../assets/icons/arrow_down.png')}
          style={styles.headerIcon}
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdownOptions}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={isOpen}
            onRequestClose={() => {
              setIsOpen(false);
            }}>
            <BlurView
              style={styles.absolute}
              blurType="light"
              blurAmount={10}
              overlayColor="transparent"
              reducedTransparencyFallbackColor="white"
            />

            <View
              style={{
                justifyContent: 'flex-end',
                flexDirection: 'column',
                height: '90%',
              }}>
              {data?.map((option: any, index: number) => {
                if (
                  option[`NWA_${index + 1}_ST`] &&
                  option[`NWA_${index + 1}_ST`] == '2'
                ) {
                  return null;
                }
                return (
                  <>
                    <View key={index} style={styles.modalContainer}>
                      <View style={styles.modalMainContainer}>
                        <TouchableOpacity
                          key={index}
                          style={styles.optionItem}
                          onPress={() =>
                            selectOption(option[`NWA_${index + 1}_AC`])
                          }>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <AccountIcon
                              bgColor={
                                index + 1 == currentActive
                                  ? themeColors.aquaColor
                                  : themeColors.darkGray
                              }
                            />
                            <Text style={styles.dropdownOption}>
                              {option[`NWA_${index + 1}_NE`]}
                            </Text>
                          </View>
                          {index + 1 == currentActive && (
                            <RightIcon height={15} width={15} />
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                );
              })}
            </View>

            <TouchableOpacity
              onPress={() => setIsOpen(false)}
              style={styles.crossStyle}>
              <LightCrossIcon />
            </TouchableOpacity>
          </Modal>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // position: 'relative',
    // width: '100%',
    // maxWidth: moderateScale(150),
    // zIndex: 1,
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  dropdownHeaderText: {
    fontSize: 16,
    color: 'white',
  },
  dropdownOptions: {
    // position: 'absolute',
    // top: '100%',
    // width: '100%',
    // backgroundColor: 'black',
    // borderWidth: 1,
    // borderColor: themeColors.garyColor,
    // borderRadius: 5,
    // marginTop: 5,
    // maxHeight: 250,
    // overflow: 'scroll',
  },
  optionItem: {
    padding: 10,
    // backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIcon: {
    marginTop: 4.5,
    marginLeft: 10,
  },
  dropdownOption: {
    paddingLeft: moderateScale(10),
    color: 'white',
  },
  modalContainer: {
    justifyContent: 'flex-end',
    height: 90,
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
    // alignItems: 'center',
    justifyContent: 'flex-end',
    // backgroundColor: 'red',
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
    color: themeColors.primaryColor,
    textAlign: 'center',
  },
  crossStyle: {
    marginVertical: moderateScale(25),
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonView: {
    height: moderateScale(35),
    width: moderateScale(100),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(22),
  },
});

export default CustomDropdown;
