import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Layout from '../common/Layout';
import Header from '../common/Header';
import {useNavigation} from '@react-navigation/native';
import {BackIcon, PlusIcon} from '../assets/svg';
import {themeColors} from '../theme/colors';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {Fontfamily} from '../theme/fontFamily';
import {fontSize} from '../responsive';
import {size} from '../theme/fontstyle';
import MinusIcon from '../assets/svg/MinusIcon';

const Faq = () => {
  const {goBack} = useNavigation<any>();
  const [napa, setNapa] = useState<boolean>(false);
  const [napaContact, setNapaContact] = useState<boolean>(false);
  const [withdrawFund, setWithdrawFund] = useState<boolean>(false);
  const [gasFee, setGasFee] = useState<boolean>(false);
  const [nftSale, setNftSale] = useState<boolean>(false);
  const [marketPlace, setMarketPlace] = useState<boolean>(false);
  const [napaPayouts, setNapaPayouts] = useState<boolean>(false);
  const [napaSupport, setNapaSupport] = useState<boolean>(false);
  const [napaWallet, setNapaWallet] = useState<boolean>(false);
  const [napaToken, setNapaToken] = useState<boolean>(false);
  const [walletDecentralized, setWalletDecentralized] =
    useState<boolean>(false);
  const [personalData, setPersonalData] = useState<boolean>(false);
  const [withdraw, setWithdraw] = useState<boolean>(false);
  const [moderation, setModeration] = useState<boolean>(false);
  const [guidelines, setGuidelines] = useState<boolean>(false);

  return (
    <Layout>
      <Header
        leftChildren={
          <TouchableOpacity onPress={() => goBack()}>
            <BackIcon color="white" />
          </TouchableOpacity>
        }
        title={false}
        centerTitle="FAQ"
      />
      <ScrollView>
        <View>
          <View>
            <View style={styles.mainContainer}>
              <View style={styles.container}>
                <Text style={styles.questionText}>What is NAPA?</Text>
                <Pressable onPress={() => setNapa(!napa)}>
                  {napa ? <MinusIcon /> : <PlusIcon />}
                </Pressable>
              </View>
              {napa && (
                <Text style={styles.answerText}>
                  NAPA Society is a web3 social media ecosystem that allows to
                  own their content and monetizes users based on awards
                </Text>
              )}
            </View>
          </View>
          <View>
            <View style={styles.mainContainer}>
              <View style={styles.container}>
                <Text style={styles.questionText}>How Does NAPA Work</Text>
                <Pressable onPress={() => setNapaContact(!napaContact)}>
                  {napaContact ? <MinusIcon /> : <PlusIcon />}
                </Pressable>
              </View>
              {napaContact && (
                <Text style={styles.answerText}>
                  First step is to create your post, then mint your post and
                  earn your napa rewards over a 12 hour period. After you redeem
                  your rewards, you must then sell your post to trigger the
                  earnings from fees. You are able to collect up to 20% of the
                  lifetime earnings from the posts views as the origina creator.
                  You will also be listed as the original creator on the
                  ethereum network
                </Text>
              )}
            </View>
          </View>
          <View>
            <View style={styles.mainContainer}>
              <View style={styles.container}>
                <Text style={[styles.questionText, {width: '90%'}]}>
                  How do NAPA tokens rewards payouts work?
                </Text>
                <Pressable onPress={() => setWithdrawFund(!withdrawFund)}>
                  {withdrawFund ? <MinusIcon /> : <PlusIcon />}
                </Pressable>
              </View>
              {withdrawFund && (
                <Text style={styles.answerText}>
                  Users who post and mint their video will have a 12 hour period
                  in whtich their post is eligible to be awarded by NAPA users.
                  Unlike Instgram where you have to buy gifts to give gifts.
                  Giving a user an award on NAPA is free to you and the tokens
                  received have a true value and uitlity function within the
                  NAPA ecosystem.
                </Text>
              )}
            </View>
          </View>
          <View>
            <View style={styles.mainContainer}>
              <View style={styles.container}>
                <Text
                  style={[
                    styles.questionText,
                    {
                      width:
                        Dimensions.get('window').width < 337 ? '90%' : '90%',
                    },
                  ]}>
                  What are gas fees on Ethereum?
                </Text>
                <Pressable onPress={() => setGasFee(!gasFee)}>
                  {gasFee ? <MinusIcon /> : <PlusIcon />}
                </Pressable>
              </View>
              {gasFee && (
                <Text style={styles.answerText}>
                  The gas fees are based on the network traffic. The busier the
                  network the higher the gas fees.
                </Text>
              )}
            </View>
          </View>
          <View>
            <View style={styles.mainContainer}>
              <View style={styles.container}>
                <Text style={styles.questionText}>
                  Where can I find my transactions?
                </Text>
                <Pressable onPress={() => setNftSale(!nftSale)}>
                  {nftSale ? <MinusIcon /> : <PlusIcon />}
                </Pressable>
              </View>

              {nftSale && (
                <Text style={styles.answerText}>
                  All transactions are recorded to the ethereum network, but can
                  easily found in your NAPA account in the wallet section under
                  the transactions tab.
                </Text>
              )}
            </View>
          </View>
        </View>
        <View>
          <View style={styles.mainContainer}>
            <View style={styles.container}>
              <Text style={[styles.questionText, {width: '90%'}]}>
                How do I list my minted postt in the marketplace ?
              </Text>
              <Pressable onPress={() => setMarketPlace(!marketPlace)}>
                {marketPlace ? <MinusIcon /> : <PlusIcon />}
              </Pressable>
            </View>
            {marketPlace && (
              <Text style={styles.answerText}>
                Listing your post in the marketplace is a very simple 2 step
                process. Step 1 - Go to the minted post tab and redeem payout
                first and then select Submit to Marketplace {'\n'}
                Step 2 - Set your sale details, submit your post and you are all
                set.
              </Text>
            )}
          </View>
        </View>
        <View>
          <View style={styles.mainContainer}>
            <View style={styles.container}>
              <Text style={styles.questionText}>
                What is the NAPA payouts tiers system?
              </Text>
              <Pressable onPress={() => setNapaPayouts(!napaPayouts)}>
                {napaPayouts ? <MinusIcon /> : <PlusIcon />}
              </Pressable>
            </View>

            {napaPayouts && (
              <Text style={styles.answerText}>
                NAPA has a 5 tier awards system in which the number of awards
                earned from your post at the end of the 12hr period will
                determine your token payout once approcved. See the Payouts Page
                to determine which tier your post will be fall into.
              </Text>
            )}
          </View>
        </View>
        <View>
          <View style={styles.mainContainer}>
            <View style={styles.container}>
              <Text style={[styles.questionText, {width: '90%'}]}>
                Which networks does NAPA support?
              </Text>
              <Pressable onPress={() => setNapaSupport(!napaSupport)}>
                {napaSupport ? <MinusIcon /> : <PlusIcon />}
              </Pressable>
            </View>

            {napaSupport && (
              <Text style={styles.answerText}>
                NAPA supports Ethereum, Polygon and BNB Chain. Polly and BNB are
                scheduled for later updates.
              </Text>
            )}
          </View>
        </View>
        <View>
          <View style={styles.mainContainer}>
            <View style={styles.container}>
              <Text style={styles.questionText}>
                How do deposit into my NAPA wallet?
              </Text>
              <Pressable onPress={() => setNapaWallet(!napaWallet)}>
                {napaWallet ? <MinusIcon /> : <PlusIcon />}
              </Pressable>
            </View>

            {napaWallet && (
              <Text style={styles.answerText}>
                Go to your NAPA wallet and select your accounnt address or have
                the sender scan your accounts QR code to recieve tokens, or
                NFT"s to your account.
              </Text>
            )}
          </View>
        </View>
        <View>
          <View style={styles.mainContainer}>
            <View style={styles.container}>
              <Text style={[styles.questionText, {width: '90%'}]}>
                Can I sumbit and earn form the same video submitted by another
                user?
              </Text>
              <Pressable onPress={() => setNapaToken(!napaToken)}>
                {napaToken ? <MinusIcon /> : <PlusIcon />}
              </Pressable>
            </View>
            {napaToken && (
              <Text style={styles.answerText}>
                Sorry, but NAPA does not payout for duplicated content. Once
                your post has passed our moderation standards, we then process
                your minted posts through our AI engine determine if this post
                has an original creator. Duplicated posts will not be honored
                with rewards out of respect to the original creator.
              </Text>
            )}
          </View>
        </View>
        <View>
          <View style={styles.mainContainer}>
            <View style={styles.container}>
              <Text style={styles.questionText}>
                Is the NAPA wallet decentralized?
              </Text>
              <Pressable
                onPress={() => setWalletDecentralized(!walletDecentralized)}>
                {walletDecentralized ? <MinusIcon /> : <PlusIcon />}
              </Pressable>
            </View>
            {walletDecentralized && (
              <Text style={styles.answerText}>
                YES, the NAPA wallet is decentralized and we do not custody your
                funds.
              </Text>
            )}
          </View>
        </View>
        <View>
          <View style={styles.mainContainer}>
            <View style={styles.container}>
              <Text style={styles.questionText}>
                Does NAPA maintan my personal data?
              </Text>
              <Pressable onPress={() => setPersonalData(!personalData)}>
                {personalData ? <MinusIcon /> : <PlusIcon />}
              </Pressable>
            </View>
            {personalData && (
              <Text style={styles.answerText}>
                NAPA only retains your name and email address. We do not nor
                will ever ask for personal data such as date of birth or
                address.
              </Text>
            )}
          </View>
        </View>
        <View>
          <View style={styles.mainContainer}>
            <View style={styles.container}>
              <Text style={[styles.questionText, {width: '90%'}]}>
                What if my deposit or withdrawal is not reflecting in my NAPA
                wallet?
              </Text>
              <Pressable onPress={() => setWithdraw(!withdraw)}>
                {withdraw ? <MinusIcon /> : <PlusIcon />}
              </Pressable>
            </View>
            {withdraw && (
              <Text style={styles.answerText}>
                Please send support email to our support team with the
                transaction hash.
              </Text>
            )}
          </View>
        </View>
        <View>
          <View style={styles.mainContainer}>
            <View style={styles.container}>
              <Text style={styles.questionText}>
                Does NAPA moderate my posts content?
              </Text>
              <Pressable onPress={() => setModeration(!moderation)}>
                {moderation ? <MinusIcon /> : <PlusIcon />}
              </Pressable>
            </View>
            {moderation && (
              <Text style={styles.answerText}>
                Yes, NAPA moderates posts content for nudity, extreme violence,
                racist images and text, gore images, and guns.
              </Text>
            )}
          </View>
        </View>
        <View>
          <View style={[styles.mainContainer]}>
            <View style={styles.container}>
              <Text style={[styles.questionText, {width: '90%'}]}>
                Does NAPA have guidelines on which posts are eligible for
                awards?
              </Text>
              <Pressable onPress={() => setGuidelines(!guidelines)}>
                {guidelines ? <MinusIcon /> : <PlusIcon />}
              </Pressable>
            </View>
            {guidelines && (
              <Text style={styles.answerText}>
                NAPA is platform that promotes creativity. So we encourage our
                users to always post original and creative content. We do not
                allow users to earn based on original productions such as
                posting movie clips, sports events and commercial
                re-broacasting. Our AI engine detects this type of content and
                if detected the payout is rejected.
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Faq;

const styles = StyleSheet.create({
  mainContainer: {
    borderBottomWidth: 1,
    borderBottomColor: themeColors.garyColor,
    paddingVertical: verticalScale(20),
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: moderateScale(20),
  },
  questionText: {
    color: themeColors.primaryColor,
    fontWeight: '400',
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.lg,
  },
  answerText: {
    color: themeColors.primaryColor,
    fontWeight: '500',
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    marginHorizontal: moderateScale(20),
    paddingTop: verticalScale(20),
    textAlign: 'justify',
  },
});
