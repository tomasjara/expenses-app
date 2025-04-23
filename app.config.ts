import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: process.env.APP_ENV === 'development' ? 'Expenses App [Debug]' : 'Expenses App',
  slug: process.env.APP_ENV === 'development' ? 'expenses-app-debug' : 'expenses-app',
  version: process.env.APP_ENV === 'development' ? '1.0.0-dev' : '1.0.0',
  scheme: process.env.APP_ENV === 'development' ? 'expensesdebug' : 'myapp',
  icon:  './assets/images/icon.png',
  ios: {
    supportsTablet: true,
  },
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#E4E4E4',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#E4E4E4',
    },
    package: process.env.APP_ENV === 'development'
      ? 'com.tomasjd.expensesapp.debug'
      : 'com.tomasjd.expensesapp',
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
