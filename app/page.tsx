import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="z-10 max-w-6xl w-full">
        <div className="text-center mb-16 mt-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Onchain Builder Proof
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Mint your weekly achievements permanently on Base blockchain
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/login"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
            >
              Get Started
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold text-lg"
            >
              Explore
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">⛓️</div>
            <h3 className="text-xl font-bold mb-2">Onchain Proof</h3>
            <p className="text-gray-600">
              Every achievement is permanently recorded on Base blockchain
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-bold mb-2">Earn Badges</h3>
            <p className="text-gray-600">
              Unlock achievement badges and climb the leaderboard
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-bold mb-2">Build Together</h3>
            <p className="text-gray-600">
              Connect with builders and support each other's journey
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

