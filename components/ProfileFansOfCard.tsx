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
import {setFollowers} from '../store/slices/Followers';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../typings/screens-enums';
import ErrorToast from '../common/toasters/ErrorToast';
type FansCardProps = {
  item: any;
  setFollowingList: any;
};

const ProfileFansOfCard: React.FC<FansCardProps> = ({
  item,
  setFollowingList,
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
      toast.show(<ErrorToast message={message}/>, {
        placement: 'top',
      });
      setBecomeFanLoading(false);
      return;
    }
    const temp = followingList?.length ? [...followingList] : [];
    const updateTemp = JSON.parse(JSON.stringify(temp));
    const isFound = updateTemp?.findIndex(
      (p: any) => p.profileId == item?.profileId,
    );
    if (isFound == -1) {
      updateTemp?.push({
        profileId: item?.profileId,
        profileName: item?.profileName,
        avatar: item?.avatar,
      });
      setFollowingList(updateTemp);
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
      toast.show(<ErrorToast message={message}/>, {
        placement: 'top',
      });
      setBecomeFanLoading(false);
      return;
    }
    const temp = followingList?.length ? [...followingList] : [];
    const updateTemp = JSON.parse(JSON.stringify(temp));
    const filteredUpdatedTemp = updateTemp?.filter(
      (p: any) => p.profileId != item?.profileId,
    );
    setFollowingList(filteredUpdatedTemp);
    dispatch(setFollowing(filteredUpdatedTemp));
    setBecomeFanLoading(false);
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
        <Text style={styles.nameStyle}>{item?.profileName}</Text>
      </TouchableOpacity>
      {isAlreadyFan(followingList, item?.profileId) ? (
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
      )}
    </View>
  );
};

export default ProfileFansOfCard;

const styles = StyleSheet.create({
  btnTextStyle: {
    paddingHorizontal: 12,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
    lineHeight: 19.6,
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
