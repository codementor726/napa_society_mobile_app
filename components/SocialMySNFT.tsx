import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {FilterIcon} from '../assets/svg';
import {themeColors} from '../theme/colors';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import MysnftsList from './MysnftsList';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectMintedPostList,
  selectMintedPostLoading,
} from '../store/selectors/MintedSNFT';
import {
  selectAccountList,
  selectNapaWallet,
} from '../store/selectors/NapaAccount';
import {fetchMintedPost, setMintedPost} from '../store/slices/MintedSNFT';
import {useIsFocused} from '@react-navigation/native';
const SocialMySNFT = () => {
  const scrollViewRef = useRef(null);
  const dispatch = useDispatch();
  const mintedPost = useSelector(selectMintedPostList);
  const mintLoading = useSelector(selectMintedPostLoading);
  const account = useSelector(selectAccountList);
  const currentActive = useSelector(selectNapaWallet);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(setMintedPost([]));
    setTimeout(() => {
      if (account?.length) {
        console.log('refreshing');
        const selectedAccount = account?.find(
          (val: any, index: number) =>
            val[`NWA_${index + 1}_NE`] == val[`NWA_${currentActive}_NE`],
        );
        console.log(
          selectedAccount[`NWA_${currentActive}_AC`],
          'selectedAccount',
        );
        dispatch(
          fetchMintedPost({
            accountId: selectedAccount[`NWA_${currentActive}_AC`],
            offset: 0,
          }),
        );
      }
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleGetMintPosts = async () => {
    if (account.length) {
      const selectedAccount = account?.find(
        (val: any, index: number) =>
          val[`NWA_${index + 1}_NE`] == val[`NWA_${currentActive}_NE`],
      );
      dispatch(
        fetchMintedPost({
          accountId: selectedAccount[`NWA_${currentActive}_AC`],
          offset: mintedPost?.length || 0,
        }),
      );
    }
  };

  useEffect(() => {
    handleGetMintPosts();
  }, [account, currentActive, isFocused]);

  return (
    <ScrollView
      style={{paddingBottom: 20}}
      ref={scrollViewRef}
      onScroll={({nativeEvent}) => {
        const isCloseToBottom =
          nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
          nativeEvent.contentSize.height - 20;
        if (isCloseToBottom) {
          if (currentActive && account) {
            const selectedAccount = account?.find(
              (val: any, index: number) =>
                val[`NWA_${index + 1}_NE`] == val[`NWA_${currentActive}_NE`],
            );
            if (selectedAccount) {
              dispatch(
                fetchMintedPost({
                  accountId: selectedAccount[`NWA_${currentActive}_AC`],
                  offset: mintedPost?.length,
                }),
              );
            }
          }
        }
      }}
      refreshControl={
        <RefreshControl
          progressBackgroundColor="transparent"
          colors={['white']}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
      <View style={{marginBottom: 60}}>
        {/* <View style={styles.filterContainer}>
          <FilterIcon />
          <Text style={styles.filterText}>Filters</Text>
        </View> */}

        {!mintLoading ? (
          mintedPost.length ? (
            mintedPost?.map((post: any, index: number) => {
              return (
                <MysnftsList
                  key={index}
                  title={post?.SNFTTitle}
                  imgUri={post?.thumbnail}
                  Minted={post?.minted}
                  earned={post?.napaTokenEarned}
                  payoutsCategory={post?.payoutsCategory}
                  mintedTimeStamp={post?.timeMinted}
                  isExpired={post?.isExpired}
                  napaTokenEarned={post?.napaTokenEarned}
                  status={post?.status}
                  closingDate={post?.closingDate}
                  mintId={post?.mintId}
                  postId={post?.postId}
                  marketPlaceListed={post?.marketplace_listed}
                  snftId={post?.snftId}
                  profileId={post?.profileId}
                  allTimeViews={post?.allTimeViews}
                />
              );
            })
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: moderateScale(100),
              }}>
              <Text
                style={{
                  color: themeColors.garyColor,
                  fontFamily: Fontfamily.Avenier,
                  fontSize: size.lg,
                  fontWeight: 'bold',
                }}>
                No Post Found
              </Text>
            </View>
          )
        ) : (
          <View
            style={{
              height: 400,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color={themeColors.primaryColor} />
          </View>
        )}
      </View>
    </ScrollView>
  );
};
export default SocialMySNFT;
const styles = StyleSheet.create({
  filterContainer: {
    marginTop: verticalScale(20),
    marginLeft: moderateScale(20),
    flexDirection: 'row',
  },
  filterText: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    color: themeColors.primaryColor,
    fontWeight: '500',
    marginLeft: moderateScale(10),
  },
});
