import React, { useState, useEffect } from 'react';
import { useForm } from "@inertiajs/react";
import Select, { SingleValue } from 'react-select';
import DangerButton from "@/Components/DangerButton";
import Timer from './Timer';
import { TaskProgress } from '../Constants/constants';
import { FaTrash } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Inertia } from "@inertiajs/inertia";
// import '../../css/customStyle.css';

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
    const [title, setTitle] = useState(task.title || '');
    const [dueDate, setDueDate] = useState<Date | null>(task.due_date ? new Date(task.due_date) : null);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleTitleBlur = () => {
        updateTitle(title);
    };


    // 現在のページ番号を取得
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const currentPage = queryParams.get('page') || '1';
        if (data.page !== currentPage) {
        setData({ ...data, page: currentPage });
        }
    }, [data.page, setData]);

    const updateTitle = async (title: string) => {
        if (title) {
            try {
                await Inertia.patch(route('task.update', { id: task.id }), {
                    title: title,
                    preserveScroll: true,
                });
            } catch (error) {
                console.error('Failed to update title:', error);
            }
        }
    };

    const updateProgress = async (option: SingleValue<{ value: number; label: string }>) => {
        // option が null または undefined でないことを確認する
        if (option) {
            data.progress = option.value;
            try {
                await Inertia.patch(route('task.update', { id: task.id }), {
                    progress: option.value,
                    preserveScroll: true, // スクロール位置を保持
                });
            } catch (error) {
                console.error('Failed to update progress:', error);
            }
        }
    };

    const updateDueDate = async (date: Date | null) => {
        if (date) {
            setDueDate(date); // ローカル状態を更新

            try {
                await Inertia.patch(route('task.update', { id: task.id }), {
                    due_date: date.toISOString().split('T')[0], // YYYY-MM-DD形式に変換
                    preserveScroll: true,
                });
            } catch (error) {
                console.error('Failed to update due date:', error);
            }
        }
    };

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
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    onBlur={handleTitleBlur}
                    className="border rounded p-1 text-center w-full leading-[28px] border-gray-300"
                />
            </td>
            <td className="p-2">
                <Select
                    components={{
                        IndicatorSeparator: () => null,
                    }}
                    className="mx-2 text-center font-bold text-sm cursor-pointer"
                    classNames={{
                        control: (state) => (state.isFocused ? 'ring-1 ring-blue-500 ' : ''),
                    }}
                    options={options}
                    defaultValue={options[data.progress]}
                    onChange={updateProgress}
                />
            </td>
            <td className="p-2 text-sm text-center">
                <DatePicker
                    selected={dueDate}
                    onChange={updateDueDate}
                    className="border-gray-300 border rounded p-1 text-center cursor-pointer w-4/5 leading-[28px]"
                    dateFormat="yyyy-MM-dd"
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