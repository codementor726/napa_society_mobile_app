import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {size} from '../theme/fontstyle';
import {Fontfamily} from '../theme/fontFamily';
type MintProps = {
  title?: string;
  count?: any;
  navigation?: any;
  isDisable?: boolean;
  containerStyle?: any;
};
const NapaCount: React.FC<MintProps> = ({
  count,
  navigation,
  isDisable,
  containerStyle,
  title,
}) => {
  return (
    <>
      <View style={{...styles.counter, ...containerStyle}}>
        {!isNaN(count) ? (
          <Text style={styles.napaText}>{isNaN(count) ? '' : count}</Text>
        ) : (
          <ActivityIndicator size="large" color="#fff" />
        )}
        <TouchableOpacity
          disabled={isDisable}
          style={styles.napaContainer}
          onPress={() => navigation.navigate('WALLETCURRENCY')}>
          {count && <Text style={styles.napaTextSmall}>{title}</Text>}
          {isDisable ? null : (
            <Image
              source={require('../assets/icons/arrow_down.png')}
              style={styles.CounterNapaIcon}
            />
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

export default NapaCount;

const styles = StyleSheet.create({
  counter: {
    paddingHorizontal: moderateScale(20),
    flexDirection: 'row',
    alignItems: 'flex-end',
    zIndex: 0,
  },
  napaText: {
    fontWeight: '500',
    maxWidth: '70%',
    color: themeColors.primaryColor,
    fontSize: size.xxlg,
    fontFamily: Fontfamily.Grostestk,
  },
  napaTextSmall: {
    color: themeColors.garyColor,
    marginLeft: moderateScale(20),
    marginBottom: Platform.OS == 'ios' ? moderateScale(5) : moderateScale(9),
    fontSize: size.md,
    // fontWeight: '700',
    fontFamily: Fontfamily.Neuropolitical,
  },
  napaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginLeft: 16,
    zIndex: 0,
  },
  CounterNapaIcon: {
    marginBottom: 5,
    marginLeft: 9,
  },
});
