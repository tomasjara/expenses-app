import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: process.env.APP_ENV === 'development' ? 'Mis gastos[Dev]' : 'Mis gastos',
  slug: 'expenses-app',
  version: process.env.APP_ENV === 'development' ? '5.0.0-dev' : '5.0.0',
  scheme: process.env.APP_ENV === 'development' ? 'expensesdebug' : 'myapp',
  icon:  './assets/images/icon.jpg',
  ios: {
    supportsTablet: true,
  },
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#000000',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#E4E4E4',
    },
    package: process.env.APP_ENV === 'development'
      ? 'com.tomasjd.expensesapp.debug'
      : 'com.tomasjd.expensesapp',
      versionCode: 5
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    ['expo-router']
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: '0b2df032-1481-457b-a0c8-e3a829716935',
    },
    fact: 'kittens are cool',
    env: process.env.APP_ENV || 'production',
  },
});
