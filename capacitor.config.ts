import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.com",
  appName: "Word Play",
  webDir: "build",
  bundledWebRuntime: false,
  plugins: {
    DeepLinks: {
      schemes: ["wordplay"],
      hosts: ["wordplay.local"],
    },
  },
};

export default config;
