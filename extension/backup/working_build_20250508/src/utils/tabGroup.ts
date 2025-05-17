export interface Tab {
  id: number;
  title: string;
  url: string;
  favIconUrl?: string;
}

export interface TabGroup {
  id: string;
  name: string;
  tabs: Tab[];
  createdAt: number;
  updatedAt: number;
}

export const getTabGroups = async (): Promise<TabGroup[]> => {
  const result = await chrome.storage.local.get('tabGroups');
  return result.tabGroups || [];
};

export const saveTabGroup = async (name: string, tabs: Tab[]): Promise<TabGroup> => {
  const groups = await getTabGroups();
  const newGroup: TabGroup = {
    id: Date.now().toString(),
    name,
    tabs,
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  
  await chrome.storage.local.set({
    tabGroups: [...groups, newGroup]
  });
  
  return newGroup;
};

export const deleteTabGroup = async (id: string): Promise<void> => {
  const groups = await getTabGroups();
  await chrome.storage.local.set({
    tabGroups: groups.filter(group => group.id !== id)
  });
};

export const restoreTabGroup = async (group: TabGroup): Promise<void> => {
  // Close all existing tabs
  const existingTabs = await chrome.tabs.query({ currentWindow: true });
  await Promise.all(existingTabs.map(tab => chrome.tabs.remove(tab.id!)));

  // Create new tabs
  await Promise.all(group.tabs.map(tab => 
    chrome.tabs.create({ url: tab.url, active: false })
  ));
}; 