'use client'

import HeaderBox from '@/components/Header'
import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Define the form inputs type
type SubscriptionFormInputs = {
  subscription: string
  amount: number
}

const EditSubscription = ({ params }: { params: { id: string } }) => {
  const [formData, setFormData] = useState({ subscription: '', amount: '' })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/subscription/${params.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch subscription')
        }
        const data = await response.json()
        setFormData({ subscription: data.subscription.subscription, amount: data.subscription.amount })
      } catch (error) {
        setError('Failed to fetch subscription. Please try again later.')
      }
    }
    fetchData()
  }, [params.id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'amount' ? parseFloat(value) || '' : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.subscription || !formData.amount) {
      setError('Please fill in all fields')
      return
    }

    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch(`/api/subscription/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to update subscription')
      }

      router.push('/financial-insights/subscription-management')
    } catch (error) {
      console.log("Error:", error)
      setError('Failed to add subscription. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  // Initialize the form using react-hook-form
  const formMethods = useForm<SubscriptionFormInputs>({
    defaultValues: {
      subscription: '',
      amount: 0
    }
  })

  return (
    <section className='financial-insights-home'>
      <div className='financial-insights-content'>
        <HeaderBox
          title='Edit Subscription'
          subtext='Edit your monthly subscriptions'
        />

        {/* The form */}
        <Form {...formMethods}>
          <form onSubmit={handleSubmit}>

            {/* Subscription Name Input */}
            <FormField
              control={formMethods.control}
              name="subscription"
              render={() => (
                <FormItem className="border-t border-gray-200">
                  <div className="payment-transfer_form-item py-5">
                    <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                      Subscription Name
                    </FormLabel>
                    <div className="flex w-full flex-col">
                      <FormControl>
                        <Input
                          name="subscription"
                          placeholder="ex: Finance Finesse"
                          className="input-class"
                          value={formData.subscription}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                      <FormMessage className="text-12 text-red-500" />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            {/* Amount Input */}
            <FormField
              control={formMethods.control}
              name="amount"
              render={() => (
                <FormItem className="border-y border-gray-200">
                  <div className="payment-transfer_form-item py-5">
                    <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                      Amount
                    </FormLabel>
                    <div className="flex w-full flex-col">
                      <FormControl>
                        <Input
                          name="amount"
                          type="number"
                          placeholder="ex: 5.00"
                          className="input-class"
                          value={formData.amount}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                      <FormMessage className="text-12 text-red-500" />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="payment-transfer_btn-box">
              <Button type="submit" className="payment-transfer_btn" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> &nbsp; Updating...
                  </>
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </form>
        </Form>
        {error && <p className='text-red-500'>{error}</p>}
      </div>
    </section >
  )
}

export default EditSubscription
