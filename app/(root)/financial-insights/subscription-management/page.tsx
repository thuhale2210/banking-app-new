'use client'

import React, { useState, useEffect } from 'react'
import Subscription from '@/components/Subscription'
import HeaderBox from '@/components/Header';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ISubscription {
    $id: string;
    subscription: string;
    amount: number;
}

const SubscriptionPage = () => {
    const [subscriptions, setSubscriptions] = useState<ISubscription[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // Fetch subscriptions similar to the manager
        const fetchSubscription = async () => {
            const response = await fetch('/api/subscription')
            const data = await response.json()
            setSubscriptions(data.subscriptions)
        }

        fetchSubscription()
    }, [])

    const handleEdit = (id: string) => {
        // Logic to edit subscription
        console.log("Edit subscription", id)
    }

    const handleDelete = async (id: string) => {
        try {
            await fetch(`/api/subscription/${id}`, {method: 'DELETE'})
            setSubscriptions(subscriptions.filter(subscription => subscription.$id !== id))    
        } catch (error) {
            setError("Failed to delete the subscription. Please try to delete again.")
        }
    }

    return (
        <section className='financial-insights-home'>
            <div className='financial-insights-content'>
                <HeaderBox
                    title='Subscription Management'
                    subtext='Manage your monthly subscriptions'
                />
                <div className='grid grid-cols-2 gap-6'>
                    {subscriptions.map(subscription => (
                        <Subscription
                            key={subscription.$id}
                            $id={subscription.$id}
                            subscription={subscription.subscription}
                            amount={subscription.amount}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            isManager={false}
                        />
                    ))}
                </div>
                <Link href='/financial-insights/subscription-management/create'>
                    <Button className='payment-transfer_btn'>
                        Add new subscription
                    </Button>
                </Link>
            </div>
        </section>

    )
}

export default SubscriptionPage
