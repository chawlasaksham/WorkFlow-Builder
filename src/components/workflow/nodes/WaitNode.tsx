import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Clock } from 'lucide-react';
import { BaseNode } from './BaseNode';

export const WaitNode = ({ data, selected, id }) => {
  return (
    <BaseNode
      icon={Clock}
      label={data.label || 'Wait'}
      status={data.status}
      color="bg-gray-600"
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