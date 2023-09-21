import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Fontfamily} from '../theme/fontFamily';
import {themeColors} from '../theme/colors';
import {isAlreadyFan} from '../utils/helper';
import {useDispatch, useSelector} from 'react-redux';
import {selectFollowingList} from '../store/selectors/FollowingSelector';
import {size} from '../theme/fontstyle';
import {becomeFan, exitClub} from '../services/FollowAndFollowing';
import {useToast} from 'react-native-toast-notifications';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {setFollowing} from '../store/slices/Following';
import {selectFollowersList} from '../store/selectors/FollowerSelector';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../typings/screens-enums';
import ErrorToast from '../common/toasters/ErrorToast';
type FansCardProps = {
  item: any;
  index?: number;
  followerId?: any;
  setFollowersList?: any;
  searchValue: string;
  userSearch?: boolean;
};

const FansCard: React.FC<FansCardProps> = ({
  item,
  index,
  followerId,
  setFollowersList,
  searchValue,
  userSearch,
}) => {
  const followingList = useSelector(selectFollowingList);
  const [becomeFanLoading, setBecomeFanLoading] = useState(false);
  const userProfileId = useSelector(selectProfileList)?.profileId;
  const dispatch = useDispatch();
  const toast = useToast();
  const {navigate} = useNavigation<any>();

  const handleBecomeAFan = async () => {
    console.log('handleBecomeAFan');
    setBecomeFanLoading(true);
    const {data, error, message} = await becomeFan(
      userProfileId,
      item?.profileId,
    );
    if (error) {
      toast.show(<ErrorToast message={message} />, {
        placement: 'top',
      });
      setBecomeFanLoading(false);
      return;
    }
    const temp = followingList?.length ? [...followingList] : [];
    const updateTemp = JSON.parse(JSON.stringify(temp));
    const isFound = updateTemp.findIndex(
      (p: any) => p.profileId == item?.profileId,
    );
    if (isFound == -1) {
      updateTemp.push({
        profileId: item?.profileId,
        profileName: item?.profileName,
        avatar: item?.avatar,
      });
      dispatch(setFollowing(updateTemp));
    }
    setBecomeFanLoading(false);
  };

  const handleExitClub = async () => {
    console.log('handleExitaClub');
    setBecomeFanLoading(true);
    const {data, error, message} = await exitClub(
      userProfileId,
      item?.profileId,
    );
    if (error) {
      toast.show(<ErrorToast message={message} />, {
        placement: 'top',
      });
      setBecomeFanLoading(false);
      return;
    }
    const temp = followingList?.length ? [...followingList] : [];
    const updateTemp = JSON.parse(JSON.stringify(temp));
    const filteredUpdatedTemp = updateTemp.filter(
      (p: any) => p.profileId != item?.profileId,
    );
    dispatch(setFollowing(filteredUpdatedTemp));
    setBecomeFanLoading(false);
  };

  const handleExitUserClub = async () => {
    setBecomeFanLoading(true);
    const {data, error, message} = await exitClub(item?.profileId, followerId);
    if (error) {
      toast.show(<ErrorToast message={message} />, {
        placement: 'top',
      });
      setBecomeFanLoading(false);
      return;
    }
    const temp = followingList?.length ? [...followingList] : [];
    const updateTemp = JSON.parse(JSON.stringify(temp));
    const filteredUpdatedTemp = updateTemp.filter(
      (p: any) => p.profileId != followerId,
    );
    dispatch(setFollowing(filteredUpdatedTemp));
    setFollowersList((prev: any) => {
      const temp = prev?.length ? [...prev] : [];
      const filteredUpdatedTemp = temp.filter(
        (p: any) => p.profileId != item?.profileId,
      );
      return filteredUpdatedTemp;
    });
    setBecomeFanLoading(false);
  };

  const getHighlightedText = (text: string, higlight: string) => {
    // Split text on higlight term, include term itself into parts, ignore case
    let parts = text.split(new RegExp(`(${higlight})`, 'gi'));
    return parts.map((part: string, index: number) => (
      <React.Fragment key={index}>
        {part.toLowerCase() === higlight.toLowerCase() ? (
          <Text style={{color: 'white'}}>{part}</Text>
        ) : (
          part
        )}
      </React.Fragment>
    ));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigate(SCREENS.PROFILE, {profileId: item?.profileId})}
        style={styles.detailContainer}>
        <Image
          source={{
            uri:
              item?.avatar ||
              'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png',
          }}
          style={styles.imageStyle}
        />
        <Text
          style={[
            styles.nameStyle,
            {color: userSearch ? themeColors.garyColor : 'white'},
          ]}>
          {getHighlightedText(item?.profileName, searchValue)}
        </Text>
      </TouchableOpacity>
      {userProfileId == item.profileId ? null : userProfileId !=
        item?.profileId ? (
        isAlreadyFan(followingList, item?.profileId) ? (
          <TouchableOpacity
            disabled={becomeFanLoading}
            onPress={handleExitClub}
            style={styles.buttonStyleExit}>
            <Text style={styles.btnTextStyleExit}>Unfollow</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled={becomeFanLoading}
            onPress={handleBecomeAFan}
            style={styles.buttonStyle}>
            <Text style={styles.btnTextStyle}>Follow</Text>
          </TouchableOpacity>
        )
      ) : (
        <TouchableOpacity
          disabled={becomeFanLoading}
          onPress={handleExitUserClub}
          style={styles.buttonStyleExit}>
          <Text style={styles.btnTextStyleExit}>Unfollow</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FansCard;

const styles = StyleSheet.create({
  btnTextStyle: {
    paddingHorizontal: 12,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '600',
    lineHeight: 19.6,
    color: themeColors.secondaryColor,
  },
  btnTextStyleExit: {
    paddingHorizontal: 12,
    fontFamily: Fontfamily.Avenier,
    color: themeColors.primaryColor,
    fontSize: size.default,
    fontWeight: '500',
    lineHeight: 19.6,
  },
  buttonStyle: {
    backgroundColor: themeColors.aquaColor,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  buttonStyleExit: {
    backgroundColor: themeColors.cardsColor,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  nameStyle: {
    color: 'white',
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    marginLeft: 12,
    fontWeight: '500',
    lineHeight: 19.6,
  },
  imageStyle: {
    width: 48,
    height: 48,
    borderRadius: 100,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
});
