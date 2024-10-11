import React from 'react'
import { Button } from './ui/button';
import Link from 'next/link';

interface ISubscription {
    $id: string;
    subscription: string;
    amount: number;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    isManager: boolean;
}

const Subscription: React.FC<ISubscription> = ({ $id, subscription, amount, onEdit, onDelete, isManager }) => {
    return (
        <div className='text-slate-900 flex'>
            <div className="mt-2 w-96 h-14 gap-4 flex p-4 rounded-xl border">
                <div className="flex w-full flex-1 flex-col">
                    <div className="text-14 flex justify-between">
                        <h2 className="font-medium">{subscription}</h2>
                        <h3 className="font-medium">{amount}</h3>
                    </div>
                </div>
            </div>
            {!isManager && (
                <div className='mt-2'>
                    <Link href={`/financial-insights/subscription-management/edit/${$id}`}>
                        <Button
                            className='ml-2 h-14 border rounded-xl text-slate-900'
                            onClick={() => onEdit?.($id)}>
                            Edit
                        </Button>
                    </Link>
                    <Button
                        className='ml-2 h-14 border rounded-xl text-slate-900'
                        onClick={() => onDelete?.($id)}>
                        Delete
                    </Button>
                </div>
            )}
        </div>
    )
}

export default Subscription