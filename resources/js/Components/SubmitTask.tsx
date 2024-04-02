import React, { useEffect } from "react";
import { useForm } from '@inertiajs/react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import ValidationErrors from "@/Components/ValidationErrors";
import Button from "@/Components/Button";

// フォームデータの型を定義
interface FormData {
  title: string;
  due_date: string | null; // due_dateはstringまたはnull
  page: string;
}

export default function SubmitTask() {
  // useFormのジェネリクスを使用してフォームデータの型を指定
  const { data, setData, post, processing, reset, errors } = useForm<FormData>({
    title: '',
    due_date: null, // 初期値としてnullを設定
    page: '1',
  });

  // 現在のページ番号を取得
  useEffect(() => {
  const queryParams = new URLSearchParams(window.location.search);
  const currentPage = queryParams.get('page') || '1';
  if (data.page !== currentPage) {
    setData(data => ({ ...data, page: currentPage }));
  }
}, [data.page]); // setDataを依存配列から削除



  const submit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // due_dateがstring型であることを確認してからDateオブジェクトに変換
  const dueDate = data.due_date ? new Date(data.due_date) : null;
  const formattedData = {
    ...data,
    // Dateオブジェクトを使用してdue_dateをISO文字列に変換
    due_date: dueDate ? dueDate.toISOString().substring(0, 10) : null
  };

  post(route('task.store',), {
    data: formattedData,
    onSuccess: () => reset(),
  });
};


  return (
    <div>
      <form onSubmit={submit} className="w-full flex items-center space-x-2">
        <input
          type="text"
          value={data.title}
          placeholder="タスク"
          className="w-8/12 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
          onChange={e => setData('title', e.target.value)}
        />
        <DatePicker
          selected={data.due_date ? new Date(data.due_date) : null}
          placeholderText={'年-月-日'}
          onChange={(date: Date | null) => setData('due_date', date ? date.toISOString().substring(0, 10) : null)}
          dateFormat="yyyy-MM-dd"
          todayButton="今日"
          className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm cursor-pointer"
        />
        <div className="w-2/12 text-right">
          <Button className="bg-blue-400 min-w-[100px]" processing={processing}>提出する</Button>
        </div>
      </form>
      <ValidationErrors errors={errors} className="mt-2 w-full" />
    </div>
  );
}
