import { redirect } from 'next/navigation';
import { createSupabaseService } from '@/lib/supabase/service';
import Tab from './components/tabs/tabs';

export default async function AuthPage() {
  const service = createSupabaseService();
  const { count, error } = await service
    .from('profiles')
    .select('id', { count: 'exact', head: true })
    .eq('role', 'ADMIN');

  // belum ada admin -> setup awal
  if (!error && count === 0) redirect('/setup');

  return <Tab />;
}
