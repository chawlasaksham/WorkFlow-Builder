import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Cloud } from 'lucide-react';
import { BaseNode } from './BaseNode';

export const AwsSdkV3Node = ({ data, selected, id }) => {
  return (
    <BaseNode
      icon={Cloud}
      label={data.label || 'AWS SDK v3'}
      status={data.status}
      color="bg-yellow-700"
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