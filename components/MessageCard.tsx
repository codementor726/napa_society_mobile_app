/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import moment from 'moment';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';

interface propType {
  message: any;
  isSender: boolean; // Add a boolean prop to determine if the message is from the sender
}

const MessageCard: React.FC<propType> = props => {
  return (
    <View style={{flex: 1, marginTop: 10}}>
      <View
        style={[
          style.conatiner,
          {
            flexDirection: props.isSender ? 'row-reverse' : 'row',
          },
        ]}>
        <View
          style={[
            style.messageView,
            {
              borderBottomEndRadius: props.isSender ? 0 : 12,
              borderBottomStartRadius: props.isSender ? 12 : 0,
              alignItems: props.isSender ? 'flex-end' : 'flex-start',
              backgroundColor: props.isSender
                ? themeColors.aquaColor
                : themeColors.darkGray,
            },
          ]}>
          <Text
            style={[
              style.messageText,
              {
                color: props.isSender
                  ? themeColors.black
                  : themeColors.primaryColor,
              },
            ]}>
            {props.message.text}
          </Text>
        </View>
      </View>
      <Text
        style={[
          style.timeText,
          {
            alignSelf: props.isSender ? 'flex-end' : 'flex-start',
            textAlign: props.isSender ? 'right' : 'left',
          },
        ]}>
        {moment(new Date()).format('hh:mm') ===
        moment(props.message.createdAt).format('hh:mm')
          ? 'Just Now'
          : moment(props.message.createdAt).format('hh:mm')}
      </Text>
    </View>
  );
};

export default MessageCard;

const style = StyleSheet.create({
  conatiner: {
    flexDirection: 'row',
    marginBottom: 5,
    flex: 1,
    marginRight: 17,
  },
  messageView: {
    paddingVertical: 13,
    borderRadius: 12,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    paddingHorizontal: 15,
  },
  timeText: {
    fontFamily: Fontfamily.Avenier,
    fontSize: 12,
    lineHeight: 16,
    color: themeColors.garyColor,
    fontWeight: '500',
  },
  nameText: {
    fontFamily: Fontfamily.Avenier,
    fontSize: 14,
    lineHeight: 18,
    color: themeColors.black,
  },
  messageText: {
    fontFamily: Fontfamily.Avenier,
    fontSize: 14,
    lineHeight: 18,
    marginTop: 4,
  },
});
