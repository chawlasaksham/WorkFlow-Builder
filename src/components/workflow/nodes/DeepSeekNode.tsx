import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Brain } from 'lucide-react';
import { BaseNode } from './BaseNode';

export const DeepSeekNode = ({ data, selected, id }) => {
  return (
    <BaseNode
      icon={Brain}
      label={data.label || 'DeepSeek AI'}
      status={data.status}
      color="bg-violet-700"
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