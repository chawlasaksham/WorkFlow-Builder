import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Mail } from 'lucide-react';
import { BaseNode } from './BaseNode';

export const GmailTriggerNode = ({ data, selected, id }) => {
  return (
    <BaseNode
      icon={Mail}
      label={data.label || 'Gmail Trigger'}
      status={data.status}
      color="bg-red-500"
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