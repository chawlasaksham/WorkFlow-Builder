import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const CodeConfig = ({ config, onChange }) => (
  <div>
    <label className="block font-medium mb-1">Label</label>
    <Input value={config.label || ''} onChange={e => onChange({ ...config, label: e.target.value })} />
    <label className="block font-medium mt-3 mb-1">Code</label>
    <Textarea rows={6} value={config.code || ''} onChange={e => onChange({ ...config, code: e.target.value })} />
  </div>
) 