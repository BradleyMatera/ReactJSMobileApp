# 📱 ReactJS Mobile App

A React Native Mobile Application powered by Expo, designed to fetch and display anime and character data using APIs. The app is optimized for deployment on mobile (Expo) and web (Vercel), showcasing a responsive design and seamless functionality across platforms.

## ✨ Features

- **Random Anime Fetching**
  - Uses the Jikan API to fetch a random anime, including its title, synopsis, and background image
  
- **Character Display**
  - Displays a list of characters fetched from a custom API endpoint
  
- **Responsive Design**
  - Styled for mobile and web using react-native and react-native-web
  
- **Web Export and Deployment**
  - Exported to a web-ready build using Webpack
  - Deployed to Vercel for live preview

## 🚀 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/ReactJSmobileApp.git
cd ReactJSmobileApp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run start
```

4. Run on specific platforms:
```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

## 📁 Project Structure

```
ReactJSmobileApp/
├── App.js               # Main entry point for the application
├── components/          # Reusable UI components
│   ├── Heading.js       # Dynamic heading component
│   ├── ListContainer.js # Component rendering a list of items
│   ├── ListItem.js      # Single list item component
├── assets/              # Static assets (images, etc.)
├── web-build/           # Exported web build directory (for Vercel)
├── package.json         # Project configuration and dependencies
├── vercel.json          # Vercel configuration for deployment
└── README.md            # Project documentation
```

## 🔌 APIs Used

### 1. Jikan API
- Endpoint: `https://api.jikan.moe/v4/random/anime`
- Fetches random anime details including:
  - Title
  - Synopsis
  - Images

### 2. Custom Anime Characters API
- Endpoint: `https://bradleycruddemo-1b86f27b4c16.herokuapp.com/api/v1/animeCharacters`
- Fetches a list of anime characters with attributes like:
  - Name
  - Power level
  - Anime origin

## 📦 Deployment

### Expo Deployment

1. Publish to Expo:
```bash
npx expo publish
```

2. Export for the web:
```bash
npx expo export:web
```

### Vercel Deployment

1. Configure vercel.json:
```json
{
  "version": 2,
  "builds": [
    { "src": "index.html", "use": "@vercel/static" }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

2. Deploy using Vercel CLI:
```bash
vercel --prod --cwd web-build
```

### Current Deployment Issue

❗ During deployment to Vercel, the following error occurs:

> Due to `builds` existing in your configuration file, the Build and Development Settings defined in your Project Settings will not apply. Learn More: https://vercel.link/unused-build-settings

This issue arises because the builds property in the vercel.json configuration overrides Vercel's default settings, preventing the use of the Build and Development Settings in the Vercel dashboard.

#### Workarounds Attempted:
- Adjusting the vercel.json configuration to remove unnecessary builds
- Running expo export:web to generate a valid web-build directory
- Deploying with the command: `vercel --prod --cwd web-build`

#### Next Steps:
- Explore removing or simplifying the vercel.json file
- Use alternative deployment strategies, such as directly linking to the build folder in the Vercel dashboard

## 📜 Scripts

- `npm run start`: Starts the development server
- `npm run android`: Runs the app on an Android emulator
- `npm run ios`: Runs the app on an iOS simulator
- `npm run web`: Starts the app in the browser
- `npm run build`: Exports the app for the web

## 🔧 Troubleshooting

### Common Issues

1. **Expo CLI Errors**
```bash
# Clear cache
expo start --clear

# Ensure all dependencies are up-to-date
npm install expo@latest react@latest react-native@latest
```

2. **Dependency Conflicts**
```bash
# Use the --legacy-peer-deps flag during installation
npm install --legacy-peer-deps
```

3. **Vercel Build Errors**
```bash
# Ensure web-build is properly exported
npx expo export:web

# Check deployment logs
vercel logs <deployment-url>
```

## 🌐 Live URLs

- Expo Project: Accessible via the Expo Go app
- Web Deployment: Vercel Live URL

## 🔮 Future Improvements

- Add authentication for restricted features
- Integrate user interactivity (like favoriting anime or characters)
- Enhance UI/UX for both mobile and web platforms

## 👨‍💻 Author

Bradley Matera
- GitHub
- LinkedIn