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
  usersearch: boolean;
  hideOption?: boolean;
};

const ProfileTab: React.FC<TabsProps> = ({
  data,
  activeTabIndex,
  setActiveTabIndex,
  usersearch,
  hideOption = false,
}) => {
  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={[styles.socialArtitems]}>
        {data?.map((val, index) => {
          return (
            <View key={index}>
              {hideOption ? (
                val == 'Users' ? (
                  <TouchableOpacity
                    key={index}
                    style={[styles.containerStyle]}
                    onPress={() => setActiveTabIndex(index)}>
                    <Text
                      style={[
                        styles.socialArtText,
                        activeTabIndex === index ? styles.activeTab : null,
                      ]}>
                      {val}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    disabled={true}
                    key={index}
                    style={[styles.containerStyle]}
                    onPress={() => setActiveTabIndex(index)}>
                    <Text
                      style={[
                        styles.socialArtText,
                        activeTabIndex === index ? styles.activeTab : null,
                      ]}>
                      {val}
                    </Text>
                  </TouchableOpacity>
                )
              ) : (
                <TouchableOpacity
                  key={index}
                  style={[styles.containerStyle]}
                  onPress={() => setActiveTabIndex(index)}>
                  <Text
                    style={[
                      styles.socialArtText,
                      activeTabIndex === index ? styles.activeTab : null,
                    ]}>
                    {val}
                  </Text>
                </TouchableOpacity>
              )}
              {usersearch ? <View style={styles.border}></View> : null}
              {activeTabIndex === index && (
                <View style={styles.activeTabContainer}></View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ProfileTab;
const styles = StyleSheet.create({
  socialArtitems: {
    // marginHorizontal: moderateScale(24),
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
  },
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(12),
    paddingBottom: moderateScale(8),
  },
  activeTab: {
    color: themeColors.primaryColor,
  },
  activeTabContainer: {
    height: 1,
    width: 20,
    backgroundColor: themeColors.primaryColor,
    borderRadius: 100,
  },
  border: {
    height: 1,
    width: '100%',
    backgroundColor: themeColors.garyColor,
    borderRadius: 100,
  },
});
