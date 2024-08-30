'use client';

import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { calculateIncomeLastSixMonths } from '@/lib/utils';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface IncomeLineChartProps {
    transactions: Transaction[];
}

const IncomeLineChart: React.FC<IncomeLineChartProps> = ({ transactions }) => {
    const [labels, setLabels] = useState<string[]>([]);
    const [incomeData, setIncomeData] = useState<number[]>([]);

    useEffect(() => {
        const { labels, data } = calculateIncomeLastSixMonths(transactions);
        setLabels(labels);
        setIncomeData(data);
    }, [transactions]);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Income',
                data: incomeData,
                borderColor: 'rgba(121, 99, 182, 1)',
                backgroundColor: 'rgba(121, 99, 182, 1)',
                fill: true,
                tension: 0.1,
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false,
                text: 'Income Over Last 6 Months',
            },
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false
                }
            }
        }
    };

    return (
        <Line
            data={chartData}
            options={options} />
    );
};

export default IncomeLineChart;
