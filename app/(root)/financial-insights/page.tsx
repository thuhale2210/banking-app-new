import HeaderBox from '@/components/Header'
import RightSidebar from '@/components/RightSidebar'
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

      </div>

      <RightSidebar
          user={loggedIn}
          transactions={account?.transactions}
          banks={accountsData.slice(0, 2)} />
    </section>
  )
}

export default FinancialInsights