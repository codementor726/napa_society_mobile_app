import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {handleGetFollowings} from '../services/FollowAndFollowing';
import {useToast} from 'react-native-toast-notifications';
import FansOfCard from '../components/FansOfCard';
import {size} from '../theme/fontstyle';
import {Fontfamily} from '../theme/fontFamily';
import {useSelector} from 'react-redux';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import ProfileFansOfCard from '../components/ProfileFansOfCard';
import ErrorToast from '../common/toasters/ErrorToast';

const FansOf = ({profileId}: any) => {
  const toast = useToast();
  const [followingList, setFollowingList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const userProfileId = useSelector(selectProfileList)?.profileId;
  const handleGetFollowingList = async () => {
    setLoading(true);
    const {data, error, message} = await handleGetFollowings(profileId);
    if (error) {
      console.log(message, 'error');
      toast.show(<ErrorToast message={message} />, {
        placement: 'top',
      });
      setLoading(false);
      return;
    }
    setLoading(false);
    setFollowingList(data);
  };

  useEffect(() => {
    handleGetFollowingList();
  }, [profileId]);
  return (
    <>
      {!loading ? (
        followingList?.length > 0 ? (
          profileId != userProfileId ? (
            <FlatList
              data={followingList}
              style={styles.flatListContainer}
              contentContainerStyle={styles.contentContainerStyle}
              renderItem={({item, index}) => <FansOfCard item={item} />}
            />
          ) : (
            <FlatList
              data={followingList}
              style={styles.flatListContainer}
              contentContainerStyle={styles.contentContainerStyle}
              renderItem={({item, index}) => (
                <ProfileFansOfCard
                  item={item}
                  setFollowingList={setFollowingList}
                />
              )}
            />
          )
        ) : (
          <View
            style={{
              flex: 0.6,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '500',
                fontSize: size.xlg,
                fontFamily: Fontfamily.Avenier,
              }}>
              {profileId != userProfileId ? 'No Fans' : 'Get Some Followers'}
            </Text>
          </View>
        )
      ) : (
        <View
          style={{
            flex: 0.6,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </>
  );
};

export default FansOf;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 24,
    flexGrow: 1,
    paddingBottom: 100,
  },
  flatListContainer: {
    marginTop: 15,
  },
});
