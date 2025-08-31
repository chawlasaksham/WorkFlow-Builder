import React, { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "../ui/pagination";

const initialData = {
  tenant_id: 'tenant-456',
  secrets: [
    {
      secret_id: 'secret-123',
      name: 'DB Password',
      value: '********',
      created_at: '2024-07-01T10:00:00Z',
      last_used_at: '2024-07-10T12:00:00Z',
      used_in_workflows: ['wf-1', 'wf-2'],
    },
    {
      secret_id: 'secret-456',
      name: 'API Token',
      value: '********',
      created_at: '2024-06-01T09:00:00Z',
      last_used_at: '',
      used_in_workflows: [],
    },
  ],
};

const ROWS_PER_PAGE_OPTIONS = [5, 10, 15, 20];

const ExternalSecrets = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [secrets, setSecrets] = useState(initialData.secrets);
  const [form, setForm] = useState({
    name: '',
    created_at: '',
    last_used_at: '',
    used_in_workflows: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Calculate paginated secrets
  const totalPages = Math.ceil(secrets.length / rowsPerPage) || 1;
  const paginatedSecrets = secrets.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Reset to first page if secrets or rowsPerPage changes and currentPage is out of range
  React.useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [secrets.length, rowsPerPage, totalPages]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name) return;
    setSecrets([
      ...secrets,
      {
        secret_id: `secret-${Date.now()}`,
        name: form.name,
        value: '********',
        created_at: form.created_at,
        last_used_at: form.last_used_at,
        used_in_workflows: form.used_in_workflows.split(',').map(w => w.trim()).filter(Boolean),
      },
    ]);
    setForm({ name: '', created_at: '', last_used_at: '', used_in_workflows: '' });
    setShowAdd(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">External Secrets</h2>
        <button
          className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600"
          onClick={() => setShowAdd(true)}
        >
          Add Secret
        </button>
      </div>
      <table className="w-full border rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Created At</th>
            <th className="p-2 text-left">Last Used</th>
            <th className="p-2 text-left">Used In Workflows</th>
          </tr>
        </thead>
        <tbody>
          {paginatedSecrets.map(secret => (
            <tr key={secret.secret_id} className="border-t">
              <td className="p-2">{secret.name}</td>
              <td className="p-2">{secret.created_at ? new Date(secret.created_at).toLocaleString() : '-'}</td>
              <td className="p-2">{secret.last_used_at ? new Date(secret.last_used_at).toLocaleString() : '-'}</td>
              <td className="p-2">{secret.used_in_workflows.length > 0 ? secret.used_in_workflows.join(', ') : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <label htmlFor="rows-per-page" className="text-sm text-gray-600">Rows per page</label>
          <select
            id="rows-per-page"
            className="border rounded px-2 py-1 text-sm"
            value={rowsPerPage}
            onChange={e => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {ROWS_PER_PAGE_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={e => {
                  e.preventDefault();
                  setCurrentPage(p => Math.max(1, p - 1));
                }}
                aria-disabled={currentPage === 1}
                tabIndex={currentPage === 1 ? -1 : 0}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={e => {
                    e.preventDefault();
                    setCurrentPage(i + 1);
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={e => {
                  e.preventDefault();
                  setCurrentPage(p => Math.min(totalPages, p + 1));
                }}
                aria-disabled={currentPage === totalPages}
                tabIndex={currentPage === totalPages ? -1 : 0}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      {showAdd && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-96 relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setShowAdd(false)}>&times;</button>
            <h2 className="text-xl font-bold mb-4">Add Secret</h2>
            <form className="space-y-4" onSubmit={handleAdd}>
              <input className="w-full border rounded px-3 py-2" placeholder="Secret Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              <input className="w-full border rounded px-3 py-2" placeholder="Created At (YYYY-MM-DDTHH:mm:ssZ)" value={form.created_at} onChange={e => setForm(f => ({ ...f, created_at: e.target.value }))} />
              <input className="w-full border rounded px-3 py-2" placeholder="Last Used (YYYY-MM-DDTHH:mm:ssZ)" value={form.last_used_at} onChange={e => setForm(f => ({ ...f, last_used_at: e.target.value }))} />
              <input className="w-full border rounded px-3 py-2" placeholder="Used In Workflows (comma separated)" value={form.used_in_workflows} onChange={e => setForm(f => ({ ...f, used_in_workflows: e.target.value }))} />
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors">Add</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExternalSecrets; 