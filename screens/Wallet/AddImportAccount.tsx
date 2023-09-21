import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Layout from '../../common/Layout';
import Header from '../../common/Header';
import {BackIcon,} from '../../assets/svg';
import {moderateScale} from 'react-native-size-matters';
import {size} from '../../theme/fontstyle';
import CTTextinput from '../../common/CTTextinput';
import CTButton from '../../common/CTButton';
import GrayEyeIcon from '../../assets/svg/GrayEyeIcon';
import {useSelector} from 'react-redux';
import {selectProfileList} from '../../store/selectors/profileDetailSelector';
import {addNapaAccount} from '../../services/napaAccounts';
import {useToast} from 'react-native-toast-notifications';
import LoaderButton from '../../common/LoaderButton';
import ErrorToast from '../../common/toasters/ErrorToast';

const AddImportAccountScreen = () => {
  const {goBack} = useNavigation();

  const {params}: any = useRoute();

  const [name, setName] = useState('');
  const [key, setKey] = useState('');
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const toast = useToast();
  const refSymbol = useRef();
  const profileId = useSelector(selectProfileList).profileId;
  const [loading, setLoading] = useState(false);
  const addAccount = async () => {
    setLoading(true);
    if (params?.type == 'Add') {
      const {error, message}: any = await addNapaAccount(profileId, name);
      if (error) {
        toast.show(<ErrorToast message={message} />, {
          placement: 'top',
        });
        console.log(message, 'error');
        Keyboard.dismiss();
        setLoading(false);
        return;
      }
      setName('');
      goBack();
      setLoading(false);
    }
  };

  return (
    <>
      <Layout>
        <Header
          leftChildren={
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={goBack}>
                <BackIcon color={'#677778'} />
              </TouchableOpacity>
            </View>
          }
          childStyle={styles.childStyle}
          centerStyle={styles.centerStyle}
          rightStyle={styles.childStyle}
          title={false}
          centerTitle={params?.type == 'Add' ? 'Add Account' : 'Import Account'}
        />

        <View style={{height: moderateScale(20)}}></View>

        {params?.type == 'Add' ? (
          <>
            <CTTextinput
              title="Name"
              value={name}
              onChangeText={setName}
              focus={true}
              onSubmitText={() => {
                Keyboard.dismiss();
              }}
              editable={loading ? false : true}
            />
            {name?.length > 15 && (
              <Text style={styles.errorMessage}>
                Account name can't be greater than 15 character
              </Text>
            )}
          </>
        ) : (
          <CTTextinput
            title="Enter your private key string here"
            value={key}
            onChangeText={setKey}
            focus={true}
            onSubmitText={() => {
              Keyboard.dismiss();
            }}
            secureTextEntry={isSecureEntry}
            icon={
              <TouchableOpacity
                onPress={() => {
                  setIsSecureEntry(!isSecureEntry);
                }}>
                <GrayEyeIcon />
              </TouchableOpacity>
            }
          />
        )}

        <View style={{height: moderateScale(25)}}></View>
      </Layout>
      {loading ? (
        <LoaderButton />
      ) : (
        <CTButton
          onPress={addAccount}
          disabled={name.length > 15 || !name}
          title={params?.type == 'Add' ? 'Add' : 'Import'}
        />
      )}
    </>
  );
};

export default AddImportAccountScreen;
const styles = StyleSheet.create({
  childStyle: {
    width: '20%',
  },
  centerStyle: {
    width: '55%',
  },
  errorMessage: {
    paddingTop: moderateScale(10),
    marginHorizontal: moderateScale(20),
    color: 'red',
    fontSize: size.md,
  },
});
