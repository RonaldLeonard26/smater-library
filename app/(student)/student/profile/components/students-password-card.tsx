import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { IdCard, Mail, ShieldAlert, User } from 'lucide-react';
import ChangePasswordForm from '../form/change-password';
import StudentInfoForm from '../form/student-info';

export default function StudentPasswordCard() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-amber-600" />
          Keamanan Akun
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Ubah password Anda secara berkala untuk menjaga keamanan akun.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChangePasswordForm />
      </CardContent>
    </Card>
  );
}
