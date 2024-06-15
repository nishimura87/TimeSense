import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import axios from 'axios';

const Timer = ({ taskId }: { taskId: number }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => {
        let timer: ReturnType<typeof setInterval> | null = null;
        if (isRunning) {
            timer = setInterval(() => {
                setTime(prevTime => prevTime + 1);
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
            // タイマーが動作中なら、停止して時間をポストする
            try {
                await axios.post(route('work-times.store'), {
                    task_id: taskId,
                    time: time
                });
            } catch (error) {
                console.error("Failed to save time:", error);
            }
        }
        setIsRunning(!isRunning);
    };

    return (
        <div className="flex items-center justify-center">
            <div className="flex items-center space-x-1">
                <div className="bg-gray-100 px-2 h-10 flex items-center justify-center text-sm rounded">
                    {new Date(time * 1000).toISOString().substr(11, 8)}
                </div>
                <button
                    className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                    aria-label={isRunning ? "Pause timer" : "Start timer"}
                    onClick={handleStartPause}
                >
                    {isRunning ? <FaPause className="w-3 h-3" /> : <FaPlay className="w-3 h-3" />}
                </button>
            </div>
        </div>
    );
};

export default Timer;
