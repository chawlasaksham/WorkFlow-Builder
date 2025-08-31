import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Cpu } from 'lucide-react';
import { BaseNode } from './BaseNode';

export const PuppeteerNode = ({ data, selected, id }) => {
  return (
    <BaseNode
      icon={Cpu}
      label={data.label || 'Puppeteer'}
      status={data.status}
      color="bg-gray-500"
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