import {
  View,
  ViewStyle,
  StyleProp,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {themeColors} from '../theme/colors';

type LoaderButtonProps = {
  containerStyle?: StyleProp<ViewStyle>;
};

const LoaderButton: React.FC<LoaderButtonProps> = ({containerStyle}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
};

export default LoaderButton;

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: themeColors.aquaColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    marginTop: 20,
  },
});
