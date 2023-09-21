import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import Layout from '../common/Layout';
import {SCREENS} from '../typings/screens-enums';
import {useNavigation} from '@react-navigation/native';
import {BackIcon} from '../assets/svg';
import {useSelector} from 'react-redux';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import Header from '../common/Header';

const RecoveryScreen = () => {
  const {navigate} = useNavigation<any>();
  const getProfileDetails = useSelector(selectProfileList);
  return (
    <Layout>
      <Header
        leftChildren={
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => navigate(SCREENS.CREATEPROFILE)}>
              <BackIcon color="white" />
            </TouchableOpacity>
          </View>
        }
        title={false}
        centerTitle={'Recovery'}
      />
    </Layout>
  );
};

export default RecoveryScreen;
