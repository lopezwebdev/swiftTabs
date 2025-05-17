import { Storage } from '@plasmohq/storage'

export interface Tab {
  id: number
  title: string
  url: string
  favIconUrl?: string
}

export interface Workspace {
  id: string
  name: string
  tabs: Tab[]
  createdAt: string
  updatedAt: string
}

const storage = new Storage()
const WORKSPACES_LIST_KEY = 'swiftTabs_workspaces_list'
const WORKSPACE_PREFIX = 'swiftTabs_workspace_'
const WORKSPACE_CHUNK_PREFIX = 'swiftTabs_workspace_chunk_'
const CHUNK_SIZE = 20 // Number of tabs per chunk

// Helper to chunk array into smaller pieces
function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

async function getWorkspaceIds(): Promise<string[]> {
  try {
    const ids = await storage.get<string[]>(WORKSPACES_LIST_KEY)
    return ids || []
  } catch (error) {
    console.error('Error getting workspace IDs:', error)
    return []
  }
}

async function getWorkspaceById(id: string): Promise<Workspace | null> {
  try {
    const workspace = await storage.get<Workspace>(`${WORKSPACE_PREFIX}${id}`)
    if (!workspace) return null

    // If workspace has chunks, load them
    if (workspace.tabs.length === 0) {
      const chunks = await Promise.all(
        Array.from({ length: Math.ceil(workspace.tabs.length / CHUNK_SIZE) }, (_, i) =>
          storage.get<Tab[]>(`${WORKSPACE_CHUNK_PREFIX}${id}_${i}`)
        )
      )
      workspace.tabs = chunks.flat().filter((tab): tab is Tab => tab !== undefined)
    }

    return workspace
  } catch (error) {
    console.error(`Error getting workspace ${id}:`, error)
    return null
  }
}

export async function getWorkspaces(): Promise<Workspace[]> {
  try {
    const ids = await getWorkspaceIds()
    const workspaces = await Promise.all(
      ids.map(id => getWorkspaceById(id))
    )
    return workspaces.filter((w): w is Workspace => w !== null)
  } catch (error) {
    console.error('Error getting workspaces:', error)
    return []
  }
}

export async function saveWorkspace(name: string, tabs: Tab[]): Promise<Workspace> {
  try {
    const newWorkspace: Workspace = {
      id: crypto.randomUUID(),
      name,
      tabs: [], // We'll store tabs in chunks
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // If we have too many tabs, only save essential information
    const simplifiedTabs = tabs.map(tab => ({
      id: tab.id,
      title: tab.title,
      url: tab.url
    }))

    // Split tabs into chunks and save each chunk
    const chunks = chunkArray(simplifiedTabs, CHUNK_SIZE)
    await Promise.all(
      chunks.map((chunk, index) =>
        storage.set(`${WORKSPACE_CHUNK_PREFIX}${newWorkspace.id}_${index}`, chunk)
      )
    )

    // Save workspace metadata
    await storage.set(`${WORKSPACE_PREFIX}${newWorkspace.id}`, newWorkspace)

    // Update workspace list
    const ids = await getWorkspaceIds()
    ids.push(newWorkspace.id)
    await storage.set(WORKSPACES_LIST_KEY, ids)

    // Set the full tabs array for immediate use
    newWorkspace.tabs = simplifiedTabs
    return newWorkspace
  } catch (error) {
    console.error('Error saving workspace:', error)
    throw error
  }
}

export async function updateWorkspace(id: string, updates: Partial<Workspace>): Promise<Workspace | null> {
  try {
    const workspace = await getWorkspaceById(id)
    if (!workspace) return null

    const updatedWorkspace = {
      ...workspace,
      ...updates,
      updatedAt: new Date().toISOString()
    }

    // If tabs were updated, save them in chunks
    if (updates.tabs) {
      const chunks = chunkArray(updates.tabs, CHUNK_SIZE)
      await Promise.all(
        chunks.map((chunk, index) =>
          storage.set(`${WORKSPACE_CHUNK_PREFIX}${id}_${index}`, chunk)
        )
      )
    }

    await storage.set(`${WORKSPACE_PREFIX}${id}`, updatedWorkspace)
    return updatedWorkspace
  } catch (error) {
    console.error('Error updating workspace:', error)
    return null
  }
}

export async function deleteWorkspace(id: string): Promise<boolean> {
  try {
    const workspace = await getWorkspaceById(id)
    if (!workspace) return false

    // Remove workspace metadata
    await storage.remove(`${WORKSPACE_PREFIX}${id}`)

    // Remove all chunks
    const chunkCount = Math.ceil(workspace.tabs.length / CHUNK_SIZE)
    await Promise.all(
      Array.from({ length: chunkCount }, (_, i) =>
        storage.remove(`${WORKSPACE_CHUNK_PREFIX}${id}_${i}`)
      )
    )

    // Update workspace list
    const ids = await getWorkspaceIds()
    const updatedIds = ids.filter(wid => wid !== id)
    await storage.set(WORKSPACES_LIST_KEY, updatedIds)

    return true
  } catch (error) {
    console.error('Error deleting workspace:', error)
    return false
  }
}

export async function restoreWorkspace(workspace: Workspace): Promise<void> {
  try {
    // Close all existing tabs
    const tabs = await chrome.tabs.query({})
    await Promise.all(tabs.map(tab => chrome.tabs.remove(tab.id!)))

    // Open workspace tabs
    await Promise.all(workspace.tabs.map(tab =>
      chrome.tabs.create({ url: tab.url, active: false })
    ))
  } catch (error) {
    console.error('Error restoring workspace:', error)
    throw error
  }
} 