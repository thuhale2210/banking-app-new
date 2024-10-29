'use client'

import React, { useState, useEffect } from 'react';

const FinancialTips = () => {
    const tips = [
        "Track your expenses daily to know where your money goes.",
        "Set a budget for each category to avoid overspending.",
        "Build an emergency fund covering 3-6 months of expenses.",
        "Invest in a retirement plan as early as possible.",
        "Automate savings to make saving a habit.",
        "Review your subscriptions regularly to cancel unused services.",
        "Pay off high-interest debt first to save on interest costs.",
        "Set financial goals to stay motivated and on track.",
        "Use cash or debit cards to help control spending.",
        "Shop with a list to avoid impulse purchases.",
        "Compare prices before making large purchases.",
        "Save at least 20% of your income if possible.",
        "Avoid lifestyle inflation by saving raises and bonuses.",
        "Avoid payday loans and high-interest credit cards.",
    ];

    const [tip, setTip] = useState("");

    useEffect(() => {
        const getRandomTip = () => {
            const randomIndex = Math.floor(Math.random() * tips.length);
            return tips[randomIndex];
        };

        // Set the random tip only after the component has mounted
        setTip(getRandomTip());
    }, []);

    return (
        <section className='total-balance'>
            <div className='w-full gap-4 header-2'>
                <h3>Financial Tip of the Day</h3>
                <div className='flex w-full border rounded-lg p-4 mt-4 bg-[#F1E9FF] text-[#57497E] font-inter italic text-2xl justify-center align-middle'>
                    <p>&quot;{tip}&quot;</p>
                </div>
            </div>
        </section>
    );
};

export default FinancialTips;
