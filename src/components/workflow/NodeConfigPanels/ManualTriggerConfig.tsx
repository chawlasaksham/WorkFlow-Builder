import React from 'react';
import { Input } from '@/components/ui/input';

export const ManualTriggerConfig = ({ config, onChange }) => (
  <div>
    <label className="block font-medium mb-1">Label</label>
    <Input value={config.label || ''} onChange={e => onChange({ ...config, label: e.target.value })} />
    <label className="block font-medium mt-3 mb-1">Interval</label>
    <Input value={config.interval || ''} onChange={e => onChange({ ...config, interval: e.target.value })} />
    <label className="block font-medium mt-3 mb-1">Cron</label>
    <Input value={config.cron || ''} onChange={e => onChange({ ...config, cron: e.target.value })} />
  </div>
) 