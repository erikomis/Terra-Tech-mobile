import {
  ImagePickerSuccessResult,
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export const PickImageAsync = async () => {
  let result = await launchCameraAsync({
    mediaTypes: MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  return result;
};

export const PickImageGalleryAsync = async () => {
  let result = await launchImageLibraryAsync({
    mediaTypes: MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  return result;
};

export const MoveImageAsync = async (result: ImagePickerSuccessResult) => {
  const imageName = result.assets[0].uri.substring(
    result.assets[0].uri.lastIndexOf("/") + 1
  );

  const fileUri = FileSystem.documentDirectory + imageName;

  await FileSystem.moveAsync({
    from: result.assets[0].uri,
    to: fileUri,
  });

  return {
    fileUri,
    imageName,
  };
};
