import React from 'react';
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {TrendingarticlesData} from '../const/trending';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../typings/screens-enums';

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
  const {navigate} = useNavigation<any>();

  return (
    <View style={styles.trendingView}>
      <TouchableOpacity
        onPress={() => {
          navigate(SCREENS.ARTICLE);
        }}
        style={styles.trendingContainer}>
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
      </TouchableOpacity>
    </View>
  );
};

const TrendingToken = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={TrendingarticlesData}
        contentContainerStyle={{flexGrow: 1}}
        renderItem={({item}) => (
          <Trending
            title={item.title}
            date={item.date}
            heading={item.heading}
            description={item.description}
          />
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(15),
    paddingHorizontal: moderateScale(10),
    flex: 1,
  },
  trandingComponent: {
    marginTop: moderateScale(30),
  },
  trending: {
    paddingHorizontal:
      Platform.OS === 'ios' ? moderateScale(0) : moderateScale(6),
    flexDirection: 'row',
  },
  trendingView: {
    marginBottom: moderateScale(10),
  },
  trendingContainer: {
    backgroundColor: themeColors.cardsColor,
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
  },
});
export default TrendingToken;
