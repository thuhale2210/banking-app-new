'use client';

import React from 'react';
import { calculateIncomeLastSixMonths } from '@/lib/utils';
import IncomeLineChart from './IncomeLineChart';

interface IncomeBoxProps {
    transactions: Transaction[];
}

const IncomeBox: React.FC<IncomeBoxProps> = ({ transactions = [] }) => {
    const { labels, data } = calculateIncomeLastSixMonths(transactions);
    const totalIncome = data.reduce((acc, curr) => acc + curr, 0);

    return (
        <section className='total-balance'>
            <div className='flex flex-col m-2 header-2'>
                <h2>Income Last 6 Months</h2>
                <div className='mt-6'>
                    <IncomeLineChart transactions={transactions} />
                </div>
            </div>
        </section>
    );
};

export default IncomeBox;
