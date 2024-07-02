import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Progress {
    progress: string;
    count: number;
}

interface PieChartProps {
    tasks: Progress[];
}

const TaskProgressChart: React.FC<PieChartProps> = ({ tasks }) => {

    const progressCounts = tasks.reduce((acc, task) => {
        acc[task.progress] = (acc[task.progress] || 0) + task.count;
        return acc;
    }, {} as Record<string, number>);

    const dataValues = Object.values(progressCounts);

    const data = {
        labels: ['未着手', '進行中', '完了'],
        datasets: [
            {
                label: '進捗状況',
                data: dataValues,
                backgroundColor: [
                    'rgba(96, 165, 250, 0.6)',
                    'rgba(253, 224, 71, 0.6)',
                    'rgba(209, 213, 219, 0.6)'
                ],
            },
        ],
    };

    const options = {
    };

    return <Pie data={data} options={options} />;
};

export default TaskProgressChart;