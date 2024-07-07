import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

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

    const currentMonth = new Date().toLocaleString('ja-JP', { month: 'long' });
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
        plugins: {
            title: {
                display: true,
                text: `${currentMonth}:タスクの進捗率`,
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
                formatter: (value: number, context: Context) => {
                    const label = context.chart.data.labels?.[context.dataIndex];
                    return label ? `${label}: ${value}` : `${value}`;
                },
                font: {
                    weight: 'bold' as 'bold' | 'normal' | 'bolder' | 'lighter'
                }
            }
        }
    };

    return <Pie data={data} options={options} />;
};

export default TaskProgressChart;
