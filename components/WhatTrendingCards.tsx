import React from 'react';
import {View, Text, StyleSheet, Platform, Image, FlatList} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import SectionHeader from '../common/SectionHeader';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../typings/screens-enums';

const data = [
  {
    id: '1',
    title: 'NAPA Society',
    date: 'Wed,12 Jan  15:45',
    heading: 'Create an Amazing Trending Article on NAPA',
    description:
      'Create and list your latest trending blogs with NAPA Society - trending@napasociety.io',
  },
  // {
  //   id: '2',
  //   title: 'Tom Bradley',
  //   date: 'Wed,12 Jan  15:45',
  //   heading: 'How do some influencers make money?',
  //   description:
  //     'We all see the glamorous lives of our favourite influencers and the lifestyles',
  // },
  // {
  //   id: '3',
  //   title: 'Tom Bradley',
  //   date: 'Wed,12 Jan  15:45',
  //   heading: 'How do some influencers make money?',
  //   description:
  //     'We all see the glamorous lives of our favourite influencers and the lifestyles',
  // },
  // {
  //   id: '4',
  //   title: 'Tom Bradley',
  //   date: 'Wed,12 Jan  15:45',
  //   heading: 'How do some influencers make money?',
  //   description:
  //     'We all see the glamorous lives of our favourite influencers and the lifestyles',
  // },
  // {
  //   id: '5',
  //   title: 'Tom Bradley',
  //   date: 'Wed,12 Jan  15:45',
  //   heading: 'How do some influencers make money?',
  //   description:
  //     'We all see the glamorous lives of our favourite influencers and the lifestyles',
  // },
];

type TrendingProps = {
  title: string;
  date: string;
  heading: string;
  description: string;
};

const Trending: React.FC<TrendingProps> = ({
  title,
  date,
  heading,
  description,
}) => {
  return (
    <View style={styles.trendingView}>
      <View style={styles.trendingContainer}>
        <View style={styles.trendingCard}>
          <Image
            style={styles.trendingCardImage}
            source={require('../assets/images/profile.png')}
          />
          <View style={styles.trendingViewText}>
            <Text style={styles.trendingText}>{title}</Text>
            <Text style={styles.trendingText}>{date}</Text>
          </View>
        </View>
        <View style={styles.trendingheadingView}>
          <Text style={styles.trendingTextMoney}>{heading}</Text>
          <Text style={styles.trendingTextBottom}>
            {description.length > 77
              ? description.substring(0, 77) + '...'
              : description}
          </Text>
        </View>
      </View>
    </View>
  );
};

const WhatTrendingcards = () => {
  const {navigate} = useNavigation<any>();

  return (
    <View style={styles.trandingComponent}>
      <SectionHeader
        title="Trending"
        onPress={() => {
          navigate(SCREENS.TRENDING);
        }}
      />
      <View style={styles.trending}>
        {/* <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}> */}
        <FlatList
          horizontal
          // numColumns={10}
          data={data}
          renderItem={({item}) => (
            <Trending
              title={item.title}
              date={item.date}
              heading={item.heading}
              description={item.description}
            />
          )}
          keyExtractor={item => item.id}
        />
        {/* </ScrollView> */}
      </View>
    </View>
  );
};

export default WhatTrendingcards;
const styles = StyleSheet.create({
  trandingComponent: {
    marginTop: moderateScale(30),
  },
  trending: {
    paddingHorizontal:
      Platform.OS === 'ios' ? moderateScale(0) : moderateScale(6),
    flexDirection: 'row',
  },
  trendingView: {
    marginTop: moderateScale(10),
    marginRight: moderateScale(8),
    marginBottom: moderateScale(2),
  },
  trendingContainer: {
    backgroundColor: themeColors.cardsColor,
    width: verticalScale(280),
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(20),
    borderRadius: 24,
    justifyContent: 'space-between',
  },
  trendingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: moderateScale(5),
  },
  trendingheadingView: {
    paddingBottom: moderateScale(5),
  },
  trendingCardImage: {
    height: verticalScale(30),
    width: verticalScale(30),
    borderRadius: 50,
  },
  trendingViewText: {},
  trendingText: {
    marginLeft: moderateScale(10),
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
  },
  trendingTextMoney: {
    color: themeColors.aquaColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.md,
    marginTop: moderateScale(15),
    marginBottom: moderateScale(10),
  },
  trendingTextBottom: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.s,
    // lineHeight: 15,
  },
});
