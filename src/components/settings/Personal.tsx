import React from 'react';

const mockData = {
  user_id: 'user-123',
  tenant_id: 'tenant-456',
  email: 'user@example.com',
  full_name: 'Saksham Chawla',
  profile_picture_url: '',
  timezone: 'UTC',
  language: 'English',
  notifications: {
    email_notifications: true,
    system_alerts: false,
  },
};

const Personal = () => (
  <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
    <h2 className="text-2xl font-bold mb-4">Personal Settings</h2>
    <form className="space-y-4">
      <div>
        <label className="block font-semibold mb-1">Full Name</label>
        <input className="w-full border rounded px-3 py-2" value={mockData.full_name} readOnly />
      </div>
      <div>
        <label className="block font-semibold mb-1">Email</label>
        <input className="w-full border rounded px-3 py-2" value={mockData.email} readOnly />
      </div>
      <div>
        <label className="block font-semibold mb-1">Timezone</label>
        <input className="w-full border rounded px-3 py-2" value={mockData.timezone} readOnly />
      </div>
      <div>
        <label className="block font-semibold mb-1">Language</label>
        <input className="w-full border rounded px-3 py-2" value={mockData.language} readOnly />
      </div>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={mockData.notifications.email_notifications} readOnly />
          Email Notifications
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={mockData.notifications.system_alerts} readOnly />
          System Alerts
        </label>
      </div>
    </form>
  </div>
);

export default Personal; 