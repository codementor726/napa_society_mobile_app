import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {
  AvalancheIcon,
  BitcoinIcon,
  BoredApeIcon,
  ChainlinkIcon,
  CronosIcon,
  EthereumIcon,
  NearProtocolIcon,
  PolkadotIcon,
  PolygonIcon,
  RippleIcon,
  TetherIcon,
} from '../assets/svg';
import {CURRENCIES} from '../typings/currenices';
import {BnbIcon} from '../assets/svg/BnbIcon';
import {NapaTokenIcon} from '../assets/svg/NapaTokenIcon';

type HandleCurrencyIconProps = {
  currencyName: string;
  bgColor?: string;
  iconColor?: string;
  width?: number;
  height?: number;
};
const HandleCurrencyIcon: React.FC<HandleCurrencyIconProps> = ({
  iconColor = '#fff',
  bgColor,
  currencyName = 'ETH',
  width,
  height,
}) => {
  return (
    <>
      {currencyName.includes(CURRENCIES.ETH) ? (
        <EthereumIcon
          bgColor={bgColor}
          iconColor={iconColor ? iconColor : ''}
          width={width}
          height={height}
        />
      ) : currencyName.includes(CURRENCIES.MATIC) ? (
        <PolygonIcon bgColor={bgColor} iconColor={iconColor ? iconColor : ''} />
      ) : currencyName.includes(CURRENCIES.BNB) ? (
        <BnbIcon bgColor={bgColor} iconColor={iconColor ? iconColor : ''} />
      ) : currencyName.includes(CURRENCIES.XRP) ? (
        <RippleIcon bgColor={bgColor} iconColor={iconColor ? iconColor : ''} />
      ) : currencyName.includes(CURRENCIES.NAPA) ? (
        <NapaTokenIcon
          bgColor={bgColor}
          iconColor={iconColor ? iconColor : ''}
          width={width}
          height={height}
        />
      ) : currencyName.includes(CURRENCIES.BAYC) ? (
        <BoredApeIcon
          bgColor={bgColor}
          iconColor={iconColor ? iconColor : ''}
        />
      ) : currencyName.includes(CURRENCIES.DOT) ? (
        <PolkadotIcon
          bgColor={bgColor}
          iconColor={iconColor ? iconColor : ''}
        />
      ) : currencyName.includes(CURRENCIES.CRO) ? (
        <CronosIcon bgColor={bgColor} iconColor={iconColor ? iconColor : ''} />
      ) : currencyName.includes(CURRENCIES.NEAR) ? (
        <NearProtocolIcon
          bgColor={bgColor}
          iconColor={iconColor ? iconColor : ''}
        />
      ) : currencyName.includes(CURRENCIES.LINK) ? (
        <ChainlinkIcon
          bgColor={bgColor}
          iconColor={iconColor ? iconColor : ''}
        />
      ) : currencyName.includes(CURRENCIES.USDT) ? (
        <TetherIcon
          bgColor={bgColor}
          iconColor={iconColor ? iconColor : ''}
          width={width}
          height={height}
        />
      ) : currencyName.includes(CURRENCIES.AVAX) ? (
        <AvalancheIcon
          bgColor={bgColor}
          iconColor={iconColor ? iconColor : ''}
        />
      ) : currencyName.includes(CURRENCIES.BTC) ? (
        <BitcoinIcon bgColor={bgColor} iconColor={iconColor ? iconColor : ''} />
      ) : currencyName.includes(CURRENCIES.SEPOLIA) ? (
        <Image source={require('../assets/images/sepolia.png')} />
      ) : (
        <></>
      )}
    </>
  );
};

export default HandleCurrencyIcon;
const styles = StyleSheet.create({});
