import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
type TabsProps = {
  data: string[];
  activeTabIndex: number;
  setActiveTabIndex: CallableFunction;
};

const BlueTabs: React.FC<TabsProps> = ({
  data,
  activeTabIndex,
  setActiveTabIndex,
}) => {
  return (
    <View>
      <ScrollView horizontal style={[styles.socialArtitems]}>
        {data?.map((val, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.containerStyle,
                activeTabIndex === index ? styles.activeContainer : null,
              ]}
              onPress={() => setActiveTabIndex(index)}>
              <Text
                style={[
                  styles.socialArtText,
                  activeTabIndex === index ? styles.activeTab : null,
                ]}>
                {val}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default BlueTabs;
const styles = StyleSheet.create({
  socialArtitems: {
    // marginHorizontal: moderateScale(24),
    marginHorizontal: moderateScale(10),
    paddingBottom: moderateScale(5),
    marginTop: moderateScale(20),
  },
  activeContainer: {
    borderWidth: 0,
    backgroundColor: themeColors.aquaColor,
  },
  socialArtText: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  containerStyle: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: themeColors.garyColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(10),
  },
  activeTab: {
    color: themeColors.black,
  },
});
