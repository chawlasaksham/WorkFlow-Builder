import React from 'react';
import { Input } from '@/components/ui/input';

export const TextManipulationConfig = ({ config, onChange }) => (
  <div>
    <label className="block font-medium mb-1">Label</label>
    <Input value={config.label || ''} onChange={e => onChange({ ...config, label: e.target.value })} />
  </div>
); 