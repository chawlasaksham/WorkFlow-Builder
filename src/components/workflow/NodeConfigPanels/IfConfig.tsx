import React from 'react';
import { Input } from '@/components/ui/input';
// import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

export const IfConfig = ({ config, onChange }) => (
  <div>
    <label className="block font-medium mb-1">Label</label>
    <Input value={config.label || ''} onChange={e => onChange({ ...config, label: e.target.value })} />
    <label className="block font-medium mt-3 mb-1">Field</label>
    <Input value={config.field || ''} onChange={e => onChange({ ...config, field: e.target.value })} />
    <label className="block font-medium mt-3 mb-1">Operator</label>
    <select className="input" value={config.operator || '=='} onChange={e => onChange({ ...config, operator: e.target.value })}>
      <option value="==">==</option>
      <option value=">">&gt;</option>
      <option value="<">&lt;</option>
      <option value=">=">&gt;=</option>
      <option value="<=">&lt;=</option>
      <option value="!=">!=</option>
    </select>
    <label className="block font-medium mt-3 mb-1">Value</label>
    <Input value={config.value || ''} onChange={e => onChange({ ...config, value: e.target.value })} />
  </div>
) 