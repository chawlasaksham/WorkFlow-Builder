
import React from 'react';
import { WorkflowBuilder } from '@/components/workflow/WorkflowBuilder';
import { useParams } from 'react-router-dom';

const Index = () => {
  const { workflowId } = useParams();
  return (
    <div className="h-screen w-full bg-gray-900">
      <WorkflowBuilder workflowId={workflowId} />
    </div>
  );
};

export default Index;
