import React, { useState, useEffect } from 'react';
import { useForm } from "@inertiajs/react";
import Select, { SingleValue } from 'react-select';
import DangerButton from "@/Components/DangerButton";
import Modal from './Modal';

// todo オブジェクトの型定義
interface TodoType {
  id: number | string;
  title: string;
  due_date: string;
  created_at: string;
  progress: number;
  page: string;
}

interface OptionType {
  value: number;
  label: string;
}

interface TodoProps {
  todo: TodoType;
  onClick: (todo: TodoType) => void; // onClick プロパティの型定義を追加
}

const Todo: React.FC<TodoProps> = ({ todo }) => {

  // Date オブジェクトを年月日形式でフォーマット
  const formattedCreatedAt = new Intl.DateTimeFormat('ja-JP', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
}).format(new Date(todo.created_at));

  const { data, setData, patch, delete: destroy, processing } = useForm(todo);

  // 現在のページ番号を取得
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const currentPage = queryParams.get('page') || '1';
    if (data.page !== currentPage) {
      setData({ ...data, page: currentPage });
    }
  }, [data.page, setData]);

  const update = (option: SingleValue<OptionType>) => {
    // option が null または undefined でないことを確認する
    if (option) {
      data.progress = option.value;
      patch(route('todo.update', { id: todo.id }), {
        preserveScroll: true, // スクロール位置を保持
      });
    }
  }

  const destroySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(window.location.search);
    const page = queryParams.get('page') || '1';
    destroy(route('todo.destroy', todo.id, page));
  };

  const options = [
    { value: 0, label: '未着手'},
    { value: 1, label: '進行中'},
    { value: 2, label: '完了'},
  ]

  // モーダル表示状態の管理
  const [showModal, setShowModal] = useState(false);

  // モーダルを開く関数
  const handleOpenModal = () => setShowModal(true);

  // モーダルを閉じる関数
  const handleCloseModal = () => setShowModal(false);


  return (
    <tr className={`border border-white ${data.progress === 1 ? "bg-yellow-300" : data.progress === 2 ? "line-through bg-gray-300" : "bg-blue-300"}`}>
      <td className="p-2 overflow-hidden text-overflow-ellipsis whitespace-nowrap cursor-pointer" onClick={handleOpenModal}>
        {todo.title}
      </td>
      <td className="p-2">
        <Select
          className="mx-2 text-center font-bold text-sm"
          options={options}
          defaultValue={options[data.progress]}
          onChange={update}
        />
      </td>
      <td className="p-2 text-sm text-center">{todo.due_date}</td>
      <td className="p-2 text-center">
        <form onSubmit={destroySubmit}>
          <DangerButton className="bg-red-500" processing={processing}>削除</DangerButton>
        </form>
      </td>
      <td className="p-2 text-sm text-center">{formattedCreatedAt}</td>
      <td>
        <Modal show={showModal} onClose={handleCloseModal}>
          <div className="modal w-[30rem] min-h-[10rem] overflow-y-auto">
            <div className="break-words">
              <p><span className="font-bold">期日：</span>{todo.due_date}</p>
              <p><span className="font-bold">todo：</span>{todo.title}</p>
            </div>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Todo;