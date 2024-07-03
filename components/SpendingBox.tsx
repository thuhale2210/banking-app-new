'use client'

import AnimatedCounter from './AnimatedCounter'
import React from 'react'
import { calculateSpendingByCategory } from '@/lib/utils'
import PolarAreaChart from './PolarAreaChart'

interface SpendingBoxProps {
    transactions: Transaction[]
}

const SpendingBox: React.FC<SpendingBoxProps> = ({ transactions = [] }) => {
    const categorySpending = calculateSpendingByCategory(transactions)
    const totalSpending = Object.values(categorySpending).reduce((acc, curr) => acc + curr, 0)

    return (
        <section className='total-balance'>
            <div className='total-balance-chart'>
                <PolarAreaChart
                    categorySpending={categorySpending}
                />
            </div>

            <div className='flex flex-col ml-2 gap-6'>
                <div className='flex flex-col gap-2 header-2'>
                    <h2>Total Spending this month</h2>
                    <div className='total-balance-amount flex-center gap-2'>
                        <AnimatedCounter amount={totalSpending} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SpendingBox
