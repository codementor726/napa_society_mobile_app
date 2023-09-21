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
type SectionHeaderProps = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({title, onPress}) => {
  return (
    <View style={styles.Textcontainer}>
      <Text style={styles.assets}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.assetsView}>View All</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SectionHeader;
const styles = StyleSheet.create({
  Textcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(3),
  },
  assets: {
    color: themeColors.primaryColor,
    fontSize: size.lg,
    fontFamily: Fontfamily.Neuropolitical,
  },
  assetsView: {
    color: themeColors.aquaColor,
    fontSize: size.md,
    fontFamily: Fontfamily.Neuropolitical,
  },
});
