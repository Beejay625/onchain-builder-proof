# Onchain Builder Proof

> **Immortalize Your Weekly Achievements on the Blockchain**

Onchain Builder Proof is a decentralized application (dApp) that empowers builders, developers, and creators to mint their weekly achievements directly onchain through Talenty Protocol. Every milestone, every breakthrough, and every accomplishment becomes a permanent, verifiable record on the blockchain—creating an immutable proof of your journey as a builder.

The platform is powered by a **BuilderProof smart contract** deployed and verified on **Base chain** at address `0xD96Da91A4DC052C860F4cA452efF924bd88CC437`. This smart contract handles all onchain operations, ensuring your achievements are stored permanently on the blockchain with complete transparency and immutability.

Unlike traditional achievement systems that rely on centralized databases, this platform leverages blockchain technology to ensure your achievements are **permanently recorded**, **publicly verifiable**, and **truly owned by you**. Built with Next.js 16 and Reown AppKit, it provides a seamless Web3 experience for documenting your builder journey onchain.

## 🚀 Core Features

### Achievement Management
- ⛓️ **Onchain Minting**: Permanently record achievements on Base blockchain
- 📝 **Achievement Templates**: Quick-start templates for common achievements
- 🏷️ **Category System**: Organize achievements by type (Development, Design, Learning, etc.)
- 🔍 **Search & Filter**: Find achievements quickly with advanced filtering
- 📊 **Sort Options**: View achievements by newest, most liked, or most discussed

### Gamification & Progress
- 🏆 **Achievement Badges**: Unlock badges at milestone achievements (1, 5, 10, 25, 50, 100)
- 🎯 **Milestone Tracker**: Visual progress tracking toward next milestone
- 🔥 **Streak Tracking**: Monitor building consistency with current and longest streaks
- 📈 **Reputation System**: Earn reputation points through posts, likes, and comments
- ⭐ **Level System**: Progress from Beginner to Legend based on achievements

### Social Features
- 💬 **Comments**: Discuss achievements with other builders
- ❤️ **Reactions**: Show support with likes
- 💰 **Tipping**: Support builders directly with ETH
- 👥 **Follow System**: Connect with and follow other builders
- 🔗 **Social Sharing**: Share achievements on Twitter and LinkedIn
- 🌐 **Community Feed**: View recent builder activity

### Builder Profile
- 👤 **Profile Editor**: Update username and bio onchain
- 📊 **Builder Stats**: Comprehensive statistics dashboard
- 💼 **Portfolio Showcase**: Display your projects and work
- ✓ **Verification Badges**: Premium, Elite, and default verification tiers
- 📜 **Transaction History**: Track all onchain interactions

### Dashboard & Analytics
- 📈 **Analytics Dashboard**: View key metrics and insights
- 🎯 **Weekly Goals**: Set and track weekly objectives
- 🏅 **Leaderboard**: See top builders by timeframe
- 🔥 **Trending Achievements**: Discover popular recent achievements
- 📥 **Data Export**: Export achievements in JSON or CSV format

### Web3 Integration
- 🔐 **Wallet Connection**: Seamless connection via Reown AppKit
- 💰 **Balance Display**: View wallet balance in real-time
- ⛽ **Gas Estimation**: See estimated transaction costs
- 🌐 **Multi-Network**: Support for Base, Mainnet, Arbitrum, Optimism, and Polygon
- 🟢 **Network Status**: Real-time network connection indicator
- 📱 **Mobile Wallet Support**: Connect via WalletConnect

### User Experience
- 🔔 **Notifications**: Real-time alerts for engagement
- ⚡ **Quick Actions**: Fast access to common tasks
- 🎨 **Modern UI**: Beautiful, responsive interface with Tailwind CSS
- 📱 **Mobile Responsive**: Optimized for all screen sizes

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router) with Turbopack
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 4.1
- **Wallet Integration**: Reown AppKit 1.8 (formerly WalletConnect)
- **Web3 Libraries**: Wagmi 2.19 + Viem 2.39
- **State Management**: TanStack React Query 5.90
- **Smart Contract**: BuilderProof (Solidity) - Verified on BaseScan
- **Networks**: Base (primary), Mainnet, Arbitrum, Optimism, Polygon

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- A Reown Project ID from [Reown Dashboard](https://dashboard.reown.com)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "buikders dex"
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_PROJECT_ID=your_reown_project_id
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/
│   ├── dashboard/          # Main dashboard with achievements
│   ├── login/              # Wallet connection page  
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Landing page
│   ├── error.tsx           # Error boundary
│   ├── not-found.tsx       # 404 page
│   ├── loading.tsx         # Loading states
│   └── globals.css         # Global styles
├── components/             # React components
│   ├── AchievementCard.tsx
│   ├── AchievementTemplates.tsx
│   ├── Analytics.tsx
│   ├── BadgeDisplay.tsx
│   ├── BuilderStats.tsx
│   ├── CategoryFilter.tsx
│   ├── CommentSection.tsx
│   ├── CommunityFeed.tsx
│   ├── ExportButton.tsx
│   ├── FollowButton.tsx
│   ├── GasEstimator.tsx
│   ├── Leaderboard.tsx
│   ├── LoadingSpinner.tsx
│   ├── MilestoneTracker.tsx
│   ├── NetworkStatus.tsx
│   ├── Notifications.tsx
│   ├── PortfolioShowcase.tsx
│   ├── ProfileCard.tsx
│   ├── ProfileEditor.tsx
│   ├── QuickActions.tsx
│   ├── ReactionButton.tsx
│   ├── SearchBar.tsx
│   ├── ShareButton.tsx
│   ├── SortFilter.tsx
│   ├── StreakTracker.tsx
│   ├── TipButton.tsx
│   ├── TransactionHistory.tsx
│   ├── TrendingAchievements.tsx
│   ├── VerificationBadge.tsx
│   ├── WalletBalance.tsx
│   └── WeeklyGoals.tsx
├── config/
│   └── index.tsx           # Wagmi + Reown configuration
├── context/
│   └── index.tsx           # AppKit context provider
├── lib/
│   └── utils.ts            # Utility functions
├── types/
│   └── index.ts            # TypeScript type definitions
├── abi/
│   └── BuilderProof.ts     # Smart contract ABI
├── contracts/
│   └── BuilderProof.sol    # Smart contract source
├── next.config.js          # Next.js configuration
└── tailwind.config.ts      # Tailwind configuration
```

## Smart Contract

The application uses a deployed `BuilderProof` smart contract on **Base chain** that allows users to:
- Create posts (achievements)
- Add comments
- Add reactions
- Update profiles
- Track reputation

**Contract Address**: `0xD96Da91A4DC052C860F4cA452efF924bd88CC437`  
**Network**: Base Chain  
**Status**: ✅ Verified on BaseScan

## Environment Variables

- `NEXT_PUBLIC_PROJECT_ID`: Your Reown project ID from the dashboard
- `NEXT_PUBLIC_CONTRACT_ADDRESS`: The deployed smart contract address

## Usage

1. **Connect Wallet**: Navigate to `/login` and connect your wallet using Reown AppKit
2. **Mint Achievement**: Go to `/dashboard` and enter your weekly achievement description
3. **View Achievements**: See your minted achievements on the dashboard

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## License

MIT

