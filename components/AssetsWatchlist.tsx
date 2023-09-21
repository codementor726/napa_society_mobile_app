import {StyleSheet, View, FlatList} from 'react-native';
import React from 'react';
import AssetsWatchlistList from './AssetsWatchlistList';

type AssetsWatchlistProps = {
  containerStyle?: any;
  WatchList?: any;
};

const AssetsWatchlist: React.FC<AssetsWatchlistProps> = ({
  containerStyle,
  WatchList,
}) => {
  return (
    <View
      style={{
        // ...styles.container,
        ...containerStyle,
      }}>
      <FlatList
        data={WatchList}
        keyExtractor={(_, index) => `assets-list-${index}`}
        renderItem={({item}) => (
          <AssetsWatchlistList
            title={item?.name}
            points={item?.amount}
            highestOffer={0.18}
            floor={0.18}
            imgUri={item?.image || item?.avatar}
          />
        )}
      />
    </View>
  );
};

export default AssetsWatchlist;

const styles = StyleSheet.create({});
