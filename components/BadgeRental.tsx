'use client'

import { useState } from 'react'
import { formatEthAmount } from '@/lib/utils'

interface Rental {
  id: string
  badgeName: string
  hourlyRate: bigint
  available: boolean
  renter: string
}

export default function BadgeRental() {
  const [rentals, setRentals] = useState<Rental[]>([])

  const rentBadge = (rentalId: string) => {
    // Rent badge for specified duration
    console.log('Renting badge:', rentalId)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">⏱️ Badge Rentals</h2>
      
      <div className="space-y-4">
        {rentals.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No rental offers available</p>
        ) : (
          rentals.map((rental) => (
            <div key={rental.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{rental.badgeName}</h3>
                <span className={`px-2 py-1 rounded text-xs ${
                  rental.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {rental.available ? 'Available' : 'Rented'}
                </span>
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">Hourly Rate</div>
                <div className="text-xl font-bold text-blue-600">
                  {formatEthAmount(rental.hourlyRate)}
                </div>
              </div>
              {rental.available && (
                <button
                  onClick={() => rentBadge(rental.id)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Rent Now
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
