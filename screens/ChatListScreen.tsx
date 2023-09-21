import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Layout from '../common/Layout';
import Header from '../common/Header';
import {BackIcon, Search} from '../assets/svg';
import {useNavigation} from '@react-navigation/native';
import ChatListCard from '../components/ChatListCard';
import {themeColors} from '../theme/colors';
import {SCREENS} from '../typings/screens-enums';
import {getThreadList} from '../services/GetImportedToken';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {useSelector} from 'react-redux';
import {SOCIAL_ART_WEBSOCKET_URL} from '../const/Url';

const ChatListScreen = () => {
  const {goBack, navigate} = useNavigation<any>();
  const profileId = useSelector(selectProfileList)?.profileId;
  const [threads, setThreads] = useState([]);
  const socialArtSocketRef = useRef<any>(null);
  const fetchThreadList = async () => {
    const {data, error}: any = await getThreadList(profileId);
    if (!error) {
      setThreads(data?.data);
    }
  };

  useEffect(() => {
    fetchThreadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connectToSocialArt = async () => {
    if (socialArtSocketRef.current == null) {
      socialArtSocketRef.current = new WebSocket(SOCIAL_ART_WEBSOCKET_URL);
      socialArtSocketRef.current.addEventListener('message', ({data}: any) => {
        const response = JSON.parse(data);
        if (response?.event === 'thread-added') {
          fetchThreadList();
        }
      });
    }
  };

  useEffect(() => {
    connectToSocialArt();
    if (socialArtSocketRef.current) {
      socialArtSocketRef.current.onclose = (e: any) => {
        console.log(
          'Social Art Socket is closed 1. Reconnect will be attempted in 1 second.',
          e.reason,
        );
        setTimeout(() => {
          if (socialArtSocketRef.current) {
            connectToSocialArt();
          }
        }, 1000);
      };
    }
    return () => {
      if (socialArtSocketRef.current) {
        socialArtSocketRef.current.close();
        socialArtSocketRef.current = null;
      }
    };
  }, []);

  return (
    <Layout>
      <Header
        leftChildren={
          <TouchableOpacity onPress={() => goBack()}>
            <BackIcon color={themeColors.garyColor} />
          </TouchableOpacity>
        }
        rightChildren={
          <TouchableOpacity onPress={() => {}}>
            <Search color={themeColors.garyColor} />
          </TouchableOpacity>
        }
        title={false}
        centerTitle={'Chats'}
      />
      {threads?.length > 0 ? (
        <FlatList
          data={threads}
          style={styles.flatListContainer}
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={({item, index}: any) => (
            <ChatListCard
              item={item}
              index={index}
              onPress={() => {
                navigate(SCREENS.CHATSCREEN, {threadId: item.threadId});
              }}
            />
          )}
        />
      ) : (
        <View style={styles.noContent}>
          <Text style={styles.noContentText}>No Records Found</Text>
        </View>
      )}
    </Layout>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 24,
    flexGrow: 1,
    paddingBottom: 100,
  },
  flatListContainer: {
    marginTop: 10,
  },
  noContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noContentText: {color: 'white', fontSize: 18},
});
