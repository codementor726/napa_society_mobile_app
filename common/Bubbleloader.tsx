import React, {useEffect, useRef} from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';

const Bubbleloader = () => {
  const dotSize = 10;
  const dotSpacing = 5;
  const animationDuration = 300;

  const firstDotOpacity = useRef(new Animated.Value(0.3)).current;
  const secondDotOpacity = useRef(new Animated.Value(0.3)).current;
  const thirdDotOpacity = useRef(new Animated.Value(0.3)).current;
  const forthDotOpacity = useRef(new Animated.Value(0.3)).current;

  const animateDots = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(firstDotOpacity, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(secondDotOpacity, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(thirdDotOpacity, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(forthDotOpacity, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(firstDotOpacity, {
          toValue: 0.3,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(secondDotOpacity, {
          toValue: 0.3,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(thirdDotOpacity, {
          toValue: 0.3,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(forthDotOpacity, {
          toValue: 0.3,
          duration: animationDuration,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  useEffect(() => {
    animateDots();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, {opacity: firstDotOpacity}]} />
      <View style={{width: dotSpacing}} />
      <Animated.View style={[styles.dot, {opacity: secondDotOpacity}]} />
      <View style={{width: dotSpacing}} />
      <Animated.View style={[styles.dot, {opacity: thirdDotOpacity}]} />
      <View style={{width: dotSpacing}} />
      <Animated.View style={[styles.dot, {opacity: forthDotOpacity}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: moderateScale(12),
    height: verticalScale(12),
    borderRadius: 5,
    backgroundColor: 'white',
  },
});

export default Bubbleloader;
