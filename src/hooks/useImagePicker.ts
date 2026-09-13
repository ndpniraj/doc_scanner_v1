import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const useImagePicker = () => {
  const selectImage = async () => {
    try {
      const { assets, didCancel } = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });
      if (didCancel || !assets) throw Error;

      return assets[0];
    } catch (error) {
      return null;
    }
  };

  const captureImage = async () => {
    try {
      const { assets, didCancel } = await launchCamera({
        mediaType: 'photo',
      });
      if (didCancel || !assets) throw Error;

      return assets[0];
    } catch (error) {
      return null;
    }
  };

  return {
    selectImage,
    captureImage,
  };
};

export default useImagePicker;
