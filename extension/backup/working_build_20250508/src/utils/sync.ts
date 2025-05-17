import { Storage } from '@plasmohq/storage'
import { Workspace } from './workspace'

const storage = new Storage()
const SYNC_KEY = 'swiftTabs_sync'
const SYNC_INTERVAL = 5 * 60 * 1000 // 5 minutes

export interface SyncState {
  lastSync: string
  deviceId: string
  workspaces: Workspace[]
}

export async function initializeSync(): Promise<void> {
  const state = await storage.get<SyncState>(SYNC_KEY)
  if (!state) {
    await storage.set(SYNC_KEY, {
      lastSync: new Date().toISOString(),
      deviceId: crypto.randomUUID(),
      workspaces: []
    })
  }
}

export async function getSyncState(): Promise<SyncState> {
  const state = await storage.get<SyncState>(SYNC_KEY)
  if (!state) {
    throw new Error('Sync not initialized')
  }
  return state
}

export async function updateSyncState(workspaces: Workspace[]): Promise<void> {
  const state = await getSyncState()
  await storage.set(SYNC_KEY, {
    ...state,
    lastSync: new Date().toISOString(),
    workspaces
  })
}

// This would be replaced with actual cloud sync implementation
export async function syncWithCloud(): Promise<void> {
  const state = await getSyncState()
  
  // Here you would:
  // 1. Send state to your backend
  // 2. Get updates from other devices
  // 3. Merge changes
  // 4. Update local state
  
  // For now, we'll just update the lastSync time
  await updateSyncState(state.workspaces)
}

// Start periodic sync
export function startSync(): void {
  setInterval(syncWithCloud, SYNC_INTERVAL)
} 