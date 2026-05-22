import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function StudentRegisterForm() {
  return (
    <form className=" grid gap-4">
      <div className="space-y-2">
        <Label>Fullname</Label>
        <Input />
      </div>

      <div className="space-y-2">
        <Label>NISN</Label>
        <Input />
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
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

      <Button className="w-full bg-teal-600 hover:bg-teal-400">Register</Button>
    </form>
  );
}
