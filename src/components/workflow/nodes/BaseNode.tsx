import React, { useState, useEffect, useCallback } from 'react';
import { LucideIcon } from 'lucide-react';
import { CheckCircle, XCircle, Loader2, Circle, MoreVertical, Copy, Trash2, Play, Pause, Settings, Clock, Zap, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog } from '@/components/ui/dialog';

interface BaseNodeProps {
  icon: LucideIcon;
  label: string;
  status: 'idle' | 'running' | 'success' | 'error' | 'paused' | 'disabled' | 'warning';
  color: string;
  selected: boolean;
  children: React.ReactNode;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onToggleEnable?: () => void;
  onExecuteNode?: () => void;
  enabled?: boolean;
  executionTime?: number;
  lastExecuted?: Date;
  nodeId: string;
  data?: any;
  isExecuting?: boolean;
  hasBreakpoint?: boolean;
  onToggleBreakpoint?: () => void;
  executionCount?: number;
  avgExecutionTime?: number;
}

export const BaseNode = ({ 
  icon: Icon, 
  label, 
  status, 
  color, 
  selected, 
  children, 
  onDelete, 
  onDuplicate,
  onToggleEnable,
  onExecuteNode,
  enabled = true,
  executionTime,
  lastExecuted,
  nodeId,
  data,
  isExecuting = false,
  hasBreakpoint = false,
  onToggleBreakpoint,
  executionCount = 0,
  avgExecutionTime
}: BaseNodeProps) => {
  const [showActions, setShowActions] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(false);
  const [showCredsForm, setShowCredsForm] = useState(false);
  const [selectedCred, setSelectedCred] = useState('default');
  
  const getStatusIcon = () => {
    switch (status) {
      case 'running':
        return <Loader2 className="w-3 h-3 text-blue-400 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-3 h-3 text-green-400" />;
      case 'error':
        return <XCircle className="w-3 h-3 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-3 h-3 text-yellow-400" />;
      case 'paused':
        return <Pause className="w-3 h-3 text-yellow-400" />;
      case 'disabled':
        return <Circle className="w-3 h-3 text-gray-500" />;
      default:
        return <Circle className="w-3 h-3 text-gray-400" />;
    }
  };

  const getStatusGlow = () => {
    switch (status) {
      case 'running':
        return 'shadow-blue-500/30 shadow-lg animate-pulse';
      case 'success':
        return 'shadow-green-500/30 shadow-lg';
      case 'error':
        return 'shadow-red-500/30 shadow-lg';
      case 'warning':
        return 'shadow-yellow-500/30 shadow-lg';
      case 'paused':
        return 'shadow-yellow-500/30 shadow-lg';
      default:
        return '';
    }
  };

  const getStatusBadge = () => {
    if (status === 'disabled' || !enabled) {
      return <Badge variant="secondary" className="text-xs bg-gray-200 text-gray-500">Disabled</Badge>;
    }
    if (executionTime) {
      return <Badge variant="outline" className="text-xs text-gray-700">{executionTime}ms</Badge>;
    }
    if (avgExecutionTime) {
      return <Badge variant="outline" className="text-xs text-gray-700">~{avgExecutionTime}ms</Badge>;
    }
    return null;
  };

  const getPerformanceBadge = () => {
    if (executionCount > 0) {
      return (
        <Badge variant="outline" className="text-xs bg-gray-100 border-gray-300 text-gray-700">
          {executionCount} runs
        </Badge>
      );
    }
    return null;
  };

  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      console.log(`🗑️ Deleting node: ${nodeId}`);
      onDelete();
    }
  }, [onDelete, nodeId]);

  const handleDuplicate = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDuplicate) {
      console.log(`📋 Duplicating node: ${nodeId}`);
      onDuplicate();
    }
  }, [onDuplicate, nodeId]);

  const handleToggleEnable = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleEnable) {
      console.log(`🔧 Toggling enable for node: ${nodeId}, current state: ${enabled}`);
      onToggleEnable();
    }
  }, [onToggleEnable, nodeId, enabled]);

  const handleExecute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (onExecuteNode && enabled) {
      console.log(`⚡ Executing single node: ${nodeId}`);
      setPulseAnimation(true);
      setTimeout(() => setPulseAnimation(false), 1000);
      onExecuteNode();
    }
  }, [onExecuteNode, enabled, nodeId]);

  const handleToggleBreakpoint = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleBreakpoint) {
      console.log(`🔴 Toggling breakpoint for node: ${nodeId}`);
      onToggleBreakpoint();
    }
  }, [onToggleBreakpoint, nodeId]);

  useEffect(() => {
    if (status === 'running') {
      setPulseAnimation(true);
    } else {
      setPulseAnimation(false);
    }
  }, [status]);

  const getConfigSummary = () => {
    if (!data?.config) return null;
    const configKeys = Object.keys(data.config);
    if (configKeys.length === 0) return null;
    
    return (
      <div className="text-xs text-gray-500 bg-gray-100 p-1 rounded mt-1">
        Config: {configKeys.slice(0, 2).join(', ')}{configKeys.length > 2 ? '...' : ''}
      </div>
    );
  };

  const getHealthStatus = () => {
    if (!executionCount) return null;
    if (status === 'error') return 'unhealthy';
    if (avgExecutionTime && avgExecutionTime > 1000) return 'slow';
    if (executionCount > 5) return 'healthy';
    return 'normal';
  };

  return (
    <TooltipProvider>
      <div 
        className={`
          group relative bg-gradient-to-br from-white to-gray-100 border-2 rounded-xl p-4 w-64 h-36
          transition-all duration-300 transform backdrop-blur-sm
          ${selected 
            ? 'border-blue-500 shadow-lg shadow-blue-200/30 scale-105' 
            : enabled 
              ? 'border-gray-300 hover:border-gray-400'
              : 'border-gray-200 opacity-60'
          }
          ${getStatusGlow()}
          ${isHovered ? 'hover:scale-105 hover:shadow-xl' : ''}
          ${pulseAnimation ? 'animate-pulse' : ''}
          ${!enabled ? 'grayscale' : ''}
        `}
        onMouseEnter={() => {
          setShowActions(true);
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setShowActions(false);
          setIsHovered(false);
        }}
        onDoubleClick={() => setShowCredsForm(true)}
      >
        {/* Red warning triangle for missing credentials - now clickable to open credentials modal */}
        {(!data?.credentialsValid &&
          !/trigger|noop|end|start/i.test(nodeId) &&
          !/trigger|noop|end|start/i.test(data?.type || '') &&
          !/trigger|noop|end|start/i.test(label || '')) && (
          <button
            className="absolute top-1 right-1 z-20 p-0 m-0 bg-transparent border-none cursor-pointer"
            style={{ lineHeight: 0 }}
            onClick={e => { e.stopPropagation(); setShowCredsForm(true); }}
            aria-label="Set up credentials"
          >
            <AlertTriangle className="text-red-500 w-5 h-5" />
          </button>
        )}
        {/* Breakpoint indicator */}
        {hasBreakpoint && (
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
        )}

        {/* Status indicator glow */}
        {status === 'running' && (
          <div className="absolute inset-0 rounded-xl bg-blue-500/10 animate-pulse"></div>
        )}
        
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className={`w-8 h-8 rounded-lg ${enabled ? color : 'bg-gray-600'} flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110`}>
            <Icon className="w-4 h-4 text-gray-700" />
          </div>
          
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            
            {/* Breakpoint toggle */}
            {onToggleBreakpoint && showActions && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleToggleBreakpoint}
                    className={`h-6 w-6 p-0 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-all duration-200 ${
                      hasBreakpoint ? 'bg-red-600' : ''
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-current"></div>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{hasBreakpoint ? 'Remove' : 'Add'} Breakpoint</p>
                </TooltipContent>
              </Tooltip>
            )}
            
            {/* Action Menu */}
            {showActions && (
              <div className="flex items-center space-x-1 animate-fade-in">
                {onExecuteNode && enabled && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleExecute}
                        className="h-6 w-6 p-0 hover:bg-green-600 opacity-0 group-hover:opacity-100 transition-all duration-200"
                        disabled={isExecuting}
                      >
                        <Play className="w-3 h-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Execute Node</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                {onToggleEnable && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleToggleEnable}
                        className="h-6 w-6 p-0 hover:bg-yellow-600 opacity-0 group-hover:opacity-100 transition-all duration-200"
                      >
                        <Settings className="w-3 h-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{enabled ? "Disable" : "Enable"} Node</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                {onDuplicate && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleDuplicate}
                        className="h-6 w-6 p-0 hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-all duration-200"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Duplicate Node</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                {onDelete && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleDelete}
                        className="h-6 w-6 p-0 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-all duration-200"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete Node</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Title and Status Badge */}
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-gray-900 truncate flex-1">
            {label}
          </div>
          <div className="flex space-x-1">
            {getStatusBadge()}
            {getPerformanceBadge()}
          </div>
        </div>
        
        {/* Content */}
        <div className="space-y-2">
          {children}
        </div>
        
        {/* Config Summary */}
        {getConfigSummary()}
        
        {/* Execution Info */}
        <div className="mt-2 flex justify-between items-center text-xs text-gray-400">
          {lastExecuted && (
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>Last: {lastExecuted.toLocaleTimeString()}</span>
            </div>
          )}
          
          {getHealthStatus() && (
            <div className={`flex items-center space-x-1 ${
              getHealthStatus() === 'healthy' ? 'text-green-400' :
              getHealthStatus() === 'slow' ? 'text-yellow-400' :
              getHealthStatus() === 'unhealthy' ? 'text-red-400' :
              'text-gray-400'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                getHealthStatus() === 'healthy' ? 'bg-green-400' :
                getHealthStatus() === 'slow' ? 'bg-yellow-400' :
                getHealthStatus() === 'unhealthy' ? 'bg-red-400' :
                'bg-gray-400'
              }`}></div>
              <span>{getHealthStatus()}</span>
            </div>
          )}
        </div>
        
        {/* Execution progress indicator */}
        {status === 'running' && (
          <div className="absolute bottom-2 left-2 right-2">
            <div className="w-full bg-gray-700 rounded-full h-1 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse rounded-full"></div>
            </div>
          </div>
        )}
        
        {/* Selection indicator */}
        {selected && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
        )}

        {/* Execution count indicator */}
        {executionCount > 0 && showActions && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Badge variant="outline" className="text-xs bg-gray-800/90 border-gray-600">
              <Zap className="w-2 h-2 mr-1" />
              {executionCount}
            </Badge>
          </div>
        )}
      </div>
      {/* Proxy Credentials Modal with advanced layout and tabs */}
      {showCredsForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" onClick={() => setShowCredsForm(false)}>
          <div className="bg-white rounded-lg shadow-xl p-0 w-[700px] flex relative" onClick={e => e.stopPropagation()}>
            {/* Left Tabs */}
            <div className="w-48 border-r bg-gray-50 flex flex-col py-6 px-2">
              <button className="text-left px-4 py-2 mb-2 rounded font-semibold bg-white text-blue-600 border-l-4 border-blue-600">Connection</button>
              <button className="text-left px-4 py-2 mb-2 rounded text-gray-400 cursor-not-allowed">Sharing</button>
              <button className="text-left px-4 py-2 rounded text-gray-400 cursor-not-allowed">Details</button>
            </div>
            {/* Main Panel */}
            <div className="flex-1 p-8 relative">
              {/* Save and Close */}
              <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800" onClick={() => setShowCredsForm(false)}>&times;</button>
              <button className="absolute top-4 right-16 bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-700" onClick={() => setShowCredsForm(false)}>Save</button>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-black">
                {Icon ? <Icon className="w-6 h-6" /> : <span className="w-6 h-6 bg-gray-200 rounded" />}
                {label || 'Node'} Credentials
              </h2>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-black">Connect using <span className="text-red-500">*</span></label>
                <div className="flex gap-4">
                  <button type="button" className="flex items-center gap-2 px-4 py-2 rounded border border-blue-600 bg-blue-50 text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <span className="w-3 h-3 rounded-full border-2 border-blue-600 bg-blue-600 inline-block mr-2"></span>
                    OAuth2 (recommended)
                  </button>
                  <button type="button" className="flex items-center gap-2 px-4 py-2 rounded border border-gray-300 bg-gray-100 text-gray-700 font-semibold cursor-not-allowed">
                    <span className="w-3 h-3 rounded-full border-2 border-gray-400 bg-white inline-block mr-2"></span>
                    Service Account
                  </button>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1 text-black">Client ID <span className="text-red-500">*</span></label>
                <input className="w-full border rounded p-2 text-black bg-white" placeholder="Enter Client ID" onMouseDown={e => e.stopPropagation()} />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1 text-black">Client Secret <span className="text-red-500">*</span></label>
                <input className="w-full border rounded p-2 text-black bg-white" placeholder="Enter Client Secret" type="password" onMouseDown={e => e.stopPropagation()} />
              </div>
              <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-3 rounded mb-4 text-sm">
                Make sure you enabled the following APIs & Services in the Google Cloud Console: Google Drive API, Google Sheets API. <a href="#" className="underline text-yellow-900">More info.</a>
              </div>
              <div className="text-xs text-gray-500 mt-2">Enterprise plan users can pull in credentials from external vaults. <a href="#" className="underline">More info</a>.</div>
            </div>
          </div>
        </div>
      )}
    </TooltipProvider>
  );
};
