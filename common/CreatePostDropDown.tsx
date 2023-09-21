import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {RightIcon} from '../assets/svg/RightIcon';
import {moderateScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {switchNapaAccount} from '../services/napaAccounts';
import {useSelector} from 'react-redux';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {selectNapaWallet} from '../store/selectors/NapaAccount';

type CreatePostDropdownProps = {
  data: any;
  selectedOption?: any;
  setSelectedOption?: any;
};

const CreatePostDropdownProps: React.FC<CreatePostDropdownProps> = ({
  data,
  selectedOption,
  setSelectedOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const profileId = useSelector(selectProfileList).profileId;
  const currentActive = useSelector(selectNapaWallet);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = async (accountAddress: any) => {
    const {error}: any = await switchNapaAccount(profileId, accountAddress);
    if (error) {
      console.log(error, 'errorrr');
      return;
    }
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdownHeader} onPress={toggleDropdown}>
        <Text style={styles.dropdownHeaderText}>{selectedOption}</Text>
        <Image
          source={require('../assets/icons/arrow_down.png')}
          style={styles.headerIcon}
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdownOptions}>
          {data?.map((option: any, index: number) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.optionItem}
                onPress={() => {
                  setSelectedOption(option);
                  setIsOpen(!isOpen);
                }}>
                <Text style={styles.dropdownOption}>{option}</Text>
                {option == selectedOption && (
                  <RightIcon height={15} width={15} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    maxWidth: moderateScale(120),
    zIndex: 1,
    elevation: 2,
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  dropdownHeaderText: {
    fontSize: 16,
    color: 'white',
  },
  dropdownOptions: {
    position: 'absolute',
    top: '100%',
    width: '100%',
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: themeColors.garyColor,
    borderRadius: 5,
    marginTop: 5,
    maxHeight: 250,
    overflow: 'scroll',
  },
  optionItem: {
    padding: 10,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIcon: {
    marginTop: 4.5,
    marginLeft: 10,
  },
  dropdownOption: {
    color: 'white',
  },
});

export default CreatePostDropdownProps;
