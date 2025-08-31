import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Database } from 'lucide-react';
import { BaseNode } from './BaseNode';

export const SQLite3Node = ({ data, selected, id }) => {
  return (
    <BaseNode
      icon={Database}
      label={data.label || 'SQLite3'}
      status={data.status}
      color="bg-orange-700"
      selected={selected}
      nodeId={id}
      data={data}
      enabled={data.enabled}
      executionTime={data.executionTime}
      lastExecuted={data.lastExecuted}
    >
      <Handle type="target" position={Position.Left} className="w-3 h-3" />
      <Handle type="source" position={Position.Right} className="w-3 h-3" />
    </BaseNode>
  );
}; 