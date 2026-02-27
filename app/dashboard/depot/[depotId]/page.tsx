'use client';

import { useAuth } from '@/hooks/useAuth';
import { useParams } from 'next/navigation';
export default function DepotDashboard() {
  const { user } = useAuth();
  const params = useParams();

  return (
    <div>
        <h1>Depot</h1>
        <p>{user?.depotId}</p>
        <p>{user?.username}</p>
    </div>
  );
}