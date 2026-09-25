module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@theme': './src/theme',
          '@common_comp': './src/components/common',
          '@screens': ['./src/screens'],
        },
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
      },
    ],
    'react-native-worklets/plugin',
  ],
};
