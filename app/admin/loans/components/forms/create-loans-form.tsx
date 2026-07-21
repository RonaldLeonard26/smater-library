'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Book, CircleX, Search, Trash2 } from 'lucide-react';
import useLoans from '../hooks/useLoans';
import { Controller } from 'react-hook-form';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export default function CreateLoansForm() {
  const {
    student,
    studentError,
    remainingSlots,
    setStudentError,

    bookPreview,
    handleGetBook,
    dueDate,

    handleAddBook,
    selectedBooks,

    control,
    handleSearchStudent,
    errors,
    handleSubmitLoan,
    handleRemoveBook,
    reset,
    watch,
  } = useLoans();

  return (
    <div className="">
      {/* input search */}
      <div className="flex gap-2 items-end">
        <div className="flex-1 ">
          <Controller
            control={control}
            name="student_id"
            render={({ field }) => (
              <Input
                {...field}
                id={field.name}
                type="text"
                placeholder="Cari siswa berdasarkan NISN"
              />
            )}
          />
        </div>
        <Button
          type="button"
          onClick={() => handleSearchStudent(watch('student_id'))}
          className="bg-teal-500 hover:bg-teal-600"
        >
          <Search size={16} />
        </Button>
      </div>
      <div className="relative mt-3 w-1/2">
        {studentError && (
          <div className="border border-red-300 bg-red-100 rounded-lg p-3 flex flex-col items-start justify-center">
            <p className=" text-slate-500 font-semibold text-sm">
              {studentError}
            </p>
            <Button
              className="absolute top-1 right-1 hover:bg-red-200"
              variant="ghost"
              size="sm"
              type="button"
              onClick={() => setStudentError('')}
            >
              <CircleX color="red" />
            </Button>
            <Button variant="link" className="p-0 h-auto mt-2">
              Lihat daftar peminjaman →
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-4 mt-4">
        {/* info student */}

        {student?.id && (
          <div className="border shadow-sm rounded-lg p-4">
            <div className="p-3 flex flex-col items-start justify-center bg-teal-50 border border-teal-100 rounded-md space-y-1">
              <p className="text-xs font-semibold text-slate-500">
                Nama :{' '}
                <span className="text-sm font-bold text-slate-800">
                  {student?.full_name}
                </span>
              </p>
              <p className="text-xs font-semibold text-slate-500">
                NISN :{' '}
                <span className="text-sm font-bold text-slate-800">
                  {student.nisn}
                </span>
              </p>
              <p className="text-xs font-semibold text-slate-500">
                Kuota Pinjam :{' '}
                <span className="text-sm font-bold text-slate-800">
                  {remainingSlots}
                </span>
              </p>
            </div>

            {/* search book */}
            {student?.id && (
              <div className="mt-4 flex gap-2 items-end">
                <Controller
                  control={control}
                  name="barcode"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder="Input barcode atau judul buku..."
                    />
                  )}
                />

                <Button
                  type="button"
                  onClick={() => handleGetBook(watch('barcode'))}
                >
                  <Search size={16} />
                </Button>
              </div>
            )}

            {bookPreview && (
              <div className="flex gap-4 mt-4 rounded-lg shadow-sm p-2">
                {/* info book */}
                <div className="flex flex-col gap-2">
                  <div className="border-b space-y-2">
                    <div className="flex items-center gap-2">
                      <Book size={16} />{' '}
                      <p className="font-bold">{bookPreview.title}</p>
                    </div>

                    <div className="flex gap-4 pb-4 items-center">
                      <p className="text-sm text-muted-foreground list-item list-inside">
                        Kategori : {bookPreview.categories?.name}
                      </p>
                      <p className="text-sm text-muted-foreground list-item list-inside">
                        Penulis : {bookPreview.author}
                      </p>
                      <p className="text-sm text-muted-foreground list-item list-inside">
                        Stok : {bookPreview.stock}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 border-b pb-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">Durasi</p>
                      <Badge variant="secondary">
                        {bookPreview.categories?.duration_days} hari
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Estimasi tanggal penggembalian :{' '}
                      <span className="font-bold text-black">
                        {' '}
                        {dueDate?.toLocaleDateString('id-ID', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>{' '}
                      <span>(jika dipinjam hari ini)</span>
                    </p>
                  </div>
                  <div className="flex items-center pb-2 justify-between">
                    <p className="font-semibold">Denda Keterlambatan</p>
                    <Badge variant="destructive">
                      Rp.
                      {bookPreview.categories?.fine_amount.toLocaleString(
                        'id-ID',
                      )}{' '}
                      / hari
                    </Badge>
                  </div>
                </div>
              </div>
            )}
            {bookPreview && (
              <Button
                onClick={handleAddBook}
                type="button"
                className="w-full mt-4 bg-teal-400 text-black cursor-pointer hover:bg-teal-500"
              >
                Tambah ke daftar pinjam
              </Button>
            )}
          </div>
        )}
        {/* list loans */}
        {selectedBooks.length >= 1 && (
          <div className="border rounded-lg">
            {selectedBooks.map((book) => (
              <Card className="m-4 p-4 relative" key={book.id}>
                <p className="font-bold text-slate-500">{book.title}</p>
                <p className="text-slate-500">
                  Kategori : {book.categories?.name}
                </p>
                <p className="text-slate-500">
                  Tgl Pengembalian :{' '}
                  {book.estimatedDueDate.toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <Button
                  type="button"
                  className="absolute top-2 right-2 hover:bg-red-100 cursor-pointer"
                  variant="secondary"
                  onClick={() => handleRemoveBook(book.id)}
                >
                  <Trash2 size={16} color="red" />
                </Button>
              </Card>
            ))}
            <div className="flex items-center m-4 justify-end gap-2">
              <Button variant="destructive">Cancel</Button>
              <Button
                type="button"
                onClick={handleSubmitLoan}
                className="bg-teal-500"
              >
                Submit
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
