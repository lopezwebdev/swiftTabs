import { Storage } from '@plasmohq/storage'
import { Tab } from './workspace'

export interface TabGroup {
  id: string
  name: string
  color: string
  tabs: Tab[]
  createdAt: string
  updatedAt: string
}

const storage = new Storage()
const GROUPS_LIST_KEY = 'swiftTabs_groups_list'
const GROUP_PREFIX = 'swiftTabs_group_'

async function getGroupIds(): Promise<string[]> {
  try {
    const ids = await storage.get<string[]>(GROUPS_LIST_KEY)
    return ids || []
  } catch (error) {
    console.error('Error getting group IDs:', error)
    return []
  }
}

async function getGroupById(id: string): Promise<TabGroup | null> {
  try {
    const group = await storage.get<TabGroup>(`${GROUP_PREFIX}${id}`)
    return group || null
  } catch (error) {
    console.error(`Error getting group ${id}:`, error)
    return null
  }
}

export async function getGroups(): Promise<TabGroup[]> {
  try {
    const ids = await getGroupIds()
    const groups = await Promise.all(
      ids.map(id => getGroupById(id))
    )
    return groups.filter((g): g is TabGroup => g !== null)
  } catch (error) {
    console.error('Error getting groups:', error)
    return []
  }
}

export async function createGroup(name: string, color: string, tabs: Tab[]): Promise<TabGroup> {
  try {
    const newGroup: TabGroup = {
      id: crypto.randomUUID(),
      name,
      color,
      tabs,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    // Save group in its own storage item
    await storage.set(`${GROUP_PREFIX}${newGroup.id}`, newGroup)
    
    // Update group list
    const ids = await getGroupIds()
    ids.push(newGroup.id)
    await storage.set(GROUPS_LIST_KEY, ids)
    
    return newGroup
  } catch (error) {
    console.error('Error creating group:', error)
    throw error
  }
}

export async function updateGroup(id: string, updates: Partial<TabGroup>): Promise<TabGroup | null> {
  try {
    const group = await getGroupById(id)
    if (!group) return null
    
    const updatedGroup = {
      ...group,
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    await storage.set(`${GROUP_PREFIX}${id}`, updatedGroup)
    return updatedGroup
  } catch (error) {
    console.error('Error updating group:', error)
    return null
  }
}

export async function deleteGroup(id: string): Promise<boolean> {
  try {
    const group = await getGroupById(id)
    if (!group) return false
    
    // Remove group from storage
    await storage.remove(`${GROUP_PREFIX}${id}`)
    
    // Update group list
    const ids = await getGroupIds()
    const updatedIds = ids.filter(gid => gid !== id)
    await storage.set(GROUPS_LIST_KEY, updatedIds)
    
    return true
  } catch (error) {
    console.error('Error deleting group:', error)
    return false
  }
}

export async function addTabsToGroup(groupId: string, tabs: Tab[]): Promise<TabGroup | null> {
  try {
    const group = await getGroupById(groupId)
    if (!group) return null
    
    const updatedGroup = {
      ...group,
      tabs: [...group.tabs, ...tabs],
      updatedAt: new Date().toISOString()
    }
    
    await storage.set(`${GROUP_PREFIX}${groupId}`, updatedGroup)
    return updatedGroup
  } catch (error) {
    console.error('Error adding tabs to group:', error)
    return null
  }
}

export async function removeTabsFromGroup(groupId: string, tabIds: number[]): Promise<TabGroup | null> {
  try {
    const group = await getGroupById(groupId)
    if (!group) return null
    
    const updatedGroup = {
      ...group,
      tabs: group.tabs.filter(tab => !tabIds.includes(tab.id)),
      updatedAt: new Date().toISOString()
    }
    
    await storage.set(`${GROUP_PREFIX}${groupId}`, updatedGroup)
    return updatedGroup
  } catch (error) {
    console.error('Error removing tabs from group:', error)
    return null
  }
}

export async function moveTabsToGroup(tabIds: number[], targetGroupId: string): Promise<void> {
  try {
    // Get all groups
    const groups = await getGroups()
    
    // Remove tabs from their current groups
    for (const group of groups) {
      if (group.id !== targetGroupId) {
        await removeTabsFromGroup(group.id, tabIds)
      }
    }
    
    // Get the tabs to move
    const tabs = await chrome.tabs.query({})
    const tabsToMove = tabs.filter(tab => tabIds.includes(tab.id!))
    
    // Add tabs to target group
    await addTabsToGroup(targetGroupId, tabsToMove.map(tab => ({
      id: tab.id!,
      title: tab.title!,
      url: tab.url!,
      favIconUrl: tab.favIconUrl
    })))
  } catch (error) {
    console.error('Error moving tabs to group:', error)
    throw error
  }
} 