import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Cloud } from 'lucide-react';
import { BaseNode } from './BaseNode';

export const WebsocketsLiteTriggerNode = ({ data, selected, id }) => {
  return (
    <BaseNode
      icon={Cloud}
      label={data.label || 'WebSockets Lite Trigger'}
      status={data.status}
      color="bg-cyan-500"
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