import {
  ActivityIndicator,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../common/Layout';
import {moderateScale} from 'react-native-size-matters';
import {CrossIcon} from '../assets/svg';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import ProfileTab from '../common/ProfileTab';
import {handleSearchUsers} from '../services/FollowAndFollowing';
import FansCard from './FansCard';
import {useNavigation} from '@react-navigation/native';

const SearchScreen = () => {
  const tabs = [
    'Users',
    'Posts',
    'MySNFT',
    'Leaders',
    'Stories',
    'Live',
    'Events',
  ];
  const {goBack} = useNavigation<any>();
  const [search, setSearch] = useState<string>('');
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [userList, setUserList] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const hanleGetUsers = async () => {
    setLoading(true);
    const {data, error, message} = await handleSearchUsers(search);
    console.log(data, 'data');
    if (error) {
      console.log(message, 'error');
      setLoading(false);
      return;
    }
    setUserList(data);
    setLoading(false);
  };

  useEffect(() => {
    const getData = setTimeout(() => {
      if (search.length > 0) {
        hanleGetUsers();
      }
    }, 1000);

    return () => {
      clearTimeout(getData);
    };
  }, [search]);

  useEffect(() => {
    hanleGetUsers();
  }, []);

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.containerChild}>
          <Pressable onPress={() => goBack()}>
            <CrossIcon color={themeColors.garyColor} />
          </Pressable>
          <TextInput
            style={styles.input}
            placeholder="Search...."
            placeholderTextColor={themeColors.garyColor}
            value={search}
            onChangeText={text => setSearch(text)}
          />
        </View>
        <Pressable onPress={() => setSearch('')}>
          <Text style={styles.text}>Clear</Text>
        </Pressable>
      </View>
      <View style={{paddingHorizontal: moderateScale(22)}}>
        <View>
          <ProfileTab
            data={tabs}
            activeTabIndex={activeTabIndex}
            setActiveTabIndex={setActiveTabIndex}
            usersearch={true}
            hideOption={true}
          />
        </View>
      </View>
      <View>
        {!loading ? (
          userList?.length > 0 ? (
            <FlatList
              data={userList}
              style={styles.flatListContainer}
              contentContainerStyle={styles.contentContainerStyle}
              renderItem={({item}) => (
                <FansCard item={item} searchValue={search} userSearch={true} />
              )}
              keyExtractor={item => item.profileId}
            />
          ) : (
            <View
              style={{
                height: '85%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '500',
                  fontSize: size.xlg,
                  fontFamily: Fontfamily.Neuropolitical,
                }}>
                User not found
              </Text>
            </View>
          )
        ) : (
          <View
            style={{
              // flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: '85%',
            }}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
      </View>
    </Layout>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(22),

    paddingTop: Platform.OS === 'ios' ? moderateScale(10) : moderateScale(10),
  },
  containerChild: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    color: 'white',
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: '80%',
  },
  text: {
    color: themeColors.garyColor,
    fontWeight: '500',
    fontFamily: Fontfamily.Avenier,
    fontSize: size.md,
  },
  contentContainerStyle: {
    paddingHorizontal: 24,
    flexGrow: 0,
    paddingBottom: 100,
  },
  flatListContainer: {
    marginTop: 10,
  },
});
