import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {BackIcon} from '../assets/svg';
import Header from '../common/Header';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import Layout from '../common/Layout';
import {SCREENS} from '../typings/screens-enums';
import { filteredImages } from '../const/filteredImage';

const FilteredImage = ({source}: any) => {
  const editTabs = [
    'Crop',
    'Filters',
    'Blur',
    'Color',
    'Effects',
    'Light',
    'Brightness',
  ];
  // const CombinedFiltersImage = (imageProps: any) => (
  //   <ColorMatrix matrix={concatColorMatrices(sepia(), tint(1.25))}>
  //     <Image {...imageProps} />
  //   </ColorMatrix>
  // );
  // const GrayscaledImage = (imageProps: any) => (
  //   <Grayscale>
  //     <Image {...imageProps} />
  //   </Grayscale>
  // );
  // const ColorMatrixImage = (imageProps: any) => (
  //   <ColorMatrix
  //     matrix={concatColorMatrices(saturate(-0.9), contrast(5.2), invert())}>
  //     <Image {...imageProps} />
  //   </ColorMatrix>
  // );
  const {goBack, navigate} = useNavigation<any>();
  return (
    <>
      <Layout>
        <Header
          leftChildren={
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={goBack}>
                <BackIcon color={'#677778'} />
              </TouchableOpacity>
            </View>
          }
          title={false}
          centerTitle="Edit"
        />
        <View style={styles.imageContaner}>
          <Image
            source={require('../assets/images/EventBackground.png')}
            style={styles.imageContanerchild}
          />
        </View>
        <View style={styles.editTabsConatiner}>
          <ScrollView horizontal>
            {editTabs.map((items, index) => {
              return (
                <View style={styles.editTabs} key={index}>
                  <Text style={styles.editTabsTitle}>{items}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <ScrollView horizontal>
          {/* <Image source={require('../assets/images/EventBackground.png')} /> */}
          {filteredImages.map((Value: any, index) => {
            return (
              <View style={styles.filtersContainer}>
                <Value
                  style={styles.filterss}
                  source={require('../assets/images/EventBackground.png')}
                />
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.continueButton}>
          <TouchableOpacity
            onPress={() => navigate(SCREENS.CREATENEWPOSTDETAIL)}
            style={styles.Continue}>
            <Text style={styles.ContinueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </Layout>
    </>
  );
};
export default FilteredImage;
const styles = StyleSheet.create({
  imageContaner: {
    paddingTop: verticalScale(20),
    marginLeft: moderateScale(20),
    marginRight: moderateScale(20),
  },
  imageContanerchild: {
    width: moderateScale(350),
    borderRadius: 20,
    height: verticalScale(300),
    resizeMode: 'cover',
  },
  editTabsConatiner: {
    paddingVertical: 29,
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10),
  },
  editTabs: {
    marginRight: moderateScale(25),
    borderColor: themeColors.cardsColor,
    borderWidth: 1.5,
    borderRadius: 24,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  editTabsTitle: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.default,
  },
  filtersContainer: {
    margin: moderateScale(10),
  },
  filterss: {
    borderRadius: 20,
    width: moderateScale(100),
    height: verticalScale(100),
  },
  continueButton: {
    justifyContent: 'flex-end',
    backgroundColor: themeColors.cardsColor,
  },
  Continue: {
    backgroundColor: themeColors.aquaColor,
    paddingVertical: verticalScale(22),
  },
  ContinueText: {
    textAlign: 'center',
    color: themeColors.secondaryColor,
    fontSize: size.default,
    fontWeight: '400',
    fontFamily: Fontfamily.Neuropolitical,
  },
});
