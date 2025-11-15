# 🏗️ Onchain Builder Proof

> **Immortalize Your Weekly Achievements on the Blockchain**

Onchain Builder Proof is a decentralized application (dApp) that empowers builders, developers, and creators to mint their weekly achievements directly onchain through the Talenty Protocol. Every milestone, every breakthrough, and every accomplishment becomes a permanent, verifiable record on the blockchain—creating an immutable proof of your journey as a builder.

## 🌐 What Makes This Onchain?

Unlike traditional achievement systems that rely on centralized databases, Onchain Builder Proof leverages the power of blockchain technology to ensure:

- **🔒 Immutability**: Once minted, your achievements are permanently recorded on the blockchain and cannot be altered or deleted
- **🌍 Decentralization**: Your achievements exist independently of any single server or organization
- **✅ Verifiability**: Anyone can verify the authenticity and timestamp of your achievements onchain
- **💎 Ownership**: You truly own your achievement data through your wallet address
- **🔗 Interoperability**: Your onchain achievements can be integrated with other protocols, platforms, and services
- **📜 Transparency**: All achievements are publicly verifiable while maintaining privacy through pseudonymous wallet addresses

Built on Ethereum-compatible networks, each achievement is a smart contract interaction that creates an onchain record of your progress, making it a valuable asset in the Web3 ecosystem.

## ✨ Features (20+ Implemented)

### 🔐 Authentication & Wallet Integration
- **Multi-wallet Support**: Connect with any wallet via Reown AppKit (WalletConnect, Coinbase, Injected wallets)
- **Seamless Connection**: One-click wallet connection with automatic session management
- **SSR Support**: Server-side rendering support for optimal performance
- **Cookie-based State**: Persistent wallet connection state across page refreshes

### 📝 Achievement Minting
- **Onchain Minting**: Mint your weekly achievements directly to the blockchain
- **Smart Contract Integration**: Direct interaction with SocialMediaContract
- **Transaction Tracking**: Real-time transaction status and confirmation
- **Content Validation**: Input validation before minting
- **Gas Optimization**: Efficient contract calls for cost-effective minting

### 📊 Dashboard & Analytics
- **Personal Dashboard**: View all your minted achievements in one place
- **Achievement Counter**: Track total achievements minted globally
- **User Statistics**: See your personal achievement count
- **Real-time Updates**: Live updates when new achievements are minted
- **Achievement Cards**: Beautiful card-based display of achievements

### 🎨 User Experience
- **Responsive Design**: Mobile-first, works on all devices
- **Loading States**: Smooth loading indicators during async operations
- **Error Handling**: Comprehensive error boundaries and user-friendly error messages
- **404 Page**: Custom not-found page for better navigation
- **Loading Page**: Dedicated loading state for route transitions
- **Custom Styling**: Enhanced UI with custom scrollbars and modern design

### 🛠️ Developer Experience
- **TypeScript**: Full type safety across the application
- **Type Definitions**: Comprehensive TypeScript types for contract interactions
- **Utility Functions**: Reusable utilities for address formatting and validation
- **Component Library**: Reusable React components (LoadingSpinner, AchievementCard)
- **Clean Architecture**: Well-organized project structure

### 🔧 Technical Features
- **Next.js 16**: Latest App Router with React Server Components
- **Wagmi Integration**: Powerful React hooks for Ethereum interactions
- **Viem**: Type-safe Ethereum library
- **Tailwind CSS**: Utility-first CSS framework
- **Environment Configuration**: Secure environment variable management

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0 or higher ([Download](https://nodejs.org/))
- **npm** 9.0 or higher (comes with Node.js)
- **Git** for version control
- A **Reown Project ID** from [Reown Dashboard](https://dashboard.reown.com)
- A **deployed smart contract address** (SocialMediaContract)

### Step-by-Step Installation

#### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd "buikders dex"
```

Or if you're starting fresh:

```bash
# Create a new directory
mkdir onchain-builder-proof
cd onchain-builder-proof
```

#### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- `next` - React framework
- `@reown/appkit` - Wallet connection library
- `@reown/appkit-adapter-wagmi` - Wagmi adapter for AppKit
- `wagmi` - React hooks for Ethereum
- `viem` - Ethereum TypeScript library
- `@tanstack/react-query` - Data fetching and caching
- `tailwindcss` - CSS framework
- And other dependencies...

#### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
touch .env.local
```

Add the following environment variables:

```env
# Reown Project ID - Get from https://dashboard.reown.com
NEXT_PUBLIC_PROJECT_ID=your_project_id_here

# Deployed Smart Contract Address
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourDeployedContractAddress
```

**How to get your Reown Project ID:**
1. Visit [Reown Dashboard](https://dashboard.reown.com)
2. Sign up or log in
3. Create a new project
4. Copy your Project ID from the project settings

**How to get your Contract Address:**
1. Deploy the SocialMediaContract to your desired network (Mainnet, Arbitrum, etc.)
2. Copy the deployed contract address
3. Ensure the contract is verified on a block explorer

#### 4. Run the Development Server

```bash
npm run dev
```

The application will start on [http://localhost:3000](http://localhost:3000)

#### 5. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
onchain-builder-proof/
├── app/                          # Next.js App Router directory
│   ├── dashboard/                # Dashboard page
│   │   └── page.tsx             # Main dashboard component
│   ├── login/                    # Login page
│   │   └── page.tsx             # Wallet connection page
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles
│   ├── error.tsx                # Error boundary
│   ├── loading.tsx              # Loading page
│   └── not-found.tsx            # 404 page
├── components/                   # Reusable React components
│   ├── AchievementCard.tsx     # Achievement display card
│   └── LoadingSpinner.tsx       # Loading spinner component
├── config/                      # Configuration files
│   └── index.tsx               # Wagmi adapter configuration
├── context/                     # React context providers
│   └── index.tsx               # AppKit context provider
├── lib/                         # Utility functions
│   └── utils.ts                # Helper functions
├── types/                       # TypeScript type definitions
│   └── index.ts                # Type definitions
├── abi/                         # Smart contract ABIs
│   └── SocialMediaContract.ts   # Contract ABI
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── postcss.config.mjs           # PostCSS configuration
├── package.json                 # Project dependencies
└── README.md                    # This file
```

## 🎯 Usage Guide

### For Builders

1. **Connect Your Wallet**
   - Navigate to the login page (`/login`)
   - Click the connect button
   - Select your preferred wallet (MetaMask, Coinbase Wallet, WalletConnect, etc.)
   - Approve the connection

2. **Mint Your Achievement**
   - After connecting, you'll be redirected to the dashboard
   - Enter a description of your weekly achievement
   - Click "Mint Achievement"
   - Confirm the transaction in your wallet
   - Wait for blockchain confirmation

3. **View Your Achievements**
   - Your dashboard displays all minted achievements
   - See total achievements count
   - Track your personal achievement count

### For Developers

#### Available Scripts

```bash
# Development
npm run dev          # Start development server on http://localhost:3000

# Production
npm run build        # Build the application for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint to check code quality
```

#### Smart Contract Interaction

The application uses Wagmi hooks for contract interactions:

```typescript
// Example: Reading from contract
const { data } = useReadContract({
  address: CONTRACT_ADDRESS,
  abi: SocialMediaContractABI,
  functionName: 'getTotalPosts',
})

// Example: Writing to contract
const { writeContract } = useWriteContract()
writeContract({
  address: CONTRACT_ADDRESS,
  abi: SocialMediaContractABI,
  functionName: 'createPost',
  args: ['Your achievement description'],
})
```

## 🔗 Smart Contract

The application interacts with a deployed `SocialMediaContract` that provides:

- **createPost**: Mint a new achievement onchain
- **addComment**: Add comments to achievements
- **addReaction**: React to achievements (likes, etc.)
- **updateProfile**: Update your builder profile
- **getUserPosts**: Retrieve all achievements by a user
- **getTotalPosts**: Get global achievement count

### Contract Functions Used

| Function | Purpose | Type |
|----------|---------|------|
| `createPost` | Mint new achievement | Write |
| `getTotalPosts` | Get total achievements | Read |
| `getUserPosts` | Get user's achievements | Read |
| `getPost` | Get specific achievement | Read |

## 🌐 Supported Networks

Currently configured for:
- **Ethereum Mainnet**
- **Arbitrum**

To add more networks, update `config/index.tsx`:

```typescript
import { mainnet, arbitrum, base, polygon } from '@reown/appkit/networks'
export const networks = [mainnet, arbitrum, base, polygon]
```

## 🔒 Security Considerations

- **Environment Variables**: Never commit `.env.local` to version control
- **Private Keys**: Never expose private keys in the codebase
- **Contract Verification**: Always verify your smart contract on block explorers
- **Input Validation**: All user inputs are validated before onchain submission
- **Transaction Confirmation**: Always wait for transaction confirmations

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Reown](https://reown.com) for the excellent wallet connection infrastructure
- [Wagmi](https://wagmi.sh) for powerful React hooks for Ethereum
- [Viem](https://viem.sh) for type-safe Ethereum interactions
- [Next.js](https://nextjs.org) for the amazing React framework
- [Talenty Protocol](https://talenty.io) for the onchain achievement concept

## 📞 Support

For issues, questions, or contributions:
- Open an issue on GitHub
- Check the documentation
- Review the smart contract code

## 🚧 Roadmap

Future enhancements planned:
- [ ] Achievement NFT minting
- [ ] Social features (comments, reactions)
- [ ] Profile customization
- [ ] Achievement sharing
- [ ] Multi-chain support expansion
- [ ] Achievement verification badges
- [ ] Leaderboards
- [ ] Achievement categories/tags

---

**Built with ❤️ for the Web3 builder community**

*Every achievement matters. Make yours onchain.*
