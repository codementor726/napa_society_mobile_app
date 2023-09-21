import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Layout from '../common/Layout';
import Header from '../common/Header';
import {BackIcon, Search} from '../assets/svg';
import {useNavigation} from '@react-navigation/native';
import {themeColors} from '../theme/colors';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {Languages} from '../const/Language';

const Language = () => {
  const {goBack} = useNavigation<any>();
  const [languages, setLanguages] = React.useState<any>([]);
  const data = languages.filter((item: any) => {
    return item.language == item.language.includes(3);
  });

  return (
    <Layout>
      <Header
        leftChildren={
          <TouchableOpacity onPress={() => goBack()}>
            <BackIcon color="white" />
          </TouchableOpacity>
        }
        title={false}
        centerTitle="Language"
        rightChildren={
          <TouchableOpacity>
            <Search color={themeColors.garyColor} />
          </TouchableOpacity>
        }
      />
      <View style={{marginTop: 20}}>
        <FlatList
          data={Languages}
          renderItem={({item, index}: any) => {
            return (
              <TouchableOpacity style={styles.container} key={index}>
                <Image
                  style={styles.flag}
                  source={{
                    uri: `https://flagcdn.com/48x36/${item?.code?.toLowerCase()}.png`,
                  }}
                />
                <Text style={{color: 'white'}}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </Layout>
  );
};

export default Language;

const styles = StyleSheet.create({
  flag: {
    width: 57,
    height: 38,
    borderRadius: 7,
    marginRight: 10,
  },
  container: {
    flexDirection: 'row',
    paddingVertical: verticalScale(10),
    marginHorizontal: moderateScale(20),
    alignItems: 'center',
  },
});
