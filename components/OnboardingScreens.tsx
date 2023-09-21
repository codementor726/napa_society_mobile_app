import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import OnboardingPost from '../common/onboardingScreens/OnboardingPost';
import OnboardingMint from '../common/onboardingScreens/OnboardingMint';
import OnboardingEarning from '../common/onboardingScreens/OnboardingEarning';
import OnboardingEarnmore from '../common/onboardingScreens/OnboardingEarnmore';
import OnboardingEcosystem from '../common/onboardingScreens/OnboardingEcosystem';
import {useNavigation} from '@react-navigation/native';
import {Fontfamily} from '../theme/fontFamily';
import {themeColors} from '../theme/colors';
import {size} from '../theme/fontstyle';
import ContinueButton from '../common/ContinueButton';
import Header from '../common/Header';
import {SCREENS} from '../typings/screens-enums';
import {BackIcon} from '../assets/svg';
import Layout from '../common/Layout';

const OnboardingScreens = () => {
  const {goBack, navigate} = useNavigation<any>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const flatListRef = useRef<any>(FlatList);
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const onboardScreens = [
    <OnboardingPost />,
    <OnboardingMint />,
    <OnboardingEarning />,
    <OnboardingEarnmore />,
    <OnboardingEcosystem />,
  ];
  const handleScroll = (event: any) => {
    const newIndex = Math.floor(
      event.nativeEvent.contentOffset.x / SCREEN_WIDTH,
    );
    setCurrentIndex(newIndex);
    setScrollEnabled(true);
  };
  const nextPress = (index: number) => {
    if (index === 4) {
      navigate(SCREENS.SOCIALART);
    } else {
      flatListRef?.current?.scrollToIndex({
        animated: true,
        index: index + 1,
      });
    }
  };
  const backPress = (index: number) => {
    if (index === 0) {
      goBack();
    } else {
      console.log('index', index);

      flatListRef?.current?.scrollToIndex({
        animated: true,
        index: index - 1,
      });
    }
  };
  return (
    <FlatList
      data={onboardScreens}
      horizontal
      pagingEnabled
      ref={flatListRef}
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}: any) => {
        return (
          <Layout>
            <View style={styles.container} key={index}>
              <Header
                leftChildren={
                  <TouchableOpacity onPress={() => backPress(index)}>
                    <BackIcon />
                  </TouchableOpacity>
                }
                title={false}
                centerTitle=""
                rightChildren={
                  <TouchableOpacity onPress={() => navigate(SCREENS.SOCIALART)}>
                    <Text style={[styles.headerText]}>Skip</Text>
                  </TouchableOpacity>
                }
              />
              {item}
              <ContinueButton title="Continue" onPress={() => nextPress(index)} />
            </View>
          </Layout>
        );
      }}
      keyExtractor={(item, index) => index.toString()}
      onScroll={handleScroll}
      scrollEnabled={scrollEnabled}
    />
  );
};

export default OnboardingScreens;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: Fontfamily.Neuropolitical,
    color: themeColors.aquaColor,
    fontSize: size.md,
    fontWeight: '400',
  },
  container: {
    width: Dimensions.get('window').width,
    flex: 1,
    justifyContent: 'center',
  },
});
