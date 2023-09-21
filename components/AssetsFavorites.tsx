import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import AssetsListFavorites from './AssetsListFavorites';

type AssetsFavoritesProps = {
  containerStyle?: any;
  WatchList?: any;
};
const AssetsFavorites: React.FC<AssetsFavoritesProps> = ({
  containerStyle,
  WatchList,
}) => {
  const data = [
    {
      id: '1',
      title: 'Dorothy Mccoy',
      heading: 'Expulsion from Paradise',
      point: '0.36 NAPA',
    },
    {
      id: '2',
      title: 'Dorothy Mccoy',
      heading: 'Expulsion from Paradise',
      point: '0.36 NAPA',
    },
    {
      id: '3',
      title: 'Dorothy Mccoy',
      heading: 'Expulsion from Paradise',
      point: '0.36 NAPA',
    },
    {
      id: '4',
      title: 'Dorothy Mccoy',
      heading: 'Expulsion from Paradise',
      point: '0.36 NAPA',
    },
    {
      id: '5',
      title: 'Dorothy Mccoy',
      heading: 'Expulsion from Paradise',
      point: '0.36 NAPA',
    },
    {
      id: '6',
      title: 'Dorothy Mccoy',
      heading: 'Expulsion from Paradise',
      point: '0.36 NAPA',
    },
  ];
  return (
    <ScrollView>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 70}}>
        {data.map((value: any, index: number) => {
          const {title, point, heading} = value;
          return (
            <AssetsListFavorites
              key={index}
              title={value?.title}
              point={value?.point}
              heading={value.heading}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default AssetsFavorites;

const styles = StyleSheet.create({});
