const config = {
  name: "777 HairVision",
  slug: "hairvision-777",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "dark",
  splash: {
    backgroundColor: "#0a0a0a",
  },
  ios: {
    supportsTablet: false,
    bundleIdentifier: "com.hairvision.app",
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#0a0a0a",
    },
    package: "com.hairvision.app",
  },
  plugins: ["expo-router", "expo-image-picker"],
  scheme: "hairvision",
};

export default config;