declare namespace chrome {
  namespace tabs {
    interface Tab {
      id?: number;
      title?: string;
      url?: string;
      favIconUrl?: string;
    }

    function query(queryInfo: object, callback: (tabs: Tab[]) => void): void;
    function update(tabId: number, updateProperties: { active: boolean }): void;
    const onUpdated: {
      addListener(callback: (tabId: number, changeInfo: { status?: string }, tab: Tab) => void): void;
      removeListener(callback: (tabId: number, changeInfo: { status?: string }, tab: Tab) => void): void;
    };
    const onCreated: {
      addListener(callback: (tab: Tab) => void): void;
      removeListener(callback: (tab: Tab) => void): void;
    };
    const onRemoved: {
      addListener(callback: (tabId: number) => void): void;
      removeListener(callback: (tabId: number) => void): void;
    };
  }

  namespace windows {
    interface Window {
      id?: number;
      left?: number;
      top?: number;
      type?: string;
      title?: string;
    }

    function getCurrent(): Promise<Window>;
    function update(windowId: number, updateInfo: { left?: number; top?: number; focused?: boolean }): Promise<Window>;
  }
} 