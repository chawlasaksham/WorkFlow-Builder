import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Circle } from 'lucide-react';
import { BaseNode } from './BaseNode';

export const NoOpNode = ({ data, selected, id }) => {
  return (
    <BaseNode
      icon={Circle}
      label={data.label || 'NoOp'}
      status={data.status}
      color="bg-gray-300"
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