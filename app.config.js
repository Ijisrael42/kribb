const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'com.judah.kribb.dev';
  }

  if (IS_PREVIEW) {
    return 'com.judah.kribb.preview';
  }

  return 'com.judah.kribb';
};

const getAppName = () => {
  if (IS_DEV) {
    return 'Kribb (Dev)';
  }

  if (IS_PREVIEW) {
    return 'Kribb (Preview)';
  }

  return 'Kribb';
};

export default ({ config }) => ({
  ...config,
  name: getAppName(),
  extra: {
    ...config.extra,
    posthogProjectToken: process.env.POSTHOG_PROJECT_TOKEN,
    posthogHost: process.env.POSTHOG_HOST,
  },
  ios: {
    ...config.ios,
    bundleIdentifier: getUniqueIdentifier(),
  },
  android: {
    ...config.android,
    package: getUniqueIdentifier(),
  },

});

