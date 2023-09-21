import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
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

const Tabs: React.FC<TabsProps> = ({
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

export default Tabs;
const styles = StyleSheet.create({
  socialArtitems: {
    marginHorizontal: moderateScale(22),
    paddingBottom: moderateScale(5),
    marginTop: moderateScale(20),
  },
  socialArtText: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.lg,
    marginRight: 20,
    paddingBottom: 2,
  },
  activeTab: {
    color: 'white',
    borderBottomColor: 'lightgray',
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 1,
  },
});
