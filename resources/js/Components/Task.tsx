import React, { useState, useEffect } from 'react';
import { useForm } from "@inertiajs/react";
import Select, { SingleValue } from 'react-select';
import DangerButton from "@/Components/DangerButton";
import Modal from './Modal';
import Timer from './Timer';

// task オブジェクトの型定義
interface TaskType {
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

interface TaskProps {
    task: TaskType;
    onClick: (task: TaskType) => void; // onClick プロパティの型定義を追加
}

const Task: React.FC<TaskProps> = ({ task }) => {

    const { data, setData, patch, delete: destroy, processing } = useForm(task);

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
        patch(route('task.update', { id: task.id }), {
            preserveScroll: true, // スクロール位置を保持
        });
        }
    }

    const destroySubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const queryParams = new URLSearchParams(window.location.search);
        const page = queryParams.get('page') || '1';
        destroy(route('task.destroy', task.id, page));
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
                {task.title}
            </td>
            <td className="p-2">
                <Select
                className="mx-2 text-center font-bold text-sm"
                options={options}
                defaultValue={options[data.progress]}
                onChange={update}
                />
            </td>
            <td className="p-2 text-sm text-center">{task.due_date}</td>
            <td>
                <Timer taskId={Number(task.id)} progress={task.progress} />
            </td>
            <td className="p-2 text-center">
                <form onSubmit={destroySubmit}>
                <DangerButton className="bg-red-500" processing={processing}>削除</DangerButton>
                </form>
            </td>
            <td>
                <Modal show={showModal} onClose={handleCloseModal}>
                    <div className="modal w-[30rem] min-h-[10rem] overflow-y-auto">
                        <div className="break-words">
                        <p><span className="font-bold">期日：</span>{task.due_date}</p>
                        <p><span className="font-bold">task：</span>{task.title}</p>
                        </div>
                    </div>
                </Modal>
            </td>
        </tr>
    );
};

export default Task;