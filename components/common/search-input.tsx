interface SearchInputProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  disabled?: boolean;
}

export const handleKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  onSearch: () => void,
) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    onSearch();
  }
};
