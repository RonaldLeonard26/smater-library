'use client';

import { Upload, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';

interface InputFileProps {
  name: string;
  defaultValue?: string;
  onChange?: (file: File | null) => void;
}

export default function InputFile({ defaultValue, onChange }: InputFileProps) {
  const [preview, setPreview] = useState<string | null>(defaultValue ?? null);

  const [fileName, setFileName] = useState('');

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (!file) return;

      const previewUrl = URL.createObjectURL(file);

      setPreview(previewUrl);
      setFileName(file.name);

      onChange?.(file);
    },
    [onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept: {
      'image/*': [],
    },
    onDrop,
  });

  useEffect(() => {
    return () => {
      if (preview?.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (preview?.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);
    setFileName('');

    onChange?.(null);
  };

  return (
    <div
      {...getRootProps()}
      className={`
        relative
        min-h-40
        rounded-lg
        border-2
        border-dashed
        cursor-pointer
        overflow-hidden
        transition-colors
        ${
          isDragActive
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/20'
        }
      `}
    >
      <input {...getInputProps()} />

      {preview ? (
        <>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={handleRemove}
            className="absolute top-2 right-2 z-20"
          >
            <Trash2 size={16} />
          </Button>

          <div className="h-48 w-full flex items-center justify-center">
            <Image
              width={140}
              height={100}
              src={preview}
              alt="preview"
              className="object-cover aspect-square rounded-xs"
            />
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1 text-xs text-white truncate">
            {fileName || 'Current Image'}
          </div>
        </>
      ) : (
        <div className="flex h-full min-h-40 flex-col items-center justify-center gap-2 p-4">
          <Upload className="h-8 w-8 text-muted-foreground" />

          <p className="text-sm text-center text-muted-foreground">
            {isDragActive
              ? 'Drop image here'
              : 'Drag & drop image or click to upload'}
          </p>
        </div>
      )}
    </div>
  );
}
