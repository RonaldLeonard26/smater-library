import InputWithIcon from '@/components/common/input-with-icon';
import useSession from '@/components/hooks/useSession';
import { Field, FieldLabel } from '@/components/ui/field';
import { IdCard, Mail, User } from 'lucide-react';

export default function StudentInfoForm() {
  const { user } = useSession();
  const fullName = user?.user_metadata?.full_name || '-';
  const nisn = user?.user_metadata?.nisn || '-';
  const email = user?.email || '-';

  return (
    <div className="grid grid-cols-1 gap-4">
      <Field>
        <FieldLabel>Nama Lengkap</FieldLabel>
        <InputWithIcon
          className="text-sm"
          leftIcon={<User className="h-4 w-4" />}
          value={fullName}
          disabled
          readOnly
        />
      </Field>
      <Field>
        <FieldLabel>Nisn</FieldLabel>
        <InputWithIcon
          className="text-sm"
          leftIcon={<IdCard className="h-4 w-4" />}
          value={nisn}
          disabled
          readOnly
        />
      </Field>
      <Field>
        <FieldLabel>Email</FieldLabel>
        <InputWithIcon
          className="text-sm"
          leftIcon={<Mail className="h-4 w-4" />}
          value={email}
          disabled
          readOnly
        />
      </Field>
    </div>
  );
}
