module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@app': './src',
          '@components': './src/components',
          '@constants': './src/constants',
          '@navigators': './src/navigators',
          '@screens': './src/screens',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
