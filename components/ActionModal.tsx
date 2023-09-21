import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {themeColors} from '../theme/colors';
import {moderateScale} from 'react-native-size-matters';
import {BlurView} from '@react-native-community/blur';
import {LightCrossIcon} from '../assets/svg/LightCrossIcon';

type ActionModalProps = {
  heading?:string;
  Optionmodal1?:string;
  Optionmodal2?:string;
  Optionmodal3?:string;
  isVisible?: boolean;
  isIndex?: number;
  handleCloseActionModal: () => void;
  handleSelectOption: (index: any) => void;
};

const ActionModal: React.FC<ActionModalProps> = ({
  isVisible,
  isIndex,
  heading,
  Optionmodal1,
  Optionmodal2,
  Optionmodal3,
  handleCloseActionModal,
  handleSelectOption,
}) => {
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
      >
        <View style={styles.modalContainer}>
          <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={10}
            overlayColor="transparent"
            reducedTransparencyFallbackColor="white"
          />
          <View style={styles.modalMainContainer}>
          <Text style={styles.titleStyle}>{heading || ''}</Text>
            <TouchableOpacity
              style={styles.buttonView}
              onPress={() => {
                handleSelectOption(0);
              }}>
              <Text
                style={[
                  styles.subtitleStyle,
                  {
                    color:
                      isIndex === 0
                        ? themeColors.aquaColor
                        : themeColors.primaryColor,
                  },
                ]}>
                {Optionmodal1}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonView}
              onPress={() => {
                handleSelectOption(1);
              }}>
              <Text
                style={[
                  styles.subtitleStyle,
                  {
                    color:
                      isIndex === 1
                        ? themeColors.aquaColor
                        : themeColors.primaryColor,
                  },
                ]}>
                {Optionmodal2}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonView}
              onPress={() => {
                handleSelectOption(2);
              }}>
              <Text
                style={[
                  styles.subtitleStyle,
                  {
                    color:
                      isIndex === 2
                        ? themeColors.aquaColor
                        : themeColors.primaryColor,
                  },
                ]}>
                {Optionmodal3}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCloseActionModal}
              style={styles.crossStyle}>
              <LightCrossIcon />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ActionModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    // backgroundColor: 'red',
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
    // backgroundColor: 'tan',
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
    fontWeight: '400',
    // color: themeColors.primaryColor,
    textAlign: 'center',
  },
  crossStyle: {
    marginVertical: moderateScale(25),
  },
  buttonView: {
    height: moderateScale(35),
    // width: moderateScale(100),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(22),
  },
});
