'use client'

import { useAppState } from '@/context'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

export default function OnchainNotifications() {
  const { notifications } = useAppState()

  if (!isFeatureEnabled('onchainNotifications')) {
    return null
  }

  const unreadCount = notifications.filter((n) => !n.read).length
  const recentNotifications = notifications.slice(0, 3)

  return (
    <AppCard title="🔔 Onchain Notifications" subtitle="Real-time notification system" accent="orange">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Unread" value={unreadCount.toString()} accent="red" />
          <StatBadge label="Total" value={notifications.length.toString()} accent="blue" />
        </div>
        {recentNotifications.length > 0 ? (
          <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
            <p className="font-semibold mb-2">Recent Notifications</p>
            <div className="space-y-2 text-xs">
              {recentNotifications.map((notification) => (
                <div key={notification.id} className="flex justify-between items-center">
                  <span className={notification.read ? 'text-gray-500' : 'text-gray-800 font-medium'}>
                    {notification.message}
                  </span>
                  {!notification.read && <span className="w-2 h-2 bg-red-500 rounded-full" />}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600 text-center">
            <p>No notifications yet</p>
          </div>
        )}
      </div>
    </AppCard>
  )
}

