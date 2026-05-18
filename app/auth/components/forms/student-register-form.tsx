import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function StudentRegisterForm() {
  return (
    <form className=" grid gap-4">
      <div className="flex gap-2">
        <div className="space-y-2">
          <Label>Fullname</Label>
          <Input />
        </div>
        <div className="space-y-2">
          <Label>Username</Label>
          <Input />
        </div>
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

      <Button className="w-full" variant="outline">
        Register
      </Button>
    </form>
  );
}
