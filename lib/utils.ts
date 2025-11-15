/**
 * Utility functions for the application
 */

/**
 * Truncate an Ethereum address for display
 * @param address - The full Ethereum address
 * @param startLength - Number of characters to show at the start (default: 6)
 * @param endLength - Number of characters to show at the end (default: 4)
 * @returns Truncated address string
 */
export function truncateAddress(
  address: string | undefined,
  startLength: number = 6,
  endLength: number = 4
): string {
  if (!address) return ''
  if (address.length <= startLength + endLength) return address
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`
}

/**
 * Format timestamp to readable date
 * @param timestamp - Unix timestamp (seconds)
 * @returns Formatted date string
 */
export function formatTimestamp(timestamp: bigint | number): string {
  const date = new Date(Number(timestamp) * 1000)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Validate Ethereum address
 * @param address - Address to validate
 * @returns True if valid Ethereum address
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

/**
 * Format ETH amount from wei
 * @param weiAmount - Amount in wei
 * @returns Formatted ETH string
 */
export function formatEthAmount(weiAmount: bigint): string {
  const eth = Number(weiAmount) / 1e18
  return eth.toFixed(6) + ' ETH'
}

/**
 * Get time ago string
 * @param timestamp - Unix timestamp
 * @returns Relative time string
 */
export function getTimeAgo(timestamp: number): string {
  const seconds = Math.floor(Date.now() / 1000 - timestamp)
  
  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return `${Math.floor(seconds / 604800)}w ago`
}

