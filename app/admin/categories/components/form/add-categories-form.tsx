import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AddCategoryForm() {
  return (
    <form className=" grid gap-4 px-2">
      <div className="space-y-2">
        <Label>Nama Kategori</Label>
        <Input />
      </div>

      <div className="space-y-2">
        <Label>Durasi</Label>
        <Input />
      </div>

      <div className="space-y-2">
        <Label>Denda</Label>
        <Input />
      </div>

      <div className="flex items-center justify-end mt-2 gap-2">
        <Button variant="destructive">Cancel</Button>
        <Button variant="outline">Save</Button>
      </div>
    </form>
  );
}
