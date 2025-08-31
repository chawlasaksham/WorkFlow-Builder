import React from 'react';
import { Input } from '@/components/ui/input';
// import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

export const HttpRequestConfig = ({ config, onChange }) => (
  <div>
    <label className="block font-medium mb-1">Label</label>
    <Input value={config.label || ''} onChange={e => onChange({ ...config, label: e.target.value })} />
    <label className="block font-medium mt-3 mb-1">URL</label>
    <Input value={config.url || ''} onChange={e => onChange({ ...config, url: e.target.value })} />
    <label className="block font-medium mt-3 mb-1">Method</label>
    <select className="input" value={config.method || 'GET'} onChange={e => onChange({ ...config, method: e.target.value })}>
      <option value="GET">GET</option>
      <option value="POST">POST</option>
      <option value="PUT">PUT</option>
      <option value="DELETE">DELETE</option>
    </select>
  </div>
) 