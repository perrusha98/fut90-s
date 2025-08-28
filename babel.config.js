module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [ [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@api': './src/api',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    ],
      'react-native-worklets/plugin',
  ],
  
};
