import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import RequestsTable from "../components/admin/RequestsTable";

export default function AdminPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    setLoading(true);
    const res = await fetch("/.netlify/functions/list-practitioner-requests");
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
      <h1 className="text-2xl font-bold">Tableau de bord Admin</h1>
      <p className="mb-4">Validez ou rejetez les demandes de praticiens</p>
      <RequestsTable
        requests={requests}
        loading={loading}
        onApprove={approve}
        onReject={rejectRequest}
      />
    </div>
  );
}
