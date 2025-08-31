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
  users: [
    {
      user_id: 'user-123',
      email: 'user@example.com',
      role: 'Owner',
      status: 'Active',
      invited_at: '2024-07-01T10:00:00Z',
      last_active: '2024-07-10T12:00:00Z',
    },
    {
      user_id: 'user-456',
      email: 'another@example.com',
      role: 'Admin',
      status: 'Invited',
      invited_at: '2024-07-05T09:00:00Z',
      last_active: '',
    },
  ],
};

const ROWS_PER_PAGE_OPTIONS = [5, 10, 15, 20];

const Users = () => {
  const [showInvite, setShowInvite] = useState(false);
  const [users, setUsers] = useState(initialData.users);
  const [form, setForm] = useState({
    email: '',
    role: '',
    status: '',
    invited_at: '',
    last_active: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Calculate paginated users
  const totalPages = Math.ceil(users.length / rowsPerPage) || 1;
  const paginatedUsers = users.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Reset to first page if users or rowsPerPage changes and currentPage is out of range
  React.useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [users.length, rowsPerPage, totalPages]);

  const handleInvite = (e) => {
    e.preventDefault();
    if (!form.email) return;
    setUsers([
      ...users,
      {
        user_id: `user-${Date.now()}`,
        ...form,
      },
    ]);
    setForm({ email: '', role: '', status: '', invited_at: '', last_active: '' });
    setShowInvite(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Users</h2>
        <button
          className="px-4 py-2 rounded bg-red-400 text-white font-semibold hover:bg-red-500"
          onClick={() => setShowInvite(true)}
        >
          Invite
        </button>
      </div>
      <table className="w-full border rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Invited At</th>
            <th className="p-2 text-left">Last Active</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map(user => (
            <tr key={user.user_id} className="border-t">
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2">{user.status}</td>
              <td className="p-2">{user.invited_at ? new Date(user.invited_at).toLocaleString() : '-'}</td>
              <td className="p-2">{user.last_active ? new Date(user.last_active).toLocaleString() : '-'}</td>
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
      {showInvite && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-96 relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setShowInvite(false)}>&times;</button>
            <h2 className="text-xl font-bold mb-4">Invite User</h2>
            <form className="space-y-4" onSubmit={handleInvite}>
              <input className="w-full border rounded px-3 py-2" placeholder="Email address" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              <input className="w-full border rounded px-3 py-2" placeholder="Role" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} />
              <input className="w-full border rounded px-3 py-2" placeholder="Status" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} />
              <input className="w-full border rounded px-3 py-2" placeholder="Invited At (YYYY-MM-DDTHH:mm:ssZ)" value={form.invited_at} onChange={e => setForm(f => ({ ...f, invited_at: e.target.value }))} />
              <input className="w-full border rounded px-3 py-2" placeholder="Last Active (YYYY-MM-DDTHH:mm:ssZ)" value={form.last_active} onChange={e => setForm(f => ({ ...f, last_active: e.target.value }))} />
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors">Invite</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users; 