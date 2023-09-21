import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Fontfamily} from '../theme/fontFamily';
import {themeColors} from '../theme/colors';
import {useDispatch, useSelector} from 'react-redux';
import {selectFollowingList} from '../store/selectors/FollowingSelector';
import {size} from '../theme/fontstyle';
import {exitClub} from '../services/FollowAndFollowing';
import {useToast} from 'react-native-toast-notifications';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {selectFollowersList} from '../store/selectors/FollowerSelector';
import {setFollowers} from '../store/slices/Followers';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../typings/screens-enums';
import ErrorToast from '../common/toasters/ErrorToast';
type FansCardProps = {
  item: any;
  followerId?: any;
  setFollowersList?: any;
};

const ProfileMyFans: React.FC<FansCardProps> = ({
  item,
  followerId,
  setFollowersList,
}) => {
  const followerList = useSelector(selectFollowersList);
  const [becomeFanLoading, setBecomeFanLoading] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const {navigate} = useNavigation<any>();

  const handleDeleteUser = async () => {
    console.log('handleDeleteUser');
    setBecomeFanLoading(true);
    const {data, error, message} = await exitClub(item?.profileId, followerId);
    if (error) {
      toast.show(<ErrorToast message={message}/>, {
        placement: 'top',
      });
      setBecomeFanLoading(false);
      return;
    }
    const temp = followerList?.length ? [...followerList] : [];
    const updateTemp = JSON.parse(JSON.stringify(temp));
    const filteredUpdatedTemp = updateTemp.filter(
      (p: any) => p.profileId != item?.profileId,
    );
    dispatch(setFollowers(filteredUpdatedTemp));
    setFollowersList((prev: any) => {
      const temp = prev?.length ? [...prev] : [];
      const filteredUpdatedTemp = temp.filter(
        (p: any) => p.profileId != item?.profileId,
      );
      return filteredUpdatedTemp;
    });
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
      <TouchableOpacity
        disabled={becomeFanLoading}
        onPress={handleDeleteUser}
        style={styles.buttonStyleExit}>
        <Text style={styles.btnTextStyleExit}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileMyFans;

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
