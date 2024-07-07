import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

interface Task {
    day: string;
    count: number;
}

interface BarChartProps {
    tasks: Task[];
}

const currentMonth = new Date().toLocaleString('ja-JP', { month: 'long' });

const BarChart: React.FC<BarChartProps> = ({ tasks }) => {
    const days = tasks.map(task => task.day);
    const counts = tasks.map(task => task.count);

    const data = {
        labels: days,
        datasets: [
            {
                label: 'タスク数',
                data: counts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            },
        },
        plugins: {
            title: {
                display: true,
                text: `${currentMonth}:日付ごとの登録タスク数`,
                font: {
                    size: 15, // 文字サイズ
                    weight: 'bold' as 'bold' | 'normal' | 'bolder' | 'lighter'
                }
            },
            legend: {
                position: 'bottom' as const,
                labels: {
                    padding: 5,
                },
            },
            datalabels: {
                display: false
            },
        }
    };

    return <Bar data={data} options={options} />;
};

export default BarChart;
