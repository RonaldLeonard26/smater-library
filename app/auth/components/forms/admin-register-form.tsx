import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminRegisterForm() {
  return (
    <form className=" grid gap-4">
      <div className=" grid grid-cols-2 gap-2">
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

      <div className="space-y-2">
        <Button className="w-full bg-teal-600 hover:bg-teal-400">
          Register
        </Button>
      </div>
    </form>
  );
}
