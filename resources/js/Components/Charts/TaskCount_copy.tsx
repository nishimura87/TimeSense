import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Task {
    month: string;  // 修正: dateからmonthに変更
    count: number;
}

interface BarChartProps {
    tasks: Task[];
}

const BarChart: React.FC<BarChartProps> = ({ tasks }) => {
    const months = tasks.map(task => task.month);  // 修正: dateからmonthに変更
    const counts = tasks.map(task => task.count);

    const data = {
        labels: months,
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
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default BarChart;
