import React from 'react';

export default function CustomersPage() {
  return (
    <div className="flex min-h-screen bg-bg-base text-text-primary">
      {/* Sidebar */}
      <div className="w-64 border-r border-border-subtle bg-bg-surface p-4">
        <h1 className="text-xl font-bold mb-8">Admin Portal</h1>
        <nav className="flex flex-col gap-2">
          <a href="/admin/customers" className="p-2 rounded bg-bg-elevated text-primary font-semibold">Customers</a>
          <a href="/admin/billing" className="p-2 rounded text-text-secondary hover:bg-bg-elevated hover:text-text-primary">Billing</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="mb-8">
          <h2 className="text-2xl font-semibold">Customer List</h2>
          <p className="text-text-muted text-sm mt-1">Manage active tenants and their themes.</p>
        </header>

        <div className="border border-border-subtle rounded-lg bg-bg-surface overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-subtle bg-bg-elevated text-text-secondary text-sm">
                <th className="p-4 font-medium">Tenant Name</th>
                <th className="p-4 font-medium">Active Theme</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-border-subtle">
                <td className="p-4">Acme Corp</td>
                <td className="p-4 text-text-secondary">Ocean Blue</td>
                <td className="p-4"><span className="px-2 py-1 bg-success bg-opacity-20 text-success rounded-full text-xs">Active</span></td>
                <td className="p-4"><button className="text-primary hover:underline">Edit</button></td>
              </tr>
              <tr className="border-b border-border-subtle">
                <td className="p-4">Globex Inc</td>
                <td className="p-4 text-text-secondary">Midnight Dark</td>
                <td className="p-4"><span className="px-2 py-1 bg-success bg-opacity-20 text-success rounded-full text-xs">Active</span></td>
                <td className="p-4"><button className="text-primary hover:underline">Edit</button></td>
              </tr>
              <tr>
                <td className="p-4">Soylent Corp</td>
                <td className="p-4 text-text-secondary">Forest Green</td>
                <td className="p-4"><span className="px-2 py-1 bg-gray-500 bg-opacity-20 text-text-muted rounded-full text-xs">Inactive</span></td>
                <td className="p-4"><button className="text-primary hover:underline">Edit</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
