import { CapacitorConfig } from '@capacitor/cli';


const config: CapacitorConfig = {
  appId: 'dailytodo',
  appName: 'dailytodo',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    GoogleMaps: {
      APIKey: ""
    }    
  }
};

export default config;
