export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
}

export const themes: Theme[] = [
  {
    name: 'Default',
    colors: {
      primary: '#3B82F6',
      secondary: '#1E40AF',
      background: '#FFFFFF',
      text: '#1F2937',
      accent: '#60A5FA'
    }
  },
  {
    name: 'Dark',
    colors: {
      primary: '#60A5FA',
      secondary: '#3B82F6',
      background: '#1F2937',
      text: '#F9FAFB',
      accent: '#93C5FD'
    }
  },
  {
    name: 'Ocean',
    colors: {
      primary: '#0EA5E9',
      secondary: '#0284C7',
      background: '#F0F9FF',
      text: '#0C4A6E',
      accent: '#38BDF8'
    }
  }
];

export const getCurrentTheme = async (): Promise<Theme> => {
  const result = await chrome.storage.local.get('theme');
  return result.theme || themes[0];
};

export const setTheme = async (theme: Theme): Promise<void> => {
  await chrome.storage.local.set({ theme });
}; 