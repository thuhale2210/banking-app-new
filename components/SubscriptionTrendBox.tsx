'use client'

import { getTotalSubscriptionByMonth } from '@/lib/actions/subscription.actions';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const SubscriptionTrendChart: React.FC = () => {
    const [labels, setLabels] = useState<string[]>([]);
    const [dataPoints, setDataPoints] = useState<number[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const { labels, dataPoints } = await getTotalSubscriptionByMonth();
            setLabels(labels);
            setDataPoints(dataPoints);
        };

        fetchData();
    }, []);

    const data = {
        labels,
        datasets: [
            {
                label: 'Total Subscription Spending',
                data: dataPoints,
                borderColor: '#7963B6',
                backgroundColor: '#7963B6',
                borderWidth: 2,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
            },
            tooltip: {
                mode: 'index' as const,
                intersect: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month',
                },
                grid: {
                    display: false
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Spending (CAD)',
                },
                grid: {
                    display: false
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <section className='total-balance w-1/2'>
            <div className='flex flex-col gap-4 h-[250px] header-2 mb-6'>
                <h1>Subscription Trends In The Last 6 Months</h1>
                <Line
                    data={data}
                    options={options} />
            </div>
        </section>
    )
};

export default SubscriptionTrendChart;
