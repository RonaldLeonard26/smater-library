import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function StudentLoginForm() {
  return (
    <form className="grid gap-4">
      <div className="space-y-2">
        <Label>NISN</Label>
        <Input />
      </div>
      <div className="space-y-2">
        <Label>Password</Label>
        <Input />
      </div>
      <div className="space-y-2">
        <Label>Confirm Password</Label>
        <Input />
      </div>
      <div className="space-y-2">
        <Button className="w-full">Login</Button>
      </div>
    </form>
  );
}
