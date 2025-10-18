import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import RequestsTable from "../components/admin/RequestsTable";

export default function AdminPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [processingAll, setProcessingAll] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [addingAdmin, setAddingAdmin] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    setLoading(true);
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "x-admin-secret": (import.meta.env.VITE_ADMIN_FUNCTION_SECRET as string) || "",
    };
    const res = await fetch("/.netlify/functions/list-practitioner-requests", { headers });
    if (!res.ok) {
      // show empty list on unauthorized or error
      console.error('Failed to fetch practitioner requests', res.status);
      setRequests([]);
      setLoading(false);
      return;
    }
    const data = await res.json();
    setRequests(data || []);
    setLoading(false);
  }

  async function approve(requestId: number) {
    const tempPassword = Math.random().toString(36).slice(-8);
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "x-admin-secret":
        (import.meta.env.VITE_ADMIN_FUNCTION_SECRET as string) || "",
    };
    const res = await fetch("/.netlify/functions/admin-approve", {
      method: "POST",
      headers,
      body: JSON.stringify({ requestId, tempPassword }),
    });
    const j = await res.json();
    if (res.ok) fetchRequests();
    else alert(j.error || JSON.stringify(j));
  }

  async function approveAll() {
    if (!requests || requests.length === 0) return;
    if (!confirm(`Valider ${requests.length} demandes ?`)) return;
    setProcessingAll(true);
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "x-admin-secret": (import.meta.env.VITE_ADMIN_FUNCTION_SECRET as string) || "",
    };

    const promises = requests.map((r) => {
      const tempPassword = Math.random().toString(36).slice(-8);
      return fetch("/.netlify/functions/admin-approve", {
        method: "POST",
        headers,
        body: JSON.stringify({ requestId: r.id, tempPassword }),
      }).then(async (res) => ({ res, body: await res.json(), id: r.id }));
    });

    const results = await Promise.allSettled(promises);
    let success = 0;
    const failed: any[] = [];
    for (const r of results) {
      if (r.status === "fulfilled") {
        if (r.value.res && r.value.res.ok) success++;
        else failed.push({ id: r.value.id, error: r.value.body });
      } else {
        failed.push({ error: r.reason });
      }
    }

    setProcessingAll(false);
    await fetchRequests();

    if (failed.length === 0) alert(`Validation terminée — ${success}/${requests.length} réussies`);
    else alert(`Terminé. ${success} réussies, ${failed.length} échouées. Voir console pour détails.`);
    if (failed.length) console.error('Bulk approve failures', failed);
  }

  async function rejectRequest(requestId: number, reason?: string) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "x-admin-secret":
        (import.meta.env.VITE_ADMIN_FUNCTION_SECRET as string) || "",
    };
    const res = await fetch("/.netlify/functions/admin-reject", {
      method: "POST",
      headers,
      body: JSON.stringify({ requestId, reason }),
    });
    if (res.ok) fetchRequests();
  }

  if (!user) return <div>Connexion requise (admin)</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Tableau de bord Admin</h1>
          <p>Validez ou rejetez les demandes de praticiens</p>
        </div>
        <div>
          <button
            className="mr-2 px-3 py-1 bg-blue-600 text-white rounded"
            onClick={fetchRequests}
            disabled={loading || processingAll}
          >
            Rafraîchir
          </button>
          <button
            className="px-3 py-1 bg-green-700 text-white rounded"
            onClick={approveAll}
            disabled={processingAll || loading || (requests || []).length === 0}
          >
            {processingAll ? "Validation en cours..." : `Valider tout (${(requests || []).length})`}
          </button>
        </div>
      </div>

      <RequestsTable
        requests={requests}
        loading={loading}
        onApprove={approve}
        onReject={rejectRequest}
      />
    </div>
  );
}
