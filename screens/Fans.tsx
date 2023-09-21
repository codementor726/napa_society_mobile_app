import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FansCard from '../components/FansCard';
import {useToast} from 'react-native-toast-notifications';
import {handleGetFollowers} from '../services/FollowAndFollowing';
import {size} from '../theme/fontstyle';
import {Fontfamily} from '../theme/fontFamily';
import {useSelector} from 'react-redux';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import ProfileMyFans from '../components/ProfileMyFans';
import ErrorToast from '../common/toasters/ErrorToast';

const Fans = ({profileId}: any) => {
  const toast = useToast();
  const [followersList, setFollowersList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const userProfileId = useSelector(selectProfileList)?.profileId;
  const handleGetFollowersList = async () => {
    setLoading(true);
    const {data, error, message} = await handleGetFollowers(profileId);
    if (error) {
      console.log(message, 'error');
      toast.show(<ErrorToast message={message} />, {
        placement: 'top',
      });
      setLoading(false);
      return;
    }
    setLoading(false);
    setFollowersList(data);
  };

  useEffect(() => {
    handleGetFollowersList();
  }, [profileId]);

  return (
    <>
      {!loading ? (
        followersList?.length > 0 ? (
          profileId != userProfileId ? (
            <FlatList
              data={followersList}
              style={styles.flatListContainer}
              contentContainerStyle={styles.contentContainerStyle}
              renderItem={({item, index}) => (
                <FansCard
                  item={item}
                  followerId={profileId}
                  setFollowersList={setFollowersList}
                  searchValue={''}
                  userSearch={false}
                />
              )}
            />
          ) : (
            <FlatList
              data={followersList}
              style={styles.flatListContainer}
              contentContainerStyle={styles.contentContainerStyle}
              renderItem={({item, index}) => (
                <ProfileMyFans
                  item={item}
                  followerId={profileId}
                  setFollowersList={setFollowersList}
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

export default Fans;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 24,
    flexGrow: 0,
    paddingBottom: 100,
  },
  flatListContainer: {
    marginTop: 10,
  },
});
