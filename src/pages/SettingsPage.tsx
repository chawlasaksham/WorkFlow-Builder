import React, { useState } from 'react';
import Sidebar from '../components/settings/Sidebar';
import UsageAndPlan from '../components/settings/UsageAndPlan';
import Personal from '../components/settings/Personal';
import Users from '../components/settings/Users';
import API from '../components/settings/API';
import ExternalSecrets from '../components/settings/ExternalSecrets';
import Environments from '../components/settings/Environments';
import SSO from '../components/settings/SSO';
import LDAP from '../components/settings/LDAP';
import LogStreaming from '../components/settings/LogStreaming';
import CommunityNodes from '../components/settings/CommunityNodes';
import { useNavigate } from 'react-router-dom';

const sectionComponents = {
  usage: UsageAndPlan,
  personal: Personal,
  users: Users,
  api: API,
  externalSecrets: ExternalSecrets,
  environments: Environments,
  sso: SSO,
  ldap: LDAP,
  logStreaming: LogStreaming,
  communityNodes: CommunityNodes,
};

const addableSections = [
  'usage',
  'personal',
  'users',
  'api',
  'externalSecrets',
  'environments',
  'logStreaming',
  'communityNodes',
];

const SettingsPage = () => {
  const [selected, setSelected] = useState('usage');
  const [addModalFor, setAddModalFor] = useState(null);
  const SectionComponent = sectionComponents[selected] || UsageAndPlan;
  const navigate = useNavigate();

  // Simple add form content for demo
  const renderAddModal = () => {
    if (!addModalFor) return null;
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
        <div className="bg-white rounded-lg shadow-lg p-8 w-96 relative">
          <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setAddModalFor(null)}>&times;</button>
          <h2 className="text-xl font-bold mb-4">Add to {addModalFor.charAt(0).toUpperCase() + addModalFor.slice(1)}</h2>
          <form className="space-y-4">
            <input className="w-full border rounded px-3 py-2" placeholder={`Demo input for ${addModalFor}`} />
            <button type="button" className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors" onClick={() => setAddModalFor(null)}>Add</button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top navbar */}
      <nav className="w-full flex justify-between items-center gap-2 px-8 py-3 bg-white border-b border-gray-200">
        <span className="text-2xl font-bold text-[#ff4d4f]">SureFlow</span>
        <div className="flex gap-2">
          <button onClick={() => navigate('/home')} className="px-4 py-1 rounded bg-green-500 text-white font-medium hover:bg-green-600 transition">Home</button>
          <button onClick={() => navigate('/login')} className="px-4 py-1 rounded bg-red-500 text-white font-medium hover:bg-red-600 transition">Logout</button>
        </div>
        </nav>
      <div className="flex min-h-[calc(100vh-56px)]">
        <Sidebar selected={selected} setSelected={setSelected} onAddClick={section => setAddModalFor(section)} addableSections={addableSections} />
        <main className="flex-1 p-8">
          <SectionComponent />
        </main>
        {renderAddModal()}
          </div>
    </div>
  );
};

export default SettingsPage; 