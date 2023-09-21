import React, {useState} from 'react';
import {TouchableOpacity, Text, Image} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const Modal = () => {
  const [state, setState] = useState<any>({});
  const openImagePicker = () => {
    const options: any = {
      mediaType: 'mixed',
      //   quality: 1,
    };
    launchImageLibrary(options, response => {
      //@ts-ignore
      if (response.uri) {
        //@ts-ignore
        setState({imageUri: response.uri});
      }
    });
  };

  return (
    <>
      <TouchableOpacity style={{marginTop: 30}} onPress={openImagePicker}>
        <Text style={{color: 'white'}}>Select Image</Text>
      </TouchableOpacity>
      <Image source={{uri: state.imageUri}} style={{width: 200, height: 200}} />
    </>
  );
};
export default Modal;

// import React, {useState, useEffect} from 'react';
// import {View, Image, Text, CameraRoll, TouchableOpacity} from 'react-native';

// const Modal = () => {
//   const [recentPhoto, setRecentPhoto] = useState(null);

//   useEffect(() => {
//     getRecentPhoto();
//   }, []);

//   const getRecentPhoto = async () => {
//     const {edges} = await CameraRoll.getPhotos({
//       first: 1,
//       assetType: 'Photos',
//       //@ts-ignore
//       sortBy: 'creationTime',
//       include: ['location'],
//     });

//     if (edges.length > 0) {
//       const {
//         node: {
//           image: {uri},
//         },
//       } = edges[0];
//       //@ts-ignore
//       setRecentPhoto(uri);
//     }
//   };

//   return (
//     <View>
//       {recentPhoto ? (
//         <Image source={{uri: recentPhoto}} style={{width: 200, height: 200}} />
//       ) : null}
//       <TouchableOpacity style={{marginTop: 30}} onPress={getRecentPhoto}>
//         <Text style={{color: 'white'}}>Button</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Modal;
