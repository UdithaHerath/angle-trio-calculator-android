import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.c3dad1e0be8040d29c50542a8125a567',
  appName: 'angle-trio-calculator-android',
  webDir: 'dist',
  server: {
    url: 'https://c3dad1e0-be80-40d2-9c50-542a8125a567.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    StatusBar: {
      style: 'dark',
      backgroundColor: '#1e40af'
    }
  }
};

export default config;