import { createSupabaseService } from '@/lib/supabase/service';
import { notFound } from 'next/navigation';
import AdminRegisterForm from '../auth/components/forms/admin-register-form';
import { Card, CardContent } from '@/components/ui/card';

export default async function SetUpPage() {
  const service = createSupabaseService();
  const { count } = await service
    .from('profiles')
    .select('id', { count: 'exact', head: true })
    .eq('role', 'ADMIN');

  if (count && count > 0) notFound();

  return (
    <div>
      <Card className="w-full max-w-sm">
        <CardContent>
          <AdminRegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}
