module.exports = {
  expo: {
    name: "BinGo",
    slug: "bingoapp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/favicon.png"
    },
    plugins: [
      "expo-router"
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      EXPO_PUBLIC_SUPABASE_URL: 'https://ttfgytlgvflkceggvdil.supabase.co',
      EXPO_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0Zmd5dGxndmZsa2NlZ2d2ZGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NTg1OTEsImV4cCI6MjA2MzIzNDU5MX0.Rg884syk5n799ak_BpgNYHRjrGXp8V8bsNR7GCtnvb8'
    }
  }
}; 