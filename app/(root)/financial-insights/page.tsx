import HeaderBox from '@/components/Header'
import IncomeBox from '@/components/IncomeBox';
import SpendingBox from '@/components/SpendingBox';
import SubscriptionsManager from '@/components/SubscriptionsManager';
import TopCategories from '@/components/TopCategories';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const FinancialInsights = async () => {
  const loggedIn = await getLoggedInUser();

  const accounts = await getAccounts({ userId: loggedIn.$id });

  if (!accounts) return;

  const accountsData = accounts.data;

  const appwriteItemId = accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });

  return (
    <section className='financial-insights-home'>
      <div className='financial-insights-content'>
        <HeaderBox
          title='Financial Insights'
          subtext='View and manage your financial insights'
        />

        <div className='space-y-4 flex flex-row'>
          <div className='w-4/5 h-1/5 mt-4'>
            <div className='flex'>
              <TotalBalanceBox
                accounts={accountsData}
                totalBanks={accountsData.length}
                totalCurrentBalance={accounts.totalCurrentBalance} />
              <SpendingBox
                type='spendingThisMonth'
                transactions={account?.transactions} />
            </div>
            <div className='flex mt-6'>
              <IncomeBox
                transactions={account?.transactions}
              />
              <SpendingBox
                type='spendingLastSixMonths'
                transactions={account?.transactions} />
            </div>
          </div>
          <aside className='sidebar'>
            <div>
              <TopCategories
                user={loggedIn}
                transactions={account?.transactions}
                banks={accountsData.slice(0, 2)} />
              <SubscriptionsManager />
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default FinancialInsights