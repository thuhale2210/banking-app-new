import React from 'react'
import { countTransactionCategories } from '@/lib/utils'
import Category from './Category'
import { Button } from './ui/button'
import Link from 'next/link'

const TopCategories = ({ user, transactions, banks }: RightSidebarProps) => {
    const categories: CategoryCount[] = countTransactionCategories(transactions)

    return (
        <section className='banks'>
            <div className='flex flex-1 flex-col gap-6'>
                <h2 className='header-2'>
                    Budget Management
                </h2>
                <div className='space-y-5'>
                    {categories.map((category) => (
                        <Category key={category.name} category={category} />
                    ))}
                </div>
                <Link href='/financial-insights/budget-management'>
                    <Button className='payment-transfer_btn'>
                        Manage Budget Limit
                    </Button>
                </Link>
            </div>
        </section>
    )
}

export default TopCategories