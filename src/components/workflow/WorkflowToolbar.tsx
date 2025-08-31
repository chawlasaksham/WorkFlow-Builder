import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Plus,
  Copy,
  Trash2,
  Undo,
  Redo,
  Search,
  Filter,
  Layout,
  GitBranch,
  Zap,
  Settings,
  HelpCircle,
  ChevronDown,
  Layers,
  AlignLeft,
  AlignCenter,
  AlignRight,
  RotateCcw,
  Lock,
  Unlock,
  LayoutGrid,
  Webhook,
  Clock,
  Code,
  Globe,
} from 'lucide-react';

interface WorkflowToolbarProps {
  selectedNodes: string[];
  onAddNode: (type: string) => void;
  onDeleteSelected: () => void;
  onDuplicateSelected: () => void;
  onAlignNodes: (alignment: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => void;
  onLockNodes: (lock: boolean) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onAutoSpace: () => void;
}

const nodeQuickAdd = [
  { type: 'webhook', label: 'Webhook', icon: Webhook },
  { type: 'http', label: 'HTTP', icon: Globe },
  { type: 'set', label: 'Set', icon: Settings },
  { type: 'function', label: 'Function', icon: Code },
];

export const WorkflowToolbar: React.FC<WorkflowToolbarProps> = ({
  selectedNodes,
  onAddNode,
  onDeleteSelected,
  onDuplicateSelected,
  onAlignNodes,
  onLockNodes,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onAutoSpace,
}) => {
  const [isLocked, setIsLocked] = useState(false);

  const handleLockToggle = () => {
    const newLockState = !isLocked;
    setIsLocked(newLockState);
    onLockNodes(newLockState);
  };

  return (
    <TooltipProvider>
      <div className="bg-white backdrop-blur-lg border-b border-gray-200 p-3 shadow-xl">
        <div className="flex items-center justify-between">
          {/* Left Section - Quick Actions */}
          <div className="flex items-center space-x-2">
            {/* Quick Add Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-blue-200 bg-blue-100 text-blue-700 hover:bg-blue-200 hover:border-blue-300 hover:text-blue-900 transition-all duration-200"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Node
                  <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-gray-200">
                <DropdownMenuLabel className="text-gray-700">Quick Add</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {nodeQuickAdd.map((node) => (
                  <DropdownMenuItem 
                    key={node.type}
                    onClick={() => onAddNode(node.type)}
                    className="hover:bg-gray-100 text-gray-900"
                  >
                    <node.icon className="w-4 h-4 mr-2 text-gray-700" />
                    {node.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Separator orientation="vertical" className="h-6" />

            {/* History Controls */}
            <div className="flex items-center space-x-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onUndo}
                    disabled={!canUndo}
                    className="h-8 w-8 p-0 text-blue-700 hover:bg-blue-100 hover:text-blue-900 disabled:text-gray-400 disabled:hover:bg-transparent"
                  >
                    <Undo className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Undo</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onRedo}
                    disabled={!canRedo}
                    className="h-8 w-8 p-0 text-blue-700 hover:bg-blue-100 hover:text-blue-900 disabled:text-gray-400 disabled:hover:bg-transparent"
                  >
                    <Redo className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Redo</TooltipContent>
              </Tooltip>
            </div>

            <Separator orientation="vertical" className="h-6" />

            {/* Selection Actions */}
            {selectedNodes.length > 0 && (
              <>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  {selectedNodes.length} selected
                </Badge>

                <div className="flex items-center space-x-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={onDuplicateSelected}
                        className="h-8 w-8 p-0 text-blue-700 hover:bg-blue-100 hover:text-blue-900"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Duplicate Selected</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={onDeleteSelected}
                        className="h-8 w-8 p-0 text-red-700 hover:bg-red-100 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete Selected</TooltipContent>
                  </Tooltip>
                </div>

                <Separator orientation="vertical" className="h-6" />

                {/* Auto Space Button */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onAutoSpace}
                      className="h-8 w-8 p-0 text-blue-700 hover:bg-blue-100 hover:text-blue-900"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Auto Space Nodes</TooltipContent>
                </Tooltip>
              </>
            )}
          </div>

          {/* Right Section - View Controls */}
          <div className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLockToggle}
                  className={`h-8 w-8 p-0 ${isLocked ? 'text-orange-400 hover:bg-orange-600/20' : 'text-blue-700 hover:bg-blue-100 hover:text-blue-900'}`}
                >
                  {isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isLocked ? 'Unlock Canvas' : 'Lock Canvas'}</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-blue-700 hover:bg-blue-100 hover:text-blue-900"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Search Nodes</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-blue-700 hover:bg-blue-100 hover:text-blue-900"
                >
                  <Filter className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Filter Nodes</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-blue-700 hover:bg-blue-100 hover:text-blue-900"
                >
                  <Layers className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Layers</TooltipContent>
            </Tooltip>

            <Separator orientation="vertical" className="h-6" />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-blue-700 hover:bg-blue-100 hover:text-blue-900"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Settings</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-blue-700 hover:bg-blue-100 hover:text-blue-900"
                >
                  <HelpCircle className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Help</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};
