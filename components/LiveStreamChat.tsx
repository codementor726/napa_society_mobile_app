/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useToast} from 'react-native-toast-notifications';
import {useSelector} from 'react-redux';
import {SendIcon} from '../assets/svg/SendIcon';
import {SOCIAL_ART_WEBSOCKET_URL} from '../const/Url';
import {getLiveStreamMessageList} from '../services/GetImportedToken';
import {addLiveStreamMessage} from '../services/PostApi';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import ErrorToast from '../common/toasters/ErrorToast';

interface ChatProps {
  handleTextInputBlur: () => void;
  handleTextInputFocus: () => void;
}

const LiveStreamChatScreen: React.FC<ChatProps> = ({
  handleTextInputFocus,
  handleTextInputBlur,
}) => {
  const [messages, setMessages] = useState([]);
  const [isMessageSend, setIsMessageSend] = useState(false);
  const [inputText, setInputText] = useState<string>('');
  const toast = useToast();
  const ProfileData = useSelector(selectProfileList);
  const socialArtSocketRef = useRef<any>(null);
  const flatListRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const scrollToEnd = () => {
    if (messages?.length > 0) {
      flatListRef?.current?.scrollToIndex({index: messages.length - 1});
    }
  };

  const fetchMessageList = async () => {
    let dataRaw: any = await AsyncStorage.getItem('data');
    dataRaw = JSON.parse(dataRaw);
    const {streamId = ''} = dataRaw;
    if (streamId) {
      const {data: streamMessagesList}: any = await getLiveStreamMessageList(
        streamId,
      );
      const reversedMessages = streamMessagesList?.data
        ? streamMessagesList?.data?.reverse()
        : [];
      setMessages(reversedMessages);
    }
  };

  useEffect(() => {
    fetchMessageList();
  }, [isMessageSend]);

  const sendMessage = async () => {
    if (inputText.trim() === '') {
      return;
    }
    let dataRaw: any = await AsyncStorage.getItem('data');
    dataRaw = JSON.parse(dataRaw);
    const {streamId = ''} = dataRaw;
    setIsLoading(true);

    const {error, data, message} = await addLiveStreamMessage(
      streamId,
      ProfileData.profileId,
      inputText,
    );
    if (data) {
      setIsMessageSend(!isMessageSend);
    }
    setIsLoading(false);
    if (error) {
      toast.show(<ErrorToast message={message} />, {
        placement: 'top',
      });
    }
    setInputText('');
    scrollToEnd();
  };

  const connectToSocialArt = async () => {
    if (socialArtSocketRef.current == null) {
      socialArtSocketRef.current = new WebSocket(SOCIAL_ART_WEBSOCKET_URL);
      socialArtSocketRef.current.addEventListener('message', ({data}: any) => {
        const response = JSON.parse(data);
        if (response?.event === 'live-stream-send-message') {
          fetchMessageList();
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
    <View style={{flex: 1}}>
      <View
        style={{
          position: 'absolute',
          bottom: 120,
          width: '80%',
          maxHeight: Dimensions.get('window').height / 2,
          marginBottom: 10,
        }}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item: any) => item?.id && item.id.toString()}
          renderItem={({item}: any) => (
            <View style={styles.bottomView}>
              <Image
                style={styles.imageStyle}
                source={{
                  uri:
                    item?.avatar ||
                    'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png',
                }}
              />
              <View style={styles.chatText}>
                <Text style={styles.streamTitleStye} numberOfLines={2}>
                  {item?.profileName}
                </Text>
                <Text style={styles.userNameStyle}>{item?.text}</Text>
              </View>
            </View>
          )}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 60,
        }}>
        <TextInput
          placeholder="Send a message"
          placeholderTextColor={themeColors.garyColor}
          style={styles.inputField}
          onFocus={handleTextInputFocus}
          onBlur={handleTextInputBlur}
          value={inputText}
          onChangeText={text => setInputText(text)}
        />
        <TouchableOpacity onPress={sendMessage} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color={themeColors.primaryColor} />
          ) : (
            <SendIcon />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LiveStreamChatScreen;

const styles = StyleSheet.create({
  inputField: {
    borderWidth: 1,
    borderColor: themeColors.garyColor,
    color: themeColors.primaryColor,
    borderRadius: 100,
    fontSize: 14,
    width: '88%',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(24),
  },
  bottomView: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
  },
  imageStyle: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
  },
  chatText: {
    marginLeft: 10,
    marginTop: 5,
  },
  streamTitleStye: {
    color: 'white',
    fontSize: 14,
    fontFamily: Fontfamily.Neuropolitical,
    marginBottom: 4,
  },
  userNameStyle: {
    fontSize: 12,
    color: 'white',
    fontFamily: Fontfamily.Avenier,
  },
});
