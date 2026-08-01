import { CategoryColumn } from '@/app/admin/categories/components/columns';
import InputWithIcon from '@/components/common/input-with-icon';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ListFilterPlus, Search } from 'lucide-react';
import { useState } from 'react';

interface Category {
  id: number;
  name: string;
}

interface FilterCategoryProps {
  search: string;
  onSearch: (value: string) => void;

  categories: Category[];
  selectedCategories: string[];
  onToggleCategory: (id: string) => void;
  onReset: () => void;
}

export default function FilterCategory(props: FilterCategoryProps) {
  const [open, setOpen] = useState(false);

  const {
    categories,
    onReset,
    onSearch,
    onToggleCategory,
    search,
    selectedCategories,
  } = props;
  return (
    <div className="flex items-center justify-center gap-2">
      <InputWithIcon
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        leftIcon={<Search className="h-4 w-4" />}
        placeholder="Cari judul atau penulis"
      />
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <ListFilterPlus />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {categories.map((category) => (
            <div key={category.id}>
              <DropdownMenuCheckboxItem
                id={String(category.id)}
                checked={selectedCategories.includes(String(category.id))}
                onCheckedChange={() => onToggleCategory(String(category.id))}
              >
                {category.name}
              </DropdownMenuCheckboxItem>
            </div>
          ))}
          <Separator />
          <Button variant="ghost" className="w-full" onClick={onReset}>
            Reset
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
