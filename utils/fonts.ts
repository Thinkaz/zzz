import { Platform } from 'react-native';

const fontFamilies = {
  ios: {
    regular: 'San Francisco',
    bold: 'San Francisco Bold',
    medium: 'San Francisco Medium',
    mono: 'Space Mono',
  },
  android: {
    regular: 'OpenSans-Regular',
    bold: 'OpenSans-Bold',
    medium: 'OpenSans-Medium',
    mono: 'monospace',
  },
};

const fonts = Platform.select(fontFamilies);

export default fonts;