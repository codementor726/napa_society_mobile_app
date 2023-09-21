import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {updateMintPostStatus} from '../utils/mintApi';
import {useDispatch, useSelector} from 'react-redux';
import {selectTokenPrice} from '../store/selectors/TokenList';
import {deleteSnft} from '../services/MarketPlace';
import {useToast} from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../typings/screens-enums';
import {MarketPlaceData} from '../store/slices/MarketPlaceItem';
import ErrorToast from '../common/toasters/ErrorToast';
import SuccessToast from '../common/toasters/SuccessToast';
type LiveTimeProps = {
  targetTime?: any;
  postId?: any;
  isExpired?: any;
  tokenPrice?: any;
  amountEarned?: any;
  napaTokenEarned?: any;
  marketPlaceItem?: boolean;
  snftId?: any;
};

const LiveTime: React.FC<LiveTimeProps> = ({
  targetTime,
  postId,
  isExpired,
  tokenPrice,
  amountEarned,
  napaTokenEarned,
  marketPlaceItem,
  snftId,
}) => {
  const [remainingTime, setRemainingTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const currentNapaPrice = useSelector(selectTokenPrice);
  const toast = useToast();
  const {navigate} = useNavigation<any>();
  const dispatch = useDispatch();
  useEffect(() => {
    const currentTime = new Date().getTime();
    const targetDateTime = new Date(targetTime).getTime();
    if (currentTime >= targetDateTime) {
      if (isRunning) {
        setIsRunning(false);
        if (snftId) {
          handleDeleteSnft();
        }
        if (postId && isExpired == 'false' && napaTokenEarned == '') {
          updateMintPostStatus(
            postId,
            '1',
            amountEarned ? amountEarned : currentNapaPrice,
            tokenPrice,
          );
        }
        if (postId && napaTokenEarned == '') {
          updateMintPostStatus(
            postId,
            '1',
            amountEarned ? amountEarned : currentNapaPrice,
            tokenPrice,
          );
        }
      }
    } else {
      if (isRunning) {
        const timerId = setInterval(() => {
          const updatedTime = new Date().getTime();
          const timeDifference = targetDateTime - updatedTime;
          setRemainingTime(timeDifference);
        }, 1000);

        return () => {
          clearInterval(timerId);
        };
      }
    }
  }, [remainingTime, isRunning]);

  const handleDeleteSnft = async () => {
    const {error, message} = await deleteSnft(snftId);
    if (error) {
      toast.show(<ErrorToast message={message} />, {
        placement: 'top',
      });
      // setIsLoading(false);
    }
    dispatch(MarketPlaceData(24));
    // setIsLoading(false);
    navigate(SCREENS.MARKETPLACE);
  };

  // Convert remaining time to hours, minutes, and seconds
  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const displayHours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
  const displayMinutes = Math.floor((remainingTime / (1000 * 60)) % 60);
  const displaySeconds = Math.floor((remainingTime / 1000) % 60);

  return (
    <View>
      {isRunning ? (
        <Text style={{color: 'white'}}>
          {marketPlaceItem
            ? `${isNaN(days) ? '00' : `0${days}`} : ` || '00 : '
            : ''}
          {displayHours < 10 ? `0${displayHours}` : displayHours || '00'} :{' '}
          {displayMinutes < 10 ? `0${displayMinutes}` : displayMinutes || '00'}{' '}
          :{' '}
          {displaySeconds < 10 ? `0${displaySeconds}` : displaySeconds || '00'}
        </Text>
      ) : (
        <Text style={{color: 'white'}}></Text>
      )}
    </View>
  );
};

export default LiveTime;
