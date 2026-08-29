import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { User } from 'lucide-react';
import StudentInfoForm from '../form/student-info';

export default function StudentInfoCard() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle className="flex text-xl items-center gap-2">
          <User className="h-5 w-5 text-blue-600" />
          Informasi Data Diri
        </CardTitle>
        <CardDescription className="text-sm md:text-sm">
          Data pribadi siswa hanya dapat diubah oleh Admin Perpustakaan.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 ">
        <StudentInfoForm />
      </CardContent>
    </Card>
  );
}
