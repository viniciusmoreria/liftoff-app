import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

interface DeviceUtils {
  isNarrowPhone: boolean;
  isSmallPhone: boolean;
  isLargePhone: boolean;
  isTallPhone: boolean;
  isTinyPhone: boolean;
}

const iPhoneXHeight = 812;
const iPhoneXWidth = 375;
const iPhone6Height = 667;
const iphoneSEHeight = 568;

const deviceDimensions: DeviceUtils = {
  isNarrowPhone: width < iPhoneXWidth,
  isSmallPhone: height <= iPhone6Height,
  isLargePhone: width >= iPhoneXWidth,
  isTallPhone: height >= iPhoneXHeight,
  isTinyPhone: height <= iphoneSEHeight,
};

export default deviceDimensions as DeviceUtils;
