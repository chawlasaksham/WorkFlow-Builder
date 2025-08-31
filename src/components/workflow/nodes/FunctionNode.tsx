import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Code } from 'lucide-react';
import { BaseNode } from './BaseNode';

export const FunctionNode = ({ data, selected, id }) => {
  return (
    <BaseNode
      icon={Code}
      label={data.label || 'Function'}
      status={data.status}
      color="bg-indigo-700"
      selected={selected}
      nodeId={id}
      data={data}
      enabled={data.enabled}
      executionTime={data.executionTime}
      lastExecuted={data.lastExecuted}
    >
      <Handle type="target" position={Position.Left} className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3" />
      <Handle type="source" position={Position.Right} className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3" />
    </BaseNode>
  );
}; 