import { Storage } from '@plasmohq/storage'

export type SubscriptionTier = 'free' | 'premium' | 'lifetime'

export interface SubscriptionState {
  tier: SubscriptionTier
  expiryDate?: string // ISO string for premium subscriptions
}

const storage = new Storage()

export const SUBSCRIPTION_KEY = 'swiftTabs_subscription'

export const SUBSCRIPTION_PRICES = {
  monthly: 3.99,
  yearly: 24.99,
  lifetime: 19.99
}

export const PREMIUM_FEATURES = {
  floatingWindow: true,
  workspaceSave: true,
  crossDeviceSync: true,
  tabGrouping: true
}

// For testing: Always return premium tier
export async function getSubscriptionState(): Promise<SubscriptionState> {
  // Comment out the actual storage check for testing
  // const state = await storage.get<SubscriptionState>(SUBSCRIPTION_KEY)
  // return state || { tier: 'free' }
  
  // Always return premium for testing
  return { tier: 'premium' }
}

export async function setSubscriptionState(state: SubscriptionState): Promise<void> {
  await storage.set(SUBSCRIPTION_KEY, state)
}

export function isFeatureAvailable(feature: keyof typeof PREMIUM_FEATURES, tier: SubscriptionTier): boolean {
  // For testing: Always return true
  return true
  
  // Original implementation
  // if (tier === 'lifetime' || tier === 'premium') {
  //   return true
  // }
  // return false
}

export async function checkFeatureAccess(feature: keyof typeof PREMIUM_FEATURES): Promise<boolean> {
  // For testing: Always return true
  return true
  
  // Original implementation
  // const state = await getSubscriptionState()
  // return isFeatureAvailable(feature, state.tier)
} 