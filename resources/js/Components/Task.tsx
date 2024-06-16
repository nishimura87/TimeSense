import React, { useState, useEffect } from 'react';
import { useForm } from "@inertiajs/react";
import Select, { SingleValue } from 'react-select';
import DangerButton from "@/Components/DangerButton";
import Timer from './Timer';
import { TaskProgress } from '../Constants/constants';
import { FaTrash } from 'react-icons/fa';

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

    const updateProgress = (option: SingleValue<OptionType>) => {
        // option が null または undefined でないことを確認する
        if (option) {
        data.progress = option.value;
        patch(route('task.update', { id: task.id }), {
            preserveScroll: true, // スクロール位置を保持
        });
        }
    }

    const updateDueDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('due_date', e.target.value);
        patch(route('task.update', { id: task.id }), {
            preserveScroll: true, // スクロール位置を保持
        });
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

    return (
        <tr className={`border border-white ${data.progress === TaskProgress.IN_PROGRESS ? "bg-yellow-300" : data.progress === TaskProgress.DONE ? "line-through bg-gray-300" : "bg-blue-300"}`}>
            <td className="p-2 overflow-hidden text-overflow-ellipsis whitespace-nowrap">
                {task.title}
            </td>
            <td className="p-2">
                <Select
                className="mx-2 text-center font-bold text-sm"
                options={options}
                defaultValue={options[data.progress]}
                onChange={updateProgress}
                />
            </td>
            <td className="p-2 text-sm text-center">
                <input
                    type="date"
                    value={data.due_date}
                    onChange={updateDueDate}
                    className="border rounded p-1 text-center"
                />
            </td>
            <td>
                <Timer taskId={Number(task.id)} progress={task.progress} />
            </td>
            <td className="p-1 text-center">
                <form onSubmit={destroySubmit}>
                    <DangerButton className="bg-red-500" processing={processing}>
                        <FaTrash />
                    </DangerButton>
                </form>
            </td>
        </tr>
    );
};

export default Task;