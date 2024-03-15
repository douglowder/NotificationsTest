import { ExpoConfig, ConfigContext } from "@expo/config"

/**
 * @param config ExpoConfig coming from the static config app.json if it exists
 * 
 * You can read more about Expo's Configuration Resolution Rules here:
 * https://docs.expo.dev/workflow/configuration/#configuration-resolution-rules
 */
module.exports = ({ config }) => {
  const existingAndroid = config.android ?? {};

  return {
    ...config,
    android: {
      ...existingAndroid,
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    },
  };
}
