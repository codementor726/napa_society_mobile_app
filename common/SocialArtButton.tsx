import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
type SocialButtonProps = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
};

const SocialArtButton: React.FC<SocialButtonProps> = ({title, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SocialArtButton;
const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(20),
    paddingHorizontal: moderateScale(8),
  },
  button: {
    backgroundColor: themeColors.cardsColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateScale(15),
    borderRadius: 24,
  },
  text: {
    color: themeColors.aquaColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.default,
    fontWeight: '500',
  },
});
