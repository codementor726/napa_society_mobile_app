import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Layout from '../common/Layout';
import Header from '../common/Header';
import {useNavigation} from '@react-navigation/native';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {moderateScale} from 'react-native-size-matters';
import {audienceData} from '../const/audienceData';
import ContinueButton from '../common/ContinueButton';
import {SCREENS} from '../typings/screens-enums';
import {handlePostGenre} from '../services/GenreApi';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {useDispatch, useSelector} from 'react-redux';
import {setIsLoggedIn} from '../store/slices/ProfileDetail';
const ChooseAudience = () => {
  const {navigate} = useNavigation<any>();
  const [genreData, setGenreData] = useState<any>([]);
  const profileId = useSelector(selectProfileList)?.profileId;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const selectGenre = (title: any) => {
    const temp = [...genreData];
    const isFound = temp.indexOf(title);
    if (isFound > -1) {
      temp.splice(isFound, 1);
      setGenreData(temp);
    } else {
      temp.push(title);
      setGenreData(temp);
    }
  };

  const handlePostGenreData = async () => {
    setIsLoading(true);
    const data = {
      profileId: profileId,
      genereSelected: genreData,
    };
    if (data.profileId && data.genereSelected) {
      await handlePostGenre(data).then((genre: any) => {
        if (genre) {
          dispatch(setIsLoggedIn(true));
          navigate(SCREENS.ONBOARDINGSCREENS);
          setIsLoading(false);
        }
      });
    } else {
      console.log('error');
      setIsLoading(false);
    }
  };
  return (
    <Layout>
      <Header
        leftChildren={
          <Text style={styles.selected}>
            {genreData.length && `${genreData.length}`} selected
          </Text>
        }
        title={false}
        rightChildren={
          <TouchableOpacity onPress={() => navigate(SCREENS.ONBOARDINGSCREENS)}>
            <Text style={styles.skip}>Skip</Text>
          </TouchableOpacity>
        }
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          marginBottom: moderateScale(10),
        }}>
        <View style={styles.audience}>
          <Text style={styles.audienceText}>Choose your Audience</Text>
          <Text style={styles.audienceSubText}>
            These beautiful floating bubbles represent the amount of posts and
            interest in each genre. The larger the bubble the higher level of
            user engagements and exposure your minted post will receive.
          </Text>
        </View>
        <ScrollView>
          <View style={styles.bubbleView}>
            {audienceData?.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => selectGenre(item.title)}
                  key={index}
                  style={{
                    height: item.size,
                    width: item.size,
                    borderRadius: item.size / 2,
                    marginHorizontal: moderateScale(-item.size / 18),
                    marginVertical: moderateScale(-item.size / 15),
                    backgroundColor: genreData?.includes(item.title)
                      ? themeColors.aquaColor
                      : 'transparent',
                    ...styles.bubble,
                  }}>
                  <Text
                    style={{
                      ...styles.bubbleText,
                      color: genreData?.includes(item.title)
                        ? themeColors.secondaryColor
                        : themeColors.primaryColor,
                    }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
        {isLoading ? (
          <View style={styles.buyLoader}>
            <ActivityIndicator size="large" color={themeColors.primaryColor} />
          </View>
        ) : (
          <ContinueButton title="continue" onPress={handlePostGenreData} />
        )}
      </View>
    </Layout>
  );
};

export default ChooseAudience;

const styles = StyleSheet.create({
  selected: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.lg,
    fontWeight: '500',
  },
  skip: {
    color: themeColors.aquaColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.default,
    fontWeight: '400',
  },
  audience: {
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScale(20),
  },
  audienceText: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.xxlg,
    fontWeight: '400',
  },
  audienceSubText: {
    marginTop: moderateScale(11),
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.md,
    fontWeight: '500',
    lineHeight: 22,
  },
  bubbleView: {
    marginTop: moderateScale(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: moderateScale(22),
    marginBottom: moderateScale(10),
  },
  bubble: {
    borderColor: themeColors.garyColor,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubbleText: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.default,
    fontWeight: '400',
  },
  buyLoader: {
    backgroundColor: themeColors.aquaColor,
    paddingVertical: moderateScale(15),
  },
});
