import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Filter } from 'lucide-react';
import { BaseNode } from './BaseNode';

export const DataValidationNode = ({ data, selected, id }) => {
  return (
    <BaseNode
      icon={Filter}
      label={data.label || 'Data Validation'}
      status={data.status}
      color="bg-cyan-700"
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