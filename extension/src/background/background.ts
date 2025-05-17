import { checkFeatureAccess } from '../utils/subscription';

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    // Skip logging for extension pages and Bolt
    if (tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://') || tab.url.includes('bolt.new')) {
      return;
    }
    // Only log non-extension tabs
    console.log(`Tab ${tabId} updated: ${tab.url}`);
  }
});

// Listen for new tabs
chrome.tabs.onCreated.addListener((tab: chrome.tabs.Tab) => {
  // Skip logging for extension pages and Bolt
  if (tab.url?.startsWith('chrome://') || tab.url?.startsWith('chrome-extension://') || tab.url?.includes('bolt.new')) {
    return;
  }
  console.log(`New tab created: ${tab.id}`);
});

// Listen for tab removal
chrome.tabs.onRemoved.addListener((tabId: number) => {
  console.log(`Tab removed: ${tabId}`);
});

// Handle extension icon click
chrome.action.onClicked.addListener(async () => {
  const hasAccess = await checkFeatureAccess('floatingWindow');
  
  if (!hasAccess) {
    // Open upgrade page if user doesn't have access
    chrome.tabs.create({ url: 'upgrade.html' });
    return;
  }

  // Check if the floating window already exists
  const windows = await chrome.windows.getAll();
  const floatingWindow = windows.find(w => w.type === 'popup' && w.title?.includes('TAB ASSIST'));

  if (floatingWindow) {
    // If window exists, focus it
    chrome.windows.update(floatingWindow.id!, { focused: true });
  } else {
    // Create new floating window
    chrome.windows.create({
      url: 'floating.html',
      type: 'popup',
      width: 400,
      height: 600,
      top: 100,
      left: 100,
      focused: true
    });
  }
}); 