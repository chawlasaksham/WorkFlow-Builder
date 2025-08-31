import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { MessageSquare } from 'lucide-react';
import { BaseNode } from './BaseNode';

export const RettiwtTriggerNode = ({ data, selected, id }) => {
  return (
    <BaseNode
      icon={MessageSquare}
      label={data.label || 'Rettiwt Trigger'}
      status={data.status}
      color="bg-blue-400"
      selected={selected}
      nodeId={id}
      data={data}
      enabled={data.enabled}
      executionTime={data.executionTime}
      lastExecuted={data.lastExecuted}
    >
      <Handle type="source" position={Position.Right} className="w-3 h-3" />
    </BaseNode>
  );
}; 