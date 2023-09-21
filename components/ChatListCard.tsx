/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Fontfamily} from '../theme/fontFamily';
import {themeColors} from '../theme/colors';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {useSelector} from 'react-redux';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
dayjs.extend(relativeTime);

type ChatListCardProps = {
  item: any;
  index: number;
  onPress: () => void;
};

const ChatListCard: React.FC<ChatListCardProps> = ({item, index, onPress}) => {
  const profileId = useSelector(selectProfileList).profileId;
  const isSender = profileId === item?.last_message?.profileId;
  return (
    <View key={index} style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={styles.detailContainer}>
        <Image
          style={styles.imageStyle}
          source={{
            uri:
              item?.receiver_info?.avatar ||
              'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png',
          }}
        />
        <View style={styles.nameMessageContainer}>
          <View style={styles.nameWhenContainer}>
            <Text style={styles.nameStyle}>
              {item?.receiver_info?.profileName}
            </Text>
            <Text style={styles.whenStyle}>
              {dayjs(item?.receiver_info?.createdAt).fromNow()}
            </Text>
          </View>
          <View style={styles.messageContainer}>
            {isSender && (
              <Text
                style={[
                  styles.messageStyle,
                  {
                    color: item?.read
                      ? themeColors.garyColor
                      : themeColors.primaryColor,
                  },
                ]}>
                You :
              </Text>
            )}
            <Text
              style={[
                styles.messageStyle,
                {
                  marginLeft: isSender ? 0 : 12,
                  color: item?.read
                    ? themeColors.garyColor
                    : themeColors.primaryColor,
                },
              ]}>
              {item?.last_message?.text}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ChatListCard;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: themeColors.aquaColor,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  nameStyle: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
  },
  messageStyle: {
    fontFamily: Fontfamily.Avenier,
    fontSize: 14,
    marginLeft: 12,
  },
  imageStyle: {
    width: 48,
    height: 48,
    borderRadius: 100,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  nameMessageContainer: {
    flex: 1,
  },
  nameWhenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  whenStyle: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: 12,
    marginLeft: 12,
  },
});
