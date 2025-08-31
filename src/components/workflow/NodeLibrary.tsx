import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Search, 
  Play, 
  Zap, 
  GitBranch, 
  Clock, 
  Globe, 
  Shuffle, 
  RotateCcw, 
  Webhook, 
  Mail, 
  Database,
  Cpu,
  FileText,
  Cloud,
  Plus,
  Settings,
  Code,
  MessageSquare,
  FileSpreadsheet,
  Brain,
  Filter,
  Circle,
  BarChart3
} from 'lucide-react';
import { NodeLibraryManager } from './NodeLibraryManager';
import { useNavigate } from 'react-router-dom';

const nodeCategories = {
  triggers: [
    { type: 'gmail-trigger', icon: Mail, name: 'Gmail Trigger', description: 'Initiates workflow when a new email arrives in Gmail.', color: 'bg-red-500' },
    { type: 'rettwit-trigger', icon: MessageSquare, name: 'Rettiwt Trigger', description: 'Interacts with the Rettiwt API for Twitter operations.', color: 'bg-blue-400' },
    { type: 'cron', icon: Clock, name: 'Cron', description: 'Schedule workflows to run at specific times or intervals.', color: 'bg-purple-500' },
    { type: 'manual', icon: Play, name: 'Manual Trigger', description: 'Manually trigger workflows from the editor.', color: 'bg-green-500' },
    { type: 'webhook', icon: Webhook, name: 'Webhook', description: 'Starts a workflow upon receiving an HTTP request.', color: 'bg-blue-500' },
    { type: 'websockets-lite-trigger', icon: Cloud, name: 'WebSockets Lite Trigger', description: 'Triggers workflows via WebSocket events.', color: 'bg-cyan-500' },
  ],
  actions: [
    { type: 'n8n-nodes-deepseek', icon: Brain, name: 'DeepSeek AI', description: 'Integrates DeepSeek AI for advanced processing.', color: 'bg-violet-700' },
    { type: 'n8n-nodes-aws-sdk-v3', icon: Cloud, name: 'AWS SDK v3', description: 'Interfaces with AWS services using the AWS SDK v3.', color: 'bg-yellow-700' },
    { type: 'github', icon: Code, name: 'GitHub', description: 'Interacts with GitHub repositories and issues.', color: 'bg-gray-800' },
    { type: 'google-sheets', icon: FileSpreadsheet, name: 'Google Sheets', description: 'Reads from and writes to Google Sheets.', color: 'bg-green-700' },
    { type: 'slack', icon: MessageSquare, name: 'Slack', description: 'Sends messages to Slack channels.', color: 'bg-green-600' },
    { type: 'trello', icon: Shuffle, name: 'Trello', description: 'Manages Trello boards, lists, and cards.', color: 'bg-blue-700' },
    { type: 'n8n-nodes-puppeteer', icon: Cpu, name: 'Puppeteer', description: 'Automates browser tasks using Puppeteer.', color: 'bg-gray-500' },
    { type: 'code', icon: Code, name: 'Code', description: 'Execute custom JavaScript or Python code within your workflow.', color: 'bg-indigo-600' },
    { type: 'execute-workflow', icon: Play, name: 'Execute Workflow', description: 'Call and run another workflow as a sub-process.', color: 'bg-blue-600' },
    { type: 'function', icon: Code, name: 'Function', description: 'Executes custom JavaScript code.', color: 'bg-indigo-700' },
    { type: 'http', icon: Globe, name: 'HTTP Request', description: 'Makes HTTP requests to interact with web services.', color: 'bg-purple-500' },
    { type: 'merge', icon: GitBranch, name: 'Merge', description: 'Combine data from multiple inputs into a single stream.', color: 'bg-yellow-600' },
    { type: 'move-binary-data', icon: FileText, name: 'Move Binary Data', description: 'Transfer binary data between fields.', color: 'bg-gray-400' },
    { type: 'noop', icon: Circle, name: 'NoOp', description: 'A placeholder node that performs no operation.', color: 'bg-gray-300' },
    { type: 'set', icon: Settings, name: 'Set', description: 'Sets static values to items in the workflow.', color: 'bg-blue-300' },
    { type: 'split-in-batches', icon: BarChart3, name: 'Split In Batches', description: 'Divide data into smaller batches for processing.', color: 'bg-orange-300' },
    { type: 'switch', icon: Shuffle, name: 'Switch', description: 'Routes items based on conditional logic.', color: 'bg-yellow-400' },
    { type: 'wait', icon: Clock, name: 'Wait', description: 'Pause workflow execution for a specified duration.', color: 'bg-gray-600' },
    { type: 'text-manipulation', icon: FileText, name: 'Text Manipulation', description: 'Performs various text transformations.', color: 'bg-pink-400' },
    { type: 'data-validation', icon: Filter, name: 'Data Validation', description: 'Validates data against JSON schemas.', color: 'bg-cyan-700' },
    { type: 'sqlite3', icon: Database, name: 'SQLite3', description: 'Performs operations on SQLite3 databases.', color: 'bg-orange-700' },
    { type: 'document-generator', icon: FileText, name: 'Document Generator', description: 'Generates dynamic documents using templates.', color: 'bg-green-400' },
    { type: 'pdfkit', icon: FileText, name: 'PDFKit', description: 'Converts images to PDF documents.', color: 'bg-red-400' },
    { type: 'if', icon: GitBranch, name: 'IF', description: 'Route data based on conditional logic.', color: 'bg-yellow-300' },
  ]
};

export const NodeLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showLibraryManager, setShowLibraryManager] = useState(false);
  const navigate = useNavigate();

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const filterNodes = (nodes: any[]) => {
    return nodes.filter(node =>
      node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getAllNodes = () => {
    return Object.values(nodeCategories).flat();
  };

  const renderNodeList = (nodes: any[]) => {
    const filteredNodes = filterNodes(nodes);
    
    return (
      <div className="grid gap-2">
        {filteredNodes.map((node) => (
          <div
            key={node.type}
            className="p-3 bg-white border border-gray-200 rounded-lg cursor-grab hover:bg-gray-100 transition-colors group"
            draggable
            onDragStart={(event) => onDragStart(event, node.type)}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg ${node.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <node.icon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{node.name}</div>
                <div className="text-xs text-gray-500">{node.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">Node Library</h2>
          <div className="flex space-x-1">
            <Dialog open={showLibraryManager} onOpenChange={setShowLibraryManager}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-blue-600 border-blue-200 hover:bg-blue-100 hover:text-blue-900">
                  <Settings className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-7xl max-h-[90vh] p-0">
                <DialogHeader className="p-6 pb-0">
                  <DialogTitle>Node Library Manager</DialogTitle>
                </DialogHeader>
                <div className="h-[80vh]">
                  <NodeLibraryManager />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search nodes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-100 border-gray-300 text-gray-900"
          />
        </div>

        <div className="text-xs text-gray-500 mb-3 flex items-center justify-between">
          <span>SureFlow Node Engine</span>
          <Badge variant="outline" className="text-xs">v2.0.0</Badge>
        </div>
      </div>

      {/* SCROLLABLE NODE LIST AREA */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full px-4 pb-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 mb-4">
              <TabsTrigger value="all" className="text-xs text-gray-700">All</TabsTrigger>
              <TabsTrigger value="categories" className="text-xs text-gray-700">Categories</TabsTrigger>
              <TabsTrigger value="custom" className="text-xs text-gray-700">Custom</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              {renderNodeList(getAllNodes())}
            </TabsContent>

            <TabsContent value="categories" className="mt-0 space-y-4">
              {Object.entries(nodeCategories).map(([category, nodes]) => (
                <div key={category}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-300 capitalize">{category}</h3>
                    <Badge variant="outline" className="text-xs">
                      {filterNodes(nodes).length}
                    </Badge>
                  </div>
                  {renderNodeList(nodes)}
                </div>
              ))}
            </TabsContent>

            <TabsContent value="custom" className="mt-0">
              <div className="space-y-4">
                <div className="text-center py-8">
                  <Code className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-sm text-gray-500 mb-3">No custom nodes yet</p>
                  <Button 
                    size="sm" 
                    onClick={() => setShowLibraryManager(true)}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Create Custom Node
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </div>

      {/* Profile section at the bottom */}
      <div
        className="p-4 border-t border-gray-200 flex-shrink-0 flex items-center gap-3 cursor-pointer hover:bg-gray-100"
        onClick={() => navigate('/profile')}
        title="View Profile"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-lg">S</div>
        <span className="text-gray-800 font-medium hover:underline">Sysadmin</span>
      </div>
    </div>
  );
};

// Add this icon for Function node
function FunctionIcon(props: any) {
  return <span {...props} style={{fontWeight: 'bold', fontSize: '1.2em'}}>ƒ</span>;
}
