import React, { useEffect, useState } from 'react';
import { ExternalLink, Lock, Star, Folder } from 'lucide-react';
import { checkFeatureAccess, getSubscriptionState, SUBSCRIPTION_PRICES } from '../utils/subscription';
import WorkspaceManager from '../components/WorkspaceManager';

const Popup: React.FC = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showWorkspaces, setShowWorkspaces] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const state = await getSubscriptionState();
        setIsPremium(state.tier === 'premium' || state.tier === 'lifetime');
      } catch (error) {
        console.error('Error checking subscription:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkSubscription();
  }, []);

  const openFloatingWindow = async () => {
    try {
      const hasAccess = await checkFeatureAccess('floatingWindow');
      
      if (!hasAccess) {
        // Show upgrade prompt
        chrome.tabs.create({
          url: 'upgrade.html'
        });
        return;
      }

      chrome.windows.create({
        url: 'floating.html',
        type: 'popup',
        width: 400,
        height: 600,
        top: 100,
        left: 100,
        focused: true
      });
      window.close();
    } catch (error) {
      console.error('Error opening floating window:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="w-[300px] p-4">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (showWorkspaces) {
    return <WorkspaceManager onClose={() => setShowWorkspaces(false)} />;
  }

  return (
    <div className="w-[300px] p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">SwiftTabs</h1>
        {!isPremium && (
          <button
            onClick={() => chrome.tabs.create({ url: 'upgrade.html' })}
            className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1"
          >
            <Star className="w-4 h-4" />
            Upgrade
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        <button
          onClick={openFloatingWindow}
          className="w-full flex items-center justify-center gap-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {!isPremium && <Lock className="w-4 h-4" />}
          <ExternalLink className="w-4 h-4" />
          <span>Open Floating Window</span>
        </button>

        <button
          onClick={() => setShowWorkspaces(true)}
          className="w-full flex items-center justify-center gap-2 p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          {!isPremium && <Lock className="w-4 h-4" />}
          <Folder className="w-4 h-4" />
          <span>Manage Workspaces</span>
        </button>
      </div>

      {!isPremium && (
        <div className="mt-4 text-sm text-gray-600">
          <p>Upgrade to Premium for:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Floating Tab Windows</li>
            <li>Workspace Save/Restore</li>
            <li>Cross-device Sync</li>
          </ul>
          <div className="mt-2">
            <p>Starting at ${SUBSCRIPTION_PRICES.monthly}/month</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup; 