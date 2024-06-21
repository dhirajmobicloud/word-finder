import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.mobicloud.wordplay",
  appName: "Word Play",
  webDir: "build",
  bundledWebRuntime: false,
  server: {
    hostname : "wordplay.local"
  },
  plugins: {
    DeepLinks: {
      schemes: ["wordplay"],
      hosts: ["wordplay.local"],
    },
  },

};

export default config;
