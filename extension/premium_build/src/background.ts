import { getCredits, setCredits, isPremium } from './utils/credits';

// Initialize credits for new users
chrome.runtime.onInstalled.addListener(async () => {
  const credits = await getCredits();
  if (credits === null) {
    await setCredits(100); // Start with 100 free credits
  }
});

// Listen for tab switches
chrome.tabs.onActivated.addListener(async () => {
  const isPremiumUser = await isPremium();
  if (!isPremiumUser) {
    const currentCredits = await getCredits();
    if (currentCredits > 0) {
      await setCredits(currentCredits - 1);
    }
  }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_CREDITS') {
    getCredits().then(sendResponse);
    return true;
  }
  if (request.type === 'GET_PREMIUM_STATUS') {
    isPremium().then(sendResponse);
    return true;
  }
}); 