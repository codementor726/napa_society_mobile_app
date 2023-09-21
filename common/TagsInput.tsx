import React from 'react';
import {TouchableOpacity, Text, View, ScrollView} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Tags from 'react-native-tags';
import {CrossIcon} from '../assets/svg';
import {themeColors} from '../theme/colors';

type TagInputsProps = {
  title: string;
  tagPeople: any;
};

const TagInputs: React.FC<TagInputsProps> = ({title, tagPeople}) => (
  <>
    <Text
      style={{
        color: themeColors.garyColor,
        marginTop: moderateScale(15),
      }}>
      {title}
    </Text>
    <View
      style={{
        marginTop: moderateScale(15),
        borderWidth: 1,
        borderColor: themeColors.garyColor,
        height: 120,
        paddingBottom: moderateScale(5),
        borderRadius: 24,
        paddingVertical: moderateScale(10),
        paddingRight: moderateScale(10),
      }}>
      <ScrollView>
        <Tags
          textInputProps={{
            placeholder: 'Any type of animal',
          }}
          // initialTags={['a', 'b', 'c']}
          onChangeTags={tags => tagPeople(tags)}
          onTagPress={(index, tagLabel, event, deleted) => {}}
          containerStyle={{justifyContent: 'center'}}
          inputStyle={{backgroundColor: 'black', color: 'white'}}
          renderTag={({tag, index, onPress, deleteTagOnPress, readonly}) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              key={`${tag}-${index}`}>
              <Text style={{color: 'white', marginLeft: 20, marginBottom: 3}}>
                {tag}
              </Text>
              <TouchableOpacity onPress={onPress} style={{marginLeft: 10}}>
                <CrossIcon height={20} width={16} />
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>
    </View>
  </>
);

export default TagInputs;
