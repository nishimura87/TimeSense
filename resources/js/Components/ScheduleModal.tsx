import React, { useState, useEffect } from 'react';
import "../../css/TaskModal.css";
import Select from "react-select";

interface ScheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (taskName: string, taskDescription: string, start: string, end: string) => void;
    description?: string;
    start: string;
    end: string;
}

const TaskModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose, onSave, start, end }) => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [inputStart, setInputStart] = useState<{label: string, value: string}>({label: '', value: ''});
    const [inputEnd, setInputEnd] = useState<{label: string, value: string}>({label: '', value: ''});
    const [taskOptions, setTaskOptions] = useState<{label: string, value: string}[]>([]);

    useEffect(() => {
        // Laravel API からタスクを取得
        fetch('http://localhost:8000/api/tasks')
            .then(response => response.json())
            .then(data => {
                const options = data.map((task: any) => ({ label: task.title, value: task.title }));
                setTaskOptions(options);
            })
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    // 時間のフォーマット関数など、既存の関数を保持

    const formatPropsTime = (time: string) => {
        if (!time) return {label: '', value: ''};
        const date = new Date(time);
        if (isNaN(date.getTime())) {
            console.error("Invalid time value received:", time);
            return {label: "Invalid Time", value: ""};
        }
        const formattedTime = new Intl.DateTimeFormat('ja-JP', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).format(date);
        return {label: formattedTime, value: formattedTime};
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            weekday: 'short',
        }).format(date);
    };

    useEffect(() => {
        const formattedStart = start ? formatPropsTime(start) : formatPropsTime(new Date().toISOString());
        const formattedEnd = end ? formatPropsTime(end) : formatPropsTime(new Date().toISOString());

        setInputStart(formattedStart);
        setInputEnd(formattedEnd);
    }, [start, end]);

    const generateTimeOptions = (type: 'start' | 'end')  => {
        const options = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
                const timeValue = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                const timeOption = { label: timeValue, value: timeValue };
                if (type === 'start' && inputEnd.value && timeValue >= inputEnd.value) {
                    continue;
                } else if (type === 'end' && inputStart.value && timeValue <= inputStart.value) {
                    continue;
                }
                options.push(timeOption);
            }
        }
        return options;
    };

    const handleSave = () => {
        onSave(taskName, taskDescription, inputStart.value, inputEnd.value);
        setTaskName('');
        setTaskDescription('');
        onClose();
    };

    const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40 flex items-center justify-center" onClick={handleClose}>
            <div className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                <div className='flex justify-end mb-2'>
                    <button
                        className="text-xl font-semibold"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>
                <div className='flex items-center mb-2'>
                    <div className='mr-2'>
                        <span>{formatDate(start)}</span>
                    </div>
                    <div className='mx-2'>
                        <Select
                            id="start"
                            options={generateTimeOptions('start')}
                            value={inputStart}
                            onChange={(selectedOption) => setInputStart(selectedOption || { label: '', value: '' })}
                            components={{
                                IndicatorSeparator: () => null,
                            }}
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    "*": {
                                        boxShadow: "none !important",
                                    },
                                }),
                            }}
                        />
                    </div>
                    <div>-</div>
                    <div className='mx-2'>
                        <Select
                            id="end"
                            options={generateTimeOptions('end')}
                            value={inputEnd}
                            onChange={(selectedOption) => setInputEnd(selectedOption || { label: '', value: '' })}
                            components={{
                                IndicatorSeparator: () => null,
                            }}
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    "*": {
                                        boxShadow: "none !portant",
                                    },
                                }),
                            }}
                        />
                    </div>
                </div>
                <div className='relative border-b border-gray-300 mb-2'>
                    <Select
                        id="taskName"
                        options={taskOptions}
                        value={taskOptions.find(option => option.value === taskName) || { label: taskName, value: taskName }}
                        onChange={(selectedOption) => setTaskName(selectedOption ? selectedOption.value : '')}
                        placeholder="タスク名を選択または入力"
                        isClearable
                    />
                </div>
                <div className='relative border-b border-gray-300 flex items-center mb-2'>
                    <textarea
                        id="taskDescription"
                        className="w-full border-none focus:ring-transparent px-0 pb-2"
                        placeholder="メモ"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="flex justify-end">
                    <button className="btn bg-blue-500 hover:bg-blue-400 text-white rounded-lg px-4 py-2" onClick={handleSave}>
                        保存
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;