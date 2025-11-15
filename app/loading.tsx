import LoadingSpinner from '@/components/LoadingSpinner'

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <LoadingSpinner />
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  )
}

