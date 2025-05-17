import React, { useEffect, useState } from 'react';
import { Plus, Trash2, RotateCcw, Folder, Search, Check, ArrowLeft, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { Workspace, getWorkspaces, saveWorkspace, deleteWorkspace, restoreWorkspace, searchWorkspaces } from '../utils/workspace';
import { checkFeatureAccess } from '../utils/subscription';

interface WorkspaceManagerProps {
  onClose?: () => void;
  onViewChange?: (view: 'tabs' | 'workspaces') => void;
}

const DEFAULT_COLORS = ['#4A90E2', '#50E3C2', '#F5A623', '#E74C3C', '#8E44AD'];

const WorkspaceManager: React.FC<WorkspaceManagerProps> = ({ onClose, onViewChange }) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedWorkspace, setExpandedWorkspace] = useState<string | null>(null);
  const [showRestoreWarning, setShowRestoreWarning] = useState(false);
  const [workspaceToRestore, setWorkspaceToRestore] = useState<Workspace | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadWorkspaces();
  }, []);

  const loadWorkspaces = async () => {
    try {
      const loadedWorkspaces = await getWorkspaces();
      setWorkspaces(loadedWorkspaces);
    } catch (error) {
      console.error('Error loading workspaces:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateWorkspace = async () => {
    try {
      const tabs = await chrome.tabs.query({ currentWindow: true });
      const newWorkspace = await saveWorkspace(
        `Workspace ${workspaces.length + 1}`,
        tabs.map(tab => ({
          id: tab.id!,
          title: tab.title!,
          url: tab.url!,
          favIconUrl: tab.favIconUrl
        }))
      );
      setWorkspaces([...workspaces, newWorkspace]);
    } catch (error) {
      console.error('Error creating workspace:', error);
    }
  };

  const handleDeleteWorkspace = async (id: string) => {
    try {
      await deleteWorkspace(id);
      setWorkspaces(workspaces.filter(workspace => workspace.id !== id));
    } catch (error) {
      console.error('Error deleting workspace:', error);
    }
  };

  const handleRestoreClick = (workspace: Workspace) => {
    setWorkspaceToRestore(workspace);
    setShowRestoreWarning(true);
  };

  const handleConfirmRestore = async () => {
    if (workspaceToRestore) {
      try {
        await restoreWorkspace(workspaceToRestore);
        setShowRestoreWarning(false);
        setWorkspaceToRestore(null);
        window.close();
      } catch (error) {
        console.error('Error restoring workspace:', error);
      }
    }
  };

  const handleCancelRestore = () => {
    setShowRestoreWarning(false);
    setWorkspaceToRestore(null);
  };

  const toggleWorkspacePreview = (workspaceId: string) => {
    setExpandedWorkspace(expandedWorkspace === workspaceId ? null : workspaceId);
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      loadWorkspaces();
      return;
    }

    try {
      const results = await searchWorkspaces(query);
      setWorkspaces(results);
    } catch (error) {
      console.error('Error searching workspaces:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search workspaces..."
            className="w-full px-4 py-2 pl-10 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {showRestoreWarning && workspaceToRestore && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-lg p-6 w-[400px] animate-slideIn">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Warning: Restoring Workspace</h3>
              <div className="text-left space-y-3 text-gray-600">
                <p>Restoring this workspace will:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Close all your current tabs</li>
                  <li>Require you to log in again to your accounts</li>
                  <li>Replace your current workspace with "{workspaceToRestore.name}"</li>
                </ul>
                <p className="font-medium text-gray-700">Are you sure you want to continue?</p>
              </div>
            </div>
            <div className="space-y-3">
              <button
                onClick={handleConfirmRestore}
                className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Yes, Restore Workspace
              </button>
              <button
                onClick={handleCancelRestore}
                className="w-full px-4 py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 font-medium flex items-center justify-center gap-2 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Workspaces</h2>
        <button
          onClick={handleCreateWorkspace}
          className="p-2 text-blue-500 hover:text-blue-600"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-2">
          {workspaces.map((workspace) => (
            <div
              key={workspace.id}
              className="flex flex-col bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              style={{ borderLeft: `4px solid ${workspace.color || DEFAULT_COLORS[0]}` }}
            >
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <Folder className="w-5 h-5" style={{ color: workspace.color || DEFAULT_COLORS[0] }} />
                  <div>
                    <h3 className="font-medium">{workspace.name}</h3>
                    <p className="text-sm text-gray-500">
                      {workspace.tabs.length} tabs • {new Date(workspace.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleWorkspacePreview(workspace.id)}
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                    title="Preview tabs"
                  >
                    {expandedWorkspace === workspace.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleRestoreClick(workspace)}
                    className="p-2 text-blue-500 hover:text-blue-600 transition-colors"
                    title="Restore workspace"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteWorkspace(workspace.id)}
                    className="p-2 text-red-500 hover:text-red-600 transition-colors"
                    title="Delete workspace"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {expandedWorkspace === workspace.id && (
                <div className="px-3 pb-3 animate-slideDown">
                  <div className="border-t pt-3">
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {workspace.tabs.map((tab) => (
                        <div
                          key={tab.id}
                          className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 transition-colors"
                        >
                          {tab.favIconUrl && (
                            <img src={tab.favIconUrl} alt="" className="w-4 h-4" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm truncate">{tab.title}</p>
                            <p className="text-xs text-gray-500 truncate">{tab.url}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {workspaces.length === 0 && (
            <div className="text-center py-8 text-gray-500 animate-fadeIn">
              <Folder className="w-12 h-12 mx-auto mb-2" />
              <p>No workspaces yet</p>
              <p className="text-sm">Create your first workspace to save your tabs</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WorkspaceManager;