import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {themeColors} from '../theme/colors';
import {moderateScale} from 'react-native-size-matters';
import {audienceData} from '../const/audienceData';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import ContinueButton from '../common/ContinueButton';
import {useDispatch, useSelector} from 'react-redux';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {selectGenreDataList} from '../store/selectors/GetGenre';
import {handlePostGenre, handleUpdateGenre} from '../services/GenreApi';
import {fetchGenre} from '../store/slices/GetGenre';
import {useToast} from 'react-native-toast-notifications';
import ErrorToast from '../common/toasters/ErrorToast';
import SuccessToast from '../common/toasters/SuccessToast';

const Explore = () => {
  const [genreData, setGenreData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setisDisabled] = useState(false);
  const [isGenreLength, setIsGenreLength] = useState<any>([]);
  const profileId = useSelector(selectProfileList)?.profileId;
  const getGenreData = useSelector(selectGenreDataList).data;

  const toast = useToast();
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
  useEffect(() => {
    if (getGenreData != undefined) {
      const trueIndices = Object?.keys(getGenreData)?.reduce(
        (acc, key, index) => {
          if (getGenreData[key] === 'true') {
            //@ts-ignore
            acc.push(index - 1);
          }
          return acc;
        },
        [],
      );
      const titlesCheck = trueIndices.map(index => {
        const matchedData = audienceData.find(item => item.id === index);
        return matchedData ? matchedData.title : null;
      });
      setIsGenreLength(titlesCheck);
      setGenreData(titlesCheck);
    }
  }, []);

  const handleUpdateGenreData = async () => {
    setisDisabled(true);
    if (!genreData.length) {
      toast.show(<ErrorToast message='Please select atleast 1 genre' />, {
        placement: 'top',
      });
      setIsLoading(false);
      return;
    }

    if (genreData.length > 10) {
      toast.show(<ErrorToast message='Maximum 10 genre can be selected' />, {
        placement: 'top',
      });
      return;
    }
    const {message, error} = await handleUpdateGenre(profileId, genreData);
    if (error) {
      toast.show(<ErrorToast message={message}/>, {
        placement: 'top',
      });
      setIsLoading(false);
      return;
    }
    toast.show(<SuccessToast message='Genre Updated Successfully' />, {
      placement: 'top',
    });
    dispatch(fetchGenre(profileId));
    setIsLoading(false);
  };
  const handlePostGenreData = () => {
    setisDisabled(true);
    if (!genreData.length) {
      toast.show(<ErrorToast message='Please select atleast 1 genre' />, {
        placement: 'top',
      });
      setIsLoading(false);
      return;
    }
    if (genreData.length > 10) {
      toast.show(<ErrorToast message='Maximum 10 genre can be selected' />, {
        placement: 'top',
      });
      return;
    }
    setIsLoading(true);
    const data = {
      profileId: profileId,
      genereSelected: genreData,
    };
    if (data.profileId && data.genereSelected) {
      handlePostGenre(data).then((genre: any) => {
        console.log(data, 'data');
        toast.show(<SuccessToast message='Genre Updated Successfully' />, {
          placement: 'top',
        });
        dispatch(fetchGenre(profileId));
        setIsLoading(false);
      });
    }
  };
  setTimeout(() => {
    setisDisabled(false);
  }, 9000);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <Text style={styles.selected}>
          {genreData.length && `${genreData.length}`} selected
        </Text>
        <View
          style={{
            justifyContent: 'space-between',
            marginBottom: moderateScale(10),
          }}>
          <View style={styles.audience}>
            <Text style={styles.audienceText}>Choose Your Feed</Text>
            <Text style={styles.audienceSubText}>
              These beautiful floating bubbles represent the level of posts and
              interest in each genre. The larger the bubble the higher level of
              user engagements and exposure your minted post will receive.
            </Text>
          </View>
          <ScrollView>
            <View style={styles.bubbleView}>
              {audienceData?.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      selectGenre(item.title);
                    }}
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
        </View>
        <View style={styles.footerStyle}>
          {isLoading ? (
            <View style={styles.buyLoader}>
              <ActivityIndicator
                size="large"
                color={themeColors.primaryColor}
              />
            </View>
          ) : (
            <ContinueButton
              title="Save"
              isDisabled={isDisabled}
              onPress={
                isGenreLength.length
                  ? handleUpdateGenreData
                  : handlePostGenreData
              }
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};
export default Explore;

const styles = StyleSheet.create({
  selected: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.lg,
    fontWeight: '500',
    paddingHorizontal: moderateScale(24),
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
    // flex: 1,
    marginTop: moderateScale(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: moderateScale(22),
    marginBottom: moderateScale(20),
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
  footerStyle: {
    marginBottom: Platform.OS == 'ios' ? moderateScale(35) : moderateScale(60),
  },
});
