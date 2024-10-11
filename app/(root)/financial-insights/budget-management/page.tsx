'use client';

import HeaderBox from '@/components/Header';
import { Button } from '@/components/ui/button';
import BudgetCategory from '@/components/BudgetCategory';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface IBudgetLimit {
    $id: string;
    category: string;
    amount: number;
}

const BudgetManagement: React.FC<IBudgetLimit> = ({ $id, category, amount }) => {
    const [categories, setCategories] = useState<IBudgetLimit[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // Fetch categories similar to the manager
        const fetchCategory = async () => {
            const response = await fetch('/api/budget-limits')
            const data = await response.json()
            setCategories(data.categories)
        }

        fetchCategory()
    }, [])

    const handleEdit = (id: string) => {
        // Logic to edit category
        console.log("Edit category", id)
    }

    const handleDelete = async (id: string) => {
        try {
            await fetch(`/api/budget-limits/${id}`, { method: 'DELETE' })
            setCategories(categories.filter(category => category.$id !== id))
        } catch (error) {
            setError("Failed to delete the category. Please try to delete again.")
        }
    }

    return (
        <section className='financial-insights-home'>
            <div className='financial-insights-content'>
                <HeaderBox
                    title='Budget Management'
                    subtext='Manage your budget limits'
                />
                <div className='grid grid-cols-2 gap-6'>
                    {categories?.length > 0 ? (
                        categories.map(category => (
                            <BudgetCategory
                                key={category.$id}
                                $id={category.$id}
                                category={category.category}
                                amount={category.amount}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))
                    ) : (
                        <p>No categories available</p>
                    )}
                </div>
                <Link href='/financial-insights/budget-management/create'>
                    <Button className='payment-transfer_btn'>
                        Add new category
                    </Button>
                </Link>
            </div>
        </section>
    );
};

export default BudgetManagement;
