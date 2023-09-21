import {
  ActivityIndicator,
  Platform,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Layout from '../common/Layout';
import {BackIcon} from '../assets/svg';
import ChatIcon from '../assets/svg/ChatIcon';
import Header from '../common/Header';
import {useNavigation} from '@react-navigation/native';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {TextInput} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {size} from '../theme/fontstyle';
import {sendEmailtoSupport} from '../services/HelpSupportApi';
import {useSelector} from 'react-redux';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import ErrorToast from '../common/toasters/ErrorToast';
import {useToast} from 'react-native-toast-notifications';
import ContinueButton from '../common/ContinueButton';
import {BlurView} from '@react-native-community/blur';

interface emailSupport {
  title?: string;
  description?: string;
}

const Help = () => {
  const {goBack} = useNavigation<any>();
  const userEmail: any = useSelector(selectProfileList)?.emailAddress;
  const toast = useToast();
  const [isHelpModal, setIsHelpModal] = React.useState(false);
  const [describeProblem, setDescribeProblem] = useState<emailSupport>({
    title: '',
    description: '',
  });
  const [errors, setErrors] = useState<emailSupport>({
    title: '',
    description: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSendEmailclick = async () => {
    setErrors({
      title: '',
      description: '',
    });
    if (!describeProblem.title) {
      setErrors(prev => {
        return {
          ...prev,
          title: 'Title is Required',
        };
      });
    }
    if (!describeProblem?.description) {
      setErrors(prev => {
        return {
          ...prev,
          description: 'Description is Required',
        };
      });
    }
    if (!describeProblem?.title || !describeProblem?.description) return;
    setIsLoading(true);
    const {error, message} = await sendEmailtoSupport(
      userEmail,
      describeProblem?.title,
      describeProblem?.description,
      Platform.OS == 'ios' ? 'IOS' : 'Android',
    );
    if (error) {
      toast.show(<ErrorToast message={message} />, {
        placement: 'top',
      });
      setIsLoading(false);
    }
    if (!error) {
      setDescribeProblem({
        title: '',
        description: '',
      });
      setIsHelpModal(true);
      setTimeout(() => {
        setIsHelpModal(false);
      }, 5000);
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Header
        leftChildren={
          <TouchableOpacity onPress={() => goBack()}>
            <BackIcon color="white" />
          </TouchableOpacity>
        }
        sizeprop={size.md}
        title={false}
        centerTitle="Help & Support"
        rightChildren={
          <TouchableOpacity>
            <ChatIcon color={themeColors.garyColor} />
          </TouchableOpacity>
        }
      />
      <View style={styles.container}>
        <View>
          <View style={{marginBottom: verticalScale(20)}}>
            <Text style={styles.text}>Subject</Text>
            <TextInput
              editable={!isLoading}
              value={describeProblem.title}
              onChangeText={describeProblem =>
                setDescribeProblem((prev: any) => ({
                  ...prev,
                  title: describeProblem,
                }))
              }
              multiline={true}
              style={styles.titleInput}
            />
            {errors.title && (
              <Text style={styles.errorText}>{errors.title}</Text>
            )}
          </View>
          <View>
            <Text style={styles.text}>Tell us yor issue</Text>
            <TextInput
              editable={!isLoading}
              value={describeProblem.description}
              onChangeText={describeProblem =>
                setDescribeProblem((prev: any) => ({
                  ...prev,
                  description: describeProblem,
                }))
              }
              numberOfLines={10}
              multiline={true}
              style={styles.descriptionInput}
            />
            <View style={{marginTop: verticalScale(20)}}>
              {errors.description && (
                <Text style={styles.errorText}>{errors.description}</Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.footerStyle}>
          {isLoading ? (
            <View style={styles.buyLoader}>
              <ActivityIndicator
                size="large"
                color={themeColors.primaryColor}
              />
            </View>
          ) : (
            <ContinueButton
              title="Send"
              isDisabled={isLoading}
              onPress={handleSendEmailclick}
            />
          )}
        </View>
      </View>

      <Modal animationType="fade" transparent={true} visible={isHelpModal}>
        <View style={styles.modalContainer}>
          <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={10}
            overlayColor="transparent"
            reducedTransparencyFallbackColor="white"
          />
          <View style={styles.modalMainContainer}>
            <View>
              <Text style={[styles.modalLogoutText]}>Thank You</Text>
              <Text style={[styles.modalDescription]}>
                Thanks for contacting NAPA support, we will get back to you
                shortly
              </Text>
            </View>
            <View style={[styles.bottonContainer]}>
              <TouchableOpacity
                onPress={() => {
                  setIsHelpModal(false);
                }}>
                <Text style={[styles.modalText]}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Layout>
  );
};

export default Help;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',

    marginTop: moderateScale(20),
  },
  text: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '400',
    fontSize: size.sl,
    marginLeft: moderateScale(35),
  },
  titleInput: {
    marginBottom: verticalScale(20),
    marginHorizontal: moderateScale(22),
    paddingHorizontal: moderateScale(15),
    borderBottomWidth: 1,
    borderColor: themeColors.garyColor,
    borderRadius: 15,
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    textAlignVertical: 'top',
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
  sellBtn: {
    height: 60,
    backgroundColor: themeColors.aquaColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeSellBtn: {
    fontFamily: Fontfamily.Neuropolitical,
    color: 'black',
    fontSize: 14,
  },
  errorText: {
    color: themeColors.lightred,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '400',
    fontSize: size.sl,
    marginLeft: moderateScale(35),
  },
  buyLoader: {
    backgroundColor: themeColors.aquaColor,
    paddingVertical: moderateScale(15),
  },
  footerStyle: {},
  modalContainer: {
    flex: 1,
  },
  modalMainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalLogoutText: {
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.vxlg,
    color: themeColors.primaryColor,
    fontWeight: '400',
    textAlign: 'center',
  },
  modalDescription: {
    marginTop: moderateScale(10),
    marginBottom: moderateScale(20),
    fontFamily: Fontfamily.Avenier,
    fontSize: size.md,
    color: themeColors.primaryColor,
    fontWeight: '500',
    textAlign: 'center',
  },
  modalText: {
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.md,
    color: themeColors.primaryColor,
    fontWeight: '400',
    textAlign: 'center',
  },
  bottonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
