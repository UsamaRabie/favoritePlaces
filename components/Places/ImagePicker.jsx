import React, { useState } from 'react';
import { StyleSheet, View , Text, Alert, Image } from 'react-native';
import { launchCameraAsync } from 'expo-image-picker';
import { Colors } from '../../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';
import { PermissionStatus, useCameraPermissions } from 'expo-camera';
const ImagePicker = ({onTakeImage}) => {
  const [status, requestPermission] = useCameraPermissions();
  const [pickedImage, setPickedImage] = useState();
  
  async function AllowPermission() {
    
    if(status.status === PermissionStatus.UNDETERMINED){
      const permissionResponse = await requestPermission();
      return permissionResponse.granted
    }
    else if(status.status === PermissionStatus.DENIED)
    {
      Alert.alert("Can't use your camera" , "We need to get Permission to use the camera");
      return false
    }
    return true
    
  }
  
  async function handleCameraPicker() {
    const hasPermission = await AllowPermission();
    
    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    const imageUri = image?.assets[0]?.uri;
    setPickedImage(imageUri);
    onTakeImage(imageUri);
  }
  
  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }
  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={handleCameraPicker}>Take Image</OutlinedButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});