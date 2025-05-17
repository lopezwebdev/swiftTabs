export interface TabGroup {
  id: string;
  name: string;
  tabs: chrome.tabs.Tab[];
  color: string;
}

export const tabManager = {
  async getGroups(): Promise<TabGroup[]> {
    const result = await chrome.storage.local.get('tabGroups');
    return result.tabGroups || [];
  },

  async createGroup(name: string, color: string): Promise<TabGroup> {
    const groups = await this.getGroups();
    const newGroup: TabGroup = {
      id: crypto.randomUUID(),
      name,
      tabs: [],
      color
    };
    await chrome.storage.local.set({ tabGroups: [...groups, newGroup] });
    return newGroup;
  },

  async addTabToGroup(groupId: string, tabId: number): Promise<void> {
    const groups = await this.getGroups();
    const groupIndex = groups.findIndex(g => g.id === groupId);
    if (groupIndex === -1) return;

    const tab = await chrome.tabs.get(tabId);
    groups[groupIndex].tabs.push(tab);
    await chrome.storage.local.set({ tabGroups: groups });
  },

  async removeTabFromGroup(groupId: string, tabId: number): Promise<void> {
    const groups = await this.getGroups();
    const groupIndex = groups.findIndex(g => g.id === groupId);
    if (groupIndex === -1) return;

    groups[groupIndex].tabs = groups[groupIndex].tabs.filter(t => t.id !== tabId);
    await chrome.storage.local.set({ tabGroups: groups });
  },

  async searchTabs(query: string): Promise<chrome.tabs.Tab[]> {
    const tabs = await chrome.tabs.query({});
    return tabs.filter(tab => 
      tab.title?.toLowerCase().includes(query.toLowerCase()) ||
      tab.url?.toLowerCase().includes(query.toLowerCase())
    );
  },

  async getTabHistory(): Promise<chrome.tabs.Tab[]> {
    const result = await chrome.storage.local.get('tabHistory');
    return result.tabHistory || [];
  },

  async addToHistory(tab: chrome.tabs.Tab): Promise<void> {
    const history = await this.getTabHistory();
    const newHistory = [tab, ...history].slice(0, 50); // Keep last 50 tabs
    await chrome.storage.local.set({ tabHistory: newHistory });
  }
}; 