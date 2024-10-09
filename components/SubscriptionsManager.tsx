'use client'

import React, { useEffect, useState } from 'react'
import Subscription from './Subscription'
import Link from 'next/link';
import { Button } from './ui/button';

interface ISubscription {
  $id: string;
  subscription: string;
  amount: number;
}

const SubscriptionsManager = () => {
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSubscription = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/subscription')
        if (!response.ok) {
          throw new Error('Failed to fetch subscriptions')
        }
        const data = await response.json()
        setSubscriptions(data.subscriptions)
      } catch (error) {
        console.log("Error:", error)
        setError('Failed to load subscriptions. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubscription()
  }, [])

  return (
    <section className='banks mt-6'>
      <div className='flex flex-1 flex-col gap-6'>
        <h2 className='header-2'>Current Subscriptions</h2>
        <div className='space-y-5'>
          {error && <p className='text-red-500'>{error}</p>}
          {isLoading ? (
            <p className='text-slate-700 italic'>Loading subscriptions...</p>
          ) : subscriptions?.length > 0 ? (
            <div className='text-slate-900'>
              {subscriptions?.map(subscription => (
                <Subscription
                  key={subscription.$id}
                  $id={subscription.$id}
                  subscription={subscription.subscription}
                  amount={subscription.amount}
                  isManager={true}
                />
              ))}
            </div>
          ) : (
            <p className='text-slate-700'>No subscriptions found.</p>
          )}
        </div>
        <Link href='/financial-insights/subscription-management'>
          <Button className='payment-transfer_btn'>
            Manage Subscriptions
          </Button>
        </Link>
      </div>
    </section>
  )
}

export default SubscriptionsManager
