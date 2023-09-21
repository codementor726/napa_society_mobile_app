import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BackIcon, Search} from '../assets/svg';
import Header from '../common/Header';
import Layout from '../common/Layout';
import AssetsToken from '../components/AssetsToken';
import AssetsNFT from '../components/AssetsNFT';
import {AssetTab} from '../const/assets';
import Tabs from '../common/Tabs';

const AssetsScreen = () => {
  const {goBack} = useNavigation();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  return (
    <Layout>
      <Header
        leftChildren={
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={goBack}>
              <BackIcon color={'#677778'} />
            </TouchableOpacity>
          </View>
        }
        title={false}
        centerTitle="Assets"
        rightChildren={
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
              <Search color={'#677778'} />
            </TouchableOpacity>
          </View>
        }
      />
      <Tabs
        data={AssetTab}
        activeTabIndex={activeTabIndex}
        setActiveTabIndex={setActiveTabIndex}
      />
      {activeTabIndex == 0 && <AssetsToken />}
      {activeTabIndex == 1 && <AssetsNFT />}
    </Layout>
  );
};

export default AssetsScreen;
