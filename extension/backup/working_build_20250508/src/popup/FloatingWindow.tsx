import React, { useState, useEffect } from 'react';
import { X, Minimize2, Tag } from 'lucide-react';

const FloatingWindow: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTabs = async () => {
      try {
        const currentTabs = await chrome.tabs.query({ currentWindow: true });
        setTabs(currentTabs);
      } catch (error) {
        console.error('Error loading tabs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTabs();
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && e.target.closest('.no-drag')) {
      return;
    }
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTabClick = async (tabId: number) => {
    try {
      await chrome.tabs.update(tabId, { active: true });
      window.close();
    } catch (error) {
      console.error('Error switching to tab:', error);
    }
  };

  return (
    <div 
      className={`fixed bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
        isMinimized ? 'h-12' : 'h-[600px]'
      }`}
      style={{ 
        width: '400px',
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="flex items-center justify-between p-2 bg-gray-50 border-b">
        <div className="flex items-center gap-2">
          <img src="/icon-48.png" alt="Logo" className="w-6 h-6" />
          <span className="text-sm font-medium">Tab Assist</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-gray-200 rounded no-drag"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => window.close()}
            className="p-1 hover:bg-gray-200 rounded no-drag"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Open Tabs</h2>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="space-y-2">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id!)}
                  className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  {tab.favIconUrl && (
                    <img src={tab.favIconUrl} alt="" className="w-5 h-5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{tab.title}</h3>
                    <p className="text-sm text-gray-500 truncate">{tab.url}</p>
                  </div>
                </div>
              ))}

              {tabs.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Tag className="w-12 h-12 mx-auto mb-2" />
                  <p>No open tabs</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FloatingWindow; 