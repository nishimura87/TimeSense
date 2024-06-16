import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import { TaskProgress } from '../Constants/constants';

interface TimerProps {
    taskId: number;
    progress: number;
}

const Timer: React.FC<TimerProps> = ({ taskId, progress }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState<number | null>(null); // 初期値をnullに設定
    const [recordId, setRecordId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true); // ローディング状態を追加
    const [isTaskCompleted] = useState(progress === TaskProgress.DONE);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/work-times/${taskId}`);
                if (response.data) {
                    setTime(response.data.time ?? 0); // timeが存在しない場合は0を設定
                    setRecordId(response.data.id); // レコードIDを設定する
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response && error.response.status === 404) {
                        console.log('No existing record found for this task.');
                        setTime(0); // 新規タスクの場合はtimeを0に設定
                    } else {
                        console.error('Failed to fetch data:', error);
                    }
                } else {
                    console.error('Unexpected error:', error);
                }
            } finally {
                setIsLoading(false); // データの取得が完了したらローディングを解除
            }
        };

        fetchData();
    }, [taskId, isTaskCompleted]);

    useEffect(() => {
        let timer: ReturnType<typeof setInterval> | null = null;
        if (isRunning) {
            timer = setInterval(() => {
                setTime(prevTime => (prevTime !== null ? prevTime + 1 : 1)); // prevTimeがnullでない場合に+1
            }, 1000);
        } else if (timer) {
            clearInterval(timer);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isRunning]);

    const handleStartPause = async () => {
        if (isRunning) {
            try {
                if (recordId) {
                    await axios.put(`/work-times/${recordId}`, {
                        task_id: taskId,
                        time: time
                    });
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Failed to save time:', error);
                } else {
                    console.error('Unexpected error:', error);
                }
            }
        }
        setIsRunning(!isRunning);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center">
                <FaSpinner className="animate-spin text-blue-500 w-6 h-6" />
            </div>
        ); // ローディング中はローディングアイコンを表示
    }

    return (
        <div className="flex items-center justify-between px-2">
            <div className="bg-gray-100 px-2 h-10 flex items-center justify-center text-sm rounded">
                {time !== null ? new Date(time * 1000).toISOString().substr(11, 8) : 'Loading...'}
            </div>
            {!isTaskCompleted && (
                <button
                    className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                    aria-label={isRunning ? "Pause timer" : "Start timer"}
                    onClick={handleStartPause}
                >
                    {isRunning ? <FaPause className="w-3 h-3" /> : <FaPlay className="w-3 h-3" />}
                </button>
            )}
        </div>
    );
};

export default Timer;
