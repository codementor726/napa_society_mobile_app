import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {EthereumIcon, TetherIcon} from '../assets/svg';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {CURRENCIES} from '../typings/currenices';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../typings/screens-enums';
import {NapaTokenIcon} from '../assets/svg/NapaTokenIcon';
type AssetListItemProps = {
  title: string;
  currencyName: string;
  coin: string;
  balance: string;
  isFromWallet?: boolean;
  tokenAddress?: string;
};

const AssetListItem: React.FC<AssetListItemProps> = ({
  title,
  currencyName,
  coin,
  balance,
  isFromWallet,
  tokenAddress,
}) => {
  const {navigate} = useNavigation<any>();

  const handleCurrenyIcon = (name: string) => {
    if (name.includes(CURRENCIES.ETH)) {
      return <EthereumIcon />;
    }
    if (name.includes(CURRENCIES.USDT)) {
      return <TetherIcon />;
    }
    if (name.includes(CURRENCIES.NAPA)) {
      return <NapaTokenIcon />;
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigate(SCREENS.WALLETDETAILS, {
          assetData: {
            title: title,
            currencyName: currencyName,
            tokenAddress: tokenAddress,
            balance: balance,
          },
        });
      }}
      style={styles.assetListItem}>
      <View style={styles.assetListLeft}>
        {handleCurrenyIcon(currencyName)}
        <View style={styles.assetListTextContainer}>
          <Text style={styles.assetListLeftTitle}>{title}</Text>
          <Text style={styles.assetListLeftSubTitle}>{currencyName}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.assetListRightTitle}>{coin}</Text>
        <Text style={styles.assetListRightSubTitle}>{balance}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AssetListItem;
const styles = StyleSheet.create({
  assetListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(16),
  },
  assetListLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assetListTextContainer: {
    marginLeft: moderateScale(12),
  },
  assetListLeftTitle: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
    paddingBottom: moderateScale(5),
  },
  assetListLeftSubTitle: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.s,
    fontWeight: '500',
  },
  assetListRightTitle: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
    textAlign: 'right',
    paddingBottom: moderateScale(5),
  },
  assetListRightSubTitle: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.s,
    fontWeight: '500',
    textAlign: 'right',
  },
});
