import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiHome, FiUser, FiUsers, FiSettings } from 'react-icons/fi';

export const initialWorkflows = [
  // Workflow 1: 3 nodes, linear
  {
    workflow_id: "mock-uuid-123",
    workflow_name: "My First Workflow",
    user_id: "mock_user_1",
    company_id: "mock_company_1",
    version: 1,
    created_at: "2025-07-03T10:00:00Z",
    nodes: [
      {
        node_id: "n1",
        node_name: "Start",
        node_type: "trigger",
        input_json: { interval: "5m", cron: "*/5 * * * *" },
        position: { x: 100, y: 200 },
        connections: ["n2"]
      },
      {
        node_id: "n2",
        node_name: "Check",
        node_type: "conditional",
        input_json: { condition: "value > 10" },
        position: { x: 400, y: 200 },
        connections: ["n3"]
      },
      {
        node_id: "n3",
        node_name: "End",
        node_type: "end",
        input_json: {},
        position: { x: 700, y: 200 },
        connections: []
      }
    ],
    edges: [
      { source: "n1", target: "n2" },
      { source: "n2", target: "n3" }
    ],
    active: false,
    owner: 'personal'
  },
  // Workflow 2: 5 nodes, linear with a vertical offset for transform
  {
    workflow_id: "mock-uuid-456",
    workflow_name: "Data Cleanup Pipeline",
    user_id: "mock_user_2",
    company_id: "mock_company_1",
    version: 2,
    created_at: "2025-07-02T09:15:00Z",
    nodes: [
      {
        node_id: "n1",
        node_name: "Manual Trigger",
        node_type: "trigger",
        input_json: {},
        position: { x: 100, y: 350 },
        connections: ["n2"]
      },
      {
        node_id: "n2",
        node_name: "Fetch Data",
        node_type: "action",
        input_json: { url: "https://api.example.com/data" },
        position: { x: 400, y: 350 },
        connections: ["n3"]
      },
      {
        node_id: "n3",
        node_name: "Transform",
        node_type: "action",
        input_json: { script: "return data.map(x => x*2);" },
        position: { x: 700, y: 510 }, // vertical offset for transform
        connections: ["n4"]
      },
      {
        node_id: "n4",
        node_name: "Check",
        node_type: "conditional",
        input_json: { condition: "value < 100" },
        position: { x: 1000, y: 350 },
        connections: ["n5"]
      },
      {
        node_id: "n5",
        node_name: "End",
        node_type: "end",
        input_json: {},
        position: { x: 1300, y: 350 },
        connections: []
      }
    ],
    edges: [
      { source: "n1", target: "n2" },
      { source: "n2", target: "n3" },
      { source: "n3", target: "n4" },
      { source: "n4", target: "n5" }
    ],
    active: true,
    owner: 'personal'
  },
  // Workflow 3: 7 nodes, with branching
  {
    workflow_id: "mock-uuid-789",
    workflow_name: "Sales Report Generator",
    user_id: "mock_user_3",
    company_id: "mock_company_2",
    version: 1,
    created_at: "2025-06-28T16:45:00Z",
    nodes: [
      {
        node_id: "n1",
        node_name: "Start",
        node_type: "trigger",
        input_json: {},
        position: { x: 100, y: 500 },
        connections: ["n2"]
      },
      {
        node_id: "n2",
        node_name: "Fetch Sales",
        node_type: "action",
        input_json: { url: "https://api.example.com/sales" },
        position: { x: 400, y: 500 },
        connections: ["n3"]
      },
      {
        node_id: "n3",
        node_name: "Transform",
        node_type: "action",
        input_json: { script: "return data.map(x => x*1.1);" },
        position: { x: 700, y: 660 }, // vertical offset for transform
        connections: ["n4"]
      },
      {
        node_id: "n4",
        node_name: "Check",
        node_type: "conditional",
        input_json: { condition: "value > 1000" },
        position: { x: 1000, y: 500 },
        connections: ["n5", "n6"]
      },
      {
        node_id: "n5",
        node_name: "Notify",
        node_type: "action",
        input_json: { message: "High sales!" },
        position: { x: 1300, y: 340 }, // branch up
        connections: ["n7"]
      },
      {
        node_id: "n6",
        node_name: "Archive",
        node_type: "action",
        input_json: { archive: true },
        position: { x: 1300, y: 660 }, // branch down
        connections: ["n7"]
      },
      {
        node_id: "n7",
        node_name: "End",
        node_type: "end",
        input_json: {},
        position: { x: 1600, y: 500 },
        connections: []
      }
    ],
    edges: [
      { source: "n1", target: "n2" },
      { source: "n2", target: "n3" },
      { source: "n3", target: "n4" },
      { source: "n4", target: "n5" },
      { source: "n4", target: "n6" },
      { source: "n5", target: "n7" },
      { source: "n6", target: "n7" }
    ],
    active: false,
    owner: 'personal'
  }
];

const sidebarOptions = [
  { key: 'overview', label: 'Overview' },
  { key: 'personal', label: 'Personal' },
  { key: 'shared', label: 'Shared with you' },
];

const tabOptions = [
  { key: 'workflows', label: 'Workflows' },
  { key: 'credentials', label: 'Credentials' },
  { key: 'executions', label: 'Executions' },
];

const mockExecutions = [
  {
    workflow_name: "My First Workflow",
    status: "error",
    started: "Jul 3, 14:52:10",
    run_time: "131ms",
    exec_id: "1"
  },
  {
    workflow_name: "My First Workflow",
    status: "success",
    started: "Jul 3, 15:10:22",
    run_time: "98ms",
    exec_id: "2"
  }
];

const WorkflowsLanding = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState('overview');
  const [tab, setTab] = useState('workflows');
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [sort, setSort] = useState('lastUpdated');
  const [workflowList, setWorkflowList] = useState(initialWorkflows);
  const [showCreate, setShowCreate] = useState(false);
  const [newWorkflowName, setNewWorkflowName] = useState('');
  const [editModal, setEditModal] = useState<{ id: string; name: string } | null>(null);
  const [executions] = useState(mockExecutions);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Filter and sort workflows
  const filteredWorkflows = workflowList.filter(wf =>
    wf.workflow_name.toLowerCase().includes(search.toLowerCase())
  );
  const sortedWorkflows = [...filteredWorkflows].sort((a, b) => {
    if (sort === 'name') {
      return a.workflow_name.localeCompare(b.workflow_name);
    } else {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  // Create workflow handler
  const handleCreateWorkflow = () => {
    if (!newWorkflowName) return;
    const now = new Date().toISOString();
    const newId = crypto.randomUUID();
    setWorkflowList(list => [
      {
        workflow_id: newId,
        workflow_name: newWorkflowName,
        user_id: "mock_user_1",
        company_id: "mock_company_1",
        version: 1,
        created_at: now,
        nodes: [],
        edges: [],
        active: false,
        owner: 'personal'
      },
      ...list
    ]);
    setShowCreate(false);
    setNewWorkflowName('');
    navigate(`/index/${newId}`);
  };

  const handleToggleActive = (id: string) => {
    setWorkflowList(list => list.map(wf => wf.workflow_id === id ? { ...wf, active: !wf.active } : wf));
  };

  const handleEdit = () => {
    if (!editModal) return;
    setWorkflowList(list => list.map(wf => wf.workflow_id === editModal.id ? { ...wf, workflow_name: editModal.name } : wf));
    setEditModal(null);
  };

  const handleDelete = (id: string) => {
    setWorkflowList(list => list.filter(wf => wf.workflow_id !== id));
    setMenuOpen(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-56'} bg-gray-50 border-r border-gray-200 flex flex-col py-6 px-2`}>
        <button
          className="mb-8 flex items-center justify-center w-10 h-10 rounded hover:bg-gray-200 transition self-end"
          onClick={() => setSidebarCollapsed(c => !c)}
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <FiMenu className="w-6 h-6 text-[#ff4d4f]" />
        </button>
        {/* Removed sureflow logo from sidebar */}
        <nav className="flex flex-col gap-1 flex-1">
          {sidebarOptions.map(opt => (
            <button
              key={opt.key}
              className={`flex items-center ${sidebarCollapsed ? 'justify-center' : ''} px-4 py-2 rounded font-medium text-left transition ${sidebar === opt.key ? 'bg-[#fff1f0] text-[#ff4d4f]' : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setSidebar(opt.key)}
              title={opt.label}
            >
              {opt.key === 'overview' && <FiHome className="w-5 h-5" />}
              {opt.key === 'personal' && <FiUser className="w-5 h-5" />}
              {opt.key === 'shared' && <FiUsers className="w-5 h-5" />}
              {!sidebarCollapsed && <span className="ml-2">{opt.label}</span>}
            </button>
          ))}
        </nav>
        {/* Settings and User Info at Bottom */}
        <div className="mt-auto flex flex-col gap-2 pb-2">
          <button
            className={`flex items-center w-full px-4 py-2 rounded hover:bg-gray-100 transition ${sidebarCollapsed ? 'justify-center' : ''}`}
            onClick={() => navigate('/settings')}
            title="Settings"
          >
            <FiSettings className="w-5 h-5 text-gray-600" />
            {!sidebarCollapsed && <span className="ml-2 text-gray-700">Settings</span>}
          </button>
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-2'} px-4 py-2`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-lg">S</div>
            {!sidebarCollapsed && (
              <span
                className="text-gray-800 font-medium cursor-pointer hover:underline"
                onClick={() => navigate('/profile')}
                title="View Profile"
              >
                Sysadmin
              </span>
            )}
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#ff4d4f]">sureflow</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">
            {sidebar === 'overview' ? 'Overview' : sidebar === 'personal' ? 'Personal' : 'Shared with you'}
          </span>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded font-semibold hover:bg-red-600 transition"
            onClick={() => setShowCreate(true)}
          >
            Create Workflow
          </button>
        </header>
        <main className="flex-1 max-w-4xl mx-auto w-full py-8 px-4">
          {/* Stat Boxes */}
          <div className="grid grid-cols-5 gap-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-start justify-center">
              <div className="text-xs text-gray-500 mb-1">Prod. executions</div>
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-xs text-gray-400 mt-1">Last 7 days</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-start justify-center">
              <div className="text-xs text-gray-500 mb-1">Failed prod. executions</div>
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-xs text-gray-400 mt-1">Last 7 days</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-start justify-center">
              <div className="text-xs text-gray-500 mb-1">Failure rate</div>
              <div className="text-2xl font-bold text-gray-900">0%</div>
              <div className="text-xs text-gray-400 mt-1">Last 7 days</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-start justify-center">
              <div className="text-xs text-gray-500 mb-1">Time saved</div>
              <div className="text-2xl font-bold text-gray-900">--</div>
              <div className="text-xs text-gray-400 mt-1">Last 7 days</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-start justify-center">
              <div className="text-xs text-gray-500 mb-1">Run time (avg.)</div>
              <div className="text-2xl font-bold text-gray-900">0s</div>
              <div className="text-xs text-gray-400 mt-1">Last 7 days</div>
            </div>
          </div>
          {/* Tabs */}
          <div className="flex items-center border-b border-gray-200 mb-6">
            {tabOptions.map(t => (
              <button
                key={t.key}
                className={`px-4 py-2 -mb-px border-b-2 font-medium transition
                  ${tab === t.key ? 'border-red-400 text-red-500' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
          {/* Tab Content */}
          {tab === 'workflows' && (
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
              <div className="mb-4 flex items-center justify-between">
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <select
                  className="border border-gray-300 rounded px-2 py-2 text-sm"
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                >
                  <option value="lastUpdated">Sort by last updated</option>
                  <option value="name">Sort by name</option>
                </select>
              </div>
              {/* Create Workflow Modal */}
              {showCreate && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                  <div className="bg-white rounded-lg shadow-lg p-8 w-96">
                    <h2 className="text-xl font-bold mb-4">Create New Workflow</h2>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-1">Workflow Name</label>
                      <input
                        type="text"
                        value={newWorkflowName}
                        onChange={e => setNewWorkflowName(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="My First Workflow"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                        onClick={() => setShowCreate(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        onClick={handleCreateWorkflow}
                        disabled={!newWorkflowName}
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div className="space-y-3">
                {sortedWorkflows.length === 0 ? (
                  <div className="text-gray-400 text-center py-8">No workflows found</div>
                ) : (
                  sortedWorkflows.map(wf => (
                    <div
                      key={wf.workflow_id}
                      className="flex items-center justify-between bg-gray-50 hover:bg-blue-50 border border-gray-200 rounded px-4 py-3 cursor-pointer transition relative"
                    >
                      <div onClick={() => navigate(`/index/${wf.workflow_id}`)} className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 truncate">{wf.workflow_name}</div>
                        <div className="text-xs text-gray-500 truncate">Workflow ID: {wf.workflow_id} | Version: {wf.version || 1}</div>
                        <div className="text-xs text-gray-500 truncate">Created: {wf.created_at ? new Date(wf.created_at).toLocaleString() : '-'}</div>
                        <div className="text-xs text-gray-500 truncate">Nodes: {wf.nodes.length} | Edges: {wf.edges ? wf.edges.length : 0}</div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <span className="flex items-center bg-white border border-gray-300 text-gray-700 text-xs px-2 py-1 rounded">
                          <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          Personal
                        </span>
                        <span className={`text-xs font-semibold ${wf.active ? 'text-green-600' : 'text-gray-400'}`}>{wf.active ? 'Active' : 'Inactive'}</span>
                        <button
                          onClick={() => handleToggleActive(wf.workflow_id)}
                          className={`relative w-10 h-6 focus:outline-none`}
                          tabIndex={-1}
                        >
                          <span className={`absolute left-0 top-0 w-10 h-6 rounded-full transition ${wf.active ? 'bg-green-400' : 'bg-gray-300'}`}></span>
                          <span className={`absolute left-0 top-0 w-6 h-6 rounded-full bg-white border border-gray-300 shadow transition-transform ${wf.active ? 'translate-x-4 border-green-500' : ''}`}></span>
                        </button>
                        <div className="relative">
                          <button
                            onClick={() => setMenuOpen(menuOpen === wf.workflow_id ? null : wf.workflow_id)}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none px-2"
                            tabIndex={-1}
                          >
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="19" r="1.5" fill="currentColor"/></svg>
                          </button>
                          {menuOpen === wf.workflow_id && (
                            <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded shadow-lg z-10">
                              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => navigate('/index')}>Open</button>
                              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setEditModal({ id: wf.workflow_id, name: wf.workflow_name })}>Edit</button>
                              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Share...</button>
                              <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100" onClick={() => handleDelete(wf.workflow_id)}>Delete</button>
                              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Archive</button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
          {tab === 'credentials' && (
            <div className="bg-white rounded-lg shadow border border-gray-200 p-12 flex flex-col items-center justify-center min-h-[300px]">
              <span className="text-4xl mb-4">👋</span>
              <div className="text-lg font-semibold text-gray-700 mb-2">{sidebar === 'personal' ? 'saksham, let\'s set up a credential' : 'Let\'s set up a credential'}</div>
              <div className="text-gray-500 mb-4 text-center max-w-xs">Credentials let workflows interact with your apps and services</div>
              <button className="bg-white border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition">Add first credential</button>
            </div>
          )}
          {tab === 'executions' && (
            <div className="bg-white rounded-lg shadow border border-gray-200 p-0 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-4 py-3 text-left font-semibold text-gray-500"><input type="checkbox" /></th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500">Workflow</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500">Status</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500">Started</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500">Run Time</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500">Exec. ID</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {executions.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center text-gray-400 py-8">No more executions to fetch</td>
                    </tr>
                  ) : (
                    executions.map((ex, i) => (
                      <tr key={i} className={ex.status === 'error' ? 'bg-red-50' : ''}>
                        <td className="px-4 py-3"><input type="checkbox" /></td>
                        <td className="px-4 py-3 font-medium text-gray-900">{ex.workflow_name}</td>
                        <td className="px-4 py-3">
                          {ex.status === 'error' ? (
                            <span className="flex items-center text-red-600 font-semibold"><svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/><line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/></svg> Error</span>
                          ) : (
                            <span className="text-green-600 font-semibold">Success</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-700">{ex.started}</td>
                        <td className="px-4 py-3 text-gray-700">{ex.run_time}</td>
                        <td className="px-4 py-3 text-gray-700">{ex.exec_id} <span className="inline-block ml-1"><svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span></td>
                        <td className="px-4 py-3 text-right"><button className="text-gray-400 hover:text-gray-700"><svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="19" r="1.5" fill="currentColor"/></svg></button></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {executions.length === 0 && (
                <div className="text-center text-gray-400 py-8">No more executions to fetch</div>
              )}
            </div>
          )}
        </main>
      </div>
      {editModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-96">
            <h2 className="text-xl font-bold mb-4">Rename Workflow</h2>
            <input
              type="text"
              value={editModal.name}
              onChange={e => setEditModal({ ...editModal, name: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={() => setEditModal(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleEdit}
                disabled={!editModal.name}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowsLanding; 