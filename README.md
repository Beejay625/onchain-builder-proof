# Onchain Builder Proof

A Next.js application that allows builders to mint their weekly achievements on Talenty Protocol onchain. Built with Reown AppKit for seamless wallet integration.

## Features

- 🔐 Wallet connection via Reown AppKit
- 📝 Mint weekly achievements onchain
- 📊 Dashboard to view your achievements
- 🔗 Integration with Talenty Protocol
- ⚡ Built with Next.js 16 and TypeScript

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Wallet Integration**: Reown AppKit
- **Blockchain**: Wagmi + Viem
- **Smart Contract**: SocialMediaContract (deployed)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- A Reown Project ID from [Reown Dashboard](https://dashboard.reown.com)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd onchain-builder-proof
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

## Project Structure

```
├── app/
│   ├── dashboard/      # Dashboard page for minting achievements
│   ├── login/          # Login/wallet connection page
│   ├── layout.tsx      # Root layout with AppKit provider
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── config/
│   └── index.tsx       # Wagmi configuration
├── context/
│   └── index.tsx       # AppKit context provider
├── abi/
│   └── SocialMediaContract.ts  # Smart contract ABI
└── next.config.js      # Next.js configuration
```

## Smart Contract

The application uses a deployed `SocialMediaContract` that allows users to:
- Create posts (achievements)
- Add comments
- Add reactions
- Update profiles
- Track reputation

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

