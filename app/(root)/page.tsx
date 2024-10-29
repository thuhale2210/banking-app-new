import HeaderBox from '@/components/Header'
import RecentTransactions from '@/components/RecentTransactions'
import SpendingBox from '@/components/SpendingBox'
import FinancialTips from '@/components/Tips'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getAccount, getAccounts } from '@/lib/actions/bank.actions'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import React from 'react'

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
    const currentPage = Number(page as string) || 1

    const loggedIn = await getLoggedInUser();

    const accounts = await getAccounts({ userId: loggedIn.$id });

    if (!accounts) return;

    const accountsData = accounts.data;

    const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

    const account = await getAccount({ appwriteItemId });

    return (
        <section className='home'>
            <div className='home-content'>
                <header className='home-header'>
                    <HeaderBox
                        type='greeting'
                        title='Welcome'
                        user={loggedIn.firstName || 'Guest'}
                        subtext='Access and manage your finances with ease'
                    />
                    <div className='flex w-full h-[210px]'>
                        <div className='w-1/3 h-full'>
                            <FinancialTips />
                        </div>
                        <div className='w-1/3 h-full'>
                            <TotalBalanceBox
                                accounts={accountsData}
                                totalBanks={accountsData.length}
                                totalCurrentBalance={accounts.totalCurrentBalance} />
                        </div>
                        <div className='w-1/3 h-full'>
                            <SpendingBox
                                type='spendingThisMonth'
                                transactions={account?.transactions} />
                        </div>
                    </div>
                </header>

                <RecentTransactions
                    accounts={accountsData}
                    transactions={account?.transactions}
                    appwriteItemId={appwriteItemId}
                    page={currentPage} />

            </div>
        </section>
    );
};

export default Home;
