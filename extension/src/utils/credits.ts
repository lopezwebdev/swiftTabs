const CREDITS_KEY = 'swifttabs_credits';
const PREMIUM_KEY = 'swifttabs_premium';
const API_URL = 'https://api.swifttabs.com';
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

// Add hash verification
const generateHash = async (data: string): Promise<string> => {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const getCredits = async (): Promise<number | null> => {
  try {
    const result = await chrome.storage.local.get(CREDITS_KEY);
    const credits = result[CREDITS_KEY];
    
    if (credits === null) return null;

    // Skip server validation in development
    if (IS_DEVELOPMENT) {
      return credits;
    }

    // Verify with server
    const hash = await generateHash(credits.toString());
    const response = await fetch(`${API_URL}/verify-credits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        credits,
        hash,
        extensionId: chrome.runtime.id
      })
    });

    if (!response.ok) {
      throw new Error('Invalid credits');
    }

    return credits;
  } catch (error) {
    console.error('Error verifying credits:', error);
    const result = await chrome.storage.local.get(CREDITS_KEY);
    return IS_DEVELOPMENT ? result[CREDITS_KEY] : null;
  }
};

export const setCredits = async (credits: number): Promise<void> => {
  try {
    const hash = await generateHash(credits.toString());
    
    // Skip server validation in development
    if (!IS_DEVELOPMENT) {
      const response = await fetch(`${API_URL}/update-credits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credits,
          hash,
          extensionId: chrome.runtime.id
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update credits');
      }
    }

    await chrome.storage.local.set({ [CREDITS_KEY]: credits });
  } catch (error) {
    console.error('Error updating credits:', error);
    if (!IS_DEVELOPMENT) {
      throw error;
    }
  }
};

export const isPremium = async (): Promise<boolean> => {
  try {
    const result = await chrome.storage.local.get(PREMIUM_KEY);
    const premium = result[PREMIUM_KEY];
    
    if (!premium) return false;

    // Skip server validation in development
    if (IS_DEVELOPMENT) {
      return premium;
    }

    // Verify with server
    const hash = await generateHash(premium.toString());
    const response = await fetch(`${API_URL}/verify-premium`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        premium,
        hash,
        extensionId: chrome.runtime.id
      })
    });

    if (!response.ok) {
      throw new Error('Invalid premium status');
    }

    return premium;
  } catch (error) {
    console.error('Error verifying premium status:', error);
    const result = await chrome.storage.local.get(PREMIUM_KEY);
    return IS_DEVELOPMENT ? result[PREMIUM_KEY] : false;
  }
};

export const setPremium = async (isPremium: boolean): Promise<void> => {
  try {
    const hash = await generateHash(isPremium.toString());
    
    // Skip server validation in development
    if (!IS_DEVELOPMENT) {
      const response = await fetch(`${API_URL}/update-premium`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          premium: isPremium,
          hash,
          extensionId: chrome.runtime.id
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update premium status');
      }
    }

    await chrome.storage.local.set({ [PREMIUM_KEY]: isPremium });
  } catch (error) {
    console.error('Error updating premium status:', error);
    if (!IS_DEVELOPMENT) {
      throw error;
    }
  }
}; 