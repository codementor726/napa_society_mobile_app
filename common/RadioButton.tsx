import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {size} from '../theme/fontstyle';
import {Fontfamily} from '../theme/fontFamily';
import React from 'react';

type RadioButtonProps = {
  item?: any;
  onPress?: any;
  isSelected?: boolean;
  title?: string;
  subTitle?: string;
  titleStyle?: any;
};
const RadioButton: React.FC<RadioButtonProps> = ({
  item,
  onPress,
  isSelected,
  title,
  titleStyle,
}) => {
  return (
    <>
      <View key={item?.id} style={styles.mainContainer}>
        <Pressable
          onPress={() => {
            onPress(item);
          }}>
          <View style={styles.firstCointanierItem}>
            <View
              style={[
                isSelected
                  ? styles.checkedRadioBoxContainer
                  : styles.radioBoxContainer,
              ]}>
              <View
                style={[
                  isSelected ? styles.checkedRadioBox : styles.radioBox,
                ]}></View>
            </View>

            <View style={styles.tokenNameContainer}>
              <Text
                numberOfLines={1}
                style={{...styles.tokenName, ...titleStyle}}>
                {title}
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
    </>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 2,
    marginTop: 4,
  },
  firstCointanierItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioBoxContainer: {
    borderColor: themeColors.garyColor,
    padding: 2,
    borderWidth: 3,
    borderRadius: 15,
  },
  checkedRadioBoxContainer: {
    borderColor: themeColors.aquaColor,
    padding: 2,
    borderWidth: 3,
    borderRadius: 15,
  },
  radioBox: {
    backgroundColor: themeColors.black,
    alignItems: 'center',
    padding: 9,
    borderRadius: 12,
  },
  checkedRadioBox: {
    backgroundColor: themeColors.aquaColor,
    borderColor: themeColors.aquaColor,
    alignItems: 'center',
    padding: 9,
    borderRadius: 12,
  },
  tokenNameContainer: {
    flex: 1,
    paddingLeft: moderateScale(10),
  },
  tokenName: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
    color: themeColors.primaryColor,
  },
});
