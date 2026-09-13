import DeviceInfo from 'react-native-device-info';

export const isIOSSimulator = async () => {
  try {
    const isIOS = DeviceInfo.getSystemName().toLowerCase() === 'ios';
    const isSimulator = await DeviceInfo.isEmulator();

    return isIOS && isSimulator;
  } catch (error) {
    return false;
  }
};
