import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Square, 
  RefreshCw, 
  Save, 
  Upload, 
  Download, 
  Settings,
  Menu,
  Plus,
  Home,
  Zap,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Star,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface WorkflowHeaderProps {
  onExecute: () => void;
  onClear: () => void;
  isExecuting: boolean;
  nodeCount: number;
  connectionCount: number;
  onApplyTemplate: (template: any) => void;
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
  nodes: any[]; // Add this line
  edges: any[]; // Add this line
}

export const WorkflowHeader: React.FC<WorkflowHeaderProps & { activeMode: string, setActiveMode: (mode: string) => void }> = ({
  onExecute,
  onClear,
  isExecuting,
  nodeCount,
  connectionCount,
  onApplyTemplate,
  onToggleSidebar,
  sidebarCollapsed,
  activeMode,
  setActiveMode,
  nodes,
  edges
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showStats, setShowStats] = useState(false);

  const handleSave = () => {
    toast({
      title: "💾 Workflow Saved",
      description: "Your workflow has been saved successfully",
    });
  };

  const handleExport = () => {
    const workflowData = {
      version: "1.0",
      timestamp: new Date().toISOString(),
      nodeCount,
      connectionCount,
      nodes, // Export all node details
      edges, // Export all edge details
      metadata: {
        created: new Date().toISOString(),
        lastModified: new Date().toISOString()
      }
    };
    
    const blob = new Blob([JSON.stringify(workflowData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `workflow-${Date.now()}.json`;
    a.click();
    
    toast({
      title: "📦 Workflow Exported",
      description: "Downloaded workflow configuration file",
    });
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            onApplyTemplate(data);
            toast({
              title: "📥 Workflow Imported",
              description: "Successfully loaded workflow configuration",
            });
          } catch (error) {
            toast({
              title: "❌ Import Failed",
              description: "Invalid workflow file format",
              variant: "destructive",
            });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const workflowStatus = nodeCount > 0 ? 'Ready' : 'Empty';
  const complexity = nodeCount > 15 ? 'Complex' : nodeCount > 8 ? 'Medium' : 'Simple';

  return (
    <header className="bg-white border-b border-gray-200 p-4 shadow-xl">
      <div className="flex items-center justify-between">
        {/* Left Section - Navigation & Title */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-gray-100 transition-all duration-200 hover:scale-105"
            onClick={onToggleSidebar}
          >
            <Menu className="w-4 h-4 text-gray-700" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-gray-100 transition-all duration-200 hover:scale-105"
            style={{ marginRight: 4 }}
            onClick={() => navigate('/home')}
          >
            <Home className="w-4 h-4 text-gray-700" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-200 to-purple-200 rounded-xl shadow-lg animate-pulse">
              <Sparkles className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Workflow Builder
              </h1>
              <p className="text-xs text-gray-500">Advanced automation platform</p>
            </div>
          </div>
        </div>
        {/* Center Section - Editor/Executions Tabs */}
        <div className="flex items-center">
          <Tabs value={activeMode} onValueChange={setActiveMode}>
            <TabsList>
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="executions">Executions</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        {/* Right Section - Action Buttons */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <Button
              onClick={handleSave}
              variant="ghost"
              size="sm"
              className="hover:bg-gray-200 transition-all duration-200 hover:scale-105"
              title="Save Workflow"
            >
              <Save className="w-4 h-4 text-gray-700" />
            </Button>
            
            <Button
              onClick={handleImport}
              variant="ghost"
              size="sm"
              className="hover:bg-gray-200 transition-all duration-200 hover:scale-105"
              title="Import Workflow"
            >
              <Upload className="w-4 h-4 text-gray-700" />
            </Button>
            
            <Button
              onClick={handleExport}
              variant="ghost"
              size="sm"
              className="hover:bg-gray-200 transition-all duration-200 hover:scale-105"
              title="Export Workflow"
            >
              <Download className="w-4 h-4 text-gray-700" />
            </Button>
          </div>

          <div className="w-px h-8 bg-gray-300"></div>
          
          <Button
            onClick={onClear}
            variant="outline"
            size="sm"
            className="border-blue-500 bg-blue-600/10 text-blue-400 hover:bg-blue-600/30 hover:border-blue-400 hover:text-blue-300 transition-all duration-200"
            disabled={isExecuting}
          >
            <RefreshCw className="w-4 h-4 mr-1 text-gray-700" />
            Clear
          </Button>
          
          <Button
            onClick={onExecute}
            disabled={isExecuting || nodeCount === 0}
            className={`
              transition-all duration-300 transform hover:scale-105 shadow-lg
              ${isExecuting 
                ? 'bg-gradient-to-r from-orange-600 to-red-600 animate-pulse' 
                : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
              }
            `}
          >
            {isExecuting ? (
              <>
                <Square className="w-4 h-4 mr-2 animate-spin text-gray-700" />
                Stop
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2 text-gray-700" />
                Execute
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Execution Progress Bar */}
      {isExecuting && (
        <div className="mt-4">
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse rounded-full"></div>
          </div>
          <p className="text-xs text-gray-500 mt-1 text-center">
            Executing workflow with {nodeCount} nodes...
          </p>
        </div>
      )}
    </header>
  );
};

