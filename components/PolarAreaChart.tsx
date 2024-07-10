'use client'

import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js'
import { PolarArea } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale)

interface PolarAreaChartProps {
    categorySpending: { [category: string]: number }
}

const PolarAreaChart: React.FC<PolarAreaChartProps> = ({ categorySpending }) => {
    const categories = Object.keys(categorySpending)
    const data = {
        labels: categories,
        datasets: [
            {
                label: 'Spending',
                data: categories.map(category => categorySpending[category]),
                backgroundColor: [
                    "#7963B6",
                    '#E7E0FF',
                    '#9E7FE6',
                    '#F1E9FF',
                    "#57497E",
                    '#F9F6FF',
                ]
            }
        ]
    }

    return (
        <PolarArea
            data={data}
            options={{
                plugins: {
                    legend: {
                        display: false
                    },
                }
            }}
        />
    )
}

export default PolarAreaChart
