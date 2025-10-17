import React from 'react';

export default function RequestsTable({ requests, loading, onApprove, onReject }: any) {
  if (loading) return <div>Chargement...</div>;
  if (!requests || requests.length === 0) return <div>Aucune demande en attente</div>;

  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr>
          <th className="border p-2">ID</th>
          <th className="border p-2">Nom</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Spécialité</th>
          <th className="border p-2">Date</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((r: any) => (
          <tr key={r.id}>
            <td className="border p-2">{r.id}</td>
            <td className="border p-2">{r.name}</td>
            <td className="border p-2">{r.email}</td>
            <td className="border p-2">{r.specialty}</td>
            <td className="border p-2">{new Date(r.created_at).toLocaleString()}</td>
            <td className="border p-2">
              <button className="mr-2 px-3 py-1 bg-green-600 text-white rounded" onClick={() => onApprove(r.id)}>Valider</button>
              <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={() => onReject(r.id)}>Rejeter</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
