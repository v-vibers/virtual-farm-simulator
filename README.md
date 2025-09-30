# 🌱 Virtual Farm Simulator

A fun, interactive virtual farming game where you can grow crops, earn money, and build your dream farm! Built with React 18, TypeScript, and integrated with Subscribe.dev for authentication and cloud storage.

## Features

- 💰 **Click to Earn**: Generate money by clicking the earn button
- 🌾 **Plant Seeds**: Choose from 5 different types of seeds (Carrot, Tomato, Wheat, Corn, Sunflower)
- ⏰ **Real-time Growth**: Watch your plants grow in real-time with progress bars
- 🏆 **Harvest & Profit**: Harvest fully grown crops and earn money
- ☁️ **Cloud Sync**: Your farm progress is automatically saved to the cloud via Subscribe.dev (when authenticated)
- 🎮 **Demo Mode**: Play without authentication using local storage (perfect for development)
- 📊 **Stats Dashboard**: Track your balance, growing plants, credits, and subscription plan
- 🌙 **Dark Mode**: Beautiful dark theme support with smooth transitions

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- A Subscribe.dev account and project token

### Installation

1. Clone the repository:
```bash
git clone https://github.com/v-vibers/virtual-farm-simulator.git
cd virtual-farm-simulator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Development Mode (Demo Mode)

The app supports **development mode** which allows you to run and test the application without a Subscribe.dev account or project token:

- **No authentication required**: Click "Continue in Demo Mode" to skip sign-in
- **Local storage only**: Farm state is saved to browser localStorage
- **Full functionality**: All game features work normally
- **Perfect for development**: Test and develop without cloud dependencies

To use demo mode, simply start the app without setting `VITE_SUBSCRIBE_DEV_PROJECT_TOKEN` in your environment.

### Production Mode

For production deployment with cloud sync and authentication:

1. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

2. Get your Subscribe.dev project token:
   - Go to [subscribe.dev](https://subscribe.dev)
   - Create a project or use an existing one
   - Copy your project public key (starts with `pub_`)
   - Add it to your `.env` file:
```
VITE_SUBSCRIBE_DEV_PROJECT_TOKEN=pub_your_token_here
```

3. Restart the development server

## How to Play

1. **Choose Mode**:
   - Click "Sign In to Start Farming" for cloud-synced progress
   - Click "Continue in Demo Mode" to play without authentication (localStorage only)
2. **Earn Money**: Click the "Click to Earn $5" button to generate money
3. **Buy Seeds**: Use your money to purchase seeds from the shop
4. **Watch Them Grow**: Seeds will grow in real-time. Watch the progress bar fill up!
5. **Harvest**: When a plant is fully grown (100%), click "Harvest" to earn money
6. **Repeat**: Use your earnings to buy more expensive seeds for bigger profits!
7. **Dark Mode**: Toggle between light and dark themes using the moon/sun button

## Seed Types

| Seed | Cost | Growth Time | Sell Price | Profit |
|------|------|-------------|------------|--------|
| 🥕 Carrot | $10 | 30 seconds | $25 | $15 |
| 🍅 Tomato | $20 | 45 seconds | $50 | $30 |
| 🌾 Wheat | $15 | 60 seconds | $40 | $25 |
| 🌽 Corn | $30 | 90 seconds | $80 | $50 |
| 🌻 Sunflower | $50 | 120 seconds | $150 | $100 |

## Tech Stack

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **Subscribe.dev**: Authentication, cloud storage, and usage tracking
- **CSS3**: Modern styling with gradients and animations

## Project Structure

```
src/
├── components/
│   ├── SignInScreen.tsx    # Landing page and authentication
│   └── VirtualFarm.tsx      # Main game component
├── types.ts                 # TypeScript type definitions
├── App.tsx                  # Root component with auth routing
├── App.css                  # All styling
├── main.tsx                 # Entry point with Subscribe.dev provider
└── index.css                # Global styles
```

## Subscribe.dev Integration

This project uses Subscribe.dev for:
- **Authentication**: Secure sign-in/sign-out
- **Cloud Storage**: Farm state persists across devices
- **Usage Tracking**: Monitor API credits
- **Subscription Management**: Support for paid plans

The app follows Subscribe.dev's component separation pattern to properly handle React Hooks rules.

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## License

MIT

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

*Generated with [VGit](https://vgit.app) 🤖*
